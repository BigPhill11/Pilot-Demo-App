
-- Create companies table to store company data
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ticker TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  industry TEXT NOT NULL,
  headquarters TEXT NOT NULL,
  market_cap TEXT NOT NULL,
  revenue_ttm TEXT NOT NULL,
  pe_ratio TEXT NOT NULL,
  overview TEXT NOT NULL,
  kpis JSONB NOT NULL DEFAULT '[]'::jsonb,
  financials JSONB NOT NULL DEFAULT '[]'::jsonb,
  market_sentiment TEXT,
  analyst_sentiment TEXT,
  historical_performance TEXT,
  sector TEXT,
  sub_sector TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create user_company_interactions table to track likes/hearts
CREATE TABLE public.user_company_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'dislike', 'super_like', 'heart')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, company_id, interaction_type)
);

-- Add RLS policies for companies table
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read companies
CREATE POLICY "Anyone can view companies" 
  ON public.companies 
  FOR SELECT 
  USING (true);

-- Only authenticated users can insert companies (for admin functionality)
CREATE POLICY "Authenticated users can create companies" 
  ON public.companies 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Only creators can update their companies
CREATE POLICY "Users can update their own companies" 
  ON public.companies 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = created_by);

-- Only creators can delete their companies
CREATE POLICY "Users can delete their own companies" 
  ON public.companies 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = created_by);

-- Add RLS policies for user_company_interactions table
ALTER TABLE public.user_company_interactions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own interactions
CREATE POLICY "Users can view their own interactions" 
  ON public.user_company_interactions 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own interactions
CREATE POLICY "Users can create their own interactions" 
  ON public.user_company_interactions 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own interactions
CREATE POLICY "Users can update their own interactions" 
  ON public.user_company_interactions 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own interactions
CREATE POLICY "Users can delete their own interactions" 
  ON public.user_company_interactions 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_companies_sector ON public.companies(sector);
CREATE INDEX idx_companies_industry ON public.companies(industry);
CREATE INDEX idx_companies_ticker ON public.companies(ticker);
CREATE INDEX idx_user_interactions_user_id ON public.user_company_interactions(user_id);
CREATE INDEX idx_user_interactions_company_id ON public.user_company_interactions(company_id);
