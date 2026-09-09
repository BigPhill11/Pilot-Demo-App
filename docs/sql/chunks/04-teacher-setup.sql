-- TEACHER SETUP — CHUNK 4 OF 19
-- Run chunk 3 first. New tab for each. Safe to re-run.

-- ── Roster with headline metrics per student ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_get_roster(p_classroom_id UUID)
RETURNS TABLE (
  student_id              UUID,
  username                TEXT,
  joined_at               TIMESTAMPTZ,
  last_login_date         DATE,
  current_streak          INTEGER,
  longest_streak          INTEGER,
  total_points            INTEGER,
  modules_completed       BIGINT,
  modules_in_progress     BIGINT,
  avg_progress            NUMERIC,
  career_levels_completed BIGINT,
  teach_backs_completed   INTEGER,
  days_active_30          BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom';
  END IF;

  RETURN QUERY
    SELECT
      m.student_id,
      p.username,
      m.joined_at,
      p.last_login_date,
      COALESCE(p.current_streak, 0),
      COALESCE(p.longest_streak, 0),
      COALESCE(up.total_points, 0),
      COALESCE(mods.completed, 0),
      COALESCE(mods.in_progress, 0),
      COALESCE(mods.avg_progress, 0),
      COALESCE(careers.levels, 0),
      COALESCE(p.teach_backs_completed, 0),
      COALESCE(logins.days_active, 0)
    FROM public.classroom_members m
    JOIN public.profiles p ON p.id = m.student_id
    LEFT JOIN public.user_progress up ON up.user_id = m.student_id
    LEFT JOIN LATERAL (
      SELECT
        COUNT(*) FILTER (WHERE x.progress_percentage >= 100) AS completed,
        COUNT(*) FILTER (WHERE x.progress_percentage > 0 AND x.progress_percentage < 100) AS in_progress,
        ROUND(COALESCE(AVG(x.progress_percentage), 0)) AS avg_progress
      FROM public.module_progress x
      WHERE x.user_id = m.student_id
    ) mods ON TRUE
    LEFT JOIN LATERAL (
      SELECT COUNT(*) AS levels
      FROM public.lesson_completions lc
      WHERE lc.user_id = m.student_id
    ) careers ON TRUE
    LEFT JOIN LATERAL (
      SELECT COUNT(*) AS days_active
      FROM public.daily_logins d
      WHERE d.user_id = m.student_id
        AND d.login_date >= CURRENT_DATE - 29
    ) logins ON TRUE
    WHERE m.classroom_id = p_classroom_id
      AND m.status = 'active'
    ORDER BY p.username NULLS LAST;
END;
$$;
GRANT EXECUTE ON FUNCTION public.teacher_get_roster(UUID) TO authenticated;
-- ── Per-student, per-module progress (the completion matrix) ─────────────────
CREATE OR REPLACE FUNCTION public.teacher_get_module_matrix(p_classroom_id UUID)
RETURNS TABLE (
  student_id          UUID,
  module_id           TEXT,
  module_type         TEXT,
  progress_percentage INTEGER,
  completed_at        TIMESTAMPTZ,
  last_accessed       TIMESTAMPTZ
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom';
  END IF;

  RETURN QUERY
    SELECT
      mp.user_id,
      mp.module_id,
      mp.module_type,
      COALESCE(mp.progress_percentage, 0),
      mp.completed_at,
      mp.last_accessed
    FROM public.module_progress mp
    JOIN public.classroom_members m
      ON m.student_id = mp.user_id
     AND m.classroom_id = p_classroom_id
     AND m.status = 'active';
END;
$$;
GRANT EXECUTE ON FUNCTION public.teacher_get_module_matrix(UUID) TO authenticated;
