-- Insert Networking Like a Pro course (idempotent)
INSERT INTO public.soft_skills_courses (title, description, category, difficulty_level, estimated_duration)
SELECT 'Networking Like a Pro', 'Master the art of building meaningful professional relationships and advancing your career through strategic networking', 'networking', 'intermediate', 360
WHERE NOT EXISTS (
  SELECT 1 FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'
);

-- Insert lessons, using LIMIT 1 to safely handle any duplicate course rows
INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order)
SELECT id, 'Networking Foundations & Mindset', 'Build the right networking mindset and understand relationship-building fundamentals', 1
FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order)
SELECT id, 'Crafting Your Professional Story', 'Develop compelling personal narratives for different networking contexts', 2
FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order)
SELECT id, 'Strategic Relationship Building', 'Master the art of building meaningful professional relationships', 3
FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order)
SELECT id, 'Digital Networking Excellence', 'Leverage online platforms and tools for effective networking', 4
FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order)
SELECT id, 'Maintaining & Leveraging Networks', 'Build systems for nurturing relationships and creating mutual value', 5
FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order)
SELECT id, 'Advanced Networking Strategies', 'Master advanced techniques for career acceleration through networks', 6
FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro' LIMIT 1
ON CONFLICT DO NOTHING;
