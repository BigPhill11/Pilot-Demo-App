import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

interface PrivateEquityFlashcardProps {
  flashcards: Flashcard[];
  onComplete: (points: number) => void;
  isCompleted: boolean;
}

const PrivateEquityFlashcard: React.FC<PrivateEquityFlashcardProps> = ({
  flashcards,
  onComplete,
  isCompleted
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  const currentCard = flashcards[currentIndex];
  const progress = (masteredCards.length / flashcards.length) * 100;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleMastered = () => {
    if (!masteredCards.includes(currentIndex)) {
      const newMastered = [...masteredCards, currentIndex];
      setMasteredCards(newMastered);
      
      if (newMastered.length === flashcards.length) {
        onComplete(25);
      }
    }
    handleNext();
  };

  const resetProgress = () => {
    setMasteredCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Flashcards</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {masteredCards.length}/{flashcards.length} mastered
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            disabled={isCompleted}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Card className="min-h-[300px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <CardContent className="p-8 flex flex-col justify-center items-center text-center min-h-[300px]">
          <div className="flex-1 flex flex-col justify-center">
            {!isFlipped ? (
              <div>
                <h4 className="text-xl font-bold mb-4 text-purple-600">
                  {currentCard?.term}
                </h4>
                <p className="text-muted-foreground">Click to reveal definition</p>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  {currentCard?.term}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {currentCard?.definition}
                </p>
              </div>
            )}
          </div>
          
          {masteredCards.includes(currentIndex) && (
            <Badge className="mt-4 bg-green-500">
              <Trophy className="h-3 w-3 mr-1" />
              Mastered
            </Badge>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isCompleted}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={isCompleted}
          >
            Skip
          </Button>
          <Button
            onClick={handleMastered}
            disabled={masteredCards.includes(currentIndex) || isCompleted}
            className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
          >
            {masteredCards.includes(currentIndex) ? 'Mastered' : 'Mark as Mastered'}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={isCompleted}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {isCompleted && (
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <Trophy className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-purple-800 font-medium">Flashcards Completed! +25 points</p>
        </div>
      )}
    </div>
  );
};

export default PrivateEquityFlashcard;