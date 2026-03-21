/**
 * Bamboo Empire Credit System
 * 
 * Manages credit card mechanics: balance, payments, interest, credit score.
 */

// ============================================
// CREDIT CONFIGURATION
// ============================================

export const CREDIT_CONFIG = {
  /** Starting credit limit */
  initialLimit: 300,
  
  /** Starting credit score (720 is "good" credit) */
  initialScore: 720,
  
  /** Minimum credit score */
  minScore: 300,
  
  /** Maximum credit score */
  maxScore: 850,
  
  /** Annual Percentage Rate (APR) for interest calculations */
  apr: 0.24, // 24% APR
  
  /** Payment cycle in hours (24h for Option A) */
  paymentCycleHours: 24,
  
  /** Minimum payment calculation: max(flatMin, balance * percentage) */
  minPaymentFlat: 10,
  minPaymentPercentage: 0.05, // 5% of balance
  
  /** Late fee (flat amount) */
  lateFee: 25,
  
  /** Score changes */
  scoreOnTimePayment: { min: 3, max: 8 },
  scoreMissedPayment: { min: 40, max: 80 },
  scoreUtilizationPenalty: 2, // Per high-utilization check
  
  /** Utilization threshold (percentage of limit) that triggers penalty */
  highUtilizationThreshold: 0.7, // 70%
  
  /** XP threshold to unlock credit purchases */
  xpUnlockThreshold: 50,
  
  /** Credit limit increases based on score */
  limitTiers: [
    { minScore: 300, limit: 200 },
    { minScore: 580, limit: 300 },
    { minScore: 670, limit: 500 },
    { minScore: 740, limit: 750 },
    { minScore: 800, limit: 1000 },
  ],
};

// ============================================
// TYPES
// ============================================

export interface CreditState {
  enabled: boolean;
  limit: number;
  balance: number;
  apr: number;
  nextDueAt: number;
  minPaymentDue: number;
  score: number;
  missedPayments: number;
  lastPaymentAt: number | null;
  totalInterestPaid: number;
  firstCreditUsed: boolean;
}

// ============================================
// INITIAL STATE
// ============================================

export function createInitialCreditState(): CreditState {
  const now = Date.now();
  return {
    enabled: false,
    limit: CREDIT_CONFIG.initialLimit,
    balance: 0,
    apr: CREDIT_CONFIG.apr,
    nextDueAt: now + CREDIT_CONFIG.paymentCycleHours * 60 * 60 * 1000,
    minPaymentDue: 0,
    score: CREDIT_CONFIG.initialScore,
    missedPayments: 0,
    lastPaymentAt: null,
    totalInterestPaid: 0,
    firstCreditUsed: false,
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate minimum payment due
 */
export function calculateMinPayment(balance: number): number {
  if (balance <= 0) return 0;
  return Math.max(
    CREDIT_CONFIG.minPaymentFlat,
    Math.ceil(balance * CREDIT_CONFIG.minPaymentPercentage)
  );
}

/**
 * Calculate interest accrued over a period
 * Interest = balance * (APR / 365) * days
 */
export function calculateInterest(balance: number, apr: number, elapsedHours: number): number {
  if (balance <= 0) return 0;
  const days = elapsedHours / 24;
  const dailyRate = apr / 365;
  return Math.ceil(balance * dailyRate * days);
}

/**
 * Get credit limit based on score
 */
export function getCreditLimit(score: number): number {
  let limit = CREDIT_CONFIG.limitTiers[0].limit;
  for (const tier of CREDIT_CONFIG.limitTiers) {
    if (score >= tier.minScore) {
      limit = tier.limit;
    }
  }
  return limit;
}

/**
 * Get credit score rating
 */
export function getCreditRating(score: number): { rating: string; color: string } {
  if (score >= 800) return { rating: 'Excellent', color: '#5A9B5E' };
  if (score >= 740) return { rating: 'Very Good', color: '#7A9B7E' };
  if (score >= 670) return { rating: 'Good', color: '#B8873A' };
  if (score >= 580) return { rating: 'Fair', color: '#D4A85C' };
  return { rating: 'Poor', color: '#B84C4C' };
}

/**
 * Calculate score change for on-time payment
 */
export function getOnTimePaymentScoreBonus(): number {
  const { min, max } = CREDIT_CONFIG.scoreOnTimePayment;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate score change for missed payment
 */
export function getMissedPaymentScorePenalty(): number {
  const { min, max } = CREDIT_CONFIG.scoreMissedPayment;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if utilization is high
 */
export function isHighUtilization(balance: number, limit: number): boolean {
  if (limit <= 0) return false;
  return (balance / limit) >= CREDIT_CONFIG.highUtilizationThreshold;
}

/**
 * Format time remaining until due date
 */
export function formatTimeUntilDue(nextDueAt: number): string {
  const now = Date.now();
  const remaining = nextDueAt - now;
  
  if (remaining <= 0) return 'OVERDUE';
  
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  
  return `${hours}h ${minutes}m`;
}

// ============================================
// STATE MUTATION FUNCTIONS
// ============================================

/**
 * Make a credit purchase
 */
export function makeCreditPurchase(
  state: CreditState,
  amount: number
): { success: boolean; newState: CreditState; message: string } {
  if (!state.enabled) {
    return { success: false, newState: state, message: 'Credit not enabled' };
  }
  
  if (state.balance + amount > state.limit) {
    return { success: false, newState: state, message: 'Credit limit exceeded' };
  }
  
  const newBalance = state.balance + amount;
  const newMinPayment = calculateMinPayment(newBalance);
  
  return {
    success: true,
    newState: {
      ...state,
      balance: newBalance,
      minPaymentDue: newMinPayment,
      firstCreditUsed: true,
    },
    message: `Charged ${amount} to credit. Balance: ${newBalance}/${state.limit}`,
  };
}

/**
 * Make a payment on credit card balance
 */
export function makePayment(
  state: CreditState,
  amount: number,
  now: number
): { success: boolean; newState: CreditState; message: string; scoreChange: number } {
  if (amount <= 0) {
    return { success: false, newState: state, message: 'Invalid payment amount', scoreChange: 0 };
  }
  
  if (amount > state.balance) {
    amount = state.balance; // Can't overpay
  }
  
  const newBalance = state.balance - amount;
  const isPastDue = now > state.nextDueAt;
  let scoreChange = 0;
  let newScore = state.score;
  
  // If paying at least minimum on time, improve score
  if (amount >= state.minPaymentDue && !isPastDue) {
    scoreChange = getOnTimePaymentScoreBonus();
    newScore = Math.min(CREDIT_CONFIG.maxScore, state.score + scoreChange);
  }
  
  // Calculate new min payment and next due date
  const newMinPayment = calculateMinPayment(newBalance);
  const newNextDueAt = now + CREDIT_CONFIG.paymentCycleHours * 60 * 60 * 1000;
  
  // Update credit limit based on new score
  const newLimit = getCreditLimit(newScore);
  
  return {
    success: true,
    newState: {
      ...state,
      balance: newBalance,
      minPaymentDue: newMinPayment,
      score: newScore,
      limit: newLimit,
      lastPaymentAt: now,
      nextDueAt: newBalance > 0 ? newNextDueAt : state.nextDueAt,
    },
    message: `Paid ${amount}. New balance: ${newBalance}`,
    scoreChange,
  };
}

/**
 * Handle due date check (called periodically)
 * Applies late fees and score penalties if payment is missed
 */
export function handleDueDate(
  state: CreditState,
  now: number
): { newState: CreditState; wasMissed: boolean; lateFee: number; scoreChange: number } {
  // If no balance or not past due, nothing to do
  if (state.balance <= 0 || now <= state.nextDueAt) {
    return { newState: state, wasMissed: false, lateFee: 0, scoreChange: 0 };
  }
  
  // Payment was missed
  const lateFee = CREDIT_CONFIG.lateFee;
  const scorePenalty = getMissedPaymentScorePenalty();
  const newScore = Math.max(CREDIT_CONFIG.minScore, state.score - scorePenalty);
  const newBalance = state.balance + lateFee;
  const newLimit = getCreditLimit(newScore);
  const newNextDueAt = now + CREDIT_CONFIG.paymentCycleHours * 60 * 60 * 1000;
  
  return {
    newState: {
      ...state,
      balance: newBalance,
      minPaymentDue: calculateMinPayment(newBalance),
      score: newScore,
      limit: newLimit,
      missedPayments: state.missedPayments + 1,
      nextDueAt: newNextDueAt,
    },
    wasMissed: true,
    lateFee,
    scoreChange: -scorePenalty,
  };
}

/**
 * Accrue interest on balance (called periodically)
 */
export function accrueInterest(
  state: CreditState,
  elapsedHours: number
): { newState: CreditState; interestAmount: number } {
  if (state.balance <= 0) {
    return { newState: state, interestAmount: 0 };
  }
  
  const interest = calculateInterest(state.balance, state.apr, elapsedHours);
  
  if (interest <= 0) {
    return { newState: state, interestAmount: 0 };
  }
  
  const newBalance = state.balance + interest;
  
  return {
    newState: {
      ...state,
      balance: newBalance,
      minPaymentDue: calculateMinPayment(newBalance),
      totalInterestPaid: state.totalInterestPaid + interest,
    },
    interestAmount: interest,
  };
}

/**
 * Enable credit card for the user
 */
export function enableCredit(state: CreditState, now: number): CreditState {
  return {
    ...state,
    enabled: true,
    nextDueAt: now + CREDIT_CONFIG.paymentCycleHours * 60 * 60 * 1000,
  };
}

/**
 * Check if user can use credit (meets XP threshold)
 */
export function canUseCredit(xp: number): boolean {
  return xp >= CREDIT_CONFIG.xpUnlockThreshold;
}

