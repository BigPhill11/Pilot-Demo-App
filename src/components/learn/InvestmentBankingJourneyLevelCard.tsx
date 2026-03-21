import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Play, Star, TrendingUp, Users } from 'lucide-react';

interface InvestmentBankingLevel {
  level: number;
  title: string;
  theme: string;
  description: string;
  keyTerms: string[];
}

interface InvestmentBankingJourneyLevelCardProps {
  level: InvestmentBankingLevel;
  isCompleted: boolean;
  isUnlocked: boolean;
  onLevelSelect: (levelId: number) => void;
}

const InvestmentBankingJourneyLevelCard: React.FC<InvestmentBankingJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onLevelSelect
}) => {
  const getLevelIcon = (levelId: number) => {
    const icons = ['🏦', '📈', '💼', '🎯', '💹', '🏆', '👑'];
    return icons[levelId - 1] || '📚';
  };

  const getLevelColor = (levelId: number) => {
    const colors = [
      'blue', 'indigo', 'purple', 'pink', 'rose', 'orange', 'amber'
    ];
    return colors[levelId - 1] || 'blue';
  };

  const getCardStyle = () => {
    const colorScheme = getLevelColor(level.level);
    
    if (isCompleted) {
      return `border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40`;
    }
    if (isUnlocked) {
      return `border-${colorScheme}-300 bg-gradient-to-br from-${colorScheme}-50 to-${colorScheme}-100 hover:from-${colorScheme}-100 hover:to-${colorScheme}-200 dark:from-${colorScheme}-950/30 dark:to-${colorScheme}-900/30 dark:hover:from-${colorScheme}-900/40 dark:hover:to-${colorScheme}-800/40`;
    }
    return 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700';
  };

  const getTopics = (levelId: number) => {
    const topics = {
      1: ['Banking Basics', 'Deal Types', 'Industry Overview'],
      2: ['Financial Statements', 'Ratio Analysis', 'Credit Analysis'],
      3: ['DCF Models', 'Comparable Analysis', 'Precedent Transactions'],
      4: ['M&A Process', 'Due Diligence', 'Deal Structure'],
      5: ['IPO Process', 'Capital Markets', 'Investor Relations'],
      6: ['Pitch Books', 'Client Management', 'Deal Execution'],
      7: ['Leadership', 'Team Management', 'Strategic Advisory']
    };
    return topics[levelId as keyof typeof topics] || [];
  };

  const getBorderGlow = () => {
    const colorScheme = getLevelColor(level.level);
    if (isCompleted) return 'shadow-green-200 dark:shadow-green-900/50';
    if (isUnlocked) return `shadow-${colorScheme}-200 dark:shadow-${colorScheme}-900/50`;
    return 'shadow-gray-200 dark:shadow-gray-800';
  };

  const getTextColor = () => {
    const colorScheme = getLevelColor(level.level);
    if (isCompleted) return 'text-green-700 dark:text-green-300';
    if (isUnlocked) return `text-${colorScheme}-700 dark:text-${colorScheme}-300`;
    return 'text-gray-500 dark:text-gray-400';
  };

  const getButtonStyle = () => {
    const colorScheme = getLevelColor(level.level);
    
    if (isCompleted) {
      return 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-300 dark:hover:shadow-green-900/50';
    }
    if (isUnlocked) {
      return `bg-gradient-to-r from-${colorScheme}-500 to-${colorScheme}-600 hover:from-${colorScheme}-600 hover:to-${colorScheme}-700 text-white shadow-lg hover:shadow-${colorScheme}-300 dark:hover:shadow-${colorScheme}-900/50`;
    }
    return 'bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed';
  };

  const getDifficultyBadge = (levelId: number) => {
    if (levelId <= 2) return { text: 'Foundation', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' };
    if (levelId <= 4) return { text: 'Intermediate', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' };
    if (levelId <= 6) return { text: 'Advanced', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' };
    return { text: 'Expert', color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' };
  };

  const difficulty = getDifficultyBadge(level.level);

  return (
    <Card className={`cursor-pointer transition-all duration-300 ${getCardStyle()} shadow-lg ${getBorderGlow()} hover:shadow-xl hover:scale-[1.02] animate-fade-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg shadow-sm animate-scale-in">
              {getLevelIcon(level.level)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className={`text-lg font-bold ${getTextColor()}`}>
                  Level {level.level}: {level.title}
                </CardTitle>
                <Badge className={`text-xs ${difficulty.color}`}>
                  {difficulty.text}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {level.theme}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            {isCompleted && (
              <div className="relative">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 animate-pulse" />
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
              </div>
            )}
            {!isUnlocked && (
              <Lock className="h-6 w-6 text-gray-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {level.description}
        </p>

        <div>
          <h4 className={`text-sm font-medium mb-2 ${getTextColor()}`}>Key Topics:</h4>
          <div className="flex flex-wrap gap-1">
            {getTopics(level.level).slice(0, 3).map((topic, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={`text-xs bg-white/60 dark:bg-gray-800/60 border-opacity-50 ${getTextColor().replace('text-', 'border-')}`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => isUnlocked && onLevelSelect(level.level)}
          disabled={!isUnlocked}
          className={`w-full transition-all duration-300 ${getButtonStyle()}`}
          size="sm"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Completed ✓
            </>
          ) : isUnlocked ? (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Level
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvestmentBankingJourneyLevelCard;