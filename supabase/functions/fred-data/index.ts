
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
    const fredApiKey = Deno.env.get('FRED_API_KEY');
    
    if (!fredApiKey) {
      return new Response(
        JSON.stringify({ error: 'FRED API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching economic data from FRED...');

    // Define the series we want to fetch with their display names
    const series = [
      { id: 'UNRATE', name: 'Unemployment Rate' },
      { id: 'CPIAUCSL', name: 'Inflation Rate (CPI)' },
      { id: 'FEDFUNDS', name: 'Federal Funds Rate' },
      { id: 'GDP', name: 'GDP Growth' },
      { id: 'PAYEMS', name: 'Employment Change' },
      { id: 'HOUST', name: 'Housing Starts' }
    ];

    const economicData = [];

    for (const seriesItem of series) {
      try {
        const response = await fetch(
          `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesItem.id}&api_key=${fredApiKey}&file_type=json&limit=1&sort_order=desc`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.observations && data.observations.length > 0) {
            const latestValue = parseFloat(data.observations[0].value);
            
            if (!isNaN(latestValue)) {
              // Format the value based on the series type
              let formattedValue: string;
              let suffix = '';
              
              if (seriesItem.id === 'UNRATE' || seriesItem.id === 'FEDFUNDS') {
                formattedValue = `${latestValue.toFixed(1)}%`;
              } else if (seriesItem.id === 'CPIAUCSL') {
                // Calculate year-over-year inflation rate (simplified)
                formattedValue = `${latestValue.toFixed(1)}`;
                suffix = ' (Index)';
              } else if (seriesItem.id === 'GDP') {
                formattedValue = `$${(latestValue / 1000).toFixed(1)}T`;
              } else if (seriesItem.id === 'PAYEMS') {
                formattedValue = `${(latestValue / 1000).toFixed(1)}M`;
              } else if (seriesItem.id === 'HOUST') {
                formattedValue = `${(latestValue / 1000).toFixed(0)}K`;
              } else {
                formattedValue = latestValue.toFixed(2);
              }

              economicData.push({
                title: seriesItem.name,
                value: formattedValue + suffix,
                change: 0, // FRED doesn't provide change data easily, setting to 0
                changeSuffix: ''
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching ${seriesItem.name}:`, error);
        // Continue with other series even if one fails
      }
    }

    console.log('FRED economic data fetched successfully');

    return new Response(
      JSON.stringify(economicData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fred-data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
