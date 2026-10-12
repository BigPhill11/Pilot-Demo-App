import { describe, expect, it } from 'vitest';
import { founderProgressSyncEntries, isFounderLessonUnlocked } from './founderJourneyProgress';
import { normalizeFounderProgress, EMPTY_FOUNDER_PROGRESS } from '@/hooks/useFounderJourneyProgress';
import { FOUNDER_MISSIONS } from '@/data/founder-journey/missions';
import { FOUNDER_MODULES } from '@/data/founder-journey/curriculum';
import { CURRICULUM_TRACKS, lessonLabel } from './teacherCurriculum';

const fresh = () => normalizeFounderProgress(EMPTY_FOUNDER_PROGRESS);

describe('Founder progress and teacher integration', () => {
  it('preserves the four legacy completions without marking the new lessons complete', () => {
    const legacy = normalizeFounderProgress({ completedMissionIds: ['idea-to-mvp', 'validating-customers', 'funding-the-business', 'building-the-team'], canvas: { idea: 'Tutoring' } });
    expect(legacy.completedMissionIds).toHaveLength(4);
    expect(legacy.canvas.idea).toBe('Tutoring');
    expect(isFounderLessonUnlocked('problem-discovery', legacy)).toBe(true);
    expect(isFounderLessonUnlocked('design-first-test', legacy)).toBe(false);
    expect(isFounderLessonUnlocked('building-the-team', legacy)).toBe(true);
    expect(founderProgressSyncEntries(legacy).find((row) => row.moduleId === 'idea-and-mvp')?.progressPercentage).toBe(33);
  });

  it('restores earned Teach Phil bonus data when resuming before completion', () => {
    const result = { outcome: 'passed', passRewardBamboo: 300, passXp: 10, optUpBonusBamboo: 15, teachBacksCompleted: 1 };
    const progress = normalizeFounderProgress({ teachResults: { 'idea-to-mvp': result }, missionStepById: { 'idea-to-mvp': 'canvas' } });
    expect(progress.teachResults?.['idea-to-mvp']).toEqual(result);
    expect(progress.missionStepById['idea-to-mvp']).toBe('canvas');
  });

  it('uses the same six module IDs in student sync and teacher columns', () => {
    const entries = founderProgressSyncEntries(fresh());
    const track = CURRICULUM_TRACKS.find((value) => value.moduleType === 'founder-journey')!;
    expect(entries.map((row) => row.moduleId)).toEqual(track.columns.map((column) => column.moduleId));
    expect(entries.every((row) => row.moduleType === 'founder-journey')).toBe(true);
    expect(lessonLabel('founder-interview-customers')).toContain('Run a Useful Customer Interview');
  });

  it('does not label the reward screen as completed', () => {
    const state = fresh();
    const firstModule = FOUNDER_MODULES[0];
    state.completedMissionIds = firstModule.lessonIds.slice(0, 2);
    state.missionStepById['design-first-test'] = 'complete';
    expect(founderProgressSyncEntries(state)[0].progressPercentage).toBe(98);
    state.completedMissionIds.push('design-first-test');
    expect(founderProgressSyncEntries(state)[0].progressPercentage).toBe(100);
  });

  it('unlocks lessons sequentially and keeps later modules locked', () => {
    const state = fresh();
    expect(isFounderLessonUnlocked('idea-to-mvp', state)).toBe(true);
    expect(isFounderLessonUnlocked('validating-customers', state)).toBe(false);
    state.completedMissionIds = FOUNDER_MODULES[0].lessonIds;
    expect(isFounderLessonUnlocked('validating-customers', state)).toBe(true);
    expect(isFounderLessonUnlocked('price-your-offer', state)).toBe(false);
  });

  it('filters malformed storage and duplicates so completion stays bounded', () => {
    const state = normalizeFounderProgress({ completedMissionIds: ['idea-to-mvp', 'idea-to-mvp', 'unknown'], missionStepById: { 'idea-to-mvp': 'bogus' }, canvas: { idea: 42, problem: 'Long line', unknown: 'No' } });
    expect(state.completedMissionIds).toEqual(['idea-to-mvp']);
    expect(state.missionStepById).toEqual({});
    expect(state.canvas).toEqual({ problem: 'Long line' });
  });

  it('completes all modules only when every lesson is complete and never syncs canvas text', () => {
    const state = fresh();
    state.completedMissionIds = FOUNDER_MISSIONS.map((lesson) => lesson.id);
    state.canvas.idea = 'My private business idea';
    const entries = founderProgressSyncEntries(state);
    expect(entries).toHaveLength(6);
    expect(entries.every((row) => row.progressPercentage === 100)).toBe(true);
    expect(JSON.stringify(entries)).not.toContain(state.canvas.idea);
  });
});
