-- Insert the new diversity and inclusion courses
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