# Phil's Friends — Video + Quiz Pipeline

End-to-end workflow for turning long interviews into reel clips with comprehension checks and Bamboo Empire rewards.

## Ingest standards

See [`src/data/phils-friends/ingest-standards.ts`](../src/data/phils-friends/ingest-standards.ts):

- **Filename:** `speaker_topic_YYYYMMDD_takeN.mp4`
- **Archive:** 1920×1080 full interview in `phil-videos` bucket
- **Clips:** 30–90s segments (target ~60s), stored as `video_clips` rows with `start_sec` / `end_sec`
- **Categories:** `personal-finance`, `market-intelligence`, `careers-in-finance`, `soft-skills`, `general`

## Production statuses

| Source video `production_status` | Meaning |
|----------------------------------|---------|
| `ingested` | Uploaded, not transcribed |
| `transcribed` | Transcript on file |
| `segmented` | AI draft clips created |
| `reviewed` | Editor approved copy/timing |
| `published` | At least one clip live |

| Clip `production_status` | Meaning |
|--------------------------|---------|
| `draft` | AI suggestion, not in feed |
| `reviewed` | Editor approved |
| `published` | Live in reel feed |

## Admin workflow

1. Open **Admin** tab → **Phil's Friends Production**
2. **Upload interview** (default category: `careers-in-finance` for pilot)
3. **Segment** — runs `enhanced-transcription` (Whisper for uploads ≤24MB) then `process-video-transcript`
4. **Review queue** — edit title, excerpt, in/out points, quiz Q&A
5. **Publish** — sets `video_clips.published` and `clip_quiz_questions.published`

## Learner flow

1. Watch clip in `/phils-friends` reel feed
2. Reach **85%** watch progress → small bamboo/XP (watch reward)
3. **Quick check** — one multiple-choice question
4. Correct answer → primary bamboo/XP; wrong → small participation bamboo
5. Rewards cooldown: **24h** per clip for full quiz payout (anti-farming)

Reward values: [`src/config/philsFriendsRewards.ts`](../src/config/philsFriendsRewards.ts)

## Database tables

- `phils_friends_videos` — source interviews
- `video_clips` — reel segments
- `video_transcripts` — full transcript text
- `clip_quiz_questions` — one question per clip
- `clip_quiz_attempts` — user answers + watch %
- `video_analytics` — watch events

Migration: `supabase/migrations/20260525140000_phils_friends_quiz_pipeline.sql`

## Edge functions

- `enhanced-transcription` — Whisper + clip/quiz generation (draft, unpublished)
- `process-video-transcript` — segment from pasted/uploaded transcript

## Pilot metrics

Use `fetchPilotMetrics()` from [`src/lib/philsFriendsMetrics.ts`](../src/lib/philsFriendsMetrics.ts) to track:

- Published clips per category
- Quiz attempts / correct rate
- Avg watch % at answer time
- Quiz participation vs video analytics completions
