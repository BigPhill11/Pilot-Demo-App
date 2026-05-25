import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { awardPlatformResources } from '@/hooks/usePlatformIntegration';
import { createGamificationService, GamificationSource } from '@/services/gamificationService';
import { PHILS_FRIENDS_REWARDS } from '@/config/philsFriendsRewards';
import type { ReelFeedItem } from '@/types/phils-friends';
import { getReelItemId } from '@/types/phils-friends';

const LIKES_KEY = 'phils_friends_reel_likes';
const BOOKMARKS_KEY = 'phils_friends_reel_bookmarks';
const COMPLETED_KEY = 'phils_friends_reel_completed';
const WATCH_REWARDED_KEY = 'phils_friends_watch_rewarded';
const QUIZ_REWARDED_KEY = 'phils_friends_quiz_rewarded';

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

function readRewardTimestamps(key: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

function writeRewardTimestamp(key: string, itemId: string) {
  const map = readRewardTimestamps(key);
  map[itemId] = Date.now();
  localStorage.setItem(key, JSON.stringify(map));
}

function isWithinCooldown(key: string, itemId: string): boolean {
  const map = readRewardTimestamps(key);
  const ts = map[itemId];
  if (!ts) return false;
  const hours = (Date.now() - ts) / (1000 * 60 * 60);
  return hours < PHILS_FRIENDS_REWARDS.rewardCooldownHours;
}

export function useReelEngagement() {
  const { user } = useAuth();
  const { updateActivityComplete, awardPoints } = useProgressTracking();
  const [likes, setLikes] = useState<Set<string>>(() => readSet(LIKES_KEY));
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => readSet(BOOKMARKS_KEY));
  const [completed, setCompleted] = useState<Set<string>>(() => readSet(COMPLETED_KEY));

  useEffect(() => {
    setLikes(readSet(LIKES_KEY));
    setBookmarks(readSet(BOOKMARKS_KEY));
    setCompleted(readSet(COMPLETED_KEY));
  }, []);

  const toggleLike = useCallback((itemId: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      writeSet(LIKES_KEY, next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((itemId: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      writeSet(BOOKMARKS_KEY, next);
      return next;
    });
  }, []);

  const markItemCompleted = useCallback((item: ReelFeedItem) => {
    const itemId = getReelItemId(item);
    setCompleted((prev) => {
      if (prev.has(itemId)) return prev;
      const next = new Set(prev);
      next.add(itemId);
      writeSet(COMPLETED_KEY, next);
      return next;
    });
  }, []);

  const logVideoAnalytics = useCallback(
    async (item: ReelFeedItem, watchPercent: number) => {
      if (!user) return;
      const videoId = item.video.id;
      try {
        await supabase.from('video_analytics').insert({
          user_id: user.id,
          video_id: videoId,
          watch_duration_seconds:
            item.type === 'clip'
              ? Math.round(
                  ((item.clip.end_sec - item.clip.start_sec) * watchPercent) / 100
                )
              : Math.round(((item.video.duration_sec ?? 60) * watchPercent) / 100),
          completion_percentage: watchPercent,
          last_watched_position: 0,
        });
      } catch (e) {
        console.warn('video_analytics insert:', e);
      }
    },
    [user]
  );

  /** Small reward when clip watch threshold met (before quiz) */
  const awardWatchComplete = useCallback(
    async (item: ReelFeedItem, watchPercent: number) => {
      const itemId = getReelItemId(item);
      if (watchPercent < PHILS_FRIENDS_REWARDS.minWatchPercentForQuiz) return;
      if (isWithinCooldown(WATCH_REWARDED_KEY, itemId)) return;

      writeRewardTimestamp(WATCH_REWARDED_KEY, itemId);
      await logVideoAnalytics(item, watchPercent);

      awardPlatformResources('lesson_completion', {
        bamboo: PHILS_FRIENDS_REWARDS.watchCompleteBamboo,
        xp: PHILS_FRIENDS_REWARDS.watchCompleteXp,
      });

      if (user) {
        const service = await createGamificationService(user.id);
        await service.awardXp(
          PHILS_FRIENDS_REWARDS.watchCompleteXp,
          GamificationSource.ACTIVITY,
          `reel-watch-${itemId}`
        );
        await awardPoints(
          PHILS_FRIENDS_REWARDS.watchCompleteXp,
          "Phil's Friends clip"
        );
      }
    },
    [user, logVideoAnalytics, awardPoints]
  );

  /** Primary reward after correct quiz answer */
  const awardQuizResult = useCallback(
    async (
      item: ReelFeedItem,
      isCorrect: boolean,
      watchPercent: number
    ): Promise<boolean> => {
      const itemId = getReelItemId(item);
      const clipId = item.type === 'clip' ? item.clip.id : null;

      if (isCorrect && clipId && user) {
        const since = new Date();
        since.setHours(since.getHours() - PHILS_FRIENDS_REWARDS.rewardCooldownHours);
        const { data: recent } = await supabase
          .from('clip_quiz_attempts')
          .select('id')
          .eq('user_id', user.id)
          .eq('clip_id', clipId)
          .eq('is_correct', true)
          .gte('answered_at', since.toISOString())
          .limit(2);

        if ((recent?.length ?? 0) > 1) {
          markItemCompleted(item);
          return false;
        }
      }

      if (isCorrect) {
        if (isWithinCooldown(QUIZ_REWARDED_KEY, itemId)) {
          markItemCompleted(item);
          return false;
        }
        writeRewardTimestamp(QUIZ_REWARDED_KEY, itemId);

        awardPlatformResources('quiz_correct', {
          bamboo: PHILS_FRIENDS_REWARDS.quizCorrectBamboo,
          xp: PHILS_FRIENDS_REWARDS.quizCorrectXp,
        });

        if (user) {
          const service = await createGamificationService(user.id);
          await service.awardXp(
            PHILS_FRIENDS_REWARDS.quizCorrectXp,
            GamificationSource.QUIZ,
            `reel-quiz-${itemId}`
          );
          await updateActivityComplete(`reel-quiz-${itemId}`, PHILS_FRIENDS_REWARDS.quizCorrectXp);
        }
      } else {
        awardPlatformResources('quiz_incorrect', {
          bamboo: PHILS_FRIENDS_REWARDS.quizIncorrectBamboo,
          xp: 0,
        });
      }

      await logVideoAnalytics(item, watchPercent);
      markItemCompleted(item);
      return isCorrect;
    },
    [user, logVideoAnalytics, updateActivityComplete]
  );

  /** Legacy: full completion without quiz path (mock feed / no question) */
  const trackClipComplete = useCallback(
    async (item: ReelFeedItem) => {
      const itemId = getReelItemId(item);
      if (completed.has(itemId)) return;

      markItemCompleted(item);
      if (!user) return;

      await logVideoAnalytics(item, 100);

      if (!isWithinCooldown(WATCH_REWARDED_KEY, itemId)) {
        writeRewardTimestamp(WATCH_REWARDED_KEY, itemId);
        await updateActivityComplete(`reel-${itemId}`, PHILS_FRIENDS_REWARDS.watchCompleteXp);
        awardPlatformResources('lesson_completion', {
          bamboo: PHILS_FRIENDS_REWARDS.watchCompleteBamboo,
          xp: PHILS_FRIENDS_REWARDS.watchCompleteXp,
        });
      }
    },
    [user, completed, updateActivityComplete, logVideoAnalytics, markItemCompleted]
  );

  const isLiked = useCallback((itemId: string) => likes.has(itemId), [likes]);
  const isBookmarked = useCallback((itemId: string) => bookmarks.has(itemId), [bookmarks]);

  return {
    toggleLike,
    toggleBookmark,
    trackClipComplete,
    awardWatchComplete,
    awardQuizResult,
    markItemCompleted,
    isLiked,
    isBookmarked,
  };
}
