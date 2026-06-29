-- Raise the Ask Phil daily question limit from 5 to 10 per user (UTC day).
-- CREATE OR REPLACE updates the live functions in place.

CREATE OR REPLACE FUNCTION public.ask_phil_try_consume(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit constant int := 10;
  v_today date := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date;
  v_current int;
  v_allowed boolean;
BEGIN
  INSERT INTO ask_phil_daily_usage (user_id, usage_date, request_count)
  VALUES (p_user_id, v_today, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET request_count = ask_phil_daily_usage.request_count + 1
  WHERE ask_phil_daily_usage.request_count < v_limit
  RETURNING request_count INTO v_current;

  IF v_current IS NULL THEN
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

CREATE OR REPLACE FUNCTION public.ask_phil_get_usage(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limit constant int := 10;
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
