
import React, { useState, useEffect } from 'react';
import QuizOption from '@/components/quiz/QuizOption';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';
import HighlightableTerm from '@/components/HighlightableTerm';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';

interface InteractiveQuizProps {
  topicId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect?: string;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
  isCompleted: boolean;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  topicId,
  question,
  options,
  correctAnswerIndex,
  feedbackForIncorrect,
  onQuizComplete,
  isCompleted
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);
  const { profile } = useAuth();
  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(userLevel);

  // Clear selections when topicId changes (new question)
  useEffect(() => {
    setSelectedAnswerIndex(null);
    setHasAttempted(false);
  }, [topicId]);

  const handleOptionClick = (index: number) => {
    if (hasAttempted || isCompleted) return;

    setSelectedAnswerIndex(index);
    setHasAttempted(true);
    const isCorrect = index === correctAnswerIndex;
    onQuizComplete(topicId, isCorrect);
  };

  const handleRetry = () => {
    setSelectedAnswerIndex(null);
    setHasAttempted(false);
  };

  const renderTextWithTermHighlights = (text: string) => {
    let processedText = text;
    
    // Find all terms that exist in our ibTerms and wrap them with highlights
    Object.keys(ibTerms).forEach(termKey => {
      const term = ibTerms[termKey];
      const termDisplayName = term.term;
      
      // Create regex to find the term (case insensitive, whole word)
      const regex = new RegExp(`\\b${termDisplayName}\\b`, 'gi');
      
      processedText = processedText.replace(regex, (match) => {
        return `<TERM_HIGHLIGHT>${match}</TERM_HIGHLIGHT>`;
      });
    });

    // Split the text and render with highlights
    const parts = processedText.split(/(<TERM_HIGHLIGHT>.*?<\/TERM_HIGHLIGHT>)/);
    
    return parts.map((part, index) => {
      const termMatch = part.match(/<TERM_HIGHLIGHT>(.*?)<\/TERM_HIGHLIGHT>/);
      if (termMatch) {
        const termText = termMatch[1];
        // Find matching term data
        const termData = Object.values(ibTerms).find(term => 
          term.term.toLowerCase() === termText.toLowerCase()
        );
        
        if (termData) {
          return (
            <HighlightableTerm
              key={index}
              term={termData.term}
              definition={termData.definition}
              analogy={termData.analogy}
            >
              <span className="font-semibold text-primary cursor-help underline decoration-dotted">
                {termText}
              </span>
            </HighlightableTerm>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  const showIncorrectFeedback = hasAttempted && 
    selectedAnswerIndex !== correctAnswerIndex && 
    feedbackForIncorrect;

  const showCompletedFeedback = isCompleted && !hasAttempted;

  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted/30">
      <p className="font-semibold mb-3 text-md break-words whitespace-normal">
        {renderTextWithTermHighlights(question)}
      </p>
      <div className="space-y-1">
        {options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswerIndex === index}
            isCorrect={index === correctAnswerIndex}
            hasAttempted={hasAttempted}
            isCompleted={isCompleted}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>
      
      {showIncorrectFeedback && (
        <QuizFeedback 
          type="incorrect" 
          message={feedbackForIncorrect!}
          renderMessage={renderTextWithTermHighlights}
        />
      )}

      {showCompletedFeedback && (
        <QuizFeedback 
          type="completed" 
          message="You've already answered this correctly!" 
        />
      )}

      <QuizActions
        hasAttempted={hasAttempted}
        isCompleted={isCompleted}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default InteractiveQuiz;
