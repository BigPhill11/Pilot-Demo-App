/**
 * Unified Flashcard Data Source
 * 
 * Aggregates flashcards from all learning modules:
 * - Personal Finance (from lesson flashcards)
 * - Careers in Finance
 * - Company Knowledge (Market Intelligence)
 */

import { incomeModule, financialPlanningModule, savingModule, investingModule, insuranceModule, taxesModule, creditDebtModule, careerIncomeModule, wealthFundamentalsModule } from './personal-finance/modules';
import { PersonalFinanceFlashcard } from '@/types/personal-finance';

export interface UnifiedFlashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  sourceModule: 'personal-finance' | 'market-intelligence' | 'careers';
  sourceLesson?: string;
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  icon: string;
}

export interface FlashcardCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  cardCount: number;
  subcategories: FlashcardSubcategory[];
}

export interface FlashcardSubcategory {
  id: string;
  title: string;
  icon: string;
  cardCount: number;
}

// Extract flashcards from Personal Finance modules
const extractPersonalFinanceFlashcards = (): UnifiedFlashcard[] => {
  const modules = [
    { module: incomeModule, icon: '💰' },
    { module: financialPlanningModule, icon: '🎯' },
    { module: savingModule, icon: '🏦' },
    { module: investingModule, icon: '📈' },
    { module: insuranceModule, icon: '🛡️' },
    { module: taxesModule, icon: '📋' },
    { module: creditDebtModule, icon: '💳' },
    { module: careerIncomeModule, icon: '📈' },
    { module: wealthFundamentalsModule, icon: '💎' },
  ];

  const flashcards: UnifiedFlashcard[] = [];

  modules.forEach(({ module, icon }) => {
    if (!module?.lessons) return;
    
    module.lessons.forEach((lesson) => {
      if (!lesson.flashcards) return;
      
      lesson.flashcards.forEach((card: PersonalFinanceFlashcard, index: number) => {
        flashcards.push({
          id: `pf-${module.id}-${lesson.id}-${index}`,
          term: card.term,
          definition: card.definition,
          philExample: card.philsAnalogy,
          sourceModule: 'personal-finance',
          sourceLesson: lesson.title,
          category: module.name,
          subcategory: lesson.title,
          difficulty: module.level,
          tags: [module.pillar, module.name, lesson.title],
          icon,
        });
      });
    });
  });

  return flashcards;
};

// Careers in Finance flashcards
const careersFlashcards: UnifiedFlashcard[] = [
  // Investment Banking
  {
    id: 'careers-ib-1',
    term: 'Investment Bank',
    definition: 'A financial institution that helps companies raise money and provides advice on deals like mergers and IPOs.',
    philExample: 'Like a real estate agent who helps people buy and sell houses, but for entire companies!',
    realWorldExample: 'Goldman Sachs helped Facebook go public in 2012.',
    sourceModule: 'careers',
    category: 'Investment Banking',
    difficulty: 'beginner',
    tags: ['Finance Careers', 'Investment Banking', 'Wall Street'],
    icon: '🏦',
  },
  {
    id: 'careers-ib-2',
    term: 'IPO (Initial Public Offering)',
    definition: 'When a private company sells shares to the public for the first time, becoming publicly traded on a stock exchange.',
    philExample: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
    realWorldExample: 'Airbnb had its IPO in December 2020, raising $3.5 billion.',
    sourceModule: 'careers',
    category: 'Investment Banking',
    difficulty: 'beginner',
    tags: ['Finance Careers', 'Investment Banking', 'IPO'],
    icon: '🏦',
  },
  {
    id: 'careers-ib-3',
    term: 'M&A (Mergers & Acquisitions)',
    definition: 'The process of combining two companies (merger) or one company buying another (acquisition).',
    philExample: 'Like when two restaurants combine to share a bigger kitchen!',
    realWorldExample: 'Microsoft acquired LinkedIn for $26.2 billion in 2016.',
    sourceModule: 'careers',
    category: 'Investment Banking',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Investment Banking', 'M&A'],
    icon: '🏦',
  },
  {
    id: 'careers-ib-4',
    term: 'Pitch Book',
    definition: 'A presentation investment bankers create to pitch their services and analysis to potential clients.',
    philExample: 'Like a portfolio showing your best work when applying for a job!',
    realWorldExample: 'Analysts spend hours creating pitch books with financial models and market analysis.',
    sourceModule: 'careers',
    category: 'Investment Banking',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Investment Banking'],
    icon: '🏦',
  },
  {
    id: 'careers-ib-5',
    term: 'Bulge Bracket',
    definition: 'The largest and most prestigious investment banks in the world.',
    philExample: 'Like the top-tier teams in professional sports - everyone wants to play for them!',
    realWorldExample: 'Goldman Sachs, JPMorgan, Morgan Stanley, and Bank of America are bulge bracket banks.',
    sourceModule: 'careers',
    category: 'Investment Banking',
    difficulty: 'advanced',
    tags: ['Finance Careers', 'Investment Banking', 'Wall Street'],
    icon: '🏦',
  },
  
  // Asset Management
  {
    id: 'careers-am-1',
    term: 'Asset Manager',
    definition: 'A professional or firm that invests money on behalf of clients to grow their wealth.',
    philExample: 'Like hiring someone to pick the best toys for your collection!',
    realWorldExample: 'BlackRock is the world\'s largest asset manager, managing over $9 trillion.',
    sourceModule: 'careers',
    category: 'Asset Management',
    difficulty: 'beginner',
    tags: ['Finance Careers', 'Asset Management', 'Investing'],
    icon: '📊',
  },
  {
    id: 'careers-am-2',
    term: 'Portfolio Manager',
    definition: 'The person responsible for making investment decisions for a fund or portfolio.',
    philExample: 'Like the captain of a team who decides which players to use!',
    realWorldExample: 'Portfolio managers at Fidelity decide which stocks and bonds to buy for their funds.',
    sourceModule: 'careers',
    category: 'Asset Management',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Asset Management'],
    icon: '📊',
  },
  {
    id: 'careers-am-3',
    term: 'AUM (Assets Under Management)',
    definition: 'The total market value of investments that a firm manages on behalf of clients.',
    philExample: 'Like the total value of all the toys you\'re helping friends manage!',
    realWorldExample: 'Vanguard has over $7 trillion in AUM across its various funds.',
    sourceModule: 'careers',
    category: 'Asset Management',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Asset Management'],
    icon: '📊',
  },
  
  // Private Equity
  {
    id: 'careers-pe-1',
    term: 'Private Equity',
    definition: 'Investment firms that buy private companies, improve them, and sell them for a profit.',
    philExample: 'Like buying and fixing up a house to sell for more money later!',
    realWorldExample: 'KKR and Blackstone are major private equity firms that transform companies.',
    sourceModule: 'careers',
    category: 'Private Equity',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Private Equity'],
    icon: '🔐',
  },
  {
    id: 'careers-pe-2',
    term: 'LBO (Leveraged Buyout)',
    definition: 'Acquiring a company using significant borrowed money (debt) to fund the purchase.',
    philExample: 'Like buying a rental property with a big mortgage and using rent to pay it off!',
    realWorldExample: 'The $31 billion buyout of RJR Nabisco in 1989 was a famous LBO.',
    sourceModule: 'careers',
    category: 'Private Equity',
    difficulty: 'advanced',
    tags: ['Finance Careers', 'Private Equity', 'M&A'],
    icon: '🔐',
  },
  
  // Venture Capital
  {
    id: 'careers-vc-1',
    term: 'Venture Capital',
    definition: 'Investment in early-stage startups with high growth potential in exchange for equity ownership.',
    philExample: 'Like giving someone money to start their lemonade stand in exchange for part ownership!',
    realWorldExample: 'Sequoia Capital invested in Google, Apple, and Airbnb when they were startups.',
    sourceModule: 'careers',
    category: 'Venture Capital',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Venture Capital', 'Startups'],
    icon: '🚀',
  },
  {
    id: 'careers-vc-2',
    term: 'Series A, B, C Funding',
    definition: 'Progressive rounds of startup funding as companies grow, with each round typically at higher valuations.',
    philExample: 'Like leveling up in a game - each level gets harder but the rewards are bigger!',
    realWorldExample: 'Uber raised from Series A through Series H before going public.',
    sourceModule: 'careers',
    category: 'Venture Capital',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Venture Capital', 'Startups'],
    icon: '🚀',
  },
  {
    id: 'careers-vc-3',
    term: 'Unicorn',
    definition: 'A private startup company valued at over $1 billion.',
    philExample: 'Like finding a super rare Pokemon - very valuable and hard to find!',
    realWorldExample: 'Stripe, SpaceX, and OpenAI are unicorn companies worth billions.',
    sourceModule: 'careers',
    category: 'Venture Capital',
    difficulty: 'beginner',
    tags: ['Finance Careers', 'Venture Capital', 'Startups'],
    icon: '🚀',
  },
  
  // Hedge Funds
  {
    id: 'careers-hf-1',
    term: 'Hedge Fund',
    definition: 'An investment fund that uses diverse strategies to generate returns for wealthy investors.',
    philExample: 'Like a master chess player using all kinds of moves to win!',
    realWorldExample: 'Bridgewater Associates is the world\'s largest hedge fund managing over $100 billion.',
    sourceModule: 'careers',
    category: 'Hedge Funds',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Hedge Funds'],
    icon: '📈',
  },
  {
    id: 'careers-hf-2',
    term: 'Long/Short Strategy',
    definition: 'Buying stocks expected to rise (long) while selling borrowed stocks expected to fall (short).',
    philExample: 'Like betting some teams will win and others will lose at the same time!',
    realWorldExample: 'Hedge funds go long on undervalued stocks and short overvalued ones to profit either way.',
    sourceModule: 'careers',
    category: 'Hedge Funds',
    difficulty: 'advanced',
    tags: ['Finance Careers', 'Hedge Funds', 'Trading'],
    icon: '📈',
  },
  {
    id: 'careers-hf-3',
    term: 'Alpha',
    definition: 'Investment returns that exceed the market benchmark, attributed to skill rather than luck.',
    philExample: 'Like scoring more points than everyone expected you to!',
    realWorldExample: 'A hedge fund generating 15% returns when the market returned 10% has 5% alpha.',
    sourceModule: 'careers',
    category: 'Hedge Funds',
    difficulty: 'advanced',
    tags: ['Finance Careers', 'Hedge Funds', 'Performance'],
    icon: '📈',
  },
  
  // Consulting
  {
    id: 'careers-mc-1',
    term: 'Management Consulting',
    definition: 'Providing expert advice to companies to improve their business performance and strategy.',
    philExample: 'Like a coach who helps teams get better at their sport!',
    realWorldExample: 'McKinsey, BCG, and Bain help Fortune 500 companies solve complex problems.',
    sourceModule: 'careers',
    category: 'Consulting',
    difficulty: 'beginner',
    tags: ['Finance Careers', 'Consulting'],
    icon: '💡',
  },
  {
    id: 'careers-mc-2',
    term: 'MBB',
    definition: 'McKinsey, BCG (Boston Consulting Group), and Bain - the three most prestigious consulting firms.',
    philExample: 'Like the championship teams everyone wants to join!',
    realWorldExample: 'Getting a job at MBB is extremely competitive with accept rates under 1%.',
    sourceModule: 'careers',
    category: 'Consulting',
    difficulty: 'intermediate',
    tags: ['Finance Careers', 'Consulting'],
    icon: '💡',
  },
];

// Market Intelligence / Company Knowledge flashcards
const marketIntelligenceFlashcards: UnifiedFlashcard[] = [
  // Tech Companies
  {
    id: 'mi-tech-1',
    term: 'FAANG/MAANG',
    definition: 'Meta (Facebook), Apple, Amazon, Netflix, Google - the largest and most influential tech companies.',
    philExample: 'Like the Avengers of technology - the biggest superheroes in tech!',
    realWorldExample: 'FAANG stocks have been among the best performing investments of the past decade.',
    sourceModule: 'market-intelligence',
    category: 'Tech Companies',
    difficulty: 'beginner',
    tags: ['Market Intelligence', 'Tech', 'Stocks'],
    icon: '💻',
  },
  {
    id: 'mi-tech-2',
    term: 'Market Capitalization',
    definition: 'The total value of a company\'s outstanding shares, calculated as share price × total shares.',
    philExample: 'If a company were a house, market cap would be its total asking price!',
    realWorldExample: 'Apple\'s market cap of $3 trillion makes it one of the world\'s most valuable companies.',
    sourceModule: 'market-intelligence',
    category: 'Tech Companies',
    difficulty: 'beginner',
    tags: ['Market Intelligence', 'Stocks', 'Valuation'],
    icon: '💻',
  },
  {
    id: 'mi-tech-3',
    term: 'Cloud Computing',
    definition: 'Delivering computing services (servers, storage, databases) over the internet instead of local hardware.',
    philExample: 'Like storing your toys in a magic cloud that you can access from anywhere!',
    realWorldExample: 'AWS, Microsoft Azure, and Google Cloud dominate the $500 billion cloud market.',
    sourceModule: 'market-intelligence',
    category: 'Tech Companies',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'Tech', 'Cloud'],
    icon: '💻',
  },
  
  // Financial Services
  {
    id: 'mi-fin-1',
    term: 'Commercial vs Investment Banking',
    definition: 'Commercial banks serve regular customers (checking, savings, loans); investment banks serve corporations (M&A, IPOs).',
    philExample: 'Like a local shop vs a business consultant - different customers, different services!',
    realWorldExample: 'Chase offers commercial banking; its parent JPMorgan does investment banking.',
    sourceModule: 'market-intelligence',
    category: 'Financial Services',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'Banking', 'Finance'],
    icon: '🏦',
  },
  {
    id: 'mi-fin-2',
    term: 'FinTech Disruption',
    definition: 'Technology companies transforming traditional financial services with innovative digital solutions.',
    philExample: 'Like how streaming services changed how we watch movies - but for money!',
    realWorldExample: 'Robinhood disrupted stock brokerages with zero-fee trading; Stripe revolutionized payments.',
    sourceModule: 'market-intelligence',
    category: 'Financial Services',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'FinTech', 'Innovation'],
    icon: '🏦',
  },
  
  // Consumer Goods
  {
    id: 'mi-consumer-1',
    term: 'Brand Value',
    definition: 'The financial worth of a brand beyond its physical assets, based on customer loyalty and recognition.',
    philExample: 'Like how a Nike shoe costs more than a no-name shoe because of the swoosh!',
    realWorldExample: 'Apple and Coca-Cola have some of the highest brand values in the world.',
    sourceModule: 'market-intelligence',
    category: 'Consumer Goods',
    difficulty: 'beginner',
    tags: ['Market Intelligence', 'Brands', 'Marketing'],
    icon: '🛍️',
  },
  {
    id: 'mi-consumer-2',
    term: 'Consumer Staples',
    definition: 'Essential products people buy regardless of economic conditions - food, hygiene, household items.',
    philExample: 'Like food and toothpaste - you need them no matter what!',
    realWorldExample: 'Procter & Gamble makes consumer staples like Tide, Crest, and Pampers.',
    sourceModule: 'market-intelligence',
    category: 'Consumer Goods',
    difficulty: 'beginner',
    tags: ['Market Intelligence', 'Consumer', 'Defensive Stocks'],
    icon: '🛍️',
  },
  {
    id: 'mi-consumer-3',
    term: 'Direct-to-Consumer (DTC)',
    definition: 'Selling products directly to customers without retailers, usually through e-commerce.',
    philExample: 'Like a lemonade stand instead of selling through a store!',
    realWorldExample: 'Warby Parker and Casper disrupted industries by cutting out traditional retailers.',
    sourceModule: 'market-intelligence',
    category: 'Consumer Goods',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'E-commerce', 'Business Models'],
    icon: '🛍️',
  },
  
  // Healthcare & Pharma
  {
    id: 'mi-health-1',
    term: 'Big Pharma',
    definition: 'The largest pharmaceutical companies that develop and sell prescription drugs worldwide.',
    philExample: 'Like the biggest hospitals that make the most medicine!',
    realWorldExample: 'Pfizer, Johnson & Johnson, and Merck are major pharmaceutical companies.',
    sourceModule: 'market-intelligence',
    category: 'Healthcare & Pharma',
    difficulty: 'beginner',
    tags: ['Market Intelligence', 'Healthcare', 'Pharma'],
    icon: '⚕️',
  },
  {
    id: 'mi-health-2',
    term: 'FDA Approval',
    definition: 'US regulatory approval required for new drugs and medical devices to be sold in the market.',
    philExample: 'Like getting a teacher\'s permission slip before going on a field trip!',
    realWorldExample: 'New drugs must pass rigorous FDA trials proving safety and effectiveness.',
    sourceModule: 'market-intelligence',
    category: 'Healthcare & Pharma',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'Healthcare', 'Regulation'],
    icon: '⚕️',
  },
  {
    id: 'mi-health-3',
    term: 'Biotech',
    definition: 'Companies using biology and technology to develop new treatments, often with cutting-edge science.',
    philExample: 'Like using science experiments to create new medicines!',
    realWorldExample: 'Moderna used mRNA biotech to develop COVID-19 vaccines in record time.',
    sourceModule: 'market-intelligence',
    category: 'Healthcare & Pharma',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'Healthcare', 'Innovation'],
    icon: '⚕️',
  },
  
  // Energy
  {
    id: 'mi-energy-1',
    term: 'Renewable Energy',
    definition: 'Power generated from sources that naturally replenish - solar, wind, hydro, geothermal.',
    philExample: 'Like using sunlight and wind that never run out!',
    realWorldExample: 'Tesla and NextEra Energy lead in solar and wind power generation.',
    sourceModule: 'market-intelligence',
    category: 'Energy & Utilities',
    difficulty: 'beginner',
    tags: ['Market Intelligence', 'Energy', 'Sustainability'],
    icon: '⚡',
  },
  {
    id: 'mi-energy-2',
    term: 'ESG Investing',
    definition: 'Environmental, Social, and Governance factors considered when making investment decisions.',
    philExample: 'Like choosing stores that treat workers well and protect the environment!',
    realWorldExample: 'ESG funds avoid companies with poor environmental records or labor practices.',
    sourceModule: 'market-intelligence',
    category: 'Energy & Utilities',
    difficulty: 'intermediate',
    tags: ['Market Intelligence', 'ESG', 'Sustainable Investing'],
    icon: '⚡',
  },
];

// Combine all flashcards
let cachedFlashcards: UnifiedFlashcard[] | null = null;

export const getAllUnifiedFlashcards = (): UnifiedFlashcard[] => {
  if (cachedFlashcards) return cachedFlashcards;
  
  const personalFinance = extractPersonalFinanceFlashcards();
  cachedFlashcards = [
    ...personalFinance,
    ...careersFlashcards,
    ...marketIntelligenceFlashcards,
  ];
  
  return cachedFlashcards;
};

// Get flashcards by source module
export const getFlashcardsBySource = (source: 'personal-finance' | 'market-intelligence' | 'careers'): UnifiedFlashcard[] => {
  return getAllUnifiedFlashcards().filter(card => card.sourceModule === source);
};

// Get flashcards by difficulty
export const getFlashcardsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): UnifiedFlashcard[] => {
  return getAllUnifiedFlashcards().filter(card => card.difficulty === difficulty);
};

// Get flashcards by category
export const getFlashcardsByCategory = (category: string): UnifiedFlashcard[] => {
  return getAllUnifiedFlashcards().filter(card => card.category === category);
};

// Get all unique categories with counts
export const getFlashcardCategories = (): FlashcardCategory[] => {
  const allCards = getAllUnifiedFlashcards();
  const categoryMap = new Map<string, { cards: UnifiedFlashcard[], icon: string }>();
  
  allCards.forEach(card => {
    const existing = categoryMap.get(card.category);
    if (existing) {
      existing.cards.push(card);
    } else {
      categoryMap.set(card.category, { cards: [card], icon: card.icon });
    }
  });
  
  return Array.from(categoryMap.entries()).map(([title, { cards, icon }]) => {
    // Group by subcategory
    const subcategoryMap = new Map<string, number>();
    cards.forEach(card => {
      const subcat = card.subcategory || 'General';
      subcategoryMap.set(subcat, (subcategoryMap.get(subcat) || 0) + 1);
    });
    
    const subcategories: FlashcardSubcategory[] = Array.from(subcategoryMap.entries()).map(([subTitle, count]) => ({
      id: `${title.toLowerCase().replace(/\s+/g, '-')}-${subTitle.toLowerCase().replace(/\s+/g, '-')}`,
      title: subTitle,
      icon,
      cardCount: count,
    }));
    
    return {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      description: `${cards.length} flashcards`,
      icon,
      cardCount: cards.length,
      subcategories,
    };
  });
};

// Get total card count
export const getTotalFlashcardCount = (): number => {
  return getAllUnifiedFlashcards().length;
};

// Search flashcards
export const searchFlashcards = (query: string): UnifiedFlashcard[] => {
  const lowerQuery = query.toLowerCase();
  return getAllUnifiedFlashcards().filter(card => 
    card.term.toLowerCase().includes(lowerQuery) ||
    card.definition.toLowerCase().includes(lowerQuery) ||
    card.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
