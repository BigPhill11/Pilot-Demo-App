import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FOUNDER_MISSIONS } from '@/data/founder-journey/missions';
import type { FounderCanvasSectionId, FounderJourneyProgress, FounderMissionId } from '@/types/founder-journey';
import { notifyProgressUpdated, scopedStorageKey } from '@/lib/userScopedStorage';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';

const STORAGE_KEY = 'founder_journey_progress_v1';
export const EMPTY_FOUNDER_PROGRESS: FounderJourneyProgress = {
  completedMissionIds: [], activeMissionId: null, missionStepById: {}, canvas: {}, updatedAt: '', introCompleted: false,
};

export function normalizeFounderProgress(value: unknown): FounderJourneyProgress {
  if (!value || typeof value !== 'object') return { ...EMPTY_FOUNDER_PROGRESS };
  const candidate = value as Partial<FounderJourneyProgress>;
  const validIds = new Set(FOUNDER_MISSIONS.map((mission) => mission.id));
  const validSteps = new Set(['comic', 'simulate', 'quiz', 'teach', 'canvas', 'complete']);
  const validSections = new Set(FOUNDER_MISSIONS.flatMap((mission) => mission.canvasPrompts.map((prompt) => prompt.sectionId)));
  return {
    completedMissionIds: Array.isArray(candidate.completedMissionIds)
      ? [...new Set(candidate.completedMissionIds.filter((id): id is FounderMissionId => validIds.has(id)))] : [],
    activeMissionId: candidate.activeMissionId && validIds.has(candidate.activeMissionId) ? candidate.activeMissionId : null,
    missionStepById: Object.fromEntries(Object.entries(candidate.missionStepById ?? {}).filter(([id, step]) => validIds.has(id as FounderMissionId) && validSteps.has(step))),
    canvas: Object.fromEntries(Object.entries(candidate.canvas ?? {}).filter(([id, text]) => validSections.has(id as FounderCanvasSectionId) && typeof text === 'string').map(([id, text]) => [id, text.slice(0, 500)])),
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : '',
    introCompleted: candidate.introCompleted === true,
    teachResults: Object.fromEntries(Object.entries(candidate.teachResults ?? {}).filter(([id, result]) =>
      validIds.has(id as FounderMissionId) && result && typeof result === 'object'
      && ['passed', 'completed-after-fallback', 'skipped-optional', 'skipped-unavailable', 'skipped-quota', 'skipped-guest'].includes(result.outcome)
      && [result.passRewardBamboo, result.passXp, result.optUpBonusBamboo].every((amount) => Number.isFinite(amount) && amount >= 0))),
  };
}

function loadProgress(key: string) {
  try { return normalizeFounderProgress(JSON.parse(localStorage.getItem(key) ?? 'null')); }
  catch { return { ...EMPTY_FOUNDER_PROGRESS }; }
}

export function useFounderJourneyProgress() {
  const { user, loading } = useAuth();
  const storageKey = scopedStorageKey(STORAGE_KEY, user?.id);
  const [state, setState] = useState(() => ({ key: storageKey, progress: loadProgress(storageKey) }));
  const current = useRef(state);
  const progress = state.key === storageKey ? state.progress : EMPTY_FOUNDER_PROGRESS;

  useEffect(() => {
    const restored = { key: storageKey, progress: loadProgress(storageKey) };
    current.current = restored;
    setState(restored);
  }, [storageKey, user?.id, loading]);

  const update = useCallback((recipe: (value: FounderJourneyProgress) => FounderJourneyProgress) => {
    const previous = current.current.key === storageKey ? current.current.progress : loadProgress(storageKey);
    const next = { ...recipe(previous), updatedAt: new Date().toISOString() };
    current.current = { key: storageKey, progress: next };
    setState(current.current);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      localStorage.setItem(scopedStorageKey('lastTouched_fj', user?.id), Date.now().toString());
    } catch { /* Keep session progress usable if storage is unavailable. */ }
    notifyProgressUpdated();
  }, [storageKey, user?.id]);

  const startMission = useCallback((missionId: FounderMissionId) => update((value) => ({ ...value, activeMissionId: missionId, missionStepById: { ...value.missionStepById, [missionId]: value.missionStepById[missionId] ?? 'comic' } })), [update]);
  const saveMissionStep = useCallback((missionId: FounderMissionId, step: string) => update((value) => ({ ...value, activeMissionId: missionId, missionStepById: { ...value.missionStepById, [missionId]: step } })), [update]);
  const completeMission = useCallback((missionId: FounderMissionId) => update((value) => ({ ...value, activeMissionId: null, completedMissionIds: value.completedMissionIds.includes(missionId) ? value.completedMissionIds : [...value.completedMissionIds, missionId], missionStepById: { ...value.missionStepById, [missionId]: 'complete' } })), [update]);
  const saveCanvasSection = useCallback((sectionId: FounderCanvasSectionId, text: string) => update((value) => ({ ...value, canvas: { ...value.canvas, [sectionId]: text } })), [update]);
  const completeIntro = useCallback(() => update((value) => ({ ...value, introCompleted: true })), [update]);
  const saveTeachResult = useCallback((id: FounderMissionId, result: TeachPhilResult) => update((value) => ({ ...value, teachResults: { ...value.teachResults, [id]: result } })), [update]);
  const resetJourney = useCallback(() => update(() => ({ ...EMPTY_FOUNDER_PROGRESS })), [update]);
  const completionPercent = useMemo(() => Math.round(progress.completedMissionIds.length / FOUNDER_MISSIONS.length * 100), [progress.completedMissionIds.length]);
  return { progress, completionPercent, ready: !loading && state.key === storageKey, startMission, saveMissionStep, completeMission, saveCanvasSection, completeIntro, saveTeachResult, resetJourney };
}
export default useFounderJourneyProgress;
