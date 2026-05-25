
-- Add LinkedIn profile information to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN linkedin_url TEXT,
ADD COLUMN linkedin_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN linkedin_connected_at TIMESTAMP WITH TIME ZONE;

-- Create a table for soft skills courses and lessons
CREATE TABLE public.soft_skills_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('interviewing', 'networking', 'professional_communication', 'business_attire', 'workplace_etiquette')),
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration INTEGER NOT NULL, -- in minutes
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for individual lessons within courses
CREATE TABLE public.soft_skills_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.soft_skills_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  lesson_order INTEGER NOT NULL,
  video_url TEXT,
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table to track user progress in soft skills courses
CREATE TABLE public.user_soft_skills_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.soft_skills_courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.soft_skills_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on new tables
ALTER TABLE public.soft_skills_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soft_skills_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_soft_skills_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for soft_skills_courses (public read access)
CREATE POLICY "Anyone can view soft skills courses" ON public.soft_skills_courses FOR SELECT USING (true);

-- RLS policies for soft_skills_lessons (public read access)
CREATE POLICY "Anyone can view soft skills lessons" ON public.soft_skills_lessons FOR SELECT USING (true);

-- RLS policies for user_soft_skills_progress (users can only see their own progress)
CREATE POLICY "Users can view their own soft skills progress" ON public.user_soft_skills_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own soft skills progress" ON public.user_soft_skills_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own soft skills progress" ON public.user_soft_skills_progress FOR UPDATE USING (auth.uid() = user_id);

-- Insert some sample soft skills courses
INSERT INTO public.soft_skills_courses (title, description, category, difficulty_level, estimated_duration) VALUES
('Professional Interviewing Mastery', 'Learn how to excel in job interviews with confidence and professionalism', 'interviewing', 'intermediate', 45),
('Networking Like a Pro', 'Master the art of professional networking both online and offline', 'networking', 'beginner', 30),
('Business Communication Excellence', 'Develop strong professional communication skills for the workplace', 'professional_communication', 'beginner', 40),
('Dress for Success: Business Attire Guide', 'Complete guide to professional dress codes and business attire', 'business_attire', 'beginner', 25),
('Workplace Etiquette Fundamentals', 'Essential workplace etiquette and professional behavior guidelines', 'workplace_etiquette', 'beginner', 35);
