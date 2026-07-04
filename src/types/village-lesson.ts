/**
 * Village Lesson types — the new Market Intelligence lesson format.
 * Flow: Hook → Concepts → Simulator → Quiz → Teach Phil → Reward
 */

import type { PhilAge, TeachBackSpec } from './teach-back';

/** Inner pathways inside the Business Economics village building */
export type BusinessEconomicsPathwayId =
  | 'microeconomics'
  | 'macroeconomics'
  | 'competition';

export interface BusinessEconomicsPathwayConfig {
  id: BusinessEconomicsPathwayId;
  label: string;
  emoji: string;
  summary: string;
}

export type VillageLessonSection =
  | 'Macroeconomics'
  | 'Microeconomics'
  | 'Competition'
  | 'Philosophy of Wealth'
  | 'Asset Ownership'
  | 'Entrepreneurship'
  | 'Portfolio Allocation';

export type VillageSimulatorType =
  | 'decision'
  | 'net-worth-elasticity'
  | 'governance-sort'
  | 'mvp-risk'
  | 'index-fee-allocator'
  | 'portfolio-stress-test'
  | 'compound-growth-sliders'
  | 'dividend-drip'
  | 'asset-allocation-cycle'
  | 'market-panic-hold'
  | 'headline-expectation'
  | 'macro-headlines';

export interface VillageLesson {
  id: string;
  moduleId: VillageModuleId;
  /** Groups lessons inside a module (BE tracks or Ownership units) */
  section?: VillageLessonSection;
  /** Custom simulate step; defaults to decision rounds */
  simulatorType?: VillageSimulatorType;
  /** @deprecated Use section; kept for legacy pathway tab filter */
  pathwayId?: BusinessEconomicsPathwayId;
  /** Optional unit name shown on lesson cards */
  unitLabel?: string;
  title: string;
  estimatedMinutes: number;
  hook: {
    question: string;
    philMessage: string;
  };
  concepts: VillageConcept[];
  simulator: DecisionSimulator;
  quiz: VillageQuizQuestion[];
  rewards: { xp: number; bamboo: number };
  /** Phil's persona tier for the teach-back step; defaults by module */
  philAge?: PhilAge;
  /** Hand-written concept spec; auto-derived from concepts when absent */
  teachBack?: TeachBackSpec;
}

export interface VillageConcept {
  id: string;
  title: string;
  body: string;
  realWorldExample: string;
  emoji: string;
}

export interface DecisionSimulator {
  title: string;
  intro: string;
  scenario: string;
  meters: OutcomeMeter[];
  rounds: SimulatorRound[];
  endMessage: string;
}

export interface OutcomeMeter {
  id: string;
  label: string;
  emoji: string;
  initial: number; // 0-100
  color: string; // tailwind color (e.g. 'green', 'blue', 'red')
}

export interface SimulatorRound {
  id: string;
  situation: string;
  choices: SimulatorChoice[];
}

export interface SimulatorChoice {
  id: string;
  label: string;
  description: string;
  effects: Record<string, number>; // meterId → delta
  feedback: string;
}

export interface VillageQuizQuestion {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctId: string;
  explanation: string;
}

export type VillageModuleId =
  | 'business-economics'
  | 'ownership'
  | 'language-finance'
  | 'markets-headlines'
  | 'business-foundations'
  | 'company-tinder';

export interface VillageModuleConfig {
  id: VillageModuleId;
  name: string;
  tagline: string;
  buildingEmoji: string;
  bgColor: string;      // tailwind bg class
  textColor: string;    // tailwind text class
  borderColor: string;  // tailwind border class
  ringColor: string;    // tailwind ring class
  lessons: VillageLesson[];
  /** Inner tabs for Business Economics only */
  pathways?: BusinessEconomicsPathwayConfig[];
  /** Company Tinder uses its own swipe UI, not lessons */
  isSwipeGame?: boolean;
}

export const VILLAGE_QUIZ_PASS_THRESHOLD = 0.75;
