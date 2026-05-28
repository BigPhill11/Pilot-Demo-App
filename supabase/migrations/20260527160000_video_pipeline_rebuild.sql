-- Phil's Friends video pipeline rebuild
-- Canonicalizes feed sections, fixes upload/playback storage settings, and removes
-- schema constraints that blocked the current upload flow.

-- 1) Canonical four-section taxonomy
ALTER TABLE public.phils_friends_videos
  ADD COLUMN IF NOT EXISTS feed_section text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS course_category text;

ALTER TABLE public.video_clips
  ADD COLUMN IF NOT EXISTS feed_section text,
  ADD COLUMN IF NOT EXISTS feed_category text;

UPDATE public.phils_friends_videos
SET feed_section = CASE
  WHEN lower(coalesce(course_category, category, '')) IN ('personal finance', 'personal-finance') THEN 'personal-finance'
  WHEN lower(coalesce(course_category, category, '')) IN ('business/market intelligence', 'business-market-intelligence', 'market intelligence', 'market-intelligence', 'companies') THEN 'market-intelligence'
  WHEN lower(coalesce(course_category, category, '')) IN ('career readiness', 'career-readiness') THEN 'career-readiness'
  WHEN lower(coalesce(course_category, category, '')) IN ('careers', 'careers in finance', 'careers-in-finance') THEN 'careers-in-finance'
  ELSE coalesce(feed_section, 'careers-in-finance')
END
WHERE feed_section IS NULL;

UPDATE public.video_clips AS vc
SET feed_section = CASE
  WHEN lower(coalesce(vc.feed_section, vc.feed_category, pfv.feed_section, pfv.course_category, pfv.category, '')) IN ('personal finance', 'personal-finance') THEN 'personal-finance'
  WHEN lower(coalesce(vc.feed_section, vc.feed_category, pfv.feed_section, pfv.course_category, pfv.category, '')) IN ('business/market intelligence', 'business-market-intelligence', 'market intelligence', 'market-intelligence', 'companies') THEN 'market-intelligence'
  WHEN lower(coalesce(vc.feed_section, vc.feed_category, pfv.feed_section, pfv.course_category, pfv.category, '')) IN ('career readiness', 'career-readiness') THEN 'career-readiness'
  WHEN lower(coalesce(vc.feed_section, vc.feed_category, pfv.feed_section, pfv.course_category, pfv.category, '')) IN ('careers', 'careers in finance', 'careers-in-finance') THEN 'careers-in-finance'
  ELSE coalesce(vc.feed_section, vc.feed_category, pfv.feed_section, 'careers-in-finance')
END
FROM public.phils_friends_videos AS pfv
WHERE vc.video_id = pfv.id
  AND vc.feed_section IS NULL;

UPDATE public.video_clips
SET feed_section = 'careers-in-finance'
WHERE feed_section IS NULL;

ALTER TABLE public.phils_friends_videos
  ALTER COLUMN feed_section SET DEFAULT 'careers-in-finance',
  ALTER COLUMN feed_section SET NOT NULL;

ALTER TABLE public.video_clips
  ALTER COLUMN feed_section SET DEFAULT 'careers-in-finance',
  ALTER COLUMN feed_section SET NOT NULL;

ALTER TABLE public.phils_friends_videos
  DROP CONSTRAINT IF EXISTS phils_friends_videos_category_check,
  DROP CONSTRAINT IF EXISTS phils_friends_videos_feed_section_check;

ALTER TABLE public.phils_friends_videos
  ADD CONSTRAINT phils_friends_videos_feed_section_check
  CHECK (feed_section IN ('personal-finance', 'market-intelligence', 'careers-in-finance', 'career-readiness'));

ALTER TABLE public.video_clips
  DROP CONSTRAINT IF EXISTS video_clips_feed_section_check,
  DROP CONSTRAINT IF EXISTS video_clips_feed_category_check;

ALTER TABLE public.video_clips
  ADD CONSTRAINT video_clips_feed_section_check
  CHECK (feed_section IN ('personal-finance', 'market-intelligence', 'careers-in-finance', 'career-readiness'));

COMMENT ON COLUMN public.phils_friends_videos.feed_section IS
  'Canonical Phil''s Friends section: personal-finance, market-intelligence, careers-in-finance, career-readiness.';

COMMENT ON COLUMN public.video_clips.feed_section IS
  'Canonical Phil''s Friends feed section inherited from the source video.';

CREATE INDEX IF NOT EXISTS idx_phils_friends_videos_feed_section
  ON public.phils_friends_videos(feed_section);

CREATE INDEX IF NOT EXISTS idx_video_clips_feed_section
  ON public.video_clips(feed_section);

-- 2) Processing statuses used by the unified ingestion pipeline
ALTER TABLE public.phils_friends_videos
  DROP CONSTRAINT IF EXISTS phils_friends_videos_processing_status_check;

ALTER TABLE public.phils_friends_videos
  ADD CONSTRAINT phils_friends_videos_processing_status_check
  CHECK (processing_status IN ('pending', 'processing', 'pending_transcript', 'completed', 'failed'));

-- 3) Storage settings for upload + learner playback
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('phil-videos', 'phil-videos', true, 524288000)
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = 524288000;

-- Keep thumbnails public and transcripts private, but ensure stable limits.
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES
  ('video-thumbnails', 'video-thumbnails', true, 10485760),
  ('video-transcripts', 'video-transcripts', false, 5242880)
ON CONFLICT (id) DO UPDATE
SET public = excluded.public,
    file_size_limit = excluded.file_size_limit;

DROP POLICY IF EXISTS "Admins can view all videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view phil videos" ON storage.objects;

CREATE POLICY "Anyone can view phil videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'phil-videos');

-- 4) Admin DB access mirrors the Admin UI.
DROP POLICY IF EXISTS "Admins can manage all Phil videos" ON public.phils_friends_videos;

CREATE POLICY "Admins can manage all Phil videos"
ON public.phils_friends_videos
FOR ALL
USING (has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::public.app_role));

DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL
     AND to_regtype('public.app_role') IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'::public.app_role
    FROM auth.users
    WHERE lower(email) = 'phillipghead@gmail.com'
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;
