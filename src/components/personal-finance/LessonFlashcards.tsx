import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalFinanceFlashcard } from '@/types/personal-finance';
import { cn } from '@/lib/utils';

interface LessonFlashcardsProps {
  flashcards: PersonalFinanceFlashcard[];
  onComplete: () => void;
}

const LessonFlashcards: React.FC<LessonFlashcardsProps> = ({ flashcards, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set([0]));

  const currentCard = flashcards[currentIndex];
  const allViewed = viewedCards.size === flashcards.length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setViewedCards(prev => new Set([...prev, currentIndex + 1]));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-xl">🎴</span>
          Flashcards
        </h2>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      {/* Card dots indicator */}
      <div className="flex items-center justify-center gap-2">
        {flashcards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsFlipped(false);
              setViewedCards(prev => new Set([...prev, index]));
            }}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === currentIndex && "w-6 bg-primary",
              index !== currentIndex && viewedCards.has(index) && "bg-primary/50",
              index !== currentIndex && !viewedCards.has(index) && "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Flashcard */}
      <div className="perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleFlip}
            className={cn(
              "relative min-h-[300px] rounded-xl border-2 cursor-pointer transition-all",
              !isFlipped && "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30",
              isFlipped && "bg-card border-border"
            )}
          >
            {!isFlipped ? (
              /* Front - Term */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-4xl mb-4">📚</span>
                <h3 className="text-2xl font-bold mb-4">{currentCard.term}</h3>
                <p className="text-sm text-muted-foreground">Tap to reveal definition</p>
              </div>
            ) : (
              /* Back - Definition + Analogy */
              <div className="absolute inset-0 flex flex-col p-6 overflow-y-auto">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Definition</h4>
                  <p className="text-base leading-relaxed">{currentCard.definition}</p>
                </div>

                <div className="mt-auto pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🐼</span>
                    <div>
                      <h4 className="text-sm font-medium text-primary mb-1">Phil's Analogy</h4>
                      <p className="text-sm text-muted-foreground italic">
                        "{currentCard.philsAnalogy}"
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Tap to flip back
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentIndex < flashcards.length - 1 ? (
          <Button onClick={handleNext} className="flex-1">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={onComplete} 
            disabled={!allViewed}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            {allViewed ? 'Complete' : `View all ${flashcards.length} cards`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Flip hint */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <RotateCcw className="w-3 h-3" />
        Click the card to flip
      </div>
    </motion.div>
  );
};

export default LessonFlashcards;
