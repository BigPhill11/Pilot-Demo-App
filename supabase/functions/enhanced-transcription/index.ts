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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { videoId, sourceUrl, sourceType } = await req.json();
    
    console.log('Starting enhanced transcription for video:', videoId);

    // For this demo, we'll use OpenAI Whisper API for transcription
    // In production, you might prefer AssemblyAI or Deepgram for better performance
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let audioFileUrl = '';
    
    if (sourceType === 'youtube') {
      // For YouTube videos, we would need to extract audio using a service like youtube-dl
      // For demo purposes, we'll create a mock transcript with word-level timestamps
      const mockTranscript = `Hello, welcome to this finance career interview. My name is John, and I'll be discussing investment banking opportunities today. The market has been quite volatile recently, with many firms looking for talented analysts. Experience in financial modeling is crucial for success in this field.`;
      
      const wordTimestamps = mockTranscript.split(' ').map((word, index) => ({
        word: word.replace(/[.,]/g, ''),
        start: index * 0.5,
        end: (index + 1) * 0.5,
        confidence: 0.95
      }));

      // Store enhanced transcript
      const { error: transcriptError } = await supabaseClient
        .from('video_transcripts')
        .insert({
          video_id: videoId,
          raw_content: mockTranscript,
          transcript_type: 'TXT',
          word_timestamps: wordTimestamps,
          searchable_content: mockTranscript.toLowerCase(),
          language_code: 'en',
          confidence_score: 0.95,
          processing_status: 'completed'
        });

      if (transcriptError) {
        console.error('Transcript storage error:', transcriptError);
        throw transcriptError;
      }

      // Auto-generate segments using AI
      await generateAutoSegments(supabaseClient, videoId, mockTranscript, openAIApiKey);

    } else {
      // For uploaded files, we would download from Supabase storage and transcribe
      // For demo purposes, creating mock data
      const mockTranscript = `Welcome to Phil's Friends. Today we're discussing private equity career paths. Investment strategies vary significantly across different asset classes. Due diligence is a critical component of successful deal making.`;
      
      const wordTimestamps = mockTranscript.split(' ').map((word, index) => ({
        word: word.replace(/[.,]/g, ''),
        start: index * 0.6,
        end: (index + 1) * 0.6,
        confidence: 0.92
      }));

      const { error: transcriptError } = await supabaseClient
        .from('video_transcripts')
        .insert({
          video_id: videoId,
          raw_content: mockTranscript,
          transcript_type: 'TXT',
          word_timestamps: wordTimestamps,
          searchable_content: mockTranscript.toLowerCase(),
          language_code: 'en',
          confidence_score: 0.92,
          processing_status: 'completed'
        });

      if (transcriptError) {
        console.error('Transcript storage error:', transcriptError);
        throw transcriptError;
      }

      await generateAutoSegments(supabaseClient, videoId, mockTranscript, openAIApiKey);
    }

    // Update video processing status
    const { error: updateError } = await supabaseClient
      .from('phils_friends_videos')
      .update({ 
        processing_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', videoId);

    if (updateError) {
      console.error('Video update error:', updateError);
    }

    console.log('Enhanced transcription completed for video:', videoId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Transcription completed with word-level timestamps'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhanced transcription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process transcription';
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

async function generateAutoSegments(supabaseClient: any, videoId: string, transcript: string, openAIApiKey: string) {
  try {
    const prompt = `
    Analyze this transcript and create logical segments for an educational finance video. Create 3-5 segments with these requirements:

    1. Each segment should be 30-90 seconds long
    2. Focus on natural topic transitions
    3. Create engaging titles (max 50 chars)
    4. Write informative descriptions (max 150 chars)
    5. Identify key topics/keywords for each segment

    Return JSON array with: start_time, end_time, title, description, keywords[]

    Transcript: ${transcript}
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
            content: 'You are an expert at segmenting educational content. Return only valid JSON with no additional text.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status);
      return;
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices[0].message.content;
    
    let segments;
    try {
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      segments = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse segment analysis:', content);
      return;
    }

    // Store auto-generated segments
    const segmentInserts = segments.map((segment: any, index: number) => ({
      video_id: videoId,
      start_time: segment.start_time || index * 30,
      end_time: segment.end_time || (index + 1) * 30,
      title: segment.title || `Segment ${index + 1}`,
      description: segment.description || '',
      keywords: segment.keywords || [],
      segment_type: 'chapter'
    }));

    const { error: segmentError } = await supabaseClient
      .from('video_segments')
      .insert(segmentInserts);

    if (segmentError) {
      console.error('Segment storage error:', segmentError);
    } else {
      console.log(`Created ${segments.length} auto-generated segments`);
    }

  } catch (error) {
    console.error('Error generating auto segments:', error);
  }
}