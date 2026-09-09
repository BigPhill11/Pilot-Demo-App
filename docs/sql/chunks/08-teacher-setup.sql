-- TEACHER SETUP — CHUNK 8 OF 17
-- Run chunk 7 first. New tab for each. Safe to re-run.

-- ── Consistency fix ──────────────────────────────────────────────────────────
-- 20260629010000 rewrote admin_list_code_users to accept the owner email via
-- is_phil_admin(), but 20260630000000 ran afterwards and reverted it to a plain
-- has_role() check — so the owner-email path fails on this one RPC while it
-- works everywhere else. Restore the intended check.
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
-- Write-through sync for the curriculum areas that only ever persisted to
-- localStorage (Market Intelligence village lessons, the MI catalog, the
-- economics units, and career readiness). Without this a teacher dashboard can
-- only see Personal Finance, because nothing else reaches the database.
--
-- Why an RPC instead of a client-side upsert:
--
--   1. module_progress is UNIQUE (user_id, module_id, module_type, course_id)
--      and course_id is NULL for all of these. NULLs are distinct in a unique
--      index, so ON CONFLICT would never match and every save would insert a
--      duplicate row.
--
--   2. Progress must only ever move forward. A student signing in on a fresh
--      device starts with empty localStorage; a naive write-through would push
--      0% and wipe out real progress. The monotonic guard below makes that
--      impossible.

CREATE OR REPLACE FUNCTION public.sync_module_progress(p_entries JSONB)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_entry JSONB;
  v_module_id TEXT;
  v_module_type TEXT;
  v_percent INTEGER;
  v_detail JSONB;
  v_existing INTEGER;
  v_written INTEGER := 0;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_entries IS NULL OR jsonb_typeof(p_entries) <> 'array' THEN
    RETURN 0;
  END IF;

  FOR v_entry IN SELECT * FROM jsonb_array_elements(p_entries)
  LOOP
    v_module_id   := NULLIF(btrim(COALESCE(v_entry ->> 'module_id', '')), '');
    v_module_type := NULLIF(btrim(COALESCE(v_entry ->> 'module_type', '')), '');
    v_percent     := LEAST(GREATEST(COALESCE((v_entry ->> 'progress_percentage')::int, 0), 0), 100);
    v_detail      := COALESCE(v_entry -> 'detailed_progress', '{}'::jsonb);

    CONTINUE WHEN v_module_id IS NULL OR v_module_type IS NULL;

    SELECT mp.progress_percentage INTO v_existing
    FROM public.module_progress mp
    WHERE mp.user_id = v_uid
      AND mp.module_id = v_module_id
      AND mp.module_type = v_module_type
      AND mp.course_id IS NULL;

    IF FOUND THEN
      -- Only move forward, and skip no-op writes entirely.
      CONTINUE WHEN v_percent <= COALESCE(v_existing, 0);

      UPDATE public.module_progress mp
      SET progress_percentage = v_percent,
          detailed_progress = v_detail,
          completed_at = CASE WHEN v_percent >= 100 THEN COALESCE(mp.completed_at, now()) ELSE mp.completed_at END,
          last_accessed = now(),
          updated_at = now()
      WHERE mp.user_id = v_uid
        AND mp.module_id = v_module_id
        AND mp.module_type = v_module_type
        AND mp.course_id IS NULL;
    ELSE
      -- Nothing to record for an untouched module.
      CONTINUE WHEN v_percent <= 0;

      INSERT INTO public.module_progress (
        user_id, module_id, module_type, progress_percentage,
        detailed_progress, completed_at, last_accessed
      )
      VALUES (
        v_uid, v_module_id, v_module_type, v_percent,
        v_detail,
        CASE WHEN v_percent >= 100 THEN now() ELSE NULL END,
        now()
      );
    END IF;

    v_written := v_written + 1;
  END LOOP;

  RETURN v_written;
END;
$$;
GRANT EXECUTE ON FUNCTION public.sync_module_progress(JSONB) TO authenticated;
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
