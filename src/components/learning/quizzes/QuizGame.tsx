/**
 * QuizGame - Core quiz gameplay with streak bonuses and rewards
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  Flame,
  Check,
  X,
  Timer,
  Trophy,
  Sparkles
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { getAllUnifiedFlashcards, getFlashcardsByCategory, UnifiedFlashcard } from '@/data/unified-flashcards';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

interface QuizGameProps {
  topicId: string;
  difficulty: Difficulty;
  onComplete: (score: number, totalQuestions: number, streak: number) => void;
  onBack: () => void;
}

interface QuizQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

const QUESTIONS_PER_QUIZ = 10;
const HARD_MODE_TIME = 15; // seconds

const QuizGame: React.FC<QuizGameProps> = ({ topicId, difficulty, onComplete, onBack }) => {
  const isMobile = useIsMobile();
  const { awardResources } = usePlatformIntegration();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(HARD_MODE_TIME);
  const [totalBamboo, setTotalBamboo] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Generate questions from flashcards
  useEffect(() => {
    const flashcards = topicId === 'all' 
      ? getAllUnifiedFlashcards()
      : getFlashcardsByCategory(topicId);
    
    if (flashcards.length === 0) {
      // Fallback to all cards if category is empty
      const allCards = getAllUnifiedFlashcards();
      generateQuestions(allCards);
    } else {
      generateQuestions(flashcards);
    }
  }, [topicId]);

  const generateQuestions = (flashcards: UnifiedFlashcard[]) => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    const selectedCards = shuffled.slice(0, QUESTIONS_PER_QUIZ);
    
    const optionCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;
    
    const quizQuestions: QuizQuestion[] = selectedCards.map((card) => {
      // Get wrong answers from other cards
      const wrongAnswers = shuffled
        .filter(c => c.id !== card.id)
        .map(c => c.definition)
        .slice(0, optionCount - 1);
      
      // Combine and shuffle options
      const options = [...wrongAnswers, card.definition]
        .sort(() => Math.random() - 0.5);
      
      return {
        question: `What is "${card.term}"?`,
        correctAnswer: card.definition,
        options,
        explanation: card.definition
      };
    });
    
    setQuestions(quizQuestions);
  };

  // Timer for hard mode
  useEffect(() => {
    if (difficulty !== 'hard' || isAnswered || showResults) return;
    
    if (timeLeft <= 0) {
      handleAnswer(null); // Time's up
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, difficulty, showResults]);

  const getStreakMultiplier = useCallback(() => {
    if (streak >= 10) return 3;
    if (streak >= 5) return 2;
    if (streak >= 3) return 1.5;
    return 1;
  }, [streak]);

  const handleAnswer = (answer: string | null) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion?.correctAnswer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      setScore(prev => prev + 1);
      
      // Calculate rewards with streak multiplier
      const multiplier = getStreakMultiplier();
      const bambooEarned = Math.round(5 * multiplier);
      const xpEarned = Math.round(2 * multiplier);
      
      setTotalBamboo(prev => prev + bambooEarned);
      setTotalXp(prev => prev + xpEarned);
      
      // Milestone celebrations
      if (newStreak === 5 || newStreak === 10 || newStreak === 15) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      // Quiz complete
      awardResources(totalBamboo, totalXp, 'quiz_completion', true);
      setShowResults(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(HARD_MODE_TIME);
    }
  };

  const handleFinish = () => {
    onComplete(score, questions.length, maxStreak);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className="text-center py-8">
          <CardContent>
            <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            
            <div className="text-5xl font-bold my-6">
              {percentage}%
            </div>
            
            <div className="grid grid-cols-3 gap-4 my-6">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-500">{score}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-500">{maxStreak}x</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-yellow-500">{totalBamboo}</div>
                <div className="text-xs text-muted-foreground">Bamboo</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span>+{totalXp} XP earned!</span>
            </div>
          </CardContent>
        </Card>
        
        <Button className="w-full" size="lg" onClick={handleFinish}>
          Continue
        </Button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quit
        </Button>
        
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <Badge 
              variant="secondary" 
              className={`flex items-center gap-1 ${streak >= 5 ? 'bg-orange-500/20 text-orange-600' : ''}`}
            >
              <Flame className={`h-3 w-3 ${streak >= 3 ? 'text-orange-500' : ''}`} />
              {streak}x
              {streak >= 3 && <span className="text-xs">({getStreakMultiplier()}x)</span>}
            </Badge>
          )}
          
          {difficulty === 'hard' && (
            <Badge 
              variant={timeLeft <= 5 ? 'destructive' : 'outline'} 
              className="flex items-center gap-1"
            >
              <Timer className="h-3 w-3" />
              {timeLeft}s
            </Badge>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{score} correct</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="mb-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-center">
                {currentQuestion.question}
              </h3>
            </CardContent>
          </Card>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let optionStyle = 'border-2 hover:border-primary/50';
              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'border-2 border-green-500 bg-green-500/10';
                } else if (isSelected) {
                  optionStyle = 'border-2 border-red-500 bg-red-500/10';
                }
              } else if (isSelected) {
                optionStyle = 'border-2 border-primary';
              }
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${optionStyle} ${
                      isAnswered ? 'pointer-events-none' : ''
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    <CardContent className={`p-4 flex items-center gap-3 ${isMobile ? 'text-sm' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isAnswered && isCorrect ? 'bg-green-500 text-white' : 
                        isAnswered && isSelected ? 'bg-red-500 text-white' : 
                        'bg-muted'
                      }`}>
                        {isAnswered && isCorrect ? <Check className="h-4 w-4" /> :
                         isAnswered && isSelected ? <X className="h-4 w-4" /> :
                         String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback & Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className={`p-4 ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-500/10 border-green-300' : 'bg-red-500/10 border-red-300'}`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-600">Correct!</span>
                  {streak > 1 && (
                    <Badge variant="secondary" className="ml-auto">
                      🔥 {streak} in a row!
                    </Badge>
                  )}
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-600">
                    {selectedAnswer === null ? "Time's up!" : 'Incorrect'}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.explanation}
            </p>
          </Card>
          
          <Button className="w-full" size="lg" onClick={handleNext}>
            {currentIndex >= questions.length - 1 ? 'See Results' : 'Next Question'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizGame;
