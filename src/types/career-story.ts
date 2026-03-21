export interface CareerStory {
  id: string;
  title: string;
  description: string;
  careerType: 'investment-banking' | 'private-equity' | 'management-consulting' | 'venture-capital' | 'hedge-fund' | 'corporate-finance' | 'wealth-management' | 'commercial-banking' | 'sales-trading' | 'asset-management';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  chapters: StoryChapter[];
  decisions: Decision[];
  initialMetrics: StoryMetrics;
  endings: StoryEnding[];
  icon: React.ComponentType<any>;
}

export interface StoryChapter {
  id: string;
  title: string;
  content: string;
  decisionId?: string;
  toolId?: string;
  imageUrl?: string;
}

export interface Decision {
  id: string;
  chapterIndex: number;
  prompt: string;
  context: string;
  options: DecisionOption[];
  timeLimit?: number; // seconds, optional
  toolRequired?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  description?: string;
  timeImpact?: number;
  relationshipImpact?: { [character: string]: number };
  technicalScore?: number; // 0-100
  stressImpact?: number;
  nextChapterIndex: number;
  consequence: Consequence;
}

export interface Consequence {
  feedbackText: string;
  positiveAspects: string[];
  negativeAspects: string[];
  careerInsight: string;
  philsComment: string;
  scoreImpact: {
    technicalSkill?: number;
    timeManagement?: number;
    relationships?: { [character: string]: number };
    stressLevel?: number;
  };
}

export interface StoryMetrics {
  technicalSkill: number;
  timeManagement: number;
  relationships: { [character: string]: number };
  stressLevel: number;
}

export interface StoryEnding {
  id: string;
  title: string;
  description: string;
  requiredScore: number;
  badgeUnlocked?: string;
}

export interface StoryProgress {
  storyId: string;
  userId?: string;
  currentChapterIndex: number;
  decisionsHistory: DecisionHistory[];
  currentMetrics: StoryMetrics;
  completed: boolean;
  starsEarned?: number;
  badgesEarned: string[];
  completedAt?: string;
  timeSpentMinutes: number;
}

export interface DecisionHistory {
  decisionId: string;
  optionId: string;
  timestamp: string;
  metricsAtTime: StoryMetrics;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export const STORY_BADGES: Badge[] = [
  {
    id: 'cool-under-pressure',
    name: 'Cool Under Pressure',
    description: 'Complete any story with stress level below 50%',
    icon: '🧊',
    requirement: 'stressLevel < 50'
  },
  {
    id: 'people-person',
    name: 'People Person',
    description: 'Maintain all relationships above 70%',
    icon: '🤝',
    requirement: 'allRelationships > 70'
  },
  {
    id: 'technical-wizard',
    name: 'Technical Wizard',
    description: 'Score above 90% on technical decisions',
    icon: '🧙‍♂️',
    requirement: 'technicalSkill > 90'
  },
  {
    id: 'balanced-leader',
    name: 'Balanced Leader',
    description: 'Earn 4+ stars on any story',
    icon: '⚖️',
    requirement: 'stars >= 4'
  },
  {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    description: 'Complete all time-sensitive decisions in under 30 seconds',
    icon: '⚡',
    requirement: 'allTimedDecisions < 30s'
  },
  {
    id: 'deal-maker',
    name: 'Deal Maker',
    description: 'Complete Investment Banking story with 5 stars',
    icon: '🏆',
    requirement: 'ib-story && stars === 5'
  },
  {
    id: 'investor-extraordinaire',
    name: 'Investor Extraordinaire',
    description: 'Complete Private Equity story with 5 stars',
    icon: '💎',
    requirement: 'pe-story && stars === 5'
  },
  {
    id: 'problem-solver',
    name: 'Problem Solver',
    description: 'Complete Consulting story with 5 stars',
    icon: '🔍',
    requirement: 'consulting-story && stars === 5'
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description: 'Complete all 3 priority career stories',
    icon: '📚',
    requirement: 'completedStories >= 3'
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Earn 5 stars on all 3 priority stories',
    icon: '✨',
    requirement: 'all5Stars'
  }
];
