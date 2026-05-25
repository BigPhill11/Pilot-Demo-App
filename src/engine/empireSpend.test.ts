import { describe, expect, it } from 'vitest';
import { createInitialCreditState } from '@/engine/credit';
import { chargeEmpireExpense } from '@/engine/empireSpend';

describe('chargeEmpireExpense', () => {
  it('auto-enables credit and charges purchases', () => {
    const initial = createInitialCreditState();
    const result = chargeEmpireExpense(initial, 50, { autoEnable: true });
    expect(result.success).toBe(true);
    expect(result.newState.enabled).toBe(true);
    expect(result.newState.balance).toBe(50);
  });

  it('rejects charges over credit limit', () => {
    const enabled = { ...createInitialCreditState(), enabled: true, limit: 100, balance: 90 };
    const result = chargeEmpireExpense(enabled, 20);
    expect(result.success).toBe(false);
  });
});
