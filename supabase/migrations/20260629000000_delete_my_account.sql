-- Full self-serve account deletion (required by Apple App Store review).
--
-- delete_my_account() removes the CALLING user's account end-to-end:
--   * For every foreign key that points at auth.users, it clears that user's
--     rows (SET NULL columns are nulled; everything else is deleted).
--   * Then it deletes the auth.users row itself, so the person can no longer
--     sign in and CASCADE foreign keys drop the rest of their data.
--
-- It uses auth.uid() (never a parameter), so a user can only ever delete
-- their own account. SECURITY DEFINER lets it bypass RLS and remove the
-- auth.users row.

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
    SELECT tc.table_schema,
           tc.table_name,
           kcu.column_name,
           rc.delete_rule
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
     AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name
     AND tc.table_schema = ccu.table_schema
    JOIN information_schema.referential_constraints rc
      ON rc.constraint_name = tc.constraint_name
     AND rc.constraint_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_schema = 'auth'
      AND ccu.table_name = 'users'
  LOOP
    IF r.delete_rule = 'SET NULL' THEN
      EXECUTE format('UPDATE %I.%I SET %I = NULL WHERE %I = $1',
                     r.table_schema, r.table_name, r.column_name, r.column_name)
        USING v_uid;
    ELSIF r.delete_rule = 'CASCADE' THEN
      -- Removed automatically when the auth.users row is deleted below.
      NULL;
    ELSE
      EXECUTE format('DELETE FROM %I.%I WHERE %I = $1',
                     r.table_schema, r.table_name, r.column_name)
        USING v_uid;
    END IF;
  END LOOP;

  DELETE FROM auth.users WHERE id = v_uid;
END;
$$;

GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;
