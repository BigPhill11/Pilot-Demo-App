-- Create phils_friends_videos table
CREATE TABLE IF NOT EXISTS public.phils_friends_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT,
  video_file_path TEXT,
  thumbnail_url TEXT,
  source_type TEXT CHECK (source_type IN ('youtube', 'upload')),
  duration_seconds INTEGER,
  processing_status TEXT DEFAULT 'pending',
  published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_clips table
CREATE TABLE IF NOT EXISTS public.video_clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  excerpt TEXT,
  start_sec DECIMAL(10, 2) NOT NULL,
  end_sec DECIMAL(10, 2) NOT NULL,
  clip_order INTEGER,
  published BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_analytics table
CREATE TABLE IF NOT EXISTS public.video_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  watch_duration_seconds INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  last_watched_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_points table
CREATE TABLE IF NOT EXISTS public.video_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  points_earned INTEGER DEFAULT 0,
  milestone_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Enable RLS
ALTER TABLE public.phils_friends_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_points ENABLE ROW LEVEL SECURITY;

-- RLS Policies for phils_friends_videos
CREATE POLICY "Anyone can view published videos"
  ON public.phils_friends_videos FOR SELECT
  USING (published = true OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can insert videos"
  ON public.phils_friends_videos FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own videos"
  ON public.phils_friends_videos FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own videos"
  ON public.phils_friends_videos FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for video_clips
CREATE POLICY "Anyone can view published clips"
  ON public.video_clips FOR SELECT
  USING (published = true);

CREATE POLICY "Service role can manage clips"
  ON public.video_clips FOR ALL
  USING (true);

-- RLS Policies for video_analytics
CREATE POLICY "Users can view their own analytics"
  ON public.video_analytics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics"
  ON public.video_analytics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics"
  ON public.video_analytics FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for video_points
CREATE POLICY "Users can view their own points"
  ON public.video_points FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own points"
  ON public.video_points FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own points"
  ON public.video_points FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_clips_video_id ON public.video_clips(video_id);
CREATE INDEX IF NOT EXISTS idx_video_analytics_video_id ON public.video_analytics(video_id);
CREATE INDEX IF NOT EXISTS idx_video_analytics_user_id ON public.video_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_video_points_user_id ON public.video_points(user_id);