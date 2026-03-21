import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Star, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrivateEquityJourneyLevelCardProps {
  level: any;
  isCompleted: boolean;
  isUnlocked: boolean;
  onLevelSelect: (levelId: number) => void;
}

const PrivateEquityJourneyLevelCard: React.FC<PrivateEquityJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onLevelSelect
}) => {
  const isMobile = useIsMobile();
  
  const getIcon = () => {
    const icons = [
      <Star className="h-5 w-5" />,
      <Briefcase className="h-5 w-5" />,
      <Target className="h-5 w-5" />,
      <TrendingUp className="h-5 w-5" />,
      <Zap className="h-5 w-5" />,
      <DollarSign className="h-5 w-5" />,
      <Globe className="h-5 w-5" />
    ];
    return icons[(level.id - 1) % icons.length] || icons[0];
  };

  const getLevelTheme = () => {
    const themes = [
      'from-purple-500 to-purple-600',
      'from-violet-500 to-violet-600', 
      'from-purple-600 to-violet-500',
      'from-violet-600 to-purple-500',
      'from-purple-500 to-violet-600',
      'from-violet-500 to-purple-600',
      'from-purple-600 to-violet-600'
    ];
    return themes[(level.id - 1) % themes.length];
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-xl ${
      isCompleted 
        ? 'border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30'
        : isUnlocked 
          ? 'border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 hover:border-purple-400 cursor-pointer'
          : 'border border-gray-200 bg-gray-50 dark:bg-gray-800/50 opacity-75'
    }`} onClick={() => isUnlocked && onLevelSelect(level.id)}>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              isCompleted 
                ? 'bg-green-500' 
                : isUnlocked 
                  ? `bg-gradient-to-r ${getLevelTheme()}` 
                  : 'bg-gray-400'
            }`}>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-white" />
              ) : !isUnlocked ? (
                <Lock className="h-5 w-5 text-white" />
              ) : (
                <div className="text-white">{getIcon()}</div>
              )}
            </div>
            <div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} ${
                isCompleted ? 'text-green-700 dark:text-green-300' : 
                isUnlocked ? 'text-purple-700 dark:text-purple-300' : 
                'text-gray-500 dark:text-gray-400'
              }`}>
                Level {level.id}
              </CardTitle>
              <p className={`text-sm ${
                isCompleted ? 'text-green-600 dark:text-green-400' : 
                isUnlocked ? 'text-purple-600 dark:text-purple-400' : 
                'text-gray-500 dark:text-gray-400'
              } font-medium`}>
                {level.title}
              </p>
            </div>
          </div>
          
          {isCompleted && (
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
              ✓ Complete
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className={`text-sm mb-4 ${
          isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {level.description || level.overview?.substring(0, 120) + '...'}
        </p>

        {/* Topics Preview */}
        {level.topics && (
          <div className="flex flex-wrap gap-1 mb-4">
            {level.topics.slice(0, 3).map((topic: string, idx: number) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className={`text-xs ${
                  isCompleted ? 'border-green-300 text-green-600' :
                  isUnlocked ? 'border-purple-300 text-purple-600' :
                  'border-gray-300 text-gray-500'
                }`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}

        <Button 
          className={`w-full ${isMobile ? 'text-sm' : ''} ${
            isCompleted 
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : isUnlocked 
                ? `bg-gradient-to-r ${getLevelTheme()} hover:opacity-90 text-white`
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          size={isMobile ? 'sm' : 'default'}
          disabled={!isUnlocked}
          onClick={(e) => {
            e.stopPropagation();
            if (isUnlocked) onLevelSelect(level.id);
          }}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Review Level
            </>
          ) : isUnlocked ? (
            <>
              <Star className="h-4 w-4 mr-2" />
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

// Import missing icons
import { Briefcase, Target, TrendingUp, DollarSign, Globe } from 'lucide-react';

export default PrivateEquityJourneyLevelCard;