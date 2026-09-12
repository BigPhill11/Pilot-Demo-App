-- Teacher self-signup + one-time onboarding fix.
--
-- 1) The onboarding survey/tour columns the client writes were never added in
--    production, so every save silently failed (42703) and the survey replayed
--    on each login. Add them.
-- 2) Backfill every EXISTING account as fully onboarded, so nobody who already
--    has an account ever sees the survey/tour again — only brand-new signups do.
-- 3) Teachers sign up self-serve with NO access code: the client sends
--    signup_role = 'teacher' in the auth metadata and this trigger grants the
--    teacher role. Students still must redeem a valid code (the class codes
--    teachers mint are mirrored into access_codes). This supersedes the
--    admin-code-only teacher provisioning from 20260801000400_teacher_signup.

-- ── 1) Missing onboarding columns ────────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS age_confirmed      BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS placement_track    TEXT DEFAULT 'personal-finance',
  ADD COLUMN IF NOT EXISTS placement_score    INTEGER,
  ADD COLUMN IF NOT EXISTS survey_completed   BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS app_tour_completed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS interests          TEXT[],
  ADD COLUMN IF NOT EXISTS finance_goals      TEXT[],
  ADD COLUMN IF NOT EXISTS time_commitment    TEXT;

-- ── 2) Existing accounts never replay onboarding ─────────────────────────────
-- Every row present when this migration runs belongs to an existing account.
UPDATE public.profiles
SET survey_completed        = TRUE,
    app_tour_completed      = TRUE,
    onboarding_completed    = TRUE,
    teacher_setup_completed = TRUE;

-- ── 3) Teacher self-signup, student code enforcement ─────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_code text := upper(btrim(COALESCE(NEW.raw_user_meta_data ->> 'access_code', '')));
  v_signup_role text := lower(btrim(COALESCE(NEW.raw_user_meta_data ->> 'signup_role', '')));
  v_id uuid;
  v_role public.app_role;
BEGIN
  -- Teachers create accounts directly: no access code. They only ever see the
  -- teacher dashboard, and they mint the class codes students redeem.
  IF v_signup_role = 'teacher' THEN
    INSERT INTO public.profiles (id, email, username)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1))
    );

    INSERT INTO public.user_progress (user_id)
    VALUES (NEW.id);

    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'teacher')
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
  END IF;

  -- Everyone else must present a valid, active access code. Raises (and rolls
  -- back the signup) if missing or invalid — the server-side backstop for the
  -- client gate.
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
