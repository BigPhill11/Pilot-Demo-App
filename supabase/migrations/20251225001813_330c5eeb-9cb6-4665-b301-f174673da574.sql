-- Add new columns for placement quiz and app tour
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS placement_track TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS placement_score INTEGER;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS app_tour_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS age_confirmed BOOLEAN DEFAULT FALSE;