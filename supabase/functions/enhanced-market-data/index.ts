
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'GET' && req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Required environment variables not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching market data from Yahoo Finance...');

    // Define the symbols we want to fetch with their Yahoo Finance symbols
    const symbols = [
      { symbol: '^IXIC', name: 'NASDAQ', type: 'index' },
      { symbol: '^DJI', name: 'Dow Jones', type: 'index' },
      { symbol: '^GSPC', name: 'S&P 500', type: 'index' },
      { symbol: 'GLD', name: 'Gold', type: 'commodity' },
      { symbol: 'CL=F', name: 'Crude Oil', type: 'commodity' },
      { symbol: '^VIX', name: 'Volatility Index', type: 'index' }
    ];

    const marketData = [];

    for (const item of symbols) {
      try {
        console.log(`Fetching data for ${item.name} (${item.symbol})`);
        
        // Use Yahoo Finance API (free, no API key required)
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.symbol)}?interval=1d&range=1d`,
          {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`Response for ${item.name}:`, JSON.stringify(data).substring(0, 200));
          
          if (data?.chart?.result?.[0]?.meta) {
            const meta = data.chart.result[0].meta;
            const price = meta.regularMarketPrice || meta.previousClose || 0;
            const previousClose = meta.previousClose || price;
            const change = price - previousClose;
            const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
            
            const marketItem = {
              symbol: item.symbol,
              name: item.name,
              price: price,
              change_amount: change,
              change_percent: changePercent,
              asset_type: item.type
            };

            marketData.push(marketItem);
            console.log(`Added ${item.name} to market data:`, marketItem);

            // Update cache in database
            await supabase
              .from('market_data_cache')
              .upsert({
                symbol: item.symbol,
                name: item.name,
                price: marketItem.price,
                change_amount: marketItem.change_amount,
                change_percent: marketItem.change_percent,
                asset_type: item.type,
                last_updated: new Date().toISOString()
              });
          } else {
            console.log(`No data returned for ${item.name}:`, data);
          }
        } else {
          console.error(`Failed to fetch ${item.name}: ${response.status} ${response.statusText}`);
        }
        
        // Small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error fetching ${item.name}:`, error);
        // Continue with other symbols even if one fails
      }
    }

    console.log('Final market data array:', marketData);
    console.log('Market data fetched and cached successfully with Yahoo Finance');

    return new Response(
      JSON.stringify(marketData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhanced-market-data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
