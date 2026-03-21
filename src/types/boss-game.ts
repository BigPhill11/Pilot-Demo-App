// Boss Game Types for Panda's First Paycheck

export interface GameMeters {
  income: number;           // 0-100: Weekly bamboo coins earned
  hourlyValue: number;      // 0-100: Pay per hour of work
  energy: number;           // 0-100: Physical/mental capacity
  replaceability: number;   // 0-100: How easily replaced (lower is better)
  optionality: number;      // 0-100: Future paths available
}

export interface MeterChange {
  income?: number;
  hourlyValue?: number;
  energy?: number;
  replaceability?: number;
  optionality?: number;
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  meterChanges: MeterChange;
  storyResponse: string;
  unlocks?: string[];       // Unlocks future options or paths
  requires?: string[];      // Required previous unlocks
}

export interface MonthDecision {
  id: string;
  category: 'work' | 'skill' | 'negotiation' | 'money';
  title: string;
  description: string;
  pandaDialogue?: string;
  options: DecisionOption[];
  conditionalText?: {
    condition: (meters: GameMeters, unlocks: string[]) => boolean;
    text: string;
  };
}

export interface GameMonth {
  month: number;
  title: string;
  openingNarration: string;
  decisions: MonthDecision[];
  closingNarration: string;
  specialEvents?: {
    condition: (meters: GameMeters, unlocks: string[]) => boolean;
    event: string;
  }[];
}

export interface GameEnding {
  id: string;
  title: string;
  description: string;
  trajectory: 'stuck' | 'growing' | 'burnout' | 'momentum' | 'balanced';
  futureSnapshot: string;
  conditions: (meters: GameMeters, unlocks: string[]) => boolean;
}

export interface BossGameState {
  currentMonth: number;
  meters: GameMeters;
  decisions: Record<string, string>;  // decisionId -> optionId
  unlocks: string[];
  isComplete: boolean;
  ending?: GameEnding;
  playerName: string;
}

export interface BossGameConfig {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  description: string;
  initialMeters: GameMeters;
  months: GameMonth[];
  endings: GameEnding[];
  totalMonths: number;
}
