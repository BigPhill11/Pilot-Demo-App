import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create client with user's JWT
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { videoId, transcript } = await req.json();
    
    // Validate inputs
    if (!videoId || !transcript) {
      return new Response(
        JSON.stringify({ error: 'videoId and transcript are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof transcript !== 'string' || transcript.length > 50000) {
      return new Response(
        JSON.stringify({ error: 'Invalid transcript (max 50000 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user owns the video
    const { data: video, error: videoError } = await supabaseClient
      .from('phils_friends_videos')
      .select('created_by')
      .eq('id', videoId)
      .single();

    if (videoError || !video) {
      console.error('Video fetch error:', videoError);
      return new Response(
        JSON.stringify({ error: 'Video not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (video.created_by !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: You do not own this video' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Processing transcript for video:', videoId);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // AI analysis prompt for video segmentation
    const prompt = `
    Analyze this interview transcript and segment it into meaningful clips. Focus on:
    1. Identifying natural conversation breaks
    2. Distinguishing between interviewer questions and interviewee responses
    3. Creating engaging clip titles
    4. Extracting key quotes and topics

    For each segment, provide:
    - start_time: estimated start time in seconds (if no timestamps, estimate based on speech patterns)
    - end_time: estimated end time in seconds
    - title: engaging title for the clip (max 60 chars)
    - description: brief description (max 200 chars)
    - clip_type: "question", "response", "insight", or "general"
    - key_quotes: array of notable quotes from this segment
    - topics: array of key topics discussed

    Return a JSON array of segments. Here's the transcript:

    ${transcript}
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert video editor specializing in interview content. Return only valid JSON with no additional text or formatting.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, response.statusText, errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices[0].message.content;
    
    console.log('AI analysis complete, parsing segments...');

    let segments;
    try {
      // Clean the response and parse JSON
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      segments = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI analysis results');
    }

    // Store segments in database
    const clipInserts = segments.map((segment: any, index: number) => ({
      video_id: videoId,
      title: segment.title || `Clip ${index + 1}`,
      excerpt: segment.description || '',
      start_sec: segment.start_time || 0,
      end_sec: segment.end_time || 60,
      clip_order: index + 1,
      published: false,
      thumbnail_url: ''
    }));

    const { error: insertError } = await supabaseClient
      .from('video_clips')
      .insert(clipInserts);

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw insertError;
    }

    // Update video processing status and auto-publish
    const { error: updateError } = await supabaseClient
      .from('phils_friends_videos')
      .update({ 
        processing_status: 'completed',
        published: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', videoId);

    if (updateError) {
      console.error('Video update error:', updateError);
    }

    console.log(`Successfully created ${segments.length} clips for video ${videoId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        clipsCreated: segments.length,
        clips: segments
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing transcript:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process transcript';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});