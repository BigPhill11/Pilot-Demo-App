-- Standardize and consolidate progress tracking
-- First, let's create a unified structure for the module_progress table to handle all module types consistently

-- Drop the existing constraints that might conflict
ALTER TABLE module_progress DROP CONSTRAINT IF EXISTS unique_user_module_progress;

-- Add a unique constraint for the new unified structure
ALTER TABLE module_progress ADD CONSTRAINT unique_user_module_progress 
UNIQUE (user_id, module_id, module_type, course_id);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_module_progress_lookup 
ON module_progress (user_id, module_type, module_id, course_id);

-- Migrate existing soft_skills_module_progress data to the unified table
INSERT INTO module_progress (
  user_id, 
  module_id, 
  module_type, 
  course_id,
  progress_percentage,
  time_spent_minutes,
  last_accessed,
  completed_at,
  detailed_progress
)
SELECT 
  user_id,
  module_id,
  'soft_skills' as module_type,
  course_id,
  completion_percentage as progress_percentage,
  time_spent_minutes,
  updated_at as last_accessed,
  completed_at,
  jsonb_build_object(
    'responses', responses,
    'game_scores', game_scores,
    'module_title', module_title
  ) as detailed_progress
FROM soft_skills_module_progress
ON CONFLICT (user_id, module_id, module_type, course_id) DO UPDATE SET
  progress_percentage = EXCLUDED.progress_percentage,
  time_spent_minutes = EXCLUDED.time_spent_minutes,
  last_accessed = EXCLUDED.last_accessed,
  completed_at = EXCLUDED.completed_at,
  detailed_progress = EXCLUDED.detailed_progress;

-- Migrate consulting_module_progress data
INSERT INTO module_progress (
  user_id, 
  module_id, 
  module_type, 
  course_id,
  progress_percentage,
  time_spent_minutes,
  last_accessed,
  completed_at,
  detailed_progress
)
SELECT 
  user_id,
  'level_' || level::text as module_id,
  'consulting' as module_type,
  'management-consulting' as course_id,
  total_progress as progress_percentage,
  0 as time_spent_minutes,
  last_accessed,
  CASE WHEN total_progress >= 100 THEN last_accessed ELSE NULL END as completed_at,
  jsonb_build_object(
    'level', level,
    'overview_completed', overview_completed,
    'terms_progress', terms_progress,
    'mini_games_progress', mini_games_progress
  ) as detailed_progress
FROM consulting_module_progress
ON CONFLICT (user_id, module_id, module_type, course_id) DO UPDATE SET
  progress_percentage = EXCLUDED.progress_percentage,
  last_accessed = EXCLUDED.last_accessed,
  completed_at = EXCLUDED.completed_at,
  detailed_progress = EXCLUDED.detailed_progress;

-- Migrate vc_module_progress data
INSERT INTO module_progress (
  user_id, 
  module_id, 
  module_type, 
  course_id,
  progress_percentage,
  time_spent_minutes,
  last_accessed,
  completed_at,
  detailed_progress
)
SELECT 
  user_id,
  'level_' || level::text as module_id,
  'venture_capital' as module_type,
  'venture-capital' as course_id,
  total_progress as progress_percentage,
  0 as time_spent_minutes,
  last_accessed,
  CASE WHEN total_progress >= 100 THEN last_accessed ELSE NULL END as completed_at,
  jsonb_build_object(
    'level', level,
    'overview_completed', overview_completed,
    'terms_progress', terms_progress,
    'mini_games_progress', mini_games_progress
  ) as detailed_progress
FROM vc_module_progress
ON CONFLICT (user_id, module_id, module_type, course_id) DO UPDATE SET
  progress_percentage = EXCLUDED.progress_percentage,
  last_accessed = EXCLUDED.last_accessed,
  completed_at = EXCLUDED.completed_at,
  detailed_progress = EXCLUDED.detailed_progress;