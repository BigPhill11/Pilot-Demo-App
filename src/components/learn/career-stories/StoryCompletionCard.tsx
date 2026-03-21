import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CareerStory, StoryProgress } from '@/types/career-story';
import { Star, RotateCcw, ArrowLeft, Trophy } from 'lucide-react';

interface StoryCompletionCardProps {
  story: CareerStory;
  progress: StoryProgress;
  onRestart: () => void;
  onBack: () => void;
}

const StoryCompletionCard: React.FC<StoryCompletionCardProps> = ({
  story,
  progress,
  onRestart,
  onBack
}) => {
  const finalScore = 
    (progress.currentMetrics.technicalSkill * 0.35 +
    progress.currentMetrics.timeManagement * 0.25 +
    (Object.values(progress.currentMetrics.relationships).reduce((a, b) => a + b, 0) / 
      Object.values(progress.currentMetrics.relationships).length) * 0.25 +
    (100 - progress.currentMetrics.stressLevel) * 0.15);

  const ending = story.endings
    .sort((a, b) => b.requiredScore - a.requiredScore)
    .find(e => finalScore >= e.requiredScore) || story.endings[story.endings.length - 1];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 text-center">
        <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-bold mb-2">Story Complete!</h2>
        
        <div className="flex justify-center gap-1 my-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-8 w-8 ${
                i < (progress.starsEarned || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">{ending.title}</h3>
          <p className="text-muted-foreground">{ending.description}</p>
        </div>

        {ending.badgeUnlocked && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <p className="font-semibold">🎉 Badge Unlocked!</p>
            <p className="text-sm text-muted-foreground capitalize">
              {ending.badgeUnlocked.replace(/-/g, ' ')}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6 text-left">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Final Score</p>
            <p className="text-2xl font-bold">{Math.round(finalScore)}%</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Decisions Made</p>
            <p className="text-2xl font-bold">{progress.decisionsHistory.length}</p>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
          <Button onClick={onRestart} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StoryCompletionCard;
