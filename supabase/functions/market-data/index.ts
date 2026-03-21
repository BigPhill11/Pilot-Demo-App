
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

console.log("market-data function started");

// This key is securely fetched from your Supabase project's secrets
const FMP_API_KEY = Deno.env.get("FMP_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define the indicators we want to fetch - switched to US stocks/ETFs for free plan compatibility
const indicators = [
  { symbol: "AAPL", title: "Apple", type: "stock" },
  { symbol: "MSFT", title: "Microsoft", type: "stock" },
  { symbol: "GOOGL", title: "Alphabet", type: "stock" },
  { symbol: "AMZN", title: "Amazon", type: "stock" },
  { symbol: "SPY", title: "S&P 500 ETF", type: "etf" },
  { symbol: "QQQ", title: "Nasdaq 100 ETF", type: "etf" },
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'GET' && req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!FMP_API_KEY) {
      throw new Error("FMP_API_KEY is not set in environment variables.");
    }

    // Fetch all indicators in a single API call
    const symbols = indicators.map(i => i.symbol).join(',');
    const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${FMP_API_KEY}`;
    
    console.log(`Fetching data from FMP API`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("FMP API error response:", errorText);
      throw new Error(`Failed to fetch data from FMP API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Received data from FMP API");

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from FMP API");
    }

    // Transform the data into the format expected by the frontend
    const marketData = indicators.map(indicatorInfo => {
      const apiData = data.find(d => d.symbol === indicatorInfo.symbol);
      if (!apiData) {
        console.warn(`Data for symbol ${indicatorInfo.symbol} not found in FMP response.`);
        return null;
      }
      return {
        title: indicatorInfo.title,
        value: '$' + (apiData.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'),
        change: apiData.change || 0,
        changeSuffix: "", // Not needed for stocks
      };
    }).filter(Boolean); // remove nulls for symbols not found

    return new Response(JSON.stringify(marketData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
