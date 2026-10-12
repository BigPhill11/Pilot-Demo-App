import type { TeachBackSpec } from './teach-back';
import type { DecisionSimulator, VillageQuizQuestion } from './village-lesson';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';

export type FounderMissionId =
  | 'idea-to-mvp'
  | 'validating-customers'
  | 'funding-the-business'
  | 'building-the-team'
  | 'problem-discovery'
  | 'design-first-test'
  | 'interview-customers'
  | 'evidence-and-pivots'
  | 'costs-and-cash'
  | 'funding-tradeoffs'
  | 'price-your-offer'
  | 'make-first-sale'
  | 'keep-customers'
  | 'roles-and-expectations'
  | 'healthy-teamwork'
  | 'plan-your-launch'
  | 'measure-and-improve'
  | 'founder-next-step';

export interface FounderSection {
  id: string;
  title: string;
  description: string;
}

export interface FounderModule {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  lessonIds: FounderMissionId[];
}

export type FounderCanvasSectionId =
  | 'idea'
  | 'problem'
  | 'customer'
  | 'solution'
  | 'uniqueValue'
  | 'revenue'
  | 'costs'
  | 'validation'
  | 'nextStep';

export interface FounderComicPanel {
  imageUrl: string;
  alt: string;
  text: string;
  title?: string;
  explanation?: string;
  example?: string;
  takeaway?: string;
}

export interface FounderCanvasPrompt {
  sectionId: FounderCanvasSectionId;
  title: string;
  prompt: string;
  placeholder: string;
  example: string;
}

export interface FounderMission {
  id: FounderMissionId;
  order: number;
  title: string;
  shortTitle: string;
  tagline: string;
  estimatedMinutes: number;
  icon: string;
  comicPanels: FounderComicPanel[];
  simulator: DecisionSimulator;
  quiz: VillageQuizQuestion[];
  teachBack: TeachBackSpec;
  canvasPrompts: FounderCanvasPrompt[];
  rewards: { xp: number; bamboo: number };
  sources?: Array<{ title: string; url: string }>;
}

export interface FounderJourneyProgress {
  completedMissionIds: FounderMissionId[];
  activeMissionId: FounderMissionId | null;
  missionStepById: Partial<Record<FounderMissionId, string>>;
  canvas: Partial<Record<FounderCanvasSectionId, string>>;
  updatedAt: string;
  introCompleted?: boolean;
  teachResults?: Partial<Record<FounderMissionId, TeachPhilResult>>;
}
