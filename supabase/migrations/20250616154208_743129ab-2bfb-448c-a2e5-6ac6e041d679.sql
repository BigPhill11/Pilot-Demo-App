
-- Create table for tracking daily logins and streaks
CREATE TABLE public.daily_logins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  login_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, login_date)
);

-- Enable RLS
ALTER TABLE public.daily_logins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own login records" 
  ON public.daily_logins 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own login records" 
  ON public.daily_logins 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Add level column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_level INTEGER DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS points_to_next_level INTEGER DEFAULT 200;

-- Function to calculate streak
CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_streak INTEGER := 0;
  check_date DATE := CURRENT_DATE;
BEGIN
  -- Check consecutive days backwards from today
  LOOP
    -- Check if user logged in on check_date
    IF EXISTS (
      SELECT 1 FROM public.daily_logins 
      WHERE user_id = p_user_id AND login_date = check_date
    ) THEN
      current_streak := current_streak + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      -- Break the loop if no login found for this date
      EXIT;
    END IF;
  END LOOP;
  
  RETURN current_streak;
END;
$$;

-- Function to handle daily login and update streak
CREATE OR REPLACE FUNCTION public.handle_daily_login(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  login_recorded BOOLEAN := FALSE;
  new_streak INTEGER := 0;
  points_earned INTEGER := 0;
  bonus_points INTEGER := 0;
  result JSON;
  row_count INTEGER;
BEGIN
  -- Insert daily login record (ignore if already exists for today)
  INSERT INTO public.daily_logins (user_id, login_date)
  VALUES (p_user_id, CURRENT_DATE)
  ON CONFLICT (user_id, login_date) DO NOTHING;
  
  -- Check if a new login was recorded
  GET DIAGNOSTICS row_count = ROW_COUNT;
  login_recorded := row_count > 0;
  
  IF login_recorded THEN
    -- Calculate new streak
    new_streak := public.calculate_user_streak(p_user_id);
    
    -- Base login points
    points_earned := 5;
    
    -- Streak bonus calculation
    IF new_streak = 5 THEN
      bonus_points := 10; -- 5-day streak bonus
    ELSIF new_streak > 5 THEN
      bonus_points := 10; -- 10 points daily after day 5
    END IF;
    
    -- Update user profile with new streak and points
    UPDATE public.profiles 
    SET 
      current_streak = new_streak,
      longest_streak = GREATEST(longest_streak, new_streak),
      last_login_date = CURRENT_DATE,
      updated_at = now()
    WHERE id = p_user_id;
    
    -- Update user progress with earned points
    UPDATE public.user_progress 
    SET 
      total_points = total_points + points_earned + bonus_points,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  -- Return result
  SELECT json_build_object(
    'login_recorded', login_recorded,
    'streak', COALESCE(new_streak, public.calculate_user_streak(p_user_id)),
    'points_earned', COALESCE(points_earned + bonus_points, 0)
  ) INTO result;
  
  RETURN result;
END;
$$;
