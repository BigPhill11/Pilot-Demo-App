/**
 * Economics Simulator Types
 * 
 * Types for interactive economics simulations that accompany each unit.
 * Each unit has a themed simulator that lets students apply concepts.
 */

export type EconomicsSimulatorId =
  | 'micro-1-market-sim'      // Supply & Demand: Market Price Simulator
  | 'micro-2-elasticity-sim'  // Elasticity: Price Sensitivity Lab
  | 'micro-3-utility-sim'     // Consumer Choice: Budget Optimizer
  | 'micro-4-market-power-sim'// Market Structures: Competition Arena
  | 'micro-5-policy-sim'      // Market Failures: Policy Workshop
  | 'macro-1-gdp-sim'         // GDP: Economy Builder
  | 'macro-2-jobs-sim'        // Unemployment: Job Market Sim
  | 'macro-3-inflation-sim'   // Inflation: Purchasing Power Lab
  | 'macro-4-fed-sim'         // Monetary Policy: Fed Chair Sim
  | 'macro-5-fiscal-sim';     // Fiscal Policy: Budget Director

export interface SimulatorMeter {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  color: 'green' | 'blue' | 'amber' | 'red' | 'purple';
  icon?: string;
}

export interface SimulatorDecisionOption {
  id: string;
  label: string;
  description: string;
  meterChanges: Record<string, number>;
  feedback: string;
  philInsight?: string;
}

export interface SimulatorDecision {
  id: string;
  title: string;
  scenario: string;
  context?: string;
  options: SimulatorDecisionOption[];
  conceptConnection: string;
}

export interface SimulatorRound {
  roundNumber: number;
  title: string;
  narrative: string;
  decisions: SimulatorDecision[];
  roundSummary: string;
}

export interface SimulatorConfig {
  id: EconomicsSimulatorId;
  unitId: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  introNarrative: string;
  philIntro: string;
  
  initialMeters: SimulatorMeter[];
  rounds: SimulatorRound[];
  
  completionThresholds: {
    excellent: Record<string, { min?: number; max?: number }>;
    good: Record<string, { min?: number; max?: number }>;
    passing: Record<string, { min?: number; max?: number }>;
  };
  
  endings: {
    excellent: {
      title: string;
      description: string;
      philMessage: string;
    };
    good: {
      title: string;
      description: string;
      philMessage: string;
    };
    passing: {
      title: string;
      description: string;
      philMessage: string;
    };
    needsWork: {
      title: string;
      description: string;
      philMessage: string;
    };
  };
  
  rewards: {
    bamboo: number;
    xp: number;
  };
}

export interface SimulatorState {
  simulatorId: EconomicsSimulatorId;
  currentRound: number;
  currentDecisionIndex: number;
  phase: 'intro' | 'round-intro' | 'decision' | 'round-summary' | 'completion';
  meters: Record<string, number>;
  meterHistory: Record<string, number>[];
  decisions: {
    roundNumber: number;
    decisionId: string;
    optionId: string;
    timestamp: number;
  }[];
  startedAt: number;
  completedAt?: number;
}

export interface SimulatorProgress {
  simulatorId: EconomicsSimulatorId;
  completed: boolean;
  bestEnding?: 'excellent' | 'good' | 'passing' | 'needsWork';
  attempts: number;
  lastAttemptAt?: string;
  bambooEarned: number;
  xpEarned: number;
}

export const INITIAL_SIMULATOR_STATE = (config: SimulatorConfig): SimulatorState => ({
  simulatorId: config.id,
  currentRound: 1,
  currentDecisionIndex: 0,
  phase: 'intro',
  meters: config.initialMeters.reduce((acc, m) => ({ ...acc, [m.id]: m.value }), {}),
  meterHistory: [],
  decisions: [],
  startedAt: Date.now(),
});
