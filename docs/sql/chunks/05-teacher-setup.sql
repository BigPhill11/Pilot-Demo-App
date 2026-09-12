-- TEACHER SETUP — CHUNK 5 OF 19
-- Run chunk 4 first. New tab for each. Safe to re-run.

-- ── Login activity for the engagement heatmap ────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_get_activity(
  p_classroom_id UUID,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  student_id UUID,
  login_date DATE
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_days INTEGER := LEAST(GREATEST(COALESCE(p_days, 30), 1), 365);
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom';
  END IF;

  RETURN QUERY
    SELECT d.user_id, d.login_date
    FROM public.daily_logins d
    JOIN public.classroom_members m
      ON m.student_id = d.user_id
     AND m.classroom_id = p_classroom_id
     AND m.status = 'active'
    WHERE d.login_date >= CURRENT_DATE - (v_days - 1);
END;
$$;
GRANT EXECUTE ON FUNCTION public.teacher_get_activity(UUID, INTEGER) TO authenticated;
