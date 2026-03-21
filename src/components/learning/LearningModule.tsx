
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import HighlightableTerm from '@/components/HighlightableTerm';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { BookOpen, Target, Trophy } from 'lucide-react';

interface LearningModuleProps {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: React.ReactNode;
  quiz?: {
    topicId: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    feedbackForIncorrect?: string;
  };
}

const LearningModule: React.FC<LearningModuleProps> = ({
  title,
  level,
  content,
  quiz
}) => {
  const { profile } = useAuth();
  const { progress, updateQuizScore } = useProgressTracking();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return <BookOpen className="h-4 w-4" />;
      case 'intermediate': return <Target className="h-4 w-4" />;
      case 'advanced': return <Trophy className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const isUserLevel = profile?.app_version === level;
  const isQuizCompleted = quiz ? progress.quiz_scores[quiz.topicId] === true : false;

  return (
    <Card className={`${isUserLevel ? 'ring-2 ring-primary' : ''} mb-6`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getLevelIcon(level)}
            {title}
          </CardTitle>
          <Badge 
            className={`${getLevelColor(level)} text-white`}
            variant="secondary"
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
        </div>
        {isUserLevel && (
          <div className="mt-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Your Progress</span>
              <span>{progress.learning_progress}%</span>
            </div>
            <Progress value={progress.learning_progress} className="h-2" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {content}
        </div>
        
        {quiz && (
          <InteractiveQuiz
            topicId={quiz.topicId}
            question={quiz.question}
            options={quiz.options}
            correctAnswerIndex={quiz.correctAnswerIndex}
            feedbackForIncorrect={quiz.feedbackForIncorrect}
            onQuizComplete={updateQuizScore}
            isCompleted={isQuizCompleted}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LearningModule;
