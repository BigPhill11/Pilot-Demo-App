-- Create table for soft skills module progress and responses
CREATE TABLE public.soft_skills_module_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  module_title TEXT NOT NULL,
  responses JSONB NOT NULL DEFAULT '[]'::jsonb,
  game_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  time_spent_minutes INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id, module_id)
);

-- Enable Row Level Security
ALTER TABLE public.soft_skills_module_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own module progress" 
ON public.soft_skills_module_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own module progress" 
ON public.soft_skills_module_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own module progress" 
ON public.soft_skills_module_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_soft_skills_module_progress_updated_at
BEFORE UPDATE ON public.soft_skills_module_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();