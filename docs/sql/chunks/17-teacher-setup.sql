-- TEACHER SETUP — CHUNK 17 OF 19
-- Run chunk 16 first. New tab for each. Safe to re-run.

GRANT EXECUTE ON FUNCTION public.teacher_get_teachback_overview(UUID) TO authenticated;
-- Add the pre/post test columns to module_progress on projects that never got
-- them.
--
-- public.module_progress was created twice in this repo's history. The July
-- 2025 migration created it without test-score columns; the November 2025 one
-- lists them, but guards with CREATE TABLE IF NOT EXISTS, so on any project
-- where July ran first it is a no-op and the columns never appear. The
-- accompanying November migration patched last_accessed and completed_at the
-- same way but omitted these two, so the drift went unnoticed until
-- teacher_get_student_detail read them and failed with
-- "column mp.pre_test_score does not exist".
--
-- Adding them here rather than removing the references from the dashboard
-- keeps one schema across projects: the generated Supabase types and the
-- November definition both say these columns exist, and they are where a
-- pre/post test flow is expected to write its scores. Until such a flow exists
-- they stay NULL, which the dashboard already renders as "no score yet".

ALTER TABLE public.module_progress
  ADD COLUMN IF NOT EXISTS pre_test_score INTEGER,
  ADD COLUMN IF NOT EXISTS post_test_score INTEGER,
  ADD COLUMN IF NOT EXISTS improvement_percentage INTEGER;
