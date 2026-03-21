/**
 * Bamboo Empire Persistence Module
 * 
 * Handles LocalStorage save/load, cloud sync, and offline progress calculation.
 */

import type { GameState } from '@/store/useGameStore';
import { simulate } from './simulate';
import { calculateCatchUpEvents, generateEvent, calculateEventEffect, applyEventEffect } from './events';
import { INITIAL_STATE, TIMING, getEconomicEventIntervalMs } from '@/config/gameConfig';
import { supabase } from '@/integrations/supabase/client';

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = 'bamboo-empire-state';
const MODULE_ID = 'bamboo_empire';
const MODULE_TYPE = 'bamboo_empire';

// ============================================
// TYPE FOR SERIALIZABLE STATE
// ============================================

// The state we actually persist (excluding functions)
export interface PersistedGameState {
  bamboo: number;
  xp: number;
  energy: number;
  buildings: GameState['buildings'];
  defenses: GameState['defenses'];
  lastTick: number;
  lastEventCheck: number;
  activeModifiers: GameState['activeModifiers'];
  activeEvent: GameState['activeEvent'];
  eventHistory: GameState['eventHistory'];
  isPaused: boolean;
  pauseStartedAt: number | null;
  pauseCooldownUntil: number;
  highEnergyCycles: number;
  totalBambooEarned: number;
  totalXpEarned: number;
  initialized: boolean;
}

// ============================================
// CLOUD PERSISTENCE FUNCTIONS
// ============================================

/**
 * Load game state from cloud (module_progress table)
 */
async function loadFromCloud(userId: string): Promise<PersistedGameState | null> {
  try {
    const { data, error } = await supabase
      .from('module_progress')
      .select('detailed_progress')
      .eq('user_id', userId)
      .eq('module_id', MODULE_ID)
      .maybeSingle();
    
    if (error) {
      console.error('Failed to load from cloud:', error);
      return null;
    }
    
    if (data?.detailed_progress && isValidGameState(data.detailed_progress)) {
      return data.detailed_progress as PersistedGameState;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load from cloud:', error);
    return null;
  }
}

/**
 * Save game state to cloud (module_progress table)
 */
async function saveToCloud(userId: string, state: PersistedGameState): Promise<void> {
  try {
    const progressPercent = Math.min(100, Math.floor(state.xp / 100));
    const stateJson = JSON.parse(JSON.stringify(state));
    
    // Check if record exists
    const { data: existing } = await supabase
      .from('module_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('module_id', MODULE_ID)
      .maybeSingle();
    
    if (existing) {
      // Update existing record
      await supabase
        .from('module_progress')
        .update({
          detailed_progress: stateJson,
          progress_percentage: progressPercent,
          last_accessed: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('module_id', MODULE_ID);
    } else {
      // Insert new record
      await supabase
        .from('module_progress')
        .insert([{
          user_id: userId,
          module_id: MODULE_ID,
          module_type: MODULE_TYPE,
          detailed_progress: stateJson,
          progress_percentage: progressPercent,
          last_accessed: new Date().toISOString(),
        }]);
    }
  } catch (error) {
    console.error('Failed to save to cloud:', error);
  }
}

// ============================================
// SAVE FUNCTIONS
// ============================================

/**
 * Save game state to LocalStorage and optionally to cloud
 */
export function saveGameState(state: PersistedGameState, userId?: string): void {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    
    // Also save to cloud if userId provided
    if (userId) {
      saveToCloud(userId, state);
    }
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

/**
 * Extract persistable state from full game state
 */
export function extractPersistableState(state: GameState): PersistedGameState {
  return {
    bamboo: state.bamboo,
    xp: state.xp,
    energy: state.energy,
    buildings: state.buildings,
    defenses: state.defenses,
    lastTick: state.lastTick,
    lastEventCheck: state.lastEventCheck,
    activeModifiers: state.activeModifiers,
    activeEvent: state.activeEvent,
    eventHistory: state.eventHistory,
    isPaused: state.isPaused,
    pauseStartedAt: state.pauseStartedAt,
    pauseCooldownUntil: state.pauseCooldownUntil,
    highEnergyCycles: state.highEnergyCycles,
    totalBambooEarned: state.totalBambooEarned,
    totalXpEarned: state.totalXpEarned,
    initialized: state.initialized,
  };
}

// ============================================
// LOAD FUNCTIONS
// ============================================

/**
 * Load game state - tries cloud first if userId provided, then localStorage
 * Returns null if no saved state exists
 */
export async function loadGameState(userId?: string): Promise<PersistedGameState | null> {
  try {
    // If user is logged in, try cloud first
    if (userId) {
      const cloudState = await loadFromCloud(userId);
      if (cloudState) {
        // Also update localStorage with cloud state
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudState));
        return cloudState;
      }
      
      // No cloud state - check localStorage and migrate if exists
      const localState = loadFromLocalStorage();
      if (localState) {
        // Migrate localStorage to cloud
        await saveToCloud(userId, localState);
        return localState;
      }
      
      return null;
    }
    
    // No userId - use localStorage only
    return loadFromLocalStorage();
  } catch (error) {
    console.error('Failed to load game state:', error);
    return loadFromLocalStorage();
  }
}

/**
 * Load from localStorage only (sync helper)
 */
function loadFromLocalStorage(): PersistedGameState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return null;
    }

    const parsed = JSON.parse(serialized);
    
    if (!isValidGameState(parsed)) {
      console.warn('Invalid game state in localStorage, returning null');
      return null;
    }

    return parsed as PersistedGameState;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

/**
 * Check if loaded state has all required fields
 */
function isValidGameState(state: unknown): state is PersistedGameState {
  if (typeof state !== 'object' || state === null) {
    return false;
  }

  const s = state as Record<string, unknown>;

  // Check for required numeric fields
  const requiredNumbers = ['bamboo', 'xp', 'energy', 'lastTick', 'lastEventCheck'];
  for (const field of requiredNumbers) {
    if (typeof s[field] !== 'number') {
      return false;
    }
  }

  // Check for required object fields
  if (typeof s.buildings !== 'object' || s.buildings === null) {
    return false;
  }
  if (typeof s.defenses !== 'object' || s.defenses === null) {
    return false;
  }

  // Check for required array fields
  if (!Array.isArray(s.activeModifiers)) {
    return false;
  }
  if (!Array.isArray(s.eventHistory)) {
    return false;
  }

  return true;
}

// ============================================
// OFFLINE PROGRESS CALCULATION
// ============================================

export interface OfflineProgressResult {
  state: PersistedGameState;
  offlineTimeMs: number;
  bambooGained: number;
  catchUpEventsTriggered: number;
}

/**
 * Calculate offline progress and return updated state
 * 
 * This function:
 * 1. Calculates elapsed time since last tick
 * 2. Runs simulation for offline period
 * 3. Generates and auto-resolves catch-up events (max 3)
 * 4. Returns the updated state
 */
export function calculateOfflineProgress(
  savedState: PersistedGameState
): OfflineProgressResult {
  const now = Date.now();
  const offlineTimeMs = now - savedState.lastTick;

  // If less than 1 second offline, no need to calculate
  if (offlineTimeMs < 1000) {
    return {
      state: savedState,
      offlineTimeMs: 0,
      bambooGained: 0,
      catchUpEventsTriggered: 0,
    };
  }

  const initialBamboo = savedState.bamboo;

  // Run simulation for offline period
  const simResult = simulate(
    {
      bamboo: savedState.bamboo,
      energy: savedState.energy,
      buildings: savedState.buildings,
      activeModifiers: savedState.activeModifiers,
      isPaused: savedState.isPaused,
      pauseStartedAt: savedState.pauseStartedAt,
      highEnergyCycles: savedState.highEnergyCycles,
    },
    offlineTimeMs,
    now
  );

  // Update state with simulation results
  let state: PersistedGameState = {
    ...savedState,
    bamboo: simResult.bamboo,
    energy: simResult.energy,
    activeModifiers: simResult.activeModifiers,
    isPaused: simResult.isPaused,
    pauseStartedAt: simResult.pauseStartedAt,
    highEnergyCycles: simResult.highEnergyCycles,
    lastTick: now,
  };

  // Calculate and apply catch-up events using XP-based interval
  const eventIntervalMs = getEconomicEventIntervalMs(savedState.xp);
  const catchUpEventCount = calculateCatchUpEvents(savedState.lastEventCheck, now, eventIntervalMs);
  
  for (let i = 0; i < catchUpEventCount; i++) {
    // Generate an event
    const event = generateEvent();
    
    // For catch-up events, auto-resolve with a default choice (or no choice for non-choice events)
    const eventConfig = event.type;
    let choice: string | undefined;
    
    // For events with choices, pick the safer option during offline
    if (eventConfig === 'opportunity') {
      choice = 'ignore'; // Don't auto-invest
    } else if (eventConfig === 'comparisonTrap') {
      choice = 'resist'; // Resist temptation
    }

    // Calculate and apply the event effect
    const effect = calculateEventEffect(event.type, state, choice);
    const applied = applyEventEffect(
      {
        bamboo: state.bamboo,
        energy: state.energy,
        xp: state.xp,
        activeModifiers: state.activeModifiers,
        buildings: state.buildings,
      },
      effect
    );

    state = {
      ...state,
      bamboo: applied.bamboo,
      energy: applied.energy,
      xp: applied.xp,
      activeModifiers: applied.activeModifiers,
      eventHistory: [
        {
          id: event.id,
          type: event.type,
          timestamp: now - (catchUpEventCount - i) * eventIntervalMs,
          choice,
          outcome: effect.message,
          xpChange: effect.xpChange,
        },
        ...state.eventHistory,
      ].slice(0, 50),
    };
  }

  // Update last event check time
  state.lastEventCheck = now;

  const bambooGained = state.bamboo - initialBamboo;

  return {
    state,
    offlineTimeMs,
    bambooGained,
    catchUpEventsTriggered: catchUpEventCount,
  };
}

// ============================================
// CLEAR / RESET FUNCTIONS
// ============================================

/**
 * Clear saved game state from LocalStorage
 */
export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
}

/**
 * Create a fresh initial state
 */
export function createFreshState(): PersistedGameState {
  const now = Date.now();
  return {
    bamboo: INITIAL_STATE.bamboo,
    xp: INITIAL_STATE.xp,
    energy: INITIAL_STATE.energy,
    buildings: { ...INITIAL_STATE.buildings },
    defenses: { ...INITIAL_STATE.defenses },
    lastTick: now,
    lastEventCheck: now,
    activeModifiers: [],
    activeEvent: null,
    eventHistory: [],
    isPaused: false,
    pauseStartedAt: null,
    pauseCooldownUntil: 0,
    highEnergyCycles: 0,
    totalBambooEarned: INITIAL_STATE.bamboo,
    totalXpEarned: INITIAL_STATE.xp,
    initialized: true,
  };
}

// ============================================
// AUTO-SAVE HOOK HELPERS
// ============================================

/**
 * Set up auto-save interval
 * Returns cleanup function
 */
export function setupAutoSave(
  getState: () => PersistedGameState,
  intervalMs: number = TIMING.autoSaveIntervalMs
): () => void {
  const intervalId = setInterval(() => {
    const state = getState();
    saveGameState(state);
  }, intervalMs);

  return () => clearInterval(intervalId);
}

// ============================================
// DEBUG HELPERS
// ============================================

/**
 * Get storage usage info
 */
export function getStorageInfo(): { used: number; key: string } {
  const data = localStorage.getItem(STORAGE_KEY) || '';
  return {
    used: new Blob([data]).size,
    key: STORAGE_KEY,
  };
}

/**
 * Export game state as JSON string (for backup)
 */
export function exportGameState(): string | null {
  const state = loadGameState();
  if (!state) {
    return null;
  }
  return JSON.stringify(state, null, 2);
}

/**
 * Import game state from JSON string
 */
export function importGameState(json: string): boolean {
  try {
    const state = JSON.parse(json);
    if (!isValidGameState(state)) {
      return false;
    }
    saveGameState(state);
    return true;
  } catch {
    return false;
  }
}



