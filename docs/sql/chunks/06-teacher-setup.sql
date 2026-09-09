-- TEACHER SETUP — CHUNK 6 OF 17
-- Run chunk 5 first. New tab for each. Safe to re-run.

-- ── One student, everything ──────────────────────────────────────────────────
-- Returned as a single JSONB document so the detail panel opens in one round
-- trip instead of five.
CREATE OR REPLACE FUNCTION public.teacher_get_student_detail(
  p_classroom_id UUID,
  p_student_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.classroom_members m
    WHERE m.classroom_id = p_classroom_id
      AND m.student_id = p_student_id
      AND m.status = 'active'
  ) THEN
    RAISE EXCEPTION 'Student is not on this roster';
  END IF;

  SELECT jsonb_build_object(
    'profile', (
      SELECT jsonb_build_object(
        'student_id', p.id,
        'username', p.username,
        'email', p.email,
        'joined_at', m.joined_at,
        'created_at', p.created_at,
        'last_login_date', p.last_login_date,
        'current_streak', COALESCE(p.current_streak, 0),
        'longest_streak', COALESCE(p.longest_streak, 0),
        'total_points', COALESCE(up.total_points, 0),
        'engagement_score', COALESCE(up.engagement_score, 0),
        'teach_backs_completed', COALESCE(p.teach_backs_completed, 0)
      )
      FROM public.profiles p
      JOIN public.classroom_members m
        ON m.student_id = p.id AND m.classroom_id = p_classroom_id
      LEFT JOIN public.user_progress up ON up.user_id = p.id
      WHERE p.id = p_student_id
    ),
    'modules', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'module_id', mp.module_id,
        'module_type', mp.module_type,
        'course_id', mp.course_id,
        'progress_percentage', COALESCE(mp.progress_percentage, 0),
        'time_spent_minutes', COALESCE(mp.time_spent_minutes, 0),
        'pre_test_score', mp.pre_test_score,
        'post_test_score', mp.post_test_score,
        'last_accessed', mp.last_accessed,
        'completed_at', mp.completed_at
      ) ORDER BY mp.last_accessed DESC NULLS LAST)
      FROM public.module_progress mp
      WHERE mp.user_id = p_student_id
    ), '[]'::jsonb),
    'careers', COALESCE((
      SELECT jsonb_agg(c)
      FROM (
        SELECT jsonb_build_object(
          'career_id', lc.career_id,
          'levels_completed', COUNT(*),
          'last_completed_at', MAX(lc.completed_at)
        ) AS c
        FROM public.lesson_completions lc
        WHERE lc.user_id = p_student_id
        GROUP BY lc.career_id
        ORDER BY COUNT(*) DESC
      ) careers_agg
    ), '[]'::jsonb),
    'recent_xp', COALESCE((
      SELECT jsonb_agg(x)
      FROM (
        SELECT jsonb_build_object(
          'xp_amount', xt.xp_amount,
          'source', xt.source,
          'created_at', xt.created_at
        ) AS x
        FROM public.xp_transactions xt
        WHERE xt.user_id = p_student_id
        ORDER BY xt.created_at DESC
        LIMIT 25
      ) xp_agg
    ), '[]'::jsonb),
    'teach_backs', COALESCE((
      SELECT jsonb_agg(t)
      FROM (
        SELECT jsonb_build_object(
          'lesson_id', tb.lesson_id,
          'difficulty_tier', tb.difficulty_tier,
          'final_understanding_score', tb.final_understanding_score,
          'passed', tb.passed,
          'key_facts_missing', tb.key_facts_missing,
          'created_at', tb.created_at
        ) AS t
        FROM public.teach_back_sessions tb
        WHERE tb.user_id = p_student_id
        ORDER BY tb.created_at DESC
        LIMIT 20
      ) tb_agg
    ), '[]'::jsonb),
    'activity', COALESCE((
      SELECT jsonb_agg(d.login_date ORDER BY d.login_date)
      FROM public.daily_logins d
      WHERE d.user_id = p_student_id
        AND d.login_date >= CURRENT_DATE - 59
    ), '[]'::jsonb)
  ) INTO v_result;

  RETURN v_result;
END;
$$;
GRANT EXECUTE ON FUNCTION public.teacher_get_student_detail(UUID, UUID) TO authenticated;
