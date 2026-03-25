/**
 * Career Jungle Categories
 * 
 * Defines the 4 jungle pathways for the Careers in Finance module.
 * Each jungle contains related finance careers grouped by industry segment.
 */

export interface JungleCategory {
  id: 'sell-side' | 'buy-side' | 'advisory' | 'corporate';
  name: string;
  jungleName: string;
  description: string;
  kidFriendlyDescription: string;
  icon: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  careerIds: string[];
}

export const JUNGLE_CATEGORIES: JungleCategory[] = [
  {
    id: 'sell-side',
    name: 'Sell Side',
    jungleName: 'The Trading Canopy',
    description: 'Help companies raise money, execute trades, and provide financial services',
    kidFriendlyDescription: 'Where the big deals happen! Help companies get money and make trades! 🏦',
    icon: '🏛️',
    accentColor: 'emerald',
    gradientFrom: 'from-emerald-100',
    gradientTo: 'to-green-50',
    borderColor: 'border-emerald-300',
    careerIds: ['investment-banking', 'sales-trading', 'commercial-banking'],
  },
  {
    id: 'buy-side',
    name: 'Buy Side',
    jungleName: 'The Growth Grove',
    description: 'Invest and grow money for clients or firms through strategic investments',
    kidFriendlyDescription: 'Plant seeds of money and watch them grow into mighty trees! 🌳',
    icon: '📈',
    accentColor: 'green',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-teal-50',
    borderColor: 'border-green-300',
    careerIds: ['wealth-management', 'asset-management', 'hedge-funds', 'private-equity', 'venture-capital'],
  },
  {
    id: 'advisory',
    name: 'Advisory',
    jungleName: 'The Wisdom Clearing',
    description: 'Guide companies through complex decisions and transformations',
    kidFriendlyDescription: 'Be the wise guide who helps others find their way through the jungle! 🧭',
    icon: '🤝',
    accentColor: 'teal',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-cyan-50',
    borderColor: 'border-teal-300',
    careerIds: ['management-consulting'],
  },
  {
    id: 'corporate',
    name: 'Corporate Finance',
    jungleName: 'The Bamboo Headquarters',
    description: 'Manage a company\'s finances from the inside',
    kidFriendlyDescription: 'Be the money master inside a company and help it thrive! 🎋',
    icon: '🏢',
    accentColor: 'sage',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    borderColor: 'border-green-200',
    careerIds: ['corporate-finance'],
  },
];

export const getJungleById = (id: string): JungleCategory | undefined => {
  return JUNGLE_CATEGORIES.find(jungle => jungle.id === id);
};

export const getJungleForCareer = (careerId: string): JungleCategory | undefined => {
  return JUNGLE_CATEGORIES.find(jungle => jungle.careerIds.includes(careerId));
};
