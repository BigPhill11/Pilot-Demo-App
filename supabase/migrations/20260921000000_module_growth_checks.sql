-- Invisible pre/post growth tracking for personal-finance modules.
--
-- A module can optionally define a "growth check": a handful of anchor
-- questions plus one decision scenario, asked once as a quiet "warm-up"
-- before the student's first lesson and again as a quiet "wrap-up" after
-- their last lesson. Neither moment is ever labeled a test in the UI — this
-- schema exists purely so a teacher can see whether a student actually grew,
-- not just whether they clicked through a module.
--
-- module_progress already carries pre_test_score / post_test_score /
-- improvement_percentage (see 20251122032415) and the teacher dashboard
-- already reads them (teacher_get_student_detail, teacher_get_class_insights)
-- — they've just never been populated. This migration finishes wiring them
-- and adds the handful of extra columns the richer growth signal needs.

ALTER TABLE public.module_progress
  ADD COLUMN IF NOT EXISTS growth_baseline JSONB,
  ADD COLUMN IF NOT EXISTS growth_final JSONB,
  ADD COLUMN IF NOT EXISTS decision_quality_pre NUMERIC,
  ADD COLUMN IF NOT EXISTS decision_quality_post NUMERIC,
  ADD COLUMN IF NOT EXISTS confidence_accuracy_gap_pre NUMERIC,
  ADD COLUMN IF NOT EXISTS confidence_accuracy_gap_post NUMERIC;

-- ── Recording a warm-up or wrap-up growth check ──────────────────────────────
--
-- p_payload shape (both phases):
--   {
--     "captured_at": "2026-09-21T14:03:00Z",
--     "answers": [{ "anchor_id": "...", "selected_index": 2, "correct": true, "confidence": 62 }, ...],
--     "decision": { "scenario_id": "...", "choice_id": "...", "optimality": 80 }
--   }
--
-- Guards, so a student can't quietly redo either half after the fact:
--   - baseline can only be written once (growth_baseline must be NULL)
--   - final can only be written once a baseline exists, and only once
--     (growth_baseline IS NOT NULL AND growth_final IS NULL)
--
-- All derived scalars (knowledge score, decision quality, confidence gap) are
-- computed here, server-side, so the teacher RPCs can read them as plain
-- columns instead of re-parsing JSONB on every query.
CREATE OR REPLACE FUNCTION public.record_module_growth_check(
  p_module_id TEXT,
  p_module_type TEXT,
  p_phase TEXT,
  p_payload JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_answers JSONB;
  v_total INTEGER;
  v_correct INTEGER;
  v_confidence_sum NUMERIC;
  v_knowledge_score INTEGER;
  v_confidence_avg NUMERIC;
  v_confidence_gap NUMERIC;
  v_decision_quality NUMERIC;
  v_existing_baseline JSONB;
  v_existing_final JSONB;
  v_pre_score INTEGER;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_phase NOT IN ('baseline', 'final') THEN
    RAISE EXCEPTION 'Invalid phase: %', p_phase;
  END IF;

  IF p_module_id IS NULL OR p_module_type IS NULL OR p_payload IS NULL THEN
    RETURN FALSE;
  END IF;

  v_answers := COALESCE(p_payload -> 'answers', '[]'::jsonb);
  SELECT COUNT(*) INTO v_total FROM jsonb_array_elements(v_answers);
  IF v_total = 0 THEN
    RETURN FALSE;
  END IF;

  SELECT COUNT(*) FILTER (WHERE (a ->> 'correct')::boolean)
    INTO v_correct
    FROM jsonb_array_elements(v_answers) a;

  SELECT SUM(LEAST(GREATEST(COALESCE((a ->> 'confidence')::numeric, 0), 0), 100))
    INTO v_confidence_sum
    FROM jsonb_array_elements(v_answers) a;

  v_knowledge_score := ROUND((v_correct::numeric / v_total) * 100);
  v_confidence_avg := ROUND(v_confidence_sum / v_total, 1);
  v_confidence_gap := ROUND(v_confidence_avg - v_knowledge_score, 1);
  v_decision_quality := LEAST(GREATEST(COALESCE((p_payload -> 'decision' ->> 'optimality')::numeric, 0), 0), 100);

  SELECT mp.growth_baseline, mp.growth_final, mp.pre_test_score
    INTO v_existing_baseline, v_existing_final, v_pre_score
    FROM public.module_progress mp
    WHERE mp.user_id = v_uid
      AND mp.module_id = p_module_id
      AND mp.module_type = p_module_type
      AND mp.course_id IS NULL;

  IF NOT FOUND THEN
    -- No progress row yet (growth check fired before the first save-progress
    -- write) — create a bare one so the write below always has a row to hit.
    INSERT INTO public.module_progress (user_id, module_id, module_type, last_accessed)
    VALUES (v_uid, p_module_id, p_module_type, now());
    v_existing_baseline := NULL;
    v_existing_final := NULL;
    v_pre_score := NULL;
  END IF;

  IF p_phase = 'baseline' THEN
    IF v_existing_baseline IS NOT NULL THEN
      RETURN FALSE; -- already recorded, first-write-wins
    END IF;

    UPDATE public.module_progress mp
    SET growth_baseline = p_payload,
        pre_test_score = v_knowledge_score,
        decision_quality_pre = v_decision_quality,
        confidence_accuracy_gap_pre = v_confidence_gap,
        updated_at = now()
    WHERE mp.user_id = v_uid
      AND mp.module_id = p_module_id
      AND mp.module_type = p_module_type
      AND mp.course_id IS NULL;
  ELSE
    IF v_existing_baseline IS NULL OR v_existing_final IS NOT NULL THEN
      RETURN FALSE; -- no baseline to compare against, or already recorded
    END IF;

    UPDATE public.module_progress mp
    SET growth_final = p_payload,
        post_test_score = v_knowledge_score,
        improvement_percentage = v_knowledge_score - COALESCE(v_pre_score, 0),
        decision_quality_post = v_decision_quality,
        confidence_accuracy_gap_post = v_confidence_gap,
        updated_at = now()
    WHERE mp.user_id = v_uid
      AND mp.module_id = p_module_id
      AND mp.module_type = p_module_type
      AND mp.course_id IS NULL;
  END IF;

  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_module_growth_check(TEXT, TEXT, TEXT, JSONB) TO authenticated;

-- ── Teacher-facing growth summaries ──────────────────────────────────────────
-- Per-student × per-module growth, the growth analogue of teacher_get_module_matrix.
CREATE OR REPLACE FUNCTION public.teacher_get_growth_summary(p_classroom_id UUID)
RETURNS TABLE (
  student_id             UUID,
  module_id              TEXT,
  module_type            TEXT,
  knowledge_score_pre     INTEGER,
  knowledge_score_post    INTEGER,
  knowledge_score_delta   INTEGER,
  decision_quality_pre    NUMERIC,
  decision_quality_post   NUMERIC,
  decision_quality_delta  NUMERIC,
  confidence_gap_pre      NUMERIC,
  confidence_gap_post     NUMERIC,
  confidence_gap_delta    NUMERIC,
  captured_at             TIMESTAMPTZ
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
      mp.pre_test_score,
      mp.post_test_score,
      mp.improvement_percentage,
      mp.decision_quality_pre,
      mp.decision_quality_post,
      mp.decision_quality_post - mp.decision_quality_pre,
      mp.confidence_accuracy_gap_pre,
      mp.confidence_accuracy_gap_post,
      mp.confidence_accuracy_gap_post - mp.confidence_accuracy_gap_pre,
      (mp.growth_final ->> 'captured_at')::timestamptz
    FROM public.module_progress mp
    JOIN public.classroom_members m
      ON m.student_id = mp.user_id
     AND m.classroom_id = p_classroom_id
     AND m.status = 'active'
    WHERE mp.post_test_score IS NOT NULL
      AND mp.growth_final IS NOT NULL;
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_get_growth_summary(UUID) TO authenticated;

-- Class-wide growth trend, one row per module.
CREATE OR REPLACE FUNCTION public.teacher_get_class_growth_trend(p_classroom_id UUID)
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
    'by_module', COALESCE((
      SELECT jsonb_agg(m)
      FROM (
        SELECT jsonb_build_object(
          'module_id', mp.module_id,
          'module_type', mp.module_type,
          'students_with_growth_data', COUNT(*),
          'avg_knowledge_pre', ROUND(AVG(mp.pre_test_score)),
          'avg_knowledge_post', ROUND(AVG(mp.post_test_score)),
          'avg_knowledge_delta', ROUND(AVG(mp.improvement_percentage)),
          'avg_decision_quality_pre', ROUND(AVG(mp.decision_quality_pre), 1),
          'avg_decision_quality_post', ROUND(AVG(mp.decision_quality_post), 1),
          'avg_confidence_gap_pre', ROUND(AVG(mp.confidence_accuracy_gap_pre), 1),
          'avg_confidence_gap_post', ROUND(AVG(mp.confidence_accuracy_gap_post), 1)
        ) AS m
        FROM public.module_progress mp
        JOIN public.classroom_members cm
          ON cm.student_id = mp.user_id
         AND cm.classroom_id = p_classroom_id
         AND cm.status = 'active'
        WHERE mp.post_test_score IS NOT NULL
          AND mp.growth_final IS NOT NULL
        GROUP BY mp.module_id, mp.module_type
      ) agg
    ), '[]'::jsonb)
  ) INTO v_result;

  RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.teacher_get_class_growth_trend(UUID) TO authenticated;
