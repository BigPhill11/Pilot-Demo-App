-- Create unified module progress table
CREATE TABLE public.module_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  module_type TEXT NOT NULL,
  course_id TEXT,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  time_spent_minutes INTEGER NOT NULL DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  detailed_progress JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id, module_type, course_id)
);

-- Enable RLS
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own module progress" 
ON public.module_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own module progress" 
ON public.module_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own module progress" 
ON public.module_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_module_progress_updated_at
BEFORE UPDATE ON public.module_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_module_progress_user_type ON public.module_progress(user_id, module_type);
CREATE INDEX idx_module_progress_user_module ON public.module_progress(user_id, module_id);
CREATE INDEX idx_module_progress_completion ON public.module_progress(user_id, completed_at) WHERE completed_at IS NOT NULL;