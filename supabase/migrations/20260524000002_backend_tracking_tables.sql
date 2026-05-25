-- Backend tracking tables for user data persistence across devices
-- Tables: user_bamboo_coins, xp_transactions, shop_purchases,
--         bamboo_empire_state, quiz_progress, game_scores, user_achievements

-- ============================================================
-- user_bamboo_coins — coin wallet per user
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_bamboo_coins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_coins INTEGER NOT NULL DEFAULT 0,
  lifetime_earned INTEGER NOT NULL DEFAULT 0,
  total_spent INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.user_bamboo_coins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own coins"
  ON public.user_bamboo_coins FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own coins"
  ON public.user_bamboo_coins FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own coins"
  ON public.user_bamboo_coins FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- xp_transactions — audit log of XP / coin events
-- ============================================================
CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp_amount INTEGER NOT NULL DEFAULT 0,
  coins_awarded INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL,
  source_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON public.xp_transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON public.xp_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS xp_transactions_user_id_idx ON public.xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS xp_transactions_created_at_idx ON public.xp_transactions(created_at DESC);

-- ============================================================
-- shop_purchases — items bought from the in-app shop
-- ============================================================
CREATE TABLE IF NOT EXISTS public.shop_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  cost INTEGER NOT NULL DEFAULT 0,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shop_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON public.shop_purchases FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON public.shop_purchases FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- bamboo_empire_state — full Bamboo Empire game state
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bamboo_empire_state (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_state JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_saved TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.bamboo_empire_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own empire state"
  ON public.bamboo_empire_state FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own empire state"
  ON public.bamboo_empire_state FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own empire state"
  ON public.bamboo_empire_state FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- quiz_progress — per-topic mastery tracking
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quiz_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  mastery_level INTEGER NOT NULL DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
  attempt_count INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  last_attempt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

ALTER TABLE public.quiz_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz progress"
  ON public.quiz_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz progress"
  ON public.quiz_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz progress"
  ON public.quiz_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_quiz_progress_updated_at
  BEFORE UPDATE ON public.quiz_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- game_scores — leaderboard / history scores per game type
-- ============================================================
CREATE TABLE IF NOT EXISTS public.game_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game scores"
  ON public.game_scores FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game scores"
  ON public.game_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS game_scores_user_game_idx ON public.game_scores(user_id, game_type);
CREATE INDEX IF NOT EXISTS game_scores_created_at_idx ON public.game_scores(created_at DESC);

-- ============================================================
-- user_achievements — unlocked & claimed achievements
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  claimed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own achievements"
  ON public.user_achievements FOR UPDATE USING (auth.uid() = user_id);
