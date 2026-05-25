/**
 * MI-style enrichments for all 20 micro lessons (Try, Connect, hero, charts).
 * Applied via applyMicroEnrichment() — registry keys registered on apply.
 */

import type { EconomicsLesson } from '@/types/economics-curriculum';
import type { EconomicsChartConfig } from '@/types/economics-charts';
import { econImg } from '@/data/economics-lesson-helpers';
import { registerChart, registerStatic } from '@/data/economics-visual-registry';

const U1 = 'micro-1';
const U2 = 'micro-2';
const U3 = 'micro-3';
const U4 = 'micro-4';
const U5 = 'micro-5';

function hero(unit: string, lessonId: string, alt: string) {
  const v = econImg(unit, lessonId, 'hero', alt);
  registerStatic(lessonId, 'hero', v.src);
  return v;
}

function connectPf(unit: string, lessonId: string, alt: string) {
  const v = econImg(unit, lessonId, 'connect-pf', alt);
  registerStatic(lessonId, 'connect-pf', v.src);
  return v;
}

function connectCareer(unit: string, lessonId: string, alt: string) {
  const v = econImg(unit, lessonId, 'connect-career', alt);
  registerStatic(lessonId, 'connect-career', v.src);
  return v;
}

function conceptVisual(unit: string, lessonId: string, name: string, alt: string) {
  const v = econImg(unit, lessonId, name, alt);
  registerStatic(lessonId, `concept-${name}`, v.src);
  return v;
}

function chart(lessonId: string, slot: string, config: EconomicsChartConfig): EconomicsChartConfig {
  registerChart(lessonId, slot, config);
  return config;
}

type PartialLesson = Pick<
  EconomicsLesson,
  'intro' | 'coreConcepts' | 'tryActivity' | 'connect' | 'rewards'
> & { conceptCharts?: EconomicsChartConfig[]; conceptVisuals?: ReturnType<typeof conceptVisual>[] };

export const MICRO_LESSON_ENRICHMENTS: Record<string, PartialLesson> = {
  'micro-1-lesson-1': {
    intro: {
      hook: 'You already used a market today—coffee, apps, gas. A market is just anywhere buyers meet sellers.',
      philMessage: "I'm Phil. See how price links what people want with what sellers bring—that's the core idea.",
      heroImage: hero(U1, 'micro-1-lesson-1', 'Buyers and sellers meeting in a marketplace'),
    },
    tryActivity: {
      type: 'term-classify',
      title: 'Who is who in the market?',
      description: 'Classify each role in the scenario.',
      categories: [
        { id: 'buyer', label: 'Buyer (demand)' },
        { id: 'seller', label: 'Seller (supply)' },
      ],
      terms: [
        { id: 't1', label: 'You resell concert tickets', correctCategory: 'seller' },
        { id: 't2', label: 'You buy lunch in the cafeteria', correctCategory: 'buyer' },
        { id: 't3', label: 'A food truck owner sets menu prices', correctCategory: 'seller' },
        { id: 't4', label: 'You compare phone plans online', correctCategory: 'buyer' },
      ],
    },
    connect: {
      personalFinance: {
        title: 'Your money',
        description: 'Every purchase you make is a spot on a demand curve—you choose how much to buy at the price offered.',
        scenario: 'Waiting for a sale on sneakers is betting that your quantity demanded will rise when price falls.',
        visual: connectPf(U1, 'micro-1-lesson-1', 'Teen comparing prices before buying'),
      },
      career: {
        title: 'On the job',
        description: 'Market analysts track who is buying, who is selling, and at what prices.',
        role: 'Market Analyst',
        skills: ['Data analysis', 'Pricing trends', 'Consumer research'],
        visual: connectCareer(U1, 'micro-1-lesson-1', 'Analyst reviewing market data'),
      },
    },
    rewards: { bamboo: 12, xp: 3 },
  },

  'micro-1-lesson-2': {
    intro: {
      hook: 'Sales work because one rule is almost always true: raise the price and people buy less.',
      philMessage: "That rule is the law of demand—let's read it on a curve and spot real shifts.",
      heroImage: hero(U1, 'micro-1-lesson-2', 'Downward-sloping demand curve diagram'),
    },
    tryActivity: {
      type: 'line-item-sort',
      title: 'Movement or shift?',
      description: 'Sort each scenario as a movement along demand or a shift of the curve.',
      buckets: [
        { id: 'along', label: 'Along the curve' },
        { id: 'shift', label: 'Shift of demand' },
      ],
      items: [
        { id: '1', label: 'Netflix cuts subscription price', correctBucket: 'along' },
        { id: '2', label: 'A viral rival app launches', correctBucket: 'shift' },
        { id: '3', label: 'Gas station raises price 20¢', correctBucket: 'along' },
        { id: '4', label: 'Consumer incomes rise economy-wide', correctBucket: 'shift' },
      ],
    },
    connect: {
      personalFinance: {
        title: 'Your money',
        description: '“On sale” moves you along your demand curve—only a good deal if you wanted the item anyway.',
        scenario: 'Black Friday: if you would not pay full price, you might be buying the discount, not the product.',
        visual: connectPf(U1, 'micro-1-lesson-2', 'Shopping sale vs full price decision'),
      },
      career: {
        title: 'On the job',
        description: 'Demand forecasters model how price and trends change quantity demanded.',
        role: 'Demand Forecaster',
        skills: ['Forecasting', 'Elasticity', 'Excel/Python'],
        visual: connectCareer(U1, 'micro-1-lesson-2', 'Forecaster with demand charts'),
      },
    },
    rewards: { bamboo: 12, xp: 3 },
  },

  'micro-1-lesson-3': {
    intro: {
      hook: 'Surge pricing is not greed—it is supply responding to price signals.',
      philMessage: 'The law of supply slopes up. Let us trace movements and shifts on the supply curve.',
      heroImage: hero(U1, 'micro-1-lesson-3', 'Upward-sloping supply curve diagram'),
    },
    tryActivity: {
      type: 'line-item-sort',
      title: 'Supply scenarios',
      description: 'Sort each event as movement along supply or a supply shift.',
      buckets: [
        { id: 'along', label: 'Along supply' },
        { id: 'shift', label: 'Supply shift' },
      ],
      items: [
        { id: '1', label: 'Farmers get higher crop prices', correctBucket: 'along' },
        { id: '2', label: 'New tech cuts production costs', correctBucket: 'shift' },
        { id: '3', label: 'Oil drillers respond to $90/barrel', correctBucket: 'along' },
        { id: '4', label: 'Regulations shut half the factories', correctBucket: 'shift' },
      ],
    },
    connect: {
      personalFinance: {
        title: 'Your money',
        description: 'Scarce supply (limited drops, tight housing) usually means higher prices—time purchases if you can.',
        scenario: 'Buying winter gear off-season uses supply timing to your advantage.',
        visual: connectPf(U1, 'micro-1-lesson-3', 'Seasonal shopping and supply'),
      },
      career: {
        title: 'On the job',
        description: 'Supply chain managers align production with price signals and costs.',
        role: 'Supply Chain Manager',
        skills: ['Logistics', 'Cost control', 'Vendor negotiation'],
        visual: connectCareer(U1, 'micro-1-lesson-3', 'Supply chain professional'),
      },
    },
    rewards: { bamboo: 12, xp: 3 },
  },

  'micro-1-lesson-4': {
    intro: {
      hook: 'When shelves empty or pile up, the market is screaming: price is wrong.',
      philMessage: 'Equilibrium is where supply meets demand. Shortages and surpluses push price toward balance.',
      heroImage: hero(U1, 'micro-1-lesson-4', 'Supply and demand equilibrium intersection'),
    },
    tryActivity: {
      type: 'scenario-choice',
      title: 'Fix the market',
      description: 'Choose the best response when the market is out of balance.',
      rounds: [
        {
          id: 'r1',
          prompt: 'Concert tickets sell out in minutes at $40. Secondary market hits $200. What is happening?',
          options: [
            { id: 'a', label: 'Shortage at $40 — price below equilibrium', feedback: 'Yes! Quantity demanded exceeds quantity supplied at the low price.' },
            { id: 'b', label: 'Surplus at $40', feedback: 'A surplus means too much supply at that price—not this case.' },
          ],
        },
        {
          id: 'r2',
          prompt: 'Used bikes pile up unsold after a price hike. Best label?',
          options: [
            { id: 'a', label: 'Surplus — price above equilibrium', feedback: 'Correct. Sellers have more than buyers want at that price.' },
            { id: 'b', label: 'Shortage', feedback: 'Shortages happen when price is too low, not too high.' },
          ],
        },
      ],
    },
    connect: {
      personalFinance: {
        title: 'Your money',
        description: 'Housing bidding wars are shortages; clearance racks are surpluses. Read the signal before you buy.',
        scenario: 'Offering over asking on a hot listing is competing in a shortage—know your max price first.',
        visual: connectPf(U1, 'micro-1-lesson-4', 'Housing demand and pricing'),
      },
      career: {
        title: 'On the job',
        description: 'Market analysts predict where equilibrium is moving after shocks.',
        role: 'Market Analyst',
        skills: ['Equilibrium modeling', 'Commodity markets', 'Reporting'],
        visual: connectCareer(U1, 'micro-1-lesson-4', 'Analyst at trading screens'),
      },
    },
    rewards: { bamboo: 15, xp: 4 },
  },
};

// Chart assignments applied by index in applyMicroEnrichment
export const MICRO_CONCEPT_CHARTS: Record<string, EconomicsChartConfig[]> = {
  'micro-1-lesson-2': [
    chart('micro-1-lesson-2', 'c0', { type: 'supply-demand', stateId: 'demand-curve', caption: 'Law of demand: price ↑ → quantity demanded ↓' }),
    chart('micro-1-lesson-2', 'c1', { type: 'supply-demand', stateId: 'movement-along-demand', caption: 'Movement along the same demand curve' }),
    chart('micro-1-lesson-2', 'c2', { type: 'supply-demand', stateId: 'demand-shift-right', caption: 'Demand increases → curve shifts right' }),
  ],
  'micro-1-lesson-3': [
    chart('micro-1-lesson-3', 'c0', { type: 'supply-demand', stateId: 'supply-curve', caption: 'Law of supply: price ↑ → quantity supplied ↑' }),
    chart('micro-1-lesson-3', 'c1', { type: 'supply-demand', stateId: 'movement-along-supply', caption: 'Movement along supply' }),
    chart('micro-1-lesson-3', 'c2', { type: 'supply-demand', stateId: 'supply-shift-right', caption: 'Supply increases → curve shifts right' }),
  ],
  'micro-1-lesson-4': [
    chart('micro-1-lesson-4', 'c0', { type: 'supply-demand', stateId: 'equilibrium', caption: 'Equilibrium: quantity supplied = quantity demanded' }),
    chart('micro-1-lesson-4', 'c1', { type: 'supply-demand', stateId: 'shortage', caption: 'Price below equilibrium → shortage' }),
    chart('micro-1-lesson-4', 'c2', { type: 'supply-demand', stateId: 'surplus', caption: 'Price above equilibrium → surplus' }),
  ],
  'micro-2-lesson-1': [
    chart('micro-2-lesson-1', 'c0', { type: 'elasticity', stateId: 'inelastic-steep', caption: 'Inelastic: quantity barely responds to price' }),
    chart('micro-2-lesson-1', 'c1', { type: 'elasticity', stateId: 'elastic-flat', caption: 'Elastic: quantity very responsive' }),
    chart('micro-2-lesson-1', 'c2', { type: 'elasticity', stateId: 'perfect-inelastic', caption: 'Perfectly inelastic (vertical)' }),
  ],
  'micro-2-lesson-2': [
    chart('micro-2-lesson-2', 'c0', { type: 'elasticity', stateId: 'substitutes-effect', caption: 'More substitutes → more elastic' }),
    chart('micro-2-lesson-2', 'c1', { type: 'elasticity', stateId: 'inelastic-steep', caption: 'Necessities tend to be inelastic' }),
    chart('micro-2-lesson-2', 'c2', { type: 'elasticity', stateId: 'elastic-flat', caption: 'Longer time → more elastic responses' }),
  ],
  'micro-2-lesson-3': [
    chart('micro-2-lesson-3', 'c0', { type: 'elasticity', stateId: 'revenue-inelastic', caption: 'Inelastic: price ↑ can raise total revenue' }),
    chart('micro-2-lesson-3', 'c1', { type: 'elasticity', stateId: 'revenue-elastic', caption: 'Elastic: price ↑ can cut total revenue' }),
    chart('micro-2-lesson-3', 'c2', { type: 'elasticity', stateId: 'supply-elastic', caption: 'Total revenue = price × quantity' }),
  ],
  'micro-2-lesson-4': [
    chart('micro-2-lesson-4', 'c0', { type: 'elasticity', stateId: 'income-normal', caption: 'Normal good: income ↑ → demand ↑' }),
    chart('micro-2-lesson-4', 'c1', { type: 'elasticity', stateId: 'cross-complement', caption: 'Complements: negative cross-price elasticity' }),
    chart('micro-2-lesson-4', 'c2', { type: 'elasticity', stateId: 'cross-substitute', caption: 'Substitutes: positive cross-price elasticity' }),
  ],
  'micro-3-lesson-1': [
    chart('micro-3-lesson-1', 'c0', { type: 'utility-budget', stateId: 'mu-declining', caption: 'Marginal utility often falls as you consume more' }),
    chart('micro-3-lesson-1', 'c1', { type: 'utility-budget', stateId: 'total-vs-marginal', caption: 'Total vs marginal utility' }),
    chart('micro-3-lesson-1', 'c2', { type: 'utility-budget', stateId: 'diminishing-mu', caption: 'Diminishing marginal utility' }),
  ],
  'micro-3-lesson-2': [
    chart('micro-3-lesson-2', 'c0', { type: 'utility-budget', stateId: 'budget-line', caption: 'Budget constraint: affordable combinations' }),
    chart('micro-3-lesson-2', 'c1', { type: 'utility-budget', stateId: 'opportunity-cost-slope', caption: 'Slope = opportunity cost' }),
    chart('micro-3-lesson-2', 'c2', { type: 'utility-budget', stateId: 'budget-pivot', caption: 'Income change pivots the budget line' }),
  ],
  'micro-3-lesson-3': [
    chart('micro-3-lesson-3', 'c0', { type: 'utility-budget', stateId: 'mu-per-dollar', caption: 'Compare MU per dollar across goods' }),
    chart('micro-3-lesson-3', 'c1', { type: 'utility-budget', stateId: 'utility-max-rule', caption: 'Maximize utility where MU/P is equal' }),
    chart('micro-3-lesson-3', 'c2', { type: 'utility-budget', stateId: 'equal-marginal', caption: 'Equal marginal utility per dollar' }),
  ],
  'micro-3-lesson-4': [
    chart('micro-3-lesson-4', 'c0', { type: 'utility-budget', stateId: 'consumer-surplus', caption: 'Area below demand, above price paid' }),
    chart('micro-3-lesson-4', 'c1', { type: 'utility-budget', stateId: 'equal-marginal', caption: 'Willingness to pay vs market price' }),
    chart('micro-3-lesson-4', 'c2', { type: 'utility-budget', stateId: 'surplus-shrink', caption: 'Higher price shrinks consumer surplus' }),
  ],
  'micro-4-lesson-1': [
    chart('micro-4-lesson-1', 'c0', { type: 'market-structure', stateId: 'spectrum', caption: 'From perfect competition to monopoly' }),
    chart('micro-4-lesson-1', 'c1', { type: 'market-structure', stateId: 'monopolistic', caption: 'Four main market structures' }),
    chart('micro-4-lesson-1', 'c2', { type: 'market-structure', stateId: 'perfect-competition', caption: 'Many firms, identical products' }),
  ],
  'micro-4-lesson-2': [
    chart('micro-4-lesson-2', 'c0', { type: 'market-structure', stateId: 'perfect-competition', caption: 'Perfect competition characteristics' }),
    chart('micro-4-lesson-2', 'c1', { type: 'market-structure', stateId: 'price-taker', caption: 'Firm is a price taker' }),
    chart('micro-4-lesson-2', 'c2', { type: 'market-structure', stateId: 'monopoly-firm-demand', caption: 'Contrast: downward sloping demand' }),
  ],
  'micro-4-lesson-3': [
    chart('micro-4-lesson-3', 'c0', { type: 'market-structure', stateId: 'monopolistic', caption: 'Monopolistic competition' }),
    chart('micro-4-lesson-3', 'c1', { type: 'market-structure', stateId: 'oligopoly', caption: 'Few rivals, strategic behavior' }),
    chart('micro-4-lesson-3', 'c2', { type: 'market-structure', stateId: 'deadweight-loss', caption: 'Strategic rivalry and welfare' }),
  ],
  'micro-4-lesson-4': [
    chart('micro-4-lesson-4', 'c0', { type: 'market-structure', stateId: 'monopoly-firm-demand', caption: 'Monopoly faces market demand' }),
    chart('micro-4-lesson-4', 'c1', { type: 'market-structure', stateId: 'monopoly-mr', caption: 'Marginal revenue lies below demand' }),
    chart('micro-4-lesson-4', 'c2', { type: 'market-structure', stateId: 'deadweight-loss', caption: 'Deadweight loss from market power' }),
  ],
  'micro-5-lesson-1': [
    chart('micro-5-lesson-1', 'c0', { type: 'market-failure', stateId: 'failure-overview', caption: 'When private markets misallocate resources' }),
    chart('micro-5-lesson-1', 'c1', { type: 'market-failure', stateId: 'negative-externality', caption: 'Negative externality: social cost > private cost' }),
    chart('micro-5-lesson-1', 'c2', { type: 'market-failure', stateId: 'information-asymmetry', caption: 'Information gaps also cause failure' }),
  ],
  'micro-5-lesson-2': [
    chart('micro-5-lesson-2', 'c0', { type: 'market-failure', stateId: 'negative-externality', caption: 'Pollution example' }),
    chart('micro-5-lesson-2', 'c1', { type: 'market-failure', stateId: 'positive-externality', caption: 'Positive externality: social benefit > private benefit' }),
    chart('micro-5-lesson-2', 'c2', { type: 'market-failure', stateId: 'tax-wedge', caption: 'Tax can internalize a negative externality' }),
  ],
  'micro-5-lesson-3': [
    chart('micro-5-lesson-3', 'c0', { type: 'market-failure', stateId: 'public-goods-matrix', caption: 'Rivalry and excludability matrix' }),
    chart('micro-5-lesson-3', 'c1', { type: 'market-failure', stateId: 'public-goods-matrix', caption: 'Public vs private goods' }),
    chart('micro-5-lesson-3', 'c2', { type: 'market-failure', stateId: 'common-resource', caption: 'Common resources and tragedy of the commons' }),
  ],
  'micro-5-lesson-4': [
    chart('micro-5-lesson-4', 'c0', { type: 'market-failure', stateId: 'price-ceiling', caption: 'Price ceiling below equilibrium' }),
    chart('micro-5-lesson-4', 'c1', { type: 'market-failure', stateId: 'price-floor', caption: 'Price floor above equilibrium' }),
    chart('micro-5-lesson-4', 'c2', { type: 'market-failure', stateId: 'tax-wedge', caption: 'Taxes and subsidies change incentives' }),
  ],
};

// Additional lesson metadata for units 2-5 (hero, try, connect) — abbreviated helpers
function enrichBlock(
  lessonId: string,
  unit: string,
  opts: {
    hook: string;
    phil: string;
    heroAlt: string;
    try: EconomicsLesson['tryActivity'];
    pf: { title: string; description: string; scenario: string; alt: string };
    career: { role: string; description: string; skills: string[]; alt: string };
  }
): PartialLesson {
  return {
    intro: { hook: opts.hook, philMessage: opts.phil, heroImage: hero(unit, lessonId, opts.heroAlt) },
    tryActivity: opts.try,
    connect: {
      personalFinance: {
        title: opts.pf.title,
        description: opts.pf.description,
        scenario: opts.pf.scenario,
        visual: connectPf(unit, lessonId, opts.pf.alt),
      },
      career: {
        title: 'On the job',
        description: opts.career.description,
        role: opts.career.role,
        skills: opts.career.skills,
        visual: connectCareer(unit, lessonId, opts.career.alt),
      },
    },
    rewards: { bamboo: 12, xp: 3 },
  };
}

Object.assign(MICRO_LESSON_ENRICHMENTS, {
  'micro-2-lesson-1': enrichBlock('micro-2-lesson-1', U2, {
    hook: 'Why can movie theaters raise popcorn prices but streaming cannot raise fees without losing subscribers?',
    phil: 'Elasticity measures responsiveness. Steep curves mean inelastic; flat curves mean elastic.',
    heroAlt: 'Steep vs flat demand curves showing elasticity',
    try: {
      type: 'term-classify',
      title: 'Elastic or inelastic?',
      description: 'Classify each product by typical demand elasticity.',
      categories: [
        { id: 'inelastic', label: 'Inelastic' },
        { id: 'elastic', label: 'Elastic' },
      ],
      terms: [
        { id: 't1', label: 'Insulin for diabetics', correctCategory: 'inelastic' },
        { id: 't2', label: 'Brand-name soda vs many substitutes', correctCategory: 'elastic' },
        { id: 't3', label: 'Gasoline short-term', correctCategory: 'inelastic' },
        { id: 't4', label: 'Luxury vacation packages', correctCategory: 'elastic' },
      ],
    },
    pf: { title: 'Your money', description: 'Knowing elasticity helps you predict whether a price hike hurts your wallet a little or a lot.', scenario: 'Generic ibuprofen vs brand—elastic good gives you bargaining power.', alt: 'Generic vs brand medicine prices' },
    career: { role: 'Revenue Manager', description: 'Sets prices using elasticity to protect total revenue.', skills: ['Pricing', 'A/B testing', 'Analytics'], alt: 'Revenue manager reviewing pricing dashboard' },
  }),
  'micro-2-lesson-2': enrichBlock('micro-2-lesson-2', U2, {
    hook: 'The same 10% price change hits insulin and streaming subscriptions very differently.',
    phil: 'Substitutes, necessity, budget share, and time all shape elasticity.',
    heroAlt: 'Determinants of price elasticity infographic',
    try: {
      type: 'line-item-sort',
      title: 'What drives elasticity?',
      description: 'Match each factor to more elastic or more inelastic demand.',
      buckets: [
        { id: 'elastic', label: 'More elastic' },
        { id: 'inelastic', label: 'More inelastic' },
      ],
      items: [
        { id: '1', label: 'Many close substitutes', correctBucket: 'elastic' },
        { id: '2', label: 'Necessity with no substitute', correctBucket: 'inelastic' },
        { id: '3', label: 'Long time to adjust habits', correctBucket: 'elastic' },
        { id: '4', label: 'Tiny share of your budget', correctBucket: 'inelastic' },
      ],
    },
    pf: { title: 'Your money', description: 'Build substitutes into your plan—second-choice streaming, store brands, carpooling.', scenario: 'More substitutes = more power when prices rise.', alt: 'Shopping alternatives comparison' },
    career: { role: 'Product Manager', description: 'Uses elasticity to forecast adoption and pricing.', skills: ['Market research', 'Pricing tests'], alt: 'Product manager in strategy meeting' },
  }),
  'micro-2-lesson-3': enrichBlock('micro-2-lesson-3', U2, {
    hook: 'A price hike can raise or destroy total revenue—the elasticity test decides.',
    phil: 'Total revenue = price × quantity. Elasticity tells you which factor wins.',
    heroAlt: 'Total revenue rectangle on demand curve',
    try: {
      type: 'scenario-choice',
      title: 'Revenue test',
      description: 'Predict revenue after a price change.',
      rounds: [
        {
          id: 'r1',
          prompt: 'Inelastic demand: price rises 10%. Total revenue likely…',
          options: [
            { id: 'a', label: 'Increases', feedback: 'Correct—quantity falls less than 10%, so P×Q rises.' },
            { id: 'b', label: 'Falls', feedback: 'With inelastic demand, revenue usually rises when price rises.' },
          ],
        },
        {
          id: 'r2',
          prompt: 'Elastic demand: price rises 10%. Total revenue likely…',
          options: [
            { id: 'a', label: 'Falls', feedback: 'Right—quantity plunges enough to cut revenue.' },
            { id: 'b', label: 'Increases', feedback: 'Elastic buyers leave when price rises—revenue drops.' },
          ],
        },
      ],
    },
    pf: { title: 'Your money', description: 'Businesses use the revenue test—you can too when negotiating or side hustling.', scenario: 'Raising babysitting rates works only if clients are inelastic (loyal, few options).', alt: 'Side hustle pricing decision' },
    career: { role: 'Pricing Analyst', description: 'Runs elasticity studies before price changes.', skills: ['Econometrics', 'Excel', 'Presentation'], alt: 'Pricing analyst with charts' },
  }),
  'micro-2-lesson-4': enrichBlock('micro-2-lesson-4', U2, {
    hook: 'Your spending on ramen vs concert tickets reacts differently when your allowance changes.',
    phil: 'Income and cross-price elasticity connect markets together.',
    heroAlt: 'Income and cross-price elasticity diagrams',
    try: {
      type: 'line-item-sort',
      title: 'Sort the relationships',
      description: 'Classify each pair.',
      buckets: [
        { id: 'comp', label: 'Complements' },
        { id: 'sub', label: 'Substitutes' },
      ],
      items: [
        { id: '1', label: 'Phones & phone cases', correctBucket: 'comp' },
        { id: '2', label: 'Butter & margarine', correctBucket: 'sub' },
        { id: '3', label: 'Coffee & cream', correctBucket: 'comp' },
        { id: '4', label: 'Buses & rideshare', correctBucket: 'sub' },
      ],
    },
    pf: { title: 'Your money', description: 'When one price jumps, linked goods move too—budget for complements together.', scenario: 'Cheap console sale means you will spend more on games later.', alt: 'Gaming console and games budget' },
    career: { role: 'Economist', description: 'Estimates cross-price effects for policy and business.', skills: ['Regression', 'Data cleaning'], alt: 'Economist modeling demand' },
  }),
});

// Units 3-5 enrich blocks (continued in same file for brevity - add remaining 12 lessons)
const u3u4u5: Record<string, ReturnType<typeof enrichBlock>> = {
  'micro-3-lesson-1': enrichBlock('micro-3-lesson-1', U3, {
    hook: 'The fifth slice of pizza rarely tastes as good as the first—that is utility in action.',
    phil: 'Utility is satisfaction. Marginal utility is the next bite, dollar, or hour.',
    heroAlt: 'Declining marginal utility bars',
    try: { type: 'term-classify', title: 'Utility check', description: 'Identify the concept.', categories: [{ id: 'mu', label: 'Marginal utility' }, { id: 'tu', label: 'Total utility' }], terms: [{ id: 't1', label: 'Happiness from the 3rd song play', correctCategory: 'mu' }, { id: 't2', label: 'Total joy from the whole concert', correctCategory: 'tu' }] },
    pf: { title: 'Your money', description: 'Stop buying when marginal utility of the next dollar spent is not worth it.', scenario: 'Buffet stops feeling worth it after plate three—diminishing MU.', alt: 'Buffet and satisfaction' },
    career: { role: 'Consumer Insights Analyst', description: 'Studies what drives satisfaction and repeat purchase.', skills: ['Surveys', 'Behavioral data'], alt: 'Consumer insights researcher' },
  }),
  'micro-3-lesson-2': enrichBlock('micro-3-lesson-2', U3, {
    hook: 'Your monthly budget is a line—you cannot afford everything above it.',
    phil: 'Budget constraints force tradeoffs. Slope shows opportunity cost.',
    heroAlt: 'Budget line between two goods',
    try: { type: 'scenario-choice', title: 'Budget tradeoff', description: 'Pick the best choice.', rounds: [{ id: 'r1', prompt: 'You have $60 for the week: $40 on transit pass or $40 on meals plus $20 snacks?', options: [{ id: 'a', label: 'Choose based on highest MU per dollar', feedback: 'Smart—optimize satisfaction per dollar, not just totals.' }, { id: 'b', label: 'Spend randomly', feedback: 'Random spending ignores opportunity cost.' }] }] },
    pf: { title: 'Your money', description: 'Every yes to one purchase is a no to another—trace your budget line.', scenario: 'Choosing a phone upgrade means fewer concerts this semester.', alt: 'Student budget tradeoffs' },
    career: { role: 'Financial Coach', description: 'Helps households map constraints and goals.', skills: ['Budgeting', 'Coaching'], alt: 'Financial coaching session' },
  }),
  'micro-3-lesson-3': enrichBlock('micro-3-lesson-3', U3, {
    hook: 'Smart shoppers equalize happiness per dollar across categories.',
    phil: 'Utility max: MU₁/P₁ = MU₂/P₂. Adjust until marginal bang per buck matches.',
    heroAlt: 'Equal marginal utility per dollar',
    try: { type: 'line-item-sort', title: 'Better buy?', description: 'Which purchase improves utility per dollar?', buckets: [{ id: 'yes', label: 'Improves MU/$' }, { id: 'no', label: 'Does not' }], items: [{ id: '1', label: 'Switch spend from overpriced brand to generic with same benefit', correctBucket: 'yes' }, { id: '2', label: 'Buy another item you are sick of', correctBucket: 'no' }] },
    pf: { title: 'Your money', description: 'Reallocate spending toward categories still giving high MU per dollar.', scenario: 'Stop topping up wardrobe when travel experiences still excite you more per $.', alt: 'Reallocating student spending' },
    career: { role: 'Behavioral Economist', description: 'Tests how real people maximize (or miss) utility.', skills: ['Experiments', 'Statistics'], alt: 'Behavioral economics lab' },
  }),
  'micro-3-lesson-4': enrichBlock('micro-3-lesson-4', U3, {
    hook: 'The deal you got on sneakers is the gap between what you would pay and what you paid.',
    phil: 'Consumer surplus is willingness to pay minus price.',
    heroAlt: 'Consumer surplus triangle under demand',
    try: { type: 'scenario-choice', title: 'Surplus story', description: 'Who gains consumer surplus?', rounds: [{ id: 'r1', prompt: 'Sale price $30, you would pay up to $80. Surplus?', options: [{ id: 'a', label: '$50', feedback: 'Yes—WTP minus price.' }, { id: 'b', label: '$30', feedback: 'That is price paid, not surplus.' }] }] },
    pf: { title: 'Your money', description: 'Wait for prices closer to your willingness to pay to capture surplus.', scenario: 'Patience on electronics launches can save hundreds in surplus.', alt: 'Waiting for a better price' },
    career: { role: 'Pricing Strategist', description: 'Balances firm revenue with consumer surplus and competition.', skills: ['WTP research', 'Pricing'], alt: 'Pricing strategy workshop' },
  }),
  'micro-4-lesson-1': enrichBlock('micro-4-lesson-1', U4, {
    hook: 'Why one coffee shop on a block can charge more than five competing pizza places.',
    phil: 'Market structure sets the rules—how many rivals and how much power you have.',
    heroAlt: 'Market structure spectrum',
    try: { type: 'term-classify', title: 'Structure traits', description: 'Match traits to competitive or concentrated markets.', categories: [{ id: 'comp', label: 'More competitive' }, { id: 'conc', label: 'More concentrated' }], terms: [{ id: 't1', label: 'Many sellers, identical product', correctCategory: 'comp' }, { id: 't2', label: 'Single seller, high barriers', correctCategory: 'conc' }] },
    pf: { title: 'Your money', description: 'Concentrated markets mean less bargaining power—seek competition when you can.', scenario: 'Compare three insurance quotes vs accepting the only campus plan.', alt: 'Comparing competitive offers' },
    career: { role: 'Strategy Consultant', description: 'Advises firms based on industry structure.', skills: ['Industry analysis', 'Competitive strategy'], alt: 'Strategy consultant presentation' },
  }),
  'micro-4-lesson-2': enrichBlock('micro-4-lesson-2', U4, {
    hook: 'Wheat farmers are price takers; your favorite game launcher is not.',
    phil: 'In perfect competition, the firm faces a flat demand curve at the market price.',
    heroAlt: 'Horizontal firm demand in perfect competition',
    try: { type: 'role-match', title: 'Who sets price?', description: 'Match scenario to market type.', roles: [{ id: 'pc', name: 'Perfect competition', description: 'Price taker' }, { id: 'mono', name: 'Monopoly', description: 'Price maker' }], scenarios: [{ id: 's1', description: 'Thousands of corn farms sell identical corn', correctRoleId: 'pc' }, { id: 's2', description: 'One municipal water utility', correctRoleId: 'mono' }] },
    pf: { title: 'Your money', description: 'Shop in competitive markets when possible—prices stay near cost.', scenario: 'Farmers markets vs exclusive drops.', alt: 'Farmers market many sellers' },
    career: { role: 'Commodity Analyst', description: 'Tracks perfectly competitive commodity markets.', skills: ['Futures markets', 'Supply reports'], alt: 'Commodity trading desk' },
  }),
  'micro-4-lesson-3': enrichBlock('micro-4-lesson-3', U4, {
    hook: 'Chip brands advertise because they are not selling identical wheat—they fight for your attention.',
    phil: 'Monopolistic competition and oligopoly blend rivalry with differentiation.',
    heroAlt: 'Downward sloping firm demand with differentiation',
    try: { type: 'scenario-choice', title: 'Rivalry move', description: 'Pick the oligopoly-style response.', rounds: [{ id: 'r1', prompt: 'Airlines match a fare cut within hours. This shows…', options: [{ id: 'a', label: 'Interdependent rivals', feedback: 'Yes—oligopolists watch each other closely.' }, { id: 'b', label: 'Perfect competition', feedback: 'Perfect competitors do not strategically match one rival.' }] }] },
    pf: { title: 'Your money', description: 'Brand loyalty can soften competition—compare true value, not ads.', scenario: 'Switching costs lock you in; hunt for real substitutes.', alt: 'Brand vs generic choice' },
    career: { role: 'Brand Manager', description: 'Builds differentiation in monopolistic competition.', skills: ['Marketing', 'Positioning'], alt: 'Brand marketing team' },
  }),
  'micro-4-lesson-4': enrichBlock('micro-4-lesson-4', U4, {
    hook: 'One platform controlling search or social can set prices far above cost.',
    phil: 'Monopolists face market demand and limit quantity to raise price.',
    heroAlt: 'Monopoly demand and marginal revenue',
    try: { type: 'scenario-choice', title: 'Pricing power', description: 'Monopoly logic.', rounds: [{ id: 'r1', prompt: 'A monopolist cuts output to raise price. Consumer surplus…', options: [{ id: 'a', label: 'Falls', feedback: 'Correct—higher price and less quantity hurt buyers.' }, { id: 'b', label: 'Always rises', feedback: 'Higher monopoly prices shrink surplus.' }] }] },
    pf: { title: 'Your money', description: 'Support competition policy and alternatives when one firm dominates.', scenario: 'Use open app stores or second-hand markets to avoid lock-in.', alt: 'Digital marketplace competition' },
    career: { role: 'Antitrust Economist', description: 'Evaluates mergers and monopoly power.', skills: ['Law', 'Industrial organization'], alt: 'Antitrust legal team' },
  }),
  'micro-5-lesson-1': enrichBlock('micro-5-lesson-1', U5, {
    hook: 'Free markets fail when prices miss social costs and benefits.',
    phil: 'Market failure means the invisible hand drops the ball—time for policy tools.',
    heroAlt: 'Market failure overview diagram',
    try: { type: 'term-classify', title: 'Failure types', description: 'Classify each example.', categories: [{ id: 'ext', label: 'Externality' }, { id: 'info', label: 'Information problem' }], terms: [{ id: 't1', label: 'Factory smoke harms neighbors', correctCategory: 'ext' }, { id: 't2', label: 'Seller hides car accident history', correctCategory: 'info' }] },
    pf: { title: 'Your money', description: 'Externalities hit your health and wallet—pollution, noise, fraud.', scenario: 'Buy reports and warranties when information is asymmetric.', alt: 'Used car inspection' },
    career: { role: 'Policy Economist', description: 'Analyzes when and how government should intervene.', skills: ['Cost-benefit', 'Regulation'], alt: 'Policy economist briefing' },
  }),
  'micro-5-lesson-2': enrichBlock('micro-5-lesson-2', U5, {
    hook: 'A vaccine helps you and everyone around you—markets alone may underproduce it.',
    phil: 'Taxes and subsidies can line up private incentives with social goals.',
    heroAlt: 'Externality and tax wedge diagram',
    try: { type: 'scenario-choice', title: 'Policy pick', description: 'Choose a tool for the externality.', rounds: [{ id: 'r1', prompt: 'Coal plant pollution—best first step?', options: [{ id: 'a', label: 'Pigouvian tax on emissions', feedback: 'Tax can internalize social cost.' }, { id: 'b', label: 'Ignore it', feedback: 'Ignoring negative externalities overproduces pollution.' }] }] },
    pf: { title: 'Your money', description: 'Carbon fees and EV credits change prices you face—plan long term.', scenario: 'Choose energy-efficient appliances when power has social costs.', alt: 'Energy efficient home choices' },
    career: { role: 'Environmental Economist', description: 'Designs market-based environmental policy.', skills: ['Environmental science', 'Modeling'], alt: 'Environmental policy analyst' },
  }),
  'micro-5-lesson-3': enrichBlock('micro-5-lesson-3', U5, {
    hook: 'Streetlights and national defense are not sold like sneakers—and for good reason.',
    phil: 'Public goods are non-excludable and non-rival—markets underprovide them.',
    heroAlt: 'Public goods matrix',
    try: { type: 'line-item-sort', title: 'Good types', description: 'Sort each good.', buckets: [{ id: 'public', label: 'Public good' }, { id: 'private', label: 'Private good' }, { id: 'common', label: 'Common resource' }], items: [{ id: '1', label: 'City fireworks display', correctBucket: 'public' }, { id: '2', label: 'Your headphones', correctBucket: 'private' }, { id: '3', label: 'Open ocean tuna', correctBucket: 'common' }] },
    pf: { title: 'Your money', description: 'Taxes fund public goods you use daily—schools, roads, parks.', scenario: 'Free-riding is why clubs need dues or governments need taxes.', alt: 'Public park funded by taxes' },
    career: { role: 'Public Finance Analyst', description: 'Budgets for public goods and services.', skills: ['Government budgeting', 'Economics'], alt: 'Government budget analyst' },
  }),
  'micro-5-lesson-4': enrichBlock('micro-5-lesson-4', U5, {
    hook: 'Rent caps and minimum wages are not magic—they change quantity and incentives.',
    phil: 'Ceilings, floors, taxes, and subsidies move outcomes—sometimes with side effects.',
    heroAlt: 'Price ceiling and floor on supply-demand',
    try: { type: 'scenario-choice', title: 'Policy effect', description: 'Predict the outcome.', rounds: [{ id: 'r1', prompt: 'Rent ceiling below equilibrium creates…', options: [{ id: 'a', label: 'Shortage of apartments', feedback: 'Yes—quantity demanded exceeds supplied at the ceiling.' }, { id: 'b', label: 'Surplus of apartments', feedback: 'Ceilings cause shortages, not surpluses.' }] }] },
    pf: { title: 'Your money', description: 'Understand policy tradeoffs—minimum wage, rent rules, and subsidies affect jobs and housing.', scenario: 'When rent is capped, expect longer searches and non-price competition.', alt: 'Apartment hunting with rent rules' },
    career: { role: 'Regulatory Analyst', description: 'Evaluates government price and quantity rules.', skills: ['Regulation', 'Stakeholder analysis'], alt: 'Regulatory policy meeting' },
  }),
};

Object.assign(MICRO_LESSON_ENRICHMENTS, u3u4u5);
