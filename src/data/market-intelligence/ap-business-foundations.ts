/**
 * Business Foundations — Marketing and Management & Strategy units.
 * Placeholder lesson copy; replace content in each lesson when ready.
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from './lesson-stub-helpers';

export const businessFoundationsUnits: EconomicsUnit[] = [
  {
    id: 'bf-marketing',
    track: 'business-foundations',
    title: 'Marketing',
    description:
      'Customers, research, product lifecycle, pricing, channels, and promotion — how companies win attention and revenue.',
    icon: '📣',
    order: 1,
    coreEconomicsConcepts: [
      'Segmentation',
      'Consumer Behavior',
      'Market Research',
      'Product Life Cycle',
      'Pricing Strategy',
      'Promotion & CAC',
    ],
    personalFinanceConnection: {
      description:
        'Marketing psychology shows up in ads, subscriptions, and “limited time” offers — recognizing tactics protects your wallet.',
      relatedPFModules: ['budgeting', 'saving'],
    },
    investingConnection: [
      'Brand strength supports premium valuations',
      'CAC trends signal whether growth is sustainable',
    ],
    careerExposure: [
      {
        title: 'Brand Manager',
        description: 'Shapes how customers perceive and choose a product.',
        salaryRange: '$55,000 - $95,000',
        skills: ['Positioning', 'Campaigns', 'Analytics'],
      },
    ],
    lessons: [
      buildStubLesson('bf-mkt-1', 'Customer Profiles & Segmentation', [
        'Demographics',
        'Psychographics',
        'Customer Profiles',
      ]),
      buildStubLesson('bf-mkt-2', 'Market Research & Data', [
        'Primary Research',
        'Secondary Research',
        'Data Visualization',
      ]),
      buildStubLesson('bf-mkt-3', 'Product & Pricing Strategy', [
        'Product Life Cycle',
        'Value-Based Pricing',
        'Penetration vs. Skimming',
      ]),
      buildStubLesson('bf-mkt-4', 'Channels, Promotion & CAC', [
        'Distribution Channels',
        'PR vs. Advertising',
        'Customer Acquisition Cost',
      ]),
    ],
    gamifiedActivity: {
      id: 'bf-mkt-lifecycle',
      title: 'Lifecycle Lens',
      description: 'Use Company Tinder lifecycle badges to match strategy to stage.',
      instructions: [
        'Complete the Product & Pricing Strategy lesson',
        'Open Company Tinder and read lifecycle badges',
        'Decide if marketing strategy fits the stage',
      ],
      rewards: { bamboo: 35, xp: 70 },
    },
    rewards: { bamboo: 45, xp: 90 },
    unlockRequirements: {},
  },
  {
    id: 'bf-management',
    track: 'business-foundations',
    title: 'Management & Strategy',
    description:
      'Leadership, KPIs, decision-making, and strategic frameworks that guide how organizations compete.',
    icon: '🧭',
    order: 2,
    coreEconomicsConcepts: [
      'Leadership Styles',
      'KPIs',
      'Opportunity Cost',
      'SWOT Analysis',
      "Porter's Five Forces",
    ],
    personalFinanceConnection: {
      description:
        'Personal goals need the same discipline as business KPIs — measure what matters and trade off consciously.',
      relatedPFModules: ['financial-planning', 'wealth-fundamentals'],
    },
    investingConnection: [
      'Management quality is a core factor in long-term returns',
      'Strategic moats show up in margins and market share',
    ],
    careerExposure: [
      {
        title: 'Management Consultant',
        description: 'Helps leaders diagnose problems and choose strategic direction.',
        salaryRange: '$70,000 - $150,000',
        skills: ['Frameworks', 'Communication', 'Analysis'],
      },
    ],
    lessons: [
      buildStubLesson('bf-mgmt-1', 'Leadership Styles & Teams', [
        'Autocratic vs. Democratic',
        'Motivation',
        'Team Design',
      ]),
      buildStubLesson('bf-mgmt-2', 'KPIs & Performance Management', [
        'Key Performance Indicators',
        'Targets vs. Outcomes',
        'Accountability',
      ]),
      buildStubLesson('bf-mgmt-3', 'Decision Making & Opportunity Cost', [
        'Trade-offs',
        'Opportunity Cost',
        'Scenario Planning',
      ]),
      buildStubLesson('bf-mgmt-4', "SWOT & Porter's Five Forces", [
        'SWOT Quadrants',
        'Industry Rivalry',
        'Barriers to Entry',
      ]),
    ],
    gamifiedActivity: {
      id: 'bf-mgmt-strategy',
      title: 'Strategy Sort',
      description: 'Apply SWOT thinking in Company Tinder and ownership modules.',
      instructions: [
        'Complete the SWOT lesson',
        'Review a company in Company Tinder',
        'Name one strength, weakness, opportunity, and threat',
      ],
      rewards: { bamboo: 35, xp: 70 },
    },
    rewards: { bamboo: 45, xp: 90 },
    unlockRequirements: { previousUnitId: 'bf-marketing' },
  },
];
