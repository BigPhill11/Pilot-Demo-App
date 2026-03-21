
-- Create table for consulting module progress
CREATE TABLE public.consulting_module_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  level INTEGER NOT NULL,
  overview_completed BOOLEAN NOT NULL DEFAULT false,
  terms_progress JSONB NOT NULL DEFAULT '{"totalTerms": 0, "masteredTerms": [], "completionPercentage": 0}'::jsonb,
  mini_games_progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_progress INTEGER NOT NULL DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, level)
);

-- Enable Row Level Security
ALTER TABLE public.consulting_module_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own consulting progress" 
ON public.consulting_module_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consulting progress" 
ON public.consulting_module_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consulting progress" 
ON public.consulting_module_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consulting_module_progress_updated_at
BEFORE UPDATE ON public.consulting_module_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
