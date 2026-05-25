import type { VillageModuleConfig } from '@/types/village-lesson';
import { businessEconomicsLessons } from './business-economics-lessons';
import { ownershipLessons } from './ownership-lessons';
import { languageFinanceLessons } from './language-finance-lessons';
import { marketsHeadlinesLessons } from './markets-headlines-lessons';
import { businessFoundationsLessons } from './business-foundations-lessons';

export const VILLAGE_MODULES: VillageModuleConfig[] = [
  {
    id: 'business-economics',
    name: 'Business Economics',
    tagline: 'Markets, prices, and the forces that shape every financial decision',
    buildingEmoji: '🏛️',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-800',
    borderColor: 'border-slate-300',
    ringColor: 'ring-slate-400',
    lessons: businessEconomicsLessons,
  },
  {
    id: 'ownership',
    name: 'Investing & Ownership',
    tagline: 'Own your piece of the economy — from net worth to portfolio discipline',
    buildingEmoji: '🏦',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-300',
    ringColor: 'ring-amber-400',
    lessons: ownershipLessons,
  },
  {
    id: 'language-finance',
    name: 'Language of Finance',
    tagline: 'Operational accounting — the source code behind every stock price and credit decision',
    buildingEmoji: '📚',
    bgColor: 'bg-violet-100',
    textColor: 'text-violet-900',
    borderColor: 'border-violet-300',
    ringColor: 'ring-violet-400',
    lessons: languageFinanceLessons,
  },
  {
    id: 'markets-headlines',
    name: 'Markets & Headlines',
    tagline: 'Read headlines like a pro—hype, Fed moves, and panic-proof habits',
    buildingEmoji: '📡',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-900',
    borderColor: 'border-teal-300',
    ringColor: 'ring-teal-400',
    lessons: marketsHeadlinesLessons,
  },
  {
    id: 'business-foundations',
    name: 'Business Foundations',
    tagline: 'Strategy, pricing, and management — how great businesses work',
    buildingEmoji: '⚒️',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-900',
    borderColor: 'border-orange-300',
    ringColor: 'ring-orange-400',
    lessons: businessFoundationsLessons,
  },
  {
    id: 'company-tinder',
    name: 'Company Tinder',
    tagline: 'Swipe on companies — practice your investment instincts',
    buildingEmoji: '🏪',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-900',
    borderColor: 'border-rose-300',
    ringColor: 'ring-rose-400',
    lessons: [],
    isSwipeGame: true,
  },
];

export function getVillageModule(id: string): VillageModuleConfig | undefined {
  return VILLAGE_MODULES.find(m => m.id === id);
}

export function getAllVillageLessons() {
  return VILLAGE_MODULES.flatMap(m => m.lessons);
}
