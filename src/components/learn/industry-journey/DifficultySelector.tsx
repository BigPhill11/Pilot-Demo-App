
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface DifficultySelectorProps {
  selectedDifficulty: 'beginner' | 'intermediate' | 'pro';
  onDifficultyChange: (difficulty: 'beginner' | 'intermediate' | 'pro') => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onDifficultyChange
}) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Choose Your Learning Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {(['beginner', 'intermediate', 'pro'] as const).map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
              onClick={() => onDifficultyChange(difficulty)}
              className="h-auto p-4 text-left"
            >
              <div>
                <div className="font-semibold capitalize">{difficulty}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {difficulty === 'beginner' && 'Simple explanations with analogies'}
                  {difficulty === 'intermediate' && 'Balanced depth and accessibility'}
                  {difficulty === 'pro' && 'Comprehensive and detailed'}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultySelector;
