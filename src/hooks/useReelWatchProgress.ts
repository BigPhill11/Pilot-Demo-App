import { useCallback, useRef, useState } from 'react';
import { PHILS_FRIENDS_REWARDS } from '@/config/philsFriendsRewards';
import type { ReelFeedItem } from '@/types/phils-friends';

/**
 * Tracks watch progress for a reel item to gate quiz unlock.
 */
export function useReelWatchProgress(item: ReelFeedItem | null) {
  const [watchPercent, setWatchPercent] = useState(0);
  const maxPercentRef = useRef(0);

  const reset = useCallback(() => {
    maxPercentRef.current = 0;
    setWatchPercent(0);
  }, []);

  const reportProgress = useCallback(
    (currentSec: number, totalSec: number) => {
      if (totalSec <= 0) return;
      const pct = Math.min(100, Math.round((currentSec / totalSec) * 100));
      if (pct > maxPercentRef.current) {
        maxPercentRef.current = pct;
        setWatchPercent(pct);
      }
    },
    []
  );

  const markComplete = useCallback(() => {
    maxPercentRef.current = 100;
    setWatchPercent(100);
  }, []);

  const quizUnlocked =
    watchPercent >= PHILS_FRIENDS_REWARDS.minWatchPercentForQuiz;

  const durationSec =
    item?.type === 'clip'
      ? Math.max(1, item.clip.end_sec - item.clip.start_sec)
      : item?.video.duration_sec ?? 60;

  return {
    watchPercent,
    quizUnlocked,
    durationSec,
    reportProgress,
    markComplete,
    reset,
  };
}
