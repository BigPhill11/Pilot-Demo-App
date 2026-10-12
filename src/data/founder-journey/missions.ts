import type { FounderMission } from '@/types/founder-journey';
import { LEGACY_FOUNDER_MISSIONS } from './legacy-missions';
import { EXPANDED_COMICS } from './expanded-comics';
import { buildAdditionalLessons } from './additional-lessons';
import { FOUNDER_MODULES } from './curriculum';

const originals = LEGACY_FOUNDER_MISSIONS.map((mission) => ({
  ...mission,
  estimatedMinutes: 18,
  comicPanels: mission.comicPanels.map((panel, index) => ({ ...panel, ...EXPANDED_COMICS[mission.id][index] })),
  sources: mission.id === 'funding-the-business'
    ? [{ title: 'SBA: Fund your business', url: 'https://www.sba.gov/business-guide/plan-your-business/fund-your-business' }]
    : mission.id === 'building-the-team'
      ? [{ title: 'Y Combinator: Testing co-founder compatibility', url: 'https://www.ycombinator.com/blog/co-founder-matching/' }]
      : [{ title: 'The Lean Startup: Methodology', url: 'https://theleanstartup.com/principles' }, { title: 'SBA: Market research and competitive analysis', url: 'https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis' }],
}));
const all = [...originals, ...buildAdditionalLessons(LEGACY_FOUNDER_MISSIONS)];

// Stable legacy IDs preserve completed work; order follows sections and modules.
export const FOUNDER_MISSIONS: FounderMission[] = FOUNDER_MODULES.flatMap((module) => module.lessonIds)
  .map((id, index) => ({ ...all.find((lesson) => lesson.id === id)!, order: index + 1 }));

export const getFounderMission = (id: string | null | undefined) =>
  FOUNDER_MISSIONS.find((mission) => mission.id === id);
