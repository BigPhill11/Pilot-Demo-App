-- Grant Phil admin access when the account already exists.
-- The app also keeps a client-side email fallback so the Admin tab is visible immediately.
DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL
     AND to_regtype('public.app_role') IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'::public.app_role
    FROM auth.users
    WHERE lower(email) = 'phillipghead@gmail.com'
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;
