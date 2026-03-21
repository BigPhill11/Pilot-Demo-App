import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ManagementConsultingQuizWithFeedbackProps {
  questions: QuizQuestion[];
  onComplete: (isCorrect: boolean) => void;
  onReset: () => void;
  isCompleted: boolean;
}

const ManagementConsultingQuizWithFeedback: React.FC<ManagementConsultingQuizWithFeedbackProps> = ({
  questions,
  onComplete,
  onReset,
  isCompleted
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion?.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newShowFeedback = [...showFeedback];
    newShowFeedback[currentQuestionIndex] = true;
    setShowFeedback(newShowFeedback);

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz finished
        setQuizFinished(true);
        const overallCorrect = newSelectedAnswers.filter((answer, index) => 
          answer === questions[index].correctAnswer
        ).length;
        onComplete(overallCorrect >= Math.ceil(questions.length * 0.6)); // 60% pass rate
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowFeedback([]);
    setQuizFinished(false);
    onReset();
  };

  const getScoreSummary = () => {
    const correctCount = selectedAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    return { correct: correctCount, total: questions.length };
  };

  if (quizFinished) {
    const { correct, total } = getScoreSummary();
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 60;

    return (
      <Card className={`${passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="p-6 text-center space-y-4">
          {passed ? (
            <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
          ) : (
            <XCircle className="h-16 w-16 mx-auto text-red-500" />
          )}
          
          <div>
            <h3 className={`text-2xl font-bold ${passed ? 'text-green-800' : 'text-red-800'}`}>
              {passed ? 'Quiz Passed!' : 'Quiz Not Passed'}
            </h3>
            <p className={`text-lg ${passed ? 'text-green-700' : 'text-red-700'}`}>
              Score: {correct} / {total} ({percentage}%)
            </p>
          </div>

          {!passed && (
            <p className="text-red-700 text-sm">
              You need at least 60% to pass. Review the material and try again!
            </p>
          )}

          <div className="space-y-4">
            <h4 className="font-semibold">Review Your Answers:</h4>
            <div className="space-y-3 text-left">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isQuestionCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={index} className={`${isQuestionCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2 mb-2">
                        {isQuestionCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-2">Q{index + 1}: {question.question}</p>
                          
                          {!isQuestionCorrect && (
                            <div className="space-y-1">
                              <p className="text-sm text-red-700">
                                <span className="font-medium">Your answer:</span> {question.options[userAnswer]}
                              </p>
                              <p className="text-sm text-green-700">
                                <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                              </p>
                            </div>
                          )}
                          
                          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-xs text-blue-800">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Button onClick={resetQuiz} variant="outline" className="mt-4">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quiz Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <Badge variant="outline">{Math.round(((currentQuestionIndex) / questions.length) * 100)}% Complete</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonVariant: "default" | "outline" | "secondary" | "destructive" = "outline";
              let buttonClass = "";
              
              if (hasAnswered) {
                if (index === currentQuestion.correctAnswer) {
                  buttonVariant = "default";
                  buttonClass = "bg-green-500 hover:bg-green-600 text-white border-green-500";
                } else if (index === selectedAnswers[currentQuestionIndex] && index !== currentQuestion.correctAnswer) {
                  buttonVariant = "destructive";
                }
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className={`w-full text-left justify-start h-auto p-4 ${buttonClass}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={hasAnswered}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              );
            })}
          </div>
        </div>

        {showFeedback[currentQuestionIndex] && (
          <Card className={`${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-red-700 mt-1">
                      The correct answer is: <span className="font-medium">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
                    </p>
                  )}
                  <p className={`text-sm mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          {currentQuestionIndex < questions.length - 1 ? (
            hasAnswered && (
              <div className="text-sm text-muted-foreground">
                Next question in 3 seconds...
              </div>
            )
          ) : (
            hasAnswered && (
              <div className="text-sm text-muted-foreground">
                Calculating results...
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementConsultingQuizWithFeedback;