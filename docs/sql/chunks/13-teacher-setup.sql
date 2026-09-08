-- TEACHER SETUP — CHUNK 13 OF 17
-- Run chunk 12 first. New tab for each. Safe to re-run.

-- Teachers never read this table directly; they go through the SECURITY
-- DEFINER functions below, which authorize against classroom ownership first.

-- ============================================================
-- record_assessment_responses — batch write for the caller.
-- The whole quiz posts once, on completion.
-- ============================================================
CREATE OR REPLACE FUNCTION public.record_assessment_responses(p_entries JSONB)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_count integer := 0;
BEGIN
  IF v_uid IS NULL THEN
    RETURN 0;
  END IF;

  IF p_entries IS NULL OR jsonb_typeof(p_entries) <> 'array' THEN
    RETURN 0;
  END IF;

  INSERT INTO public.assessment_responses (
    user_id, attempt_id, instrument, module_type, module_id, lesson_id,
    item_id, item_index, prompt, selected_key, selected_label,
    correct_key, correct_label, is_correct, ms_elapsed, concept_id
  )
  SELECT
    v_uid,
    (e ->> 'attempt_id')::uuid,
    COALESCE(NULLIF(e ->> 'instrument', ''), 'lesson_quiz'),
    e ->> 'module_type',
    NULLIF(e ->> 'module_id', ''),
    e ->> 'lesson_id',
    e ->> 'item_id',
    NULLIF(e ->> 'item_index', '')::integer,
    NULLIF(e ->> 'prompt', ''),
    NULLIF(e ->> 'selected_key', ''),
    NULLIF(e ->> 'selected_label', ''),
    NULLIF(e ->> 'correct_key', ''),
    NULLIF(e ->> 'correct_label', ''),
    COALESCE((e ->> 'is_correct')::boolean, false),
    NULLIF(e ->> 'ms_elapsed', '')::integer,
    NULLIF(e ->> 'concept_id', '')
  FROM jsonb_array_elements(p_entries) AS e
  WHERE e ->> 'attempt_id' IS NOT NULL
    AND e ->> 'module_type' IS NOT NULL
    AND e ->> 'lesson_id' IS NOT NULL
    AND e ->> 'item_id' IS NOT NULL
  ON CONFLICT (user_id, attempt_id, item_id) DO NOTHING;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;
GRANT EXECUTE ON FUNCTION public.record_assessment_responses(JSONB) TO authenticated;
