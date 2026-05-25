-- Drop the restrictive CHECK constraint on app_version.
-- The column was being written with values like 'personal-finance' from ProtectedRoute,
-- AuthModal, and useOnboarding, causing silent constraint violations that left
-- app_tour_completed stuck at false (infinite onboarding loop).
-- We keep placement_track for track identity; app_version tracks skill level.

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_app_version_check;

-- Normalise any rows that landed 'personal-finance' in app_version to 'beginner'.
UPDATE public.profiles
SET app_version = 'beginner'
WHERE app_version NOT IN ('beginner', 'intermediate', 'advanced')
  AND app_version IS NOT NULL;

-- Re-add the constraint with the correct allowed values only.
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_app_version_check
  CHECK (app_version IN ('beginner', 'intermediate', 'advanced') OR app_version IS NULL);
