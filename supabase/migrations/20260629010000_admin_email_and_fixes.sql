-- ============================================================================
-- DEFINITIVE FIX: make phillipghead@gmail.com a guaranteed admin, and ensure
-- every function the app needs exists. Removes the fragile dependency on a
-- separately-granted "admin role" by also accepting the admin EMAIL from the
-- caller's JWT. Idempotent — safe to run repeatedly.
-- ============================================================================

-- 0) access_codes table (in case it was never created)
CREATE TABLE IF NOT EXISTS public.access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  label text,
  is_active boolean NOT NULL DEFAULT true,
  redeemed_count integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS signup_access_code TEXT;

-- 1) Single source of truth for "is this caller an admin?"
--    True if they hold the admin role OR their JWT email is the owner email.
CREATE OR REPLACE FUNCTION public.is_phil_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COALESCE(public.has_role(auth.uid(), 'admin'), false)
    OR lower(COALESCE(auth.jwt() ->> 'email', '')) = 'phillipghead@gmail.com';
$$;
GRANT EXECUTE ON FUNCTION public.is_phil_admin() TO authenticated;

-- 2) access_codes: admins (by role OR email) can do everything
DROP POLICY IF EXISTS "Admins can manage access codes" ON public.access_codes;
DROP POLICY IF EXISTS "Phil admin can manage access codes" ON public.access_codes;
CREATE POLICY "Phil admin can manage access codes"
ON public.access_codes
FOR ALL
TO authenticated
USING (public.is_phil_admin())
WITH CHECK (public.is_phil_admin());

-- 3) Read-only code pre-check used by the signup form
CREATE OR REPLACE FUNCTION public.check_access_code(p_code TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.access_codes
    WHERE code = upper(btrim(p_code)) AND is_active = TRUE
  );
$$;
GRANT EXECUTE ON FUNCTION public.check_access_code(TEXT) TO anon, authenticated;

-- 4) Who signed up with a code (admin-only, by role OR email)
CREATE OR REPLACE FUNCTION public.admin_list_code_users(p_code TEXT)
RETURNS TABLE (username TEXT, email TEXT, created_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_phil_admin() THEN
    RAISE EXCEPTION 'Admin access required';
  END IF;
  RETURN QUERY
    SELECT p.username, p.email, p.created_at
    FROM public.profiles p
    WHERE p.signup_access_code = upper(btrim(p_code))
    ORDER BY p.created_at DESC;
END;
$$;
GRANT EXECUTE ON FUNCTION public.admin_list_code_users(TEXT) TO authenticated;

-- 5) Full self-serve account deletion (Apple requirement)
CREATE OR REPLACE FUNCTION public.delete_my_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  r record;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  FOR r IN
    SELECT tc.table_schema, tc.table_name, kcu.column_name, rc.delete_rule
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name AND tc.table_schema = ccu.table_schema
    JOIN information_schema.referential_constraints rc
      ON rc.constraint_name = tc.constraint_name AND rc.constraint_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_schema = 'auth' AND ccu.table_name = 'users'
  LOOP
    IF r.delete_rule = 'SET NULL' THEN
      EXECUTE format('UPDATE %I.%I SET %I = NULL WHERE %I = $1',
                     r.table_schema, r.table_name, r.column_name, r.column_name) USING v_uid;
    ELSIF r.delete_rule = 'CASCADE' THEN
      NULL;
    ELSE
      EXECUTE format('DELETE FROM %I.%I WHERE %I = $1',
                     r.table_schema, r.table_name, r.column_name) USING v_uid;
    END IF;
  END LOOP;
  DELETE FROM auth.users WHERE id = v_uid;
END;
$$;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;

-- 6) Belt-and-suspenders: also grant the real admin role if the account exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = 'phillipghead@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
