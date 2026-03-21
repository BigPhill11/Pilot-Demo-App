/**
 * Bamboo Empire Game Configuration
 * 
 * All tunable numbers for the game live here.
 * Adjust these values to balance gameplay.
 * 
 * ============================================
 * TUNING GUIDE
 * ============================================
 * 
 * Main knobs to tune:
 * 
 * 1. BUILDINGS (lines ~45-130)
 *    - productionPerHour: How fast players earn bamboo
 *    - capacity: Max bamboo storage (affects hoarding)
 *    - burnRatePerHour: Panda House drain (balances comfort vs cost)
 *    - growthPerHour: Workshop production scaling
 *    - upgradeCost: Bamboo cost to level up
 *    - xpRequired: XP gate for upgrades
 * 
 * 2. DEFENSES (lines ~135-180)
 *    - damageReduction: % reduction of event damage
 *    - Tune these to make defense feel valuable but not overpowered
 * 
 * 3. EVENTS (lines ~185-230)
 *    - probability: Chance each event type triggers (should sum to ~1.0)
 *    - baseDamage: How much damage events deal
 *    - durationMinutes: How long negative effects last
 * 
 * 4. TIMING (lines ~235-255)
 *    - eventIntervalMs: Time between events (default: 12 hours)
 *    - maxCatchUpEvents: Max events on app reopen (default: 3)
 * 
 * 5. ENERGY (lines ~260-295)
 *    - thresholds: Energy levels that affect production
 *    - multipliers: Production multipliers at each energy level
 *    - recoveryCost/recoveryAmount: Energy healing balance
 * 
 * 6. XP_REWARDS (lines ~305-325)
 *    - Adjust these to control how fast XP grows
 *    - XP is the main gate for upgrades
 * 
 * 7. PLATFORM_REWARDS (lines ~330-360)
 *    - How much bamboo/XP players get from platform activities
 *    - This controls how learning feeds into the game
 * 
 * ============================================
 * TEST CHECKLIST
 * ============================================
 * 
 * [ ] New player can earn bamboo over time
 * [ ] Can upgrade Bamboo Farm and Storage
 * [ ] Can trigger and resolve at least 3 different event types
 * [ ] Can use recovery actions (Energy, Repair, Pause)
 * [ ] Consequences from upgrading Panda House too early
 * [ ] Offline progress works and doesn't break state
 * [ ] Platform activities feed bamboo/XP into game
 * [ ] XP increases based on good decisions, not just clicks
 * [ ] State persists across page reload
 * [ ] Game loop feels engaging for 30 minutes
 * 
 */

// ============================================
// TYPES
// ============================================

export type BuildingType = 'bambooFarm' | 'bambooStorage' | 'pandaHouse' | 'workshop';
export type DefenseType = 'emergencyFund' | 'diversificationBarrier' | 'energyShield';
export type EventType = 'incomeCut' | 'unexpectedExpense' | 'burnout' | 'opportunity' | 'comparisonTrap';

export interface BuildingConfig {
  name: string;
  description: string;
  maxLevel: number;
  levels: {
    productionPerHour?: number;
    capacity?: number;
    comfortBonus?: number;
    burnRatePerHour?: number;
    growthPerHour?: number;
    upgradeCost: number;
    xpRequired: number;
  }[];
}

export interface DefenseConfig {
  name: string;
  description: string;
  maxLevel: number;
  levels: {
    damageReduction: number;
    upgradeCost: number;
    xpRequired: number;
  }[];
}

export interface EventConfig {
  name: string;
  description: string;
  probability: number;
  baseDamage?: number;
  durationMinutes?: number;
  choices?: {
    id: string;
    label: string;
    effect: string;
  }[];
}

// ============================================
// BUILDING CONFIGURATIONS
// ============================================

export const BUILDINGS: Record<BuildingType, BuildingConfig> = {
  bambooFarm: {
    name: 'Bamboo Farm',
    description: 'Generates bamboo over time. The foundation of your empire.',
    maxLevel: 10,
    levels: [
      { productionPerHour: 10, upgradeCost: 0, xpRequired: 0 },      // Level 1 (starting)
      { productionPerHour: 18, upgradeCost: 50, xpRequired: 10 },   // Level 2
      { productionPerHour: 30, upgradeCost: 120, xpRequired: 25 },  // Level 3
      { productionPerHour: 45, upgradeCost: 250, xpRequired: 50 },  // Level 4
      { productionPerHour: 65, upgradeCost: 450, xpRequired: 80 },  // Level 5
      { productionPerHour: 90, upgradeCost: 750, xpRequired: 120 }, // Level 6
      { productionPerHour: 120, upgradeCost: 1200, xpRequired: 170 }, // Level 7
      { productionPerHour: 160, upgradeCost: 1800, xpRequired: 230 }, // Level 8
      { productionPerHour: 210, upgradeCost: 2600, xpRequired: 300 }, // Level 9
      { productionPerHour: 280, upgradeCost: 4000, xpRequired: 400 }, // Level 10
    ],
  },

  bambooStorage: {
    name: 'Bamboo Storage',
    description: 'Increases maximum bamboo capacity and reduces event losses.',
    maxLevel: 10,
    levels: [
      { capacity: 200, upgradeCost: 0, xpRequired: 0 },       // Level 1
      { capacity: 400, upgradeCost: 40, xpRequired: 5 },      // Level 2
      { capacity: 700, upgradeCost: 100, xpRequired: 15 },    // Level 3
      { capacity: 1100, upgradeCost: 200, xpRequired: 35 },   // Level 4
      { capacity: 1600, upgradeCost: 350, xpRequired: 60 },   // Level 5
      { capacity: 2200, upgradeCost: 550, xpRequired: 90 },   // Level 6
      { capacity: 3000, upgradeCost: 800, xpRequired: 130 },  // Level 7
      { capacity: 4000, upgradeCost: 1100, xpRequired: 180 }, // Level 8
      { capacity: 5200, upgradeCost: 1500, xpRequired: 240 }, // Level 9
      { capacity: 7000, upgradeCost: 2200, xpRequired: 320 }, // Level 10
    ],
  },

  pandaHouse: {
    name: 'Panda House',
    description: 'Increases comfort but also increases daily bamboo drain.',
    maxLevel: 8,
    levels: [
      { comfortBonus: 0, burnRatePerHour: 0, upgradeCost: 0, xpRequired: 0 },     // Level 1
      { comfortBonus: 5, burnRatePerHour: 3, upgradeCost: 80, xpRequired: 20 },   // Level 2
      { comfortBonus: 12, burnRatePerHour: 8, upgradeCost: 180, xpRequired: 45 }, // Level 3
      { comfortBonus: 20, burnRatePerHour: 15, upgradeCost: 350, xpRequired: 75 }, // Level 4
      { comfortBonus: 30, burnRatePerHour: 25, upgradeCost: 600, xpRequired: 110 }, // Level 5
      { comfortBonus: 42, burnRatePerHour: 40, upgradeCost: 950, xpRequired: 160 }, // Level 6
      { comfortBonus: 55, burnRatePerHour: 60, upgradeCost: 1400, xpRequired: 220 }, // Level 7
      { comfortBonus: 70, burnRatePerHour: 85, upgradeCost: 2000, xpRequired: 300 }, // Level 8
    ],
  },

  workshop: {
    name: 'Workshop',
    description: 'Generates growth slowly at first, stronger at higher levels.',
    maxLevel: 8,
    levels: [
      { growthPerHour: 2, upgradeCost: 0, xpRequired: 0 },       // Level 1
      { growthPerHour: 5, upgradeCost: 60, xpRequired: 15 },     // Level 2
      { growthPerHour: 10, upgradeCost: 150, xpRequired: 35 },   // Level 3
      { growthPerHour: 18, upgradeCost: 300, xpRequired: 65 },   // Level 4
      { growthPerHour: 30, upgradeCost: 500, xpRequired: 100 },  // Level 5
      { growthPerHour: 48, upgradeCost: 800, xpRequired: 150 },  // Level 6
      { growthPerHour: 75, upgradeCost: 1200, xpRequired: 210 }, // Level 7
      { growthPerHour: 120, upgradeCost: 1800, xpRequired: 280 }, // Level 8
    ],
  },
};

// ============================================
// DEFENSE CONFIGURATIONS
// ============================================

export const DEFENSES: Record<DefenseType, DefenseConfig> = {
  emergencyFund: {
    name: 'Emergency Fund',
    description: 'Reduces damage from Unexpected Expense events.',
    maxLevel: 5,
    levels: [
      { damageReduction: 0, upgradeCost: 0, xpRequired: 0 },     // Level 1
      { damageReduction: 15, upgradeCost: 100, xpRequired: 30 }, // Level 2
      { damageReduction: 30, upgradeCost: 250, xpRequired: 70 }, // Level 3
      { damageReduction: 45, upgradeCost: 500, xpRequired: 120 }, // Level 4
      { damageReduction: 60, upgradeCost: 900, xpRequired: 200 }, // Level 5
    ],
  },

  diversificationBarrier: {
    name: 'Diversification Barrier',
    description: 'Reduces damage from Income Cut events.',
    maxLevel: 5,
    levels: [
      { damageReduction: 0, upgradeCost: 0, xpRequired: 0 },     // Level 1
      { damageReduction: 15, upgradeCost: 100, xpRequired: 30 }, // Level 2
      { damageReduction: 30, upgradeCost: 250, xpRequired: 70 }, // Level 3
      { damageReduction: 45, upgradeCost: 500, xpRequired: 120 }, // Level 4
      { damageReduction: 60, upgradeCost: 900, xpRequired: 200 }, // Level 5
    ],
  },

  energyShield: {
    name: 'Energy Shield',
    description: 'Reduces damage from Burnout events.',
    maxLevel: 5,
    levels: [
      { damageReduction: 0, upgradeCost: 0, xpRequired: 0 },     // Level 1
      { damageReduction: 15, upgradeCost: 100, xpRequired: 30 }, // Level 2
      { damageReduction: 30, upgradeCost: 250, xpRequired: 70 }, // Level 3
      { damageReduction: 45, upgradeCost: 500, xpRequired: 120 }, // Level 4
      { damageReduction: 60, upgradeCost: 900, xpRequired: 200 }, // Level 5
    ],
  },
};

// ============================================
// EVENT CONFIGURATIONS
// ============================================

export const EVENTS: Record<EventType, EventConfig> = {
  incomeCut: {
    name: 'Income Cut',
    description: 'Market downturn! Your Bamboo Farm output is reduced.',
    probability: 0.25,
    baseDamage: 40, // % reduction in farm output
    durationMinutes: 5,
  },

  unexpectedExpense: {
    name: 'Unexpected Expense',
    description: 'Emergency repairs needed! Lose bamboo immediately.',
    probability: 0.25,
    baseDamage: 50, // Base bamboo loss
  },

  burnout: {
    name: 'Burnout Event',
    description: 'Your panda is exhausted! Energy drops and production suffers.',
    probability: 0.20,
    baseDamage: 30, // Energy loss
    durationMinutes: 3,
  },

  opportunity: {
    name: 'Opportunity Event',
    description: 'A growth opportunity appears! Invest now for future returns.',
    probability: 0.15,
    choices: [
      { id: 'invest', label: 'Invest 100 Bamboo', effect: '+50% production for 5 minutes' },
      { id: 'ignore', label: 'Ignore', effect: 'No effect' },
    ],
  },

  comparisonTrap: {
    name: 'Comparison Trap',
    description: "Other pandas have fancier homes! Tempted to upgrade?",
    probability: 0.15,
    choices: [
      { id: 'upgrade', label: 'Upgrade Panda House Now', effect: 'Skip XP requirement (bad decision)' },
      { id: 'resist', label: 'Stay Focused', effect: '+5 XP for discipline' },
    ],
  },
};

// ============================================
// GAME TIMING CONFIGURATION
// ============================================

export const TIMING = {
  /** How often events trigger during active play (in milliseconds) */
  eventIntervalMs: 12 * 60 * 60 * 1000, // 12 hours

  /** Maximum catch-up events when reopening the app */
  maxCatchUpEvents: 3,

  /** How often to auto-save state (in milliseconds) */
  autoSaveIntervalMs: 10 * 1000, // 10 seconds

  /** How often to tick the game loop (in milliseconds) */
  tickIntervalMs: 1000, // 1 second

  /** Pause Growth cooldown duration (in milliseconds) */
  pauseGrowthCooldownMs: 2 * 60 * 1000, // 2 minutes

  /** Pause Growth duration (in milliseconds) */
  pauseGrowthDurationMs: 1 * 60 * 1000, // 1 minute
};

// ============================================
// XP-TIER DRIVEN EVENT CADENCE
// ============================================

/**
 * Economic events occur at different intervals based on XP tier.
 * As players gain XP, events become more frequent (12h -> 1h).
 */
export const ECONOMIC_EVENT_TIERS = [
  { minXp: 0, hours: 12 },
  { minXp: 50, hours: 10 },
  { minXp: 120, hours: 8 },
  { minXp: 200, hours: 6 },
  { minXp: 300, hours: 5 },
  { minXp: 450, hours: 4 },
  { minXp: 650, hours: 3 },
  { minXp: 900, hours: 2 },
  { minXp: 1300, hours: 1 },
];

/**
 * Get economic event interval in milliseconds based on current XP
 */
export function getEconomicEventIntervalMs(xp: number): number {
  // Find the highest tier the player qualifies for
  let hours = ECONOMIC_EVENT_TIERS[0].hours;
  for (const tier of ECONOMIC_EVENT_TIERS) {
    if (xp >= tier.minXp) {
      hours = tier.hours;
    } else {
      break;
    }
  }
  return hours * 60 * 60 * 1000;
}

/**
 * Get current XP tier level (0-indexed)
 */
export function getXpTierLevel(xp: number): number {
  let tierLevel = 0;
  for (let i = 0; i < ECONOMIC_EVENT_TIERS.length; i++) {
    if (xp >= ECONOMIC_EVENT_TIERS[i].minXp) {
      tierLevel = i;
    } else {
      break;
    }
  }
  return tierLevel;
}

// ============================================
// ENERGY CONFIGURATION
// ============================================

export const ENERGY = {
  /** Maximum energy value */
  max: 100,

  /** Starting energy */
  starting: 80,

  /** Energy thresholds for production multipliers */
  thresholds: {
    low: 20,     // Below this = 50% production
    medium: 60,  // Below this = 75% production
    // Above medium = 100% production
  },

  /** Production multipliers based on energy level */
  multipliers: {
    low: 0.5,
    medium: 0.75,
    high: 1.0,
  },

  /** Cost to recover energy */
  recoveryCost: 30, // Bamboo cost

  /** Energy restored by recovery action */
  recoveryAmount: 40,

  /** Passive energy drain per hour from working */
  passiveDrainPerHour: 2,

  /** Energy restored per hour while paused */
  pausedRecoveryPerHour: 15,
};

// ============================================
// REPAIR MODE CONFIGURATION
// ============================================

export const REPAIR = {
  /** Cost to remove damage status */
  cost: 50,
};

// ============================================
// XP REWARD CONFIGURATION
// ============================================

export const XP_REWARDS = {
  /** XP for surviving an event without going negative or low energy */
  eventSurvival: 5,

  /** XP for maintaining high energy for multiple cycles */
  highEnergyMaintenance: 3,

  /** XP penalty for over-upgrading Panda House early */
  overUpgradePenalty: -2,

  /** XP for good decision in Comparison Trap */
  disciplineBonus: 5,

  /** XP for taking Opportunity Event (risk-taking) */
  opportunityBonus: 3,

  /** Cycles needed to get high energy maintenance bonus */
  highEnergyCyclesRequired: 3,
};

// ============================================
// PLATFORM INTEGRATION REWARDS
// ============================================

// ============================================
// STREAK MULTIPLIER CONFIGURATION
// ============================================

export const STREAK_CONFIG = {
  /** Days per multiplier tier (e.g., every 7 days = +0.1x) */
  daysPerMultiplierTier: 7,

  /** Multiplier bonus per tier */
  multiplierPerTier: 0.1,

  /** Maximum multiplier cap */
  maxMultiplier: 2.0,
};

// ============================================
// PLATFORM INTEGRATION REWARDS
// ============================================

export const PLATFORM_REWARDS = {
  /** Bamboo earned per lesson completion */
  lessonCompletion: 25,

  /** XP earned per lesson completion */
  lessonXp: 5,

  /** Bamboo earned per quiz correct answer */
  quizCorrect: 10,

  /** XP earned per quiz correct answer */
  quizXp: 2,

  /** Bamboo earned per module completion */
  moduleCompletion: 100,

  /** XP earned per module completion */
  moduleXp: 20,

  /** Bamboo earned per game/activity */
  gameCompletion: 15,

  /** XP earned per game/activity */
  gameXp: 3,

  // ============================================
  // ADAPTIVE FLASHCARDS REWARDS
  // ============================================

  /** Speed Challenge completion */
  speedChallengeComplete: 20,
  speedChallengeXp: 5,

  /** Daily Challenge completion */
  dailyChallengeComplete: 50,
  dailyChallengeXp: 10,

  /** Smart Review session completion */
  smartReviewSession: 15,
  smartReviewXp: 3,


  /** Flashcard mastered */
  cardMastered: 5,
  cardMasteredXp: 1,

  /** Flashcard reviewed */
  cardReviewed: 2,
  cardReviewedXp: 0,

  // ============================================
  // MARKET INTELLIGENCE REWARDS
  // ============================================

  /** Module checkpoint completion */
  miCheckpointComplete: 15,
  miCheckpointXp: 3,

  /** Company Tinder swipe (base) */
  tinderSwipe: 5,
  tinderSwipeXp: 1,

  /** Company Tinder challenge run completion */
  tinderChallengeComplete: 50,
  tinderChallengeXp: 10,

  /** Macro-aware correct decision bonus */
  tinderMacroBonus: 15,
  tinderMacroBonusXp: 3,
};

// ============================================
// IMPROVEMENTS SYSTEM
// ============================================

export type ImprovementCategory = 'permanentBuilding' | 'upgrade' | 'defense' | 'consumable';

export type ImprovementType = 
  // Permanent Buildings
  | 'greenhouseDome'
  | 'irrigationChannels'
  | 'compostYard'
  | 'tradePost'
  | 'researchHut'
  | 'reservoir'
  | 'watchtower'
  // Upgrades
  | 'automationI'
  | 'automationII'
  | 'automationIII'
  | 'diversification'
  | 'hedgingContracts'
  | 'supplyChainBuffer'
  | 'laborTraining'
  // Risk Defenses
  | 'stormReinforcement'
  | 'firebreakLines'
  | 'complianceOffice';

export interface ImprovementConfig {
  name: string;
  description: string;
  category: ImprovementCategory;
  maxLevel: number;
  levels: {
    cost: number;
    xpRequired: number;
    effect: string;
    effectValue: number; // Percentage or flat value
  }[];
  // Optional prerequisites
  prerequisite?: {
    type: 'improvement' | 'building' | 'xp';
    id?: string;
    level?: number;
    value?: number;
  };
}

export const IMPROVEMENTS: Record<ImprovementType, ImprovementConfig> = {
  // ============ PERMANENT BUILDINGS ============
  greenhouseDome: {
    name: 'Greenhouse Dome',
    description: 'Boosts bamboo farm output. Vulnerable to storm events unless reinforced.',
    category: 'permanentBuilding',
    maxLevel: 3,
    levels: [
      { cost: 150, xpRequired: 30, effect: '+15% farm production', effectValue: 15 },
      { cost: 350, xpRequired: 80, effect: '+25% farm production', effectValue: 25 },
      { cost: 700, xpRequired: 150, effect: '+40% farm production', effectValue: 40 },
    ],
  },
  irrigationChannels: {
    name: 'Irrigation Channels',
    description: 'Reduces production loss from drought and flood events.',
    category: 'permanentBuilding',
    maxLevel: 3,
    levels: [
      { cost: 120, xpRequired: 25, effect: '-20% weather event damage', effectValue: 20 },
      { cost: 280, xpRequired: 60, effect: '-35% weather event damage', effectValue: 35 },
      { cost: 550, xpRequired: 120, effect: '-50% weather event damage', effectValue: 50 },
    ],
  },
  compostYard: {
    name: 'Compost Yard',
    description: 'Converts a fraction of burn into passive bamboo recovery.',
    category: 'permanentBuilding',
    maxLevel: 3,
    levels: [
      { cost: 100, xpRequired: 20, effect: 'Recover 10% of burn', effectValue: 10 },
      { cost: 250, xpRequired: 55, effect: 'Recover 20% of burn', effectValue: 20 },
      { cost: 500, xpRequired: 100, effect: 'Recover 30% of burn', effectValue: 30 },
    ],
  },
  tradePost: {
    name: 'Trade Post',
    description: 'Unlocks periodic merchant offers with special deals.',
    category: 'permanentBuilding',
    maxLevel: 2,
    levels: [
      { cost: 200, xpRequired: 40, effect: 'Merchant visits every 8h', effectValue: 8 },
      { cost: 450, xpRequired: 100, effect: 'Merchant visits every 4h', effectValue: 4 },
    ],
  },
  researchHut: {
    name: 'Research Hut',
    description: 'Unlocks policies - choose 1 of 3 buffs each era.',
    category: 'permanentBuilding',
    maxLevel: 2,
    levels: [
      { cost: 250, xpRequired: 50, effect: 'Unlock basic policies', effectValue: 1 },
      { cost: 600, xpRequired: 130, effect: 'Unlock advanced policies', effectValue: 2 },
    ],
  },
  reservoir: {
    name: 'Reservoir',
    description: 'Increases energy recovery and reduces low-energy penalties.',
    category: 'permanentBuilding',
    maxLevel: 3,
    levels: [
      { cost: 130, xpRequired: 30, effect: '+20% energy recovery', effectValue: 20 },
      { cost: 300, xpRequired: 70, effect: '+35% energy recovery', effectValue: 35 },
      { cost: 600, xpRequired: 140, effect: '+50% energy recovery', effectValue: 50 },
    ],
  },
  watchtower: {
    name: 'Watchtower',
    description: 'Small chance to reroll negative events into neutral ones.',
    category: 'permanentBuilding',
    maxLevel: 3,
    levels: [
      { cost: 180, xpRequired: 35, effect: '10% chance to avoid bad events', effectValue: 10 },
      { cost: 400, xpRequired: 85, effect: '18% chance to avoid bad events', effectValue: 18 },
      { cost: 800, xpRequired: 170, effect: '25% chance to avoid bad events', effectValue: 25 },
    ],
  },
  
  // ============ UPGRADES ============
  automationI: {
    name: 'Automation I',
    description: 'Increases baseline efficiency but adds system outage risk.',
    category: 'upgrade',
    maxLevel: 1,
    levels: [
      { cost: 200, xpRequired: 45, effect: '+10% production, +5% outage risk', effectValue: 10 },
    ],
  },
  automationII: {
    name: 'Automation II',
    description: 'Further automation improvements.',
    category: 'upgrade',
    maxLevel: 1,
    levels: [
      { cost: 450, xpRequired: 100, effect: '+20% production, +10% outage risk', effectValue: 20 },
    ],
    prerequisite: { type: 'improvement', id: 'automationI', level: 1 },
  },
  automationIII: {
    name: 'Automation III',
    description: 'Maximum automation with robust failsafes.',
    category: 'upgrade',
    maxLevel: 1,
    levels: [
      { cost: 900, xpRequired: 200, effect: '+30% production, +8% outage risk (optimized)', effectValue: 30 },
    ],
    prerequisite: { type: 'improvement', id: 'automationII', level: 1 },
  },
  diversification: {
    name: 'Diversification',
    description: 'Splits production into multiple sources for resilience.',
    category: 'upgrade',
    maxLevel: 2,
    levels: [
      { cost: 300, xpRequired: 60, effect: 'Max single-event loss capped at 60%', effectValue: 60 },
      { cost: 650, xpRequired: 130, effect: 'Max single-event loss capped at 40%', effectValue: 40 },
    ],
  },
  hedgingContracts: {
    name: 'Hedging Contracts',
    description: 'Pay a premium for temporary event insurance.',
    category: 'upgrade',
    maxLevel: 2,
    levels: [
      { cost: 200, xpRequired: 50, effect: 'Caps downside for 2 hours', effectValue: 2 },
      { cost: 500, xpRequired: 110, effect: 'Caps downside for 4 hours', effectValue: 4 },
    ],
  },
  supplyChainBuffer: {
    name: 'Supply Chain Buffer',
    description: 'Increases storage and reduces event-driven burn spikes.',
    category: 'upgrade',
    maxLevel: 2,
    levels: [
      { cost: 180, xpRequired: 40, effect: '+15% storage, -15% burn spikes', effectValue: 15 },
      { cost: 400, xpRequired: 90, effect: '+30% storage, -30% burn spikes', effectValue: 30 },
    ],
  },
  laborTraining: {
    name: 'Labor Training',
    description: 'Increases energy multiplier thresholds.',
    category: 'upgrade',
    maxLevel: 2,
    levels: [
      { cost: 160, xpRequired: 35, effect: 'High energy bonus at 50% (was 60%)', effectValue: 50 },
      { cost: 380, xpRequired: 80, effect: 'High energy bonus at 40%', effectValue: 40 },
    ],
  },
  
  // ============ RISK DEFENSES ============
  stormReinforcement: {
    name: 'Storm Reinforcement',
    description: 'Halves storm event impact on Greenhouse.',
    category: 'defense',
    maxLevel: 2,
    levels: [
      { cost: 150, xpRequired: 40, effect: '-30% storm damage', effectValue: 30 },
      { cost: 350, xpRequired: 90, effect: '-50% storm damage', effectValue: 50 },
    ],
    prerequisite: { type: 'improvement', id: 'greenhouseDome', level: 1 },
  },
  firebreakLines: {
    name: 'Firebreak Lines',
    description: 'Reduces duration of fire-type events.',
    category: 'defense',
    maxLevel: 2,
    levels: [
      { cost: 140, xpRequired: 35, effect: '-25% fire event duration', effectValue: 25 },
      { cost: 320, xpRequired: 80, effect: '-50% fire event duration', effectValue: 50 },
    ],
  },
  complianceOffice: {
    name: 'Compliance Office',
    description: 'Mitigates regulatory crackdown events.',
    category: 'defense',
    maxLevel: 2,
    levels: [
      { cost: 250, xpRequired: 60, effect: '-30% regulatory penalties', effectValue: 30 },
      { cost: 550, xpRequired: 130, effect: '-50% regulatory penalties', effectValue: 50 },
    ],
    prerequisite: { type: 'xp', value: 100 },
  },
};

/**
 * Get improvement stats for a specific level
 */
export function getImprovementStats(type: ImprovementType, level: number) {
  const improvement = IMPROVEMENTS[type];
  const levelIndex = Math.min(level - 1, improvement.levels.length - 1);
  return level > 0 ? improvement.levels[levelIndex] : null;
}

/**
 * Check if an improvement can be purchased
 */
export function canPurchaseImprovement(
  type: ImprovementType,
  currentLevel: number,
  bamboo: number,
  xp: number,
  ownedImprovements: Record<ImprovementType, number>
): { canPurchase: boolean; reason?: string } {
  const improvement = IMPROVEMENTS[type];
  
  if (currentLevel >= improvement.maxLevel) {
    return { canPurchase: false, reason: 'Max level reached' };
  }
  
  const nextLevel = improvement.levels[currentLevel];
  
  if (bamboo < nextLevel.cost) {
    return { canPurchase: false, reason: `Need ${nextLevel.cost} bamboo` };
  }
  
  if (xp < nextLevel.xpRequired) {
    return { canPurchase: false, reason: `Need ${nextLevel.xpRequired} XP` };
  }
  
  // Check prerequisites
  if (improvement.prerequisite) {
    const prereq = improvement.prerequisite;
    if (prereq.type === 'improvement' && prereq.id) {
      const prereqLevel = ownedImprovements[prereq.id as ImprovementType] || 0;
      if (prereqLevel < (prereq.level || 1)) {
        return { canPurchase: false, reason: `Requires ${IMPROVEMENTS[prereq.id as ImprovementType].name}` };
      }
    }
    if (prereq.type === 'xp' && prereq.value && xp < prereq.value) {
      return { canPurchase: false, reason: `Requires ${prereq.value} XP` };
    }
  }
  
  return { canPurchase: true };
}

// ============================================
// INITIAL GAME STATE
// ============================================

export const INITIAL_STATE = {
  bamboo: 100,
  xp: 0,
  energy: ENERGY.starting,
  buildings: {
    bambooFarm: 1,
    bambooStorage: 1,
    pandaHouse: 1,
    workshop: 1,
  } as Record<BuildingType, number>,
  defenses: {
    emergencyFund: 1,
    diversificationBarrier: 1,
    energyShield: 1,
  } as Record<DefenseType, number>,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get building stats for a specific level
 */
export function getBuildingStats(type: BuildingType, level: number) {
  const building = BUILDINGS[type];
  const levelIndex = Math.min(level - 1, building.levels.length - 1);
  return building.levels[levelIndex];
}

/**
 * Get defense stats for a specific level
 */
export function getDefenseStats(type: DefenseType, level: number) {
  const defense = DEFENSES[type];
  const levelIndex = Math.min(level - 1, defense.levels.length - 1);
  return defense.levels[levelIndex];
}

/**
 * Check if a building can be upgraded
 */
export function canUpgradeBuilding(
  type: BuildingType,
  currentLevel: number,
  bamboo: number,
  xp: number
): { canUpgrade: boolean; reason?: string } {
  const building = BUILDINGS[type];
  
  if (currentLevel >= building.maxLevel) {
    return { canUpgrade: false, reason: 'Max level reached' };
  }
  
  const nextLevel = building.levels[currentLevel];
  
  if (bamboo < nextLevel.upgradeCost) {
    return { canUpgrade: false, reason: `Need ${nextLevel.upgradeCost} bamboo` };
  }
  
  if (xp < nextLevel.xpRequired) {
    return { canUpgrade: false, reason: `Need ${nextLevel.xpRequired} XP` };
  }
  
  return { canUpgrade: true };
}

/**
 * Check if a defense can be upgraded
 */
export function canUpgradeDefense(
  type: DefenseType,
  currentLevel: number,
  bamboo: number,
  xp: number
): { canUpgrade: boolean; reason?: string } {
  const defense = DEFENSES[type];
  
  if (currentLevel >= defense.maxLevel) {
    return { canUpgrade: false, reason: 'Max level reached' };
  }
  
  const nextLevel = defense.levels[currentLevel];
  
  if (bamboo < nextLevel.upgradeCost) {
    return { canUpgrade: false, reason: `Need ${nextLevel.upgradeCost} bamboo` };
  }
  
  if (xp < nextLevel.xpRequired) {
    return { canUpgrade: false, reason: `Need ${nextLevel.xpRequired} XP` };
  }
  
  return { canUpgrade: true };
}

