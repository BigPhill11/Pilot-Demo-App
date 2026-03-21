-- Add missing column to video_clips
ALTER TABLE public.video_clips
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Create module_progress table
CREATE TABLE IF NOT EXISTS public.module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  module_id TEXT NOT NULL,
  module_type TEXT NOT NULL,
  course_id TEXT,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  time_spent_minutes INTEGER DEFAULT 0,
  pre_test_score INTEGER,
  post_test_score INTEGER,
  improvement_percentage INTEGER,
  detailed_progress JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Enable RLS
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for module_progress
CREATE POLICY "Users can view their own progress"
  ON public.module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.module_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_module_progress_user_id ON public.module_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_module_id ON public.module_progress(module_id);