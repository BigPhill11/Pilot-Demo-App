/**
 * Generates personalized, daily-rotating learning goals from real progress data.
 */

import { PERSONAL_FINANCE_MODULES, getModuleById } from '@/data/personal-finance/modules';
import { getAllModules as getAllMiModules } from '@/data/market-intelligence/catalog';
import { PLATFORM_REWARDS } from '@/config/gameConfig';
import type { DashboardPath } from '@/hooks/useDashboardProgress';

export type GoalCompletionType =
  | 'lesson'
  | 'module'
  | 'flashcards'
  | 'tinder'
  | 'evaluation'
  | 'any_activity';

export interface GoalCandidate {
  id: string;
  title: string;
  description: string;
  targetTab: string;
  deepLink?: {
    sectionId?: string;
    moduleId?: string;
    unitId?: string;
    lessonIndex?: number;
  };
  completionType: GoalCompletionType;
  completionTarget?: {
    pathId?: string;
    moduleId?: string;
    lessonId?: string;
    challengeId?: string;
    count?: number;
  };
  bambooReward: number;
  xpReward: number;
  priority: 'primary' | 'secondary' | 'tertiary';
  icon: string;
  pathId: string;
}

const LAST_TOUCHED_KEYS = {
  personalFinance: 'lastTouched_pf',
  companyDiscovery: 'lastTouched_cd',
  careersFinance: 'lastTouched_cf',
};

const TINDER_CHALLENGES = [
  { id: 'tech_swiper', name: 'Tech Explorer', description: 'Swipe on 10 tech companies', icon: '💻' },
  { id: 'dividend_hunter', name: 'Dividend Hunter', description: 'Find 5 dividend-paying stocks', icon: '💰' },
  { id: 'global_explorer', name: 'Global Explorer', description: 'Swipe companies from 3 countries', icon: '🌍' },
  { id: 'speed_swiper', name: 'Speed Swiper', description: 'Swipe on 20 companies today', icon: '⚡' },
  { id: 'value_seeker', name: 'Value Seeker', description: 'Like 5 undervalued stocks', icon: '💎' },
];

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

function seededIndex(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return fallback;
}

function getLastTouchedPathId(): string {
  const pf = parseInt(localStorage.getItem(LAST_TOUCHED_KEYS.personalFinance) || '0', 10);
  const cd = parseInt(localStorage.getItem(LAST_TOUCHED_KEYS.companyDiscovery) || '0', 10);
  const cf = parseInt(localStorage.getItem(LAST_TOUCHED_KEYS.careersFinance) || '0', 10);
  const max = Math.max(pf, cd, cf);
  if (max === 0) return 'personal-finance';
  if (max === pf) return 'personal-finance';
  if (max === cd) return 'company-discovery';
  return 'careers-finance';
}

function buildPfCandidate(): GoalCandidate | null {
  const moduleProgress = safeReadStorage<
    Record<string, { completedLessons?: string[]; status?: string }>
  >('personal-finance-progress', {});

  for (const mod of PERSONAL_FINANCE_MODULES) {
    const full = getModuleById(mod.id);
    if (!full) continue;
    const mp = moduleProgress[mod.id];
    if (mp?.status === 'completed') continue;

    const completedCount = mp?.completedLessons?.length ?? 0;
    if (completedCount >= full.lessons.length) continue;

    const lesson = full.lessons[completedCount];
    const date = getTodayDateString();

    return {
      id: `${date}-pf-${mod.id}-${lesson.id}`,
      title: `Complete ${mod.name} — Lesson ${completedCount + 1}`,
      description: lesson.title,
      targetTab: 'personal-finance',
      deepLink: { moduleId: mod.id, lessonIndex: completedCount },
      completionType: 'lesson',
      completionTarget: { pathId: 'personal-finance', moduleId: mod.id, lessonId: lesson.id },
      bambooReward: PLATFORM_REWARDS.lessonCompletion,
      xpReward: PLATFORM_REWARDS.lessonXp,
      priority: 'primary',
      icon: mod.icon,
      pathId: 'personal-finance',
    };
  }
  return null;
}

function buildMiCandidate(): GoalCandidate | null {
  const state = safeReadStorage<{ modules?: Record<string, { completed?: boolean }> }>(
    'market_intelligence_progress',
    {}
  );
  const modules = state.modules ?? {};
  const sorted = [...getAllMiModules()].sort((a, b) => {
    const order: Record<string, number> = {
      'business-economics': 1,
      ownership: 2,
      'language-finance': 3,
      'markets-headlines': 4,
      'business-foundations': 5,
    };
    const sd = (order[a.sectionId] ?? 99) - (order[b.sectionId] ?? 99);
    return sd !== 0 ? sd : a.order - b.order;
  });

  const next = sorted.find((m) => !modules[m.id]?.completed);
  if (!next) return null;

  const date = getTodayDateString();
  return {
    id: `${date}-mi-${next.id}`,
    title: `Complete ${next.title}`,
    description: next.description.slice(0, 80) + (next.description.length > 80 ? '…' : ''),
    targetTab: 'companies',
    deepLink: { sectionId: next.sectionId, moduleId: next.id },
    completionType: 'module',
    completionTarget: { pathId: 'company-discovery', moduleId: next.id },
    bambooReward: PLATFORM_REWARDS.moduleCompletion,
    xpReward: PLATFORM_REWARDS.moduleXp,
    priority: 'primary',
    icon: next.icon,
    pathId: 'company-discovery',
  };
}

function buildEconomicsCandidate(): GoalCandidate | null {
  const progress = safeReadStorage<{
    microeconomics?: Array<{ unitId: string; status: string; completedLessons?: string[] }>;
    macroeconomics?: Array<{ unitId: string; status: string; completedLessons?: string[] }>;
  }>('economics_curriculum_progress', {});

  const tracks = ['microeconomics', 'macroeconomics'] as const;
  for (const track of tracks) {
    const units = progress[track] ?? [];
    for (const unit of units) {
      if (unit.status === 'completed') continue;
      if (unit.status === 'active' || unit.status === 'unlocked') {
        const date = getTodayDateString();
        const lessonNum = (unit.completedLessons?.length ?? 0) + 1;
        return {
          id: `${date}-econ-${unit.unitId}`,
          title: `Continue economics unit (${lessonNum} lessons done)`,
          description: 'Pick up where you left off in Business Economics',
          targetTab: 'companies',
          deepLink: { sectionId: 'business-economics', unitId: unit.unitId },
          completionType: 'lesson',
          completionTarget: { pathId: 'company-discovery', moduleId: unit.unitId },
          bambooReward: PLATFORM_REWARDS.lessonCompletion,
          xpReward: PLATFORM_REWARDS.lessonXp,
          priority: 'secondary',
          icon: '📈',
          pathId: 'company-discovery',
        };
      }
    }
  }
  return null;
}

function buildEvaluationCandidate(): GoalCandidate | null {
  const evalProgress = safeReadStorage<Array<{ completed?: boolean; moduleNumber?: number }>>(
    'evaluation_progress',
    []
  );
  const completed = evalProgress.filter((e) => e.completed).length;
  if (completed >= 9) return null;

  const date = getTodayDateString();
  const moduleNum = Math.floor(completed / 3) + 1;
  return {
    id: `${date}-eval-${moduleNum}`,
    title: `Finish company evaluation (${completed}/9 done)`,
    description: 'Analyze real companies and sharpen your market instincts',
    targetTab: 'companies',
    deepLink: { sectionId: 'business-economics' },
    completionType: 'evaluation',
    completionTarget: { pathId: 'company-discovery', count: completed + 1 },
    bambooReward: PLATFORM_REWARDS.gameCompletion,
    xpReward: PLATFORM_REWARDS.gameXp,
    priority: 'secondary',
    icon: '🔍',
    pathId: 'company-discovery',
  };
}

function buildFlashcardCandidate(): GoalCandidate {
  const date = getTodayDateString();
  return {
    id: `${date}-flashcards-5`,
    title: 'Review 5 Flashcards',
    description: 'Quick spaced-repetition session to lock in what you learned',
    targetTab: 'adaptive-flashcards',
    completionType: 'flashcards',
    completionTarget: { count: 5 },
    bambooReward: PLATFORM_REWARDS.cardReviewed * 5,
    xpReward: PLATFORM_REWARDS.cardReviewedXp * 5,
    priority: 'tertiary',
    icon: '🃏',
    pathId: 'flashcards',
  };
}

function buildTinderCandidate(): GoalCandidate {
  const dayOfYear = getDayOfYear();
  const challenge = TINDER_CHALLENGES[dayOfYear % TINDER_CHALLENGES.length];
  const date = getTodayDateString();

  return {
    id: `${date}-tinder-${challenge.id}`,
    title: challenge.name,
    description: challenge.description,
    targetTab: 'companies',
    deepLink: { sectionId: 'company-tinder' },
    completionType: 'tinder',
    completionTarget: { pathId: 'company-discovery', challengeId: challenge.id },
    bambooReward: PLATFORM_REWARDS.dailyChallengeComplete,
    xpReward: PLATFORM_REWARDS.dailyChallengeXp,
    priority: 'tertiary',
    icon: challenge.icon,
    pathId: 'company-discovery',
  };
}

function buildStreakCandidate(currentStreak: number): GoalCandidate {
  const date = getTodayDateString();
  return {
    id: `${date}-streak`,
    title: currentStreak > 0 ? `Keep your ${currentStreak}-day streak alive` : 'Start a learning streak',
    description: 'Complete any lesson, quiz, or review to build momentum',
    targetTab: 'interactive-hub',
    completionType: 'any_activity',
    completionTarget: {},
    bambooReward: PLATFORM_REWARDS.dailyChallengeComplete,
    xpReward: PLATFORM_REWARDS.dailyChallengeXp,
    priority: 'tertiary',
    icon: '🔥',
    pathId: 'streak',
  };
}

function buildStartJourneyCandidate(): GoalCandidate {
  const date = getTodayDateString();
  const income = PERSONAL_FINANCE_MODULES[0];
  return {
    id: `${date}-start-journey`,
    title: 'Start Your Finance Journey',
    description: 'Begin the Income module — your first step in the bamboo forest',
    targetTab: 'personal-finance',
    deepLink: { moduleId: income?.id ?? 'income', lessonIndex: 0 },
    completionType: 'lesson',
    completionTarget: { pathId: 'personal-finance', moduleId: income?.id, lessonId: undefined },
    bambooReward: PLATFORM_REWARDS.lessonCompletion * 2,
    xpReward: PLATFORM_REWARDS.lessonXp * 2,
    priority: 'primary',
    icon: '🚀',
    pathId: 'personal-finance',
  };
}

function buildCareersCandidate(): GoalCandidate {
  const date = getTodayDateString();
  return {
    id: `${date}-careers-explore`,
    title: 'Explore a finance career path',
    description: 'Discover IB, PE, VC, and more on the jungle career map',
    targetTab: 'careers',
    completionType: 'any_activity',
    completionTarget: { pathId: 'careers-finance' },
    bambooReward: PLATFORM_REWARDS.gameCompletion,
    xpReward: PLATFORM_REWARDS.gameXp,
    priority: 'secondary',
    icon: '💼',
    pathId: 'careers-finance',
  };
}

function pickFromPool(pool: GoalCandidate[], seed: string, excludeIds: string[]): GoalCandidate | null {
  const available = pool.filter((c) => !excludeIds.includes(c.id));
  if (available.length === 0) return null;
  return available[seededIndex(seed, available.length)];
}

/**
 * Generate 3 daily goals with date-seeded rotation.
 */
export function generateDailyGoals(options: {
  paths: DashboardPath[];
  todayActionCompleted: boolean;
  currentStreak: number;
}): GoalCandidate[] {
  const { todayActionCompleted, currentStreak } = options;
  const date = getTodayDateString();
  const recentPathId = getLastTouchedPathId();

  const pf = buildPfCandidate();
  const mi = buildMiCandidate();
  const econ = buildEconomicsCandidate();
  const evalCand = buildEvaluationCandidate();
  const flashcards = buildFlashcardCandidate();
  const tinder = buildTinderCandidate();
  const streak = buildStreakCandidate(currentStreak);
  const careers = buildCareersCandidate();
  const start = buildStartJourneyCandidate();

  const byPath: Record<string, GoalCandidate | null> = {
    'personal-finance': pf,
    'company-discovery': mi ?? econ ?? evalCand,
    'careers-finance': careers,
  };

  let primary = byPath[recentPathId] ?? pf ?? mi ?? start;
  if (!primary) primary = start;

  const secondaryPool = [mi, econ, evalCand, pf, careers, flashcards, tinder].filter(
    (c): c is GoalCandidate =>
      c !== null && c.pathId !== primary.pathId && c.id !== primary.id
  );

  let secondary = pickFromPool(secondaryPool, `${date}-secondary`, [primary.id]);
  if (!secondary) {
    secondary = careers.pathId !== primary.pathId ? careers : flashcards;
  }

  let tertiary: GoalCandidate;
  if (!todayActionCompleted) {
    tertiary = streak;
  } else {
    const tertiaryPool = [flashcards, tinder].filter((c) => c.id !== primary.id && c.id !== secondary.id);
    tertiary = pickFromPool(tertiaryPool, `${date}-tertiary`, [primary.id, secondary.id]) ?? flashcards;
  }

  return [
    { ...primary, priority: 'primary' },
    { ...secondary, priority: 'secondary' },
    { ...tertiary, priority: 'tertiary' },
  ];
}

export { getTodayDateString };
