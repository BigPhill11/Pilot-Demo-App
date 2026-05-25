-- First, let's update the check constraint to allow diversity_inclusion category
ALTER TABLE public.soft_skills_courses DROP CONSTRAINT IF EXISTS soft_skills_courses_category_check;

-- Add the new constraint with the diversity_inclusion category
ALTER TABLE public.soft_skills_courses ADD CONSTRAINT soft_skills_courses_category_check 
CHECK (category IN ('interviewing', 'networking', 'professional_communication', 'business_attire', 'workplace_etiquette', 'diversity_inclusion'));

-- Now insert the new diversity and inclusion courses
INSERT INTO public.soft_skills_courses (
  title,
  description,
  category,
  difficulty_level,
  estimated_duration,
  thumbnail_url
) VALUES 
(
  'Black in Business Excellence',
  'Master professional excellence while navigating unique challenges and leveraging your authentic identity in corporate environments. Build confidence, develop strategic networking skills, and learn to thrive authentically in business.',
  'diversity_inclusion',
  'intermediate',
  270,
  null
),
(
  'Working Women Excellence',
  'Navigate professional challenges unique to women in the workplace. Master assertive communication, work-life integration, salary negotiation, and leadership skills while building confidence and breaking through barriers.',
  'diversity_inclusion',
  'intermediate',
  275,
  null
);