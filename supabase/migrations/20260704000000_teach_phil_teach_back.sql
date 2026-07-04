-- Teach Phil (teach-back) feature: session analytics log, cumulative counter,
-- atomic session-recording RPC, and per-user daily turn quota.
-- Tables: teach_back_sessions, teach_phil_daily_usage
-- Columns: profiles.teach_backs_completed

-- ============================================================
-- teach_back_sessions — one row per completed teach-back session
-- (passed, failed-to-fallback, or abandoned-and-finalized).
-- key_facts_missing feeds the content-team analytics dashboard:
-- which facts students most often fail to cover per lesson.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.teach_back_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  difficulty_tier TEXT NOT NULL CHECK (difficulty_tier IN ('cub', 'teen', 'elder')),
  turns_taken INTEGER NOT NULL DEFAULT 0,
  final_understanding_score INTEGER NOT NULL DEFAULT 0 CHECK (final_understanding_score BETWEEN 0 AND 100),
  key_facts_missing JSONB NOT NULL DEFAULT '[]'::jsonb,
  flagged_copied_text BOOLEAN NOT NULL DEFAULT false,
  passed BOOLEAN NOT NULL DEFAULT false,
  used_fallback BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.teach_back_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own teach back sessions"
  ON public.teach_back_sessions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own teach back sessions"
  ON public.teach_back_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS teach_back_sessions_user_id_idx
  ON public.teach_back_sessions(user_id);
CREATE INDEX IF NOT EXISTS teach_back_sessions_lesson_id_idx
  ON public.teach_back_sessions(lesson_id);
CREATE INDEX IF NOT EXISTS teach_back_sessions_created_at_idx
  ON public.teach_back_sessions(created_at DESC);

-- ============================================================
-- profiles.teach_backs_completed — cumulative passed sessions,
-- drives the Teaching Pagoda unlock/upgrade in Bamboo Empire
-- ============================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS teach_backs_completed INTEGER NOT NULL DEFAULT 0;

-- ============================================================
-- RPC: record a finished teach-back session and, if passed,
-- bump the profile counter in the same transaction.
-- Called from the TeachPhil Edge Function with service role.
-- Returns JSON: { session_id, teach_backs_completed }
-- ============================================================
CREATE OR REPLACE FUNCTION public.teach_back_record_session(
  p_user_id uuid,
  p_lesson_id text,
  p_difficulty_tier text,
  p_turns_taken int,
  p_final_understanding_score int,
  p_key_facts_missing jsonb,
  p_flagged_copied_text boolean,
  p_passed boolean,
  p_used_fallback boolean
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_session_id uuid;
  v_count int;
BEGIN
  INSERT INTO teach_back_sessions (
    user_id, lesson_id, difficulty_tier, turns_taken,
    final_understanding_score, key_facts_missing,
    flagged_copied_text, passed, used_fallback
  )
  VALUES (
    p_user_id, p_lesson_id, p_difficulty_tier, p_turns_taken,
    p_final_understanding_score, COALESCE(p_key_facts_missing, '[]'::jsonb),
    p_flagged_copied_text, p_passed, p_used_fallback
  )
  RETURNING id INTO v_session_id;

  IF p_passed THEN
    UPDATE profiles
    SET teach_backs_completed = COALESCE(teach_backs_completed, 0) + 1
    WHERE id = p_user_id
    RETURNING teach_backs_completed INTO v_count;
  ELSE
    SELECT COALESCE(teach_backs_completed, 0) INTO v_count
    FROM profiles
    WHERE id = p_user_id;
  END IF;

  RETURN jsonb_build_object(
    'session_id', v_session_id,
    'teach_backs_completed', COALESCE(v_count, 0)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.teach_back_record_session(uuid, text, text, int, int, jsonb, boolean, boolean, boolean) TO service_role;

-- ============================================================
-- Daily turn quota — mirrors ask_phil_daily_usage but counts
-- individual AI turns, not sessions. Generous limit: Teach Phil
-- is a required step, so this is an abuse backstop (the real
-- cost cap is the 5-turn session limit); the Edge Function
-- fails open if the quota check errors.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.teach_phil_daily_usage (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date date NOT NULL DEFAULT (CURRENT_DATE AT TIME ZONE 'UTC'),
  request_count int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_date)
);

ALTER TABLE public.teach_phil_daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own teach phil usage"
  ON public.teach_phil_daily_usage
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_teach_phil_daily_usage_date
  ON public.teach_phil_daily_usage (usage_date);

-- RPC to atomically try to consume a quota slot (one slot = one AI turn)
-- Returns JSON: { allowed: boolean, used: int, limit: int, remaining: int }
CREATE OR REPLACE FUNCTION public.teach_phil_try_consume(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit constant int := 60;
  v_today date := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date;
  v_current int;
  v_allowed boolean;
BEGIN
  INSERT INTO teach_phil_daily_usage (user_id, usage_date, request_count)
  VALUES (p_user_id, v_today, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET request_count = teach_phil_daily_usage.request_count + 1
  WHERE teach_phil_daily_usage.request_count < v_limit
  RETURNING request_count INTO v_current;

  IF v_current IS NULL THEN
    SELECT request_count INTO v_current
    FROM teach_phil_daily_usage
    WHERE user_id = p_user_id AND usage_date = v_today;
    v_allowed := false;
  ELSE
    v_allowed := true;
  END IF;

  RETURN jsonb_build_object(
    'allowed', v_allowed,
    'used', COALESCE(v_current, 0),
    'limit', v_limit,
    'remaining', GREATEST(v_limit - COALESCE(v_current, 0), 0)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.teach_phil_try_consume(uuid) TO service_role;
