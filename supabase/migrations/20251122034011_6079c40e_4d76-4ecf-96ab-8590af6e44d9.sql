-- Add missing columns to phils_friends_videos table
ALTER TABLE phils_friends_videos
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS role_tier TEXT,
ADD COLUMN IF NOT EXISTS duration_sec INTEGER,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS course_category TEXT,
ADD COLUMN IF NOT EXISTS speaker_name TEXT,
ADD COLUMN IF NOT EXISTS soft_skills_section TEXT,
ADD COLUMN IF NOT EXISTS video_type TEXT,
ADD COLUMN IF NOT EXISTS level TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- Set name to title for existing records where name is null
UPDATE phils_friends_videos
SET name = title
WHERE name IS NULL;

-- Set duration_sec from duration_seconds for existing records
UPDATE phils_friends_videos
SET duration_sec = duration_seconds
WHERE duration_sec IS NULL AND duration_seconds IS NOT NULL;