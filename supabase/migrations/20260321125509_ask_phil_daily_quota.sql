-- Ask Phil daily usage quota table and RPC
-- Enforces a limit of 5 LLM requests per user per UTC day

CREATE TABLE IF NOT EXISTS public.ask_phil_daily_usage (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date date NOT NULL DEFAULT (CURRENT_DATE AT TIME ZONE 'UTC'),
  request_count int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_date)
);

ALTER TABLE public.ask_phil_daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage"
  ON public.ask_phil_daily_usage
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ask_phil_daily_usage_date
  ON public.ask_phil_daily_usage (usage_date);

-- RPC to atomically try to consume a quota slot
-- Returns JSON: { allowed: boolean, used: int, limit: int, remaining: int }
-- Called from Edge Function with service role and explicit p_user_id
CREATE OR REPLACE FUNCTION public.ask_phil_try_consume(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit constant int := 5;
  v_today date := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date;
  v_current int;
  v_allowed boolean;
BEGIN
  -- Upsert row for today, incrementing only if under limit
  INSERT INTO ask_phil_daily_usage (user_id, usage_date, request_count)
  VALUES (p_user_id, v_today, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET request_count = ask_phil_daily_usage.request_count + 1
  WHERE ask_phil_daily_usage.request_count < v_limit
  RETURNING request_count INTO v_current;

  IF v_current IS NULL THEN
    -- Conflict update did not happen because limit was reached
    SELECT request_count INTO v_current
    FROM ask_phil_daily_usage
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

-- Grant execute to service_role (Edge Functions use this)
GRANT EXECUTE ON FUNCTION public.ask_phil_try_consume(uuid) TO service_role;

-- Optional: function to get current usage without consuming
CREATE OR REPLACE FUNCTION public.ask_phil_get_usage(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit constant int := 5;
  v_today date := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date;
  v_current int;
BEGIN
  SELECT request_count INTO v_current
  FROM ask_phil_daily_usage
  WHERE user_id = p_user_id AND usage_date = v_today;

  v_current := COALESCE(v_current, 0);

  RETURN jsonb_build_object(
    'used', v_current,
    'limit', v_limit,
    'remaining', GREATEST(v_limit - v_current, 0)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.ask_phil_get_usage(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.ask_phil_get_usage(uuid) TO authenticated;
