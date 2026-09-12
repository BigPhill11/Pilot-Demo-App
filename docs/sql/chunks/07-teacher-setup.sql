-- TEACHER SETUP — CHUNK 7 OF 19
-- Run chunk 6 first. New tab for each. Safe to re-run.

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
