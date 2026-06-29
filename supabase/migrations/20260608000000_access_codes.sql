-- Access codes: a small set of reusable shared codes required at sign-up.
-- Managed by admins from the in-app admin screen; validated by a SECURITY DEFINER
-- RPC so the codes table is never readable by anonymous clients.

CREATE TABLE IF NOT EXISTS public.access_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    label TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    redeemed_count INTEGER NOT NULL DEFAULT 0,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Only admins may read/create/update/delete codes (used by the admin screen).
CREATE POLICY "Admins can manage access codes"
ON public.access_codes
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Validate + count a redemption without exposing the table to anon clients.
-- Returns TRUE for an active, matching code (and bumps redeemed_count); else FALSE.
CREATE OR REPLACE FUNCTION public.redeem_access_code(p_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  IF p_code IS NULL OR length(btrim(p_code)) = 0 THEN
    RETURN FALSE;
  END IF;

  SELECT id INTO v_id
  FROM public.access_codes
  WHERE code = upper(btrim(p_code))
    AND is_active = TRUE
  LIMIT 1;

  IF v_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE public.access_codes
  SET redeemed_count = redeemed_count + 1
  WHERE id = v_id;

  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.redeem_access_code(TEXT) TO anon, authenticated;

-- Record which code each new account used (set during the profile upsert at sign-up).
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS signup_access_code TEXT;
