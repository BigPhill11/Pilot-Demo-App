-- Enhanced Phil's Friends video system schema (final migration without duplicate indexes)

-- First, enhance the existing phils_friends_videos table
ALTER TABLE public.phils_friends_videos 
ADD COLUMN IF NOT EXISTS source_type text DEFAULT 'upload' CHECK (source_type IN ('upload', 'youtube')),
ADD COLUMN IF NOT EXISTS source_url text,
ADD COLUMN IF NOT EXISTS storage_path text,
ADD COLUMN IF NOT EXISTS duration_sec integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS published boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS processing_status text DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
ADD COLUMN IF NOT EXISTS role_tier text DEFAULT 'Analyst' CHECK (role_tier IN ('Intern', 'Analyst', 'Associate', 'Managing Director', 'Professional'));

-- Update industry options to match requirements
ALTER TABLE public.phils_friends_videos 
DROP CONSTRAINT IF EXISTS phils_friends_videos_category_check;

ALTER TABLE public.phils_friends_videos 
ADD CONSTRAINT phils_friends_videos_category_check 
CHECK (category IN ('Asset Management', 'Investment Banking', 'Private Equity', 'Venture Capital', 'Hedge Funds', 'Wealth Management', 'Other'));

-- Create video transcripts table
CREATE TABLE IF NOT EXISTS public.video_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  transcript_type text NOT NULL CHECK (transcript_type IN ('SRT', 'VTT', 'TXT')),
  raw_content text NOT NULL,
  parsed_cues jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create video clips table
CREATE TABLE IF NOT EXISTS public.video_clips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  start_sec numeric NOT NULL,
  end_sec numeric NOT NULL,
  title text NOT NULL,
  excerpt text,
  clip_order integer DEFAULT 0,
  published boolean DEFAULT false,
  thumbnail_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create video analytics table
CREATE TABLE IF NOT EXISTS public.video_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id uuid REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  clip_id uuid REFERENCES public.video_clips(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('VIDEO_STARTED', 'VIDEO_50', 'VIDEO_100', 'CLIP_COMPLETE', 'ALL_CLIPS_COMPLETE')),
  progress_pct integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Create video points table
CREATE TABLE IF NOT EXISTS public.video_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  video_id uuid REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  clip_id uuid REFERENCES public.video_clips(id) ON DELETE CASCADE,
  points_earned integer NOT NULL DEFAULT 0,
  awarded_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, event_type, video_id, clip_id)
);

-- Create video badges table
CREATE TABLE IF NOT EXISTS public.video_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_code text NOT NULL UNIQUE,
  badge_name text NOT NULL,
  badge_description text,
  badge_icon text DEFAULT '🏆',
  created_at timestamp with time zone DEFAULT now()
);

-- Create user video badges table
CREATE TABLE IF NOT EXISTS public.user_video_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES public.video_badges(id) ON DELETE CASCADE,
  awarded_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create video streaks table
CREATE TABLE IF NOT EXISTS public.video_streaks (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak_days integer DEFAULT 0,
  longest_streak_days integer DEFAULT 0,
  last_active_date date,
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all new tables (if they exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'video_transcripts') THEN
        ALTER TABLE public.video_transcripts ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'video_clips') THEN
        ALTER TABLE public.video_clips ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'video_analytics') THEN
        ALTER TABLE public.video_analytics ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'video_points') THEN
        ALTER TABLE public.video_points ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'video_badges') THEN
        ALTER TABLE public.video_badges ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_video_badges') THEN
        ALTER TABLE public.user_video_badges ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'video_streaks') THEN
        ALTER TABLE public.video_streaks ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create storage buckets for video content
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('phil-videos', 'phil-videos', false),
  ('video-thumbnails', 'video-thumbnails', true),
  ('video-transcripts', 'video-transcripts', false)
ON CONFLICT (id) DO NOTHING;

-- Insert initial badge definitions
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