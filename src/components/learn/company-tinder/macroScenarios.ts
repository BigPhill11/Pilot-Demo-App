/**
 * Macro Scenario System for Company Tinder
 * 
 * Deterministic macro backdrop scenarios that rotate on a fixed schedule.
 * Used to provide economic context for investment decisions.
 */

export interface MacroIndicator {
  name: string;
  value: string;
  direction?: 'up' | 'down' | 'stable';
}

export interface MacroScenario {
  id: string;
  name: string;
  shortDescription: string;
  narrative: string;
  icon: string;
  indicators: MacroIndicator[];
  tendsToWin: string;
  tendsToLose: string;
  sectorBias: Record<string, 'positive' | 'negative' | 'neutral'>;
}

/**
 * Predefined macro scenarios
 */
export const MACRO_SCENARIOS: MacroScenario[] = [
  {
    id: 'rate-hikes',
    name: 'Rising Rate Environment',
    shortDescription: 'Interest rates climbing to fight inflation',
    narrative: 'The central bank is aggressively raising interest rates to cool inflation. Borrowing costs are up, and companies with high debt loads are feeling the squeeze. Growth stocks are under pressure as future earnings are discounted more heavily.',
    icon: '📈',
    indicators: [
      { name: 'Fed Rate', value: '5.25%', direction: 'up' },
      { name: 'Inflation', value: '4.2%', direction: 'down' },
      { name: '10Y Yield', value: '4.8%', direction: 'up' },
    ],
    tendsToWin: 'Banks, insurance, value stocks, companies with pricing power',
    tendsToLose: 'High-growth tech, REITs, utilities, heavily indebted companies',
    sectorBias: {
      technology: 'negative',
      financials: 'positive',
      healthcare: 'neutral',
      consumer: 'negative',
      energy: 'neutral',
      industrials: 'neutral',
    },
  },
  {
    id: 'recession-risk',
    name: 'Recession Fears',
    shortDescription: 'Economic slowdown concerns growing',
    narrative: 'Economic indicators are weakening. Layoffs are rising, consumer spending is slowing, and manufacturing is contracting. Investors are fleeing to safety, favoring defensive stocks and bonds over cyclical names.',
    icon: '⚠️',
    indicators: [
      { name: 'GDP Growth', value: '0.8%', direction: 'down' },
      { name: 'Unemployment', value: '5.1%', direction: 'up' },
      { name: 'Consumer Conf', value: '72', direction: 'down' },
    ],
    tendsToWin: 'Healthcare, utilities, consumer staples, bonds, cash',
    tendsToLose: 'Discretionary spending, travel, luxury, cyclicals',
    sectorBias: {
      technology: 'negative',
      financials: 'negative',
      healthcare: 'positive',
      consumer: 'negative',
      energy: 'negative',
      industrials: 'negative',
    },
  },
  {
    id: 'expansion',
    name: 'Economic Expansion',
    shortDescription: 'Strong growth across the economy',
    narrative: 'The economy is humming. Jobs are plentiful, wages are rising, and businesses are investing in growth. Consumer confidence is high, and companies are reporting strong earnings. Risk appetite is elevated.',
    icon: '🚀',
    indicators: [
      { name: 'GDP Growth', value: '3.2%', direction: 'up' },
      { name: 'Unemployment', value: '3.5%', direction: 'down' },
      { name: 'PMI', value: '56.2', direction: 'up' },
    ],
    tendsToWin: 'Cyclicals, industrials, tech growth, small caps, discretionary',
    tendsToLose: 'Defensive sectors underperform (but still grow)',
    sectorBias: {
      technology: 'positive',
      financials: 'positive',
      healthcare: 'neutral',
      consumer: 'positive',
      energy: 'positive',
      industrials: 'positive',
    },
  },
  {
    id: 'inflation-cooling',
    name: 'Inflation Cooling',
    shortDescription: 'Price pressures easing, soft landing hopes',
    narrative: 'Inflation is coming down without crashing the economy. The Fed may pause or cut rates soon. Both stocks and bonds are rallying as the "soft landing" scenario gains credibility. Growth stocks are rebounding.',
    icon: '🎯',
    indicators: [
      { name: 'Inflation', value: '2.8%', direction: 'down' },
      { name: 'Fed Rate', value: '5.0%', direction: 'stable' },
      { name: 'Market Sentiment', value: 'Bullish', direction: 'up' },
    ],
    tendsToWin: 'Growth stocks, tech, real estate, long-duration assets',
    tendsToLose: 'Inflation hedges, commodities (short-term)',
    sectorBias: {
      technology: 'positive',
      financials: 'neutral',
      healthcare: 'neutral',
      consumer: 'positive',
      energy: 'negative',
      industrials: 'positive',
    },
  },
  {
    id: 'credit-tightening',
    name: 'Credit Tightening',
    shortDescription: 'Banks pulling back on lending',
    narrative: 'Following banking stress, lenders are tightening standards. Small and mid-size businesses are struggling to get financing. M&A activity is slowing. Companies with strong balance sheets have an advantage.',
    icon: '🔐',
    indicators: [
      { name: 'Lending Standards', value: 'Tight', direction: 'up' },
      { name: 'Credit Spreads', value: '+180bps', direction: 'up' },
      { name: 'Bank Stocks', value: '-15% YTD', direction: 'down' },
    ],
    tendsToWin: 'Large caps with cash, low-debt companies, private credit',
    tendsToLose: 'Small caps, high-leverage companies, regional banks',
    sectorBias: {
      technology: 'neutral',
      financials: 'negative',
      healthcare: 'positive',
      consumer: 'negative',
      energy: 'neutral',
      industrials: 'negative',
    },
  },
  {
    id: 'energy-crisis',
    name: 'Energy Price Shock',
    shortDescription: 'Oil and gas prices surging',
    narrative: 'Geopolitical tensions have driven energy prices sharply higher. Consumers are feeling the pinch at the pump, and businesses face higher input costs. Energy stocks are outperforming while everything else struggles.',
    icon: '⛽',
    indicators: [
      { name: 'Oil Price', value: '$95/bbl', direction: 'up' },
      { name: 'Gas Price', value: '$4.50/gal', direction: 'up' },
      { name: 'Energy Stocks', value: '+22% YTD', direction: 'up' },
    ],
    tendsToWin: 'Oil & gas, energy services, defense',
    tendsToLose: 'Airlines, logistics, consumer discretionary, manufacturing',
    sectorBias: {
      technology: 'negative',
      financials: 'neutral',
      healthcare: 'neutral',
      consumer: 'negative',
      energy: 'positive',
      industrials: 'negative',
    },
  },
  {
    id: 'tech-rotation',
    name: 'Tech Leadership',
    shortDescription: 'Technology stocks driving the market',
    narrative: 'AI excitement and strong earnings are pushing tech valuations higher. The "Magnificent Seven" are accounting for most of the market gains. Other sectors are relatively flat as money flows into growth.',
    icon: '💻',
    indicators: [
      { name: 'NASDAQ', value: '+28% YTD', direction: 'up' },
      { name: 'AI Stocks', value: 'Euphoric', direction: 'up' },
      { name: 'Value vs Growth', value: 'Growth +15%', direction: 'up' },
    ],
    tendsToWin: 'Big tech, semiconductors, AI-related, cloud computing',
    tendsToLose: 'Value stocks, small caps, industrials (relative)',
    sectorBias: {
      technology: 'positive',
      financials: 'neutral',
      healthcare: 'neutral',
      consumer: 'neutral',
      energy: 'negative',
      industrials: 'negative',
    },
  },
];

/**
 * Get the macro scenario for a given date
 * Uses a deterministic rotation based on the day of the year
 */
export function getDailyMacroScenario(date: Date = new Date()): MacroScenario {
  // Get day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Rotate through scenarios every 3 days
  const scenarioIndex = Math.floor(dayOfYear / 3) % MACRO_SCENARIOS.length;
  
  return MACRO_SCENARIOS[scenarioIndex];
}

/**
 * Get a specific macro scenario by ID
 */
export function getMacroScenarioById(id: string): MacroScenario | undefined {
  return MACRO_SCENARIOS.find(s => s.id === id);
}

/**
 * Get all available scenarios
 */
export function getAllMacroScenarios(): MacroScenario[] {
  return MACRO_SCENARIOS;
}

/**
 * Check if a company/sector would benefit in the current macro
 */
export function getSectorBias(
  scenarioId: string, 
  sector: string
): 'positive' | 'negative' | 'neutral' {
  const scenario = getMacroScenarioById(scenarioId);
  if (!scenario) return 'neutral';
  return scenario.sectorBias[sector.toLowerCase()] ?? 'neutral';
}



