-- Optional reel feed metadata on clips (inherits from parent video when null)
ALTER TABLE public.video_clips
  ADD COLUMN IF NOT EXISTS feed_category text,
  ADD COLUMN IF NOT EXISTS speaker_display_name text,
  ADD COLUMN IF NOT EXISTS learn_more_path text;

COMMENT ON COLUMN public.video_clips.feed_category IS 'Override course_category for feed filter; e.g. personal-finance, market-intelligence';
COMMENT ON COLUMN public.video_clips.learn_more_path IS 'In-app path for Learn more CTA, e.g. /learn?tab=careers';
