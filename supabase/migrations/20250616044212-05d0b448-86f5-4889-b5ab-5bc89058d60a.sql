
-- Create table for market predictions
CREATE TABLE public.market_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week_ending DATE NOT NULL,
  predicted_price DECIMAL(10,2),
  sentiment TEXT CHECK (sentiment IN ('bullish', 'bearish', 'neutral')) NOT NULL,
  reasoning TEXT NOT NULL,
  actual_price DECIMAL(10,2),
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for paper trading portfolios
CREATE TABLE public.paper_portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  cash DECIMAL(15,2) NOT NULL DEFAULT 10000.00,
  total_value DECIMAL(15,2) NOT NULL DEFAULT 10000.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for paper trading positions
CREATE TABLE public.paper_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID NOT NULL REFERENCES public.paper_portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  shares INTEGER NOT NULL,
  avg_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for paper trading transactions
CREATE TABLE public.paper_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID NOT NULL REFERENCES public.paper_portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('buy', 'sell')) NOT NULL,
  shares INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.market_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for market_predictions
CREATE POLICY "Users can view their own predictions" 
  ON public.market_predictions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own predictions" 
  ON public.market_predictions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions" 
  ON public.market_predictions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy to allow users to view all predictions (for community feature)
CREATE POLICY "Users can view all predictions for community" 
  ON public.market_predictions 
  FOR SELECT 
  USING (true);

-- Create RLS policies for paper_portfolios
CREATE POLICY "Users can view their own portfolios" 
  ON public.paper_portfolios 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolios" 
  ON public.paper_portfolios 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios" 
  ON public.paper_portfolios 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for paper_positions
CREATE POLICY "Users can view their own positions" 
  ON public.paper_positions 
  FOR SELECT 
  USING (auth.uid() = (SELECT user_id FROM public.paper_portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can create their own positions" 
  ON public.paper_positions 
  FOR INSERT 
  WITH CHECK (auth.uid() = (SELECT user_id FROM public.paper_portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can update their own positions" 
  ON public.paper_positions 
  FOR UPDATE 
  USING (auth.uid() = (SELECT user_id FROM public.paper_portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can delete their own positions" 
  ON public.paper_positions 
  FOR DELETE 
  USING (auth.uid() = (SELECT user_id FROM public.paper_portfolios WHERE id = portfolio_id));

-- Create RLS policies for paper_transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.paper_transactions 
  FOR SELECT 
  USING (auth.uid() = (SELECT user_id FROM public.paper_portfolios WHERE id = portfolio_id));

CREATE POLICY "Users can create their own transactions" 
  ON public.paper_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = (SELECT user_id FROM public.paper_portfolios WHERE id = portfolio_id));

-- Create indexes for better performance
CREATE INDEX idx_market_predictions_user_id ON public.market_predictions(user_id);
CREATE INDEX idx_market_predictions_week_ending ON public.market_predictions(week_ending);
CREATE INDEX idx_paper_portfolios_user_id ON public.paper_portfolios(user_id);
CREATE INDEX idx_paper_positions_portfolio_id ON public.paper_positions(portfolio_id);
CREATE INDEX idx_paper_transactions_portfolio_id ON public.paper_transactions(portfolio_id);

-- Create unique constraint to prevent duplicate predictions per week per user
ALTER TABLE public.market_predictions 
ADD CONSTRAINT unique_user_week_prediction 
UNIQUE (user_id, week_ending);

-- Create unique constraint to prevent duplicate portfolios per user
ALTER TABLE public.paper_portfolios 
ADD CONSTRAINT unique_user_portfolio 
UNIQUE (user_id);
