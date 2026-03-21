import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, AlertCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect: string;
}

interface HedgeFundQuizWithFeedbackProps {
  questions: QuizQuestion[];
  onQuizComplete: (allCorrect: boolean) => void;
}

const HedgeFundQuizWithFeedback: React.FC<HedgeFundQuizWithFeedbackProps> = ({
  questions,
  onQuizComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowFeedback(answers[currentQuestion + 1] !== null);
    } else {
      setQuizCompleted(true);
      const allCorrect = answers.every((answer, index) => answer === questions[index].correctAnswerIndex);
      onQuizComplete(allCorrect);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowFeedback(answers[currentQuestion - 1] !== null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
  };

  const getCorrectAnswersCount = () => {
    return answers.filter((answer, index) => answer === questions[index].correctAnswerIndex).length;
  };

  if (quizCompleted) {
    const correctCount = getCorrectAnswersCount();
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    return (
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Quiz Complete!</h3>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {correctCount}/{questions.length} Correct
              </div>
              <Badge 
                className={
                  percentage === 100 ? 'bg-green-100 text-green-800' :
                  percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                  percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {percentage}% Score
              </Badge>
            </div>
          </div>

          {/* Review incorrect answers */}
          {correctCount < questions.length && (
            <div className="space-y-4">
              <h4 className="font-semibold text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Review Incorrect Answers:
              </h4>
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswerIndex;
                
                if (isCorrect) return null;
                
                return (
                  <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="space-y-3">
                      <div className="font-medium">Question {index + 1}: {question.question}</div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-red-700">
                            Your answer: {userAnswer !== null ? question.options[userAnswer] : 'No answer'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-700">
                            Correct answer: {question.options[question.correctAnswerIndex]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                        <strong>Explanation:</strong> {question.feedbackForIncorrect}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center">
            <Button variant="outline" onClick={resetQuiz}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswerIndex;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h4 className="font-semibold text-lg leading-relaxed">{question.question}</h4>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                selectedAnswer === index
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                  : showFeedback && index === question.correctAnswerIndex
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && index === question.correctAnswerIndex && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {selectedAnswer === index && !isCorrect && (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && !isCorrect && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800 mb-1">Incorrect</p>
                <p className="text-sm text-red-700">{question.feedbackForIncorrect}</p>
              </div>
            </div>
          </div>
        )}

        {showFeedback && isCorrect && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-800">Correct! Well done.</p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          {showFeedback && (
            <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700">
              {currentQuestion + 1 === questions.length ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HedgeFundQuizWithFeedback;