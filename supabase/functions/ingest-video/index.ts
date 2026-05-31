import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import {
  suggestClipsFromTranscript,
  suggestQuizForClip,
} from '../_shared/phils-friends-ai.ts';
import { fetchYoutubeTranscript } from '../_shared/youtube-transcript.ts';
import {
  submitTranscription,
  pollTranscription,
  assemblyWordsToTimestamps,
} from '../_shared/assembly-ai.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type FeedSection =
  | 'personal-finance'
  | 'market-intelligence'
  | 'careers-in-finance'
  | 'career-readiness';

function learnMorePath(section: FeedSection): string {
  switch (section) {
    case 'personal-finance':    return '/learn?tab=personal-finance';
    case 'market-intelligence': return '/learn?tab=companies';
    case 'careers-in-finance':  return '/learn?tab=careers';
    case 'career-readiness':    return '/career';
  }
}

async function generateClipsAndQuizzes(
  serviceClient: ReturnType<typeof createClient>,
  openAIApiKey: string,
  videoId: string,
  transcriptText: string,
  wordTimestamps: unknown[] | null,
  durationSec: number | null,
  feedSection: FeedSection,
  videoTitle: string | null,
  confidenceScore: number,
) {
  // Persist transcript
  await serviceClient.from('video_transcripts').delete().eq('video_id', videoId);
  await serviceClient.from('video_transcripts').insert({
    video_id: videoId,
    raw_content: transcriptText,
    transcript_type: 'TXT',
    word_timestamps: wordTimestamps,
    searchable_content: transcriptText.toLowerCase(),
    language_code: 'en',
    confidence_score: confidenceScore,
    processing_status: 'completed',
  });

  // Remove unpublished draft clips from a previous run
  await serviceClient.from('video_clips').delete().eq('video_id', videoId).eq('published', false);

  const suggestedClips = await suggestClipsFromTranscript(openAIApiKey, transcriptText, durationSec ?? undefined);

  const clipInserts = suggestedClips.map((segment, index) => ({
    video_id: videoId,
    title: segment.title || `${videoTitle ?? 'Video'} Clip ${index + 1}`,
    excerpt: segment.description || '',
    start_sec: segment.start_time ?? index * 60,
    end_sec: segment.end_time ?? index * 60 + 60,
    clip_order: index + 1,
    published: false,
    production_status: 'draft',
    feed_section: feedSection,
    feed_category: feedSection,
    speaker_display_name: videoTitle,
    learn_more_path: learnMorePath(feedSection),
    thumbnail_url: '',
  }));

  const { data: insertedClips, error: clipError } = await serviceClient
    .from('video_clips')
    .insert(clipInserts)
    .select('id, title, excerpt');

  if (clipError) throw clipError;

  let quizzesCreated = 0;
  for (const clip of (insertedClips ?? [])) {
    const quiz = await suggestQuizForClip(openAIApiKey, clip.title, clip.excerpt ?? '', transcriptText);
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

  await serviceClient.from('phils_friends_videos').update({
    processing_status: 'completed',
    production_status: 'segmented',
    published: false,
    updated_at: new Date().toISOString(),
  }).eq('id', videoId);

  return { clipsCreated: insertedClips?.length ?? 0, quizzesCreated };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl  = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey      = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceKey   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const assemblyKey  = Deno.env.get('ASSEMBLYAI_API_KEY');

    if (!openAIApiKey) throw new Error('OPENAI_API_KEY is not configured.');
    if (!assemblyKey)  throw new Error('ASSEMBLYAI_API_KEY is not configured.');

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const serviceClient = createClient(supabaseUrl, serviceKey);

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: isAdmin } = await serviceClient.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin',
    });
    if (!isAdmin && user.email?.toLowerCase() !== 'phillipghead@gmail.com') {
      return new Response(JSON.stringify({ error: 'Forbidden: admin access required' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { videoId } = await req.json();
    if (!videoId) {
      return new Response(JSON.stringify({ error: 'videoId is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: video, error: videoError } = await serviceClient
      .from('phils_friends_videos')
      .select('id, title, source_type, source_url, youtube_url, storage_path, duration_sec, feed_section, assembly_transcript_id')
      .eq('id', videoId)
      .single();

    if (videoError || !video) {
      return new Response(JSON.stringify({ error: 'Video not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const feedSection = (video.feed_section ?? 'careers-in-finance') as FeedSection;

    // ── YouTube path (no transcription API needed) ────────────────────────
    if (video.source_type === 'youtube') {
      const youtubeUrl = video.source_url || video.youtube_url;
      if (!youtubeUrl) throw new Error('YouTube video is missing source_url.');

      await serviceClient.from('phils_friends_videos').update({
        processing_status: 'processing',
        production_status: 'ingested',
        updated_at: new Date().toISOString(),
      }).eq('id', videoId);

      const yt = await fetchYoutubeTranscript(youtubeUrl);
      if (!yt.text.trim()) throw new Error('No transcript text returned from YouTube.');

      const wordTimestamps = yt.segments.flatMap((seg) => {
        const words = seg.text.split(/\s+/).filter(Boolean);
        const span = (seg.end - seg.start) / Math.max(words.length, 1);
        return words.map((word, i) => ({
          word: word.replace(/[.,!?]/g, ''),
          start: seg.start + i * span,
          end: seg.start + (i + 1) * span,
          confidence: 0.88,
        }));
      });

      const { clipsCreated, quizzesCreated } = await generateClipsAndQuizzes(
        serviceClient, openAIApiKey, videoId,
        yt.text, wordTimestamps, video.duration_sec, feedSection, video.title, 0.88,
      );

      return new Response(JSON.stringify({ success: true, source: 'youtube', clipsCreated, quizzesCreated }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Uploaded file path — AssemblyAI ───────────────────────────────────
    if (video.source_type !== 'upload') {
      throw new Error(`Unsupported source_type: ${video.source_type ?? 'unknown'}`);
    }

    if (!video.storage_path) throw new Error('Uploaded video is missing storage_path.');

    // Generate a time-limited signed URL so AssemblyAI can download the file
    // regardless of whether the bucket is configured as public.
    const { data: signedData, error: signedError } = await serviceClient.storage
      .from('phil-videos')
      .createSignedUrl(video.storage_path, 7200); // 2-hour window
    if (signedError || !signedData?.signedUrl) {
      throw new Error(`Could not generate signed URL for stored video: ${signedError?.message ?? 'unknown'}`);
    }
    const publicUrl = signedData.signedUrl;

    let transcriptId: string = video.assembly_transcript_id ?? '';

    // If no transcript submitted yet, submit now
    if (!transcriptId) {
      await serviceClient.from('phils_friends_videos').update({
        processing_status: 'processing',
        production_status: 'ingested',
        updated_at: new Date().toISOString(),
      }).eq('id', videoId);

      transcriptId = await submitTranscription(assemblyKey, publicUrl);

      // Save immediately so a retry can pick up where we left off
      await serviceClient.from('phils_friends_videos').update({
        assembly_transcript_id: transcriptId,
        processing_status: 'pending_transcript',
        updated_at: new Date().toISOString(),
      }).eq('id', videoId);
    }

    // Poll for up to ~110 s (leaves headroom for clip/quiz generation)
    const result = await pollTranscription(assemblyKey, transcriptId);

    if (!result) {
      // Still transcribing — tell the admin to retry in a few minutes
      return new Response(JSON.stringify({
        success: false,
        status: 'pending_transcript',
        transcriptId,
        message: 'AssemblyAI is still transcribing. Open the production board and click Segment again in 2–3 minutes.',
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const transcriptText = result.text ?? '';
    if (!transcriptText.trim()) throw new Error('AssemblyAI returned an empty transcript.');

    const wordTimestamps = result.words ? assemblyWordsToTimestamps(result.words) : null;
    const durationSec = result.audio_duration ?? video.duration_sec;

    const { clipsCreated, quizzesCreated } = await generateClipsAndQuizzes(
      serviceClient, openAIApiKey, videoId,
      transcriptText, wordTimestamps, durationSec, feedSection, video.title, 0.95,
    );

    // Clear the transcript ID now that clips are generated
    await serviceClient.from('phils_friends_videos').update({
      assembly_transcript_id: null,
      updated_at: new Date().toISOString(),
    }).eq('id', videoId);

    return new Response(JSON.stringify({
      success: true,
      source: 'assemblyai',
      transcriptLength: transcriptText.length,
      clipsCreated,
      quizzesCreated,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error in ingest-video:', error);
    const message = error instanceof Error ? error.message : 'Failed to ingest video';
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
