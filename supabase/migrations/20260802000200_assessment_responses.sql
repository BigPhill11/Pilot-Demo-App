-- Item-level answer capture.
--
-- The app already asks students a lot of scenario questions — personal finance
-- lesson quizzes, village knowledge checks, economics checks — and until now
-- every one of those answers was discarded the moment the component unmounted.
-- Only the aggregate score survived, rolled into a module percentage, so a
-- teacher could see *that* a student scored 60% and never *which* misconception
-- cost them the other 40%.
--
-- One row per answered item. The column that earns this table its keep is
-- selected_label: knowing a student picked "the employer made an error" rather
-- than simply "got it wrong" turns a score into a diagnosis.

CREATE TABLE IF NOT EXISTS public.assessment_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- One uuid per quiz run, minted client-side. Makes the write idempotent so a
  -- re-render or a retried request cannot double-count an answer.
  attempt_id UUID NOT NULL,

  -- 'lesson_quiz' today; 'pre_test' / 'post_test' / 'test_out' are reserved for
  -- the pre/post instrument in agents/education/ASSESSMENT_SPEC.md.
  instrument TEXT NOT NULL DEFAULT 'lesson_quiz',

  module_type TEXT NOT NULL,
  module_id TEXT,
  lesson_id TEXT NOT NULL,

  -- Village questions carry their own ids; personal-finance and economics
  -- questions do not, so those synthesise "<lesson_id>#<index>". Stable as long
  -- as question order within a lesson is stable.
  item_id TEXT NOT NULL,
  item_index INTEGER,

  -- Snapshots of the wording as the student saw it. Denormalised on purpose:
  -- the content is static TS that ships with the bundle, so without a copy here
  -- an edit to a question would silently rewrite the history of what was asked.
  prompt TEXT,
  selected_key TEXT,
  selected_label TEXT,
  correct_key TEXT,
  correct_label TEXT,

  is_correct BOOLEAN NOT NULL,
  ms_elapsed INTEGER,

  -- Reserved for the concept taxonomy. Nothing populates it yet.
  concept_id TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, attempt_id, item_id)
);

CREATE INDEX IF NOT EXISTS assessment_responses_user_idx
  ON public.assessment_responses(user_id);
CREATE INDEX IF NOT EXISTS assessment_responses_item_idx
  ON public.assessment_responses(module_type, lesson_id, item_id);
CREATE INDEX IF NOT EXISTS assessment_responses_created_idx
  ON public.assessment_responses(created_at DESC);

ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own assessment responses" ON public.assessment_responses;
CREATE POLICY "Users can view own assessment responses"
  ON public.assessment_responses FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own assessment responses" ON public.assessment_responses;
CREATE POLICY "Users can insert own assessment responses"
  ON public.assessment_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Teachers never read this table directly; they go through the SECURITY
-- DEFINER functions below, which authorize against classroom ownership first.

-- ============================================================
-- record_assessment_responses — batch write for the caller.
-- The whole quiz posts once, on completion.
-- ============================================================
CREATE OR REPLACE FUNCTION public.record_assessment_responses(p_entries JSONB)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_count integer := 0;
BEGIN
  IF v_uid IS NULL THEN
    RETURN 0;
  END IF;

  IF p_entries IS NULL OR jsonb_typeof(p_entries) <> 'array' THEN
    RETURN 0;
  END IF;

  INSERT INTO public.assessment_responses (
    user_id, attempt_id, instrument, module_type, module_id, lesson_id,
    item_id, item_index, prompt, selected_key, selected_label,
    correct_key, correct_label, is_correct, ms_elapsed, concept_id
  )
  SELECT
    v_uid,
    (e ->> 'attempt_id')::uuid,
    COALESCE(NULLIF(e ->> 'instrument', ''), 'lesson_quiz'),
    e ->> 'module_type',
    NULLIF(e ->> 'module_id', ''),
    e ->> 'lesson_id',
    e ->> 'item_id',
    NULLIF(e ->> 'item_index', '')::integer,
    NULLIF(e ->> 'prompt', ''),
    NULLIF(e ->> 'selected_key', ''),
    NULLIF(e ->> 'selected_label', ''),
    NULLIF(e ->> 'correct_key', ''),
    NULLIF(e ->> 'correct_label', ''),
    COALESCE((e ->> 'is_correct')::boolean, false),
    NULLIF(e ->> 'ms_elapsed', '')::integer,
    NULLIF(e ->> 'concept_id', '')
  FROM jsonb_array_elements(p_entries) AS e
  WHERE e ->> 'attempt_id' IS NOT NULL
    AND e ->> 'module_type' IS NOT NULL
    AND e ->> 'lesson_id' IS NOT NULL
    AND e ->> 'item_id' IS NOT NULL
  ON CONFLICT (user_id, attempt_id, item_id) DO NOTHING;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_assessment_responses(JSONB) TO authenticated;

-- ============================================================
-- teacher_get_question_breakdown — the distractor analysis.
--
-- For every scenario the class has answered, which option each student chose.
-- Only the student's most recent attempt at an item counts, so a retry after
-- review shows what they understand now rather than what they got wrong first.
-- ============================================================
CREATE OR REPLACE FUNCTION public.teacher_get_question_breakdown(
  p_classroom_id UUID,
  p_module_type TEXT DEFAULT NULL
)
RETURNS TABLE (
  module_type TEXT,
  module_id TEXT,
  lesson_id TEXT,
  item_id TEXT,
  prompt TEXT,
  correct_label TEXT,
  response_count BIGINT,
  correct_count BIGINT,
  options JSONB
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN QUERY
  WITH members AS (
    SELECT cm.student_id
    FROM public.classroom_members cm
    WHERE cm.classroom_id = p_classroom_id
      AND cm.status = 'active'
  ),
  latest AS (
    SELECT DISTINCT ON (ar.user_id, ar.module_type, ar.lesson_id, ar.item_id)
      ar.user_id,
      ar.module_type,
      ar.module_id,
      ar.lesson_id,
      ar.item_id,
      ar.prompt,
      ar.selected_key,
      ar.selected_label,
      ar.correct_label,
      ar.is_correct
    FROM public.assessment_responses ar
    JOIN members m ON m.student_id = ar.user_id
    WHERE (p_module_type IS NULL OR ar.module_type = p_module_type)
    ORDER BY ar.user_id, ar.module_type, ar.lesson_id, ar.item_id, ar.created_at DESC
  ),
  per_option AS (
    SELECT
      l.module_type,
      l.lesson_id,
      l.item_id,
      COALESCE(l.selected_label, '(no answer)') AS label,
      bool_or(l.is_correct) AS option_is_correct,
      COUNT(*) AS option_count,
      jsonb_agg(
        jsonb_build_object(
          'student_id', l.user_id,
          'username', COALESCE(pr.username, 'Student')
        )
        ORDER BY COALESCE(pr.username, 'Student')
      ) AS students
    FROM latest l
    LEFT JOIN public.profiles pr ON pr.id = l.user_id
    GROUP BY l.module_type, l.lesson_id, l.item_id, COALESCE(l.selected_label, '(no answer)')
  )
  SELECT
    l.module_type,
    MAX(l.module_id)     AS module_id,
    l.lesson_id,
    l.item_id,
    MAX(l.prompt)        AS prompt,
    MAX(l.correct_label) AS correct_label,
    COUNT(*)                                          AS response_count,
    COUNT(*) FILTER (WHERE l.is_correct)              AS correct_count,
    COALESCE((
      SELECT jsonb_agg(
               jsonb_build_object(
                 'label', po.label,
                 'is_correct', po.option_is_correct,
                 'count', po.option_count,
                 'students', po.students
               )
               ORDER BY po.option_count DESC, po.label
             )
      FROM per_option po
      WHERE po.module_type = l.module_type
        AND po.lesson_id = l.lesson_id
        AND po.item_id = l.item_id
    ), '[]'::jsonb) AS options
  FROM latest l
  GROUP BY l.module_type, l.lesson_id, l.item_id
  -- Most-missed first: this is a "what do I reteach tomorrow" list, not a catalogue.
  ORDER BY (COUNT(*) - COUNT(*) FILTER (WHERE l.is_correct)) DESC, l.lesson_id, l.item_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_get_question_breakdown(UUID, TEXT) TO authenticated;

-- ============================================================
-- teacher_get_student_responses — the same data for one student,
-- for the roster detail sheet. Wrong answers first.
-- ============================================================
CREATE OR REPLACE FUNCTION public.teacher_get_student_responses(
  p_classroom_id UUID,
  p_student_id UUID,
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
  module_type TEXT,
  lesson_id TEXT,
  item_id TEXT,
  prompt TEXT,
  selected_label TEXT,
  correct_label TEXT,
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.classroom_members cm
    WHERE cm.classroom_id = p_classroom_id
      AND cm.student_id = p_student_id
  ) THEN
    RAISE EXCEPTION 'Student is not in this classroom'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN QUERY
  SELECT DISTINCT ON (ar.module_type, ar.lesson_id, ar.item_id)
    ar.module_type,
    ar.lesson_id,
    ar.item_id,
    ar.prompt,
    ar.selected_label,
    ar.correct_label,
    ar.is_correct,
    ar.created_at
  FROM public.assessment_responses ar
  WHERE ar.user_id = p_student_id
  ORDER BY ar.module_type, ar.lesson_id, ar.item_id, ar.created_at DESC
  LIMIT GREATEST(COALESCE(p_limit, 50), 1);
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_get_student_responses(UUID, UUID, INTEGER) TO authenticated;
