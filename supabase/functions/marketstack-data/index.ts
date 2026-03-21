
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
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
    const marketstackApiKey = Deno.env.get('MARKETSTACK_API_KEY');
    
    if (!marketstackApiKey) {
      return new Response(
        JSON.stringify({ error: 'MarketStack API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching market data from MarketStack...');

    // Define the symbols we want to fetch
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'SPY', 'QQQ'];
    const symbolsParam = symbols.join(',');

    const response = await fetch(
      `http://api.marketstack.com/v1/eod/latest?access_key=${marketstackApiKey}&symbols=${symbolsParam}&limit=6`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MarketStack API error:', errorData);
      return new Response(
        JSON.stringify({ error: errorData.error?.message || 'Failed to fetch from MarketStack' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('MarketStack response received');

    // Transform the data to match our expected format
    const transformedData = data.data.map((item: any) => {
      const changePercent = ((item.close - item.open) / item.open) * 100;
      
      // Map symbols to display names
      const displayNames: { [key: string]: string } = {
        'AAPL': 'Apple',
        'MSFT': 'Microsoft',
        'GOOGL': 'Alphabet',
        'AMZN': 'Amazon',
        'SPY': 'S&P 500 ETF',
        'QQQ': 'Nasdaq 100 ETF'
      };

      return {
        title: displayNames[item.symbol] || item.symbol,
        value: `$${item.close.toFixed(2)}`,
        change: changePercent,
        changeSuffix: '%'
      };
    });

    return new Response(
      JSON.stringify(transformedData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in marketstack-data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
