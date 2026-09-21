// Personal Finance Module Types

export interface PersonalFinanceFlashcard {
  term: string;
  definition: string;
  philsAnalogy: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

/**
 * A concept-check question asked in identical form at the start and end of a
 * module, so the two answers are directly comparable. `id` ties a student's
 * "before" answer to their "after" answer for the same concept.
 */
export interface AnchorQuestion extends QuizQuestion {
  id: string;
}

export interface DecisionScenarioChoice {
  id: string;
  label: string;
  /** Author-assigned quality of this choice, 0-100. Not shown to the student. */
  optimality: number;
}

/**
 * A single lightweight "what would you do?" scenario shown at both the start
 * and end of a module, used to gauge whether a student's decision-making
 * improved (not just their recall).
 */
export interface DecisionScenario {
  id: string;
  prompt: string;
  choices: DecisionScenarioChoice[];
}

/**
 * Optional, invisible-to-the-student growth check for a module: a handful of
 * anchor questions plus one decision scenario, asked once as a "warm-up"
 * before the first lesson and again as a "wrap-up" after the last lesson.
 * Modules without this field simply never show a warm-up/wrap-up step.
 */
export interface ModuleGrowthCheck {
  anchorQuestions: AnchorQuestion[];
  decisionScenario: DecisionScenario;
}

export interface SimulatorScenario {
  id: string;
  title: string;
  description: string;
  choices: SimulatorChoice[];
}

export interface SimulatorChoice {
  id: string;
  label: string;
  outcome: SimulatorOutcome;
}

export interface SimulatorOutcome {
  incomeChange: number;
  fatigueChange: number;
  freeTimeChange: number;
  skillChange: number;
  feedback: string;
}

export interface SimulatorGameConfig {
  title: string;
  description: string;
  initialState: SimulatorState;
  scenarios: SimulatorScenario[];
  winCondition: {
    minIncome: number;
    maxFatigue: number;
  };
}

export interface SimulatorState {
  weeklyIncome: number;
  hourlyWage: number;
  workHours: number;
  fatigue: number;
  freeTime: number;
  skillLevel: number;
}

export interface Lesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  moduleOverview: string;
  realityHook: string;
  outcomePreview: string;
  microLesson: string;
  flashcards: PersonalFinanceFlashcard[];
  simulatorGame: SimulatorGameConfig;
  miniReflection: {
    question: string;
    followUp?: string;
  };
  quiz: QuizQuestion[];
  powerMove: string;
  realLifeAction: string;
}

export interface PersonalFinanceModule {
  id: string;
  name: string;
  pillar: string;
  icon: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  testOutQuestions: QuizQuestion[];
  /** Invisible pre/post growth check. Absent on modules that don't have one yet. */
  growthCheck?: ModuleGrowthCheck;
  unlockRequirements: {
    previousModuleId?: string;
    orTestOutScore: number; // percentage needed to test out (e.g., 85)
  };
  xpReward: number;
  coinReward: number;
}

/** One answered anchor question, ready to send to `record_module_growth_check`. */
export interface GrowthCheckAnswer {
  anchor_id: string;
  selected_index: number;
  correct: boolean;
  confidence: number; // 0-100
}

export interface GrowthCheckDecision {
  scenario_id: string;
  choice_id: string;
  optimality: number; // 0-100
}

/** Full payload for one warm-up (baseline) or wrap-up (final) growth check. */
export interface GrowthCheckPayload {
  captured_at: string;
  answers: GrowthCheckAnswer[];
  decision: GrowthCheckDecision;
}

export type ModuleStatus = 'locked' | 'unlocked' | 'active' | 'completed';

export interface ModuleProgress {
  moduleId: string;
  status: ModuleStatus;
  completedLessons: string[];
  currentLessonId?: string;
  testOutScore?: number;
  testedOut: boolean;
  completedAt?: string;
  xpEarned: number;
  coinsEarned: number;
  bossGameCompleted?: boolean;
  bossGamePlayCount?: number;
  /** Whether this module's quiet warm-up/wrap-up growth check has already been recorded. */
  growthBaselineRecorded?: boolean;
  growthFinalRecorded?: boolean;
}

export interface PersonalFinanceProgress {
  userId: string;
  modules: ModuleProgress[];
  totalXpEarned: number;
  totalCoinsEarned: number;
  currentStreak: number;
  lastActivityAt: string;
}
