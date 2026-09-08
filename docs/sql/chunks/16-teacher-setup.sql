-- TEACHER SETUP — CHUNK 16 OF 17
-- Run chunk 15 first. New tab for each. Safe to re-run.

-- Teach-back proficiency for the teacher dashboard.
--
-- Teach Phil is the one place in the app where a student has to explain a
-- concept in their own words and gets graded on whether the explanation held
-- up. That makes teach_back_sessions the closest thing to a real measure of
-- understanding the product collects, and none of it reached the teacher: the
-- class insights panel aggregated missed facts across the whole class, so you
-- could see the class was shaky on something without seeing who.
--
-- Returns one payload with three views of the same sessions — per student, per
-- lesson, and a class summary — because the dashboard shows all three together
-- and three round trips for one panel is silly.

CREATE OR REPLACE FUNCTION public.teacher_get_teachback_overview(p_classroom_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  IF NOT public.teacher_owns_classroom(p_classroom_id) THEN
    RAISE EXCEPTION 'Not your classroom'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  WITH members AS (
    SELECT cm.student_id
    FROM public.classroom_members cm
    WHERE cm.classroom_id = p_classroom_id
      AND cm.status = 'active'
  ),
  sessions AS (
    SELECT tb.*
    FROM public.teach_back_sessions tb
    JOIN members m ON m.student_id = tb.user_id
  ),
  -- Every missed fact, one row per (session, fact), so it can be counted both
  -- by student and by lesson without re-expanding the jsonb twice.
  misses AS (
    SELECT s.user_id, s.lesson_id, f.fact
    FROM sessions s
    CROSS JOIN LATERAL jsonb_array_elements_text(s.key_facts_missing) AS f(fact)
  ),
  student_rows AS (
    SELECT
      m.student_id,
      COALESCE(pr.username, 'Student') AS username,
      COUNT(s.id)                                        AS sessions,
      COUNT(s.id) FILTER (WHERE s.passed)                AS passed_sessions,
      COALESCE(ROUND(AVG(s.final_understanding_score)), 0) AS avg_score,
      COALESCE(MAX(s.final_understanding_score), 0)      AS best_score,
      MAX(s.created_at)                                  AS last_at,
      COUNT(DISTINCT s.lesson_id)                        AS lessons_attempted
    FROM members m
    LEFT JOIN public.profiles pr ON pr.id = m.student_id
    LEFT JOIN sessions s ON s.user_id = m.student_id
    GROUP BY m.student_id, pr.username
  ),
  lesson_rows AS (
    SELECT
      s.lesson_id,
      COUNT(*)                                           AS sessions,
      COUNT(DISTINCT s.user_id)                          AS student_count,
      COALESCE(ROUND(AVG(s.final_understanding_score)), 0) AS avg_score,
      COUNT(*) FILTER (WHERE s.passed)                   AS passed_sessions
    FROM sessions s
    GROUP BY s.lesson_id
  )
  SELECT jsonb_build_object(
    'summary', (
      SELECT jsonb_build_object(
        'sessions', COUNT(*),
        'students_attempted', COUNT(DISTINCT user_id),
        'avg_score', COALESCE(ROUND(AVG(final_understanding_score)), 0),
        'pass_rate', CASE WHEN COUNT(*) = 0 THEN 0
                          ELSE ROUND(100.0 * COUNT(*) FILTER (WHERE passed) / COUNT(*))
                     END
      )
      FROM sessions
    ),
    'students', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'student_id', sr.student_id,
          'username', sr.username,
          'sessions', sr.sessions,
          'passed_sessions', sr.passed_sessions,
          'avg_score', sr.avg_score,
          'best_score', sr.best_score,
          'lessons_attempted', sr.lessons_attempted,
          'last_at', sr.last_at,
          'top_missed', COALESCE((
            SELECT jsonb_agg(t.fact ORDER BY t.n DESC, t.fact)
            FROM (
              SELECT mi.fact, COUNT(*) AS n
              FROM misses mi
              WHERE mi.user_id = sr.student_id
              GROUP BY mi.fact
              ORDER BY COUNT(*) DESC, mi.fact
              LIMIT 4
            ) t
          ), '[]'::jsonb)
        )
        ORDER BY sr.sessions DESC, sr.avg_score DESC, sr.username
      )
      FROM student_rows sr
    ), '[]'::jsonb),
    'lessons', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'lesson_id', lr.lesson_id,
          'sessions', lr.sessions,
          'student_count', lr.student_count,
          'avg_score', lr.avg_score,
          'pass_rate', CASE WHEN lr.sessions = 0 THEN 0
                            ELSE ROUND(100.0 * lr.passed_sessions / lr.sessions)
                       END,
          'top_missed', COALESCE((
            SELECT jsonb_agg(jsonb_build_object('fact', t.fact, 'count', t.n)
                             ORDER BY t.n DESC, t.fact)
            FROM (
              SELECT mi.fact, COUNT(*) AS n
              FROM misses mi
              WHERE mi.lesson_id = lr.lesson_id
              GROUP BY mi.fact
              ORDER BY COUNT(*) DESC, mi.fact
              LIMIT 5
            ) t
          ), '[]'::jsonb)
        )
        ORDER BY lr.avg_score ASC, lr.lesson_id
      )
      FROM lesson_rows lr
    ), '[]'::jsonb)
  )
  INTO v_result;

  RETURN COALESCE(v_result, jsonb_build_object(
    'summary', jsonb_build_object('sessions', 0, 'students_attempted', 0, 'avg_score', 0, 'pass_rate', 0),
    'students', '[]'::jsonb,
    'lessons', '[]'::jsonb
  ));
END;
$$;
