-- Add columns and constraint updates that later migrations depend on.
-- These were applied directly in Lovable's environment before the migration
-- files were generated, so they need to be backfilled here.

-- Add objectives and prerequisites columns to soft_skills_courses
ALTER TABLE public.soft_skills_courses
  ADD COLUMN IF NOT EXISTS objectives TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS prerequisites TEXT[] DEFAULT '{}';

-- Drop old category constraint and add the expanded one that includes diversity_inclusion
ALTER TABLE public.soft_skills_courses
  DROP CONSTRAINT IF EXISTS soft_skills_courses_category_check;

ALTER TABLE public.soft_skills_courses
  ADD CONSTRAINT soft_skills_courses_category_check
  CHECK (category IN (
    'interviewing',
    'networking',
    'professional_communication',
    'business_attire',
    'workplace_etiquette',
    'diversity_inclusion'
  ));
