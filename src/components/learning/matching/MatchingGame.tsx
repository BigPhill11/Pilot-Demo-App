/**
 * MatchingGame - Memory matching game with time betting and combos
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  Timer,
  Trophy,
  Sparkles,
  Zap
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { getAllUnifiedFlashcards } from '@/data/unified-flashcards';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface MatchingGameProps {
  timeLimit: number;
  pairCount: number;
  multiplier: number;
  onComplete: (won: boolean, timeRemaining: number, comboBonus: number) => void;
  onBack: () => void;
}

interface MatchCard {
  id: string;
  content: string;
  type: 'term' | 'definition';
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ 
  timeLimit, 
  pairCount, 
  multiplier,
  onComplete, 
  onBack 
}) => {
  const isMobile = useIsMobile();
  const { awardResources } = usePlatformIntegration();
  
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize cards
  useEffect(() => {
    const flashcards = getAllUnifiedFlashcards()
      .sort(() => Math.random() - 0.5)
      .slice(0, pairCount);
    
    const gameCards: MatchCard[] = [];
    
    flashcards.forEach((card, index) => {
      const pairId = `pair-${index}`;
      gameCards.push({
        id: `term-${index}`,
        content: card.term,
        type: 'term',
        pairId,
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: `def-${index}`,
        content: card.definition.length > 60 ? card.definition.slice(0, 60) + '...' : card.definition,
        type: 'definition',
        pairId,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle cards
    setCards(gameCards.sort(() => Math.random() - 0.5));
  }, [pairCount]);

  // Timer
  useEffect(() => {
    if (isGameOver) return;
    
    if (timeLeft <= 0) {
      handleGameOver(false);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  // Check for win
  useEffect(() => {
    if (matchedPairs.size === pairCount && pairCount > 0) {
      handleGameOver(true);
    }
  }, [matchedPairs, pairCount]);

  const handleGameOver = useCallback((won: boolean) => {
    setIsGameOver(true);
    setHasWon(won);
    
    if (won) {
      // Calculate rewards
      const baseReward = 25;
      const comboBonus = maxCombo * 2;
      const totalBamboo = Math.round((baseReward + comboBonus) * multiplier);
      const totalXp = Math.round(5 * multiplier);
      
      awardResources(totalBamboo, totalXp, 'matching_game', true);
      
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [awardResources, maxCombo, multiplier]);

  const handleCardClick = (cardId: string) => {
    if (isProcessing || isGameOver) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || flippedCards.includes(cardId)) return;
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    // Update card flip state
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first)!;
      const secondCard = cards.find(c => c.id === second)!;
      
      if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // Match!
        setTimeout(() => {
          setMatchedPairs(prev => new Set([...prev, firstCard.pairId]));
          setCards(prev => prev.map(c => 
            c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setCombo(prev => {
            const newCombo = prev + 1;
            setMaxCombo(m => Math.max(m, newCombo));
            return newCombo;
          });
          setIsProcessing(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setCombo(0);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const handleFinish = () => {
    onComplete(hasWon, timeLeft, maxCombo);
  };

  // Grid columns based on pair count
  const getGridCols = () => {
    if (isMobile) {
      if (pairCount <= 6) return 'grid-cols-3';
      return 'grid-cols-4';
    }
    if (pairCount <= 6) return 'grid-cols-4';
    if (pairCount <= 8) return 'grid-cols-4';
    return 'grid-cols-6';
  };

  if (isGameOver) {
    const baseReward = 25;
    const comboBonus = maxCombo * 2;
    const totalBamboo = hasWon ? Math.round((baseReward + comboBonus) * multiplier) : Math.round(matchedPairs.size * 3);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className="text-center py-8">
          <CardContent>
            {hasWon ? (
              <>
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Victory!</h2>
                <p className="text-muted-foreground">
                  Completed in {timeLimit - timeLeft} seconds
                </p>
              </>
            ) : (
              <>
                <Timer className="h-16 w-16 mx-auto text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
                <p className="text-muted-foreground">
                  Matched {matchedPairs.size} of {pairCount} pairs
                </p>
              </>
            )}
            
            <div className="grid grid-cols-3 gap-4 my-6">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{matchedPairs.size}/{pairCount}</div>
                <div className="text-xs text-muted-foreground">Pairs</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-500">{maxCombo}x</div>
                <div className="text-xs text-muted-foreground">Max Combo</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-yellow-500">{totalBamboo}</div>
                <div className="text-xs text-muted-foreground">Bamboo</div>
              </div>
            </div>
            
            {hasWon && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>{multiplier}x Time Bonus Applied!</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Button className="w-full" size="lg" onClick={handleFinish}>
          Continue
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quit
        </Button>
        
        <div className="flex items-center gap-3">
          {combo > 1 && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-purple-500/20 text-purple-600">
              <Zap className="h-3 w-3" />
              {combo}x Combo!
            </Badge>
          )}
          
          <Badge 
            variant={timeLeft <= 10 ? 'destructive' : 'outline'} 
            className={`flex items-center gap-1 ${timeLeft <= 10 ? 'animate-pulse' : ''}`}
          >
            <Timer className="h-3 w-3" />
            {timeLeft}s
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Matched: {matchedPairs.size}/{pairCount}</span>
          <span>{multiplier}x Reward</span>
        </div>
        <Progress value={(matchedPairs.size / pairCount) * 100} className="h-2" />
      </div>

      {/* Card Grid */}
      <div className={`grid ${getGridCols()} gap-2`}>
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: card.isMatched ? 0.5 : 1, 
                scale: card.isMatched ? 0.95 : 1 
              }}
              className="perspective-1000"
            >
              <Card
                className={`cursor-pointer transition-all duration-300 h-20 sm:h-24 ${
                  card.isMatched 
                    ? 'bg-green-500/20 border-green-300' 
                    : card.isFlipped 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:border-primary/50'
                } ${card.type === 'term' ? 'bg-blue-500/5' : 'bg-purple-500/5'}`}
                onClick={() => handleCardClick(card.id)}
              >
                <CardContent className="p-2 h-full flex items-center justify-center">
                  {card.isFlipped || card.isMatched ? (
                    <p className={`text-center text-xs sm:text-sm line-clamp-3 ${
                      card.type === 'term' ? 'font-semibold' : ''
                    }`}>
                      {card.content}
                    </p>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg">?</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Combo Indicator */}
      {combo >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-1">
            🔥 {combo}x Combo! +{combo * 2} Bonus Bamboo
          </Badge>
        </motion.div>
      )}
    </div>
  );
};

export default MatchingGame;
