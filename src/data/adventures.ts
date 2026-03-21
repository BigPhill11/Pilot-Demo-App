
import { 
  Building, 
  Brain, 
  TrendingUp, 
  Globe,
  Target,
  Shield,
  Gem
} from 'lucide-react';
import { Adventure } from '@/types/adventure';

export const adventures: Adventure[] = [
  {
    id: 'bamboo-business',
    title: 'Phil\'s Bamboo Business Empire',
    description: 'Join Phil as he learns to evaluate different bamboo forests (companies) by examining their soil quality (assets), water sources (cash flow), and growth potential.',
    icon: Building,
    difficulty: 'beginner',
    estimatedTime: '15-20 min',
    chapters: 5,
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    category: 'company-analysis'
  },
  {
    id: 'forest-sentiment',
    title: 'The Great Bamboo Forest Mood Swings',
    description: 'Discover how the emotions of all the pandas in the forest affect bamboo prices, and learn to read the mood of the market through Phil\'s adventures.',
    icon: Brain,
    difficulty: 'beginner',
    estimatedTime: '12-15 min',
    chapters: 4,
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    category: 'market-psychology'
  },
  {
    id: 'weather-forecasting',
    title: 'Phil\'s Weather Prediction Academy',
    description: 'Learn how Phil predicts bamboo seasons by reading weather patterns, soil conditions, and growth cycles - just like forecasting market trends!',
    icon: TrendingUp,
    difficulty: 'intermediate',
    estimatedTime: '18-25 min',
    chapters: 6,
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    category: 'forecasting'
  },
  {
    id: 'panda-economics',
    title: 'The Great Panda Valley Economy',
    description: 'Explore how the entire Panda Valley economy works - from bamboo supply chains to panda employment, interest rates, and inflation through Phil\'s eyes.',
    icon: Globe,
    difficulty: 'advanced',
    estimatedTime: '25-30 min',
    chapters: 7,
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    category: 'economics'
  },
  {
    id: 'phil-risk-management',
    title: 'Phil\'s Safety-First Adventure',
    description: 'Learn how Phil protects his bamboo investments from storms, droughts, and other dangers. Discover risk management strategies that keep your money safe!',
    icon: Shield,
    difficulty: 'intermediate',
    estimatedTime: '20-25 min',
    chapters: 5,
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    category: 'risk-management'
  },
  {
    id: 'phil-portfolio-building',
    title: 'Phil\'s Balanced Bamboo Collection',
    description: 'Join Phil as he learns to build a diverse collection of bamboo investments. Discover how mixing different types creates a stronger, more resilient portfolio!',
    icon: Target,
    difficulty: 'intermediate',
    estimatedTime: '22-28 min',
    chapters: 6,
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    category: 'portfolio-management'
  },
  {
    id: 'phil-wealth-building',
    title: 'Phil\'s Long-Term Treasure Hunt',
    description: 'Follow Phil on his ultimate journey to build lasting wealth through patient investing, compound growth, and smart financial planning over many bamboo seasons.',
    icon: Gem,
    difficulty: 'advanced',
    estimatedTime: '30-35 min',
    chapters: 8,
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    category: 'wealth-building'
  }
];
