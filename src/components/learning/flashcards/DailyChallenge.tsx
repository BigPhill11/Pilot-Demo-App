import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, Gift, Trophy } from "lucide-react";
import { UnifiedFlashcard } from "@/data/unified-flashcards";
import { XP_REWARDS } from "@/types/flashcard-gamification";
import { usePlatformIntegration } from "@/hooks/usePlatformIntegration";
import { PLATFORM_REWARDS } from "@/config/gameConfig";

// Compatibility type alias
type CategorizedFlashcard = UnifiedFlashcard;

interface DailyChallengeProps {
  cards: CategorizedFlashcard[];
  onComplete: (score: number, xpEarned: number) => void;
  isCompleted: boolean;
}

export const DailyChallenge = ({ cards, onComplete, isCompleted }: DailyChallengeProps) => {
  const [started, setStarted] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Platform integration for Bamboo Empire rewards
  const { awardResources } = usePlatformIntegration();

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrectAnswers(correctAnswers + 1);

    if (currentCardIndex + 1 >= cards.length) {
      const score = (correctAnswers / cards.length) * 100;
      const xp = score === 100 
        ? XP_REWARDS.dailyChallengeComplete + XP_REWARDS.perfectAccuracy 
        : XP_REWARDS.dailyChallengeComplete;
      
      // Award to Bamboo Empire
      awardResources(
        PLATFORM_REWARDS.dailyChallengeComplete,
        PLATFORM_REWARDS.dailyChallengeXp,
        'Daily Challenge',
        true
      );
      
      onComplete(score, xp);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  if (isCompleted && !started) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <Trophy className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Challenge Complete!</h3>
        <p className="text-muted-foreground mb-4">
          You've completed today's daily challenge. Come back tomorrow for a new one!
        </p>
        <Badge variant="secondary" className="gap-1">
          <Gift className="h-4 w-4" />
          Bonus XP Earned
        </Badge>
      </Card>
    );
  }

  if (!started) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="h-12 w-12 text-purple-500" />
          <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2">Daily Challenge</h3>
        <p className="text-muted-foreground mb-6">
          Test your knowledge with 5 random cards from different topics!
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="p-3 rounded-lg bg-background/50">
            <div className="font-bold text-lg">{cards.length}</div>
            <div className="text-muted-foreground">Cards</div>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <div className="font-bold text-lg">+{XP_REWARDS.dailyChallengeComplete}</div>
            <div className="text-muted-foreground">Bonus XP</div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Mixed difficulty levels</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Different categories</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Perfect score = double XP!</span>
          </div>
        </div>

        <Button onClick={() => setStarted(true)} size="lg" className="w-full">
          Start Challenge
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            Daily Challenge
          </Badge>
          <span className="text-sm text-muted-foreground">
            {currentCardIndex + 1} of {cards.length}
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        <Badge className="mb-3 w-fit">{currentCard.difficulty}</Badge>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-4">{currentCard.term}</h3>
          {showAnswer && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-lg">{currentCard.definition}</p>
              {currentCard.philExample && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-sm">
                  <span className="font-semibold">Phil's Example:</span> {currentCard.philExample}
                </div>
              )}
            </div>
          )}
        </div>

        {!showAnswer ? (
          <Button onClick={() => setShowAnswer(true)} size="lg" className="w-full">
            Show Answer
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={() => handleAnswer(false)} variant="outline" size="lg" className="flex-1">
              ❌ Incorrect
            </Button>
            <Button onClick={() => handleAnswer(true)} size="lg" className="flex-1">
              ✅ Correct
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Correct: {correctAnswers} | Remaining: {cards.length - currentCardIndex - 1}
      </div>
    </Card>
  );
};
