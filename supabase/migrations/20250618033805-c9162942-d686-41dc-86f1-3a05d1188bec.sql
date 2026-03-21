
-- Create table for trading education videos
CREATE TABLE public.trading_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  instructor_name TEXT NOT NULL,
  instructor_bio TEXT,
  instructor_credentials TEXT,
  topic_category TEXT NOT NULL CHECK (topic_category IN ('company-analysis', 'market-psychology', 'forecasting', 'general')),
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  view_count INTEGER DEFAULT 0,
  submitted_by UUID REFERENCES auth.users
);

-- Create table for video ratings
CREATE TABLE public.video_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clarity_rating INTEGER NOT NULL CHECK (clarity_rating >= 1 AND clarity_rating <= 5),
  usefulness_rating INTEGER NOT NULL CHECK (usefulness_rating >= 1 AND usefulness_rating <= 5),
  entertainment_rating INTEGER NOT NULL CHECK (entertainment_rating >= 1 AND entertainment_rating <= 5),
  difficulty_rating INTEGER NOT NULL CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  overall_rating DECIMAL(2,1) GENERATED ALWAYS AS ((clarity_rating + usefulness_rating + entertainment_rating + difficulty_rating) / 4.0) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(video_id, user_id)
);

-- Create table for video comments
CREATE TABLE public.video_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.video_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tracking which users found comments helpful
CREATE TABLE public.comment_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES public.video_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('helpful')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.trading_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trading_videos
CREATE POLICY "Anyone can view approved videos" 
  ON public.trading_videos 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "Authenticated users can submit videos" 
  ON public.trading_videos 
  FOR INSERT 
  WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Users can update their own pending videos" 
  ON public.trading_videos 
  FOR UPDATE 
  USING (auth.uid() = submitted_by AND status = 'pending');

-- RLS Policies for video_ratings
CREATE POLICY "Anyone can view video ratings" 
  ON public.video_ratings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can rate videos" 
  ON public.video_ratings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" 
  ON public.video_ratings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for video_comments
CREATE POLICY "Anyone can view comments" 
  ON public.video_comments 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can comment" 
  ON public.video_comments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
  ON public.video_comments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for comment_votes
CREATE POLICY "Anyone can view comment votes" 
  ON public.comment_votes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can vote on comments" 
  ON public.comment_votes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" 
  ON public.comment_votes 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_trading_videos_category ON public.trading_videos(topic_category);
CREATE INDEX idx_trading_videos_difficulty ON public.trading_videos(difficulty_level);
CREATE INDEX idx_trading_videos_status ON public.trading_videos(status);
CREATE INDEX idx_video_ratings_video_id ON public.video_ratings(video_id);
CREATE INDEX idx_video_comments_video_id ON public.video_comments(video_id);
CREATE INDEX idx_comment_votes_comment_id ON public.comment_votes(comment_id);

-- Function to calculate average ratings for videos
CREATE OR REPLACE FUNCTION public.get_video_average_ratings(video_id_param UUID)
RETURNS TABLE (
  avg_clarity DECIMAL(2,1),
  avg_usefulness DECIMAL(2,1),
  avg_entertainment DECIMAL(2,1),
  avg_difficulty DECIMAL(2,1),
  avg_overall DECIMAL(2,1),
  total_ratings INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROUND(AVG(clarity_rating), 1) as avg_clarity,
    ROUND(AVG(usefulness_rating), 1) as avg_usefulness,
    ROUND(AVG(entertainment_rating), 1) as avg_entertainment,
    ROUND(AVG(difficulty_rating), 1) as avg_difficulty,
    ROUND(AVG(overall_rating), 1) as avg_overall,
    COUNT(*)::INTEGER as total_ratings
  FROM public.video_ratings
  WHERE video_id = video_id_param;
END;
$$;
