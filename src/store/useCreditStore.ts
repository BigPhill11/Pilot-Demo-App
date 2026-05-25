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
  applyAprIncrease,
} from '@/engine/credit';
import { chargeEmpireExpense } from '@/engine/empireSpend';
import {
  migrateLegacyStorageKey,
  scopedStorageKey,
} from '@/lib/userScopedStorage';

// ============================================
// STORAGE KEY
// ============================================

const CREDIT_STORAGE_KEY_BASE = 'bamboo-empire-credit';

function getCreditStorageKey(userId?: string | null): string {
  return scopedStorageKey(CREDIT_STORAGE_KEY_BASE, userId);
}

// ============================================
// TYPES
// ============================================

interface CreditActions {
  // Core actions
  purchaseWithCredit: (amount: number) => { success: boolean; message: string };
  chargeEmpireExpense: (amount: number) => { success: boolean; message: string };
  increaseApr: (increase: number) => void;
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

function loadCreditFromStorage(userId?: string | null): CreditState | null {
  try {
    migrateLegacyStorageKey(CREDIT_STORAGE_KEY_BASE, userId ?? null);
    const saved = localStorage.getItem(getCreditStorageKey(userId));
    if (!saved) return null;
    return JSON.parse(saved) as CreditState;
  } catch {
    return null;
  }
}

function saveCreditToStorage(state: CreditState, userId?: string | null): void {
  try {
    localStorage.setItem(getCreditStorageKey(userId), JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save credit state:', error);
  }
}

let activeCreditUserId: string | null = null;

export function setCreditStorageUserId(userId: string | null | undefined): void {
  activeCreditUserId = userId ?? null;
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
      saveCreditToStorage(result.newState, activeCreditUserId);
    }
    
    return { success: result.success, message: result.message };
  },

  chargeEmpireExpense: (amount: number) => {
    const state = get();
    const result = chargeEmpireExpense(state, amount, { autoEnable: true, now: Date.now() });

    if (result.success) {
      set(result.newState);
      saveCreditToStorage(result.newState, activeCreditUserId);
    }

    return { success: result.success, message: result.message };
  },

  increaseApr: (increase: number) => {
    const state = get();
    const newState = applyAprIncrease(state, increase);
    if (newState.apr !== state.apr) {
      set(newState);
      saveCreditToStorage(newState, activeCreditUserId);
    }
  },

  payBalance: (amount: number) => {
    const state = get();
    const now = Date.now();
    const result = makePayment(state, amount, now);
    
    if (result.success) {
      set(result.newState);
      saveCreditToStorage(result.newState, activeCreditUserId);
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
    saveCreditToStorage(newState, activeCreditUserId);
  },

  checkDueDate: () => {
    const state = get();
    const now = Date.now();
    const result = handleDueDate(state, now);
    
    if (result.wasMissed) {
      set(result.newState);
      saveCreditToStorage(result.newState, activeCreditUserId);
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
      saveCreditToStorage(result.newState, activeCreditUserId);
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
    saveCreditToStorage(state, activeCreditUserId);
  },

  resetCredit: () => {
    const initialState = createInitialCreditState();
    set(initialState);
    saveCreditToStorage(initialState, activeCreditUserId);
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

export function initializeCreditStore(userId?: string | null): void {
  setCreditStorageUserId(userId);
  const savedState = loadCreditFromStorage(userId);
  if (savedState) {
    useCreditStore.getState().loadState(savedState);
  } else {
    useCreditStore.getState().resetCredit();
  }
}

