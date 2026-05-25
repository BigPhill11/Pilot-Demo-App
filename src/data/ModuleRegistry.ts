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