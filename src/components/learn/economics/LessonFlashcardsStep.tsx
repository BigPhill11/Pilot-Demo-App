/**
 * LessonFlashcardsStep
 * 
 * Interactive flashcard study component for economics terms.
 * Features flip animation, progress tracking, and Phil's analogies.
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Star
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import type { EconomicsFlashcard } from '@/types/economics-curriculum';

interface LessonFlashcardsStepProps {
  flashcards: EconomicsFlashcard[];
  onContinue: () => void;
  onBack: () => void;
}

const LessonFlashcardsStep: React.FC<LessonFlashcardsStepProps> = ({
  flashcards,
  onContinue,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentIndex];
  const progress = (studiedCards.size / flashcards.length) * 100;
  const allStudied = studiedCards.size === flashcards.length;
  const isMastered = masteredCards.has(currentIndex);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set([...prev, currentIndex]));
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleCardSelect = (index: number) => {
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  const handleToggleMastered = () => {
    setMasteredCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
              <BookOpen className="h-3 w-3 mr-1" />
              Flashcards
            </Badge>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">
                Studied: {studiedCards.size}/{flashcards.length}
              </span>
              <span className="text-emerald-600 font-medium">
                Mastered: {masteredCards.size}/{flashcards.length}
              </span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-emerald-800 mb-3">
            Key Terms to Know
          </h2>
          
          <Progress value={progress} className="h-2 bg-amber-100" />
        </div>

        <div 
          className="relative h-72 mb-6 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <div 
            className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            <Card className={`absolute inset-0 backface-hidden border-2 ${
              isMastered ? 'border-emerald-400 bg-emerald-50' : 'border-amber-200 bg-white'
            }`}>
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs border-amber-300 text-amber-600">
                    TERM
                  </Badge>
                  {isMastered && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentCard.term}
                </h3>
                <p className="text-sm text-gray-500">
                  Tap to see definition
                </p>
              </CardContent>
            </Card>

            <Card className={`absolute inset-0 backface-hidden rotate-y-180 border-2 ${
              isMastered ? 'border-emerald-400 bg-emerald-50' : 'border-teal-200 bg-teal-50'
            }`}>
              <CardContent className="flex flex-col h-full p-6 overflow-y-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs border-teal-300 text-teal-600">
                    DEFINITION
                  </Badge>
                  {isMastered && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 flex-1">
                  {currentCard.definition}
                </p>
                
                <div className="bg-white/70 rounded-lg p-3 border border-teal-200">
                  <div className="flex items-center gap-2 mb-1">
                    <PandaLogo className="w-5 h-5" />
                    <span className="text-xs font-semibold text-emerald-700">Phil's Analogy</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "{currentCard.philsAnalogy}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            disabled={currentIndex === 0}
            className="border-emerald-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            disabled={!isFlipped}
            className="border-emerald-300"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            variant={isMastered ? "default" : "outline"}
            size="sm"
            onClick={(e) => { e.stopPropagation(); handleToggleMastered(); }}
            className={isMastered ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-300"}
          >
            {isMastered ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mastered
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-1" />
                Mark Mastered
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            disabled={currentIndex === flashcards.length - 1}
            className="border-emerald-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {flashcards.map((_, index) => (
            <Button
              key={index}
              variant={currentIndex === index ? "default" : "outline"}
              size="sm"
              onClick={() => handleCardSelect(index)}
              className={`w-10 h-10 p-0 relative ${
                currentIndex === index 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : masteredCards.has(index)
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                  : studiedCards.has(index)
                  ? 'bg-amber-100 border-amber-300 text-amber-700'
                  : ''
              }`}
            >
              {index + 1}
              {masteredCards.has(index) && currentIndex !== index && (
                <Star className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500 fill-current" />
              )}
            </Button>
          ))}
        </div>

        {allStudied && (
          <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200 mb-6">
            <p className="text-emerald-800 font-medium">
              Great job! You've reviewed all the flashcards. Ready for the quiz?
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-emerald-300 text-emerald-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <Button
            onClick={onContinue}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!allStudied}
          >
            {allStudied ? 'Continue to Quiz' : 'Study All Cards First'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonFlashcardsStep;
