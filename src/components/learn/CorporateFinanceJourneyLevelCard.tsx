import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { CorporateFinanceLevel } from '@/data/corporate-finance-journey-data';

interface CorporateFinanceJourneyLevelCardProps {
  level: CorporateFinanceLevel;
  isCompleted: boolean;
  isUnlocked: boolean;
  onLevelSelect: (levelId: number) => void;
}

const CorporateFinanceJourneyLevelCard: React.FC<CorporateFinanceJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onLevelSelect
}) => {
  const getLevelIcon = (levelId: number) => {
    const icons = ['🏢', '📊', '⏰'];
    return icons[levelId - 1] || '📚';
  };

  const getCardStyle = () => {
    if (isCompleted) {
      return 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40';
    }
    if (isUnlocked) {
      return 'border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 dark:from-orange-950/30 dark:to-yellow-950/30 dark:hover:from-orange-900/40 dark:hover:to-yellow-900/40';
    }
    return 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700';
  };

  const getTopics = (levelId: number) => {
    const topics = {
      1: ['Corporate Finance', 'Debt vs Equity', 'Capital Management'],
      2: ['Financial Statements', 'Revenue & Profit', 'Assets & Liabilities'],
      3: ['Time Value of Money', 'Present Value', 'Future Value']
    };
    return topics[levelId as keyof typeof topics] || [];
  };

  const getBorderGlow = () => {
    if (isCompleted) return 'shadow-green-200 dark:shadow-green-900/50';
    if (isUnlocked) return 'shadow-orange-200 dark:shadow-orange-900/50';
    return 'shadow-gray-200 dark:shadow-gray-800';
  };

  return (
    <Card className={`cursor-pointer transition-all duration-300 ${getCardStyle()} shadow-lg ${getBorderGlow()} hover:shadow-xl hover:scale-[1.02]`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg shadow-sm">
              {getLevelIcon(level.id)}
            </div>
            <div>
              <CardTitle className="text-lg text-orange-700 dark:text-orange-300 font-bold">
                Level {level.id}: {level.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {level.description}
              </p>
            </div>
          </div>
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
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">Key Topics:</h4>
          <div className="flex flex-wrap gap-1">
            {getTopics(level.id).slice(0, 3).map((topic, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-white/60 dark:bg-gray-800/60 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => isUnlocked && onLevelSelect(level.id)}
          disabled={!isUnlocked}
          className={`w-full transition-all duration-300 ${
            isCompleted 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-300 dark:hover:shadow-green-900/50' 
              : isUnlocked
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-orange-300 dark:hover:shadow-orange-900/50'
                : 'bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
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

export default CorporateFinanceJourneyLevelCard;