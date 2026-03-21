import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Lightbulb, Globe, Trophy } from 'lucide-react';
import { getFlashcardsByDifficulty, UnifiedFlashcard } from '@/data/unified-flashcards';

// Map old level names to new difficulty names
const levelToDifficulty = (level: 'beginner' | 'intermediate' | 'pro'): 'beginner' | 'intermediate' | 'advanced' => {
  if (level === 'pro') return 'advanced';
  return level;
};

// Get flashcards by level (wrapper for compatibility)
const getFlashcardsByLevel = (level: 'beginner' | 'intermediate' | 'pro') => {
  const difficulty = levelToDifficulty(level);
  return getFlashcardsByDifficulty(difficulty).map(card => ({
    id: card.id,
    term: card.term,
    definition: card.definition,
    philExample: card.philExample,
    realWorldExample: card.realWorldExample,
    level: card.difficulty,
    category: card.category,
  }));
};

interface Flashcard {
  id?: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level?: string;
  masteryLevel?: 'mastered' | 'learning' | 'unsure' | 'new';
  timesShown?: number;
  lastShown?: string;
}

interface FlashcardDeckProps {
  level: 'beginner' | 'intermediate' | 'pro';
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ level }) => {
  const [allFlashcards, setAllFlashcards] = useState<Flashcard[]>([]);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    loadFlashcards();
  }, [level]);

  const loadFlashcards = () => {
    const storageKey = `flashcards_${level}`;
    const stored = localStorage.getItem(storageKey);
    let cards: Flashcard[] = [];
    
    if (stored) {
      // Merge stored progress with pre-loaded cards
      const storedCards: Flashcard[] = JSON.parse(stored);
      const preloadedCards = getFlashcardsByLevel(level);
      
      // Create a map of stored cards by ID
      const storedMap = new Map(storedCards.map(card => [card.id || card.term, card]));
      
      // Merge: use pre-loaded cards but keep user progress if it exists
      cards = preloadedCards.map(preloadedCard => {
        const stored = storedMap.get(preloadedCard.id || preloadedCard.term);
        if (stored) {
          return {
            ...preloadedCard,
            masteryLevel: stored.masteryLevel,
            timesShown: stored.timesShown,
            lastShown: stored.lastShown
          };
        }
        return preloadedCard;
      });
      
      // Add any custom cards that user uploaded
      storedCards.forEach(storedCard => {
        const isCustomCard = !preloadedCards.find(
          pc => (pc.id || pc.term) === (storedCard.id || storedCard.term)
        );
        if (isCustomCard) {
          cards.push(storedCard);
        }
      });
    } else {
      // Use pre-loaded cards for the first time
      cards = getFlashcardsByLevel(level);
    }

    // Initialize mastery levels for new cards
    cards = cards.map(card => ({
      ...card,
      masteryLevel: card.masteryLevel || 'new',
      timesShown: card.timesShown || 0,
      lastShown: card.lastShown || null
    }));

    setAllFlashcards(cards);
    updateStudyCards(cards);
  };

  const updateStudyCards = (cards: Flashcard[]) => {
    // Filter cards based on mastery level and show frequency
    const cardsToStudy = cards.filter(card => {
      if (card.masteryLevel === 'mastered') return false;
      if (card.masteryLevel === 'learning' && (card.timesShown || 0) >= 2) return false;
      return true;
    });

    setStudyCards(cardsToStudy);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowExamples(false);
  };

  const replayAllCards = () => {
    setStudyCards([...allFlashcards]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowExamples(false);
  };

  const saveFlashcards = (updatedCards: Flashcard[]) => {
    const storageKey = `flashcards_${level}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    setAllFlashcards(updatedCards);
    updateStudyCards(updatedCards);
  };

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleMasteryChoice = (masteryLevel: 'mastered' | 'learning' | 'unsure') => {
    if (studyCards.length === 0) return;

    const currentCard = studyCards[currentIndex];
    const updatedCards = allFlashcards.map(card => {
      if (card.id === currentCard.id || 
          (!card.id && card.term === currentCard.term && card.definition === currentCard.definition)) {
        return {
          ...card,
          masteryLevel,
          timesShown: (card.timesShown || 0) + 1,
          lastShown: new Date().toISOString()
        };
      }
      return card;
    });

    saveFlashcards(updatedCards);

    // Shuffle cards if user is still learning or unsure
    if (masteryLevel === 'learning' || masteryLevel === 'unsure') {
      const remainingCards = studyCards.filter((_, idx) => idx !== currentIndex);
      const shuffledRemaining = shuffleArray(remainingCards);
      setStudyCards(shuffledRemaining);
      setCurrentIndex(0);
      setIsFlipped(false);
      setShowExamples(false);
    } else {
      // Move to next card or end study session for mastered cards
      if (currentIndex < studyCards.length - 1) {
        nextCard();
      } else {
        // Study session complete
        setCurrentIndex(0);
        setIsFlipped(false);
        setShowExamples(false);
      }
    }
  };

  const shuffleCards = () => {
    const shuffledCards = [...studyCards].sort(() => Math.random() - 0.5);
    setStudyCards(shuffledCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowExamples(false);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % studyCards.length);
    setIsFlipped(false);
    setShowExamples(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + studyCards.length) % studyCards.length);
    setIsFlipped(false);
    setShowExamples(false);
  };

  const resetCard = () => {
    setIsFlipped(false);
    setShowExamples(false);
  };

  // Calculate progress
  const totalCards = allFlashcards.length;
  const masteredCards = allFlashcards.filter(card => card.masteryLevel === 'mastered').length;
  const progressPercentage = totalCards > 0 ? (masteredCards / totalCards) * 100 : 0;

  if (studyCards.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline">Study Complete!</Badge>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{masteredCards}/{totalCards} Mastered</span>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Great job!</h3>
            <p className="text-muted-foreground mb-4">
              You've completed all available flashcards for {level} level.
            </p>
            <Progress value={progressPercentage} className="mb-4" />
            <p className="text-sm text-muted-foreground mb-6">
              {masteredCards} out of {totalCards} cards mastered ({Math.round(progressPercentage)}%)
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => updateStudyCards(allFlashcards)} 
                variant="outline"
              >
                Review Unmastered Cards
              </Button>
              <Button 
                onClick={replayAllCards}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Replay All Cards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCard = studyCards[currentIndex];

  return (
    <div className="space-y-4">
      {/* Progress and Controls */}
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          {currentIndex + 1} of {studyCards.length}
        </Badge>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{masteredCards}/{totalCards}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={shuffleCards}>
              <Shuffle className="h-4 w-4 mr-1" />
              Shuffle
            </Button>
            <Button size="sm" variant="outline" onClick={resetCard}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} />
      </div>

      {/* Flashcard with flip animation */}
      <div className="perspective-1000">
        <div 
          className={`relative w-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          } ${showExamples ? 'min-h-[600px]' : 'min-h-[400px]'}`}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Front of card - Term */}
          <Card className={`absolute inset-0 backface-hidden border-2 hover:border-primary/40 transition-colors ${
            showExamples ? 'min-h-[600px]' : 'min-h-[400px]'
          }`}>
            <CardContent className={`p-8 flex items-center justify-center ${
              showExamples ? 'min-h-[600px]' : 'min-h-[400px]'
            }`}>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4 text-primary">{currentCard.term}</h3>
                <p className="text-muted-foreground">Click to reveal definition</p>
              </div>
            </CardContent>
          </Card>

          {/* Back of card - Definition and Examples */}
          <Card className={`absolute inset-0 backface-hidden rotate-y-180 bg-blue-50 border-2 border-blue-200 ${
            showExamples ? 'min-h-[600px]' : 'min-h-[400px]'
          }`}>
            <CardContent className={`p-8 flex flex-col ${
              showExamples ? 'min-h-[600px]' : 'min-h-[400px]'
            }`}>
              <div className="flex-1">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-blue-800">{currentCard.term}</h4>
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-lg">{currentCard.definition}</p>
                  </div>
                </div>
                
                {(currentCard.philExample || currentCard.realWorldExample) && (
                  <div className="text-center mb-4">
                    <Button 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowExamples(!showExamples);
                      }}
                      size="sm"
                    >
                      {showExamples ? 'Hide Examples' : 'Show Examples'}
                    </Button>
                  </div>
                )}
                
                {showExamples && (
                  <div className="grid gap-4 mb-6">
                    {currentCard.philExample && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                          <span className="font-semibold text-yellow-800">Phil's Example</span>
                        </div>
                        <p className="text-sm text-yellow-700 italic">{currentCard.philExample}</p>
                      </div>
                    )}
                    
                    {currentCard.realWorldExample && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-800">Real World Example</span>
                        </div>
                        <p className="text-sm text-green-700">{currentCard.realWorldExample}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mastery Options */}
              <div className="mt-auto space-y-3">
                <p className="text-center text-sm font-medium text-gray-600">How well do you know this?</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMasteryChoice('unsure');
                    }}
                    variant="outline"
                    className="text-xs bg-red-50 border-red-200 hover:bg-red-100"
                  >
                    😕 Unsure
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMasteryChoice('learning');
                    }}
                    variant="outline"
                    className="text-xs bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                  >
                    📚 Still Learning
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMasteryChoice('mastered');
                    }}
                    variant="outline"
                    className="text-xs bg-green-50 border-green-200 hover:bg-green-100"
                  >
                    ✅ Mastered It
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button onClick={prevCard} disabled={studyCards.length <= 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button 
          onClick={() => setIsFlipped(!isFlipped)}
          variant="outline"
        >
          {isFlipped ? 'Show Term' : 'Show Definition'}
        </Button>
        <Button onClick={nextCard} disabled={studyCards.length <= 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// Helper function for default cards
const getDefaultCards = (level: string): Flashcard[] => {
  const defaultCards: Record<string, Flashcard[]> = {
    beginner: [
      { 
        id: 'default-1',
        term: "Stock", 
        definition: "A share of ownership in a company",
        philExample: "Like owning a slice of pizza from the whole pizza! The more slices you have, the bigger your share of the pizza (company).",
        realWorldExample: "If you buy Apple stock, you own a tiny piece of Apple Inc. and can benefit from their success."
      },
      { 
        id: 'default-2',
        term: "Bond", 
        definition: "A loan to a company or government that pays interest",
        philExample: "It's like lending money to your friend, but they promise to pay you back with a little extra for being so nice!",
        realWorldExample: "US Treasury bonds are loans to the government that pay you interest over time."
      },
      { 
        id: 'default-3',
        term: "Dividend", 
        definition: "Payment made by companies to shareholders",
        philExample: "Like getting a thank-you gift from a company for believing in them and buying their stock!",
        realWorldExample: "Coca-Cola pays quarterly dividends to shareholders, sharing their profits."
      }
    ],
    intermediate: [
      { 
        id: 'default-4',
        term: "P/E Ratio", 
        definition: "Price-to-earnings ratio, a valuation metric",
        philExample: "It's like comparing how much you pay for a burger versus how satisfying it is - tells you if it's worth the price!",
        realWorldExample: "A P/E ratio of 15 means investors pay $15 for every $1 of annual earnings."
      },
      { 
        id: 'default-5',
        term: "Market Cap", 
        definition: "Total value of a company's shares",
        philExample: "If a company were a house, market cap would be its total asking price in the real estate market!",
        realWorldExample: "Apple's market cap of $3 trillion makes it one of the world's most valuable companies."
      },
      { 
        id: 'default-6',
        term: "Volatility", 
        definition: "Measure of price variation over time",
        philExample: "Like a roller coaster - some stocks are gentle kiddie rides, others are loop-de-loops!",
        realWorldExample: "Bitcoin is highly volatile, with prices that can swing 10%+ in a single day."
      }
    ],
    pro: [
      { 
        id: 'default-7',
        term: "Beta Coefficient", 
        definition: "Measure of stock's volatility relative to market",
        philExample: "It's like measuring how much a surfer moves compared to the ocean waves - some ride bigger waves than others!",
        realWorldExample: "A beta of 1.5 means the stock typically moves 50% more than the overall market."
      },
      { 
        id: 'default-8',
        term: "EBITDA", 
        definition: "Earnings before interest, taxes, depreciation, and amortization",
        philExample: "Like measuring how much money a lemonade stand makes before paying for the stand, permits, and wear-and-tear!",
        realWorldExample: "Tech companies often focus on EBITDA to show operational profitability excluding heavy depreciation."
      },
      { 
        id: 'default-9',
        term: "Free Cash Flow", 
        definition: "Cash generated after capital expenditures",
        philExample: "The money left in your piggy bank after buying everything you need to keep your business running!",
        realWorldExample: "Amazon's free cash flow shows how much cash they generate after investing in warehouses and technology."
      }
    ]
  };
  return defaultCards[level] || [];
};

export default FlashcardDeck;
