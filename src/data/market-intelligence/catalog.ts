/**
 * Market Intelligence Module Catalog
 * 
 * Defines all module cards for each section of Market Intelligence.
 * These are template cards - full lesson content will be added later.
 */

export interface ModuleCardData {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  learningPoints?: string[];
  rewards?: {
    bamboo: number;
    xp: number;
  };
  order: number;
}

// ============================================
// BUSINESS ECONOMICS MODULES
// ============================================

const businessEconomicsModules: ModuleCardData[] = [
  {
    id: 'price-of-bamboo',
    sectionId: 'business-economics',
    title: 'The Price of Bamboo',
    description: 'Supply, demand, and why prices move. The fundamental forces that drive every market.',
    icon: '🎋',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    learningPoints: [
      'How supply and demand set prices',
      'What makes prices rise or fall',
      'Why some products cost more than others',
    ],
    rewards: { bamboo: 15, xp: 3 },
    order: 1,
  },
  {
    id: 'whos-the-competition',
    sectionId: 'business-economics',
    title: "Who's the Competition?",
    description: 'Market structures, monopolies, and moats. Understanding competitive advantages.',
    icon: '🏆',
    estimatedMinutes: 12,
    difficulty: 'Beginner',
    learningPoints: [
      'Different types of market structures',
      'What makes a company hard to compete with',
      'Identifying sustainable advantages',
    ],
    rewards: { bamboo: 15, xp: 3 },
    order: 2,
  },
  {
    id: 'the-big-picture',
    sectionId: 'business-economics',
    title: 'The Big Picture',
    description: 'Economic cycles and what they mean for your investments and decisions.',
    icon: '🌍',
    estimatedMinutes: 15,
    difficulty: 'Intermediate',
    learningPoints: [
      'The four stages of economic cycles',
      'How to recognize where we are in the cycle',
      'What typically performs well in each stage',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 3,
  },
  {
    id: 'moneys-temperature',
    sectionId: 'business-economics',
    title: "Money's Temperature",
    description: 'Interest rates, inflation, and their effects on everything from stocks to your savings.',
    icon: '🌡️',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Why interest rates matter so much',
      'What inflation does to your money',
      'How central banks influence the economy',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 4,
  },
];

// ============================================
// MARKETS & HEADLINES MODULES
// ============================================

const marketsHeadlinesModules: ModuleCardData[] = [
  {
    id: 'headline-decoder',
    sectionId: 'markets-headlines',
    title: 'Headline Decoder',
    description: 'How to read financial news without panic. Separating facts from fear.',
    icon: '📰',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    learningPoints: [
      'Why headlines are designed to get clicks',
      'How to extract useful information',
      'Red flags in financial reporting',
    ],
    rewards: { bamboo: 15, xp: 3 },
    order: 1,
  },
  {
    id: 'noise-vs-signal',
    sectionId: 'markets-headlines',
    title: 'Noise vs. Signal',
    description: "What matters vs. what's just attention-grabbing. Finding the real story.",
    icon: '📡',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Identifying truly market-moving news',
      'What to ignore (most things)',
      'Building your information filter',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 2,
  },
  {
    id: 'the-earnings-call',
    sectionId: 'markets-headlines',
    title: 'The Earnings Call',
    description: 'What companies reveal (and hide) in quarterly reports and conference calls.',
    icon: '📞',
    estimatedMinutes: 15,
    difficulty: 'Intermediate',
    learningPoints: [
      'Structure of an earnings report',
      'Key metrics to focus on',
      'Reading between the lines of guidance',
    ],
    rewards: { bamboo: 25, xp: 5 },
    order: 3,
  },
  {
    id: 'market-mood',
    sectionId: 'markets-headlines',
    title: 'Market Mood',
    description: 'Sentiment, trends, and herd behavior. Understanding market psychology.',
    icon: '🎭',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    learningPoints: [
      'Fear and greed in market movements',
      'Why markets overreact (both ways)',
      'Contrarian thinking basics',
    ],
    rewards: { bamboo: 15, xp: 3 },
    order: 4,
  },
];

// ============================================
// OWNERSHIP MODULES
// ============================================

const ownershipModules: ModuleCardData[] = [
  {
    id: 'own-a-piece',
    sectionId: 'ownership',
    title: 'Own a Piece',
    description: 'What it actually means to own stock. You are a real owner of real businesses.',
    icon: '🏛️',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    learningPoints: [
      'What a share actually represents',
      'Your rights as a shareholder',
      'Why ownership beats renting',
    ],
    rewards: { bamboo: 15, xp: 3 },
    order: 1,
  },
  {
    id: 'time-is-your-ally',
    sectionId: 'ownership',
    title: 'Time is Your Ally',
    description: 'Compound growth visualization. See how patience builds wealth.',
    icon: '⏳',
    estimatedMinutes: 12,
    difficulty: 'Beginner',
    learningPoints: [
      'The math of compound growth',
      'Why starting early matters so much',
      'Historical long-term returns',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 2,
  },
  {
    id: 'the-patience-game',
    sectionId: 'ownership',
    title: 'The Patience Game',
    description: 'Why not reacting beats reacting. The power of doing nothing.',
    icon: '🧘',
    estimatedMinutes: 10,
    difficulty: 'Intermediate',
    learningPoints: [
      'Cost of panic selling',
      'Missing the best days in the market',
      'Emotional discipline strategies',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 3,
  },
  {
    id: 'mistakes-that-matter',
    sectionId: 'ownership',
    title: 'Mistakes That Matter',
    description: 'Big errors vs. small ones. Focus on what actually impacts your returns.',
    icon: '⚠️',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'The few decisions that really count',
      'Recoverable vs. unrecoverable mistakes',
      'Learning from common investor errors',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 4,
  },
];

// ============================================
// LANGUAGE OF FINANCE MODULES
// ============================================

const languageOfFinanceModules: ModuleCardData[] = [
  {
    id: 'whos-at-the-table',
    sectionId: 'language-finance',
    title: "Who's at the Table?",
    description: 'How capital allocation decisions get made. The people with the power.',
    icon: '🪑',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Key roles in finance (analysts, PMs, MDs)',
      'How investment decisions flow',
      'Understanding the hierarchy',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 1,
  },
  {
    id: 'the-network-effect',
    sectionId: 'language-finance',
    title: 'The Network Effect',
    description: 'How finance knowledge opens doors. From outsider to insider.',
    icon: '🔗',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    learningPoints: [
      'Why financial literacy is career capital',
      'How knowledge compounds socially',
      'Building your finance network',
    ],
    rewards: { bamboo: 15, xp: 3 },
    order: 2,
  },
  {
    id: 'speaking-the-language',
    sectionId: 'language-finance',
    title: 'Speaking the Language',
    description: 'Key terms that signal insider knowledge. The vocabulary of finance.',
    icon: '💬',
    estimatedMinutes: 15,
    difficulty: 'Beginner',
    learningPoints: [
      '20 essential finance terms',
      'Using jargon naturally',
      'Terms to avoid misusing',
    ],
    rewards: { bamboo: 25, xp: 5 },
    order: 3,
  },
  {
    id: 'from-learner-to-insider',
    sectionId: 'language-finance',
    title: 'From Learner to Insider',
    description: 'Pathways from here to careers. Your next steps in finance.',
    icon: '🚀',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    learningPoints: [
      'Career paths in finance',
      'What firms look for',
      'Building your track record',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 4,
  },
];

// ============================================
// EXPORT CATALOG
// ============================================

export const MARKET_INTELLIGENCE_CATALOG = {
  businessEconomics: businessEconomicsModules,
  marketsHeadlines: marketsHeadlinesModules,
  ownership: ownershipModules,
  languageOfFinance: languageOfFinanceModules,
};

/**
 * Get all modules as a flat array
 */
export function getAllModules(): ModuleCardData[] {
  return [
    ...businessEconomicsModules,
    ...marketsHeadlinesModules,
    ...ownershipModules,
    ...languageOfFinanceModules,
  ];
}

/**
 * Get module by ID
 */
export function getModuleById(id: string): ModuleCardData | undefined {
  return getAllModules().find(m => m.id === id);
}

/**
 * Get modules by section
 */
export function getModulesBySection(sectionId: string): ModuleCardData[] {
  return getAllModules().filter(m => m.sectionId === sectionId);
}



