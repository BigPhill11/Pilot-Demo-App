-- TEACHER SETUP — CHUNK 14 OF 17
-- Run chunk 13 first. New tab for each. Safe to re-run.

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
