-- Admin-only lookup: who signed up with a given access code.
-- The profiles table's RLS only lets a user see their OWN row, so the admin
-- screen can't read other users' profiles directly. This SECURITY DEFINER
-- function returns the signups for a code, but only for callers with the
-- 'admin' role.

CREATE OR REPLACE FUNCTION public.admin_list_code_users(p_code TEXT)
RETURNS TABLE (username TEXT, email TEXT, created_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
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
