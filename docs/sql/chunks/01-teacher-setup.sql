-- TEACHER SETUP — CHUNK 1 OF 17
-- Paste into a new Supabase SQL editor tab and Run, then do chunk 2.

-- Add the 'teacher' value to the app_role enum.
--
-- This lives in its own migration on purpose: Postgres will not let a newly
-- added enum value be *used* in the same transaction that adds it, and each
-- migration file runs in one transaction. Everything that references
-- 'teacher' therefore has to land in a later file.

ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'teacher';
