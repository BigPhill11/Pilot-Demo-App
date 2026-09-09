-- TEACHER SETUP — CHUNK 11 OF 19
-- Run chunk 10 first. New tab for each. Safe to re-run.

-- Ways to become a teacher other than "sign up with a teacher code".
--
-- Until now the teacher role could only ever be granted by handle_new_user at
-- the moment of account creation. That left two dead ends with no fix short of
-- editing the database by hand:
--
--   * A teacher who already has a student account (or who signed up with the
--     wrong code) can never be upgraded.
--   * The owner's own account, which predates the role system entirely, is a
--     teacher only by virtue of the hardcoded admin email.
--
-- This adds a self-serve redemption for logged-in users and an admin grant by
-- email address.

-- ============================================================
-- redeem_access_code_for_role — an existing signed-in user
-- redeems a privileged code to gain its role.
--
-- Deliberately refuses plain student codes: those exist to put someone in a
-- classroom at sign-up, and re-running that after the fact would not enroll
-- them anyway (membership keys off profiles.signup_access_code, which is set
-- once). Returning a clear error beats silently doing nothing.
-- ============================================================
CREATE OR REPLACE FUNCTION public.redeem_access_code_for_role(p_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_code text := upper(btrim(COALESCE(p_code, '')));
  v_id uuid;
  v_role public.app_role;
  v_expires_at timestamptz;
  v_redeemed uuid;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'You must be signed in to redeem a code.'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  SELECT id, grants_role, expires_at
    INTO v_id, v_role, v_expires_at
  FROM public.access_codes
  WHERE code = v_code
    AND is_active = TRUE
  LIMIT 1;

  IF v_id IS NULL THEN
    RAISE EXCEPTION 'That code is not valid.'
      USING ERRCODE = 'check_violation';
  END IF;

  IF v_expires_at IS NOT NULL AND v_expires_at <= now() THEN
    RAISE EXCEPTION 'That code has expired.'
      USING ERRCODE = 'check_violation';
  END IF;

  IF v_role IS NULL OR v_role = 'user' THEN
    RAISE EXCEPTION 'That is a student code, not a teacher code.'
      USING ERRCODE = 'check_violation';
  END IF;

  -- Already holds it: succeed quietly without burning a redemption.
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_uid AND role = v_role) THEN
    RETURN jsonb_build_object('granted', false, 'role', v_role, 'already_held', true);
  END IF;

  UPDATE public.access_codes
  SET redeemed_count = redeemed_count + 1
  WHERE id = v_id
    AND (max_redemptions IS NULL OR redeemed_count < max_redemptions)
  RETURNING id INTO v_redeemed;

  IF v_redeemed IS NULL THEN
    RAISE EXCEPTION 'That code has already been used the maximum number of times.'
      USING ERRCODE = 'check_violation';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_uid, v_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN jsonb_build_object('granted', true, 'role', v_role, 'already_held', false);
END;
$$;
GRANT EXECUTE ON FUNCTION public.redeem_access_code_for_role(TEXT) TO authenticated;
-- ============================================================
-- admin_set_teacher_role — grant or revoke by email, for the
-- case where someone already has an account.
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_set_teacher_role(p_email TEXT, p_grant BOOLEAN DEFAULT TRUE)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_target uuid;
  v_email text := lower(btrim(COALESCE(p_email, '')));
BEGIN
  IF NOT public.is_phil_admin() THEN
    RAISE EXCEPTION 'Admin access required'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  SELECT id INTO v_target
  FROM auth.users
  WHERE lower(email) = v_email
  LIMIT 1;

  IF v_target IS NULL THEN
    RAISE EXCEPTION 'No account found for %', v_email
      USING ERRCODE = 'no_data_found';
  END IF;

  IF p_grant THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_target, 'teacher')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    DELETE FROM public.user_roles
    WHERE user_id = v_target AND role = 'teacher';
  END IF;

  RETURN jsonb_build_object('user_id', v_target, 'email', v_email, 'is_teacher', p_grant);
END;
$$;
GRANT EXECUTE ON FUNCTION public.admin_set_teacher_role(TEXT, BOOLEAN) TO authenticated;
