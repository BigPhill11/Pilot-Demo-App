# Phil's Friends — Content & Database Guide

Phil's Friends Reels reads from existing Supabase tables. No new database is required to launch — you need **published content** and **storage**.

## Tables

| Table | Purpose |
|-------|---------|
| `phils_friends_videos` | Full interviews (YouTube or uploaded file) |
| `video_clips` | ~45–75 second segments for the vertical feed |
| `video_analytics` | Watch completion (per user + video) |
| `video_points` | Optional gamification milestones |

## Storage buckets

Confirm these buckets exist in your Supabase project (see migration `20250909042711`):

- **`phil-videos`** — uploaded MP4/WebM files (`storage_path` on the video row)
- **`video-thumbnails`** — poster images (`thumbnail_url` or clip thumbnails)

Uploaded videos: set `source_type = 'upload'`, `storage_path` to the object path, and ensure the bucket policy allows public read (or use signed URLs consistently).

YouTube videos: set `source_type = 'youtube'`, `source_url` or `youtube_url` to the watch URL.

## `course_category` values (feed filters)

Use these exact slugs on **`phils_friends_videos.course_category`**:

| Chip in app | `course_category` |
|-------------|-------------------|
| Personal Finance | `personal-finance` |
| Market Intelligence | `market-intelligence` |
| Careers in Finance | `careers-in-finance` |
| Soft Skills | `soft-skills` |
| General / misc | `general` |

Legacy values (`careers`, `softskills`) are normalized in the app but new content should use the slugs above.

## Publishing workflow

1. **Upload** a full interview via admin tooling (`VideoUploadDialog` / dashboard).
2. Set metadata: `speaker_name`, `company`, `role_tier`, `course_category`, `published = true`.
3. **Cut clips** in `VideoClipManagement` for that video:
   - `start_sec`, `end_sec` (target ~60 seconds)
   - `title` — teen-facing hook
   - `excerpt` — one-line “what you’ll learn”
   - `published = true`, `clip_order` for sort order
4. Repeat until you have **2–3+ clips per category** for a solid demo.

## Feed logic (app)

1. Published **`video_clips`** with a published parent video appear first (ordered by `clip_order`, then `created_at`).
2. If a published parent video has **no clips** and `duration_sec <= 90`, it appears as a single full-length reel.

## Optional migration

Run `supabase/migrations/20260524000000_reel_feed_clip_columns.sql` if you want per-clip overrides:

- `feed_category` — filter chip without changing parent video
- `speaker_display_name` — overlay name override
- `learn_more_path` — custom “Learn more” deep link

## Industry `category` constraint

`phils_friends_videos.category` may be constrained to finance verticals (Asset Management, Investment Banking, etc.). Relax the CHECK constraint in Supabase only if you need non-finance guest labels.

## Admin access

Use **Admin tab → Phil's Friends Production** (`ClipProductionBoard`) for ingest, AI segmentation, review, and publish-with-quiz.

Full pipeline docs: [`docs/phils-friends-video-quiz-pipeline.md`](./phils-friends-video-quiz-pipeline.md)

Video upload and clip editing also live under `src/components/videos/`. Re-enable admin checks when your roles system is ready (`isAdmin` is currently `false` in several video components).

## Post-clip quiz

Each published clip can have one row in `clip_quiz_questions`. Learners see a **Quick check** after ~85% watch progress; rewards are configured in `src/config/philsFriendsRewards.ts`.
