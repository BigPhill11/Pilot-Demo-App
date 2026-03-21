import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Decision } from '@/types/career-story';
import { Clock, TrendingUp, Users, Activity } from 'lucide-react';

interface DecisionCardProps {
  decision: Decision;
  onSelectOption: (optionId: string) => void;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision, onSelectOption }) => {
  return (
    <div className="space-y-4">
      <div className="bg-primary/10 p-4 rounded-lg">
        <h4 className="font-semibold text-lg mb-2">{decision.prompt}</h4>
        <p className="text-sm text-muted-foreground">{decision.context}</p>
      </div>

      <div className="grid gap-4">
        {decision.options.map((option) => (
          <Card
            key={option.id}
            className="p-4 hover:bg-accent cursor-pointer transition-colors"
            onClick={() => onSelectOption(option.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h5 className="font-semibold mb-1">{option.text}</h5>
                {option.description && (
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                )}
              </div>
              <Button size="sm">Choose</Button>
            </div>

            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              {option.timeImpact !== undefined && option.timeImpact !== 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{option.timeImpact > 0 ? '+' : ''}{option.timeImpact} time</span>
                </div>
              )}
              {option.technicalScore !== undefined && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{option.technicalScore}% technical</span>
                </div>
              )}
              {option.relationshipImpact && Object.keys(option.relationshipImpact).length > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Affects relationships</span>
                </div>
              )}
              {option.stressImpact !== undefined && option.stressImpact !== 0 && (
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>{option.stressImpact > 0 ? '+' : ''}{option.stressImpact} stress</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DecisionCard;
