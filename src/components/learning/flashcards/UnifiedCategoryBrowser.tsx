/**
 * UnifiedCategoryBrowser - Large category navigation for flashcards
 * 
 * Features:
 * - Three main categories: Personal Finance, Market Intel, Careers
 * - Large, prominent navigation cards
 * - Drill down into subcategories
 * - Back navigation
 * - Beta lock for Market Intel and Careers
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  getAllUnifiedFlashcards, 
  UnifiedFlashcard 
} from '@/data/unified-flashcards';
import { useIsMobile } from '@/hooks/use-mobile';
import ComingSoonDialog from '@/components/ui/ComingSoonDialog';
import { 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  ChevronLeft, 
  Play,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

interface UnifiedCategoryBrowserProps {
  onSelectCards: (cards: UnifiedFlashcard[], title: string) => void;
}

type SourceType = 'personal-finance' | 'careers' | 'market-intelligence';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface MainCategory {
  id: SourceType;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  locked?: boolean;
}

const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'personal-finance',
    title: 'Personal Finance',
    description: 'Build your financial foundation with budgeting, saving, and investing concepts',
    icon: <BookOpen className="h-8 w-8" />,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    locked: false,
  },
  {
    id: 'market-intelligence',
    title: 'Market Intelligence',
    description: 'Master market analysis, trading concepts, and investment strategies',
    icon: <TrendingUp className="h-8 w-8" />,
    gradient: 'from-gray-500/20 to-gray-500/10',
    borderColor: 'border-gray-400/30 hover:border-gray-400/60',
    locked: true,
  },
  {
    id: 'careers',
    title: 'Careers in Finance',
    description: 'Explore finance career paths and industry knowledge',
    icon: <Briefcase className="h-8 w-8" />,
    gradient: 'from-gray-500/20 to-gray-500/10',
    borderColor: 'border-gray-400/30 hover:border-gray-400/60',
    locked: true,
  },
];

const UnifiedCategoryBrowser: React.FC<UnifiedCategoryBrowserProps> = ({ onSelectCards }) => {
  const isMobile = useIsMobile();
  const [selectedSource, setSelectedSource] = useState<SourceType | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');

  // Get all cards - only personal finance for now
  const allCards = useMemo(() => getAllUnifiedFlashcards(), []);
  const availableCards = useMemo(() => 
    allCards.filter(c => c.sourceModule === 'personal-finance'), 
    [allCards]
  );

  // Get cards for each main category
  const categoryStats = useMemo(() => {
    const stats: Record<SourceType, { count: number; difficulties: Record<string, number> }> = {
      'personal-finance': { count: 0, difficulties: {} },
      'market-intelligence': { count: 0, difficulties: {} },
      'careers': { count: 0, difficulties: {} },
    };

    allCards.forEach(card => {
      const source = card.sourceModule as SourceType;
      if (stats[source]) {
        stats[source].count++;
        stats[source].difficulties[card.difficulty] = (stats[source].difficulties[card.difficulty] || 0) + 1;
      }
    });

    return stats;
  }, [allCards]);

  // Get subcategories for selected source
  const subcategories = useMemo(() => {
    if (!selectedSource) return [];

    let cards = allCards.filter(c => c.sourceModule === selectedSource);
    
    if (difficultyFilter !== 'all') {
      cards = cards.filter(c => c.difficulty === difficultyFilter);
    }

    const categoryMap = new Map<string, { cards: UnifiedFlashcard[], icon: string }>();
    cards.forEach(card => {
      const existing = categoryMap.get(card.category);
      if (existing) {
        existing.cards.push(card);
      } else {
        categoryMap.set(card.category, { cards: [card], icon: card.icon });
      }
    });

    return Array.from(categoryMap.entries()).map(([title, { cards, icon }]) => ({
      title,
      icon,
      cards,
      cardCount: cards.length,
    }));
  }, [selectedSource, allCards, difficultyFilter]);

  const handleCategoryClick = (category: MainCategory) => {
    if (category.locked) {
      setComingSoonFeature(category.title);
      setShowComingSoon(true);
      return;
    }
    setSelectedSource(category.id);
  };

  const handleSelectCategory = (category: typeof subcategories[0]) => {
    onSelectCards(category.cards, category.title);
  };

  const handleStudyAll = (source: SourceType) => {
    let cards = allCards.filter(c => c.sourceModule === source);
    if (difficultyFilter !== 'all') {
      cards = cards.filter(c => c.difficulty === difficultyFilter);
    }
    const category = MAIN_CATEGORIES.find(c => c.id === source);
    onSelectCards(cards, category?.title || 'All Cards');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-white';
      case 'advanced': return 'bg-red-500 text-white';
      default: return 'bg-muted';
    }
  };

  // Main category view
  if (!selectedSource) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Choose a Topic</h2>
          <p className="text-muted-foreground">Select a category to start studying flashcards</p>
        </div>

        <div className="space-y-4">
          {MAIN_CATEGORIES.map((category) => {
            const stats = categoryStats[category.id];
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${category.borderColor} bg-gradient-to-r ${category.gradient} hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${category.locked ? 'opacity-70' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-background/50 backdrop-blur relative">
                      {category.icon}
                      {category.locked && (
                        <Lock className="h-4 w-4 absolute -top-1 -right-1 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          {category.title}
                          {category.locked && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              Coming Soon
                            </Badge>
                          )}
                        </h3>
                        {category.locked ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-semibold">
                          {category.locked ? '🔒' : `${stats.count} cards`}
                        </Badge>
                        {!category.locked && (
                          <div className="flex gap-1">
                            {['beginner', 'intermediate', 'advanced'].map(diff => {
                              const count = stats.difficulties[diff] || 0;
                              if (count === 0) return null;
                              return (
                                <Badge 
                                  key={diff} 
                                  className={`text-[10px] ${getDifficultyColor(diff)}`}
                                >
                                  {count}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Study All Option - Only Personal Finance cards */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 mt-8">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold text-lg">Study Personal Finance</h3>
                <p className="text-sm text-muted-foreground">
                  {availableCards.length} cards available
                </p>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={() => onSelectCards(availableCards, 'Personal Finance Flashcards')}
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          </CardContent>
        </Card>

        {/* Coming Soon Dialog */}
        <ComingSoonDialog
          isOpen={showComingSoon}
          onClose={() => setShowComingSoon(false)}
          featureName={comingSoonFeature}
        />
      </div>
    );
  }

  // Subcategory view
  const currentMainCategory = MAIN_CATEGORIES.find(c => c.id === selectedSource);
  const totalFilteredCards = subcategories.reduce((sum, cat) => sum + cat.cardCount, 0);

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSelectedSource(null)}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground truncate">
            {currentMainCategory?.title}
          </h2>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground self-center">Difficulty:</span>
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
          <Badge
            key={diff}
            variant={difficultyFilter === diff ? 'default' : 'outline'}
            className={`cursor-pointer transition-all ${
              difficultyFilter === diff 
                ? diff === 'beginner' ? 'bg-green-500 hover:bg-green-600' 
                  : diff === 'intermediate' ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : diff === 'advanced' ? 'bg-red-500 hover:bg-red-600' 
                  : '' 
                : 'hover:bg-muted'
            }`}
            onClick={() => setDifficultyFilter(diff)}
          >
            {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
          </Badge>
        ))}
      </div>

      {/* Study All in Category */}
      <Card className={`bg-gradient-to-r ${currentMainCategory?.gradient} border-2 ${currentMainCategory?.borderColor?.replace('hover:', '')}`}>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Study All ({totalFilteredCards} cards)</h3>
            <p className="text-sm text-muted-foreground">
              Review all {currentMainCategory?.title} cards
            </p>
          </div>
          <Button 
            onClick={() => handleStudyAll(selectedSource)}
            disabled={totalFilteredCards === 0}
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        </CardContent>
      </Card>

      {/* Subcategory Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {subcategories.map((category) => (
          <Card 
            key={category.title}
            className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group"
            onClick={() => handleSelectCategory(category)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.cardCount} cards
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {['beginner', 'intermediate', 'advanced'].map(diff => {
                  const count = category.cards.filter(c => c.difficulty === diff).length;
                  if (count === 0) return null;
                  return (
                    <Badge 
                      key={diff} 
                      className={`text-[10px] ${getDifficultyColor(diff)}`}
                    >
                      {count} {diff.charAt(0).toUpperCase()}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {subcategories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No flashcards match your current filter.</p>
          <Button variant="link" onClick={() => setDifficultyFilter('all')}>
            Clear filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default UnifiedCategoryBrowser;
