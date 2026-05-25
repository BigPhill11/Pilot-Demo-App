import { useCallback, useEffect, useMemo, useState } from 'react';
import { CAREER_MODULES, TOTAL_CAREER_MODULES } from '@/data/career-readiness/modules';
import {
  INTERVIEW_BADGE_ID,
  INTERVIEW_MODULE_ID,
  getLessonConfig,
} from '@/data/career-readiness/interviewing';
import type {
  CareerActivityId,
  CareerPhaseId,
  CareerReadinessProgressState,
  InterviewModuleDetails,
  ResumeBuilderAnswers,
  ResumeBuilderDetails,
} from '@/types/career-readiness';
import {
  calculateInterviewProgress,
  calculateResumeProgress,
  getDefaultInterviewDetails,
  getDefaultResumeDetails,
  isInterviewModuleComplete,
  isPhaseComplete,
  isResumeModuleComplete,
  normalizeInterviewDetails,
  normalizeResumeDetails,
  RESUME_BADGE_ID,
  RESUME_MODULE_ID,
} from '@/types/career-readiness';

import {
  migrateLegacyStorageKey,
  notifyProgressUpdated,
  scopedStorageKey,
} from '@/lib/userScopedStorage';

const STORAGE_KEY = 'career_readiness_progress';

const defaultState: CareerReadinessProgressState = {
  modules: {},
  badgesEarned: [],
  details: {},
};

function loadProgress(): CareerReadinessProgressState {
  try {
    migrateLegacyStorageKey(STORAGE_KEY);
    const raw = localStorage.getItem(scopedStorageKey(STORAGE_KEY));
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as CareerReadinessProgressState;
    return {
      modules: parsed.modules ?? {},
      badgesEarned: parsed.badgesEarned ?? [],
      details: parsed.details ?? {},
    };
  } catch {
    return defaultState;
  }
}

function saveProgress(state: CareerReadinessProgressState): void {
  try {
    localStorage.setItem(scopedStorageKey(STORAGE_KEY), JSON.stringify(state));
    notifyProgressUpdated();
  } catch {
    /* ignore quota errors */
  }
}

export function getResumeDetails(
  details: CareerReadinessProgressState['details']
): ResumeBuilderDetails {
  const stored = details[RESUME_MODULE_ID];
  if (stored && typeof stored === 'object') {
    return normalizeResumeDetails(stored as Partial<ResumeBuilderDetails>);
  }
  return getDefaultResumeDetails();
}

export function getInterviewDetails(
  details: CareerReadinessProgressState['details']
): InterviewModuleDetails {
  const stored = details[INTERVIEW_MODULE_ID];
  if (stored && typeof stored === 'object') {
    const merged = normalizeInterviewDetails(stored as Partial<InterviewModuleDetails>);
    const lesson = getLessonConfig(merged.currentLessonId);
    if (merged.currentStepId === 'practice' && lesson.practiceActivityIds.length > 0) {
      const max = lesson.practiceActivityIds.length - 1;
      if (merged.currentPracticeActivityIndex > max) {
        return { ...merged, currentPracticeActivityIndex: max };
      }
    }
    return merged;
  }
  return getDefaultInterviewDetails();
}

export function useCareerReadinessProgress() {
  const [progress, setProgress] = useState<CareerReadinessProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const moduleProgress = useMemo(() => {
    const map: Record<string, number> = {};
    for (const mod of CAREER_MODULES) {
      map[mod.id] = progress.modules[mod.id] ?? 0;
    }
    return map;
  }, [progress.modules]);

  const overallPercent = useMemo(() => {
    const total = CAREER_MODULES.reduce((sum, mod) => sum + (moduleProgress[mod.id] ?? 0), 0);
    return Math.round(total / TOTAL_CAREER_MODULES);
  }, [moduleProgress]);

  const badgesEarnedList = progress.badgesEarned;
  const badgesEarned = badgesEarnedList.length;

  const getModuleProgress = useCallback(
    (moduleId: string) => moduleProgress[moduleId] ?? 0,
    [moduleProgress]
  );

  const hasBadge = useCallback(
    (badgeId: string) => badgesEarnedList.includes(badgeId),
    [badgesEarnedList]
  );

  const updateModuleProgress = useCallback((moduleId: string, percent: number) => {
    setProgress((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: Math.min(100, Math.max(0, percent)),
      },
    }));
  }, []);

  const getInterviewModuleDetails = useCallback(
    () => getInterviewDetails(progress.details),
    [progress.details]
  );

  const updateInterviewDetails = useCallback(
    (updater: (current: InterviewModuleDetails) => InterviewModuleDetails) => {
      setProgress((prev) => {
        const current = getInterviewDetails(prev.details);
        const next = updater(current);
        const percent = calculateInterviewProgress(next);
        const completed = isInterviewModuleComplete(next);

        const badgesEarned = completed && !prev.badgesEarned.includes(INTERVIEW_BADGE_ID)
          ? [...prev.badgesEarned, INTERVIEW_BADGE_ID]
          : prev.badgesEarned;

        return {
          ...prev,
          modules: {
            ...prev.modules,
            [INTERVIEW_MODULE_ID]: completed ? 100 : percent,
          },
          badgesEarned,
          details: {
            ...prev.details,
            [INTERVIEW_MODULE_ID]: next,
          },
        };
      });
    },
    []
  );

  const completeInterviewActivity = useCallback(
    (activityId: CareerActivityId) => {
      updateInterviewDetails((current) => {
        const completedActivityIds = current.completedActivityIds.includes(activityId)
          ? current.completedActivityIds
          : [...current.completedActivityIds, activityId];
        return { ...current, completedActivityIds };
      });
    },
    [updateInterviewDetails]
  );

  const setInterviewPhase = useCallback(
    (phaseId: CareerPhaseId, activityIndex = 0) => {
      updateInterviewDetails((current) => ({
        ...current,
        currentPhaseId: phaseId,
        currentActivityIndex: activityIndex,
      }));
    },
    [updateInterviewDetails]
  );

  const updateInterviewAnswers = useCallback(
    (answers: Partial<InterviewModuleDetails['answers']>) => {
      updateInterviewDetails((current) => ({
        ...current,
        answers: { ...current.answers, ...answers },
      }));
    },
    [updateInterviewDetails]
  );

  const completeModule = useCallback((moduleId: string, badgeId?: string) => {
    setProgress((prev) => {
      const badge = badgeId ?? CAREER_MODULES.find((m) => m.id === moduleId)?.badgeId;
      const badgesEarned =
        badge && !prev.badgesEarned.includes(badge)
          ? [...prev.badgesEarned, badge]
          : prev.badgesEarned;
      return {
        ...prev,
        modules: { ...prev.modules, [moduleId]: 100 },
        badgesEarned,
      };
    });
  }, []);

  const getResumeModuleDetails = useCallback(
    () => getResumeDetails(progress.details),
    [progress.details]
  );

  const updateResumeDetails = useCallback(
    (updater: (current: ResumeBuilderDetails) => ResumeBuilderDetails) => {
      setProgress((prev) => {
        const current = getResumeDetails(prev.details);
        const next = updater(current);
        const percent = calculateResumeProgress(next);
        const completed = isResumeModuleComplete(next);

        const badgesEarned =
          completed && !prev.badgesEarned.includes(RESUME_BADGE_ID)
            ? [...prev.badgesEarned, RESUME_BADGE_ID]
            : prev.badgesEarned;

        return {
          ...prev,
          modules: {
            ...prev.modules,
            [RESUME_MODULE_ID]: completed ? 100 : percent,
          },
          badgesEarned,
          details: {
            ...prev.details,
            [RESUME_MODULE_ID]: next,
          },
        };
      });
    },
    []
  );

  const updateResumeAnswers = useCallback(
    (answers: Partial<ResumeBuilderAnswers>) => {
      updateResumeDetails((current) => ({
        ...current,
        answers: {
          ...current.answers,
          ...answers,
          contact: { ...current.answers.contact, ...(answers.contact ?? {}) },
          education: { ...current.answers.education, ...(answers.education ?? {}) },
          additional: {
            ...current.answers.additional,
            ...(answers.additional ?? {}),
          },
        },
      }));
    },
    [updateResumeDetails]
  );

  return {
    moduleProgress,
    overallPercent,
    badgesEarned,
    badgesEarnedList,
    totalBadges: TOTAL_CAREER_MODULES,
    getModuleProgress,
    hasBadge,
    updateModuleProgress,
    completeModule,
    getInterviewModuleDetails,
    updateInterviewDetails,
    completeInterviewActivity,
    setInterviewPhase,
    updateInterviewAnswers,
    getResumeModuleDetails,
    updateResumeDetails,
    updateResumeAnswers,
    setProgress,
  };
}
