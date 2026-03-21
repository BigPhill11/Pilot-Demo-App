-- Insert Networking Like a Pro course
INSERT INTO public.soft_skills_courses (title, description, category, difficulty_level, estimated_duration) VALUES
('Networking Like a Pro', 'Master the art of building meaningful professional relationships and advancing your career through strategic networking', 'networking', 'intermediate', 360);

-- Get the course ID for lessons (we'll need to update this with actual ID after)
-- Insert lessons for Networking Like a Pro course
INSERT INTO public.soft_skills_lessons (course_id, title, content, lesson_order) VALUES
((SELECT id FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'), 'Networking Foundations & Mindset', 'Build the right networking mindset and understand relationship-building fundamentals', 1),
((SELECT id FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'), 'Crafting Your Professional Story', 'Develop compelling personal narratives for different networking contexts', 2),
((SELECT id FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'), 'Strategic Relationship Building', 'Master the art of building meaningful professional relationships', 3),
((SELECT id FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'), 'Digital Networking Excellence', 'Leverage online platforms and tools for effective networking', 4),
((SELECT id FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'), 'Maintaining & Leveraging Networks', 'Build systems for nurturing relationships and creating mutual value', 5),
((SELECT id FROM public.soft_skills_courses WHERE title = 'Networking Like a Pro'), 'Advanced Networking Strategies', 'Master advanced techniques for career acceleration through networks', 6);