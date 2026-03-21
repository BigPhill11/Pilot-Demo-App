import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ModuleQuiz as QuizType } from '@/data/evaluation-lessons';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface ModuleQuizProps {
  quiz: QuizType;
  moduleTitle: string;
  onComplete: (score: number, passed: boolean) => void;
  onBack: () => void;
}

const ModuleQuiz: React.FC<ModuleQuizProps> = ({ quiz, moduleTitle, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = quiz.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const score = answers.filter(a => a).length;
  const passed = score >= quiz.passingScore;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
      onComplete(score + (isCorrect ? 1 : 0), score + (isCorrect ? 1 : 0) >= quiz.passingScore);
    }
  };

  if (quizCompleted) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const finalPassed = finalScore >= quiz.passingScore;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-6xl ${finalPassed ? 'text-green-500' : 'text-orange-500'}`}>
              {finalPassed ? '🎉' : '📚'}
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {finalScore} / {quiz.questions.length}
              </div>
              <p className="text-muted-foreground">
                {finalPassed 
                  ? `Great job! You passed with ${finalScore} correct answers!`
                  : `You need ${quiz.passingScore} correct to pass. Keep learning and try again!`
                }
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={onBack} variant="outline">
              {finalPassed ? 'Continue to Next Module' : 'Review Content'}
            </Button>
            {!finalPassed && (
              <Button onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowFeedback(false);
                setAnswers([]);
                setQuizCompleted(false);
              }}>
                Retake Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Module
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{moduleTitle} - Quiz</h2>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => !showFeedback && setSelectedAnswer(parseInt(value))}
            disabled={showFeedback}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  showFeedback
                    ? index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-950 border-green-500'
                      : index === selectedAnswer
                        ? 'bg-red-50 dark:bg-red-950 border-red-500'
                        : 'border-muted'
                    : selectedAnswer === index
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <span>{option}</span>
                  {showFeedback && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {showFeedback && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showFeedback && (
            <div className={`p-4 rounded-lg ${
              isCorrect 
                ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                : 'bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-orange-800 dark:text-orange-200'
              }`}>
                {isCorrect ? '✓ Correct!' : '✗ Not quite'}
              </h4>
              <p className={`text-sm ${
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'
              }`}>
                {question.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-muted-foreground">
              Score: {answers.filter(a => a).length} / {currentQuestion}
            </div>
            <Button
              onClick={showFeedback ? handleNext : handleAnswer}
              disabled={selectedAnswer === null}
            >
              {showFeedback 
                ? currentQuestion === quiz.questions.length - 1 
                  ? 'Finish Quiz' 
                  : 'Next Question'
                : 'Submit Answer'
              }
              {showFeedback && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleQuiz;
