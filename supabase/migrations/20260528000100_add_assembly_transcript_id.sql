-- Stores the AssemblyAI transcript ID between the submission call and the
-- polling retry so the edge function can resume without re-submitting.
ALTER TABLE public.phils_friends_videos
  ADD COLUMN IF NOT EXISTS assembly_transcript_id text;
