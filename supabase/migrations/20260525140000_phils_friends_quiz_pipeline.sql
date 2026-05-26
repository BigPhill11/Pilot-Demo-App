-- Phil's Friends: clip quiz + production pipeline

-- Ensure base tables exist (defensive: may already be present from earlier migrations)
CREATE TABLE IF NOT EXISTS public.phils_friends_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  youtube_url TEXT,
  source_type TEXT CHECK (source_type IN ('youtube', 'upload')),
  source_url TEXT,
  storage_path TEXT,
  video_file_path TEXT,
  thumbnail_url TEXT,
  speaker_name TEXT,
  company TEXT,
  course_category TEXT,
  duration_sec INTEGER,
  duration_seconds INTEGER,
  processing_status TEXT DEFAULT 'pending',
  published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.video_clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  excerpt TEXT,
  start_sec DECIMAL(10, 2) NOT NULL DEFAULT 0,
  end_sec DECIMAL(10, 2) NOT NULL DEFAULT 60,
  clip_order INTEGER,
  published BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Production status on source videos
ALTER TABLE public.phils_friends_videos
  ADD COLUMN IF NOT EXISTS production_status text DEFAULT 'ingested';

COMMENT ON COLUMN public.phils_friends_videos.production_status IS
  'ingested | transcribed | segmented | reviewed | published';

-- Draft clips stay unpublished until reviewed
ALTER TABLE public.video_clips
  ADD COLUMN IF NOT EXISTS production_status text DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS feed_category text,
  ADD COLUMN IF NOT EXISTS speaker_display_name text,
  ADD COLUMN IF NOT EXISTS learn_more_path text;

COMMENT ON COLUMN public.video_clips.production_status IS
  'draft | reviewed | published';

-- One comprehension question per clip (published when clip is live)
CREATE TABLE IF NOT EXISTS public.clip_quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clip_id UUID NOT NULL REFERENCES public.video_clips(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_index INTEGER NOT NULL DEFAULT 0 CHECK (correct_index >= 0),
  explanation TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clip_id)
);

CREATE TABLE IF NOT EXISTS public.clip_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clip_id UUID NOT NULL REFERENCES public.video_clips(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.clip_quiz_questions(id) ON DELETE CASCADE,
  selected_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  watch_percent INTEGER DEFAULT 0,
  answered_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clip_quiz_questions_clip ON public.clip_quiz_questions(clip_id);
CREATE INDEX IF NOT EXISTS idx_clip_quiz_attempts_user_clip ON public.clip_quiz_attempts(user_id, clip_id);
CREATE INDEX IF NOT EXISTS idx_clip_quiz_attempts_answered ON public.clip_quiz_attempts(answered_at DESC);

ALTER TABLE public.clip_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clip_quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published clip quiz questions"
  ON public.clip_quiz_questions FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage own clip quiz questions"
  ON public.clip_quiz_questions FOR ALL
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own clip quiz attempts"
  ON public.clip_quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clip quiz attempts"
  ON public.clip_quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Reel feed columns (idempotent with 20260524000000)
ALTER TABLE public.video_clips
  ADD COLUMN IF NOT EXISTS feed_category text,
  ADD COLUMN IF NOT EXISTS speaker_display_name text,
  ADD COLUMN IF NOT EXISTS learn_more_path text;
