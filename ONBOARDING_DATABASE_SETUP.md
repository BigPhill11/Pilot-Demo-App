# Onboarding System Database Setup

## Required Database Changes

To enable the onboarding system, you need to add the following columns to your `profiles` table in Supabase.

### SQL Migration

Run this SQL in your Supabase SQL Editor (Database > SQL Editor):

```sql
-- Add onboarding tracking fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS app_walkthrough_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS learn_tab_tutorial_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS learn_tab_tutorial_completed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS tutorial_xp_earned INTEGER DEFAULT 0;

-- Create index for faster queries on onboarding status
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding 
ON profiles(app_walkthrough_completed, learn_tab_tutorial_completed);
```

### How to Run

1. Open your Supabase Dashboard
2. Go to the SQL Editor (left sidebar)
3. Create a new query
4. Paste the SQL above
5. Click "Run" to execute

### What These Fields Do

- `app_walkthrough_completed`: Tracks if user completed the 4-slide app tour
- `learn_tab_tutorial_completed`: Tracks if user completed the mandatory Learn tab tutorial
- `learn_tab_tutorial_completed_at`: Timestamp of when tutorial was completed
- `tutorial_xp_earned`: Tracks XP earned from completing tutorials (for analytics)

### Verification

After running the migration, you can verify the columns were added by running:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN (
  'app_walkthrough_completed',
  'learn_tab_tutorial_completed', 
  'learn_tab_tutorial_completed_at',
  'tutorial_xp_earned'
);
```

You should see all 4 columns listed.
