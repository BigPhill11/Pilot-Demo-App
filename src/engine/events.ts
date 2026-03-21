/**
 * Bamboo Empire Event System
 * 
 * Handles event generation, application, resolution, and XP rewards.
 */

import {
  EventType,
  EVENTS,
  TIMING,
  XP_REWARDS,
  ENERGY,
  getDefenseStats,
  getBuildingStats,
  DefenseType,
} from '@/config/gameConfig';
import type { GameState, Modifier, ActiveEvent, EventLog } from '@/store/useGameStore';

// ============================================
// EVENT GENERATION
// ============================================

/**
 * Generate a unique event ID
 */
export function generateEventId(): string {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Select a random event type based on probabilities
 */
export function selectRandomEventType(): EventType {
  const eventTypes = Object.keys(EVENTS) as EventType[];
  const random = Math.random();
  let cumulative = 0;

  for (const type of eventTypes) {
    cumulative += EVENTS[type].probability;
    if (random < cumulative) {
      return type;
    }
  }

  // Fallback to first event type
  return eventTypes[0];
}

/**
 * Check if an event should trigger based on elapsed time
 * @param lastEventCheck - Last time events were checked
 * @param currentTime - Current timestamp
 * @param intervalMs - Dynamic event interval in ms (from getEconomicEventIntervalMs)
 */
export function shouldTriggerEvent(
  lastEventCheck: number,
  currentTime: number,
  intervalMs?: number
): boolean {
  const elapsed = currentTime - lastEventCheck;
  const interval = intervalMs ?? TIMING.eventIntervalMs;
  return elapsed >= interval;
}

/**
 * Calculate number of catch-up events for offline period
 * @param lastEventCheck - Last time events were checked
 * @param currentTime - Current timestamp
 * @param intervalMs - Dynamic event interval in ms (from getEconomicEventIntervalMs)
 * @param maxCatchUp - Maximum catch-up events (defaults to TIMING.maxCatchUpEvents)
 */
export function calculateCatchUpEvents(
  lastEventCheck: number,
  currentTime: number,
  intervalMs?: number,
  maxCatchUp?: number
): number {
  const elapsed = currentTime - lastEventCheck;
  const interval = intervalMs ?? TIMING.eventIntervalMs;
  const maxEvents = maxCatchUp ?? TIMING.maxCatchUpEvents;
  const possibleEvents = Math.floor(elapsed / interval);
  return Math.min(possibleEvents, maxEvents);
}

/**
 * Generate a new active event
 */
export function generateEvent(): ActiveEvent {
  const type = selectRandomEventType();
  return {
    id: generateEventId(),
    type,
    triggeredAt: Date.now(),
    resolved: false,
  };
}

// ============================================
// EVENT APPLICATION
// ============================================

export interface EventEffect {
  bambooChange: number;
  energyChange: number;
  xpChange: number;
  modifier?: Modifier;
  message: string;
}

/**
 * Calculate the effect of an event based on current state and defenses
 */
export function calculateEventEffect(
  eventType: EventType,
  state: Pick<GameState, 'bamboo' | 'energy' | 'defenses' | 'buildings'>,
  choice?: string
): EventEffect {
  const event = EVENTS[eventType];

  switch (eventType) {
    case 'incomeCut': {
      // Reduce farm output for a duration
      const defense = getDefenseStats('diversificationBarrier', state.defenses.diversificationBarrier);
      const reduction = defense.damageReduction;
      const damagePercent = (event.baseDamage || 40) * (1 - reduction / 100);
      
      const modifier: Modifier = {
        id: generateEventId(),
        type: 'incomeCut',
        value: damagePercent,
        expiresAt: Date.now() + (event.durationMinutes || 5) * 60 * 1000,
        description: `Farm output reduced by ${Math.round(damagePercent)}%`,
      };

      return {
        bambooChange: 0,
        energyChange: 0,
        xpChange: 0, // XP awarded on survival, not immediately
        modifier,
        message: `Income Cut! Farm output reduced by ${Math.round(damagePercent)}% for ${event.durationMinutes} minutes.`,
      };
    }

    case 'unexpectedExpense': {
      // Immediate bamboo loss
      const defense = getDefenseStats('emergencyFund', state.defenses.emergencyFund);
      const reduction = defense.damageReduction;
      const baseLoss = event.baseDamage || 50;
      const actualLoss = Math.round(baseLoss * (1 - reduction / 100));

      return {
        bambooChange: -actualLoss,
        energyChange: 0,
        xpChange: 0,
        message: `Unexpected Expense! Lost ${actualLoss} bamboo.`,
      };
    }

    case 'burnout': {
      // Energy loss and production penalty
      const defense = getDefenseStats('energyShield', state.defenses.energyShield);
      const reduction = defense.damageReduction;
      const baseEnergyLoss = event.baseDamage || 30;
      const actualEnergyLoss = Math.round(baseEnergyLoss * (1 - reduction / 100));

      const modifier: Modifier = {
        id: generateEventId(),
        type: 'damage',
        value: 20, // 20% production penalty
        expiresAt: Date.now() + (event.durationMinutes || 3) * 60 * 1000,
        description: 'Burnout: Production reduced by 20%',
      };

      return {
        bambooChange: 0,
        energyChange: -actualEnergyLoss,
        xpChange: 0,
        modifier,
        message: `Burnout! Lost ${actualEnergyLoss} energy. Production reduced for ${event.durationMinutes} minutes.`,
      };
    }

    case 'opportunity': {
      // Player choice: invest or ignore
      if (choice === 'invest') {
        const investCost = 100;
        if (state.bamboo >= investCost) {
          const modifier: Modifier = {
            id: generateEventId(),
            type: 'productionBoost',
            value: 50, // 50% production boost
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
            description: 'Opportunity: +50% production',
          };

          return {
            bambooChange: -investCost,
            energyChange: 0,
            xpChange: XP_REWARDS.opportunityBonus,
            modifier,
            message: `Invested ${investCost} bamboo. Production boosted by 50% for 5 minutes! +${XP_REWARDS.opportunityBonus} XP`,
          };
        } else {
          return {
            bambooChange: 0,
            energyChange: 0,
            xpChange: 0,
            message: 'Not enough bamboo to invest.',
          };
        }
      } else {
        return {
          bambooChange: 0,
          energyChange: 0,
          xpChange: 0,
          message: 'Opportunity ignored. No effect.',
        };
      }
    }

    case 'comparisonTrap': {
      // Temptation to upgrade Panda House
      if (choice === 'upgrade') {
        // Force upgrade even without meeting requirements (bad decision)
        const currentLevel = state.buildings.pandaHouse;
        const nextLevelStats = getBuildingStats('pandaHouse', currentLevel + 1);
        const cost = nextLevelStats.upgradeCost;

        if (state.bamboo >= cost) {
          return {
            bambooChange: -cost,
            energyChange: 0,
            xpChange: XP_REWARDS.overUpgradePenalty, // Negative XP
            message: `Panda House upgraded impulsively. -${Math.abs(XP_REWARDS.overUpgradePenalty)} XP for poor decision.`,
          };
        } else {
          return {
            bambooChange: 0,
            energyChange: 0,
            xpChange: 0,
            message: 'Not enough bamboo to upgrade.',
          };
        }
      } else {
        return {
          bambooChange: 0,
          energyChange: 0,
          xpChange: XP_REWARDS.disciplineBonus,
          message: `Resisted the comparison trap! +${XP_REWARDS.disciplineBonus} XP for discipline.`,
        };
      }
    }

    default:
      return {
        bambooChange: 0,
        energyChange: 0,
        xpChange: 0,
        message: 'Unknown event.',
      };
  }
}

/**
 * Apply event effect to game state
 * Returns updated state values
 */
export function applyEventEffect(
  state: Pick<GameState, 'bamboo' | 'energy' | 'xp' | 'activeModifiers' | 'buildings'>,
  effect: EventEffect
): {
  bamboo: number;
  energy: number;
  xp: number;
  activeModifiers: Modifier[];
  upgradePandaHouse: boolean;
} {
  const storageCapacity = getBuildingStats('bambooStorage', state.buildings.bambooStorage).capacity || 200;
  
  let newBamboo = Math.max(0, Math.min(state.bamboo + effect.bambooChange, storageCapacity));
  let newEnergy = Math.max(0, Math.min(ENERGY.max, state.energy + effect.energyChange));
  let newXp = Math.max(0, state.xp + effect.xpChange);
  
  const newModifiers = effect.modifier 
    ? [...state.activeModifiers, effect.modifier]
    : state.activeModifiers;

  // Check if this was a comparison trap upgrade choice
  const upgradePandaHouse = effect.message.includes('upgraded impulsively');

  return {
    bamboo: newBamboo,
    energy: newEnergy,
    xp: newXp,
    activeModifiers: newModifiers,
    upgradePandaHouse,
  };
}

// ============================================
// XP REWARD CALCULATION
// ============================================

/**
 * Calculate XP reward for surviving an event
 * Called after event modifier expires or immediate events resolve
 */
export function calculateEventSurvivalXp(
  bambooAfterEvent: number,
  energyAfterEvent: number
): number {
  // Award XP if survived without going negative on bamboo
  // and maintained reasonable energy
  if (bambooAfterEvent > 0 && energyAfterEvent > ENERGY.thresholds.low) {
    return XP_REWARDS.eventSurvival;
  }
  return 0;
}

/**
 * Calculate XP for maintaining high energy over time
 */
export function calculateHighEnergyMaintenanceXp(
  highEnergyCycles: number
): number {
  if (highEnergyCycles >= XP_REWARDS.highEnergyCyclesRequired) {
    return XP_REWARDS.highEnergyMaintenance;
  }
  return 0;
}

/**
 * Check if player is over-upgrading Panda House relative to production
 */
export function isOverUpgradingPandaHouse(
  pandaHouseLevel: number,
  bambooFarmLevel: number
): boolean {
  // Consider it over-upgrading if Panda House is more than 2 levels ahead of farm
  return pandaHouseLevel > bambooFarmLevel + 2;
}

// ============================================
// EVENT LOGGING
// ============================================

/**
 * Create an event log entry
 */
export function createEventLog(
  event: ActiveEvent,
  choice: string | undefined,
  outcome: string,
  xpChange: number
): EventLog {
  return {
    id: event.id,
    type: event.type,
    timestamp: Date.now(),
    choice,
    outcome,
    xpChange,
  };
}

// ============================================
// EVENT UI HELPERS
// ============================================

/**
 * Get display info for an event type
 */
export function getEventDisplayInfo(eventType: EventType): {
  name: string;
  description: string;
  hasChoices: boolean;
  choices?: { id: string; label: string; effect: string }[];
} {
  const event = EVENTS[eventType];
  return {
    name: event.name,
    description: event.description,
    hasChoices: !!event.choices,
    choices: event.choices,
  };
}

/**
 * Get severity color for an event type
 */
export function getEventSeverity(eventType: EventType): 'danger' | 'warning' | 'neutral' | 'positive' {
  switch (eventType) {
    case 'unexpectedExpense':
    case 'burnout':
      return 'danger';
    case 'incomeCut':
    case 'comparisonTrap':
      return 'warning';
    case 'opportunity':
      return 'positive';
    default:
      return 'neutral';
  }
}

/**
 * Get icon name for an event type
 */
export function getEventIcon(eventType: EventType): string {
  switch (eventType) {
    case 'incomeCut':
      return 'TrendingDown';
    case 'unexpectedExpense':
      return 'AlertCircle';
    case 'burnout':
      return 'Battery';
    case 'opportunity':
      return 'Sparkles';
    case 'comparisonTrap':
      return 'Eye';
    default:
      return 'AlertTriangle';
  }
}



