import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Star, Trophy, Zap, Target, BookOpen } from 'lucide-react';
import { VCFlashcard as FlashcardType } from '@/data/venture-capital-journey-data';

interface VCFlashcardProps {
  flashcards: FlashcardType[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onComplete: () => void;
  levelId: number;
}

const VCFlashcard: React.FC<VCFlashcardProps> = ({ 
  flashcards, 
  currentIndex, 
  onIndexChange, 
  onComplete,
  levelId 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [masteredTerms, setMasteredTerms] = useState<Set<string>>(new Set());
  const [confidenceLevel, setConfidenceLevel] = useState<Record<string, number>>({});
  const [streakCount, setStreakCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`vc-mastered-terms-level-${levelId}`);
    const savedConfidence = localStorage.getItem(`vc-confidence-level-${levelId}`);
    const savedStreak = localStorage.getItem(`vc-streak-level-${levelId}`);
    
    if (saved) {
      setMasteredTerms(new Set(JSON.parse(saved)));
    }
    if (savedConfidence) {
      setConfidenceLevel(JSON.parse(savedConfidence));
    }
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak));
    }
  }, [levelId]);

  const saveMasteredTerms = (terms: Set<string>) => {
    localStorage.setItem(`vc-mastered-terms-level-${levelId}`, JSON.stringify(Array.from(terms)));
  };

  const saveConfidenceLevel = (confidence: Record<string, number>) => {
    localStorage.setItem(`vc-confidence-level-${levelId}`, JSON.stringify(confidence));
  };

  const saveStreak = (streak: number) => {
    localStorage.setItem(`vc-streak-level-${levelId}`, streak.toString());
  };

  const handleMarkAsMastered = (confidence: number = 5) => {
    const currentTerm = flashcards[currentIndex].term;
    const newMasteredTerms = new Set(masteredTerms);
    const newConfidence = { ...confidenceLevel };
    
    newMasteredTerms.add(currentTerm);
    newConfidence[currentTerm] = confidence;
    
    setMasteredTerms(newMasteredTerms);
    setConfidenceLevel(newConfidence);
    setStreakCount(prev => prev + 1);
    
    saveMasteredTerms(newMasteredTerms);
    saveConfidenceLevel(newConfidence);
    saveStreak(streakCount + 1);

    // Show celebration for high confidence or streaks
    if (confidence >= 4 || streakCount + 1 >= 3) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set(prev).add(currentIndex));
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % flashcards.length;
    onIndexChange(nextIndex);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? flashcards.length - 1 : currentIndex - 1;
    onIndexChange(prevIndex);
    setIsFlipped(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 4) return "text-green-600";
    if (confidence >= 3) return "text-yellow-600";
    return "text-orange-600";
  };

  const getConfidenceEmoji = (confidence: number) => {
    if (confidence >= 5) return "🚀";
    if (confidence >= 4) return "⭐";
    if (confidence >= 3) return "💪";
    if (confidence >= 2) return "👍";
    return "📖";
  };

  const currentCard = flashcards[currentIndex];
  const progressPercentage = (studiedCards.size / flashcards.length) * 100;
  const masteryPercentage = (masteredTerms.size / flashcards.length) * 100;
  const allStudied = studiedCards.size === flashcards.length;
  const allMastered = masteredTerms.size === flashcards.length;
  const isCurrentMastered = masteredTerms.has(currentCard.term);

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300 animate-pulse">
          <CardContent className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-bold text-yellow-800">
              {streakCount >= 3 ? `${streakCount} in a row! You're on fire! 🔥` : "Great job mastering that term! ⭐"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Studied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span>{studiedCards.size}/{flashcards.length}</span>
              <span className="font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-blue-100" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-yellow-600" />
              Mastered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span>{masteredTerms.size}/{flashcards.length}</span>
              <span className="font-bold">{Math.round(masteryPercentage)}%</span>
            </div>
            <Progress value={masteryPercentage} className="h-3">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300" 
                style={{ width: `${masteryPercentage}%` }}
              />
            </Progress>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-purple-600" />
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{streakCount}</div>
              <p className="text-sm text-purple-600">in a row</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Flashcard */}
      <div className="flex items-center justify-center">
        <Badge variant="outline" className="mb-4">
          {currentIndex + 1} of {flashcards.length}
        </Badge>
      </div>
      
      <Card 
        className={`min-h-[350px] cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
          isCurrentMastered 
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-lg' 
            : 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-xl'
        }`} 
        onClick={handleFlip}
      >
        <CardContent className="flex flex-col justify-center items-center text-center p-8 min-h-[350px]">
          <div className="w-full">
            {!isFlipped ? (
              <div className="space-y-6">
                <div className="flex justify-center items-center gap-3 mb-6">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    <Target className="h-4 w-4 mr-2" />
                    Term
                  </Badge>
                  {isCurrentMastered && (
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      <span className={`text-lg ${getConfidenceColor(confidenceLevel[currentCard.term] || 0)}`}>
                        {getConfidenceEmoji(confidenceLevel[currentCard.term] || 0)}
                      </span>
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {currentCard.term}
                </h2>
                <div className="mt-8 space-y-2">
                  <p className="text-muted-foreground">Click to reveal definition</p>
                  <div className="text-4xl animate-bounce">👆</div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Badge variant="default" className="text-lg px-4 py-2 bg-gradient-to-r from-green-500 to-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Definition
                </Badge>
                <p className="text-xl leading-relaxed font-medium">
                  {currentCard.definition}
                </p>
                {!isCurrentMastered && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 mb-3">How confident are you with this term?</p>
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Button
                          key={level}
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsMastered(level);
                          }}
                          className="text-xs"
                        >
                          {level} {getConfidenceEmoji(level)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button variant="outline" onClick={handleFlip} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {isFlipped ? "Show Term" : "Show Definition"}
          </Button>
        </div>

        <div className="flex gap-3">
          {isFlipped && !isCurrentMastered && (
            <Button 
              onClick={() => handleMarkAsMastered(4)} 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Master It!
            </Button>
          )}
          
          <Button onClick={handleNext} className="flex items-center gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Completion Status */}
      {allStudied && (
        <Card className={`${allMastered 
          ? "bg-gradient-to-r from-green-50 to-green-100 border-green-300" 
          : "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300"
        }`}>
          <CardContent className="text-center py-8">
            {allMastered ? (
              <>
                <div className="text-6xl mb-4">🏆</div>
                <Trophy className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-3">
                  All Terms Mastered! 🎉
                </h3>
                <p className="text-green-600 mb-6 text-lg">
                  Incredible work! You've achieved mastery of all flashcards in this level.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{masteredTerms.size}</div>
                    <div className="text-sm text-green-600">Terms Mastered</div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{streakCount}</div>
                    <div className="text-sm text-green-600">Best Streak</div>
                  </div>
                </div>
                <Button 
                  onClick={onComplete} 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-8 py-3"
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Complete Flashcards
                </Button>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📚</div>
                <CheckCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-800 mb-3">All Cards Studied!</h3>
                <p className="text-blue-600 mb-6 text-lg">
                  Great progress! You've studied all cards. Keep reviewing to master them all.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{studiedCards.size}</div>
                    <div className="text-sm text-blue-600">Cards Studied</div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{masteredTerms.size}</div>
                    <div className="text-sm text-blue-600">Terms Mastered</div>
                  </div>
                </div>
                <Button 
                  onClick={onComplete} 
                  variant="outline" 
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  Save Progress
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Navigation Grid */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {flashcards.map((card, index) => (
              <Button
                key={index}
                variant={currentIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onIndexChange(index);
                  setIsFlipped(false);
                }}
                className={`relative h-12 w-12 text-sm transition-all duration-200 ${
                  masteredTerms.has(card.term) 
                    ? 'bg-gradient-to-br from-green-400 to-green-500 text-white border-green-400 hover:from-green-500 hover:to-green-600' 
                    : studiedCards.has(index)
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white border-blue-400 hover:from-blue-500 hover:to-blue-600'
                    : ''
                }`}
              >
                {index + 1}
                {studiedCards.has(index) && !masteredTerms.has(card.term) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                )}
                {masteredTerms.has(card.term) && (
                  <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                )}
                {confidenceLevel[card.term] >= 5 && (
                  <div className="absolute -bottom-1 -right-1 text-xs">🚀</div>
                )}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full"></div>
              <span>Studied</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>Mastered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🚀</span>
              <span>Expert Level</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VCFlashcard;