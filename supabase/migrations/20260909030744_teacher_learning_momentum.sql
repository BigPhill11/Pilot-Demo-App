-- A paired, evidence-based week-over-week learning measure for teachers.
--
-- "Learning score" is calculated per student first, so one student taking many
-- quizzes cannot dominate the class:
--   * scenario answers: percentage correct
--   * Ask Phil teach-backs: average understanding score
--   * when both exist: 70% scenarios + 30% teach-backs
--
-- A student-week needs at least three scenario answers or one teach-back. The
-- headline change compares only students with enough evidence in BOTH of the
-- latest two rolling 7-day windows. That paired cohort is important: otherwise
-- a different group of students signing in could look like learning growth.

CREATE OR REPLACE FUNCTION public.teacher_get_learning_momentum(
  p_classroom_id UUID,
  p_weeks INTEGER DEFAULT 6
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_weeks integer := LEAST(GREATEST(COALESCE(p_weeks, 6), 2), 12);
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
  assessment AS (
    SELECT
      ar.user_id,
      FLOOR((CURRENT_DATE - ar.created_at::date) / 7.0)::integer AS bucket,
      ROUND(100.0 * COUNT(*) FILTER (WHERE ar.is_correct) / COUNT(*), 1) AS score,
      COUNT(*)::integer AS evidence
    FROM public.assessment_responses ar
    JOIN members m ON m.student_id = ar.user_id
    WHERE ar.created_at::date BETWEEN CURRENT_DATE - (v_weeks * 7 - 1) AND CURRENT_DATE
    GROUP BY ar.user_id, FLOOR((CURRENT_DATE - ar.created_at::date) / 7.0)::integer
  ),
  teachback AS (
    SELECT
      tb.user_id,
      FLOOR((CURRENT_DATE - tb.created_at::date) / 7.0)::integer AS bucket,
      ROUND(AVG(tb.final_understanding_score), 1) AS score,
      COUNT(*)::integer AS evidence
    FROM public.teach_back_sessions tb
    JOIN members m ON m.student_id = tb.user_id
    WHERE tb.created_at::date BETWEEN CURRENT_DATE - (v_weeks * 7 - 1) AND CURRENT_DATE
    GROUP BY tb.user_id, FLOOR((CURRENT_DATE - tb.created_at::date) / 7.0)::integer
  ),
  student_weeks AS (
    SELECT
      COALESCE(a.user_id, t.user_id) AS user_id,
      COALESCE(a.bucket, t.bucket) AS bucket,
      CASE
        WHEN a.score IS NOT NULL AND t.score IS NOT NULL
          THEN ROUND(a.score * 0.7 + t.score * 0.3, 1)
        ELSE COALESCE(a.score, t.score)
      END AS score,
      COALESCE(a.evidence, 0) AS assessment_items,
      COALESCE(t.evidence, 0) AS teachbacks
    FROM assessment a
    FULL JOIN teachback t
      ON t.user_id = a.user_id
     AND t.bucket = a.bucket
    WHERE COALESCE(a.evidence, 0) >= 3
       OR COALESCE(t.evidence, 0) >= 1
  ),
  buckets AS (
    SELECT generate_series(0, v_weeks - 1) AS bucket
  ),
  weekly AS (
    SELECT
      b.bucket,
      (CURRENT_DATE - (b.bucket * 7 + 6)) AS starts_on,
      (CURRENT_DATE - b.bucket * 7) AS ends_on,
      ROUND(AVG(sw.score), 1) AS score,
      COUNT(sw.user_id)::integer AS students,
      COALESCE(SUM(sw.assessment_items), 0)::integer AS assessment_items,
      COALESCE(SUM(sw.teachbacks), 0)::integer AS teachbacks
    FROM buckets b
    LEFT JOIN student_weeks sw ON sw.bucket = b.bucket
    GROUP BY b.bucket
  ),
  paired AS (
    SELECT
      COUNT(*)::integer AS students,
      ROUND(AVG(current_week.score - prior_week.score), 1) AS change
    FROM student_weeks current_week
    JOIN student_weeks prior_week
      ON prior_week.user_id = current_week.user_id
     AND prior_week.bucket = 1
    WHERE current_week.bucket = 0
  )
  SELECT jsonb_build_object(
    'metric_name', 'Learning Momentum',
    'minimum_paired_students', 3,
    'current_score', (SELECT score FROM weekly WHERE bucket = 0),
    'paired_students', (SELECT students FROM paired),
    'week_over_week_change', CASE
      WHEN (SELECT students FROM paired) >= 3 THEN (SELECT change FROM paired)
      ELSE NULL
    END,
    'weeks', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'starts_on', w.starts_on,
          'ends_on', w.ends_on,
          'score', w.score,
          'students', w.students,
          'assessment_items', w.assessment_items,
          'teachbacks', w.teachbacks
        )
        ORDER BY w.bucket DESC
      )
      FROM weekly w
    ), '[]'::jsonb)
  )
  INTO v_result;

  RETURN v_result;
END;
$$;

REVOKE ALL ON FUNCTION public.teacher_get_learning_momentum(UUID, INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.teacher_get_learning_momentum(UUID, INTEGER) FROM anon;
GRANT EXECUTE ON FUNCTION public.teacher_get_learning_momentum(UUID, INTEGER) TO authenticated;
