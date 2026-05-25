/**
 * Tests for daily flashcard reward cap math.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { PLATFORM_REWARDS } from '@/config/gameConfig';

describe('PLATFORM_REWARDS flashcard constants', () => {
  it('cardMastered is 1 bamboo per swipe (small per-card reward)', () => {
    expect(PLATFORM_REWARDS.cardMastered).toBe(1);
  });

  it('cardMasteredXp is 0 (XP comes only from milestones)', () => {
    expect(PLATFORM_REWARDS.cardMasteredXp).toBe(0);
  });

  it('cardReviewed is 0 (swipe-left earns nothing)', () => {
    expect(PLATFORM_REWARDS.cardReviewed).toBe(0);
  });

  it('cardReviewedXp is 0', () => {
    expect(PLATFORM_REWARDS.cardReviewedXp).toBe(0);
  });

  it('flashcardDailyCap exists and is reasonable (≥20)', () => {
    expect(PLATFORM_REWARDS.flashcardDailyCap).toBeGreaterThanOrEqual(20);
  });

  it('flashcardDailyCapXp exists and is reasonable (≥4)', () => {
    expect(PLATFORM_REWARDS.flashcardDailyCapXp).toBeGreaterThanOrEqual(4);
  });

  it('50 raw per-card swipes stay under 100 bamboo (enforces grind)', () => {
    const rawBamboo = 50 * PLATFORM_REWARDS.cardMastered;
    expect(rawBamboo).toBeLessThan(100);
  });
});

describe('Milestone bonus math', () => {
  const MILESTONES = [
    { threshold: 10, bamboo: 5, xp: 1 },
    { threshold: 25, bamboo: 15, xp: 3 },
    { threshold: 50, bamboo: 30, xp: 5 },
  ];

  it('50 mastered cards total bamboo (per-card + all milestones) < 130', () => {
    const perCard = 50 * PLATFORM_REWARDS.cardMastered;
    const milestone = MILESTONES.reduce((sum, m) => sum + m.bamboo, 0);
    expect(perCard + milestone).toBeLessThan(130);
  });

  it('50 mastered cards total XP (per-card + all milestones) < 20', () => {
    const perCard = 50 * PLATFORM_REWARDS.cardMasteredXp;
    const milestone = MILESTONES.reduce((sum, m) => sum + m.xp, 0);
    expect(perCard + milestone).toBeLessThan(20);
  });
});
