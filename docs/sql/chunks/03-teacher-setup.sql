-- TEACHER SETUP — CHUNK 3 OF 17
-- Run chunk 2 first. New tab for each. Safe to re-run.

-- ── 7) Keep the roster in sync as new students sign up ───────────────────────
-- handle_new_user() writes profiles.signup_access_code; this trigger turns that
-- into a roster row so enrollment never depends on client code running.
CREATE OR REPLACE FUNCTION public.sync_classroom_membership()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_classroom_id UUID;
BEGIN
  IF NEW.signup_access_code IS NULL OR btrim(NEW.signup_access_code) = '' THEN
    RETURN NEW;
  END IF;

  SELECT id INTO v_classroom_id
  FROM public.classrooms
  WHERE join_code = upper(btrim(NEW.signup_access_code))
  LIMIT 1;

  IF v_classroom_id IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.classroom_members (classroom_id, student_id)
  VALUES (v_classroom_id, NEW.id)
  ON CONFLICT (classroom_id, student_id) DO NOTHING;

  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS profiles_sync_classroom_membership ON public.profiles;
CREATE TRIGGER profiles_sync_classroom_membership
  AFTER INSERT OR UPDATE OF signup_access_code ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.sync_classroom_membership();
-- Teacher dashboard read APIs.
--
-- Every progress table in this schema is RLS-restricted to
-- `auth.uid() = user_id`, so a teacher cannot read their students' rows
-- directly. These SECURITY DEFINER functions follow the pattern already
-- established by admin_list_code_users: check authorization first, then return
-- only rows belonging to students on the caller's own roster.
--
-- Student email is deliberately absent from the roster listing. It appears only
-- in teacher_get_student_detail, where a teacher has explicitly drilled into one
-- student.

-- ── Role helper ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'teacher') OR public.is_phil_admin();
$$;
GRANT EXECUTE ON FUNCTION public.is_teacher() TO authenticated;
-- ── Classrooms the caller teaches ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_list_classrooms()
RETURNS TABLE (
  id            UUID,
  name          TEXT,
  join_code     TEXT,
  school_name   TEXT,
  term          TEXT,
  is_active     BOOLEAN,
  created_at    TIMESTAMPTZ,
  student_count BIGINT,
  active_last_7 BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_teacher() THEN
    RAISE EXCEPTION 'Teacher access required';
  END IF;

  RETURN QUERY
    SELECT
      c.id,
      c.name,
      c.join_code,
      c.school_name,
      c.term,
      c.is_active,
      c.created_at,
      COALESCE(counts.student_count, 0),
      COALESCE(counts.active_last_7, 0)
    FROM public.classrooms c
    LEFT JOIN LATERAL (
      SELECT
        COUNT(*) AS student_count,
        COUNT(*) FILTER (
          WHERE EXISTS (
            SELECT 1 FROM public.daily_logins d
            WHERE d.user_id = m.student_id
              AND d.login_date >= CURRENT_DATE - 6
          )
        ) AS active_last_7
      FROM public.classroom_members m
      WHERE m.classroom_id = c.id
        AND m.status = 'active'
    ) counts ON TRUE
    WHERE c.teacher_id = auth.uid()
    ORDER BY c.is_active DESC, c.created_at DESC;
END;
$$;
GRANT EXECUTE ON FUNCTION public.teacher_list_classrooms() TO authenticated;
