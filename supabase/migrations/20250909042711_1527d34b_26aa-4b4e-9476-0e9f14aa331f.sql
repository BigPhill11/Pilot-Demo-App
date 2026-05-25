-- Enhanced Phil's Friends video system schema (complete migration)

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
CREATE TABLE public.video_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  transcript_type text NOT NULL CHECK (transcript_type IN ('SRT', 'VTT', 'TXT')),
  raw_content text NOT NULL,
  parsed_cues jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create video clips table
CREATE TABLE public.video_clips (
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
CREATE TABLE public.video_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id uuid REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  clip_id uuid REFERENCES public.video_clips(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('VIDEO_STARTED', 'VIDEO_50', 'VIDEO_100', 'CLIP_COMPLETE', 'ALL_CLIPS_COMPLETE')),
  progress_pct integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Create video points table
CREATE TABLE public.video_points (
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
CREATE TABLE public.video_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_code text NOT NULL UNIQUE,
  badge_name text NOT NULL,
  badge_description text,
  badge_icon text DEFAULT '🏆',
  created_at timestamp with time zone DEFAULT now()
);

-- Create user video badges table
CREATE TABLE public.user_video_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES public.video_badges(id) ON DELETE CASCADE,
  awarded_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create video streaks table
CREATE TABLE public.video_streaks (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak_days integer DEFAULT 0,
  longest_streak_days integer DEFAULT 0,
  last_active_date date,
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.video_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_video_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_transcripts
CREATE POLICY "Anyone can view published video transcripts" ON public.video_transcripts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.phils_friends_videos 
    WHERE id = video_transcripts.video_id AND published = true
  )
);

CREATE POLICY "Admins can manage all transcripts" ON public.video_transcripts
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_clips
CREATE POLICY "Anyone can view published clips" ON public.video_clips
FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage all clips" ON public.video_clips
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_analytics
CREATE POLICY "Users can view their own analytics" ON public.video_analytics
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON public.video_analytics
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all analytics" ON public.video_analytics
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_points
CREATE POLICY "Users can view their own points" ON public.video_points
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can award points" ON public.video_points
FOR INSERT WITH CHECK (true);

-- RLS Policies for video_badges
CREATE POLICY "Anyone can view badges" ON public.video_badges
FOR SELECT USING (true);

CREATE POLICY "Admins can manage badges" ON public.video_badges
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for user_video_badges
CREATE POLICY "Users can view their own badges" ON public.user_video_badges
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can award badges" ON public.user_video_badges
FOR INSERT WITH CHECK (true);

-- RLS Policies for video_streaks
CREATE POLICY "Users can view their own streaks" ON public.video_streaks
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" ON public.video_streaks
FOR ALL USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create storage buckets for video content
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('phil-videos', 'phil-videos', false),
  ('video-thumbnails', 'video-thumbnails', true),
  ('video-transcripts', 'video-transcripts', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for phil-videos bucket
CREATE POLICY "Admins can upload videos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'phil-videos' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can view all videos" ON storage.objects
FOR SELECT USING (
  bucket_id = 'phil-videos' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Storage policies for video-thumbnails bucket
CREATE POLICY "Anyone can view thumbnails" ON storage.objects
FOR SELECT USING (bucket_id = 'video-thumbnails');

CREATE POLICY "Admins can upload thumbnails" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'video-thumbnails' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Storage policies for video-transcripts bucket
CREATE POLICY "Admins can manage transcripts" ON storage.objects
FOR ALL USING (
  bucket_id = 'video-transcripts' AND 
  has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  bucket_id = 'video-transcripts' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

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

-- Add indexes for performance
CREATE INDEX idx_video_clips_video_id ON public.video_clips(video_id);
CREATE INDEX idx_video_analytics_user_video ON public.video_analytics(user_id, video_id);
CREATE INDEX idx_video_points_user_event ON public.video_points(user_id, event_type);
CREATE INDEX idx_phils_friends_videos_published ON public.phils_friends_videos(published);
CREATE INDEX idx_phils_friends_videos_category ON public.phils_friends_videos(category);
CREATE INDEX idx_phils_friends_videos_role_tier ON public.phils_friends_videos(role_tier);