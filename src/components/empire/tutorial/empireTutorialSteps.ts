import type { LucideIcon } from 'lucide-react';
import { Coins, Zap, Hammer, Sparkles, TrendingDown, ArrowUp } from 'lucide-react';

export const TUTORIAL_STORAGE_KEY = 'bamboo_empire_tutorial_v2_completed';
/** @deprecated No longer used — users may place on any buildable grass tile */
export const TUTORIAL_PLACE_TILE = { x: 10, y: 10 };
export const TUTORIAL_GRANT_COINS = 150;
export const TUTORIAL_DEMO_EVENT = 'tax_collection' as const;

export type TutorialAdvanceMode = 'next' | 'action';

export type TutorialCardPlacement = 'above' | 'below' | 'auto';

export type TutorialAction =
  | 'tap_build'
  | 'select_farm'
  | 'place_building'
  | 'select_placed_building'
  | 'upgrade_building'
  | 'dismiss_event';

export interface EmpireTutorialStep {
  id: string;
  title: string;
  body: string;
  target: string | null;
  icon: LucideIcon;
  accent: 'emerald' | 'amber' | 'indigo' | 'purple' | 'rose';
  advance: TutorialAdvanceMode;
  action?: TutorialAction;
  cardPlacement?: TutorialCardPlacement;
  onEnter?: 'grant_coins' | 'open_build_menu' | 'trigger_demo_event' | 'instant_complete_building';
}

export const EMPIRE_TUTORIAL_STEPS: EmpireTutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to your Bamboo Empire',
    body:
      "This is a playful simulation of real financial life: earning income, saving, borrowing wisely, and weathering surprises. Everything you learn in Phil's Financials can grow your empire here.",
    target: null,
    icon: Sparkles,
    accent: 'emerald',
    advance: 'next',
  },
  {
    id: 'simulate',
    title: 'What you are simulating',
    body:
      'Farms and markets are income. Storage is your emergency fund. Banks earn interest. Credit lets you build now and pay later. Random events mimic taxes, crashes, and bills — just like the real world.',
    target: 'empire-grid',
    icon: Sparkles,
    accent: 'emerald',
    advance: 'next',
  },
  {
    id: 'coins',
    title: 'Bamboo coins',
    body:
      'Coins are your spending money. You earn them from lessons and from structures on your map. The number below your balance is storage — if you are full, production pauses until you spend or expand storage.',
    target: 'coin-counter',
    icon: Coins,
    accent: 'amber',
    advance: 'next',
  },
  {
    id: 'productivity',
    title: 'Productivity',
    body:
      'Productivity multiplies everything your buildings produce. It drops if you grind without breaks, and events can knock it down. A healthy empire stays productive.',
    target: 'productivity-indicator',
    icon: Zap,
    accent: 'emerald',
    advance: 'next',
  },
  {
    id: 'grant_coins',
    title: 'Starter coins',
    body: `Here are ${TUTORIAL_GRANT_COINS} bamboo coins to get started. You will use them to build and upgrade in the next steps.`,
    target: 'coin-counter',
    icon: Coins,
    accent: 'amber',
    advance: 'next',
    onEnter: 'grant_coins',
  },
  {
    id: 'open_build',
    title: 'Build your first structure',
    body: 'Tap the Build button to open the structure menu. We will place a Bamboo Farm — your first source of passive income.',
    target: 'build-button',
    icon: Hammer,
    accent: 'emerald',
    advance: 'action',
    action: 'tap_build',
    cardPlacement: 'above',
  },
  {
    id: 'select_farm',
    title: 'Choose a Bamboo Farm',
    body: 'Select the Bamboo Farm. It produces coins over time, like a paycheck or side hustle.',
    target: 'building-bamboo_farm',
    icon: Hammer,
    accent: 'emerald',
    advance: 'action',
    action: 'select_farm',
    onEnter: 'open_build_menu',
    cardPlacement: 'above',
  },
  {
    id: 'place_farm',
    title: 'Place it on the map',
    body: 'Tap any green grass tile on the map to place your farm. Green tiles are buildable land — pick whichever spot you like.',
    target: null,
    icon: Hammer,
    accent: 'emerald',
    advance: 'action',
    action: 'place_building',
  },
  {
    id: 'select_building',
    title: 'Open your farm',
    body: 'Your farm is ready. Tap it on the map to see details and upgrades.',
    target: null,
    icon: Hammer,
    accent: 'emerald',
    advance: 'action',
    action: 'select_placed_building',
    onEnter: 'instant_complete_building',
  },
  {
    id: 'upgrade',
    title: 'Upgrade for more income',
    body: 'Upgrading costs coins but increases production — like investing in better tools or skills. Tap Upgrade once.',
    target: 'building-info-upgrade',
    icon: ArrowUp,
    accent: 'purple',
    advance: 'action',
    action: 'upgrade_building',
  },
  {
    id: 'economic_event',
    title: 'Economic shock',
    body:
      'Surprise costs happen in real life too — taxes, repairs, market dips. Watch what this event does to your coins, then dismiss the banner.',
    target: 'event-banner',
    icon: TrendingDown,
    accent: 'rose',
    advance: 'action',
    action: 'dismiss_event',
    onEnter: 'trigger_demo_event',
  },
  {
    id: 'done',
    title: 'You are ready to rule',
    body:
      'You have built, upgraded, and survived an economic hit. Keep learning, keep building, and check back — events will visit your empire every few hours.',
    target: null,
    icon: Sparkles,
    accent: 'emerald',
    advance: 'next',
  },
];

export function isTutorialComplete(): boolean {
  try {
    return localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function markTutorialComplete(): void {
  try {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
  } catch {
    /* ignore */
  }
}
