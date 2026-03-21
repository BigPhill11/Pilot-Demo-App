-- Add missing columns to trading_videos
ALTER TABLE public.trading_videos
ADD COLUMN IF NOT EXISTS instructor_name TEXT,
ADD COLUMN IF NOT EXISTS instructor_bio TEXT,
ADD COLUMN IF NOT EXISTS instructor_credentials TEXT,
ADD COLUMN IF NOT EXISTS topic_category TEXT,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Create video_transcripts table
CREATE TABLE IF NOT EXISTS public.video_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  raw_content TEXT NOT NULL,
  transcript_type TEXT DEFAULT 'TXT',
  word_timestamps JSONB DEFAULT '[]'::jsonb,
  searchable_content TEXT,
  language_code TEXT DEFAULT 'en',
  confidence_score DECIMAL(3, 2),
  processing_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create video_segments table
CREATE TABLE IF NOT EXISTS public.video_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  start_time DECIMAL(10, 2) NOT NULL,
  end_time DECIMAL(10, 2) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  keywords TEXT[],
  segment_type TEXT DEFAULT 'chapter',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_segments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_transcripts (public read for now)
CREATE POLICY "Anyone can view transcripts"
  ON public.video_transcripts FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage transcripts"
  ON public.video_transcripts FOR ALL
  USING (true);

-- RLS Policies for video_segments (public read)
CREATE POLICY "Anyone can view segments"
  ON public.video_segments FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage segments"
  ON public.video_segments FOR ALL
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_transcripts_video_id ON public.video_transcripts(video_id);
CREATE INDEX IF NOT EXISTS idx_video_segments_video_id ON public.video_segments(video_id);