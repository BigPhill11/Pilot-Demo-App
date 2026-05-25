-- Enhanced transcription system with word-level timestamps and segments
-- Extend video_transcripts table for enhanced features
ALTER TABLE public.video_transcripts 
ADD COLUMN IF NOT EXISTS word_timestamps JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS searchable_content TEXT,
ADD COLUMN IF NOT EXISTS language_code TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS confidence_score NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed'));

-- Create video segments table for admin-defined segments
CREATE TABLE IF NOT EXISTS public.video_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  start_time NUMERIC NOT NULL,
  end_time NUMERIC NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  keywords TEXT[] DEFAULT '{}',
  segment_type TEXT DEFAULT 'custom' CHECK (segment_type IN ('custom', 'chapter', 'highlight', 'question', 'answer')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Create quiz questions table for timestamp-based questions
CREATE TABLE IF NOT EXISTS public.video_quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  timestamp_sec NUMERIC NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  question_type TEXT DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'open_ended')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user notes and highlights table
CREATE TABLE IF NOT EXISTS public.video_user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  video_id UUID NOT NULL REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  timestamp_sec NUMERIC NOT NULL,
  note_text TEXT,
  highlight_text TEXT,
  note_type TEXT DEFAULT 'note' CHECK (note_type IN ('note', 'highlight', 'bookmark')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create timestamp-based comments table
CREATE TABLE IF NOT EXISTS public.video_timestamp_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  video_id UUID NOT NULL REFERENCES public.phils_friends_videos(id) ON DELETE CASCADE,
  timestamp_sec NUMERIC NOT NULL,
  comment_text TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.video_timestamp_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.video_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_timestamp_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_segments
CREATE POLICY "Anyone can view video segments for published videos" ON public.video_segments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.phils_friends_videos 
    WHERE id = video_segments.video_id AND published = true
  )
);

CREATE POLICY "Admins can manage all video segments" ON public.video_segments
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_quiz_questions
CREATE POLICY "Anyone can view quiz questions for published videos" ON public.video_quiz_questions
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.phils_friends_videos 
    WHERE id = video_quiz_questions.video_id AND published = true
  )
);

CREATE POLICY "Admins can manage quiz questions" ON public.video_quiz_questions
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_user_notes
CREATE POLICY "Users can view their own notes" ON public.video_user_notes
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes" ON public.video_user_notes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON public.video_user_notes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON public.video_user_notes
FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for video_timestamp_comments
CREATE POLICY "Anyone can view timestamp comments for published videos" ON public.video_timestamp_comments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.phils_friends_videos 
    WHERE id = video_timestamp_comments.video_id AND published = true
  )
);

CREATE POLICY "Users can create timestamp comments" ON public.video_timestamp_comments
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own timestamp comments" ON public.video_timestamp_comments
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own timestamp comments" ON public.video_timestamp_comments
FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_video_segments_video_id ON public.video_segments(video_id);
CREATE INDEX IF NOT EXISTS idx_video_segments_time ON public.video_segments(video_id, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_video_quiz_timestamp ON public.video_quiz_questions(video_id, timestamp_sec);
CREATE INDEX IF NOT EXISTS idx_video_user_notes_user_video ON public.video_user_notes(user_id, video_id);
CREATE INDEX IF NOT EXISTS idx_video_timestamp_comments_video ON public.video_timestamp_comments(video_id, timestamp_sec);
CREATE INDEX IF NOT EXISTS idx_video_transcripts_searchable ON public.video_transcripts USING gin(to_tsvector('english', searchable_content));

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_video_segments_updated_at BEFORE UPDATE ON public.video_segments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_quiz_questions_updated_at BEFORE UPDATE ON public.video_quiz_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_user_notes_updated_at BEFORE UPDATE ON public.video_user_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_timestamp_comments_updated_at BEFORE UPDATE ON public.video_timestamp_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();