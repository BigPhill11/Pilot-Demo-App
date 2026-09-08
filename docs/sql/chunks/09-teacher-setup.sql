-- TEACHER SETUP — CHUNK 9 OF 17
-- Run chunk 8 first. New tab for each. Safe to re-run.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_code text := upper(btrim(COALESCE(NEW.raw_user_meta_data ->> 'access_code', '')));
  v_id uuid;
  v_role public.app_role;
BEGIN
  -- Require a valid, active access code. Raises (and rolls back the signup)
  -- if missing or invalid — this is the server-side backstop for the gate.
  SELECT id, grants_role INTO v_id, v_role
  FROM public.access_codes
  WHERE code = v_code
    AND is_active = TRUE
  LIMIT 1;

  IF v_id IS NULL THEN
    RAISE EXCEPTION 'A valid access code is required to create an account.'
      USING ERRCODE = 'check_violation';
  END IF;

  -- Redeem (count the signup).
  UPDATE public.access_codes
  SET redeemed_count = redeemed_count + 1
  WHERE id = v_id;

  INSERT INTO public.profiles (id, email, username, signup_access_code)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)),
    v_code
  );

  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);

  -- Codes that grant a privileged role do so here, server-side. 'user' is the
  -- implicit default and needs no row.
  IF v_role IS NOT NULL AND v_role <> 'user' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, v_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;
-- Access code lifecycle: expiry dates and redemption caps.
--
-- Until now a code was a permanent, unlimited-use credential: once issued it
-- worked forever for anyone who had the string. That is tolerable for a student
-- code handed to one class, and not tolerable for a teacher code, which grants
-- the ability to see student data. A leaked TEACH- code could mint teacher
-- accounts indefinitely.
--
-- Adds two optional limits (NULL on either means "no limit", preserving the
-- behaviour of every code issued so far) and enforces both in the two places
-- codes are checked: the pre-flight validation the sign-up form calls, and the
-- handle_new_user trigger that is the actual gate.

ALTER TABLE public.access_codes
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS max_redemptions INTEGER;
ALTER TABLE public.access_codes
  DROP CONSTRAINT IF EXISTS access_codes_max_redemptions_positive;
ALTER TABLE public.access_codes
  ADD CONSTRAINT access_codes_max_redemptions_positive
  CHECK (max_redemptions IS NULL OR max_redemptions > 0);
COMMENT ON COLUMN public.access_codes.expires_at IS
  'After this moment the code stops working for new sign-ups. NULL = never expires.';
COMMENT ON COLUMN public.access_codes.max_redemptions IS
  'Cap on total sign-ups. NULL = unlimited. Teacher codes should normally be 1.';
-- ============================================================
-- Shared redeemability test, so the form check and the trigger
-- can never drift apart on what "usable" means.
-- ============================================================
CREATE OR REPLACE FUNCTION public.access_code_is_redeemable(p_code TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.access_codes
    WHERE code = upper(btrim(p_code))
      AND is_active = TRUE
      AND (expires_at IS NULL OR expires_at > now())
      AND (max_redemptions IS NULL OR redeemed_count < max_redemptions)
  );
$$;
GRANT EXECUTE ON FUNCTION public.access_code_is_redeemable(TEXT) TO anon, authenticated;
-- check_access_code is what the sign-up form calls before attempting signUp.
-- Same answer, kept under the old name so no client change is required.
CREATE OR REPLACE FUNCTION public.check_access_code(p_code TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.access_code_is_redeemable(p_code);
$$;
GRANT EXECUTE ON FUNCTION public.check_access_code(TEXT) TO anon, authenticated;
