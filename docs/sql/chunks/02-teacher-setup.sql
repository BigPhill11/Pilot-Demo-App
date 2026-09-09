-- TEACHER SETUP — CHUNK 2 OF 17
-- Run chunk 1 first. New tab for each. Safe to re-run.

-- Classrooms: the teacher-facing grouping built on top of the existing
-- access-code system.
--
-- An access code already links every student to a cohort via
-- profiles.signup_access_code. This migration promotes that implicit grouping
-- into a real entity a teacher can own, name, and manage a roster for, while
-- keeping the student sign-up flow completely unchanged: classrooms.join_code
-- mirrors access_codes.code, so the code a student already types at sign-up is
-- the code that puts them in a classroom.

-- ── 1) classrooms ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.classrooms (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Nullable: classrooms backfilled from pre-existing access codes have no
  -- owner until an admin assigns one.
  teacher_id   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  join_code    TEXT NOT NULL UNIQUE,
  school_name  TEXT,
  term         TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  archived_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS classrooms_teacher_id_idx ON public.classrooms (teacher_id);
CREATE INDEX IF NOT EXISTS classrooms_join_code_idx  ON public.classrooms (join_code);
DROP TRIGGER IF EXISTS classrooms_set_updated_at ON public.classrooms;
CREATE TRIGGER classrooms_set_updated_at
  BEFORE UPDATE ON public.classrooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
-- ── 2) classroom_members ─────────────────────────────────────────────────────
-- An explicit roster, rather than deriving membership from
-- profiles.signup_access_code on every read. This lets a teacher remove a
-- student who joined with the wrong code without touching the code itself.
CREATE TABLE IF NOT EXISTS public.classroom_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'removed')),
  joined_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (classroom_id, student_id)
);
CREATE INDEX IF NOT EXISTS classroom_members_classroom_idx ON public.classroom_members (classroom_id);
CREATE INDEX IF NOT EXISTS classroom_members_student_idx   ON public.classroom_members (student_id);
-- ── 3) access_codes gains a classroom link and a role grant ──────────────────
-- grants_role lets one table serve both audiences: student codes grant 'user',
-- admin-issued teacher codes grant 'teacher'.
ALTER TABLE public.access_codes
  ADD COLUMN IF NOT EXISTS classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL;
ALTER TABLE public.access_codes
  ADD COLUMN IF NOT EXISTS grants_role public.app_role NOT NULL DEFAULT 'user';
-- ── 4) Ownership guard ───────────────────────────────────────────────────────
-- The single authorization check shared by classroom RLS and every teacher_*
-- RPC. SECURITY DEFINER so it can read classrooms without tripping that
-- table's own RLS (the same pattern as public.has_role).
CREATE OR REPLACE FUNCTION public.teacher_owns_classroom(p_classroom_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.classrooms c
    WHERE c.id = p_classroom_id
      AND c.teacher_id = auth.uid()
  ) OR public.is_phil_admin();
$$;
GRANT EXECUTE ON FUNCTION public.teacher_owns_classroom(UUID) TO authenticated;
-- ── 5) RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE public.classrooms        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_members ENABLE ROW LEVEL SECURITY;
-- Teachers manage their own classrooms. Direct teacher_id comparison rather
-- than the helper, so the policy can never recurse into itself.
DROP POLICY IF EXISTS "Teachers manage their own classrooms" ON public.classrooms;
CREATE POLICY "Teachers manage their own classrooms"
ON public.classrooms
FOR ALL
TO authenticated
USING (teacher_id = auth.uid() OR public.is_phil_admin())
WITH CHECK (teacher_id = auth.uid() OR public.is_phil_admin());
-- Students may read the classroom they belong to (for a "your class" label).
DROP POLICY IF EXISTS "Students can view their own classroom" ON public.classrooms;
CREATE POLICY "Students can view their own classroom"
ON public.classrooms
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.classroom_members m
    WHERE m.classroom_id = classrooms.id
      AND m.student_id = auth.uid()
      AND m.status = 'active'
  )
);
DROP POLICY IF EXISTS "Teachers manage their classroom roster" ON public.classroom_members;
CREATE POLICY "Teachers manage their classroom roster"
ON public.classroom_members
FOR ALL
TO authenticated
USING (public.teacher_owns_classroom(classroom_id))
WITH CHECK (public.teacher_owns_classroom(classroom_id));
DROP POLICY IF EXISTS "Students can view their own membership" ON public.classroom_members;
CREATE POLICY "Students can view their own membership"
ON public.classroom_members
FOR SELECT
TO authenticated
USING (student_id = auth.uid());
-- ── 6) Backfill from existing access codes ───────────────────────────────────
-- Every code that already exists becomes a classroom, so existing cohorts show
-- up on day one with no student action required.
INSERT INTO public.classrooms (name, join_code, created_at)
SELECT COALESCE(NULLIF(btrim(ac.label), ''), ac.code), ac.code, COALESCE(ac.created_at, now())
FROM public.access_codes ac
WHERE ac.grants_role = 'user'
ON CONFLICT (join_code) DO NOTHING;
UPDATE public.access_codes ac
SET classroom_id = c.id
FROM public.classrooms c
WHERE c.join_code = ac.code
  AND ac.classroom_id IS NULL;
-- Enroll everyone who signed up with each code.
INSERT INTO public.classroom_members (classroom_id, student_id, joined_at)
SELECT c.id, p.id, COALESCE(p.created_at, now())
FROM public.profiles p
JOIN public.classrooms c ON c.join_code = upper(btrim(p.signup_access_code))
WHERE p.signup_access_code IS NOT NULL
ON CONFLICT (classroom_id, student_id) DO NOTHING;
