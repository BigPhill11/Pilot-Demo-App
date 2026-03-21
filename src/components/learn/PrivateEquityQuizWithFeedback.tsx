import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface PrivateEquityQuizWithFeedbackProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  isCompleted: boolean;
}

const PrivateEquityQuizWithFeedback: React.FC<PrivateEquityQuizWithFeedbackProps> = ({
  questions,
  onComplete,
  isCompleted
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setQuizFinished(true);
      const finalScore = selectedAnswer === questions[currentQuestion].correct ? score + 1 : score;
      onComplete(finalScore, questions.length);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
    setQuizFinished(false);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (quizFinished) {
    const finalScore = score;
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
          <p className={`text-2xl font-bold ${getScoreColor(finalScore, questions.length)}`}>
            {finalScore}/{questions.length} ({Math.round(percentage)}%)
          </p>
          
          <div className="mt-4">
            {percentage >= 80 && (
              <Badge className="bg-green-600">Excellent! 🌟</Badge>
            )}
            {percentage >= 60 && percentage < 80 && (
              <Badge className="bg-yellow-600">Good job! 👍</Badge>
            )}
            {percentage < 60 && (
              <Badge variant="destructive">Keep practicing! 📚</Badge>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Review Your Answers:</h4>
            <div className="space-y-3">
              {questions.map((q, index) => (
                <div key={index} className="flex items-start gap-3">
                  {answers[index] === q.correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{q.question}</p>
                    <p className="text-xs text-muted-foreground">
                      Your answer: {q.options[answers[index]]}
                    </p>
                    {answers[index] !== q.correct && (
                      <p className="text-xs text-green-600">
                        Correct: {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={resetQuiz} variant="outline" className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Quiz
        </Button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quiz</h3>
        <Badge variant="outline">
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">{currentQ.question}</h4>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showFeedback
                    ? index === currentQ.correct
                      ? "default"
                      : selectedAnswer === index
                      ? "destructive"
                      : "outline"
                    : selectedAnswer === index
                    ? "default"
                    : "outline"
                }
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback || isCompleted}
              >
                <div className="flex items-center gap-3">
                  {showFeedback && (
                    <>
                      {index === currentQ.correct && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {selectedAnswer === index && index !== currentQ.correct && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </>
                  )}
                  <span>{option}</span>
                </div>
              </Button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p className="text-sm font-medium">
                {selectedAnswer === currentQ.correct ? (
                  <span className="text-green-600">✓ Correct!</span>
                ) : (
                  <span className="text-red-600">✗ Incorrect</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                The correct answer is: {currentQ.options[currentQ.correct]}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
        </div>
        
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null || isCompleted}
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestion + 1 >= questions.length ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </div>

      {isCompleted && (
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <Trophy className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-medium">Quiz Completed!</p>
        </div>
      )}
    </div>
  );
};

export default PrivateEquityQuizWithFeedback;