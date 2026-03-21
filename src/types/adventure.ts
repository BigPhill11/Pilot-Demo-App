
export interface Adventure {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  chapters: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  category: 'company-analysis' | 'market-psychology' | 'forecasting' | 'economics' | 'risk-management' | 'portfolio-management' | 'wealth-building';
}
