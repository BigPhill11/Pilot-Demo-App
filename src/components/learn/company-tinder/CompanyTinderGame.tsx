import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ChevronLeft, ChevronRight, Trophy, Target, Clock } from 'lucide-react';
import TinderCard from './TinderCard';
import SwipeActions from './SwipeActions';
import TinderTutorial from './TinderTutorial';
import MatchesCollection from './MatchesCollection';
import { useTinderSwipe } from './hooks/useTinderSwipe';
import { useDailyChallenges } from './hooks/useDailyChallenges';
import {
  getBaseSwipeRewards,
  readSuperLikesRemaining,
  consumeSuperLike,
  incrementTinderSwipeCountInStorage,
} from './tinderRewards';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { MacroScenario, getDailyMacroScenario, getSectorBias } from './macroScenarios';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';

export type TinderGameMode = 'classic' | 'macro-aware' | 'thesis-builder' | 'time-horizon' | 'challenge-run';

interface CompanyTinderGameProps {
  companies: CompanyProfile[];
  mode?: TinderGameMode;
  macroScenario?: MacroScenario;
}

const CompanyTinderGame: React.FC<CompanyTinderGameProps> = ({ 
  companies, 
  mode = 'classic',
  macroScenario 
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialComplete, setTutorialComplete] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  
  // Mode-specific state
  const [selectedThesis, setSelectedThesis] = useState<string[]>([]);
  const [selectedHorizon, setSelectedHorizon] = useState<'short' | 'long' | null>(null);
  const [challengeRunScore, setChallengeRunScore] = useState(0);
  const [challengeRunCount, setChallengeRunCount] = useState(0);
  const [showChallengeResults, setShowChallengeResults] = useState(false);
  
  // Get macro scenario (use provided or daily)
  const activeMacro = macroScenario || getDailyMacroScenario();
  
  // Platform integration for Bamboo Empire rewards
  const { awardResources } = usePlatformIntegration();
  
  // Thesis options for thesis-builder mode
  const thesisOptions = [
    { id: 'moat', label: 'Strong Moat', icon: '🏰' },
    { id: 'valuation', label: 'Good Valuation', icon: '💰' },
    { id: 'growth', label: 'High Growth', icon: '📈' },
    { id: 'risk', label: 'Low Risk', icon: '🛡️' },
    { id: 'cyclical', label: 'Cyclical Play', icon: '🔄' },
    { id: 'dividend', label: 'Dividend Payer', icon: '💵' },
  ];

  const {
    currentCompany,
    currentIndex,
    handleSwipe,
    resetDeck,
    goToPrevious,
    goToNext,
    isLastCard,
    allSwiped,
    swipedCompanies,
    matches,
    totalCompanies,
  } = useTinderSwipe(companies);

  const [superLikesRemaining, setSuperLikesRemaining] = useState(() =>
    readSuperLikesRemaining()
  );

  const { challenge, updateChallengeProgress } = useDailyChallenges();

  useEffect(() => {
    // Check if tutorial has been completed
    const completed = localStorage.getItem('tinderTutorialComplete');
    if (!completed) {
      setShowTutorial(true);
    } else {
      setTutorialComplete(true);
    }

    // Listen for touch swipe events
    const handleSwipeEvent = (e: CustomEvent) => {
      const action = e.detail as 'like' | 'pass';
      onSwipe(action);
    };

    window.addEventListener('tinderSwipe' as any, handleSwipeEvent);
    return () => window.removeEventListener('tinderSwipe' as any, handleSwipeEvent);
  }, [currentCompany]);

  const handleTutorialComplete = () => {
    localStorage.setItem('tinderTutorialComplete', 'true');
    setShowTutorial(false);
    setTutorialComplete(true);

    awardResources(25, 15, 'Tinder tutorial', false);
    toast.success('Tutorial complete!', {
      description: '+25 bamboo and +15 XP added to your Bamboo Empire.',
    });
  };

  const onSwipe = async (action: Parameters<typeof handleSwipe>[0]) => {
    if (action === 'super_like' && superLikesRemaining <= 0) {
      return;
    }

    await handleSwipe(action);

    if (action === 'super_like') {
      consumeSuperLike();
      setSuperLikesRemaining(readSuperLikesRemaining());
    }

    const base = getBaseSwipeRewards(action);

    // Mode-specific scoring bonus (extra bamboo + XP via existing ratio)
    let modeBonus = 0;
    let macroCorrect = false;
    
    if (mode === 'macro-aware' && currentCompany) {
      // Check if the swipe aligns with macro backdrop
      const sector = currentCompany.sector || 'technology';
      const bias = getSectorBias(activeMacro.id, sector);
      
      if ((action === 'like' && bias === 'positive') || 
          (action === 'pass' && bias === 'negative')) {
        modeBonus = 15;
        macroCorrect = true;
      } else if (action === 'like' && bias === 'negative') {
        modeBonus = -5; // Penalty for ignoring macro
      }
    }
    
    if (mode === 'thesis-builder' && selectedThesis.length >= 2) {
      // Bonus for having a thesis
      modeBonus = 10 + (selectedThesis.length * 3);
      setSelectedThesis([]); // Reset for next card
    }
    
    if (mode === 'time-horizon' && selectedHorizon) {
      // Bonus based on horizon alignment with macro
      const isLongTermFavorable = ['expansion', 'inflation-cooling'].includes(activeMacro.id);
      if ((selectedHorizon === 'long' && isLongTermFavorable) ||
          (selectedHorizon === 'short' && !isLongTermFavorable)) {
        modeBonus = 12;
      }
      setSelectedHorizon(null); // Reset for next card
    }
    
    let challengeRunNextCount: number | null = null;

    if (mode === 'challenge-run') {
      // Track challenge run progress (use synchronous next count/score so completion fires on swipe 10, not 11)
      const marketCapNum = typeof currentCompany?.marketCap === 'number' 
        ? currentCompany.marketCap 
        : parseFloat(String(currentCompany?.marketCap || '0').replace(/[^0-9.]/g, '')) * 1000000000;
      const isGoodDecision = Boolean(currentCompany && (
        (action === 'like' && marketCapNum > 10000000000) ||
        (action === 'pass' && marketCapNum < 1000000000)
      ));
      const nextCount = challengeRunCount + 1;
      const nextScore = challengeRunScore + (isGoodDecision ? 10 : 0);
      challengeRunNextCount = nextCount;
      setChallengeRunScore(nextScore);
      setChallengeRunCount(nextCount);

      if (nextCount >= 10) {
        const bonus = Math.floor(nextScore / 2);
        awardResources(bonus, Math.floor(bonus / 5), 'Challenge Run Complete', true);
        setShowChallengeResults(true);
      }
    }

    // Apply mode bonus/penalty (macro-aware can be negative)
    const bonusBamboo = modeBonus;
    const bonusXp = Math.floor(modeBonus / 5);
    const totalBamboo = Math.max(0, base.bamboo + bonusBamboo);
    const totalXp = Math.max(0, base.xp + bonusXp);

    if (action !== 'skip') {
      incrementTinderSwipeCountInStorage();
    }

    if (totalBamboo > 0 || totalXp > 0) {
      // Streak multiplies bamboo inside usePlatformIntegration
      awardResources(totalBamboo, totalXp, 'Company Tinder swipe', false);
    }

    // Update challenge progress
    if (currentCompany) {
      const challengeResult = await updateChallengeProgress(currentCompany, action);
      if (challengeResult?.completed && challengeResult.xpReward > 0) {
        const chXp = challengeResult.xpReward;
        const chBamboo = Math.floor(chXp / 2);
        awardResources(chBamboo, chXp, 'Tinder daily challenge', true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }

    const actionMessages = {
      pass: 'Passed',
      like: 'Liked!',
      super_like: 'Super liked!',
      skip: 'Skipped',
      never: 'Hidden',
    };

    const rewardParts: string[] = [];
    if (base.bamboo > 0) rewardParts.push(`+${base.bamboo} bamboo`);
    if (base.xp > 0) rewardParts.push(`+${base.xp} XP`);
    if (bonusBamboo !== 0) {
      rewardParts.push(`${bonusBamboo > 0 ? '+' : ''}${bonusBamboo} bonus bamboo`);
    }
    if (bonusXp !== 0) {
      rewardParts.push(`${bonusXp > 0 ? '+' : ''}${bonusXp} bonus XP`);
    }

    let feedbackDesc =
      rewardParts.length > 0
        ? rewardParts.join(' · ')
        : action === 'skip'
          ? 'No rewards — card stays in the deck.'
          : '—';

    if (mode === 'macro-aware' && macroCorrect) {
      feedbackDesc = [feedbackDesc, 'Macro-aligned pick!'].filter(Boolean).join(' ');
    } else if (mode === 'macro-aware' && modeBonus < 0) {
      feedbackDesc = [feedbackDesc, 'Macro penalty — pick aligned with the backdrop next time.'].filter(Boolean).join(' ');
    } else if (mode === 'thesis-builder' && modeBonus > 0) {
      feedbackDesc = [feedbackDesc, 'Thesis bonus applied.'].filter(Boolean).join(' ');
    } else if (mode === 'challenge-run' && challengeRunNextCount !== null) {
      feedbackDesc = `Run progress: ${challengeRunNextCount}/10 · ${feedbackDesc}`;
    }

    toast.success(actionMessages[action], {
      description: feedbackDesc,
    });

    if (action === 'super_like') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    setCardKey(prev => prev + 1);
  };

  if (showMatches) {
    return <MatchesCollection onBack={() => setShowMatches(false)} companies={companies} />;
  }

  // Challenge Run Results
  if (showChallengeResults) {
    const scorePercent = Math.round((challengeRunScore / 100) * 100);
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-6">
          <div className="text-6xl mb-4">{scorePercent >= 70 ? '🏆' : scorePercent >= 50 ? '🎯' : '📊'}</div>
          <h2 className="text-3xl font-bold">Challenge Complete!</h2>
          <div className="space-y-4">
            <div className="text-5xl font-bold text-primary">{challengeRunScore} pts</div>
            <p className="text-muted-foreground">
              {scorePercent >= 70 ? 'Excellent! You have great investing instincts.' :
               scorePercent >= 50 ? 'Good job! Keep learning to improve.' :
               'Keep practicing! Every decision teaches you something.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{Math.floor(challengeRunScore / 2)}</p>
              <p className="text-xs text-muted-foreground">Bamboo Earned</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{Math.floor(challengeRunScore / 10)}</p>
              <p className="text-xs text-muted-foreground">XP Earned</p>
            </div>
          </div>
          <Button onClick={() => {
            setShowChallengeResults(false);
            setChallengeRunScore(0);
            setChallengeRunCount(0);
            resetDeck();
          }}>
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (allSwiped) {
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold">All Done!</h2>
          <p className="text-lg text-muted-foreground">
            You've swiped through all {totalCompanies} companies
          </p>
          <p className="text-sm text-muted-foreground">
            Matches saved: <strong className="text-foreground">{matches.length}</strong>
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={resetDeck}>
              Start Over
            </Button>
            {matches.length > 0 && (
              <Button variant="outline" onClick={() => setShowMatches(true)}>
                <Heart className="mr-2 h-4 w-4" />
                View Matches ({matches.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tutorial */}
      <TinderTutorial 
        isOpen={showTutorial} 
        onComplete={handleTutorialComplete}
      />

      {/* Header — matches & tutorial only (stats/leaderboard removed) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/[0.07] via-background to-muted/30 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/lovable-uploads/ae543fd6-94e8-4c76-a9aa-b6cb9460a647.png"
            alt=""
            className="h-10 w-10 shrink-0 rounded-lg object-contain shadow-sm ring-1 ring-primary/15"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Phil&apos;s Financials</p>
            <p className="text-xs text-muted-foreground truncate">Company discovery</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/25"
            onClick={() => setShowMatches(true)}
          >
            <Heart className="mr-2 h-4 w-4" />
            Matches ({matches.length})
          </Button>
          {!tutorialComplete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTutorial(true)}
            >
              Tutorial
            </Button>
          )}
        </div>
      </div>

      {/* Daily Challenge Banner */}
      {challenge && !challenge.completed && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{challenge.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{challenge.name}</p>
                  <p className="text-xs text-muted-foreground">{challenge.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {challenge.progress}/{challenge.target}
                </p>
                <p className="text-xs text-muted-foreground">+{challenge.xpReward} XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Indicator */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {mode === 'challenge-run' 
            ? `Company ${challengeRunCount + 1} of 10 • Score: ${challengeRunScore}`
            : `Company ${currentIndex + 1} of ${totalCompanies}`}
        </p>
        <div className="w-full bg-secondary h-2 rounded-full mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${mode === 'challenge-run' 
              ? ((challengeRunCount + 1) / 10) * 100
              : ((currentIndex + 1) / totalCompanies) * 100}%` }}
          />
        </div>
      </div>

      {/* Mode-Specific UI */}
      {mode === 'macro-aware' && (
        <Card className="bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border-emerald-500/30">
          <CardContent className="py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{activeMacro.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{activeMacro.name}</p>
                <p className="text-xs text-emerald-300/70">{activeMacro.shortDescription}</p>
              </div>
              <div className="text-right text-xs">
                <p className="text-green-400">✓ {activeMacro.tendsToWin.split(',')[0]}</p>
                <p className="text-red-400">✗ {activeMacro.tendsToLose.split(',')[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {mode === 'thesis-builder' && (
        <Card className="bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border-blue-500/30">
          <CardContent className="py-3">
            <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Build Your Thesis (select 2-3 reasons)
            </p>
            <div className="flex flex-wrap gap-2">
              {thesisOptions.map((option) => (
                <Badge
                  key={option.id}
                  variant={selectedThesis.includes(option.id) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all ${
                    selectedThesis.includes(option.id) 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-blue-900/50'
                  }`}
                  onClick={() => {
                    if (selectedThesis.includes(option.id)) {
                      setSelectedThesis(prev => prev.filter(t => t !== option.id));
                    } else if (selectedThesis.length < 3) {
                      setSelectedThesis(prev => [...prev, option.id]);
                    }
                  }}
                >
                  {option.icon} {option.label}
                </Badge>
              ))}
            </div>
            {selectedThesis.length >= 2 && (
              <p className="text-xs text-green-400 mt-2">
                ✓ Thesis ready! Swipe to earn bonus rewards.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {mode === 'time-horizon' && (
        <Card className="bg-gradient-to-r from-violet-950/50 to-purple-950/50 border-violet-500/30">
          <CardContent className="py-3">
            <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Select Time Horizon
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedHorizon === 'short' ? 'default' : 'outline'}
                onClick={() => setSelectedHorizon('short')}
                className={selectedHorizon === 'short' ? 'bg-violet-600' : ''}
              >
                ⚡ Short-term (1-2 years)
              </Button>
              <Button
                size="sm"
                variant={selectedHorizon === 'long' ? 'default' : 'outline'}
                onClick={() => setSelectedHorizon('long')}
                className={selectedHorizon === 'long' ? 'bg-violet-600' : ''}
              >
                🌱 Long-term (5+ years)
              </Button>
            </div>
            {selectedHorizon && (
              <p className="text-xs text-violet-300 mt-2">
                Consider: {selectedHorizon === 'long' 
                  ? 'Company fundamentals and growth potential matter more.' 
                  : 'Current macro conditions and near-term catalysts matter more.'}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {mode === 'challenge-run' && (
        <Card className="bg-gradient-to-r from-amber-950/50 to-orange-950/50 border-amber-500/30">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <span className="font-medium text-white">Challenge Run</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{challengeRunScore}</p>
                  <p className="text-xs text-amber-300/70">Score</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{10 - challengeRunCount}</p>
                  <p className="text-xs text-amber-300/70">Remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Swipe Card */}
      <AnimatePresence mode="wait">
        {currentCompany && (
          <motion.div
            key={`${currentCompany.id}-${cardKey}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <TinderCard company={currentCompany} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Actions */}
      <SwipeActions 
        onSwipe={onSwipe}
        superLikesRemaining={superLikesRemaining}
      />

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNext}
          disabled={isLastCard}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Helper Text */}
      <p className="text-center text-xs text-muted-foreground">
        💡 Tip: Drag cards left or right to swipe on desktop!
      </p>
    </div>
  );
};

export default CompanyTinderGame;
