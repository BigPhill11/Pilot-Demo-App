/**
 * Bamboo Empire Improvements Store
 * 
 * Manages purchased improvements: permanent buildings, upgrades, defenses.
 */

import { create } from 'zustand';
import {
  ImprovementType,
  IMPROVEMENTS,
  getImprovementStats,
  canPurchaseImprovement,
} from '@/config/gameConfig';

// ============================================
// STORAGE KEY
// ============================================

const IMPROVEMENTS_STORAGE_KEY = 'bamboo-empire-improvements';

// ============================================
// TYPES
// ============================================

interface ImprovementsState {
  improvements: Record<ImprovementType, number>;
  initialized: boolean;
}

interface ImprovementsActions {
  purchaseImprovement: (type: ImprovementType, bamboo: number, xp: number) => {
    success: boolean;
    cost: number;
    message: string;
  };
  getLevel: (type: ImprovementType) => number;
  getEffectValue: (type: ImprovementType) => number;
  canPurchase: (type: ImprovementType, bamboo: number, xp: number) => { canPurchase: boolean; reason?: string };
  getTotalProductionBonus: () => number;
  getEventDamageReduction: () => number;
  getEnergyRecoveryBonus: () => number;
  getStorageBonus: () => number;
  getEventAvoidanceChance: () => number;
  loadState: (state: Partial<ImprovementsState>) => void;
  saveState: () => void;
  resetImprovements: () => void;
}

type ImprovementsStore = ImprovementsState & ImprovementsActions;

// ============================================
// INITIAL STATE
// ============================================

const createInitialImprovementsState = (): Record<ImprovementType, number> => ({
  greenhouseDome: 0,
  irrigationChannels: 0,
  compostYard: 0,
  tradePost: 0,
  researchHut: 0,
  reservoir: 0,
  watchtower: 0,
  automationI: 0,
  automationII: 0,
  automationIII: 0,
  diversification: 0,
  hedgingContracts: 0,
  supplyChainBuffer: 0,
  laborTraining: 0,
  stormReinforcement: 0,
  firebreakLines: 0,
  complianceOffice: 0,
});

// ============================================
// PERSISTENCE
// ============================================

function loadFromStorage(): Record<ImprovementType, number> | null {
  try {
    const saved = localStorage.getItem(IMPROVEMENTS_STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as Record<ImprovementType, number>;
  } catch {
    return null;
  }
}

function saveToStorage(improvements: Record<ImprovementType, number>): void {
  try {
    localStorage.setItem(IMPROVEMENTS_STORAGE_KEY, JSON.stringify(improvements));
  } catch (error) {
    console.error('Failed to save improvements:', error);
  }
}

// ============================================
// STORE
// ============================================

export const useImprovementsStore = create<ImprovementsStore>((set, get) => ({
  improvements: createInitialImprovementsState(),
  initialized: false,

  purchaseImprovement: (type: ImprovementType, bamboo: number, xp: number) => {
    const state = get();
    const currentLevel = state.improvements[type];
    const check = canPurchaseImprovement(type, currentLevel, bamboo, xp, state.improvements);
    
    if (!check.canPurchase) {
      return { success: false, cost: 0, message: check.reason || 'Cannot purchase' };
    }
    
    const stats = getImprovementStats(type, currentLevel + 1);
    if (!stats) {
      return { success: false, cost: 0, message: 'Invalid level' };
    }
    
    const newImprovements = {
      ...state.improvements,
      [type]: currentLevel + 1,
    };
    
    set({ improvements: newImprovements });
    saveToStorage(newImprovements);
    
    return {
      success: true,
      cost: stats.cost,
      message: `${IMPROVEMENTS[type].name} upgraded to level ${currentLevel + 1}!`,
    };
  },

  getLevel: (type: ImprovementType) => {
    return get().improvements[type] || 0;
  },

  getEffectValue: (type: ImprovementType) => {
    const level = get().improvements[type] || 0;
    if (level === 0) return 0;
    const stats = getImprovementStats(type, level);
    return stats?.effectValue || 0;
  },

  canPurchase: (type: ImprovementType, bamboo: number, xp: number) => {
    const state = get();
    return canPurchaseImprovement(type, state.improvements[type], bamboo, xp, state.improvements);
  },

  // ============================================
  // COMPUTED BONUSES
  // ============================================

  getTotalProductionBonus: () => {
    const state = get();
    let bonus = 0;
    
    // Greenhouse Dome
    if (state.improvements.greenhouseDome > 0) {
      bonus += getImprovementStats('greenhouseDome', state.improvements.greenhouseDome)?.effectValue || 0;
    }
    
    // Automation chain
    if (state.improvements.automationI > 0) {
      bonus += getImprovementStats('automationI', state.improvements.automationI)?.effectValue || 0;
    }
    if (state.improvements.automationII > 0) {
      bonus += getImprovementStats('automationII', state.improvements.automationII)?.effectValue || 0;
    }
    if (state.improvements.automationIII > 0) {
      bonus += getImprovementStats('automationIII', state.improvements.automationIII)?.effectValue || 0;
    }
    
    return bonus;
  },

  getEventDamageReduction: () => {
    const state = get();
    let reduction = 0;
    
    // Irrigation Channels
    if (state.improvements.irrigationChannels > 0) {
      reduction += getImprovementStats('irrigationChannels', state.improvements.irrigationChannels)?.effectValue || 0;
    }
    
    // Storm Reinforcement
    if (state.improvements.stormReinforcement > 0) {
      reduction += getImprovementStats('stormReinforcement', state.improvements.stormReinforcement)?.effectValue || 0;
    }
    
    // Firebreak Lines
    if (state.improvements.firebreakLines > 0) {
      reduction += getImprovementStats('firebreakLines', state.improvements.firebreakLines)?.effectValue || 0;
    }
    
    // Compliance Office
    if (state.improvements.complianceOffice > 0) {
      reduction += getImprovementStats('complianceOffice', state.improvements.complianceOffice)?.effectValue || 0;
    }
    
    return Math.min(reduction, 80); // Cap at 80%
  },

  getEnergyRecoveryBonus: () => {
    const state = get();
    
    if (state.improvements.reservoir > 0) {
      return getImprovementStats('reservoir', state.improvements.reservoir)?.effectValue || 0;
    }
    
    return 0;
  },

  getStorageBonus: () => {
    const state = get();
    
    if (state.improvements.supplyChainBuffer > 0) {
      return getImprovementStats('supplyChainBuffer', state.improvements.supplyChainBuffer)?.effectValue || 0;
    }
    
    return 0;
  },

  getEventAvoidanceChance: () => {
    const state = get();
    
    if (state.improvements.watchtower > 0) {
      return getImprovementStats('watchtower', state.improvements.watchtower)?.effectValue || 0;
    }
    
    return 0;
  },

  // ============================================
  // PERSISTENCE
  // ============================================

  loadState: (savedState: Partial<ImprovementsState>) => {
    set({
      improvements: savedState.improvements || createInitialImprovementsState(),
      initialized: true,
    });
  },

  saveState: () => {
    const state = get();
    saveToStorage(state.improvements);
  },

  resetImprovements: () => {
    const initialState = createInitialImprovementsState();
    set({ improvements: initialState, initialized: true });
    saveToStorage(initialState);
  },
}));

// ============================================
// INITIALIZATION
// ============================================

export function initializeImprovementsStore(): void {
  const saved = loadFromStorage();
  if (saved) {
    useImprovementsStore.getState().loadState({ improvements: saved });
  } else {
    useImprovementsStore.setState({ initialized: true });
  }
}

