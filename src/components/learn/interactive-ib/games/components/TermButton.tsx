
import React from 'react';
import { Button } from '@/components/ui/button';
import HighlightableTerm from '@/components/HighlightableTerm';

interface TermData {
  term: string;
  definition: string;
  analogy: string;
}

interface TermButtonProps {
  termKey: string;
  termData: TermData;
  isMatched: boolean;
  isSelected: boolean;
  gameCompleted: boolean;
  onClick: (termKey: string) => void;
  children?: React.ReactNode;
}

const TermButton: React.FC<TermButtonProps> = ({
  termKey,
  termData,
  isMatched,
  isSelected,
  gameCompleted,
  onClick,
  children
}) => {
  const getButtonClass = () => {
    if (isMatched) return "bg-green-500 text-white cursor-default";
    if (isSelected) return "bg-blue-500 text-white";
    return "bg-white hover:bg-gray-100 border-2 border-gray-200";
  };

  return (
    <Button
      onClick={() => onClick(termKey)}
      className={`w-full p-4 h-auto text-left justify-start text-wrap break-words whitespace-normal ${getButtonClass()}`}
      variant="outline"
      disabled={isMatched || gameCompleted}
    >
      <HighlightableTerm
        term={termData.term}
        definition={termData.definition}
        analogy={termData.analogy}
      >
        {children}
      </HighlightableTerm>
    </Button>
  );
};

export default TermButton;
