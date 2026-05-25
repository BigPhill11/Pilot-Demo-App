/**
 * Pilot metrics helpers for Phil's Friends (careers-in-finance first).
 * Query from admin dashboards or analytics pipelines.
 */

import { supabase } from '@/integrations/supabase/client';
import { PHILS_FRIENDS_REWARDS } from '@/config/philsFriendsRewards';

export interface PhilsFriendsPilotMetrics {
  publishedClips: number;
  quizAttempts: number;
  correctAttempts: number;
  avgWatchPercent: number;
  quizParticipationRate: number;
}

export async function fetchPilotMetrics(
  courseCategory = PHILS_FRIENDS_REWARDS.pilotCategory
): Promise<PhilsFriendsPilotMetrics> {
  const { data: clips } = await supabase
    .from('video_clips')
    .select('id, video_id, published, phils_friends_videos!inner(course_category)')
    .eq('published', true)
    .eq('phils_friends_videos.course_category', courseCategory);

  const clipIds = (clips ?? []).map((c) => c.id);
  const publishedClips = clipIds.length;

  if (publishedClips === 0) {
    return {
      publishedClips: 0,
      quizAttempts: 0,
      correctAttempts: 0,
      avgWatchPercent: 0,
      quizParticipationRate: 0,
    };
  }

  const { data: attempts } = await supabase
    .from('clip_quiz_attempts')
    .select('is_correct, watch_percent')
    .in('clip_id', clipIds);

  const quizAttempts = attempts?.length ?? 0;
  const correctAttempts = attempts?.filter((a) => a.is_correct).length ?? 0;
  const avgWatchPercent =
    quizAttempts > 0
      ? Math.round(
          (attempts!.reduce((s, a) => s + (a.watch_percent ?? 0), 0) / quizAttempts) * 10
        ) / 10
      : 0;

  const { count: analyticsCount } = await supabase
    .from('video_analytics')
    .select('id', { count: 'exact', head: true })
    .in(
      'video_id',
      (clips ?? []).map((c) => (c as { video_id: string }).video_id)
    );

  const completions = analyticsCount ?? 0;
  const quizParticipationRate =
    completions > 0 ? Math.round((quizAttempts / completions) * 100) : 0;

  return {
    publishedClips,
    quizAttempts,
    correctAttempts,
    avgWatchPercent,
    quizParticipationRate,
  };
}
