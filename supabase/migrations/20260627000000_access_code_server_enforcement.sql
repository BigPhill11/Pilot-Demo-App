-- Server-side hardening:
--  1) Read-only access-code pre-check for the signup form (no redemption/side effects).
--  2) Enforce a valid access code at account-creation time in the handle_new_user
--     trigger, so a code is required even if someone calls the API directly
--     (bypassing the client). The trigger also redeems the code (redeemed_count++)
--     and records it on the profile.
--  3) Lock down the over-permissive INSERT policy on public.companies.

-- ── 1) Read-only pre-check (used by src/lib/accessCode.ts) ───────────────────
CREATE OR REPLACE FUNCTION public.check_access_code(p_code TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.access_codes
    WHERE code = upper(btrim(p_code))
      AND is_active = TRUE
  );
$$;

GRANT EXECUTE ON FUNCTION public.check_access_code(TEXT) TO anon, authenticated;

-- ── 2) Enforce the access code when a new auth user is created ────────────────
-- Replaces the existing handle_new_user() with one that requires a valid code
-- in the signup metadata. Existing accounts are unaffected (trigger only fires
-- on new auth.users inserts).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_code text := upper(btrim(COALESCE(NEW.raw_user_meta_data ->> 'access_code', '')));
  v_id uuid;
BEGIN
  -- Require a valid, active access code. Raises (and rolls back the signup)
  -- if missing or invalid — this is the server-side backstop for the gate.
  SELECT id INTO v_id
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

  RETURN NEW;
END;
$$;

-- ── 3) Tighten companies INSERT (was WITH CHECK (true) for any authed user) ───
DROP POLICY IF EXISTS "Authenticated users can create companies" ON public.companies;

CREATE POLICY "Admins or owners can create companies"
ON public.companies
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  OR auth.uid() = created_by
);
