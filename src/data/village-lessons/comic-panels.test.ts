import { describe, expect, it } from 'vitest';
import {
  getVillageComicPlaceholderUrl,
  getVillageConceptPanelUrl,
  getVillageLessonHeroUrl,
} from './comic-panels';

describe('village comic panel paths', () => {
  it('builds convention hero and concept URLs', () => {
    expect(getVillageLessonHeroUrl('markets-headlines', 'mh-1-price-discovery')).toBe(
      '/comic/market-intelligence/markets-headlines/mh-1-price-discovery/panel-hero.png',
    );
    expect(
      getVillageConceptPanelUrl('markets-headlines', 'mh-1-price-discovery', 'expectation_trap'),
    ).toBe(
      '/comic/market-intelligence/markets-headlines/mh-1-price-discovery/panel-expectation_trap.png',
    );
  });

  it('builds a placeholder URL for missing art', () => {
    expect(getVillageComicPlaceholderUrl('Headline Hype')).toContain('placehold.co');
  });
});
