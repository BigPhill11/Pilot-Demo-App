// Economics Curriculum Types for Business Economics

export type EconomicsTrack = 'microeconomics' | 'macroeconomics';

export interface EconomicsFlashcard {
  term: string;
  definition: string;
  philsAnalogy: string;
}

export interface EconomicsQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface CareerInfo {
  title: string;
  description: string;
  salaryRange: string;
  skills: string[];
}

export interface CoreConcept {
  title: string;
  explanation: string;
  example: string;
  keyTerms?: string[];
  pfTip?: string;
  careerTip?: string;
}

export interface EconomicsLesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  intro: {
    hook: string;
    philMessage: string;
  };
  coreConcepts: CoreConcept[];
  personalFinanceConnection: {
    description: string;
    realWorldExample: string;
  };
  flashcards: EconomicsFlashcard[];
  quiz: EconomicsQuizQuestion[];
  careerSpotlight?: CareerInfo;
}

export interface GamifiedActivity {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  rewards: {
    bamboo: number;
    xp: number;
  };
}

export interface EconomicsUnit {
  id: string;
  track: EconomicsTrack;
  title: string;
  description: string;
  icon: string;
  order: number;
  
  coreEconomicsConcepts: string[];
  personalFinanceConnection: {
    description: string;
    relatedPFModules: string[];
  };
  investingConnection: string[];
  careerExposure: CareerInfo[];
  
  lessons: EconomicsLesson[];
  
  gamifiedActivity: GamifiedActivity;
  
  rewards: {
    bamboo: number;
    xp: number;
  };
  
  unlockRequirements: {
    previousUnitId?: string;
  };
}

export type UnitStatus = 'locked' | 'unlocked' | 'active' | 'completed';

export interface UnitProgress {
  unitId: string;
  status: UnitStatus;
  completedLessons: string[];
  currentLessonId?: string;
  gamifiedActivityCompleted: boolean;
  completedAt?: string;
  xpEarned: number;
  bambooEarned: number;
}

export interface EconomicsProgress {
  microeconomics: UnitProgress[];
  macroeconomics: UnitProgress[];
  totalXpEarned: number;
  totalBambooEarned: number;
  lastActivityAt: string;
}

export const INITIAL_ECONOMICS_PROGRESS: EconomicsProgress = {
  microeconomics: [],
  macroeconomics: [],
  totalXpEarned: 0,
  totalBambooEarned: 0,
  lastActivityAt: new Date().toISOString(),
};
