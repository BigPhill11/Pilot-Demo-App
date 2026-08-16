-- Teacher provisioning at sign-up.
--
-- Teacher access is an admin step, not self-serve: Phil issues a code with
-- grants_role = 'teacher' from the admin screen, and whoever redeems it gets
-- the teacher role assigned by this trigger. There is no client-side path to
-- becoming a teacher.

-- Tracks completion of the teacher-specific onboarding branch (name the school,
-- create the first classroom), the way survey_completed / app_tour_completed do
-- for students.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS teacher_setup_completed BOOLEAN NOT NULL DEFAULT FALSE;

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
