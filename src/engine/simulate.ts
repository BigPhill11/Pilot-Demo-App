/**
 * Bamboo Empire Simulation Engine
 * 
 * Pure functions for simulating game ticks, calculating production,
 * burn rates, and energy effects.
 */

import {
  BuildingType,
  ENERGY,
  TIMING,
  getBuildingStats,
} from '@/config/gameConfig';
import type { Modifier } from '@/store/useGameStore';

// ============================================
// TYPES
// ============================================

export interface SimulationInput {
  bamboo: number;
  energy: number;
  buildings: Record<BuildingType, number>;
  activeModifiers: Modifier[];
  isPaused: boolean;
  pauseStartedAt: number | null;
  highEnergyCycles: number;
}

export interface SimulationResult {
  bamboo: number;
  energy: number;
  activeModifiers: Modifier[];
  isPaused: boolean;
  pauseStartedAt: number | null;
  highEnergyCycles: number;
}

// ============================================
// PRODUCTION CALCULATIONS
// ============================================

/**
 * Calculate production per hour based on buildings and modifiers
 */
export function calculateProductionPerHour(
  buildings: Record<BuildingType, number>,
  activeModifiers: Modifier[],
  energyMultiplier: number
): number {
  // Get base production from Bamboo Farm
  const farmStats = getBuildingStats('bambooFarm', buildings.bambooFarm);
  let farmProduction = farmStats.productionPerHour || 0;

  // Get growth from Workshop
  const workshopStats = getBuildingStats('workshop', buildings.workshop);
  const workshopProduction = workshopStats.growthPerHour || 0;

  // Apply income cut modifier
  const incomeCutModifier = activeModifiers.find(m => m.type === 'incomeCut');
  if (incomeCutModifier) {
    farmProduction *= (1 - incomeCutModifier.value / 100);
  }

  // Apply production boost modifier
  const boostModifier = activeModifiers.find(m => m.type === 'productionBoost');
  if (boostModifier) {
    farmProduction *= (1 + boostModifier.value / 100);
  }

  // Apply energy multiplier
  const totalProduction = (farmProduction + workshopProduction) * energyMultiplier;

  return Math.round(totalProduction * 10) / 10;
}

/**
 * Calculate burn rate per hour based on Panda House level
 */
export function calculateBurnRatePerHour(
  buildings: Record<BuildingType, number>
): number {
  const pandaHouseStats = getBuildingStats('pandaHouse', buildings.pandaHouse);
  return pandaHouseStats.burnRatePerHour || 0;
}

/**
 * Calculate storage capacity based on Bamboo Storage level
 */
export function calculateStorageCapacity(
  buildings: Record<BuildingType, number>
): number {
  const storageStats = getBuildingStats('bambooStorage', buildings.bambooStorage);
  return storageStats.capacity || 200;
}

/**
 * Get energy multiplier based on current energy level
 */
export function getEnergyMultiplier(energy: number): number {
  if (energy < ENERGY.thresholds.low) {
    return ENERGY.multipliers.low;
  }
  if (energy < ENERGY.thresholds.medium) {
    return ENERGY.multipliers.medium;
  }
  return ENERGY.multipliers.high;
}

// ============================================
// SIMULATION
// ============================================

/**
 * Run a simulation tick for the given elapsed time
 * 
 * This is a pure function that takes the current state and elapsed time,
 * and returns the new state. It does not modify the input.
 * 
 * @param input - Current simulation state
 * @param elapsedMs - Elapsed time in milliseconds
 * @param currentTime - Current timestamp (for modifier expiration)
 */
export function simulate(
  input: SimulationInput,
  elapsedMs: number,
  currentTime: number
): SimulationResult {
  const hours = elapsedMs / (1000 * 60 * 60);

  // Remove expired modifiers
  const activeModifiers = input.activeModifiers.filter(m => m.expiresAt > currentTime);

  // Get energy multiplier
  const energyMultiplier = getEnergyMultiplier(input.energy);

  // Calculate production and burn rate
  let production = calculateProductionPerHour(input.buildings, activeModifiers, energyMultiplier) * hours;
  let burnRate = calculateBurnRatePerHour(input.buildings) * hours;
  const capacity = calculateStorageCapacity(input.buildings);

  // Apply pause effects
  let isPaused = input.isPaused;
  let pauseStartedAt = input.pauseStartedAt;

  if (isPaused) {
    production = 0;
    burnRate = 0;
  }

  // Calculate energy changes
  let energyChange = 0;
  if (isPaused) {
    // Recover energy while paused
    energyChange = ENERGY.pausedRecoveryPerHour * hours;
  } else {
    // Drain energy while working
    energyChange = -(ENERGY.passiveDrainPerHour * hours);
  }

  // Check if pause should end
  if (isPaused && pauseStartedAt && (currentTime - pauseStartedAt >= TIMING.pauseGrowthDurationMs)) {
    isPaused = false;
    pauseStartedAt = null;
  }

  // Update bamboo (production - burn, capped at capacity)
  let newBamboo = input.bamboo + production - burnRate;
  newBamboo = Math.max(0, Math.min(newBamboo, capacity));

  // Update energy (capped at 0-100)
  let newEnergy = input.energy + energyChange;
  newEnergy = Math.max(0, Math.min(ENERGY.max, newEnergy));

  // Track high energy cycles
  let highEnergyCycles = input.highEnergyCycles;
  if (newEnergy > ENERGY.thresholds.medium) {
    highEnergyCycles++;
  } else {
    highEnergyCycles = 0;
  }

  return {
    bamboo: newBamboo,
    energy: newEnergy,
    activeModifiers,
    isPaused,
    pauseStartedAt,
    highEnergyCycles,
  };
}

/**
 * Calculate net production (production - burn rate) per hour
 */
export function calculateNetProductionPerHour(
  buildings: Record<BuildingType, number>,
  activeModifiers: Modifier[],
  energy: number
): number {
  const energyMultiplier = getEnergyMultiplier(energy);
  const production = calculateProductionPerHour(buildings, activeModifiers, energyMultiplier);
  const burnRate = calculateBurnRatePerHour(buildings);
  return production - burnRate;
}

/**
 * Project bamboo amount after a given time
 */
export function projectBambooAfter(
  input: SimulationInput,
  hoursAhead: number
): number {
  const result = simulate(input, hoursAhead * 60 * 60 * 1000, Date.now() + hoursAhead * 60 * 60 * 1000);
  return result.bamboo;
}



