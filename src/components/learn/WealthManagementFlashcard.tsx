import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Star } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

interface WealthManagementFlashcardProps {
  flashcards: Flashcard[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onComplete: () => void;
  levelId: number;
}

const WealthManagementFlashcard: React.FC<WealthManagementFlashcardProps> = ({
  flashcards,
  currentIndex,
  onIndexChange,
  onComplete,
  levelId
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [masteredTerms, setMasteredTerms] = useState<Set<string>>(new Set());

  // Load mastered terms from localStorage on component mount
  useEffect(() => {
    const savedMastery = localStorage.getItem(`wealth-management-mastered-terms-level-${levelId}`);
    if (savedMastery) {
      try {
        const masteredArray = JSON.parse(savedMastery);
        setMasteredTerms(new Set(masteredArray));
      } catch (error) {
        console.error('Error loading mastered terms:', error);
      }
    }
  }, [levelId]);

  // Save mastered terms to localStorage
  const saveMasteredTerms = (newMasteredTerms: Set<string>) => {
    localStorage.setItem(`wealth-management-mastered-terms-level-${levelId}`, JSON.stringify(Array.from(newMasteredTerms)));
  };

  const currentCard = flashcards[currentIndex];
  const currentTermMastered = masteredTerms.has(currentCard.term);

  const handleMarkAsMastered = () => {
    const newMasteredTerms = new Set(masteredTerms);
    if (currentTermMastered) {
      newMasteredTerms.delete(currentCard.term);
    } else {
      newMasteredTerms.add(currentCard.term);
    }
    setMasteredTerms(newMasteredTerms);
    saveMasteredTerms(newMasteredTerms);
    
    // If all terms are mastered, complete the activity
    if (newMasteredTerms.size === flashcards.length) {
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      const newStudied = new Set(studiedCards);
      newStudied.add(currentIndex);
      setStudiedCards(newStudied);
      
      if (newStudied.size === flashcards.length) {
        setTimeout(() => onComplete(), 500);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      onIndexChange(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const allStudied = studiedCards.size === flashcards.length;
  const allMastered = masteredTerms.size === flashcards.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">Flashcards</h3>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Studied:</span>
            <Badge variant="outline">{studiedCards.size}/{flashcards.length}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Mastered:</span>
            <Badge className="bg-emerald-500">{masteredTerms.size}/{flashcards.length}</Badge>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md h-80">
          <Card 
            className={`absolute inset-0 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            } ${currentTermMastered ? 'bg-emerald-100 border-emerald-300' : 'bg-emerald-50 border-emerald-200'} hover:shadow-lg`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <CardContent className="flex items-center justify-center h-full p-6 backface-hidden">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="text-sm text-emerald-600 font-medium mr-2">TERM</div>
                  {currentTermMastered && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <h4 className="text-xl font-bold text-emerald-800">{currentCard.term}</h4>
                <p className="text-xs text-muted-foreground mt-4">Click to see definition</p>
              </div>
            </CardContent>

            {/* Back of card */}
            <CardContent className="flex items-center justify-center h-full p-6 absolute inset-0 backface-hidden rotate-y-180 bg-teal-50 border-teal-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="text-sm text-teal-600 font-medium mr-2">DEFINITION</div>
                  {currentTermMastered && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <p className="text-sm text-teal-800 leading-relaxed">{currentCard.definition}</p>
                <p className="text-xs text-muted-foreground mt-4">Click to see term</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFlipped(false)}
          disabled={!isFlipped}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant={currentTermMastered ? "default" : "outline"}
          size="sm"
          onClick={handleMarkAsMastered}
          className={currentTermMastered ? "bg-emerald-600 hover:bg-emerald-700" : ""}
        >
          {currentTermMastered ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Mastered
            </>
          ) : (
            <>
              <Star className="h-4 w-4 mr-1" />
              Mark as Mastered
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {allMastered && (
        <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-emerald-800 font-medium">
            🌟 Outstanding! You've mastered all the terms in this level.
          </p>
        </div>
      )}

      {allStudied && !allMastered && (
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-yellow-800 font-medium">
            📚 Great job studying! Now mark terms as "Mastered" when you feel confident about them.
          </p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {flashcards.map((card, index) => (
          <Button
            key={index}
            variant={currentIndex === index ? "default" : "outline"}
            size="sm"
            className={`h-8 relative ${
              masteredTerms.has(card.term)
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500' 
                : studiedCards.has(index) 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500' 
                : currentIndex === index 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : ''
            }`}
            onClick={() => {
              onIndexChange(index);
              setIsFlipped(false);
            }}
          >
            {index + 1}
            {masteredTerms.has(card.term) && (
              <Star className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 fill-current" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WealthManagementFlashcard;