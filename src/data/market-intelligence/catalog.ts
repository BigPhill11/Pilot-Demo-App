/**
 * Market Intelligence Module Catalog
 * 
 * Defines all module cards for each section of Market Intelligence.
 * These are template cards - full lesson content will be added later.
 */

export type HeadlineType = 'product_launch' | 'pr_reputation' | 'earnings' | 'regulation';

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
  /** Markets & Headlines: story category badge */
  headlineType?: HeadlineType;
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
    headlineType: 'earnings',
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
    headlineType: 'regulation',
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
    headlineType: 'earnings',
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
    headlineType: 'pr_reputation',
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
  {
    id: 'product-launch-hype',
    sectionId: 'markets-headlines',
    headlineType: 'product_launch',
    title: 'Product Launch Hype',
    description: 'Buy the rumor, sell the news. How launch cycles move stock prices.',
    icon: '🚀',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Pre-launch run-up mechanics',
      '"Sell the news" pattern',
      'Real vs. vapor demand',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 5,
  },
  {
    id: 'regulation-shockwaves',
    sectionId: 'markets-headlines',
    headlineType: 'regulation',
    title: 'Regulation Shockwaves',
    description: 'How government actions move sectors and create long-tail risk.',
    icon: '⚖️',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'FTC, SEC, and EU moves',
      'Sectors with highest regulatory exposure',
      'One-day blips vs. long-tail threats',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 6,
  },
  {
    id: 'pr-reputation-crises',
    sectionId: 'markets-headlines',
    headlineType: 'pr_reputation',
    title: 'PR & Reputation Crises',
    description: 'Not all scandals are equal. Learn to spot recoverable vs. lasting damage.',
    icon: '📢',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Brand damage timeline',
      'Recoverable vs. lasting hits',
      'Real vs. manufactured outrage',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 7,
  },
  {
    id: 'the-fed-speaks',
    sectionId: 'markets-headlines',
    headlineType: 'regulation',
    title: 'The Fed Speaks',
    description: 'FOMC days, the dot plot, and why one word in a statement moves markets.',
    icon: '🏛️',
    estimatedMinutes: 12,
    difficulty: 'Advanced',
    learningPoints: [
      'FOMC structure and rate decisions',
      'Reading the dot plot',
      '"Hawkish hold" and Fed language',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 8,
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
  {
    id: 'diversification-by-design',
    sectionId: 'ownership',
    title: 'Diversification by Design',
    description: 'All eggs, correlation basics, and lazy-portfolio templates that actually work.',
    icon: '🥚',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Why spreading risk works',
      'Correlation and why it matters',
      'Three-fund portfolio basics',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 5,
  },
  {
    id: 'risk-vs-reward',
    sectionId: 'ownership',
    title: 'Risk vs. Reward',
    description: 'Volatility, drawdowns, and knowing your own risk capacity.',
    icon: '⚡',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Volatility ≠ risk',
      'Risk capacity vs. tolerance',
      'Drawdown math',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 6,
  },
  {
    id: 'index-vs-active',
    sectionId: 'ownership',
    title: 'Index Funds vs. Active',
    description: 'The case for boring, cheap, consistent ownership over stock-picking.',
    icon: '📊',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'What an index fund is',
      'Expense ratios and fee drag',
      'Why active management is harder than it looks',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 7,
  },
  {
    id: 'dividends-and-reinvestment',
    sectionId: 'ownership',
    title: 'Dividends & Reinvestment',
    description: 'DRIP magic: how reinvesting dividends accelerates compound growth.',
    icon: '💰',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'What a dividend is',
      'DRIP power over decades',
      'Growth vs. dividend stocks',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 8,
  },
  {
    id: 'tax-smart-ownership',
    sectionId: 'ownership',
    title: 'Tax-Smart Ownership',
    description: 'Roth IRA, 401(k) match, and capital gains — keep more of what you earn.',
    icon: '🧾',
    estimatedMinutes: 14,
    difficulty: 'Intermediate',
    learningPoints: [
      'Roth IRA basics',
      '401(k) employer match = free money',
      'Short vs. long-term capital gains',
    ],
    rewards: { bamboo: 25, xp: 5 },
    order: 9,
  },
  {
    id: 'reading-your-portfolio',
    sectionId: 'ownership',
    title: 'Reading Your Portfolio',
    description: 'Allocation, rebalancing, and when to act vs. when to leave it alone.',
    icon: '📋',
    estimatedMinutes: 10,
    difficulty: 'Intermediate',
    learningPoints: [
      'Allocation pie breakdown',
      'When and how to rebalance',
      'Drift and when it matters',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 10,
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
  {
    id: 'income-statement-decoded',
    sectionId: 'language-finance',
    title: 'Income Statement Decoded',
    description: 'Revenue, expenses, and profit — how to read what a company earns.',
    icon: '📊',
    estimatedMinutes: 14,
    difficulty: 'Intermediate',
    learningPoints: [
      'Revenue vs. net income',
      'Operating vs. non-operating items',
      'Reading an income statement line by line',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 5,
  },
  {
    id: 'balance-sheet-basics',
    sectionId: 'language-finance',
    title: 'Balance Sheet Basics',
    description: 'Assets, liabilities, and net worth — the snapshot of financial health.',
    icon: '🏦',
    estimatedMinutes: 14,
    difficulty: 'Intermediate',
    learningPoints: [
      'Assets vs. liabilities',
      'Equity and book value',
      'Liquidity and solvency signals',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 6,
  },
  {
    id: 'cash-flow-statement',
    sectionId: 'language-finance',
    title: 'Cash Flow Statement',
    description: 'Where the money actually goes — and why profit does not equal cash.',
    icon: '💸',
    estimatedMinutes: 14,
    difficulty: 'Intermediate',
    learningPoints: [
      'Operating, investing, and financing cash flows',
      'Free cash flow basics',
      'Red flags in cash vs. earnings',
    ],
    rewards: { bamboo: 25, xp: 5 },
    order: 7,
  },
  {
    id: 'ethics-in-accounting',
    sectionId: 'language-finance',
    title: 'Ethics in Accounting',
    description: 'Why numbers get manipulated and how to spot reporting risk.',
    icon: '⚖️',
    estimatedMinutes: 12,
    difficulty: 'Advanced',
    learningPoints: [
      'Earnings management tactics',
      'Auditor role and limits',
      'Whistleblowing and governance',
    ],
    rewards: { bamboo: 25, xp: 5 },
    order: 8,
  },
  {
    id: 'margins-ratios-decoded',
    sectionId: 'language-finance',
    title: 'Margins & Ratios Decoded',
    description: 'Gross margin, operating margin, current ratio — the numbers analysts actually use.',
    icon: '📐',
    estimatedMinutes: 10,
    difficulty: 'Intermediate',
    learningPoints: [
      'Three margin types',
      'Current ratio and what it signals',
      'Debt-to-equity basics',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 9,
  },
  {
    id: 'valuation-basics',
    sectionId: 'language-finance',
    title: 'Valuation Basics',
    description: 'P/E ratio, market cap, enterprise value — how investors decide what a company is worth.',
    icon: '🔢',
    estimatedMinutes: 14,
    difficulty: 'Intermediate',
    learningPoints: [
      'Price-to-Earnings ratio',
      'Market cap vs. enterprise value',
      'Comp table basics',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 10,
  },
  {
    id: 'risk-and-beta',
    sectionId: 'language-finance',
    title: 'Risk & Beta',
    description: 'Beta measures how sensitive a stock is to market swings — here is what that means for you.',
    icon: '📈',
    estimatedMinutes: 10,
    difficulty: 'Intermediate',
    learningPoints: [
      'Beta and market sensitivity',
      'Alpha basics',
      'Sharpe ratio in one line',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 11,
  },
  {
    id: 'debt-and-credit-language',
    sectionId: 'language-finance',
    title: 'Debt & Credit Language',
    description: 'Bonds, coupons, yields, and credit ratings — the vocabulary of the debt market.',
    icon: '🔖',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    learningPoints: [
      'Bond basics: coupon and yield',
      'Why yields and prices move opposite',
      'Credit ratings and what they mean',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 12,
  },
  {
    id: 'earnings-season-glossary',
    sectionId: 'language-finance',
    title: 'Earnings Season Glossary',
    description: 'Beat, miss, in-line, guidance, forward P/E — master the four times a year that matter.',
    icon: '📅',
    estimatedMinutes: 10,
    difficulty: 'Intermediate',
    learningPoints: [
      'Beat / miss / in-line',
      'What forward P/E signals',
      'Reading guidance language',
    ],
    rewards: { bamboo: 20, xp: 4 },
    order: 13,
  },
  {
    id: 'ma-ipo-vocab',
    sectionId: 'language-finance',
    title: 'M&A & IPO Vocabulary',
    description: 'IPO, strategic vs. financial buyer, lock-up period — the language of deals.',
    icon: '🤝',
    estimatedMinutes: 12,
    difficulty: 'Advanced',
    learningPoints: [
      'IPO mechanics basics',
      'Strategic vs. financial buyers',
      'Lock-up period and why it matters',
    ],
    rewards: { bamboo: 25, xp: 5 },
    order: 14,
  },
];

// ============================================
// BUSINESS FOUNDATIONS MODULES (catalog stubs — full content in ap-business-foundations.ts)
// ============================================

const businessFoundationsModules: ModuleCardData[] = [
  { id: 'bf-mkt-1', sectionId: 'business-foundations', title: 'Customer Profiles & Segmentation', description: 'Demographics, psychographics, and how companies define their ideal buyer.', icon: '🎯', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Segmentation basics', 'Customer personas', 'Targeting strategies'], rewards: { bamboo: 15, xp: 3 }, order: 1 },
  { id: 'bf-mkt-2', sectionId: 'business-foundations', title: 'Market Research & Data', description: 'Primary vs. secondary research and how companies validate what customers actually want.', icon: '🔍', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Primary research', 'Secondary research', 'Data interpretation'], rewards: { bamboo: 15, xp: 3 }, order: 2 },
  { id: 'bf-mkt-3', sectionId: 'business-foundations', title: 'Product & Pricing Strategy', description: 'Product life cycle, value-based pricing, and penetration vs. skimming.', icon: '💲', estimatedMinutes: 12, difficulty: 'Intermediate', learningPoints: ['Product life cycle', 'Value-based pricing', 'Pricing tactics'], rewards: { bamboo: 20, xp: 4 }, order: 3 },
  { id: 'bf-mkt-4', sectionId: 'business-foundations', title: 'Channels, Promotion & CAC', description: 'Distribution channels, promotion mix, and what it costs to acquire a customer.', icon: '📣', estimatedMinutes: 12, difficulty: 'Intermediate', learningPoints: ['Distribution channels', 'Promotion mix', 'Customer acquisition cost'], rewards: { bamboo: 20, xp: 4 }, order: 4 },
  { id: 'bf-mgmt-1', sectionId: 'business-foundations', title: 'Leadership Styles & Teams', description: 'How great managers lead, motivate, and build high-performing teams.', icon: '🧑‍💼', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Leadership styles', 'Team dynamics', 'Motivation basics'], rewards: { bamboo: 15, xp: 3 }, order: 5 },
  { id: 'bf-mgmt-2', sectionId: 'business-foundations', title: 'KPIs & Performance', description: 'Key performance indicators: how companies measure whether strategy is working.', icon: '📊', estimatedMinutes: 12, difficulty: 'Intermediate', learningPoints: ['What a KPI is', 'Setting measurable goals', 'Lagging vs. leading KPIs'], rewards: { bamboo: 20, xp: 4 }, order: 6 },
  { id: 'bf-mgmt-3', sectionId: 'business-foundations', title: 'Decision Making & Opportunity Cost', description: 'Rational decision frameworks and why the best choice considers what you give up.', icon: '🤔', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Decision trees', 'Opportunity cost', 'Sunk cost fallacy'], rewards: { bamboo: 15, xp: 3 }, order: 7 },
  { id: 'bf-mgmt-4', sectionId: 'business-foundations', title: 'SWOT & Five Forces', description: 'Two classic strategy frameworks used in every MBA program and boardroom.', icon: '⚔️', estimatedMinutes: 12, difficulty: 'Intermediate', learningPoints: ['SWOT analysis', 'Porter\'s Five Forces', 'Applying both to real companies'], rewards: { bamboo: 20, xp: 4 }, order: 8 },
  { id: 'bf-brand-1', sectionId: 'business-foundations', title: 'Brand Identity', description: 'Logo, colors, voice, and values — the elements that make a brand recognizable.', icon: '🎨', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Brand elements', 'Brand consistency', 'Why brands matter financially'], rewards: { bamboo: 15, xp: 3 }, order: 9 },
  { id: 'bf-brand-2', sectionId: 'business-foundations', title: 'Positioning', description: 'How companies occupy a unique place in the customer\'s mind relative to competitors.', icon: '🗺️', estimatedMinutes: 10, difficulty: 'Intermediate', learningPoints: ['Positioning statement', 'Perceptual maps', 'Repositioning'], rewards: { bamboo: 20, xp: 4 }, order: 10 },
  { id: 'bf-digital-1', sectionId: 'business-foundations', title: 'Funnel Basics', description: 'Awareness, consideration, conversion — how companies turn strangers into customers.', icon: '🔽', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Marketing funnel stages', 'Conversion rates', 'Funnel optimization'], rewards: { bamboo: 15, xp: 3 }, order: 11 },
  { id: 'bf-digital-2', sectionId: 'business-foundations', title: 'Content & SEO', description: 'How companies use content and search engines to attract customers without paying for each click.', icon: '🔎', estimatedMinutes: 12, difficulty: 'Intermediate', learningPoints: ['Content marketing basics', 'SEO fundamentals', 'Organic vs. paid'], rewards: { bamboo: 20, xp: 4 }, order: 12 },
  { id: 'bf-ent-1', sectionId: 'business-foundations', title: 'From Idea to MVP', description: 'How entrepreneurs test an idea before spending money on a full product.', icon: '💡', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['MVP concept', 'Idea validation', 'Build-measure-learn'], rewards: { bamboo: 15, xp: 3 }, order: 13 },
  { id: 'bf-ent-2', sectionId: 'business-foundations', title: 'Validating Customers', description: 'Finding real customers who will pay, before building the whole product.', icon: '✅', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Customer discovery', 'Willingness to pay', 'Pivot vs. persevere'], rewards: { bamboo: 15, xp: 3 }, order: 14 },
  { id: 'bf-ent-3', sectionId: 'business-foundations', title: 'Bootstrapping vs. Fundraising', description: 'The trade-off between staying independent and raising outside capital.', icon: '💵', estimatedMinutes: 12, difficulty: 'Intermediate', learningPoints: ['Bootstrapping advantages', 'Angel and VC basics', 'Dilution'], rewards: { bamboo: 20, xp: 4 }, order: 15 },
  { id: 'bf-ent-4', sectionId: 'business-foundations', title: 'Building Your First Team', description: 'Why your first hire matters as much as your first product.', icon: '👥', estimatedMinutes: 10, difficulty: 'Beginner', learningPoints: ['Co-founder dynamics', 'First hire criteria', 'Culture from day one'], rewards: { bamboo: 15, xp: 3 }, order: 16 },
];

// ============================================
// EXPORT CATALOG
// ============================================

export const MARKET_INTELLIGENCE_CATALOG = {
  businessEconomics: businessEconomicsModules,
  marketsHeadlines: marketsHeadlinesModules,
  ownership: ownershipModules,
  languageOfFinance: languageOfFinanceModules,
  businessFoundations: businessFoundationsModules,
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
    ...businessFoundationsModules,
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



