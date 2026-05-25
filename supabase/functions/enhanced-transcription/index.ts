import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import {
  transcribeWithWhisper,
  suggestClipsFromTranscript,
  suggestQuizForClip,
} from '../_shared/phils-friends-ai.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_WHISPER_BYTES = 24 * 1024 * 1024;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { videoId, sourceUrl, sourceType, storagePath } = await req.json();

    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'videoId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    await supabaseClient
      .from('phils_friends_videos')
      .update({ processing_status: 'processing', production_status: 'ingested' })
      .eq('id', videoId);

    let transcriptText = '';
    let wordTimestamps: { word: string; start: number; end: number; confidence: number }[] = [];

    const { data: videoRow } = await supabaseClient
      .from('phils_friends_videos')
      .select('storage_path, duration_sec')
      .eq('id', videoId)
      .single();

    const path = storagePath || videoRow?.storage_path;

    if (sourceType === 'upload' && path) {
      const { data: fileData, error: downloadError } = await supabaseClient.storage
        .from('phil-videos')
        .download(path);

      if (downloadError) {
        console.error('Storage download error:', downloadError);
      } else if (fileData && fileData.size <= MAX_WHISPER_BYTES) {
        try {
          const whisper = await transcribeWithWhisper(
            openAIApiKey,
            fileData,
            path.split('/').pop() ?? 'video.mp4'
          );
          transcriptText = whisper.text;
          if (whisper.segments?.length) {
            wordTimestamps = whisper.segments.flatMap((seg) =>
              seg.text.split(/\s+/).filter(Boolean).map((word, i, arr) => {
                const span = (seg.end - seg.start) / Math.max(arr.length, 1);
                return {
                  word: word.replace(/[.,!?]/g, ''),
                  start: seg.start + i * span,
                  end: seg.start + (i + 1) * span,
                  confidence: 0.9,
                };
              })
            );
          }
        } catch (whisperErr) {
          console.error('Whisper failed, will use fallback:', whisperErr);
        }
      } else if (fileData) {
        console.warn('File too large for Whisper inline; upload a transcript file instead.');
      }
    }

    // YouTube: no server-side audio extraction in this deployment — require manual transcript
    if (!transcriptText && sourceType === 'youtube') {
      const { data: existing } = await supabaseClient
        .from('video_transcripts')
        .select('raw_content')
        .eq('video_id', videoId)
        .maybeSingle();

      if (existing?.raw_content) {
        transcriptText = existing.raw_content;
      } else {
        await supabaseClient
          .from('phils_friends_videos')
          .update({
            processing_status: 'pending_transcript',
            production_status: 'ingested',
            updated_at: new Date().toISOString(),
          })
          .eq('id', videoId);

        return new Response(
          JSON.stringify({
            success: false,
            needsTranscript: true,
            message: 'Upload a transcript file for YouTube videos, or paste transcript in admin editor.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!transcriptText) {
      throw new Error('No transcript produced. Upload a transcript or use a smaller video file.');
    }

    await supabaseClient.from('video_transcripts').insert({
      video_id: videoId,
      raw_content: transcriptText,
      transcript_type: 'TXT',
      word_timestamps: wordTimestamps.length ? wordTimestamps : null,
      searchable_content: transcriptText.toLowerCase(),
      language_code: 'en',
      confidence_score: wordTimestamps.length ? 0.92 : 0.85,
      processing_status: 'completed',
    });

    const segments = await suggestClipsFromTranscript(
      openAIApiKey,
      transcriptText,
      videoRow?.duration_sec ?? undefined
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

    const { data: insertedClips, error: clipError } = await supabaseClient
      .from('video_clips')
      .insert(clipInserts)
      .select('id, title, excerpt');

    if (clipError) {
      console.error('Clip insert error:', clipError);
    }

    let quizzesCreated = 0;
    if (insertedClips?.length) {
      for (const clip of insertedClips) {
        const quiz = await suggestQuizForClip(
          openAIApiKey,
          clip.title,
          clip.excerpt ?? '',
          transcriptText
        );
        if (quiz) {
          const { error: quizErr } = await supabaseClient.from('clip_quiz_questions').insert({
            clip_id: clip.id,
            question: quiz.question,
            options: quiz.options,
            correct_index: quiz.correct_index,
            explanation: quiz.explanation,
            published: false,
          });
          if (!quizErr) quizzesCreated++;
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
        transcriptLength: transcriptText.length,
        clipsCreated: segments.length,
        quizzesCreated,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in enhanced transcription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process transcription';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
