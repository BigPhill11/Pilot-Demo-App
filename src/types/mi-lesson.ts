/**
 * Market Intelligence standardized lesson types (v1).
 * Used by Language of Finance and future MI module migrations.
 */

import type {
  CoreConcept,
  EconomicsFlashcard,
  EconomicsQuizQuestion,
  CareerInfo,
} from '@/types/economics-curriculum';

export interface LessonVisual {
  src: string;
  alt: string;
  caption?: string;
}

export type MILessonTryType =
  | 'role-match'
  | 'line-item-sort'
  | 'term-classify'
  | 'scenario-choice'
  | 'compound-compare'
  | 'headline-decoder'
  | 'slider-budget';

export interface RoleMatchRole {
  id: string;
  name: string;
  description: string;
}

export interface RoleMatchScenario {
  id: string;
  description: string;
  correctRoleId: string;
}

export interface LineItemSortItem {
  id: string;
  label: string;
  correctBucket: string;
}

export interface LineItemSortBucket {
  id: string;
  label: string;
}

export interface TermClassifyItem {
  id: string;
  label: string;
  correctCategory: string;
}

export interface ScenarioChoiceOption {
  id: string;
  label: string;
  feedback: string;
}

export interface ScenarioChoiceRound {
  id: string;
  prompt: string;
  options: ScenarioChoiceOption[];
}

export interface HeadlineDecoderHeadline {
  id: string;
  text: string;
  /** The phrase in the headline that justifies the call */
  signalPhrase: string;
  correctCall: 'signal' | 'noise';
  feedback: string;
}

export interface SliderBudgetCategory {
  id: string;
  label: string;
  description: string;
}

export interface SliderBudgetScenario {
  id: string;
  prompt: string;
  /** Optimal allocation per category (values sum to 100) */
  optimalAllocation: Record<string, number>;
  feedback: string;
}

export interface MILessonTryActivity {
  type: MILessonTryType;
  title: string;
  description: string;
  /** Role match */
  roles?: RoleMatchRole[];
  scenarios?: RoleMatchScenario[];
  /** Line item sort */
  buckets?: LineItemSortBucket[];
  items?: LineItemSortItem[];
  /** Term classify */
  categories?: { id: string; label: string }[];
  terms?: TermClassifyItem[];
  /** Scenario choice (low-stakes, any completion advances) */
  rounds?: ScenarioChoiceRound[];
  /** Compound compare — optional defaults for interactive chart */
  defaultStartAge?: number;
  defaultMonthly?: number;
  annualReturnRate?: number;
  retirementAge?: number;
  /** Headline decoder */
  headlines?: HeadlineDecoderHeadline[];
  /** Slider budget */
  sliderCategories?: SliderBudgetCategory[];
  sliderScenarios?: SliderBudgetScenario[];
}

export interface MILessonConnect {
  personalFinance: {
    title: string;
    description: string;
    scenario: string;
    visual: LessonVisual;
  };
  career: {
    title: string;
    description: string;
    role: string;
    skills: string[];
    visual: LessonVisual;
  };
}

export type MILessonSection =
  | 'language-finance'
  | 'ownership'
  | 'markets-headlines'
  | 'business-foundations'
  | 'businesses-competition';

export interface MILesson {
  id: string;
  moduleId: string;
  section?: MILessonSection;
  title: string;
  estimatedMinutes: number;
  intro: {
    hook: string;
    philMessage: string;
    heroImage: LessonVisual;
  };
  coreConcepts: (CoreConcept & { visual: LessonVisual })[];
  tryActivity: MILessonTryActivity;
  connect: MILessonConnect;
  flashcards: EconomicsFlashcard[];
  quiz: EconomicsQuizQuestion[];
  rewards?: { bamboo: number; xp: number };
}

export const MI_QUIZ_PASS_THRESHOLD = 0.75;

export function quizPassed(score: number, total: number): boolean {
  if (total === 0) return true;
  return score / total >= MI_QUIZ_PASS_THRESHOLD;
}
