export interface ModuleLevel {
  id: number;
  title: string;
  description: string;
  activities: number;
  estimatedTime: string;
  prerequisites?: number[];
}

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  category: 'personal-finance' | 'careers' | 'companies' | 'interactive' | 'asset-management' | 'consulting';
  levels: ModuleLevel[];
  icon: string;
  color: string;
  targetTab: string;
}

export const moduleRegistry: LearningModule[] = [
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    description: 'Explore careers in investment banking',
    category: 'careers',
    icon: 'TrendingUp',
    color: 'blue',
    targetTab: 'careers',
    levels: [
      { id: 1, title: 'IB Overview', description: 'What is investment banking?', activities: 8, estimatedTime: '45 min' },
      { id: 2, title: 'M&A Fundamentals', description: 'Mergers and acquisitions basics', activities: 10, estimatedTime: '60 min', prerequisites: [1] },
      { id: 3, title: 'Financial Modeling', description: 'Building financial models', activities: 12, estimatedTime: '90 min', prerequisites: [2] },
      { id: 4, title: 'Valuation Methods', description: 'Company valuation techniques', activities: 15, estimatedTime: '75 min', prerequisites: [3] },
      { id: 5, title: 'Deal Process', description: 'End-to-end deal execution', activities: 11, estimatedTime: '65 min', prerequisites: [4] },
      { id: 6, title: 'Industry Analysis', description: 'Sector-specific considerations', activities: 9, estimatedTime: '55 min', prerequisites: [5] },
      { id: 7, title: 'Career Paths', description: 'IB career progression', activities: 7, estimatedTime: '40 min', prerequisites: [6] }
    ]
  },
  {
    id: 'company-discovery',
    name: 'Company Discovery',
    description: 'Research and analyze companies',
    category: 'companies',
    icon: 'Search',
    color: 'emerald',
    targetTab: 'companies',
    levels: [
      { id: 1, title: 'Company Research', description: 'Finding company information', activities: 6, estimatedTime: '35 min' },
      { id: 2, title: 'Financial Analysis', description: 'Analyzing financial statements', activities: 8, estimatedTime: '50 min', prerequisites: [1] },
      { id: 3, title: 'Industry Comparison', description: 'Comparing competitors', activities: 7, estimatedTime: '45 min', prerequisites: [2] },
      { id: 4, title: 'Investment Thesis', description: 'Building investment cases', activities: 9, estimatedTime: '60 min', prerequisites: [3] }
    ]
  },
  {
    id: 'interactive-hub',
    name: 'Interactive Learning Hub',
    description: 'Interactive financial games and simulations',
    category: 'interactive',
    icon: 'PlayCircle',
    color: 'orange',
    targetTab: 'adaptive',
    levels: [
      { id: 1, title: 'Financial Basics', description: 'Interactive financial concepts', activities: 5, estimatedTime: '30 min' },
      { id: 2, title: 'Trading Simulation', description: 'Practice trading stocks', activities: 8, estimatedTime: '45 min', prerequisites: [1] },
      { id: 3, title: 'Portfolio Management', description: 'Build and manage portfolios', activities: 10, estimatedTime: '60 min', prerequisites: [2] },
      { id: 4, title: 'Risk Assessment', description: 'Understanding investment risks', activities: 7, estimatedTime: '40 min', prerequisites: [3] }
    ]
  },
  {
    id: 'asset-management',
    name: 'Asset Management',
    description: 'Learn asset management principles',
    category: 'asset-management',
    icon: 'BarChart3',
    color: 'indigo',
    targetTab: 'careers',
    levels: [
      { id: 1, title: 'AM Fundamentals', description: 'Asset management basics', activities: 6, estimatedTime: '40 min' },
      { id: 2, title: 'Portfolio Theory', description: 'Modern portfolio theory', activities: 8, estimatedTime: '55 min', prerequisites: [1] },
      { id: 3, title: 'Risk Management', description: 'Managing investment risks', activities: 7, estimatedTime: '45 min', prerequisites: [2] },
      { id: 4, title: 'Performance Analysis', description: 'Measuring portfolio performance', activities: 9, estimatedTime: '50 min', prerequisites: [3] }
    ]
  },
  {
    id: 'management-consulting',
    name: 'Management Consulting',
    description: 'Explore consulting careers and methodologies',
    category: 'consulting',
    icon: 'Users',
    color: 'rose',
    targetTab: 'careers',
    levels: [
      { id: 1, title: 'Consulting Overview', description: 'What is management consulting?', activities: 5, estimatedTime: '35 min' },
      { id: 2, title: 'Problem Solving', description: 'Structured problem-solving frameworks', activities: 8, estimatedTime: '60 min', prerequisites: [1] },
      { id: 3, title: 'Case Study Methods', description: 'Approaching case studies', activities: 10, estimatedTime: '75 min', prerequisites: [2] },
      { id: 4, title: 'Client Management', description: 'Managing client relationships', activities: 6, estimatedTime: '45 min', prerequisites: [3] }
    ]
  }
];

export const getModuleById = (moduleId: string): LearningModule | undefined => {
  return moduleRegistry.find(module => module.id === moduleId);
};

export const getLevelById = (moduleId: string, levelId: number): ModuleLevel | undefined => {
  const module = getModuleById(moduleId);
  return module?.levels.find(level => level.id === levelId);
};

export const getModulesByCategory = (category: LearningModule['category']): LearningModule[] => {
  return moduleRegistry.filter(module => module.category === category);
};

export const getAllModules = (): LearningModule[] => {
  return moduleRegistry;
};