// Boss game registry - maps module IDs to their boss game configs
import { BossGameConfig } from '@/types/boss-game';
import { pandasFirstPaycheckGame } from './pandas-first-paycheck';
import { pandasGoalCompassGame } from './pandas-goal-compass';
import { cashFlowStressTestGame } from './cash-flow-stress-test';
import { theLongGameBossGame } from './the-long-game';
import { theShieldBuilderBossGame } from './the-shield-builder-standard';
import { theTaxStrategistBossGame } from './the-tax-strategist';
import { theCreditArchitectBossGame } from './the-credit-architect';
import { theCareerArchitectBossGame } from './the-career-architect';
import { theWealthBuilderBossGame } from './the-wealth-builder';

export interface BossGameInfo {
  config: BossGameConfig;
  title: string;
  emoji: string;
  description: string;
  xpReward: number;
  coinReward: number;
  // For custom game components (like Shield Builder)
  isCustomComponent?: boolean;
}

// Map module IDs to their boss games
export const BOSS_GAMES_BY_MODULE: Record<string, BossGameInfo> = {
  'income': {
    config: pandasFirstPaycheckGame,
    title: "Panda's First Paycheck",
    emoji: '🐼',
    description: 'Interactive 6-month story simulator • Branching decisions',
    xpReward: 150,
    coinReward: 25,
  },
  'financial-planning': {
    config: pandasGoalCompassGame,
    title: "Panda's Goal Compass",
    emoji: '🧭',
    description: 'Navigate your financial goals • Set priorities and track progress',
    xpReward: 150,
    coinReward: 25,
  },
  'saving': {
    config: cashFlowStressTestGame,
    title: 'Cash Flow Stress Test',
    emoji: '💰',
    description: 'Survive financial emergencies • Build resilience habits',
    xpReward: 150,
    coinReward: 25,
  },
  'investing': {
    config: theLongGameBossGame,
    title: 'The Long Game',
    emoji: '📈',
    description: '5-year investment journey • Test your patience and discipline',
    xpReward: 150,
    coinReward: 30,
  },
  'insurance': {
    config: theShieldBuilderBossGame,
    title: 'The Shield Builder',
    emoji: '🛡️',
    description: '6-month protection journey • Build your financial defenses',
    xpReward: 150,
    coinReward: 30,
  },
  'taxes': {
    config: theTaxStrategistBossGame,
    title: 'The Tax Strategist',
    emoji: '📋',
    description: '5-year tax journey • Master the tax system',
    xpReward: 150,
    coinReward: 75,
  },
  'credit-debt': {
    config: theCreditArchitectBossGame,
    title: 'The Credit Architect',
    emoji: '💳',
    description: '5-year credit building • From invisible to 780+ score',
    xpReward: 150,
    coinReward: 75,
  },
  'career-income': {
    config: theCareerArchitectBossGame,
    title: 'The Career Architect',
    emoji: '🚀',
    description: '10-year career simulation • Build your income engine',
    xpReward: 200,
    coinReward: 100,
  },
  'wealth-fundamentals': {
    config: theWealthBuilderBossGame,
    title: 'The Wealth Builder',
    emoji: '💎',
    description: '20-year wealth journey • True financial independence',
    xpReward: 250,
    coinReward: 125,
  },
};

export function getBossGameForModule(moduleId: string): BossGameInfo | null {
  return BOSS_GAMES_BY_MODULE[moduleId] || null;
}
