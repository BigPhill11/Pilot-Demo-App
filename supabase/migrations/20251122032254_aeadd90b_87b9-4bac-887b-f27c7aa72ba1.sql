-- Add missing column to market_predictions
ALTER TABLE public.market_predictions
ADD COLUMN IF NOT EXISTS points_earned INTEGER DEFAULT 0;

-- Create trading_videos table
CREATE TABLE IF NOT EXISTS public.trading_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  topics TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_comments table
CREATE TABLE IF NOT EXISTS public.video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  parent_comment_id UUID REFERENCES public.video_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_ratings table
CREATE TABLE IF NOT EXISTS public.video_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.trading_videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  clarity_rating INTEGER CHECK (clarity_rating >= 1 AND clarity_rating <= 5),
  usefulness_rating INTEGER CHECK (usefulness_rating >= 1 AND usefulness_rating <= 5),
  entertainment_rating INTEGER CHECK (entertainment_rating >= 1 AND entertainment_rating <= 5),
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Create trading_portfolios table
CREATE TABLE IF NOT EXISTS public.trading_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  cash DECIMAL(20, 2) DEFAULT 100000.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Create trading_positions table
CREATE TABLE IF NOT EXISTS public.trading_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.trading_portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  shares DECIMAL(20, 4) NOT NULL,
  avg_price DECIMAL(20, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- Enable RLS
ALTER TABLE public.trading_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_positions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trading_videos
CREATE POLICY "Anyone can view trading videos"
  ON public.trading_videos FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert videos"
  ON public.trading_videos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own videos"
  ON public.trading_videos FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own videos"
  ON public.trading_videos FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for video_comments
CREATE POLICY "Anyone can view comments"
  ON public.video_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert comments"
  ON public.video_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.video_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.video_comments FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for video_ratings
CREATE POLICY "Anyone can view ratings"
  ON public.video_ratings FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own ratings"
  ON public.video_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON public.video_ratings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for trading_portfolios
CREATE POLICY "Users can view their own portfolio"
  ON public.trading_portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolio"
  ON public.trading_portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio"
  ON public.trading_portfolios FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for trading_positions
CREATE POLICY "Users can view their own positions"
  ON public.trading_positions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.trading_portfolios
      WHERE trading_portfolios.id = trading_positions.portfolio_id
      AND trading_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own positions"
  ON public.trading_positions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.trading_portfolios
      WHERE trading_portfolios.id = trading_positions.portfolio_id
      AND trading_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own positions"
  ON public.trading_positions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.trading_portfolios
      WHERE trading_portfolios.id = trading_positions.portfolio_id
      AND trading_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own positions"
  ON public.trading_positions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.trading_portfolios
      WHERE trading_portfolios.id = trading_positions.portfolio_id
      AND trading_portfolios.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_comments_video_id ON public.video_comments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_ratings_video_id ON public.video_ratings(video_id);
CREATE INDEX IF NOT EXISTS idx_trading_positions_portfolio_id ON public.trading_positions(portfolio_id);