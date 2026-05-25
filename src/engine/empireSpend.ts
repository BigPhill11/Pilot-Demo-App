import { enableCredit, makeCreditPurchase, type CreditState } from './credit';

export interface EmpireSpendResult {
  success: boolean;
  newState: CreditState;
  message: string;
}

/**
 * Charge an empire expense to the credit card (builds, upgrades, event fees).
 * Auto-enables credit when allowed so empire runs card-only.
 */
export function chargeEmpireExpense(
  state: CreditState,
  amount: number,
  options: { autoEnable?: boolean; now?: number } = {},
): EmpireSpendResult {
  const { autoEnable = true, now = Date.now() } = options;

  if (amount <= 0) {
    return { success: false, newState: state, message: 'Invalid amount' };
  }

  let working = state;
  if (!working.enabled) {
    if (!autoEnable) {
      return { success: false, newState: state, message: 'Credit card not active' };
    }
    working = enableCredit(working, now);
  }

  const purchase = makeCreditPurchase(working, amount);
  return {
    success: purchase.success,
    newState: purchase.newState,
    message: purchase.message,
  };
}
