-- TEACHER SETUP — CHUNK 10 OF 19
-- Run chunk 9 first. New tab for each. Safe to re-run.

-- ============================================================
-- handle_new_user — the real gate. Now rejects expired and
-- exhausted codes, with distinguishable messages so a student
-- who mistyped is told something different from a student whose
-- teacher's code ran out.
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_code text := upper(btrim(COALESCE(NEW.raw_user_meta_data ->> 'access_code', '')));
  v_id uuid;
  v_role public.app_role;
  v_expires_at timestamptz;
  v_redeemed uuid;
BEGIN
  SELECT id, grants_role, expires_at
    INTO v_id, v_role, v_expires_at
  FROM public.access_codes
  WHERE code = v_code
    AND is_active = TRUE
  LIMIT 1;

  IF v_id IS NULL THEN
    RAISE EXCEPTION 'A valid access code is required to create an account.'
      USING ERRCODE = 'check_violation';
  END IF;

  IF v_expires_at IS NOT NULL AND v_expires_at <= now() THEN
    RAISE EXCEPTION 'That access code has expired. Ask your teacher for a current one.'
      USING ERRCODE = 'check_violation';
  END IF;

  -- Redeem and enforce the cap in one statement so two simultaneous sign-ups
  -- on the last remaining slot cannot both succeed.
  UPDATE public.access_codes
  SET redeemed_count = redeemed_count + 1
  WHERE id = v_id
    AND (max_redemptions IS NULL OR redeemed_count < max_redemptions)
  RETURNING id INTO v_redeemed;

  IF v_redeemed IS NULL THEN
    RAISE EXCEPTION 'That access code has already been used the maximum number of times.'
      USING ERRCODE = 'check_violation';
  END IF;

  INSERT INTO public.profiles (id, email, username, signup_access_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)),
    v_code
  );

  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);

  IF v_role IS NOT NULL AND v_role <> 'user' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, v_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;
