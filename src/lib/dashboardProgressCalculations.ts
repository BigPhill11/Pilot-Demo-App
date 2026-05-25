/**
 * Pure progress aggregation helpers for My Progress dashboard.
 */

import { PERSONAL_FINANCE_MODULES, getModuleById } from '@/data/personal-finance/modules';
import { VILLAGE_MODULES } from '@/data/village-lessons';
import { CAREER_MODULES, TOTAL_CAREER_MODULES } from '@/data/career-readiness/modules';

export interface PathProgressResult {
  progressPct: number;
  lessonsCompleted: number;
  totalLessons: number;
  nextAction: string;
}

export interface VillageLessonRecord {
  completedAt: string;
  xpEarned: number;
  bambooEarned: number;
}

export function calculatePersonalFinanceProgress(
  moduleProgress: Record<string, { completedLessons: string[]; status: string }>
): PathProgressResult {
  const modules = PERSONAL_FINANCE_MODULES;
  let completedLessons = 0;
  let totalLessons = 0;
  let nextAction = 'Start Income module';

  for (const module of modules) {
    const moduleData = getModuleById(module.id);
    const moduleLessonCount = moduleData?.lessons.length ?? 0;
    totalLessons += moduleLessonCount;

    const progress = moduleProgress[module.id];
    if (progress) {
      const completedCount = progress.completedLessons?.length ?? 0;
      completedLessons += completedCount;

      if (progress.status !== 'completed' && nextAction === 'Start Income module') {
        if (moduleData && completedCount < moduleLessonCount) {
          nextAction = `Continue ${module.name} (Lesson ${completedCount + 1})`;
        }
      }
    }
  }

  const progressPct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return { progressPct, lessonsCompleted: completedLessons, totalLessons, nextAction };
}

export function calculateMarketIntelligenceProgress(
  completedLessons: Record<string, VillageLessonRecord>
): PathProgressResult {
  let completed = 0;
  let total = 0;
  let nextModuleName = 'Business Economics';

  for (const module of VILLAGE_MODULES) {
    if (module.isSwipeGame) continue;

    total += module.lessons.length;
    const moduleCompleted = module.lessons.filter((lesson) => completedLessons[lesson.id]).length;
    completed += moduleCompleted;

    if (moduleCompleted < module.lessons.length && nextModuleName === 'Business Economics') {
      nextModuleName = module.name;
    }
  }

  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  let nextAction = 'Start Market Intelligence village';
  if (completed > 0 && completed < total) {
    nextAction = `Continue ${nextModuleName}`;
  } else if (completed >= total && total > 0) {
    nextAction = 'Explore Company Tinder';
  }

  return {
    progressPct,
    lessonsCompleted: completed,
    totalLessons: total,
    nextAction,
  };
}

export function calculateCareerReadinessProgress(
  moduleProgress: Record<string, number>
): PathProgressResult {
  const totalModules = TOTAL_CAREER_MODULES;
  let completedModules = 0;
  let progressSum = 0;
  let nextAction = 'Start Interviewing module';

  for (const module of CAREER_MODULES) {
    const pct = moduleProgress[module.id] ?? 0;
    progressSum += pct;
    if (pct >= 100) {
      completedModules += 1;
    } else if (nextAction === 'Start Interviewing module') {
      nextAction = `Continue ${module.title}`;
    }
  }

  const progressPct = totalModules > 0 ? Math.round(progressSum / totalModules) : 0;

  return {
    progressPct,
    lessonsCompleted: completedModules,
    totalLessons: totalModules,
    nextAction,
  };
}

export function calculateOverallProgress(pathPercentages: number[]): number {
  if (pathPercentages.length === 0) return 0;
  const total = pathPercentages.reduce((sum, pct) => sum + pct, 0);
  return Math.round(total / pathPercentages.length);
}

export function calculateTotalTimeSpentMinutes(): number {
  let totalMinutes = 0;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.includes('village_lesson_progress') || key.includes('personal-finance-progress') || key.includes('career_readiness_progress')) {
        const stored = localStorage.getItem(key);
        if (!stored) continue;
        const data = JSON.parse(stored);

        if (data.completedLessons && typeof data.completedLessons === 'object') {
          totalMinutes += Object.keys(data.completedLessons).length * 8;
        }

        if (typeof data.timeSpentMinutes === 'number') {
          totalMinutes += data.timeSpentMinutes;
        }

        if (data.modules && typeof data.modules === 'object') {
          const moduleValues = Object.values(data.modules) as number[];
          totalMinutes += moduleValues.filter((v) => v >= 100).length * 15;
        }
      }

      if (key.startsWith('progress_')) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const data = JSON.parse(stored);
          if (typeof data.timeSpentMinutes === 'number') {
            totalMinutes += data.timeSpentMinutes;
          }
        }
      }

      if (key.startsWith('soft_skills_modules_')) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const modules = JSON.parse(stored);
          if (Array.isArray(modules)) {
            for (const mod of modules) {
              if (mod.timeSpentMinutes) {
                totalMinutes += mod.timeSpentMinutes;
              }
            }
          }
        }
      }
    }
  } catch {
    /* ignore parse errors */
  }

  return totalMinutes;
}
