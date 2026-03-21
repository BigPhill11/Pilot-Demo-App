/**
 * SwipeableFlashcard - Mobile-first swipeable flashcard component
 * 
 * Features:
 * - Swipe right = Got it (mastered)
 * - Swipe left = Need review
 * - Tap = Flip card
 * - Touch-friendly with large targets
 */

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from 'framer-motion';
import { UnifiedFlashcard } from '@/data/unified-flashcards';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X, RotateCcw, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

interface SwipeableFlashcardProps {
  card: UnifiedFlashcard;
  onSwipeRight: () => void;  // Got it
  onSwipeLeft: () => void;   // Need review
  onFlip?: () => void;
  showHint?: boolean;
}

const SwipeableFlashcard: React.FC<SwipeableFlashcardProps> = ({
  card,
  onSwipeRight,
  onSwipeLeft,
  onFlip,
  showHint = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Color overlays for swipe feedback
  const leftOverlayOpacity = useTransform(x, [-150, -50, 0], [0.8, 0.3, 0]);
  const rightOverlayOpacity = useTransform(x, [0, 50, 150], [0, 0.3, 0.8]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitDirection('right');
      setTimeout(onSwipeRight, 200);
    } else if (info.offset.x < -threshold) {
      setExitDirection('left');
      setTimeout(onSwipeLeft, 200);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'advanced': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <AnimatePresence>
        {!exitDirection && (
          <motion.div
            key={card.id}
            className="relative cursor-grab active:cursor-grabbing touch-none"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              x: exitDirection === 'right' ? 300 : -300,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFlip}
          >
            {/* Swipe feedback overlays */}
            <motion.div 
              className="absolute inset-0 bg-green-500 rounded-2xl z-10 pointer-events-none"
              style={{ opacity: rightOverlayOpacity }}
            >
              <div className="flex items-center justify-center h-full">
                <Check className="h-20 w-20 text-white" />
              </div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-red-500 rounded-2xl z-10 pointer-events-none"
              style={{ opacity: leftOverlayOpacity }}
            >
              <div className="flex items-center justify-center h-full">
                <X className="h-20 w-20 text-white" />
              </div>
            </motion.div>

            {/* Card Container with 3D flip */}
            <div 
              className="relative w-full min-h-[400px] sm:min-h-[450px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Card className="h-full p-6 sm:p-8 bg-gradient-to-br from-card to-muted/30 border-2 shadow-xl rounded-2xl flex flex-col">
                  {/* Header with badges */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="outline" className="text-xs gap-1">
                      <span>{card.icon}</span>
                      {card.category}
                    </Badge>
                    <Badge className={getDifficultyColor(card.difficulty)}>
                      {card.difficulty}
                    </Badge>
                  </div>

                  {/* Term - Large and centered */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl sm:text-5xl mb-4">{card.icon}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                      {card.term}
                    </h2>
                  </div>

                  {/* Hint to flip */}
                  {showHint && (
                    <div className="mt-6 text-center">
                      <div className="inline-flex items-center gap-2 text-muted-foreground text-sm bg-muted/50 px-4 py-2 rounded-full">
                        <RotateCcw className="h-4 w-4" />
                        Tap to reveal answer
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Back of card */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Card className="h-full p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-card border-2 shadow-xl rounded-2xl flex flex-col overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{card.term}</h3>
                    <Badge variant="outline" className="text-xs">
                      {card.icon} {card.category}
                    </Badge>
                  </div>

                  {/* Definition */}
                  <div className="space-y-4 flex-1">
                    <div className="bg-background/80 rounded-xl p-4 border">
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <BookOpen className="h-4 w-4" />
                        Definition
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {card.definition}
                      </p>
                    </div>

                    {/* Phil's Example */}
                    {card.philExample && (
                      <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                        <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
                          <span className="text-lg">🐼</span>
                          Phil's Take
                        </div>
                        <p className="text-foreground/90 italic leading-relaxed">
                          "{card.philExample}"
                        </p>
                      </div>
                    )}

                    {/* Real World Example */}
                    {card.realWorldExample && (
                      <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                          <Sparkles className="h-4 w-4" />
                          Real World
                        </div>
                        <p className="text-foreground/90 leading-relaxed">
                          {card.realWorldExample}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tap to flip back hint */}
                  <div className="mt-4 text-center">
                    <span className="text-muted-foreground text-xs">Tap to flip back</span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 px-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-14 border-2 border-red-500/30 bg-red-500/5 hover:bg-red-500/20 hover:border-red-500/50 text-red-600 dark:text-red-400 font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            setExitDirection('left');
            setTimeout(onSwipeLeft, 200);
          }}
        >
          <X className="h-5 w-5 mr-2" />
          Review
        </Button>
        <Button
          size="lg"
          className="flex-1 h-14 bg-green-500 hover:bg-green-600 text-white font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            setExitDirection('right');
            setTimeout(onSwipeRight, 200);
          }}
        >
          <Check className="h-5 w-5 mr-2" />
          Got It!
        </Button>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        or swipe the card left/right
      </p>
    </div>
  );
};

export default SwipeableFlashcard;
