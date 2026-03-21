
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import DifficultySelector from './DifficultySelector';

interface LevelContentProps {
  level: any;
  journey: any;
  progress: any;
  onBack: () => void;
  onProgressChange: (newProgress: any) => void;
  onLevelComplete: (levelId: number) => void;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
  getDifficultyContent: (level: any, difficulty: string) => any;
}

const LevelContent: React.FC<LevelContentProps> = ({
  level,
  journey,
  progress,
  onBack,
  onProgressChange,
  onLevelComplete,
  onQuizComplete,
  getDifficultyContent
}) => {
  const isMobile = useIsMobile();
  const content = getDifficultyContent(level, progress.selectedDifficulty);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>
        <div>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
            Level {level.level}: {level.focusArea}
          </h2>
          <Badge variant="outline" className="mt-1">
            {progress.selectedDifficulty.charAt(0).toUpperCase() + progress.selectedDifficulty.slice(1)} Level
          </Badge>
        </div>
      </div>

      <DifficultySelector
        selectedDifficulty={progress.selectedDifficulty}
        onDifficultyChange={(difficulty) => 
          onProgressChange({ ...progress, selectedDifficulty: difficulty })
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-500" />
            Understanding {level.focusArea}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Explanation</h4>
            <p className="text-muted-foreground leading-relaxed">
              {content.explanation}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Real-World Example</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                {content.realWorldExample}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Key Takeaways</h4>
            <ul className="space-y-2">
              {content.keyTakeaways.map((takeaway: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <InteractiveQuiz
        topicId={`${journey.id}-level-${level.level}-${progress.selectedDifficulty}`}
        question={`What did you learn about ${level.focusArea} in ${journey.name}?`}
        options={[
          "I understand the key concepts and real-world applications",
          "I need to review this topic again",
          "I'm ready to move on to the next level",
          "This was very helpful and informative"
        ]}
        correctAnswerIndex={0}
        feedbackForIncorrect="Take your time to review the content. Understanding each level thoroughly will help you succeed!"
        onQuizComplete={onQuizComplete}
        isCompleted={progress.completedLevels.includes(level.level)}
      />

      {!progress.completedLevels.includes(level.level) && (
        <Button 
          onClick={() => onLevelComplete(level.level)}
          className="w-full"
          size="lg"
        >
          Complete Level {level.level}
        </Button>
      )}
    </div>
  );
};

export default LevelContent;
