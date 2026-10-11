import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FOUNDER_MISSIONS } from './missions';
import { normalizeFounderProgress } from '@/hooks/useFounderJourneyProgress';

describe('Founder Journey curriculum', () => {
  it('defines four ordered missions with the complete interactive flow', () => {
    expect(FOUNDER_MISSIONS).toHaveLength(4);
    expect(FOUNDER_MISSIONS.map((mission) => mission.order)).toEqual([1, 2, 3, 4]);

    for (const mission of FOUNDER_MISSIONS) {
      expect(mission.comicPanels).toHaveLength(5);
      expect(mission.simulator.rounds).toHaveLength(3);
      expect(mission.simulator.meters).toHaveLength(3);
      expect(mission.quiz).toHaveLength(4);
      expect(mission.teachBack.keyFacts.length).toBeGreaterThanOrEqual(3);
      expect(mission.canvasPrompts.length).toBeGreaterThan(0);
    }
  });

  it('ships an image for every comic panel', () => {
    for (const mission of FOUNDER_MISSIONS) {
      mission.comicPanels.forEach((panel) => {
        expect(panel.imageUrl).toMatch(/^\/comic\/founder-journey\/.+\/panel-[1-5]\.png$/);
        expect(existsSync(join(process.cwd(), 'public', panel.imageUrl))).toBe(true);
        expect(panel.alt.length).toBeGreaterThan(15);
      });
    }
  });

  it('covers every Lean Canvas section exactly once', () => {
    const sectionIds = FOUNDER_MISSIONS.flatMap((mission) =>
      mission.canvasPrompts.map((prompt) => prompt.sectionId),
    );
    expect(sectionIds).toHaveLength(9);
    expect(new Set(sectionIds).size).toBe(9);
    expect(sectionIds).toEqual(expect.arrayContaining([
      'idea',
      'problem',
      'customer',
      'solution',
      'uniqueValue',
      'revenue',
      'costs',
      'validation',
      'nextStep',
    ]));
  });

  it('drops unknown mission ids when stored progress is restored', () => {
    const progress = normalizeFounderProgress({
      completedMissionIds: ['idea-to-mvp', 'not-a-mission'],
      activeMissionId: 'not-a-mission',
      missionStepById: {},
      canvas: { idea: 'A tutoring service' },
      updatedAt: '2026-10-11',
    });

    expect(progress.completedMissionIds).toEqual(['idea-to-mvp']);
    expect(progress.activeMissionId).toBeNull();
    expect(progress.canvas.idea).toBe('A tutoring service');
  });
});
