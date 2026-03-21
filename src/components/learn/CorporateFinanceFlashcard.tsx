import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ChevronLeft, ChevronRight, Star, Flame, Trophy } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

interface CorporateFinanceFlashcardProps {
  flashcards: Flashcard[];
}

const CorporateFinanceFlashcard: React.FC<CorporateFinanceFlashcardProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [confidence, setConfidence] = useState<Record<number, number>>({});
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentCard = flashcards[currentIndex];
  const currentConfidence = confidence[currentIndex] || 0;
  const allMastered = flashcards.every((_, index) => (confidence[index] || 0) >= 5);

  useEffect(() => {
    if (allMastered && Object.keys(confidence).length === flashcards.length) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [allMastered, confidence, flashcards.length]);

  const handleConfidenceUpdate = (level: number) => {
    const newConfidence = { ...confidence };
    newConfidence[currentIndex] = Math.min((newConfidence[currentIndex] || 0) + level, 5);
    setConfidence(newConfidence);

    if (level > 0) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const resetProgress = () => {
    setConfidence({});
    setStreak(0);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const getConfidenceColor = (level: number) => {
    if (level >= 5) return 'bg-green-500';
    if (level >= 3) return 'bg-yellow-500';
    if (level >= 1) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  const getConfidenceLabel = (level: number) => {
    if (level >= 5) return 'Mastered!';
    if (level >= 3) return 'Good';
    if (level >= 1) return 'Learning';
    return 'New';
  };

  return (
    <div className="space-y-6">
      {/* Progress and Stats */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            {currentIndex + 1} / {flashcards.length}
          </Badge>
          {streak > 0 && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1">
              <Flame className="h-3 w-3" />
              Streak: {streak}
            </Badge>
          )}
          {allMastered && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              All Mastered!
            </Badge>
          )}
        </div>
        <Button
          onClick={resetProgress}
          variant="outline"
          size="sm"
          className="text-orange-600 border-orange-300 hover:bg-orange-50"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Progress
        </Button>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-500 text-white px-8 py-4 rounded-lg text-xl font-bold animate-bounce shadow-2xl">
            🎉 All Cards Mastered! 🎉
          </div>
        </div>
      )}

      {/* Main Flashcard */}
      <div className="flex justify-center">
        <Card 
          className={`w-full max-w-2xl h-96 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
            isFlipped ? 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
          } dark:from-gray-800 dark:to-gray-900`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
            <div className="space-y-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {isFlipped ? 'Definition' : 'Term'}
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {isFlipped ? currentCard.definition : currentCard.term}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                Click to flip
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confidence Rating (only shown when flipped) */}
      {isFlipped && (
        <div className="flex justify-center">
          <Card className="bg-white/60 dark:bg-gray-800/60">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">How confident are you?</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-4 h-4 rounded-full ${
                        level <= currentConfidence ? getConfidenceColor(currentConfidence) : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  {getConfidenceLabel(currentConfidence)}
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => handleConfidenceUpdate(-1)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  disabled={currentConfidence <= 0}
                >
                  Need Review
                </Button>
                <Button
                  onClick={() => handleConfidenceUpdate(1)}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Got It!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={prevCard}
          variant="outline"
          className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={nextCard}
          variant="outline"
          className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-center cursor-pointer transition-all ${
              index === currentIndex
                ? 'bg-orange-200 dark:bg-orange-800 border-2 border-orange-400'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsFlipped(false);
            }}
          >
            <div className="text-xs font-medium truncate">{card.term}</div>
            <div className="flex justify-center mt-1">
              <div className={`w-3 h-3 rounded-full ${getConfidenceColor(confidence[index] || 0)}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporateFinanceFlashcard;