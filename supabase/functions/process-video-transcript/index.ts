import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import {
  suggestClipsFromTranscript,
  suggestQuizForClip,
} from '../_shared/phils-friends-ai.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { videoId, transcript, generateQuizzes = true } = await req.json();

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

    const { data: video, error: videoError } = await supabaseClient
      .from('phils_friends_videos')
      .select('created_by, duration_sec')
      .eq('id', videoId)
      .single();

    if (videoError || !video) {
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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Persist transcript
    await serviceClient.from('video_transcripts').upsert({
      video_id: videoId,
      raw_content: transcript,
      transcript_type: 'TXT',
      searchable_content: transcript.toLowerCase(),
      language_code: 'en',
      processing_status: 'completed',
    }, { onConflict: 'video_id' }).catch(() => {
      // video_transcripts may not have unique on video_id — insert instead
      return serviceClient.from('video_transcripts').insert({
        video_id: videoId,
        raw_content: transcript,
        transcript_type: 'TXT',
        searchable_content: transcript.toLowerCase(),
        language_code: 'en',
        processing_status: 'completed',
      });
    });

    const segments = await suggestClipsFromTranscript(
      openAIApiKey,
      transcript,
      video.duration_sec ?? undefined
    );

    const clipInserts = segments.map((segment, index) => ({
      video_id: videoId,
      title: segment.title || `Clip ${index + 1}`,
      excerpt: segment.description || '',
      start_sec: segment.start_time ?? index * 45,
      end_sec: segment.end_time ?? (index + 1) * 60,
      clip_order: index + 1,
      published: false,
      production_status: 'draft',
      thumbnail_url: '',
    }));

    const { data: insertedClips, error: insertError } = await supabaseClient
      .from('video_clips')
      .insert(clipInserts)
      .select('id, title, excerpt');

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw insertError;
    }

    let quizzesCreated = 0;
    if (generateQuizzes && insertedClips?.length) {
      for (const clip of insertedClips) {
        const quiz = await suggestQuizForClip(
          openAIApiKey,
          clip.title,
          clip.excerpt ?? '',
          transcript
        );
        if (quiz) {
          const { error: quizError } = await serviceClient.from('clip_quiz_questions').insert({
            clip_id: clip.id,
            question: quiz.question,
            options: quiz.options,
            correct_index: quiz.correct_index,
            explanation: quiz.explanation,
            difficulty: 'beginner',
            published: false,
          });
          if (!quizError) quizzesCreated++;
        }
      }
    }

    await supabaseClient
      .from('phils_friends_videos')
      .update({
        processing_status: 'completed',
        production_status: 'segmented',
        published: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', videoId);

    return new Response(
      JSON.stringify({
        success: true,
        clipsCreated: segments.length,
        quizzesCreated,
        clips: segments,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing transcript:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process transcript';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
