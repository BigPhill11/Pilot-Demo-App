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
  unlockRequirements: {
    previousModuleId?: string;
    orTestOutScore: number; // percentage needed to test out (e.g., 85)
  };
  xpReward: number;
  coinReward: number;
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
}

export interface PersonalFinanceProgress {
  userId: string;
  modules: ModuleProgress[];
  totalXpEarned: number;
  totalCoinsEarned: number;
  currentStreak: number;
  lastActivityAt: string;
}
