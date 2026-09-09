-- Keep the teacher dashboard walkthrough completion state per account so it
-- follows a teacher across devices. Replay does not clear this flag; it simply
-- opens the walkthrough on demand.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS teacher_dashboard_tour_completed BOOLEAN NOT NULL DEFAULT FALSE;
