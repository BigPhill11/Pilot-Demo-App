import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Zap, 
  Calendar, 
  BookOpen, 
  Trophy,
  Target,
  Play,
  Brain,
  HelpCircle,
  ChevronLeft
} from "lucide-react";
// StreakTracker removed - now using unified streak system via useUnifiedStreak
import { useUnifiedStreak } from "@/hooks/useUnifiedStreak";
import { SpeedChallenge } from "./SpeedChallenge";
import { DailyChallenge } from "./DailyChallenge";
import { StudySessionTracker } from "./StudySessionTracker";
import { MasteryBadge } from "./MasteryBadge";
import { ConfidenceSlider } from "./ConfidenceSlider";
import { ReviewDashboard } from "./ReviewDashboard";
import { ReviewScheduleCard } from "./ReviewScheduleCard";
import { SmartReviewMode } from "./SmartReviewMode";
import UnifiedCategoryBrowser from "./UnifiedCategoryBrowser";
import { FlashcardTutorial } from "./FlashcardTutorial";
import { useFlashcardGamification } from "@/hooks/useFlashcardGamification";
import { 
  getAllUnifiedFlashcards, 
  getFlashcardsByDifficulty,
  UnifiedFlashcard 
} from "@/data/unified-flashcards";
import { useToast } from "@/hooks/use-toast";

// Compatibility type alias
type CategorizedFlashcard = UnifiedFlashcard;

export const GamifiedFlashcardHub = () => {
  const { toast } = useToast();
  const { currentStreak, streakLevel, recordActivity } = useUnifiedStreak();
  const [mode, setMode] = useState<'normal' | 'speed' | 'daily' | 'review' | 'browse'>('browse');
  const [currentCard, setCurrentCard] = useState<CategorizedFlashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfidence, setShowConfidence] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);
  const [dailyChallengeComplete, setDailyChallengeComplete] = useState(false);
  const [selectedCards, setSelectedCards] = useState<CategorizedFlashcard[]>([]);
  const [selectedDeckTitle, setSelectedDeckTitle] = useState<string>("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<Array<{ mode: typeof mode; title: string }>>([]);
  
  const {
    streakData,
    masteryData,
    sm2Progress,
    currentSession,
    recordCardReview,
    startSession,
    endSession,
    useStreakFreeze,
    getMasteryForCard,
    getSM2Progress,
    getAllSM2Progress,
    getDueCardsForReview,
    getCardsByPriority,
    updateStreak
  } = useFlashcardGamification();

  useEffect(() => {
    // Start a normal study session
    if (!currentSession && mode === 'normal') {
      startSession(['personal-finance'], []);
    }
  }, []);

  useEffect(() => {
    // Check if today's challenge was completed
    const lastChallenge = localStorage.getItem('last_daily_challenge');
    const today = new Date().toISOString().split('T')[0];
    setDailyChallengeComplete(lastChallenge === today);
  }, []);

  const loadNextCard = () => {
    const cardsToUse = selectedCards.length > 0 ? selectedCards : getAllUnifiedFlashcards();
    
    // In review mode, prioritize due cards
    if (mode === 'review') {
      const dueCardIds = getDueCardsForReview();
      const prioritizedIds = getCardsByPriority(dueCardIds);
      
      if (prioritizedIds.length > 0) {
        const dueCard = cardsToUse.find(c => c.id === prioritizedIds[0]);
        if (dueCard) {
          setCurrentCard(dueCard);
          setShowAnswer(false);
          setShowConfidence(false);
          setLastAnswer(null);
          return;
        }
      }
    }
    
    // Fallback to random card from selected deck or all cards
    const randomCard = cardsToUse[Math.floor(Math.random() * cardsToUse.length)];
    setCurrentCard(randomCard);
    setShowAnswer(false);
    setShowConfidence(false);
    setLastAnswer(null);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswer(isCorrect);
    setShowConfidence(true);
  };

  const handleConfidenceSubmit = (confidence: number) => {
    if (!currentCard || lastAnswer === null) return;

    const result = recordCardReview(currentCard.id, lastAnswer, confidence);
    
    // Update unified streak on card review
    recordActivity();

    const sm2Data = getSM2Progress(currentCard.id);
    const nextReviewText = sm2Data 
      ? `Next review in ${result.nextReviewDays} day${result.nextReviewDays !== 1 ? 's' : ''}`
      : '';
    
    toast({
      title: lastAnswer ? "Correct! 🎉" : "Keep Learning! 💪",
      description: `+${result.xpEarned} XP${result.tierUpgrade ? ' • Tier upgraded!' : ''} • ${nextReviewText}`,
    });

    loadNextCard();
  };

  const handleSpeedChallengeComplete = (score: number, accuracy: number, xpEarned: number) => {
    toast({
      title: "Speed Challenge Complete!",
      description: `Score: ${score} • Accuracy: ${accuracy}% • +${xpEarned} XP`,
    });
    setMode('normal');
    loadNextCard();
  };

  const handleDailyChallengeComplete = (score: number, xpEarned: number) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('last_daily_challenge', today);
    setDailyChallengeComplete(true);
    
    toast({
      title: "Daily Challenge Complete! 🎊",
      description: `Score: ${score}% • +${xpEarned} XP`,
    });
    setMode('normal');
    loadNextCard();
  };

  const getDailyChallengeCards = (): CategorizedFlashcard[] => {
    const allCards = getAllUnifiedFlashcards();
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };

  const getSpeedChallengeCards = (): CategorizedFlashcard[] => {
    const allCards = getAllUnifiedFlashcards();
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  };

  const handleCardSelection = (cards: CategorizedFlashcard[], title: string) => {
    setNavigationHistory([...navigationHistory, { mode: 'browse', title: 'Categories' }]);
    setSelectedCards(cards);
    setSelectedDeckTitle(title);
    setMode('normal');
    // Load first card from selected deck
    if (cards.length > 0) {
      setCurrentCard(cards[Math.floor(Math.random() * cards.length)]);
      setShowAnswer(false);
      setShowConfidence(false);
      setLastAnswer(null);
    }
  };

  const handleModeChange = (newMode: typeof mode, title: string) => {
    setNavigationHistory([...navigationHistory, { mode, title: getModeTitle() }]);
    setMode(newMode);
    if (newMode !== 'browse') {
      loadNextCard();
    }
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const previous = navigationHistory[navigationHistory.length - 1];
      setMode(previous.mode);
      setNavigationHistory(navigationHistory.slice(0, -1));
      if (previous.mode === 'browse') {
        setSelectedCards([]);
        setSelectedDeckTitle('');
        setCurrentCard(null);
      }
    } else {
      // Default back to browse
      setMode('browse');
      setSelectedCards([]);
      setSelectedDeckTitle('');
      setCurrentCard(null);
    }
  };

  const getModeTitle = (): string => {
    if (mode === 'browse') return 'Categories';
    if (mode === 'normal' && selectedDeckTitle) return selectedDeckTitle;
    if (mode === 'speed') return 'Speed Challenge';
    if (mode === 'daily') return 'Daily Challenge';
    if (mode === 'review') return 'Smart Review';
    return 'Study';
  };

  if (!currentCard && mode === 'normal') {
    loadNextCard();
    return <div>Loading...</div>;
  }

  if (showTutorial) {
    return <FlashcardTutorial onClose={() => setShowTutorial(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Navigation & Tutorial Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {mode !== 'browse' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Flashcards</span>
              {mode !== 'browse' && (
                <>
                  <span>/</span>
                  <span className="font-medium text-foreground">{getModeTitle()}</span>
                </>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTutorial(true)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Tutorial
          </Button>
        </div>
      </Card>

      {/* Category Browser Mode */}
      {mode === 'browse' && (
        <UnifiedCategoryBrowser onSelectCards={handleCardSelection} />
      )}

      {mode !== 'browse' && (
        <>
          {/* Deck Info for Normal Mode */}
          {selectedDeckTitle && mode === 'normal' && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold">{selectedDeckTitle}</span>
                <Badge variant="secondary">{selectedCards.length} cards</Badge>
              </div>
            </Card>
          )}

          {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unified Streak Display */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center gap-3">
            <Flame className={`h-10 w-10 ${streakLevel.color}`} />
            <div>
              <div className="text-2xl font-bold">{currentStreak} Day Streak</div>
              <div className={`text-sm ${streakLevel.color}`}>{streakLevel.level}</div>
            </div>
          </div>
        </Card>
        <StudySessionTracker 
          session={currentSession}
          isActive={mode === 'normal'}
        />
      </div>

      {/* Review Stats Dashboard */}
      {mode === 'review' && (
        <SmartReviewMode
          allSM2Progress={getAllSM2Progress()}
          onStartReview={() => loadNextCard()}
          onCardClick={(card) => {
            setCurrentCard(card);
            setShowAnswer(false);
            setShowConfidence(false);
            setLastAnswer(null);
          }}
        />
      )}

      {mode !== 'review' && (
        <>
          {/* Mode Selection */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Study Modes</h2>
        <div className="grid grid-cols-4 gap-4">
          <Button
            variant={mode === 'normal' ? 'default' : 'outline'}
            className="h-auto flex-col gap-2 p-4"
            onClick={() => handleModeChange('normal', 'Regular Study')}
          >
            <BookOpen className="h-6 w-6" />
            <span>Regular Study</span>
          </Button>

          <Button
            variant={mode === 'speed' ? 'default' : 'outline'}
            className="h-auto flex-col gap-2 p-4"
            onClick={() => handleModeChange('speed', 'Speed Challenge')}
          >
            <Zap className="h-6 w-6" />
            <span>Speed Challenge</span>
            <Badge variant="secondary" className="text-xs">+25 XP</Badge>
          </Button>

          <Button
            variant={mode === 'daily' ? 'default' : 'outline'}
            className="h-auto flex-col gap-2 p-4"
            onClick={() => handleModeChange('daily', 'Daily Challenge')}
            disabled={dailyChallengeComplete}
          >
            <Calendar className="h-6 w-6" />
            <span>Daily Challenge</span>
            {dailyChallengeComplete ? (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                Complete ✓
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">+30 XP</Badge>
            )}
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-2 p-4"
            onClick={() => handleModeChange('review', 'Smart Review')}
          >
            <Brain className="h-6 w-6" />
            <span>Smart Review</span>
            <Badge variant="secondary" className="text-xs">
              {getDueCardsForReview().length} due
            </Badge>
          </Button>
        </div>
      </Card>

      {/* Main Study Area */}
      {mode === 'speed' && (
        <SpeedChallenge
          cards={getSpeedChallengeCards()}
          onComplete={handleSpeedChallengeComplete}
          onCancel={() => {
            setMode('normal');
            loadNextCard();
          }}
        />
      )}

      {mode === 'daily' && (
        <DailyChallenge
          cards={getDailyChallengeCards()}
          onComplete={handleDailyChallengeComplete}
          isCompleted={dailyChallengeComplete}
        />
      )}

      {(mode === 'normal') && currentCard && (
        <div className="space-y-4">
          {/* Flashcard */}
          <Card className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-2">
                <Badge>{currentCard.difficulty}</Badge>
                {getMasteryForCard(currentCard.id) && (
                  <MasteryBadge
                    tier={getMasteryForCard(currentCard.id)!.tier}
                    correctCount={getMasteryForCard(currentCard.id)!.correctCount}
                    showProgress
                  />
                )}
              </div>
              {mode === 'normal' && getSM2Progress(currentCard.id) && (
                <div className="text-right text-sm">
                  <div className="text-muted-foreground">Interval</div>
                  <div className="font-bold">{getSM2Progress(currentCard.id)!.interval} days</div>
                </div>
              )}
            </div>

            <div className="min-h-[300px] flex flex-col justify-center">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-6">{currentCard.term}</h3>
                
                {showAnswer && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-xl mb-4">{currentCard.definition}</p>
                    
                    {currentCard.philExample && (
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-left">
                        <p className="font-semibold text-sm mb-1">Phil's Example:</p>
                        <p className="text-sm">{currentCard.philExample}</p>
                      </div>
                    )}
                    
                    {currentCard.realWorldExample && (
                      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 text-left">
                        <p className="font-semibold text-sm mb-1">Real World:</p>
                        <p className="text-sm">{currentCard.realWorldExample}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!showAnswer && (
                <Button onClick={() => setShowAnswer(true)} size="lg" className="w-full">
                  Show Answer
                </Button>
              )}

              {showAnswer && !showConfidence && (
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleAnswer(false)} 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                  >
                    ❌ Incorrect
                  </Button>
                  <Button 
                    onClick={() => handleAnswer(true)} 
                    size="lg" 
                    className="flex-1"
                  >
                    ✅ Correct
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Confidence Slider */}
          {showConfidence && (
            <div className="animate-scale-in">
              <ConfidenceSlider onSubmit={handleConfidenceSubmit} />
            </div>
          )}

          {/* Quick Stats */}
          <Card className="p-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span>
                  Accuracy: {currentSession ? 
                    ((currentSession.correctAnswers / currentSession.cardsReviewed) * 100).toFixed(0) 
                    : 0}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span>Cards Mastered: {Array.from(masteryData.values()).filter(m => m.tier === 'diamond').length}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
        </>
      )}
      </>
    )}
    </div>
  );
};
