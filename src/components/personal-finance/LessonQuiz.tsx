import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from '@/types/personal-finance';
import { cn } from '@/lib/utils';

interface LessonQuizProps {
  questions: QuizQuestion[];
  onComplete: (correctAnswers: number) => void;
}

const LessonQuiz: React.FC<LessonQuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (!showFeedback) {
      const isCorrect = selectedAnswer === currentQuestion.correctIndex;
      setAnswers([...answers, isCorrect]);
      setShowFeedback(true);
    } else {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizComplete(true);
      }
    }
  };

  const correctCount = answers.filter(a => a).length;

  if (quizComplete) {
    const score = Math.round((correctCount / questions.length) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
          score >= 70 ? "bg-emerald-500/20" : "bg-amber-500/20"
        )}>
          <Trophy className={cn(
            "w-10 h-10",
            score >= 70 ? "text-emerald-500" : "text-amber-500"
          )} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-primary mb-2">{score}%</p>
          <p className="text-muted-foreground">
            You got {correctCount} out of {questions.length} correct
          </p>
        </div>

        <Button onClick={() => onComplete(correctCount)} className="w-full">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold flex items-center gap-2">
            <span className="text-xl">📝</span>
            Knowledge Check
          </h2>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Score indicator */}
      {answers.length > 0 && (
        <div className="flex items-center gap-2">
          {answers.map((correct, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full",
                correct ? "bg-emerald-500" : "bg-red-500"
              )}
            />
          ))}
          {Array.from({ length: questions.length - answers.length }).map((_, i) => (
            <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-muted" />
          ))}
        </div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const showCorrectness = showFeedback && (isSelected || isCorrect);

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3",
                      !showFeedback && isSelected && "border-primary bg-primary/5",
                      !showFeedback && !isSelected && "border-border hover:border-primary/50",
                      showFeedback && isCorrect && "border-emerald-500 bg-emerald-500/10",
                      showFeedback && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                      showFeedback && !isSelected && !isCorrect && "opacity-40"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      !showFeedback && isSelected && "border-primary bg-primary text-primary-foreground",
                      !showFeedback && !isSelected && "border-muted-foreground/30",
                      showFeedback && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                      showFeedback && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                    )}>
                      {showCorrectness && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                      {showCorrectness && isSelected && !isCorrect && <XCircle className="w-4 h-4" />}
                    </div>
                    <span className="text-sm">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {showFeedback && currentQuestion.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 p-4 rounded-lg",
                selectedAnswer === currentQuestion.correctIndex
                  ? "bg-emerald-500/10 border border-emerald-500/30"
                  : "bg-amber-500/10 border border-amber-500/30"
              )}
            >
              <p className="text-sm">
                <strong>
                  {selectedAnswer === currentQuestion.correctIndex ? '✓ Correct! ' : '✗ Not quite. '}
                </strong>
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className="w-full"
      >
        {!showFeedback ? 'Submit Answer' : currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

export default LessonQuiz;
