-- Teacher dashboard read APIs.
--
-- Every progress table in this schema is RLS-restricted to
-- `auth.uid() = user_id`, so a teacher cannot read their students' rows
-- directly. These SECURITY DEFINER functions follow the pattern already
-- established by admin_list_code_users: check authorization first, then return
-- only rows belonging to students on the caller's own roster.
--
-- Student email is deliberately absent from the roster listing. It appears only
-- in teacher_get_student_detail, where a teacher has explicitly drilled into one
-- student.

-- ── Role helper ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'teacher') OR public.is_phil_admin();
$$;

GRANT EXECUTE ON FUNCTION public.is_teacher() TO authenticated;

-- ── Classrooms the caller teaches ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_list_classrooms()
RETURNS TABLE (
  id            UUID,
  name          TEXT,
  join_code     TEXT,
  school_name   TEXT,
  term          TEXT,
  is_active     BOOLEAN,
  created_at    TIMESTAMPTZ,
  student_count BIGINT,
  active_last_7 BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_teacher() THEN
    RAISE EXCEPTION 'Teacher access required';
  END IF;

  RETURN QUERY
    SELECT
      c.id,
      c.name,
      c.join_code,
      c.school_name,
      c.term,
      c.is_active,
      c.created_at,
      COALESCE(counts.student_count, 0),
      COALESCE(counts.active_last_7, 0)
    FROM public.classrooms c
    LEFT JOIN LATERAL (
      SELECT
        COUNT(*) AS student_count,
        COUNT(*) FILTER (
          WHERE EXISTS (
            SELECT 1 FROM public.daily_logins d
            WHERE d.user_id = m.student_id
              AND d.login_date >= CURRENT_DATE - 6
          )
        ) AS active_last_7
      FROM public.classroom_members m
      WHERE m.classroom_id = c.id
        AND m.status = 'active'
    ) counts ON TRUE
    WHERE c.teacher_id = auth.uid()
    ORDER BY c.is_active DESC, c.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_list_classrooms() TO authenticated;

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

-- ── Where the class as a whole is struggling ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_get_class_insights(p_classroom_id UUID)
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

  SELECT jsonb_build_object(
    'modules', COALESCE((
      SELECT jsonb_agg(m)
      FROM (
        SELECT jsonb_build_object(
          'module_id', mp.module_id,
          'module_type', mp.module_type,
          'students_started', COUNT(*),
          'students_completed', COUNT(*) FILTER (WHERE mp.progress_percentage >= 100),
          'avg_progress', ROUND(COALESCE(AVG(mp.progress_percentage), 0)),
          'avg_post_test_score', ROUND(AVG(mp.post_test_score))
        ) AS m
        FROM public.module_progress mp
        JOIN public.classroom_members cm
          ON cm.student_id = mp.user_id
         AND cm.classroom_id = p_classroom_id
         AND cm.status = 'active'
        GROUP BY mp.module_id, mp.module_type
        ORDER BY AVG(mp.progress_percentage) ASC
      ) module_agg
    ), '[]'::jsonb),
    'concept_gaps', COALESCE((
      SELECT jsonb_agg(g)
      FROM (
        SELECT jsonb_build_object(
          'fact', f.fact,
          'miss_count', COUNT(*),
          'student_count', COUNT(DISTINCT tb.user_id)
        ) AS g
        FROM public.teach_back_sessions tb
        JOIN public.classroom_members cm
          ON cm.student_id = tb.user_id
         AND cm.classroom_id = p_classroom_id
         AND cm.status = 'active'
        CROSS JOIN LATERAL jsonb_array_elements_text(tb.key_facts_missing) AS f(fact)
        GROUP BY f.fact
        ORDER BY COUNT(*) DESC
        LIMIT 12
      ) gap_agg
    ), '[]'::jsonb)
  ) INTO v_result;

  RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_get_class_insights(UUID) TO authenticated;

-- ── Creating a classroom ─────────────────────────────────────────────────────
-- A teacher needs a sign-up code to hand out, but access_codes is admin-only by
-- RLS. This creates the classroom and its matching student code together, so a
-- teacher never touches the access_codes table directly.
CREATE OR REPLACE FUNCTION public.teacher_create_classroom(
  p_name TEXT,
  p_school_name TEXT DEFAULT NULL,
  p_term TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_alphabet CONSTANT TEXT := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; -- no 0/O/1/I/L
  v_code TEXT;
  v_classroom_id UUID;
  v_name TEXT := NULLIF(btrim(COALESCE(p_name, '')), '');
  v_attempt INTEGER := 0;
BEGIN
  IF NOT public.is_teacher() THEN
    RAISE EXCEPTION 'Teacher access required';
  END IF;

  IF v_name IS NULL THEN
    RAISE EXCEPTION 'Classroom name is required';
  END IF;

  -- Retry on the (unlikely) collision rather than trusting one draw.
  LOOP
    v_attempt := v_attempt + 1;
    SELECT 'CLASS-' || string_agg(
             substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::int, 1), ''
           )
      INTO v_code
      FROM generate_series(1, 4);

    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.classrooms WHERE join_code = v_code)
          AND NOT EXISTS (SELECT 1 FROM public.access_codes WHERE code = v_code);

    IF v_attempt > 20 THEN
      RAISE EXCEPTION 'Could not allocate a unique class code';
    END IF;
  END LOOP;

  INSERT INTO public.classrooms (teacher_id, name, join_code, school_name, term)
  VALUES (auth.uid(), v_name, v_code, NULLIF(btrim(COALESCE(p_school_name, '')), ''),
          NULLIF(btrim(COALESCE(p_term, '')), ''))
  RETURNING id INTO v_classroom_id;

  INSERT INTO public.access_codes (code, label, classroom_id, grants_role, created_by)
  VALUES (v_code, v_name, v_classroom_id, 'user', auth.uid());

  RETURN jsonb_build_object('id', v_classroom_id, 'join_code', v_code, 'name', v_name);
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_create_classroom(TEXT, TEXT, TEXT) TO authenticated;

-- ── Consistency fix ──────────────────────────────────────────────────────────
-- 20260629010000 rewrote admin_list_code_users to accept the owner email via
-- is_phil_admin(), but 20260630000000 ran afterwards and reverted it to a plain
-- has_role() check — so the owner-email path fails on this one RPC while it
-- works everywhere else. Restore the intended check.
CREATE OR REPLACE FUNCTION public.admin_list_code_users(p_code TEXT)
RETURNS TABLE (username TEXT, email TEXT, created_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_phil_admin() THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;

  RETURN QUERY
    SELECT p.username, p.email, p.created_at
    FROM public.profiles p
    WHERE p.signup_access_code = upper(btrim(p_code))
    ORDER BY p.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_code_users(TEXT) TO authenticated;
