import type { LucideIcon } from 'lucide-react';
import { Coins, Zap, Hammer, Sparkles, TrendingDown, ArrowUp, CreditCard } from 'lucide-react';

export const TUTORIAL_STORAGE_KEY = 'bamboo_empire_tutorial_v2_completed';
/** @deprecated No longer used — users may place on any buildable grass tile */
export const TUTORIAL_PLACE_TILE = { x: 10, y: 10 };
export const TUTORIAL_GRANT_COINS = 150;
export const TUTORIAL_GRANT_XP = 50;
export const TUTORIAL_SEEDED_COLLECTION = 12;
export const TUTORIAL_DEMO_EVENT = 'tax_collection' as const;

export type TutorialAdvanceMode = 'next' | 'action';

export type TutorialCardPlacement = 'above' | 'below' | 'auto';

export type TutorialAction =
  | 'tap_build'
  | 'select_farm'
  | 'place_building'
  | 'select_placed_building'
  | 'collect_building'
  | 'upgrade_building'
  | 'open_credit'
  | 'pay_minimum'
  | 'dismiss_event'
  | 'select_dojo'
  | 'place_dojo'
  | 'select_dojo_building'
  | 'use_dojo';

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
  onEnter?:
    | 'grant_starter_resources'
    | 'open_build_menu'
    | 'trigger_demo_event'
    | 'instant_complete_building'
    | 'seed_collection'
    | 'open_credit_panel';
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
      'Farms and markets are income. Storage is your emergency fund. Banks earn interest. Credit lets you build now and pay from future bamboo. Training dojos keep your empire productive through rest and skill-building.',
    target: 'empire-grid',
    icon: Sparkles,
    accent: 'emerald',
    advance: 'next',
  },
  {
    id: 'coins',
    title: 'Bamboo coins',
    body:
      'Coins are cash on hand. You earn them from lessons and from buildings after you collect production. The number below your balance is storage — if storage is full, new production pauses until you spend or expand capacity.',
    target: 'coin-counter',
    icon: Coins,
    accent: 'amber',
    advance: 'next',
  },
  {
    id: 'productivity',
    title: 'Productivity',
    body:
      'Productivity is your empire wellness score. It multiplies production, drops when you grind without breaks, and recovers through time, positive events, and dojo programs like meditation or workouts.',
    target: 'productivity-indicator',
    icon: Zap,
    accent: 'emerald',
    advance: 'next',
  },
  {
    id: 'grant_coins',
    title: 'Starter cash and XP',
    body: `Here are ${TUTORIAL_GRANT_COINS} bamboo coins and ${TUTORIAL_GRANT_XP} XP. Builds charge your card, while bamboo is the cash you collect and use to pay that card down.`,
    target: 'coin-counter',
    icon: Coins,
    accent: 'amber',
    advance: 'next',
    onEnter: 'grant_starter_resources',
  },
  {
    id: 'credit_intro',
    title: 'Credit builds the empire',
    body:
      'Tap your credit score to see the card. Balance is what you borrowed, available credit is what you can still build with, and bamboo is what you use to make payments.',
    target: 'credit-indicator',
    icon: CreditCard,
    accent: 'indigo',
    advance: 'action',
    action: 'open_credit',
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
    id: 'collect_production',
    title: 'Collect production',
    body:
      'Production starts as coins waiting on the building. Collecting moves those coins into your bamboo balance so you can store, spend, or pay debt.',
    target: 'building-info-collect',
    icon: Coins,
    accent: 'amber',
    advance: 'action',
    action: 'collect_building',
    onEnter: 'seed_collection',
  },
  {
    id: 'upgrade',
    title: 'Upgrade for more income',
    body:
      'Upgrades also charge your card, but they increase future production. That is the tradeoff: borrow carefully, then use higher income to pay the balance down.',
    target: 'building-info-upgrade',
    icon: ArrowUp,
    accent: 'purple',
    advance: 'action',
    action: 'upgrade_building',
  },
  {
    id: 'open_credit_after_spend',
    title: 'Pay the card from bamboo',
    body:
      'Your build and upgrade created a card balance. Open the card again and make the minimum payment with bamboo so the debt stays healthy.',
    target: 'credit-indicator',
    icon: CreditCard,
    accent: 'indigo',
    advance: 'action',
    action: 'open_credit',
  },
  {
    id: 'pay_minimum',
    title: 'Make a payment',
    body:
      'Paying at least the minimum on time lowers debt pressure and can improve your score. Paying more keeps utilization low.',
    target: 'credit-pay-minimum',
    icon: CreditCard,
    accent: 'indigo',
    advance: 'action',
    action: 'pay_minimum',
    onEnter: 'open_credit_panel',
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
    id: 'open_build_dojo',
    title: 'Unlock the Training Dojo early',
    body:
      'At 50 XP, the Training Dojo is already available. Build it early so your empire has a place for rest, training, and morale boosts.',
    target: 'build-button',
    icon: Hammer,
    accent: 'emerald',
    advance: 'action',
    action: 'tap_build',
    cardPlacement: 'above',
  },
  {
    id: 'select_dojo',
    title: 'Choose the Training Dojo',
    body:
      'The dojo boosts farm production and unlocks wellness programs. It represents investing in skills, health, and sustainable work.',
    target: 'building-training_dojo',
    icon: Zap,
    accent: 'emerald',
    advance: 'action',
    action: 'select_dojo',
    onEnter: 'open_build_menu',
    cardPlacement: 'above',
  },
  {
    id: 'place_dojo',
    title: 'Place your dojo',
    body:
      'Place the dojo on any green grass tile. It becomes the hub for meditation, workouts, and productive social events.',
    target: null,
    icon: Hammer,
    accent: 'emerald',
    advance: 'action',
    action: 'place_dojo',
  },
  {
    id: 'select_dojo_building',
    title: 'Open the dojo',
    body:
      'Your dojo is ready. Open it to see the wellness programs that keep production healthy instead of relying on nonstop grinding.',
    target: null,
    icon: Zap,
    accent: 'emerald',
    advance: 'action',
    action: 'select_dojo_building',
    onEnter: 'instant_complete_building',
  },
  {
    id: 'use_dojo',
    title: 'Rest is productive',
    body:
      'Use Meditation to restore productivity. Workouts and happy hours can create temporary production boosts, but every program has a cooldown.',
    target: 'dojo-meditation',
    icon: Sparkles,
    accent: 'emerald',
    advance: 'action',
    action: 'use_dojo',
  },
  {
    id: 'done',
    title: 'You are ready to rule',
    body:
      'You have built with credit, collected production, paid the card, survived a shock, and used the dojo to recover. Keep learning, keep building, and balance growth with rest.',
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
