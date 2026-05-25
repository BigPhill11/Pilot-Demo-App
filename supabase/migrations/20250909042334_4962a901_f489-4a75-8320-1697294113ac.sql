-- Fix the video_badges table unique constraint and complete Phil's Friends setup

-- Add unique constraint to badge_code
ALTER TABLE public.video_badges ADD CONSTRAINT video_badges_badge_code_unique UNIQUE (badge_code);

-- Insert initial badge definitions with proper conflict handling
INSERT INTO public.video_badges (badge_code, badge_name, badge_description, badge_icon) VALUES
  ('FIRST_WATCH', 'First Watch', 'Watched your first video', '▶️'),
  ('CLIP_CHAMP', 'Clip Champ', 'Completed 25 video clips', '🎬'),
  ('INDUSTRY_EXPLORER', 'Industry Explorer', 'Watched 5 videos in one industry', '🔍'),
  ('ROLE_READY_INTERN', 'Role Ready: Intern', 'Watched 3 Intern-level videos', '🎓'),
  ('ROLE_READY_ANALYST', 'Role Ready: Analyst', 'Watched 5 Analyst-level videos', '📊'),
  ('ROLE_READY_ASSOCIATE', 'Role Ready: Associate', 'Watched 5 Associate-level videos', '💼'),
  ('EXEC_MINDSET', 'Executive Mindset', 'Watched 3 MD/Professional videos', '👔'),
  ('WEEKLY_STREAK', 'Weekly Streak', 'Maintained 7-day viewing streak', '🔥')
ON CONFLICT (badge_code) DO NOTHING;