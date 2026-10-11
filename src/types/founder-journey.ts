import type { TeachBackSpec } from './teach-back';
import type { DecisionSimulator, VillageQuizQuestion } from './village-lesson';

export type FounderMissionId =
  | 'idea-to-mvp'
  | 'validating-customers'
  | 'funding-the-business'
  | 'building-the-team';

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
}

export interface FounderJourneyProgress {
  completedMissionIds: FounderMissionId[];
  activeMissionId: FounderMissionId | null;
  missionStepById: Partial<Record<FounderMissionId, string>>;
  canvas: Partial<Record<FounderCanvasSectionId, string>>;
  updatedAt: string;
}
