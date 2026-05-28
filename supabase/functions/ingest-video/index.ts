import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import {
  transcribeWithWhisper,
  suggestClipsFromTranscript,
  suggestQuizForClip,
} from '../_shared/phils-friends-ai.ts';
import { fetchYoutubeTranscript } from '../_shared/youtube-transcript.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_WHISPER_BYTES = 24 * 1024 * 1024;

type FeedSection =
  | 'personal-finance'
  | 'market-intelligence'
  | 'careers-in-finance'
  | 'career-readiness';

interface Segment {
  start: number;
  end: number;
  text: string;
}

function learnMorePath(section: FeedSection): string {
  switch (section) {
    case 'personal-finance':
      return '/learn?tab=personal-finance';
    case 'market-intelligence':
      return '/learn?tab=companies';
    case 'careers-in-finance':
      return '/learn?tab=careers';
    case 'career-readiness':
      return '/career';
  }
}

function segmentsToWordTimestamps(segments: Segment[]) {
  return segments.flatMap((segment) => {
    const words = segment.text.split(/\s+/).filter(Boolean);
    const span = (segment.end - segment.start) / Math.max(words.length, 1);
    return words.map((word, index) => ({
      word: word.replace(/[.,!?]/g, ''),
      start: segment.start + index * span,
      end: segment.start + (index + 1) * span,
      confidence: 0.9,
    }));
  });
}

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

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured.');
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const serviceClient = createClient(supabaseUrl, serviceKey);

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: isAdmin } = await serviceClient.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin',
    });

    if (!isAdmin && user.email?.toLowerCase() !== 'phillipghead@gmail.com') {
      return new Response(
        JSON.stringify({ error: 'Forbidden: admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { videoId } = await req.json();
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'videoId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: video, error: videoError } = await serviceClient
      .from('phils_friends_videos')
      .select('id, title, source_type, source_url, youtube_url, storage_path, duration_sec, feed_section')
      .eq('id', videoId)
      .single();

    if (videoError || !video) {
      return new Response(
        JSON.stringify({ error: 'Video not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await serviceClient
      .from('phils_friends_videos')
      .update({
        processing_status: 'processing',
        production_status: 'ingested',
        updated_at: new Date().toISOString(),
      })
      .eq('id', videoId);

    const feedSection = (video.feed_section ?? 'careers-in-finance') as FeedSection;
    let transcriptText = '';
    let transcriptSegments: Segment[] = [];
    let confidenceScore = 0.85;

    if (video.source_type === 'upload') {
      if (!video.storage_path) {
        throw new Error('Uploaded video row is missing storage_path.');
      }

      const { data: fileData, error: downloadError } = await serviceClient.storage
        .from('phil-videos')
        .download(video.storage_path);

      if (downloadError || !fileData) {
        throw new Error(downloadError?.message ?? 'Could not download uploaded video.');
      }

      if (fileData.size > MAX_WHISPER_BYTES) {
        await serviceClient
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
            message: 'Video stored successfully, but it is too large for automatic Whisper transcription. Upload a shorter MP4 or transcript to segment it.',
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const whisper = await transcribeWithWhisper(
        openAIApiKey,
        fileData,
        video.storage_path.split('/').pop() ?? 'video.mp4'
      );
      transcriptText = whisper.text;
      transcriptSegments = (whisper.segments ?? []).map((segment) => ({
        start: segment.start,
        end: segment.end,
        text: segment.text,
      }));
      confidenceScore = 0.92;
    } else if (video.source_type === 'youtube') {
      const youtubeUrl = video.source_url || video.youtube_url;
      if (!youtubeUrl) {
        throw new Error('YouTube video row is missing source_url.');
      }

      const youtubeTranscript = await fetchYoutubeTranscript(youtubeUrl);
      transcriptText = youtubeTranscript.text;
      transcriptSegments = youtubeTranscript.segments;
      confidenceScore = 0.88;
    } else {
      throw new Error(`Unsupported source_type: ${video.source_type ?? 'unknown'}`);
    }

    if (!transcriptText.trim()) {
      throw new Error('No transcript was produced for this video.');
    }

    await serviceClient
      .from('video_transcripts')
      .delete()
      .eq('video_id', videoId);

    await serviceClient.from('video_transcripts').insert({
      video_id: videoId,
      raw_content: transcriptText,
      transcript_type: 'TXT',
      word_timestamps: transcriptSegments.length ? segmentsToWordTimestamps(transcriptSegments) : null,
      searchable_content: transcriptText.toLowerCase(),
      language_code: 'en',
      confidence_score: confidenceScore,
      processing_status: 'completed',
    });

    await serviceClient
      .from('video_clips')
      .delete()
      .eq('video_id', videoId)
      .eq('published', false);

    const suggestedClips = await suggestClipsFromTranscript(
      openAIApiKey,
      transcriptText,
      video.duration_sec ?? undefined
    );

    const clipInserts = suggestedClips.map((segment, index) => ({
      video_id: videoId,
      title: segment.title || `${video.title ?? 'Video'} Clip ${index + 1}`,
      excerpt: segment.description || '',
      start_sec: segment.start_time ?? index * 60,
      end_sec: segment.end_time ?? index * 60 + 60,
      clip_order: index + 1,
      published: false,
      production_status: 'draft',
      feed_section: feedSection,
      feed_category: feedSection,
      speaker_display_name: video.title,
      learn_more_path: learnMorePath(feedSection),
      thumbnail_url: '',
    }));

    const { data: insertedClips, error: clipError } = await serviceClient
      .from('video_clips')
      .insert(clipInserts)
      .select('id, title, excerpt');

    if (clipError) throw clipError;

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

    await serviceClient
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
        clipsCreated: insertedClips?.length ?? 0,
        quizzesCreated,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ingest-video:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to ingest video';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
