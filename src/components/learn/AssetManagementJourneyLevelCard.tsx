import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { AssetManagementLevel } from '@/data/asset-management-journey-data';

interface AssetManagementJourneyLevelCardProps {
  level: AssetManagementLevel;
  isCompleted: boolean;
  isUnlocked: boolean;
  onLevelSelect: (levelId: number) => void;
}

const AssetManagementJourneyLevelCard: React.FC<AssetManagementJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onLevelSelect
}) => {
  const getLevelIcon = (levelId: number) => {
    const icons = ['🏢', '📊', '📈', '🛡️', '🎯'];
    return icons[levelId - 1] || '📚';
  };

  const getCardStyle = () => {
    if (isCompleted) {
      return 'border-green-300 bg-green-50/50 hover:bg-green-50';
    }
    if (isUnlocked) {
      return 'border-blue-300 bg-blue-50/30 hover:bg-blue-50';
    }
    return 'border-gray-200 bg-gray-50/30';
  };

  const getTopics = (levelId: number) => {
    const topics = {
      1: ['Fiduciary Duty', 'Asset Managers', 'Regulation'],
      2: ['Financial Analysis', 'Valuation', 'ESG Investing'],
      3: ['Diversification', 'Asset Allocation', 'Benchmarks'],
      4: ['Risk Types', 'Hedging', 'Derivatives']
    };
    return topics[levelId as keyof typeof topics] || [];
  };

  return (
    <Card className={`cursor-pointer transition-all ${getCardStyle()}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getLevelIcon(level.id)}</span>
            <div>
              <CardTitle className="text-lg text-blue-700">
                Level {level.id}: {level.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {level.description}
              </p>
            </div>
          </div>
          {isCompleted && (
            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
          )}
          {!isUnlocked && (
            <Lock className="h-6 w-6 text-gray-400 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-blue-600 mb-2">Key Topics:</h4>
          <div className="flex flex-wrap gap-1">
            {getTopics(level.id).slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => isUnlocked && onLevelSelect(level.id)}
          disabled={!isUnlocked}
          className={`w-full ${
            isCompleted 
              ? 'bg-green-500 hover:bg-green-600' 
              : isUnlocked
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300'
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

export default AssetManagementJourneyLevelCard;