import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FOUNDER_MODULES, FOUNDER_SECTIONS } from './curriculum';
import { FOUNDER_MISSIONS } from './missions';
import { normalizeFounderProgress } from '@/hooks/useFounderJourneyProgress';

describe('Founder Journey curriculum', () => {
  it('defines six modules with three ordered lessons each with the complete interactive flow', () => {
    expect(FOUNDER_SECTIONS).toHaveLength(3);
    expect(FOUNDER_MODULES).toHaveLength(6);
    expect(FOUNDER_MISSIONS).toHaveLength(18);
    expect(new Set(FOUNDER_MISSIONS.map((lesson) => lesson.id)).size).toBe(18);
    for (const module of FOUNDER_MODULES) expect(module.lessonIds).toHaveLength(3);
    expect(FOUNDER_MISSIONS.map((mission) => mission.order)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1));

    for (const mission of FOUNDER_MISSIONS) {
      expect(mission.comicPanels).toHaveLength(5);
      expect(mission.simulator.rounds).toHaveLength(3);
      expect(mission.simulator.meters).toHaveLength(3);
      expect(mission.quiz).toHaveLength(4);
      for (const question of mission.quiz) {
        expect(question.options).toHaveLength(4);
        expect(question.options.some((option) => option.id === question.correctId)).toBe(true);
      }
      for (const panel of mission.comicPanels) {
        expect(panel.explanation?.split(/\s+/).length).toBeGreaterThanOrEqual(40);
        expect(panel.example?.length).toBeGreaterThan(25);
        expect(panel.takeaway?.length).toBeGreaterThan(15);
      }
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

  it('covers all nine Lean Canvas sections while revisiting the plan', () => {
    const sectionIds = FOUNDER_MISSIONS.flatMap((mission) =>
      mission.canvasPrompts.map((prompt) => prompt.sectionId),
    );

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
