
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { refreshType } = await req.json()

    // Validate refreshType parameter
    if (!refreshType || typeof refreshType !== 'string') {
      return new Response(
        JSON.stringify({ error: 'refreshType is required and must be a string' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (refreshType !== 'market-data' && refreshType !== 'headlines') {
      return new Response(
        JSON.stringify({ error: 'refreshType must be either "market-data" or "headlines"' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
    
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration not found')
    }

    const currentHour = new Date().getHours()
    let shouldRefresh = false

    // Determine if refresh should happen based on time and type
    if (refreshType === 'market-data') {
      // Market data refresh: 7 AM, 12 PM, 5 PM
      shouldRefresh = currentHour === 7 || currentHour === 12 || currentHour === 17
    } else if (refreshType === 'headlines') {
      // Headlines refresh: 7 AM only
      shouldRefresh = currentHour === 7
    }

    if (!shouldRefresh) {
      return new Response(
        JSON.stringify({ 
          message: 'Not time for refresh',
          currentHour,
          refreshType 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Call the appropriate function based on refresh type
    let functionUrl = ''
    if (refreshType === 'market-data') {
      functionUrl = `${SUPABASE_URL}/functions/v1/market-data`
    } else if (refreshType === 'headlines') {
      functionUrl = `${SUPABASE_URL}/functions/v1/market-headlines`
    }

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Function call failed: ${response.status}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true,
        refreshType,
        timestamp: new Date().toISOString(),
        result 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in scheduled refresh:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Scheduled refresh failed',
        details: errorMessage 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
