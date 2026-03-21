/**
 * Bamboo Empire Credit System Store
 * 
 * Separate Zustand store for credit card mechanics.
 */

import { create } from 'zustand';
import {
  CreditState,
  createInitialCreditState,
  makeCreditPurchase,
  makePayment,
  handleDueDate,
  accrueInterest,
  enableCredit,
  canUseCredit,
  getCreditRating,
  formatTimeUntilDue,
  CREDIT_CONFIG,
} from '@/engine/credit';

// ============================================
// STORAGE KEY
// ============================================

const CREDIT_STORAGE_KEY = 'bamboo-empire-credit';

// ============================================
// TYPES
// ============================================

interface CreditActions {
  // Core actions
  purchaseWithCredit: (amount: number) => { success: boolean; message: string };
  payBalance: (amount: number) => { success: boolean; message: string; scoreChange: number };
  payMinimum: () => { success: boolean; message: string; scoreChange: number };
  
  // System actions
  enableCreditCard: () => void;
  checkDueDate: () => { wasMissed: boolean; lateFee: number; scoreChange: number };
  tickInterest: (elapsedHours: number) => number;
  
  // Persistence
  loadState: (state: Partial<CreditState>) => void;
  saveState: () => void;
  resetCredit: () => void;
  
  // Helpers
  getCreditRatingInfo: () => { rating: string; color: string };
  getTimeUntilDue: () => string;
  canAffordPayment: (bambooBalance: number, amount: number) => boolean;
  isUnlocked: (xp: number) => boolean;
}

type CreditStore = CreditState & CreditActions;

// ============================================
// PERSISTENCE HELPERS
// ============================================

function loadCreditFromStorage(): CreditState | null {
  try {
    const saved = localStorage.getItem(CREDIT_STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as CreditState;
  } catch {
    return null;
  }
}

function saveCreditToStorage(state: CreditState): void {
  try {
    localStorage.setItem(CREDIT_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save credit state:', error);
  }
}

// ============================================
// STORE
// ============================================

export const useCreditStore = create<CreditStore>((set, get) => ({
  // Initial state
  ...createInitialCreditState(),

  // ----------------------------------------
  // CORE ACTIONS
  // ----------------------------------------

  purchaseWithCredit: (amount: number) => {
    const state = get();
    const result = makeCreditPurchase(state, amount);
    
    if (result.success) {
      set(result.newState);
      saveCreditToStorage(result.newState);
    }
    
    return { success: result.success, message: result.message };
  },

  payBalance: (amount: number) => {
    const state = get();
    const now = Date.now();
    const result = makePayment(state, amount, now);
    
    if (result.success) {
      set(result.newState);
      saveCreditToStorage(result.newState);
    }
    
    return { 
      success: result.success, 
      message: result.message,
      scoreChange: result.scoreChange,
    };
  },

  payMinimum: () => {
    const state = get();
    return get().payBalance(state.minPaymentDue);
  },

  // ----------------------------------------
  // SYSTEM ACTIONS
  // ----------------------------------------

  enableCreditCard: () => {
    const state = get();
    const now = Date.now();
    const newState = enableCredit(state, now);
    set(newState);
    saveCreditToStorage(newState);
  },

  checkDueDate: () => {
    const state = get();
    const now = Date.now();
    const result = handleDueDate(state, now);
    
    if (result.wasMissed) {
      set(result.newState);
      saveCreditToStorage(result.newState);
    }
    
    return {
      wasMissed: result.wasMissed,
      lateFee: result.lateFee,
      scoreChange: result.scoreChange,
    };
  },

  tickInterest: (elapsedHours: number) => {
    const state = get();
    const result = accrueInterest(state, elapsedHours);
    
    if (result.interestAmount > 0) {
      set(result.newState);
      saveCreditToStorage(result.newState);
    }
    
    return result.interestAmount;
  },

  // ----------------------------------------
  // PERSISTENCE
  // ----------------------------------------

  loadState: (savedState: Partial<CreditState>) => {
    set({
      ...createInitialCreditState(),
      ...savedState,
    });
  },

  saveState: () => {
    const state = get();
    saveCreditToStorage(state);
  },

  resetCredit: () => {
    const initialState = createInitialCreditState();
    set(initialState);
    saveCreditToStorage(initialState);
  },

  // ----------------------------------------
  // HELPERS
  // ----------------------------------------

  getCreditRatingInfo: () => {
    const state = get();
    return getCreditRating(state.score);
  },

  getTimeUntilDue: () => {
    const state = get();
    return formatTimeUntilDue(state.nextDueAt);
  },

  canAffordPayment: (bambooBalance: number, amount: number) => {
    return bambooBalance >= amount;
  },

  isUnlocked: (xp: number) => {
    return canUseCredit(xp);
  },
}));

// ============================================
// INITIALIZATION HOOK
// ============================================

export function initializeCreditStore(): void {
  const savedState = loadCreditFromStorage();
  if (savedState) {
    useCreditStore.getState().loadState(savedState);
  }
}

