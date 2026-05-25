import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ClipQuizQuestion } from '@/types/phils-friends';
import QuizOption from '@/components/quiz/QuizOption';
import QuizFeedback from '@/components/quiz/QuizFeedback';

interface ReelClipQuizProps {
  question: ClipQuizQuestion;
  onSubmit: (selectedIndex: number) => void;
  onSkip?: () => void;
  submitting?: boolean;
}

const ReelClipQuiz: React.FC<ReelClipQuizProps> = ({
  question,
  onSubmit,
  onSkip,
  submitting = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  const handleSelect = (index: number) => {
    if (hasAttempted || submitting) return;
    setSelectedIndex(index);
    setHasAttempted(true);
    onSubmit(index);
  };

  const isCorrect = hasAttempted && selectedIndex === question.correct_index;

  return (
    <div
      className="absolute inset-0 z-30 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4"
      role="dialog"
      aria-label="Quick check"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl ring-2 ring-green-200 p-4 pb-6 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-green-800">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold">Quick check</span>
          </div>
          {onSkip && !hasAttempted && (
            <button
              type="button"
              onClick={onSkip}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
              aria-label="Skip"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="font-semibold text-green-900 text-base mb-3 leading-snug">
          {question.question}
        </p>

        <div className="space-y-1.5">
          {question.options.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              index={index}
              isSelected={selectedIndex === index}
              isCorrect={index === question.correct_index}
              hasAttempted={hasAttempted}
              isCompleted={false}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>

        {hasAttempted && question.explanation && (
          <QuizFeedback
            type={isCorrect ? 'completed' : 'incorrect'}
            message={question.explanation}
          />
        )}

        {hasAttempted && (
          <Button
            className="w-full mt-4 bg-primary hover:bg-primary/90"
            onClick={onSkip}
            disabled={submitting}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReelClipQuiz;
