import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Target, Trophy, X } from "lucide-react";
import { UnifiedFlashcard } from "@/data/unified-flashcards";
import { SPEED_CHALLENGE_CONFIG, XP_REWARDS } from "@/types/flashcard-gamification";
import { usePlatformIntegration } from "@/hooks/usePlatformIntegration";
import { PLATFORM_REWARDS } from "@/config/gameConfig";

// Compatibility type alias
type CategorizedFlashcard = UnifiedFlashcard;

interface SpeedChallengeProps {
  cards: CategorizedFlashcard[];
  onComplete: (score: number, accuracy: number, xpEarned: number) => void;
  onCancel: () => void;
}

export const SpeedChallenge = ({ cards, onComplete, onCancel }: SpeedChallengeProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(SPEED_CHALLENGE_CONFIG.timePerCard);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [cardTimes, setCardTimes] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  // Platform integration for Bamboo Empire rewards
  const { awardResources } = usePlatformIntegration();

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleIncorrect();
          return SPEED_CHALLENGE_CONFIG.timePerCard;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentCardIndex, isComplete]);

  const handleCorrect = () => {
    const timeSpent = SPEED_CHALLENGE_CONFIG.timePerCard - timeLeft;
    setCardTimes([...cardTimes, timeSpent]);
    setCorrectAnswers(correctAnswers + 1);
    moveToNextCard();
  };

  const handleIncorrect = () => {
    const timeSpent = SPEED_CHALLENGE_CONFIG.timePerCard - timeLeft;
    setCardTimes([...cardTimes, timeSpent]);
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentCardIndex + 1 >= cards.length) {
      completeChallenge();
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
      setTimeLeft(SPEED_CHALLENGE_CONFIG.timePerCard);
    }
  };

  const completeChallenge = () => {
    setIsComplete(true);
    const accuracy = (correctAnswers / cards.length) * 100;
    const averageTime = cardTimes.reduce((a, b) => a + b, 0) / cardTimes.length;
    
    let xp = XP_REWARDS.speedChallengeWin;
    if (accuracy === 100) xp += XP_REWARDS.perfectAccuracy;
    if (averageTime < SPEED_CHALLENGE_CONFIG.speedBonusThreshold) xp *= 1.5;
    
    const score = Math.round((accuracy * 0.7 + (1 - averageTime / SPEED_CHALLENGE_CONFIG.timePerCard) * 30) * 10);
    
    // Award to Bamboo Empire
    awardResources(
      PLATFORM_REWARDS.speedChallengeComplete,
      PLATFORM_REWARDS.speedChallengeXp,
      'Speed Challenge',
      true
    );
    
    onComplete(score, accuracy, Math.round(xp));
  };

  if (isComplete) {
    const accuracy = (correctAnswers / cards.length) * 100;
    const avgTime = cardTimes.reduce((a, b) => a + b, 0) / cardTimes.length;

    return (
      <Card className="p-8 text-center animate-scale-in">
        <div className="mb-6">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
          <p className="text-muted-foreground">Great job lightning learner! ⚡</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {accuracy.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {avgTime.toFixed(1)}s
            </div>
            <div className="text-xs text-muted-foreground">Avg Time</div>
          </div>

          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
            <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {correctAnswers}/{cards.length}
            </div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
        </div>

        <Button onClick={() => onComplete(0, accuracy, 0)} className="w-full" size="lg">
          Finish Challenge
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onCancel}
        className="absolute top-2 right-2"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            Speed Challenge
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          Card {currentCardIndex + 1} of {cards.length}
        </p>
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
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
            <Button onClick={handleIncorrect} variant="outline" size="lg" className="flex-1">
              ❌ Incorrect
            </Button>
            <Button onClick={handleCorrect} size="lg" className="flex-1">
              ✅ Correct
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
        <span>Correct: {correctAnswers}</span>
        <span>Remaining: {cards.length - currentCardIndex - 1}</span>
      </div>
    </Card>
  );
};
