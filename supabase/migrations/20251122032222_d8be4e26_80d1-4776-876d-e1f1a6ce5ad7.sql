-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  ticker TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  industry TEXT NOT NULL,
  headquarters TEXT,
  market_cap TEXT,
  revenue_ttm TEXT,
  pe_ratio TEXT,
  overview TEXT,
  kpis JSONB DEFAULT '[]'::jsonb,
  financials JSONB DEFAULT '[]'::jsonb,
  market_sentiment TEXT,
  analyst_sentiment TEXT,
  historical_performance TEXT,
  sector TEXT,
  sub_sector TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create market_data_cache table
CREATE TABLE IF NOT EXISTS public.market_data_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  price DECIMAL(20, 2),
  change_percent DECIMAL(10, 4),
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_company_interactions table
CREATE TABLE IF NOT EXISTS public.user_company_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'dislike', 'skip', 'favorite')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, company_id)
);

-- Create market_predictions table
CREATE TABLE IF NOT EXISTS public.market_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  week_ending DATE NOT NULL,
  predicted_price DECIMAL(20, 2),
  sentiment TEXT NOT NULL CHECK (sentiment IN ('bullish', 'bearish', 'neutral')),
  reasoning TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, week_ending)
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_company_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_predictions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies (public read, authenticated write)
CREATE POLICY "Anyone can view companies"
  ON public.companies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert companies"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update companies they created"
  ON public.companies FOR UPDATE
  USING (auth.uid() = created_by OR auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete companies they created"
  ON public.companies FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for market_data_cache (public read)
CREATE POLICY "Anyone can view market data"
  ON public.market_data_cache FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage market data"
  ON public.market_data_cache FOR ALL
  USING (true);

-- RLS Policies for user_company_interactions
CREATE POLICY "Users can view their own interactions"
  ON public.user_company_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interactions"
  ON public.user_company_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
  ON public.user_company_interactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
  ON public.user_company_interactions FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for market_predictions
CREATE POLICY "Users can view their own predictions"
  ON public.market_predictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all predictions (leaderboard)"
  ON public.market_predictions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own predictions"
  ON public.market_predictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions"
  ON public.market_predictions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_companies_ticker ON public.companies(ticker);
CREATE INDEX IF NOT EXISTS idx_companies_industry ON public.companies(industry);
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON public.user_company_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_company_id ON public.user_company_interactions(company_id);
CREATE INDEX IF NOT EXISTS idx_market_predictions_user_id ON public.market_predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_market_predictions_week_ending ON public.market_predictions(week_ending);