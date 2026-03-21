/**
 * AdaptiveFlashcards - Unified flashcard and games learning hub
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Zap,
  Calendar,
  Target,
  ChevronLeft,
  Flame,
  Gamepad2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

// Flashcard components
import UnifiedCategoryBrowser from './flashcards/UnifiedCategoryBrowser';
import { SpeedChallenge } from './flashcards/SpeedChallenge';
import { DailyChallenge } from './flashcards/DailyChallenge';
import { SmartReviewMode } from './flashcards/SmartReviewMode';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import SwipeableStudyDeck from './flashcards/SwipeableStudyDeck';

// Games components
import GamesHub from './games/GamesHub';
import QuizzesSection from './QuizzesSection';
import MatchingGameSection from './MatchingGameSection';
import PandaJumpSection from './PandaJumpSection';

// Hooks
import { useFlashcardGamification } from '@/hooks/useFlashcardGamification';
import { getAllUnifiedFlashcards, UnifiedFlashcard } from '@/data/unified-flashcards';

type CategorizedFlashcard = UnifiedFlashcard;
type StudyMode = 'browse' | 'speed' | 'daily' | 'smart' | 'deck';
type GameMode = 'hub' | 'quizzes' | 'matching' | 'panda-jump';
type MainSection = 'study' | 'games';

const AdaptiveFlashcards: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const { currentStreak, streakLevel, recordActivity } = useUnifiedStreak();
  
  const [mainSection, setMainSection] = useState<MainSection>('study');
  const [studyMode, setStudyMode] = useState<StudyMode>('browse');
  const [gameMode, setGameMode] = useState<GameMode>('hub');
  
  const [selectedCards, setSelectedCards] = useState<CategorizedFlashcard[]>([]);
  const [selectedDeckTitle, setSelectedDeckTitle] = useState<string>('');
  const [dailyChallengeComplete, setDailyChallengeComplete] = useState(false);
  
  // Game stats
  const [gameStats, setGameStats] = useState({
    quizHighScore: 0,
    quizStreak: 0,
    matchingBestTime: 0,
    pandaJumpAltitude: 0
  });

  const {
    startSession,
    getAllSM2Progress,
  } = useFlashcardGamification();

  useEffect(() => {
    const lastChallenge = localStorage.getItem('last_daily_challenge');
    const today = new Date().toISOString().split('T')[0];
    setDailyChallengeComplete(lastChallenge === today);
    
    // Load game stats
    const quizMastery = localStorage.getItem('quiz_topic_mastery');
    const quizStreak = localStorage.getItem('quiz_overall_streak');
    const matchingStats = localStorage.getItem('matching_game_stats');
    const pandaStats = localStorage.getItem('panda_jump_stats');
    
    setGameStats({
      quizHighScore: quizMastery ? 80 : 0,
      quizStreak: quizStreak ? parseInt(quizStreak, 10) : 0,
      matchingBestTime: matchingStats ? JSON.parse(matchingStats).bestTimes?.['beginner_60'] || 0 : 0,
      pandaJumpAltitude: pandaStats ? JSON.parse(pandaStats).maxAltitude || 0 : 0
    });
  }, [gameMode]);

  const handleSelectCards = (cards: CategorizedFlashcard[], title: string) => {
    setSelectedCards(cards);
    setSelectedDeckTitle(title);
    setStudyMode('deck');
    startSession([title], []);
  };

  const handleSpeedComplete = () => {
    setStudyMode('browse');
    recordActivity();
  };

  const handleDailyComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('last_daily_challenge', today);
    setDailyChallengeComplete(true);
    setStudyMode('browse');
    recordActivity();
  };

  const getDailyChallengeCards = (): CategorizedFlashcard[] => {
    const allCards = getAllUnifiedFlashcards();
    return [...allCards].sort(() => Math.random() - 0.5).slice(0, 10);
  };

  const handleBackToBrowse = () => {
    setStudyMode('browse');
    setSelectedCards([]);
    setSelectedDeckTitle('');
  };

  const renderStudyContent = () => {
    switch (studyMode) {
      case 'browse':
        return (
          <div className="space-y-6">
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
              <Card className="cursor-pointer hover:shadow-md transition-all border-2 border-primary/20" onClick={() => setStudyMode('browse')}>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">Browse & Study</h3>
                  <p className="text-xs text-muted-foreground">Explore flashcard categories</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20" onClick={() => { setSelectedCards(getAllUnifiedFlashcards().slice(0, 15)); setStudyMode('speed'); }}>
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">Speed Challenge</h3>
                  <p className="text-xs text-muted-foreground">Race against the clock</p>
                </CardContent>
              </Card>
              <Card className={`cursor-pointer hover:shadow-md transition-all border-2 ${dailyChallengeComplete ? 'border-green-300 bg-green-50 dark:bg-green-950/20' : 'border-transparent hover:border-primary/20'}`} onClick={() => setStudyMode('daily')}>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">Daily Challenge</h3>
                  <p className="text-xs text-muted-foreground">{dailyChallengeComplete ? '✓ Completed today!' : 'New challenge awaits'}</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20" onClick={() => setStudyMode('smart')}>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">Smart Review</h3>
                  <p className="text-xs text-muted-foreground">Spaced repetition</p>
                </CardContent>
              </Card>
            </div>
            <Card className={`p-4 ${streakLevel.bg} border-orange-200`}>
              <div className="flex items-center gap-3">
                <Flame className={`h-8 w-8 ${streakLevel.color}`} />
                <div>
                  <div className="text-xl font-bold">{currentStreak} Day Streak</div>
                  <div className={`text-sm ${streakLevel.color}`}>{streakLevel.level}</div>
                </div>
              </div>
            </Card>
            <UnifiedCategoryBrowser onSelectCards={handleSelectCards} />
          </div>
        );
      case 'speed':
        return <SpeedChallenge cards={selectedCards.length > 0 ? selectedCards : getAllUnifiedFlashcards().slice(0, 15)} onComplete={handleSpeedComplete} onCancel={handleBackToBrowse} />;
      case 'daily':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={handleBackToBrowse}><ChevronLeft className="h-4 w-4 mr-2" />Back</Button>
            <DailyChallenge cards={getDailyChallengeCards()} onComplete={handleDailyComplete} isCompleted={dailyChallengeComplete} />
          </div>
        );
      case 'smart':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={handleBackToBrowse}><ChevronLeft className="h-4 w-4 mr-2" />Back</Button>
            <SmartReviewMode allSM2Progress={getAllSM2Progress()} onStartReview={() => { setSelectedCards(getAllUnifiedFlashcards()); setStudyMode('deck'); }} />
          </div>
        );
      case 'deck':
        return <SwipeableStudyDeck cards={selectedCards} title={selectedDeckTitle} onComplete={() => { recordActivity(); handleBackToBrowse(); }} onBack={handleBackToBrowse} />;
      default:
        return null;
    }
  };

  const renderGamesContent = () => {
    switch (gameMode) {
      case 'hub':
        return <GamesHub onSelectGame={(game) => setGameMode(game)} stats={gameStats} />;
      case 'quizzes':
        return <QuizzesSection onBack={() => setGameMode('hub')} />;
      case 'matching':
        return <MatchingGameSection onBack={() => setGameMode('hub')} />;
      case 'panda-jump':
        return <PandaJumpSection onBack={() => setGameMode('hub')} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">🎯 Flashcards & Games</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Master financial concepts through study and play</p>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-sm"><Flame className="h-3 w-3 mr-1 text-orange-500" />{currentStreak} Day Streak</Badge>
          <Badge variant="outline" className="text-sm">XP & Bamboo Rewards</Badge>
        </div>
      </div>

      <Tabs value={mainSection} onValueChange={(v) => { setMainSection(v as MainSection); setStudyMode('browse'); setGameMode('hub'); }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="study" className="gap-2"><BookOpen className="h-4 w-4" />Study</TabsTrigger>
          <TabsTrigger value="games" className="gap-2"><Gamepad2 className="h-4 w-4" />Games</TabsTrigger>
        </TabsList>
        <TabsContent value="study">{renderStudyContent()}</TabsContent>
        <TabsContent value="games">{renderGamesContent()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default AdaptiveFlashcards;
