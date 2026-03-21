
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface QuizActionsProps {
  hasAttempted: boolean;
  isCompleted: boolean;
  onRetry: () => void;
}

const QuizActions: React.FC<QuizActionsProps> = ({ hasAttempted, isCompleted, onRetry }) => {
  if (!hasAttempted && !isCompleted) {
    return (
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Select an option to test your knowledge.
      </p>
    );
  }

  if (hasAttempted || isCompleted) {
    return (
      <div className="mt-3 flex justify-center">
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Try Again
        </Button>
      </div>
    );
  }

  return null;
};

export default QuizActions;
