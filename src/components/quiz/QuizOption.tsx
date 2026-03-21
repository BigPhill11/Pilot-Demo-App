
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  hasAttempted: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  isSelected,
  isCorrect,
  hasAttempted,
  isCompleted,
  onClick
}) => {
  const getButtonVariant = () => {
    if (!hasAttempted && !isCompleted) return "outline";
    if (isCorrect) return "default";
    if (isSelected && !isCorrect) return "destructive";
    return "outline";
  };

  const getButtonClassName = () => {
    let baseClasses = "w-full justify-start text-left text-sm py-3 px-4 h-auto mb-2 break-words whitespace-normal min-h-[48px]";
    if (!hasAttempted && !isCompleted) return `${baseClasses} hover:bg-accent`;
    
    if (isCorrect) {
      return `${baseClasses} bg-green-500 hover:bg-green-600 text-white`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClasses} bg-red-500 hover:bg-red-600 text-white`;
    }
    return `${baseClasses} opacity-70 cursor-not-allowed`;
  };

  return (
    <Button
      variant={getButtonVariant()}
      className={getButtonClassName()}
      onClick={onClick}
      disabled={hasAttempted || isCompleted}
    >
      <span className="flex-grow text-wrap leading-relaxed">{option}</span>
      {(hasAttempted || isCompleted) && isCorrect && <CheckCircle2 className="h-5 w-5 ml-2 flex-shrink-0" />}
      {hasAttempted && isSelected && !isCorrect && <XCircle className="h-5 w-5 ml-2 flex-shrink-0" />}
    </Button>
  );
};

export default QuizOption;
