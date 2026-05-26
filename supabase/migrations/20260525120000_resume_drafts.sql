-- Resume builder drafts (per-user, synced for logged-in students)
CREATE TABLE IF NOT EXISTS public.resume_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  draft jsonb NOT NULL DEFAULT '{}'::jsonb,
  progress jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT resume_drafts_user_id_key UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS resume_drafts_user_id_idx ON public.resume_drafts (user_id);

ALTER TABLE public.resume_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resume drafts"
  ON public.resume_drafts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resume drafts"
  ON public.resume_drafts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resume drafts"
  ON public.resume_drafts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resume drafts"
  ON public.resume_drafts
  FOR DELETE
  USING (auth.uid() = user_id);
