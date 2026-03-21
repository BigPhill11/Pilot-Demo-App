
-- Enable extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create market data cache table for scheduled updates
CREATE TABLE public.market_data_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  change_amount DECIMAL(10,4) NOT NULL,
  change_percent DECIMAL(10,4) NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('stock', 'etf', 'commodity', 'index', 'bond', 'crypto')),
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add asset_type to existing trading tables
ALTER TABLE public.paper_positions ADD COLUMN IF NOT EXISTS asset_type TEXT DEFAULT 'stock';
ALTER TABLE public.paper_transactions ADD COLUMN IF NOT EXISTS asset_type TEXT DEFAULT 'stock';

-- Create index for fast lookups
CREATE INDEX idx_market_data_cache_symbol ON public.market_data_cache(symbol);
CREATE INDEX idx_market_data_cache_asset_type ON public.market_data_cache(asset_type);
CREATE INDEX idx_market_data_cache_last_updated ON public.market_data_cache(last_updated);

-- Enable RLS for market data cache
ALTER TABLE public.market_data_cache ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read market data (it's public data)
CREATE POLICY "Anyone can view market data cache" 
  ON public.market_data_cache 
  FOR SELECT 
  USING (true);

-- Set up scheduled market data refresh at 7 AM, 12 PM, and 5 PM EST
SELECT cron.schedule(
  'market-data-refresh-7am',
  '0 12 * * *', -- 7 AM EST = 12 PM UTC (adjust for your timezone)
  $$
  SELECT net.http_post(
    url:='https://aqqbxivolegafwuurxxm.supabase.co/functions/v1/scheduled-market-refresh',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcWJ4aXZvbGVnYWZ3dXVyeHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjkwMTcsImV4cCI6MjA2NTU0NTAxN30.W5pB4lv_OTYvXn9dx6146ms16HZdfdfaTv2bs3cK-r0"}'::jsonb,
    body:='{"refreshType": "market-data"}'::jsonb
  ) as request_id;
  $$
);

SELECT cron.schedule(
  'market-data-refresh-12pm',
  '0 17 * * *', -- 12 PM EST = 5 PM UTC
  $$
  SELECT net.http_post(
    url:='https://aqqbxivolegafwuurxxm.supabase.co/functions/v1/scheduled-market-refresh',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcWJ4aXZvbGVnYWZ3dXVyeHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjkwMTcsImV4cCI6MjA2NTU0NTAxN30.W5pB4lv_OTYvXn9dx6146ms16HZdfdfaTv2bs3cK-r0"}'::jsonb,
    body:='{"refreshType": "market-data"}'::jsonb
  ) as request_id;
  $$
);

SELECT cron.schedule(
  'market-data-refresh-5pm',
  '0 22 * * *', -- 5 PM EST = 10 PM UTC
  $$
  SELECT net.http_post(
    url:='https://aqqbxivolegafwuurxxm.supabase.co/functions/v1/scheduled-market-refresh',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcWJ4aXZvbGVnYWZ3dXVyeHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjkwMTcsImV4cCI6MjA2NTU0NTAxN30.W5pB4lv_OTYvXn9dx6146ms16HZdfdfaTv2bs3cK-r0"}'::jsonb,
    body:='{"refreshType": "market-data"}'::jsonb
  ) as request_id;
  $$
);

-- Also schedule headlines refresh at 7 AM
SELECT cron.schedule(
  'headlines-refresh-7am',
  '0 12 * * *', -- 7 AM EST = 12 PM UTC
  $$
  SELECT net.http_post(
    url:='https://aqqbxivolegafwuurxxm.supabase.co/functions/v1/scheduled-market-refresh',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcWJ4aXZvbGVnYWZ3dXVyeHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjkwMTcsImV4cCI6MjA2NTU0NTAxN30.W5pB4lv_OTYvXn9dx6146ms16HZdfdfaTv2bs3cK-r0"}'::jsonb,
    body:='{"refreshType": "headlines"}'::jsonb
  ) as request_id;
  $$
);
