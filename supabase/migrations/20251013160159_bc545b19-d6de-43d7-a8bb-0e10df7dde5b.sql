-- Fix all SECURITY DEFINER functions by adding SET search_path = public

-- 1. Fix calculate_user_streak
CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  current_streak INTEGER := 0;
  check_date DATE := CURRENT_DATE;
BEGIN
  LOOP
    IF EXISTS (
      SELECT 1 FROM public.daily_logins 
      WHERE user_id = p_user_id AND login_date = check_date
    ) THEN
      current_streak := current_streak + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  RETURN current_streak;
END;
$function$;

-- 2. Fix get_video_average_ratings
CREATE OR REPLACE FUNCTION public.get_video_average_ratings(video_id_param uuid)
RETURNS TABLE(avg_clarity numeric, avg_usefulness numeric, avg_entertainment numeric, avg_difficulty numeric, avg_overall numeric, total_ratings integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    ROUND(AVG(clarity_rating), 1) as avg_clarity,
    ROUND(AVG(usefulness_rating), 1) as avg_usefulness,
    ROUND(AVG(entertainment_rating), 1) as avg_entertainment,
    ROUND(AVG(difficulty_rating), 1) as avg_difficulty,
    ROUND(AVG(overall_rating), 1) as avg_overall,
    COUNT(*)::INTEGER as total_ratings
  FROM public.video_ratings
  WHERE video_id = video_id_param;
END;
$function$;

-- 3. Fix update_user_social_stats
CREATE OR REPLACE FUNCTION public.update_user_social_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'user_follows' THEN
      INSERT INTO public.user_social_stats (user_id, followers_count)
      VALUES (NEW.following_id, 1)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        followers_count = user_social_stats.followers_count + 1,
        updated_at = now();
      
      INSERT INTO public.user_social_stats (user_id, following_count)
      VALUES (NEW.follower_id, 1)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        following_count = user_social_stats.following_count + 1,
        updated_at = now();
    END IF;
    
    IF TG_TABLE_NAME = 'posts' THEN
      INSERT INTO public.user_social_stats (user_id, posts_count)
      VALUES (NEW.user_id, 1)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        posts_count = user_social_stats.posts_count + 1,
        updated_at = now();
    END IF;
    
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'user_follows' THEN
      UPDATE public.user_social_stats 
      SET 
        followers_count = GREATEST(followers_count - 1, 0),
        updated_at = now()
      WHERE user_id = OLD.following_id;
      
      UPDATE public.user_social_stats 
      SET 
        following_count = GREATEST(following_count - 1, 0),
        updated_at = now()
      WHERE user_id = OLD.follower_id;
    END IF;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$function$;

-- 4. Fix bulk_insert_financial_terms
CREATE OR REPLACE FUNCTION public.bulk_insert_financial_terms(terms_data jsonb)
RETURNS TABLE(inserted_count integer, error_count integer, errors text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  term_record JSONB;
  inserted_count INTEGER := 0;
  error_count INTEGER := 0;
  errors TEXT[] := '{}';
  error_msg TEXT;
BEGIN
  FOR term_record IN SELECT * FROM jsonb_array_elements(terms_data)
  LOOP
    BEGIN
      INSERT INTO public.financial_terms_database (
        term, 
        definition, 
        category, 
        difficulty_level, 
        analogy, 
        real_world_example, 
        example_usage,
        source,
        created_by
      ) VALUES (
        term_record->>'term',
        term_record->>'definition',
        COALESCE(term_record->>'category', 'general'),
        COALESCE(term_record->>'difficulty_level', 'beginner'),
        term_record->>'analogy',
        term_record->>'real_world_example',
        term_record->>'example_usage',
        term_record->>'source',
        auth.uid()
      );
      inserted_count := inserted_count + 1;
    EXCEPTION WHEN OTHERS THEN
      error_count := error_count + 1;
      error_msg := SQLERRM || ' - Term: ' || COALESCE(term_record->>'term', 'Unknown');
      errors := array_append(errors, error_msg);
    END;
  END LOOP;
  
  RETURN QUERY SELECT inserted_count, error_count, errors;
END;
$function$;

-- 5. Fix update_group_member_count
CREATE OR REPLACE FUNCTION public.update_group_member_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.industry_groups 
    SET member_count = member_count + 1 
    WHERE id = NEW.group_id;
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.industry_groups 
    SET member_count = GREATEST(member_count - 1, 0) 
    WHERE id = OLD.group_id;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$function$;

-- 6. Fix update_learning_progress
CREATE OR REPLACE FUNCTION public.update_learning_progress(p_user_id uuid, p_module_id uuid, p_progress_percentage integer, p_time_spent integer DEFAULT 0)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  result JSON;
  is_completed BOOLEAN := false;
BEGIN
  IF p_progress_percentage >= 100 THEN
    is_completed := true;
  END IF;

  INSERT INTO public.user_learning_progress (
    user_id, module_id, progress_percentage, time_spent_minutes, status,
    completion_date, updated_at
  ) VALUES (
    p_user_id, p_module_id, p_progress_percentage, p_time_spent,
    CASE WHEN is_completed THEN 'completed' ELSE 'in_progress' END,
    CASE WHEN is_completed THEN now() ELSE NULL END,
    now()
  )
  ON CONFLICT (user_id, module_id) 
  DO UPDATE SET 
    progress_percentage = EXCLUDED.progress_percentage,
    time_spent_minutes = user_learning_progress.time_spent_minutes + p_time_spent,
    status = EXCLUDED.status,
    completion_date = CASE 
      WHEN EXCLUDED.progress_percentage >= 100 AND user_learning_progress.completion_date IS NULL 
      THEN now() 
      ELSE user_learning_progress.completion_date 
    END,
    updated_at = now();

  IF is_completed THEN
    INSERT INTO public.user_analytics (user_id, metric_type, metric_value, metadata)
    VALUES (p_user_id, 'modules_completed', 1, jsonb_build_object('module_id', p_module_id))
    ON CONFLICT (user_id, metric_type, date_recorded) 
    DO UPDATE SET metric_value = user_analytics.metric_value + 1;
  END IF;

  SELECT json_build_object(
    'success', true,
    'completed', is_completed,
    'progress', p_progress_percentage
  ) INTO result;

  RETURN result;
END;
$function$;

-- 7. Fix generate_user_recommendations
CREATE OR REPLACE FUNCTION public.generate_user_recommendations(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  user_level INTEGER;
  completed_modules INTEGER;
  result JSON;
BEGIN
  SELECT current_level INTO user_level FROM public.profiles WHERE id = p_user_id;
  
  SELECT COUNT(*) INTO completed_modules 
  FROM public.user_learning_progress 
  WHERE user_id = p_user_id AND status = 'completed';

  DELETE FROM public.ai_recommendations 
  WHERE user_id = p_user_id AND created_at < now() - INTERVAL '7 days';

  IF completed_modules < 3 THEN
    INSERT INTO public.ai_recommendations (user_id, recommendation_type, title, description, recommended_item_id, confidence_score, reasoning)
    SELECT 
      p_user_id,
      'learning_module',
      'Start with: ' || title,
      'This foundational module will help you build essential knowledge.',
      id,
      0.9,
      'Recommended for beginners based on difficulty level and prerequisites'
    FROM public.learning_modules 
    WHERE difficulty_level = 'beginner' 
    AND id NOT IN (
      SELECT module_id FROM public.user_learning_progress 
      WHERE user_id = p_user_id AND status IN ('completed', 'in_progress')
    )
    LIMIT 2;
  END IF;

  IF completed_modules >= 2 AND user_level >= 2 THEN
    INSERT INTO public.ai_recommendations (user_id, recommendation_type, title, description, confidence_score, reasoning)
    VALUES 
    (p_user_id, 'career_advice', 'Consider Advanced Learning Paths', 
     'Based on your progress, you might be ready for intermediate and advanced modules.', 
     0.8, 'User has completed basic modules and leveled up'),
    (p_user_id, 'investment_tip', 'Diversify Your Learning', 
     'Try exploring different categories to broaden your financial knowledge.', 
     0.7, 'Encouraging exploration of different learning categories');
  END IF;

  SELECT json_build_object('success', true, 'recommendations_generated', true) INTO result;
  RETURN result;
END;
$function$;

-- 8. Fix handle_daily_login
CREATE OR REPLACE FUNCTION public.handle_daily_login(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  login_recorded BOOLEAN := FALSE;
  new_streak INTEGER := 0;
  points_earned INTEGER := 0;
  bonus_points INTEGER := 0;
  result JSON;
  row_count INTEGER;
BEGIN
  INSERT INTO public.daily_logins (user_id, login_date)
  VALUES (p_user_id, CURRENT_DATE)
  ON CONFLICT (user_id, login_date) DO NOTHING;
  
  GET DIAGNOSTICS row_count = ROW_COUNT;
  login_recorded := (row_count > 0);
  
  IF login_recorded THEN
    new_streak := public.calculate_user_streak(p_user_id);
    
    points_earned := 5;
    
    IF new_streak = 5 THEN
      bonus_points := 10;
    ELSIF new_streak > 5 THEN
      bonus_points := 10;
    END IF;
    
    UPDATE public.profiles 
    SET 
      current_streak = new_streak,
      longest_streak = GREATEST(longest_streak, new_streak),
      last_login_date = CURRENT_DATE,
      updated_at = now()
    WHERE id = p_user_id;
    
    UPDATE public.user_progress 
    SET 
      total_points = total_points + points_earned + bonus_points,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  SELECT json_build_object(
    'login_recorded', login_recorded,
    'streak', COALESCE(new_streak, public.calculate_user_streak(p_user_id)),
    'points_earned', COALESCE(points_earned + bonus_points, 0)
  ) INTO result;
  
  RETURN result;
END;
$function$;