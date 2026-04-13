/**
 * LessonQuizStep
 * 
 * Quiz component for testing understanding of economics concepts.
 * Shows questions one at a time with immediate feedback.
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb
} from 'lucide-react';
import type { EconomicsQuizQuestion } from '@/types/economics-curriculum';

interface LessonQuizStepProps {
  questions: EconomicsQuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}

interface QuestionResult {
  questionIndex: number;
  selectedIndex: number;
  isCorrect: boolean;
}

const LessonQuizStep: React.FC<LessonQuizStepProps> = ({
  questions,
  onComplete,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setHasAnswered(true);
    setResults(prev => [...prev, {
      questionIndex: currentIndex,
      selectedIndex: selectedAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctIndex,
    }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    const correctCount = results.filter(r => r.isCorrect).length;
    onComplete(correctCount, questions.length);
  };

  const getOptionClassName = (index: number) => {
    const baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all";
    
    if (!hasAnswered) {
      if (selectedAnswer === index) {
        return `${baseClass} border-emerald-500 bg-emerald-50`;
      }
      return `${baseClass} border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50`;
    }

    if (index === currentQuestion.correctIndex) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    if (selectedAnswer === index && !isCorrect) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    return `${baseClass} border-gray-200 bg-gray-50 opacity-60`;
  };

  if (showResults) {
    const correctCount = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              passed ? 'bg-emerald-100' : 'bg-amber-100'
            }`}>
              {passed ? (
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              ) : (
                <HelpCircle className="h-10 w-10 text-amber-600" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">
              Quiz Complete!
            </h2>
            
            <p className="text-lg text-gray-600 mb-4">
              You got <span className="font-bold text-emerald-600">{correctCount}</span> out of <span className="font-bold">{questions.length}</span> correct
            </p>

            <div className="w-full max-w-xs mx-auto mb-6">
              <Progress value={percentage} className={`h-3 ${passed ? 'bg-emerald-100' : 'bg-amber-100'}`} />
              <p className="text-sm text-gray-500 mt-1">{percentage}%</p>
            </div>

            {passed ? (
              <p className="text-emerald-600 font-medium">
                Great job! You've demonstrated a solid understanding of the concepts.
              </p>
            ) : (
              <p className="text-amber-600 font-medium">
                Keep learning! Review the flashcards and try again to improve your score.
              </p>
            )}
          </div>

          <Card className="border-emerald-200 bg-white mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-emerald-800 mb-3">Results Summary</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded ${
                      result.isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    {result.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700 line-clamp-1">
                      Q{index + 1}: {questions[index].question}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleComplete}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
            >
              Continue
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
              <HelpCircle className="h-3 w-3 mr-1" />
              Quiz
            </Badge>
            <span className="text-sm text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-emerald-800 mb-3">
            Test Your Knowledge
          </h2>
          
          <Progress value={progress} className="h-2 bg-indigo-100" />
        </div>

        <Card className="border-emerald-200 bg-white mb-6">
          <CardContent className="p-6">
            <p className="text-lg font-medium text-gray-800 mb-6">
              {currentQuestion.question}
            </p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={hasAnswered}
                  className={getOptionClassName(index)}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                      hasAnswered && index === currentQuestion.correctIndex
                        ? 'bg-green-500 text-white'
                        : hasAnswered && selectedAnswer === index && !isCorrect
                        ? 'bg-red-500 text-white'
                        : selectedAnswer === index
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {hasAnswered && currentQuestion.explanation && (
              <div className={`mt-6 p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className={`h-5 w-5 ${isCorrect ? 'text-green-600' : 'text-amber-600'}`} />
                  <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                    {isCorrect ? 'Correct!' : 'Explanation'}
                  </span>
                </div>
                <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-emerald-300 text-emerald-700"
            disabled={hasAnswered}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          {!hasAnswered ? (
            <Button
              onClick={handleSubmitAnswer}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonQuizStep;

