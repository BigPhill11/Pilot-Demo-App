import { describe, expect, it, beforeEach, vi } from 'vitest';
import {
  calculatePersonalFinanceProgress,
  calculateMarketIntelligenceProgress,
  calculateCareerReadinessProgress,
  calculateOverallProgress,
} from '@/lib/dashboardProgressCalculations';
import {
  scopedStorageKey,
  setActiveStorageUserId,
  migrateLegacyStorageKey,
} from '@/lib/userScopedStorage';
import { extractPersistableState, saveGameState } from '@/engine/persistence';
import { INITIAL_STATE } from '@/config/gameConfig';

describe('dashboardProgressCalculations', () => {
  it('calculates personal finance progress from module lesson counts', () => {
    const result = calculatePersonalFinanceProgress({
      income: {
        status: 'active',
        completedLessons: ['lesson-1', 'lesson-2'],
      },
    });

    expect(result.lessonsCompleted).toBe(2);
    expect(result.totalLessons).toBeGreaterThan(0);
    expect(result.progressPct).toBeGreaterThan(0);
    expect(result.progressPct).toBeLessThanOrEqual(100);
  });

  it('calculates market intelligence progress from village completions', () => {
    const result = calculateMarketIntelligenceProgress({
      'be-1-supply-demand': {
        completedAt: new Date().toISOString(),
        xpEarned: 10,
        bambooEarned: 5,
      },
    });

    expect(result.lessonsCompleted).toBe(1);
    expect(result.totalLessons).toBeGreaterThan(0);
    expect(result.progressPct).toBeGreaterThan(0);
  });

  it('calculates career readiness progress from module percentages', () => {
    const result = calculateCareerReadinessProgress({
      interviewing: 100,
      'email-etiquette': 50,
    });

    expect(result.lessonsCompleted).toBe(1);
    expect(result.totalLessons).toBeGreaterThan(0);
    expect(result.progressPct).toBeGreaterThan(0);
    expect(result.progressPct).toBeLessThan(100);
  });

  it('averages overall progress across paths', () => {
    expect(calculateOverallProgress([100, 50, 0])).toBe(50);
    expect(calculateOverallProgress([])).toBe(0);
  });
});

describe('userScopedStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    setActiveStorageUserId(null);
  });

  it('scopes keys per user and isolates data', () => {
    setActiveStorageUserId('user-a');
    localStorage.setItem(scopedStorageKey('bamboo-empire-state'), '{"bamboo":100}');

    setActiveStorageUserId('user-b');
    expect(localStorage.getItem(scopedStorageKey('bamboo-empire-state'))).toBeNull();

    localStorage.setItem(scopedStorageKey('bamboo-empire-state'), '{"bamboo":200}');

    setActiveStorageUserId('user-a');
    expect(localStorage.getItem(scopedStorageKey('bamboo-empire-state'))).toBe('{"bamboo":100}');
  });

  it('migrates legacy unscoped keys into scoped keys', () => {
    localStorage.setItem('bamboo-empire-state', '{"legacy":true}');
    setActiveStorageUserId('user-a');
    migrateLegacyStorageKey('bamboo-empire-state', 'user-a');

    expect(localStorage.getItem(scopedStorageKey('bamboo-empire-state', 'user-a'))).toBe(
      '{"legacy":true}'
    );
  });
});

describe('persistence save/load', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('persists game state to user-scoped local storage', () => {
    const state = extractPersistableState({
      bamboo: INITIAL_STATE.bamboo + 50,
      xp: INITIAL_STATE.xp + 10,
      energy: INITIAL_STATE.energy,
      buildings: { ...INITIAL_STATE.buildings },
      defenses: { ...INITIAL_STATE.defenses },
      lastTick: Date.now(),
      lastEventCheck: Date.now(),
      activeModifiers: [],
      activeEvent: null,
      eventHistory: [],
      isPaused: false,
      pauseStartedAt: null,
      pauseCooldownUntil: 0,
      highEnergyCycles: 0,
      totalBambooEarned: INITIAL_STATE.bamboo + 50,
      totalXpEarned: INITIAL_STATE.xp + 10,
      initialized: true,
      empireProductivity: 85,
    });

    saveGameState(state, 'user-a', { immediate: true });

    const stored = localStorage.getItem(scopedStorageKey('bamboo-empire-state', 'user-a'));
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.bamboo).toBe(INITIAL_STATE.bamboo + 50);
    expect(parsed.xp).toBe(INITIAL_STATE.xp + 10);
  });
});
