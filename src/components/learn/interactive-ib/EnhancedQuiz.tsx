
import React, { useState } from 'react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

interface EnhancedQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  onRetry: () => void;
}

const EnhancedQuiz: React.FC<EnhancedQuizProps> = ({ questions, onComplete, onRetry }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { awardPoints } = useProgressTracking();

  // Handle empty questions array
  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Questions Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No quiz questions are available for this lesson.</p>
          <Button onClick={onRetry} className="mt-4">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (optionIndex: number) => {
    if (showExplanation) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate score and complete quiz
      const score = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      setQuizCompleted(true);
      setShowResults(true);
      onComplete(score, questions.length);
      // Award XP: 10 per correct answer
      if (score > 0) {
        awardPoints(score * 10, 'Quiz');
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setShowExplanation(false);
    onRetry();
  };

  const getScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{score}/{questions.length}</div>
          <div className="text-lg">Score: {percentage}%</div>
          <div className={`text-lg font-semibold ${percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
          </div>
          <Button onClick={handleRetry} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <Badge variant="outline">{currentQuestion?.difficulty || 'Unknown'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrectAnswer = showExplanation && isCorrect;
              const showIncorrectAnswer = showExplanation && isSelected && !isCorrect;
              
              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto p-4 break-words whitespace-normal ${
                    showCorrectAnswer ? 'bg-green-500 hover:bg-green-600 text-white' :
                    showIncorrectAnswer ? 'bg-red-500 hover:bg-red-600 text-white' :
                    showExplanation ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <span className="flex items-center gap-2 w-full">
                    <span className="flex-grow">{option}</span>
                    {showCorrectAnswer && <CheckCircle2 className="h-5 w-5 flex-shrink-0" />}
                    {showIncorrectAnswer && <XCircle className="h-5 w-5 flex-shrink-0" />}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-lg border ${
            selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-semibold ${
                selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setShowExplanation(false);
              }
            }}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedQuiz;
