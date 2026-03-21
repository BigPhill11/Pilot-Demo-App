/**
 * SwipeableStudyDeck - Full swipeable flashcard study experience
 * 
 * Features:
 * - Swipeable cards with progress tracking
 * - XP/coin rewards for mastery via Bamboo Empire
 * - Session summary on completion
 * - Mobile-optimized
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnifiedFlashcard } from '@/data/unified-flashcards';
import SwipeableFlashcard from './SwipeableFlashcard';
import FlashcardProgress from './FlashcardProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, RotateCcw, Trophy, Sparkles, Coins, ArrowRight } from 'lucide-react';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import confetti from 'canvas-confetti';

interface SwipeableStudyDeckProps {
  cards: UnifiedFlashcard[];
  title: string;
  onComplete: (stats: SessionStats) => void;
  onBack: () => void;
}

export interface SessionStats {
  totalCards: number;
  masteredCount: number;
  reviewCount: number;
  xpEarned: number;
  coinsEarned: number;
}

const SwipeableStudyDeck: React.FC<SwipeableStudyDeckProps> = ({
  cards,
  title,
  onComplete,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewQueue, setReviewQueue] = useState<UnifiedFlashcard[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  
  const { currentStreak, recordActivity } = useUnifiedStreak();
  const { awardActivityCompletion } = usePlatformIntegration();

  // Calculate XP based on difficulty
  const calculateRewards = (card: UnifiedFlashcard, mastered: boolean): { xp: number; coins: number } => {
    const baseXp = mastered ? 10 : 2;
    const multiplier = card.difficulty === 'advanced' ? 1.5 : card.difficulty === 'intermediate' ? 1.2 : 1;
    return {
      xp: Math.round(baseXp * multiplier),
      coins: mastered ? 1 : 0,
    };
  };

  const handleSwipeRight = useCallback(() => {
    const card = cards[currentIndex];
    const rewards = calculateRewards(card, true);
    
    // Award to Bamboo Empire
    awardActivityCompletion('flashcard_mastery', undefined, false);
    
    setMasteredCount(prev => prev + 1);
    setXpEarned(prev => prev + rewards.xp);
    setCoinsEarned(prev => prev + rewards.coins);
    
    moveToNextCard();
  }, [currentIndex, cards, awardActivityCompletion]);

  const handleSwipeLeft = useCallback(() => {
    const card = cards[currentIndex];
    const rewards = calculateRewards(card, false);
    
    setReviewCount(prev => prev + 1);
    setReviewQueue(prev => [...prev, card]);
    setXpEarned(prev => prev + rewards.xp);
    
    moveToNextCard();
  }, [currentIndex, cards]);

  const moveToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (reviewQueue.length > 0) {
      // Go through review queue
      setCurrentIndex(0);
      // For now, just mark as complete
      completeSession();
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    setIsComplete(true);
    recordActivity();
    
    // Celebrate if good performance
    if (masteredCount > cards.length / 2) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setMasteredCount(0);
    setReviewCount(0);
    setReviewQueue([]);
    setIsComplete(false);
    setXpEarned(0);
    setCoinsEarned(0);
  };

  const handleFinish = () => {
    onComplete({
      totalCards: cards.length,
      masteredCount,
      reviewCount,
      xpEarned,
      coinsEarned,
    });
  };

  if (cards.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No flashcards available in this category.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </Card>
    );
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-card border-2">
          <CardHeader className="text-center pb-2">
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl">Session Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/20">
                <Trophy className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold text-green-600">{masteredCount}</div>
                <div className="text-sm text-muted-foreground">Mastered</div>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 text-center border border-orange-500/20">
                <RotateCcw className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <div className="text-2xl font-bold text-orange-600">{reviewCount}</div>
                <div className="text-sm text-muted-foreground">Need Review</div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-r from-purple-500/10 to-yellow-500/10 rounded-xl p-4 border">
              <h3 className="font-semibold text-center mb-3">Rewards Earned</h3>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <span className="text-xl font-bold text-purple-600">+{xpEarned} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <span className="text-xl font-bold text-yellow-600">+{coinsEarned}</span>
                </div>
              </div>
            </div>

            {/* Accuracy */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
              <div className="text-3xl font-bold text-foreground">
                {Math.round((masteredCount / cards.length) * 100)}%
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleRestart}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Study Again
              </Button>
              <Button 
                className="flex-1"
                onClick={handleFinish}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Badge variant="outline" className="text-sm">
          {title}
        </Badge>
      </div>

      {/* Progress */}
      <FlashcardProgress
        currentCard={currentIndex + 1}
        totalCards={cards.length}
        masteredCount={masteredCount}
        reviewCount={reviewCount}
        xpEarned={xpEarned}
        coinsEarned={coinsEarned}
        streak={currentStreak}
      />

      {/* Current Card */}
      <AnimatePresence mode="wait">
        <SwipeableFlashcard
          key={cards[currentIndex].id}
          card={cards[currentIndex]}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
        />
      </AnimatePresence>
    </div>
  );
};

export default SwipeableStudyDeck;
