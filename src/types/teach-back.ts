/**
 * Teach Phil (teach-back) types — the required post-quiz step where the
 * student teaches the lesson's concept to Phil the Panda (protégé effect).
 * Flow: Quiz → Teach Phil → Reward
 */

/** Phil's persona tier — how hard he is to satisfy */
export type PhilAge = 'cub' | 'teen' | 'elder';

/**
 * The concept Phil is trying to learn, authored by the content team on the
 * lesson record (VillageLesson.teachBack). Lessons without a hand-written
 * spec get one auto-derived from their concepts array — see
 * src/lib/teach-back-spec.ts.
 */
export interface TeachBackSpec {
  /** Core concept name, e.g. "Compound Interest" */
  conceptName: string;
  /** 2-4 facts the explanation should cover to be complete */
  keyFacts: string[];
  /** 1-2 common misconceptions Phil watches for */
  misconceptions: string[];
}

/**
 * Hidden structured assessment returned by the TeachPhil Edge Function
 * alongside Phil's in-character reply. Drives the understanding meter
 * and the pass gate; never shown to the student directly.
 */
export interface TeachBackAssessment {
  philSays: string;
  understandingScore: number; // 0-100
  keyFactsCovered: string[];
  keyFactsMissing: string[];
  misconceptionDetected: boolean;
  flaggedAsCopiedText: boolean;
  readyToPass: boolean;
}

/** A single exchange in the teach-back conversation */
export interface TeachBackTurn {
  studentMessage: string;
  philMessage: string;
}

/** Understanding score Phil must reach for each persona tier */
export const TEACH_BACK_PASS_THRESHOLDS: Record<PhilAge, number> = {
  cub: 70,
  teen: 75,
  elder: 80,
};

/** Max student turns per attempt before the supportive fallback kicks in */
export const TEACH_BACK_MAX_TURNS = 5;

/**
 * Bonus bamboo per tier the student opts UP from the lesson's default
 * persona (e.g. a cub-default lesson taught to Elder Phil = 2 steps = +10).
 * Opting down is not allowed; teaching at the default tier earns no bonus.
 */
export const TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER = 5;

/**
 * A genuine pass pays out big in bamboo: this fraction of the player's max
 * bamboo storage capacity, so the reward scales with empire progress.
 */
export const TEACH_BACK_PASS_REWARD_STORAGE_FRACTION = 0.3;

/** Deliberately small XP for a pass — Teach Phil pays out in bamboo, not XP */
export const TEACH_BACK_PASS_XP = 5;

/** Tier order used to compute opt-up steps */
export const PHIL_AGE_ORDER: PhilAge[] = ['cub', 'teen', 'elder'];

/** Attempts allowed: the initial one plus one post-fallback retry */
export const TEACH_BACK_MAX_ATTEMPTS = 2;
