-- TEACHER SETUP — CHUNK 15 OF 19
-- Run chunk 14 first. New tab for each. Safe to re-run.

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
