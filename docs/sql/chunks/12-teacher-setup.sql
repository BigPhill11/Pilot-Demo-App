-- TEACHER SETUP — CHUNK 12 OF 17
-- Run chunk 11 first. New tab for each. Safe to re-run.

-- ============================================================
-- admin_list_teachers — who currently holds the role, and how
-- many classes they run. Lets the admin panel answer "did that
-- teacher's code actually work?" without a SQL console.
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_list_teachers()
RETURNS TABLE (
  user_id UUID,
  email TEXT,
  username TEXT,
  created_at TIMESTAMPTZ,
  classroom_count BIGINT,
  student_count BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_phil_admin() THEN
    RAISE EXCEPTION 'Admin access required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  RETURN QUERY
  SELECT
    ur.user_id,
    p.email::text,
    p.username::text,
    p.created_at,
    (SELECT COUNT(*) FROM public.classrooms c WHERE c.teacher_id = ur.user_id),
    (SELECT COUNT(*)
       FROM public.classroom_members cm
       JOIN public.classrooms c2 ON c2.id = cm.classroom_id
      WHERE c2.teacher_id = ur.user_id AND cm.status = 'active')
  FROM public.user_roles ur
  LEFT JOIN public.profiles p ON p.id = ur.user_id
  WHERE ur.role = 'teacher'
  ORDER BY p.created_at DESC NULLS LAST;
END;
$$;
GRANT EXECUTE ON FUNCTION public.admin_list_teachers() TO authenticated;
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
