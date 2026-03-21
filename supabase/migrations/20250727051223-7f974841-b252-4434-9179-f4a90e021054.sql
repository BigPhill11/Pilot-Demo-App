-- Add new course categories and courses for diversity and inclusion soft skills

-- Insert Black in Business Excellence course
INSERT INTO public.soft_skills_courses (
  title,
  description,
  category,
  difficulty_level,
  estimated_duration,
  objectives,
  prerequisites
) VALUES (
  'Black in Business Excellence',
  'Master professional excellence while navigating unique challenges and leveraging your authentic identity in corporate environments. Build confidence, develop strategic networking skills, and learn to thrive authentically in business.',
  'diversity_inclusion',
  'intermediate',
  240,
  ARRAY[
    'Develop authentic leadership presence while honoring your identity',
    'Master code-switching and professional communication strategies',
    'Build strategic networks and navigate workplace politics effectively',
    'Handle microaggressions and bias with confidence and professionalism',
    'Leverage your unique perspective as a competitive advantage',
    'Create inclusive environments and advocate for others'
  ],
  ARRAY['Basic professional communication skills', 'Understanding of corporate environments']
);

-- Insert Working Women Excellence course  
INSERT INTO public.soft_skills_courses (
  title,
  description,
  category,
  difficulty_level,
  estimated_duration,
  objectives,
  prerequisites
) VALUES (
  'Working Women Excellence',
  'Navigate professional challenges unique to women in the workplace. Master assertive communication, work-life integration, salary negotiation, and leadership skills while building confidence and breaking through barriers.',
  'diversity_inclusion',
  'intermediate',
  240,
  ARRAY[
    'Master assertive communication and executive presence',
    'Develop effective work-life integration strategies',
    'Build confidence in salary negotiation and self-advocacy',
    'Navigate gender dynamics and workplace politics',
    'Develop strong professional networks and mentorship relationships',
    'Lead with authenticity while challenging gender stereotypes'
  ],
  ARRAY['Basic professional communication skills', 'Understanding of workplace dynamics']
);

-- Create modules table for detailed lesson structure
CREATE TABLE IF NOT EXISTS public.soft_skills_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.soft_skills_courses(id) ON DELETE CASCADE,
  module_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  overview TEXT NOT NULL,
  learning_objectives JSONB NOT NULL DEFAULT '[]',
  key_terms JSONB NOT NULL DEFAULT '[]',
  quiz_questions JSONB NOT NULL DEFAULT '[]',
  real_world_example JSONB NOT NULL DEFAULT '{}',
  practice_exercise JSONB NOT NULL DEFAULT '{}',
  estimated_duration INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.soft_skills_modules ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Modules are viewable by everyone" 
ON public.soft_skills_modules 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can manage modules" 
ON public.soft_skills_modules 
FOR ALL
USING (auth.role() = 'authenticated');

-- Create trigger for timestamps
CREATE TRIGGER update_soft_skills_modules_updated_at
BEFORE UPDATE ON public.soft_skills_modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create user module progress table
CREATE TABLE IF NOT EXISTS public.user_soft_skills_module_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.soft_skills_courses(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.soft_skills_modules(id) ON DELETE CASCADE,
  quiz_responses JSONB NOT NULL DEFAULT '[]',
  practice_completed BOOLEAN NOT NULL DEFAULT false,
  practice_score INTEGER,
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  time_spent_minutes INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Enable RLS
ALTER TABLE public.user_soft_skills_module_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own module progress" 
ON public.user_soft_skills_module_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own module progress" 
ON public.user_soft_skills_module_progress 
FOR ALL
USING (auth.uid() = user_id);

-- Create trigger for timestamps
CREATE TRIGGER update_user_soft_skills_module_progress_updated_at
BEFORE UPDATE ON public.user_soft_skills_module_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();