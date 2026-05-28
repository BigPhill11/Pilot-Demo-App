import { describe, expect, it } from 'vitest';
import { EVENT_DEFINITIONS } from './EventManager';

describe('wellness events', () => {
  it('defines positive dojo wellness events with productivity recovery', () => {
    for (const type of ['happy_hour', 'meditation_break', 'workout_session'] as const) {
      const event = EVENT_DEFINITIONS[type];

      expect(event.isNegative).toBe(false);
      expect(event.effect.productivityDelta).toBeGreaterThan(0);
    }
  });

  it('uses timed production boosts for social and workout programs', () => {
    expect(EVENT_DEFINITIONS.happy_hour.effect.productionMultiplier).toBeGreaterThan(1);
    expect(EVENT_DEFINITIONS.workout_session.effect.productionMultiplier).toBeGreaterThan(1);
    expect(EVENT_DEFINITIONS.meditation_break.effect.productionMultiplier).toBeUndefined();
  });
});
