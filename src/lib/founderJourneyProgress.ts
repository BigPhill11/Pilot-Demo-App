import { FOUNDER_MODULES } from '@/data/founder-journey/curriculum';
import { FOUNDER_MISSIONS } from '@/data/founder-journey/missions';
import type { FounderJourneyProgress, FounderMissionId } from '@/types/founder-journey';

export const FOUNDER_MODULE_TYPE = 'founder-journey';

// Reaching the reward screen is not completion: the final action records it.
const STEP_PERCENT: Record<string, number> = { comic: 5, simulate: 20, quiz: 40, teach: 60, canvas: 80, complete: 95 };
export function founderLessonPercent(id: FounderMissionId, progress: FounderJourneyProgress): number {
  if (progress.completedMissionIds.includes(id)) return 100;
  return STEP_PERCENT[progress.missionStepById[id] ?? ''] ?? 0;
}

export function isFounderLessonUnlocked(id: FounderMissionId, progress: FounderJourneyProgress): boolean {
  const index = FOUNDER_MISSIONS.findIndex((lesson) => lesson.id === id);
  return index >= 0 && (index === 0 || progress.completedMissionIds.includes(id)
    || progress.completedMissionIds.includes(FOUNDER_MISSIONS[index - 1].id));
}

/** One server row per module; lesson details stay within the Founder track. */
export function founderProgressSyncEntries(progress: FounderJourneyProgress) {
  return FOUNDER_MODULES.map((module) => ({
    moduleId: module.id,
    moduleType: FOUNDER_MODULE_TYPE,
    // Floor avoids labeling a module 100% before all lessons are complete.
    progressPercentage: Math.floor(module.lessonIds.reduce((sum, id) => sum + founderLessonPercent(id, progress), 0) / module.lessonIds.length),
    detailedProgress: {
      completedLessons: module.lessonIds.filter((id) => progress.completedMissionIds.includes(id)),
      totalLessons: module.lessonIds.length,
      lessonSteps: Object.fromEntries(module.lessonIds.map((id) => [id, progress.missionStepById[id] ?? null])),
    },
  }));
}
