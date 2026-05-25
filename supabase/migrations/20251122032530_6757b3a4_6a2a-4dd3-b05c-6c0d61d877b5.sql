-- Create soft_skills_courses table
CREATE TABLE IF NOT EXISTS public.soft_skills_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes INTEGER,
  thumbnail_url TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.soft_skills_courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for soft_skills_courses (public read)
CREATE POLICY "Anyone can view soft skills courses"
  ON public.soft_skills_courses FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert courses"
  ON public.soft_skills_courses FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update courses"
  ON public.soft_skills_courses FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Create index
CREATE INDEX IF NOT EXISTS idx_soft_skills_category ON public.soft_skills_courses(category);