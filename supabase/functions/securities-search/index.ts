
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
    if (req.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    
    // Validate query parameter
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (query.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Query must be at least 2 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (query.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Query too long (max 100 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sanitizedQuery = query.trim();

    console.log(`Searching for securities: ${sanitizedQuery}`);

    // Use Yahoo Finance search API (free, no API key required)
    const response = await fetch(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(sanitizedQuery)}&quotesCount=20&newsCount=0`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Yahoo Finance API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to search securities' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Yahoo Finance search response received');

    // Transform the data to match our expected format
    const quotes = data.quotes || [];
    const transformedData = quotes.slice(0, 20).map((item: any) => {
      // Determine asset type based on quote type
      let assetType = 'stock';
      const quoteType = item.quoteType?.toLowerCase() || '';
      
      if (quoteType.includes('etf')) {
        assetType = 'etf';
      } else if (quoteType.includes('index')) {
        assetType = 'index';
      } else if (quoteType.includes('future') || quoteType.includes('commodity')) {
        assetType = 'commodity';
      } else if (quoteType.includes('bond')) {
        assetType = 'bond';
      }

      return {
        symbol: item.symbol || '',
        name: item.longname || item.shortname || item.symbol || '',
        exchange: item.exchange || item.exchDisp || 'US',
        assetType,
        currency: item.currency || 'USD'
      };
    }).filter((item: { symbol: string; name: string }) => item.symbol && item.name); // Filter out items without symbol or name

    return new Response(
      JSON.stringify(transformedData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in securities-search function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
