-- Add missing columns to module_progress
ALTER TABLE public.module_progress
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_accessed TIMESTAMPTZ DEFAULT now();

-- Create paper_portfolios table (paper trading simulation)
CREATE TABLE IF NOT EXISTS public.paper_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  cash DECIMAL(20, 2) DEFAULT 100000.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Create paper_positions table
CREATE TABLE IF NOT EXISTS public.paper_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.paper_portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  shares DECIMAL(20, 4) NOT NULL,
  avg_price DECIMAL(20, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- Create paper_transactions table
CREATE TABLE IF NOT EXISTS public.paper_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.paper_portfolios(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell')),
  symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  shares DECIMAL(20, 4) NOT NULL,
  price DECIMAL(20, 2) NOT NULL,
  total_amount DECIMAL(20, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.paper_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for paper_portfolios
CREATE POLICY "Users can view their own paper portfolio"
  ON public.paper_portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own paper portfolio"
  ON public.paper_portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own paper portfolio"
  ON public.paper_portfolios FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for paper_positions
CREATE POLICY "Users can view their own paper positions"
  ON public.paper_positions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.paper_portfolios
      WHERE paper_portfolios.id = paper_positions.portfolio_id
      AND paper_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own paper positions"
  ON public.paper_positions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.paper_portfolios
      WHERE paper_portfolios.id = paper_positions.portfolio_id
      AND paper_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own paper positions"
  ON public.paper_positions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.paper_portfolios
      WHERE paper_portfolios.id = paper_positions.portfolio_id
      AND paper_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own paper positions"
  ON public.paper_positions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.paper_portfolios
      WHERE paper_portfolios.id = paper_positions.portfolio_id
      AND paper_portfolios.user_id = auth.uid()
    )
  );

-- RLS Policies for paper_transactions
CREATE POLICY "Users can view their own paper transactions"
  ON public.paper_transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.paper_portfolios
      WHERE paper_portfolios.id = paper_transactions.portfolio_id
      AND paper_portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own paper transactions"
  ON public.paper_transactions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.paper_portfolios
      WHERE paper_portfolios.id = paper_transactions.portfolio_id
      AND paper_portfolios.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_paper_positions_portfolio_id ON public.paper_positions(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_paper_transactions_portfolio_id ON public.paper_transactions(portfolio_id);