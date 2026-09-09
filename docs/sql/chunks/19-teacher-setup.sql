-- TEACHER SETUP — CHUNK 19 OF 19
-- Run chunk 18 first. New tab for each. Safe to re-run.

REVOKE ALL ON FUNCTION public.teacher_get_learning_momentum(UUID, INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.teacher_get_learning_momentum(UUID, INTEGER) FROM anon;
GRANT EXECUTE ON FUNCTION public.teacher_get_learning_momentum(UUID, INTEGER) TO authenticated;
-- Keep the teacher dashboard walkthrough completion state per account so it
-- follows a teacher across devices. Replay does not clear this flag; it simply
-- opens the walkthrough on demand.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS teacher_dashboard_tour_completed BOOLEAN NOT NULL DEFAULT FALSE;
