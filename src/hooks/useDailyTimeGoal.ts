import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useGameStore } from '@/store/useGameStore';
import { scopedStorageKey } from '@/lib/userScopedStorage';

export const DAILY_TIME_GOAL_UPDATED_EVENT = 'daily-time-goal-updated';
export const DAILY_TIME_GOAL_REWARD_BAMBOO = 75;

export type DailyTimeCommitmentId = '5min' | '15min' | '30min' | '1hr';

export const DAILY_TIME_OPTIONS: Array<{
  id: DailyTimeCommitmentId;
  label: string;
  minutes: number;
  description: string;
}> = [
  { id: '5min', label: '5 min / day', minutes: 5, description: 'Quick daily habit' },
  { id: '15min', label: '15 min / day', minutes: 15, description: 'Steady progress' },
  { id: '30min', label: '30 min / day', minutes: 30, description: 'Serious learner' },
  { id: '1hr', label: '1+ hr / day', minutes: 60, description: 'Deep focus' },
];

interface DailyTimeGoalProgress {
  date: string;
  seconds: number;
  rewardedAt?: string;
}

interface UseDailyTimeGoalOptions {
  trackActivity?: boolean;
}

const STORAGE_KEY = 'daily_time_goal_progress';

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function normalizeTimeCommitment(value: string | null | undefined): DailyTimeCommitmentId {
  return DAILY_TIME_OPTIONS.some((option) => option.id === value)
    ? (value as DailyTimeCommitmentId)
    : '15min';
}

function getTimeOption(commitment: string | null | undefined) {
  const normalized = normalizeTimeCommitment(commitment);
  return DAILY_TIME_OPTIONS.find((option) => option.id === normalized) ?? DAILY_TIME_OPTIONS[1];
}

function emptyProgress(): DailyTimeGoalProgress {
  return {
    date: getTodayDateString(),
    seconds: 0,
  };
}

function readProgress(userId?: string | null): DailyTimeGoalProgress {
  try {
    const stored = localStorage.getItem(scopedStorageKey(STORAGE_KEY, userId));
    if (!stored) return emptyProgress();
    const parsed = JSON.parse(stored) as DailyTimeGoalProgress;
    if (parsed.date !== getTodayDateString()) return emptyProgress();
    return {
      date: parsed.date,
      seconds: typeof parsed.seconds === 'number' ? parsed.seconds : 0,
      rewardedAt: parsed.rewardedAt,
    };
  } catch {
    return emptyProgress();
  }
}

function writeProgress(progress: DailyTimeGoalProgress, userId?: string | null) {
  localStorage.setItem(scopedStorageKey(STORAGE_KEY, userId), JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent(DAILY_TIME_GOAL_UPDATED_EVENT));
}

export function useDailyTimeGoal(options: UseDailyTimeGoalOptions = {}) {
  const { user, profile, refreshProfile } = useAuth();
  const addBamboo = useGameStore((state) => state.addBamboo);
  const userId = user?.id ?? null;
  const selectedOption = useMemo(() => getTimeOption(profile?.time_commitment), [profile?.time_commitment]);
  const [progress, setProgress] = useState<DailyTimeGoalProgress>(() => readProgress(userId));
  const lastTickRef = useRef<number | null>(null);
  const rewardedRef = useRef(false);

  const refreshProgress = useCallback(() => {
    const next = readProgress(userId);
    rewardedRef.current = Boolean(next.rewardedAt);
    setProgress(next);
  }, [userId]);

  useEffect(() => {
    refreshProgress();
    window.addEventListener(DAILY_TIME_GOAL_UPDATED_EVENT, refreshProgress);
    window.addEventListener('storage', refreshProgress);
    return () => {
      window.removeEventListener(DAILY_TIME_GOAL_UPDATED_EVENT, refreshProgress);
      window.removeEventListener('storage', refreshProgress);
    };
  }, [refreshProgress]);

  const rewardIfComplete = useCallback(
    (nextProgress: DailyTimeGoalProgress) => {
      const targetSeconds = selectedOption.minutes * 60;
      if (rewardedRef.current || nextProgress.rewardedAt || nextProgress.seconds < targetSeconds) {
        return nextProgress;
      }

      const rewardedProgress = {
        ...nextProgress,
        rewardedAt: new Date().toISOString(),
      };
      rewardedRef.current = true;
      addBamboo(DAILY_TIME_GOAL_REWARD_BAMBOO, 'daily_time_goal');
      confetti({ particleCount: 70, spread: 55, origin: { y: 0.78 } });
      toast.success(`Daily time goal complete! +${DAILY_TIME_GOAL_REWARD_BAMBOO} bamboo`);
      return rewardedProgress;
    },
    [addBamboo, selectedOption.minutes]
  );

  useEffect(() => {
    if (!options.trackActivity) return;

    const tick = () => {
      const now = Date.now();
      if (document.visibilityState !== 'visible') {
        lastTickRef.current = now;
        return;
      }

      const previousTick = lastTickRef.current ?? now;
      lastTickRef.current = now;
      const elapsedSeconds = Math.min(30, Math.max(0, Math.round((now - previousTick) / 1000)));
      if (elapsedSeconds <= 0) return;

      const current = readProgress(userId);
      const next = rewardIfComplete({
        ...current,
        seconds: current.seconds + elapsedSeconds,
      });
      writeProgress(next, userId);
      setProgress(next);
    };

    lastTickRef.current = Date.now();
    const intervalId = window.setInterval(tick, 15000);
    const handleVisibilityChange = () => {
      lastTickRef.current = Date.now();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [options.trackActivity, rewardIfComplete, userId]);

  const updateTimeCommitment = useCallback(
    async (commitment: DailyTimeCommitmentId) => {
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          time_commitment: commitment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Could not save your daily time goal');
        throw error;
      }

      await refreshProfile();
      toast.success('Daily time goal saved');
    },
    [refreshProfile, user]
  );

  const targetSeconds = selectedOption.minutes * 60;
  const progressPercent = Math.min(100, Math.round((progress.seconds / targetSeconds) * 100));
  const secondsRemaining = Math.max(0, targetSeconds - progress.seconds);

  return {
    selectedOption,
    options: DAILY_TIME_OPTIONS,
    progressSeconds: progress.seconds,
    progressMinutes: Math.floor(progress.seconds / 60),
    targetMinutes: selectedOption.minutes,
    secondsRemaining,
    progressPercent,
    rewardedToday: Boolean(progress.rewardedAt),
    updateTimeCommitment,
  };
}

export default useDailyTimeGoal;
