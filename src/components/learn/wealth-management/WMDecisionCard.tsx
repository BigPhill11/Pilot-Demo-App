/**
 * WM Decision Card
 * 
 * Card component for displaying decision options
 * with trade-off indicators and selection state.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  Minus,
  ChevronRight
} from 'lucide-react';
import { WMDecisionOption, WMSimMeterChanges } from '@/types/wealth-management-sim';

interface WMDecisionCardProps {
  option: WMDecisionOption;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

const WMDecisionCard: React.FC<WMDecisionCardProps> = ({
  option,
  isSelected,
  onSelect,
  disabled = false,
  showFeedback = false,
}) => {
  const getChangeIndicators = (changes: WMSimMeterChanges) => {
    const indicators: { label: string; value: number; isPositive: boolean }[] = [];
    
    const labels: Record<string, string> = {
      salary: 'Salary',
      investmentKnowledge: 'Knowledge',
      clientRelations: 'Relations',
      technicalAnalysis: 'Technical',
      workLifeBalance: 'Work-Life',
      productivity: 'Productivity',
      fatigue: 'Fatigue',
    };

    Object.entries(changes).forEach(([key, value]) => {
      if (value && value !== 0) {
        const isFatigue = key === 'fatigue';
        const isPositive = isFatigue ? value < 0 : value > 0;
        indicators.push({
          label: labels[key] || key,
          value: key === 'salary' ? value / 1000 : value,
          isPositive,
        });
      }
    });

    return indicators;
  };

  const indicators = getChangeIndicators(option.meterChanges);
  const positiveIndicators = indicators.filter(i => i.isPositive);
  const negativeIndicators = indicators.filter(i => !i.isPositive);

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' 
          : 'border-green-200 hover:border-emerald-300 hover:shadow-md'
        }
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
      `}
      onClick={() => !disabled && onSelect()}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-green-800 mb-1">{option.label}</h4>
            <p className="text-sm text-green-600/80">{option.description}</p>
          </div>
          
          {isSelected && (
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <ChevronRight className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Trade-off Indicators */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {positiveIndicators.map((ind, idx) => (
            <Badge 
              key={`pos-${idx}`}
              variant="outline" 
              className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {ind.label} {ind.value > 0 ? '+' : ''}{ind.label === 'Salary' ? `$${ind.value}K` : ind.value}
            </Badge>
          ))}
          
          {negativeIndicators.map((ind, idx) => (
            <Badge 
              key={`neg-${idx}`}
              variant="outline" 
              className="bg-rose-50 border-rose-200 text-rose-700 text-xs"
            >
              <TrendingDown className="h-3 w-3 mr-1" />
              {ind.label} {ind.value > 0 ? '+' : ''}{ind.label === 'Salary' ? `$${ind.value}K` : ind.value}
            </Badge>
          ))}
        </div>

        {/* Feedback (shown after selection) */}
        {showFeedback && isSelected && (
          <div className="mt-3 pt-3 border-t border-emerald-200">
            <p className="text-sm text-emerald-700 italic">{option.feedback}</p>
            {option.philInsight && (
              <div className="mt-2 flex items-start gap-2 text-xs text-green-600/80">
                <span className="text-lg">🐼</span>
                <p><strong>Phil's insight:</strong> {option.philInsight}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WMDecisionCard;
