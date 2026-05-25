import { describe, it, expect, beforeEach } from 'vitest';
import { extractCareersFlashcards, invalidateCareersCache } from './extractCareersFlashcards';

describe('extractCareersFlashcards', () => {
  beforeEach(() => {
    invalidateCareersCache();
  });

  it('returns an array of UnifiedFlashcards', () => {
    const cards = extractCareersFlashcards();
    expect(Array.isArray(cards)).toBe(true);
    expect(cards.length).toBeGreaterThan(0);
  });

  it('all cards have sourceModule === "careers"', () => {
    const cards = extractCareersFlashcards();
    cards.forEach((c) => {
      expect(c.sourceModule).toBe('careers');
    });
  });

  it('all cards have required fields (id, term, definition)', () => {
    const cards = extractCareersFlashcards();
    cards.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.term).toBeTruthy();
      expect(c.definition).toBeTruthy();
    });
  });

  it('no duplicate IDs', () => {
    const cards = extractCareersFlashcards();
    const ids = cards.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('includes Investment Banking cards', () => {
    const cards = extractCareersFlashcards();
    const ibCards = cards.filter((c) => c.category === 'Investment Banking');
    expect(ibCards.length).toBeGreaterThan(5);
  });

  it('includes Private Equity cards', () => {
    const cards = extractCareersFlashcards();
    const peCards = cards.filter((c) => c.category === 'Private Equity');
    expect(peCards.length).toBeGreaterThan(0);
  });

  it('includes Management Consulting cards', () => {
    const cards = extractCareersFlashcards();
    const cCards = cards.filter((c) => c.category === 'Management Consulting');
    expect(cCards.length).toBeGreaterThan(0);
  });

  it('includes Venture Capital cards', () => {
    const cards = extractCareersFlashcards();
    const vcCards = cards.filter((c) => c.category === 'Venture Capital');
    expect(vcCards.length).toBeGreaterThan(0);
  });

  it('includes Career Readiness (interview) cards', () => {
    const cards = extractCareersFlashcards();
    const irCards = cards.filter((c) => c.category === 'Career Readiness');
    expect(irCards.length).toBeGreaterThan(0);
  });

  it('has valid difficulty values', () => {
    const cards = extractCareersFlashcards();
    const valid = new Set(['beginner', 'intermediate', 'advanced']);
    cards.forEach((c) => {
      expect(valid.has(c.difficulty)).toBe(true);
    });
  });

  it('returns same reference on second call (cache works)', () => {
    const first = extractCareersFlashcards();
    const second = extractCareersFlashcards();
    expect(first).toBe(second);
  });

  it('returns fresh data after invalidation', () => {
    const first = extractCareersFlashcards();
    invalidateCareersCache();
    const second = extractCareersFlashcards();
    expect(first).not.toBe(second);
  });
});
