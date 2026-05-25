/**
 * Unified Flashcard Data Source
 *
 * Thin aggregator over lesson sources — no hardcoded card lists.
 *  - Personal Finance  → lesson.flashcards[] in every PF module
 *  - Market Intelligence → MI lesson flashcards via miLessonToUnifiedFlashcards()
 *  - Careers & Finance   → extractCareersFlashcards()
 */

import { incomeModule, financialPlanningModule, savingModule, investingModule, insuranceModule, taxesModule, creditDebtModule, careerIncomeModule, wealthFundamentalsModule } from './personal-finance/modules';
import type { PersonalFinanceFlashcard } from '@/types/personal-finance';
import { languageOfFinanceLessons } from './market-intelligence/language-of-finance-lessons';
import { ownershipLessons } from './market-intelligence/ownership-lessons';
import { allHeadlinesLessons } from './market-intelligence/headlines-lessons';
import { miLessonToUnifiedFlashcards } from './market-intelligence/mi-flashcard-unlocks';
import { extractCareersFlashcards } from './flashcards/extractCareersFlashcards';

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

// ── Market Intelligence ──────────────────────────────────────────────────────
// All MI cards are derived from lesson sources; no hardcoded lists.

const marketIntelligenceFlashcards: UnifiedFlashcard[] = [
  ...languageOfFinanceLessons,
  ...ownershipLessons,
  ...allHeadlinesLessons,
].flatMap((lesson) => miLessonToUnifiedFlashcards(lesson));

// ── DEAD CODE BELOW — kept only so the file compiles until the block is removed ──
// (will be swept in cleanup task)
const _obsolete: UnifiedFlashcard[] = [
  // Tech Companies (hardcoded — no longer used)
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
void _obsolete; // suppress unused-variable warning — remove with cleanup task

// ── Aggregator ───────────────────────────────────────────────────────────────
let cachedFlashcards: UnifiedFlashcard[] | null = null;

export const getAllUnifiedFlashcards = (): UnifiedFlashcard[] => {
  if (cachedFlashcards) return cachedFlashcards;

  cachedFlashcards = [
    ...extractPersonalFinanceFlashcards(),
    ...marketIntelligenceFlashcards,
    ...extractCareersFlashcards(),
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
