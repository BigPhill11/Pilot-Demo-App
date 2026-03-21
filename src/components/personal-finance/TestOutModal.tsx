import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getModuleById, PERSONAL_FINANCE_MODULES } from '@/data/personal-finance/modules';
import { cn } from '@/lib/utils';

interface TestOutModalProps {
  moduleId: string;
  onClose: () => void;
  onComplete: (passed: boolean) => void;
}

const TestOutModal: React.FC<TestOutModalProps> = ({
  moduleId,
  onClose,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const module = getModuleById(moduleId);
  const moduleInfo = PERSONAL_FINANCE_MODULES.find(m => m.id === moduleId);
  
  // Use test out questions if available, otherwise use empty array
  const questions = module?.testOutQuestions || [];
  const totalQuestions = questions.length;
  const passingScore = 85;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctIndex;
    
    if (!showFeedback) {
      setShowFeedback(true);
      setAnswers([...answers, isCorrect]);
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter(a => a).length;
    return Math.round((correct / totalQuestions) * 100);
  };

  const passed = calculateScore() >= passingScore;

  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-card border rounded-xl shadow-2xl w-full max-w-md p-6 text-center"
        >
          <p className="text-muted-foreground">Test out questions are not yet available for this module.</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-card border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              <span className="text-xl">{moduleInfo?.icon}</span>
              Test Into: {moduleInfo?.name}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Score {passingScore}% or higher to unlock
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {!showResult ? (
          <>
            {/* Progress */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span className="font-medium text-primary">
                  {answers.filter(a => a).length} correct
                </span>
              </div>
              <Progress value={((currentQuestion + 1) / totalQuestions) * 100} className="h-2" />
            </div>

            {/* Question */}
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === questions[currentQuestion].correctIndex;
                  const showCorrectness = showFeedback && (isSelected || isCorrect);

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        !showFeedback && isSelected && "border-primary bg-primary/5",
                        !showFeedback && !isSelected && "border-border hover:border-primary/50",
                        showFeedback && isCorrect && "border-emerald-500 bg-emerald-500/10",
                        showFeedback && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                        showFeedback && !isSelected && !isCorrect && "opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          !showFeedback && isSelected && "border-primary bg-primary text-primary-foreground",
                          !showFeedback && !isSelected && "border-muted-foreground/30",
                          showFeedback && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                          showFeedback && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                        )}>
                          {showCorrectness && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                          {showCorrectness && isSelected && !isCorrect && <XCircle className="w-4 h-4" />}
                          {!showFeedback && isSelected && <span className="text-xs">✓</span>}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback message */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mt-4 p-3 rounded-lg text-sm",
                    selectedAnswer === questions[currentQuestion].correctIndex
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-500/10 text-red-700 dark:text-red-300"
                  )}
                >
                  {selectedAnswer === questions[currentQuestion].correctIndex
                    ? "Correct! Well done."
                    : `Incorrect. The correct answer is: ${questions[currentQuestion].options[questions[currentQuestion].correctIndex]}`
                  }
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t bg-muted/20">
              <Button 
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="w-full"
              >
                {!showFeedback ? 'Submit Answer' : currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          /* Results */
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4",
                passed ? "bg-emerald-500/20" : "bg-red-500/20"
              )}
            >
              {passed ? (
                <Trophy className="w-12 h-12 text-emerald-500" />
              ) : (
                <XCircle className="w-12 h-12 text-red-500" />
              )}
            </motion.div>

            <h3 className="text-2xl font-bold mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h3>

            <p className="text-4xl font-bold mb-2 text-primary">
              {calculateScore()}%
            </p>

            <p className="text-muted-foreground mb-6">
              {passed
                ? `You've unlocked the ${moduleInfo?.name} module!`
                : `You need ${passingScore}% to pass. Keep studying and try again!`
              }
            </p>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button 
                onClick={() => onComplete(passed)} 
                className={cn("flex-1", passed && "bg-emerald-600 hover:bg-emerald-700")}
              >
                {passed ? 'Start Learning!' : 'Try Again Later'}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TestOutModal;
