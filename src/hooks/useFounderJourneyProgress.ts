import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FOUNDER_MISSIONS } from '@/data/founder-journey/missions';
import type {
  FounderCanvasSectionId,
  FounderJourneyProgress,
  FounderMissionId,
} from '@/types/founder-journey';
import { notifyProgressUpdated, scopedStorageKey } from '@/lib/userScopedStorage';

const STORAGE_KEY = 'founder_journey_progress_v1';

export const EMPTY_FOUNDER_PROGRESS: FounderJourneyProgress = {
  completedMissionIds: [],
  activeMissionId: null,
  missionStepById: {},
  canvas: {},
  updatedAt: '',
};

export function normalizeFounderProgress(value: unknown): FounderJourneyProgress {
  if (!value || typeof value !== 'object') return { ...EMPTY_FOUNDER_PROGRESS };
  const candidate = value as Partial<FounderJourneyProgress>;
  const validIds = new Set(FOUNDER_MISSIONS.map((mission) => mission.id));
  return {
    completedMissionIds: Array.isArray(candidate.completedMissionIds)
      ? candidate.completedMissionIds.filter((id): id is FounderMissionId => validIds.has(id))
      : [],
    activeMissionId:
      candidate.activeMissionId && validIds.has(candidate.activeMissionId)
        ? candidate.activeMissionId
        : null,
    missionStepById: candidate.missionStepById ?? {},
    canvas: candidate.canvas ?? {},
    updatedAt: candidate.updatedAt ?? '',
  };
}

export function useFounderJourneyProgress() {
  const { user } = useAuth();
  const storageKey = scopedStorageKey(STORAGE_KEY, user?.id);
  const [progress, setProgress] = useState<FounderJourneyProgress>(EMPTY_FOUNDER_PROGRESS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setProgress(stored ? normalizeFounderProgress(JSON.parse(stored)) : { ...EMPTY_FOUNDER_PROGRESS });
    } catch {
      setProgress({ ...EMPTY_FOUNDER_PROGRESS });
    }
  }, [storageKey]);

  const update = useCallback((recipe: (current: FounderJourneyProgress) => FounderJourneyProgress) => {
    setProgress((current) => {
      const next = { ...recipe(current), updatedAt: new Date().toISOString() };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        localStorage.setItem(scopedStorageKey('lastTouched_fj', user?.id), Date.now().toString());
      } catch {
        // The journey remains usable for this session when storage is unavailable.
      }
      notifyProgressUpdated();
      return next;
    });
  }, [storageKey, user?.id]);

  const startMission = useCallback((missionId: FounderMissionId) => {
    update((current) => ({
      ...current,
      activeMissionId: missionId,
      missionStepById: { ...current.missionStepById, [missionId]: current.missionStepById[missionId] ?? 'comic' },
    }));
  }, [update]);

  const saveMissionStep = useCallback((missionId: FounderMissionId, step: string) => {
    update((current) => ({
      ...current,
      activeMissionId: missionId,
      missionStepById: { ...current.missionStepById, [missionId]: step },
    }));
  }, [update]);

  const completeMission = useCallback((missionId: FounderMissionId) => {
    update((current) => ({
      ...current,
      activeMissionId: null,
      completedMissionIds: current.completedMissionIds.includes(missionId)
        ? current.completedMissionIds
        : [...current.completedMissionIds, missionId],
      missionStepById: { ...current.missionStepById, [missionId]: 'complete' },
    }));
  }, [update]);

  const saveCanvasSection = useCallback((sectionId: FounderCanvasSectionId, value: string) => {
    update((current) => ({
      ...current,
      canvas: { ...current.canvas, [sectionId]: value },
    }));
  }, [update]);

  const resetJourney = useCallback(() => update(() => ({ ...EMPTY_FOUNDER_PROGRESS })), [update]);

  const completionPercent = useMemo(
    () => Math.round((progress.completedMissionIds.length / FOUNDER_MISSIONS.length) * 100),
    [progress.completedMissionIds.length],
  );

  return {
    progress,
    completionPercent,
    startMission,
    saveMissionStep,
    completeMission,
    saveCanvasSection,
    resetJourney,
  };
}

export default useFounderJourneyProgress;
