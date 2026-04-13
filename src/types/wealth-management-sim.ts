/**
 * Wealth Management Career Simulation Types
 * 
 * Types for the multi-year career simulation game that tracks
 * salary, skills, work-life balance, productivity, and fatigue.
 */

export interface WMSimMeters {
  salary: number;
  investmentKnowledge: number;
  clientRelations: number;
  technicalAnalysis: number;
  workLifeBalance: number;
  productivity: number;
  fatigue: number;
}

export interface WMSimMeterChanges {
  salary?: number;
  investmentKnowledge?: number;
  clientRelations?: number;
  technicalAnalysis?: number;
  workLifeBalance?: number;
  productivity?: number;
  fatigue?: number;
}

export type WMCareerTitle = 
  | 'Junior Advisor'
  | 'Associate Advisor'
  | 'Senior Advisor'
  | 'Managing Director'
  | 'Work-Life Champion';

export interface WMDecisionOption {
  id: string;
  label: string;
  description: string;
  meterChanges: WMSimMeterChanges;
  feedback: string;
  philInsight?: string;
}

export interface WMDecision {
  id: string;
  title: string;
  situation: string;
  context?: string;
  options: WMDecisionOption[];
}

export interface WMRandomEvent {
  id: string;
  title: string;
  description: string;
  meterChanges: WMSimMeterChanges;
  philComment: string;
}

export interface WMYearConfig {
  year: number;
  title: WMCareerTitle;
  salaryRange: { min: number; max: number };
  openingNarrative: string;
  decisions: WMDecision[];
  possibleEvents: WMRandomEvent[];
  yearEndReview: string;
  promotionThreshold?: {
    requiredSkillsAvg: number;
    requiredProductivity: number;
    maxFatigue: number;
  };
}

export interface WMScenario {
  id: string;
  category: 'client' | 'market' | 'career' | 'worklife';
  title: string;
  situation: string;
  context: string;
  options: WMDecisionOption[];
  learningPoint: string;
}

export interface WMDecisionLog {
  yearNumber: number;
  decisionId: string;
  chosenOptionId: string;
  timestamp: number;
}

export interface WMSimState {
  currentYear: number;
  currentPhase: 'overview' | 'comic' | 'year-intro' | 'decisions' | 'event' | 'year-review' | 'scenarios' | 'completion';
  meters: WMSimMeters;
  meterHistory: WMSimMeters[];
  currentTitle: WMCareerTitle;
  decisionLog: WMDecisionLog[];
  currentDecisionIndex: number;
  currentEventIndex: number;
  triggeredEvents: string[];
  scenariosCompleted: string[];
  achievements: string[];
  startedAt: number;
  completedAt?: number;
}

export interface WMComicPanel {
  id: string;
  imageUrl: string;
  imageFallbackUrl: string;
  caption: string;
  philDialogue: string;
  panelStyle?: 'normal' | 'wide' | 'tall' | 'splash';
}

export interface WMSimEnding {
  id: string;
  title: string;
  description: string;
  finalTitle: WMCareerTitle;
  conditions: (state: WMSimState) => boolean;
  bambooReward: number;
  xpReward: number;
}

export const INITIAL_WM_METERS: WMSimMeters = {
  salary: 65000,
  investmentKnowledge: 30,
  clientRelations: 25,
  technicalAnalysis: 20,
  workLifeBalance: 70,
  productivity: 60,
  fatigue: 10,
};

export const INITIAL_WM_STATE: WMSimState = {
  currentYear: 1,
  currentPhase: 'overview',
  meters: { ...INITIAL_WM_METERS },
  meterHistory: [{ ...INITIAL_WM_METERS }],
  currentTitle: 'Junior Advisor',
  decisionLog: [],
  currentDecisionIndex: 0,
  currentEventIndex: 0,
  triggeredEvents: [],
  scenariosCompleted: [],
  achievements: [],
  startedAt: Date.now(),
};
