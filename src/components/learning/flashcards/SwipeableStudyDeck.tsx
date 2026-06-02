/**
 * SwipeableStudyDeck — full swipe-based study session with bamboo-leaf UI.
 *
 * Flow:
 *  1. First pass through the deck (all cards)
 *  2. Re-deal the review queue up to 2 more passes (max 2 review rounds)
 *  3. Completion screen with real award numbers + milestone highlights
 *
 * Rewards are calculated here and passed to usePlatformIntegration so the
 * completion screen shows the actual amounts credited to the empire.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UnifiedFlashcard } from '@/data/unified-flashcards';
import SwipeableFlashcard from './SwipeableFlashcard';
import FlashcardProgress from './FlashcardProgress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  RotateCcw,
  Trophy,
  Sparkles,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import confetti from 'canvas-confetti';
import { emitDailyGoalEvent } from '@/lib/dailyGoalEvents';

interface SwipeableStudyDeckProps {
  cards: UnifiedFlashcard[];
  title: string;
  onComplete: (stats: SessionStats) => void;
  onBack: () => void;
}

export interface SessionStats {
  totalCards: number;
  masteredCount: number;
  reviewCount: number;
  xpEarned: number;
  coinsEarned: number;
}

// ── Milestone thresholds ──────────────────────────────────────────────────────
const MILESTONES: { threshold: number; bamboo: number; xp: number; label: string }[] =
  [
    { threshold: 10, bamboo: 5, xp: 1, label: '10 mastered!' },
    { threshold: 25, bamboo: 15, xp: 3, label: '25 mastered!' },
    { threshold: 50, bamboo: 30, xp: 5, label: '50 mastered!' },
  ];

const MAX_REVIEW_ROUNDS = 2;

// ── Component ─────────────────────────────────────────────────────────────────
const SwipeableStudyDeck: React.FC<SwipeableStudyDeckProps> = ({
  cards,
  title,
  onComplete,
  onBack,
}) => {
  // Active deck = current queue; review queues accumulate swipe-left cards
  const [deck, setDeck] = useState<UnifiedFlashcard[]>([...cards]);
  const [deckIndex, setDeckIndex] = useState(0);
  const [reviewRound, setReviewRound] = useState(0);
  const [pendingReview, setPendingReview] = useState<UnifiedFlashcard[]>([]);

  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  // Actual reward totals (updated by usePlatformIntegration return values)
  const [totalBamboo, setTotalBamboo] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [milestoneMessages, setMilestoneMessages] = useState<string[]>([]);

  const [isComplete, setIsComplete] = useState(false);

  const { currentStreak, recordActivity } = useUnifiedStreak();
  const { awardActivityCompletion, awardFlashcardMastery } = usePlatformIntegration();

  const currentCard = deck[deckIndex] ?? null;
  const cardsRemaining = deck.length - deckIndex;

  // ── Helpers ────────────────────────────────────────────────────────────────
  const checkMilestones = useCallback(
    (newMasteredCount: number) => {
      MILESTONES.forEach((m) => {
        if (
          newMasteredCount === m.threshold &&
          !milestoneMessages.includes(m.label)
        ) {
          // Milestone bonuses bypass the per-card daily cap (they're infrequent)
          const awarded = awardActivityCompletion(
            'flashcard_mastery',
            { bamboo: m.bamboo, xp: m.xp },
            true
          ) as { bamboo?: number; xp?: number } | undefined;
          setTotalBamboo((b) => b + (awarded?.bamboo ?? m.bamboo));
          setTotalXp((x) => x + (awarded?.xp ?? m.xp));
          setMilestoneMessages((msgs) => [...msgs, m.label]);
        }
      });
    },
    [awardActivityCompletion, milestoneMessages]
  );

  const advanceDeck = useCallback(
    (nextPendingReview: UnifiedFlashcard[]) => {
      if (deckIndex + 1 < deck.length) {
        // Still cards left in current pass
        setDeckIndex((i) => i + 1);
        return;
      }

      // End of current pass — check for review queue
      if (nextPendingReview.length > 0 && reviewRound < MAX_REVIEW_ROUNDS) {
        setDeck([...nextPendingReview]);
        setDeckIndex(0);
        setReviewRound((r) => r + 1);
        setPendingReview([]);
        return;
      }

      // All done
      setIsComplete(true);
      recordActivity();
      emitDailyGoalEvent({ type: 'flashcards', count: cards.length });
      emitDailyGoalEvent({ type: 'any_activity' });

      if (masteredCount > cards.length / 2) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    },
    [deckIndex, deck.length, reviewRound, masteredCount, cards.length, recordActivity]
  );

  // ── Swipe handlers ─────────────────────────────────────────────────────────
  const handleSwipeRight = useCallback(() => {
    if (!currentCard) return;

    const newMasteredCount = masteredCount + 1;
    setMasteredCount(newMasteredCount);
    setMasteredIds((ids) => new Set([...ids, currentCard.id]));

    // Per-card reward (subject to daily cap)
    const awarded = awardFlashcardMastery();
    setTotalBamboo((b) => b + awarded.bamboo);
    setTotalXp((x) => x + awarded.xp);

    checkMilestones(newMasteredCount);
    advanceDeck(pendingReview);
  }, [currentCard, masteredCount, awardActivityCompletion, checkMilestones, advanceDeck, pendingReview]);

  const handleSwipeLeft = useCallback(() => {
    if (!currentCard) return;
    setReviewCount((r) => r + 1);
    const nextPending = [...pendingReview, currentCard];
    setPendingReview(nextPending);
    advanceDeck(nextPending);
  }, [currentCard, pendingReview, advanceDeck]);

  // ── Restart ────────────────────────────────────────────────────────────────
  const handleRestart = () => {
    setDeck([...cards]);
    setDeckIndex(0);
    setReviewRound(0);
    setPendingReview([]);
    setMasteredIds(new Set());
    setMasteredCount(0);
    setReviewCount(0);
    setTotalBamboo(0);
    setTotalXp(0);
    setMilestoneMessages([]);
    setIsComplete(false);
  };

  const handleReviewOnly = () => {
    const reviewCards = cards.filter((c) => !masteredIds.has(c.id));
    if (reviewCards.length === 0) return;
    setDeck([...reviewCards]);
    setDeckIndex(0);
    setReviewRound(0);
    setPendingReview([]);
    setIsComplete(false);
  };

  const handleFinish = () => {
    onComplete({
      totalCards: cards.length,
      masteredCount,
      reviewCount,
      xpEarned: totalXp,
      coinsEarned: totalBamboo,
    });
  };

  // ── Empty state ────────────────────────────────────────────────────────────
  if (cards.length === 0) {
    return (
      <div
        className="rounded-2xl p-8 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 dark:from-emerald-950 dark:to-emerald-900 dark:border-emerald-800"
      >
        <p className="text-emerald-800 mb-4">No flashcards in this deck.</p>
        <Button onClick={onBack} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Go Back
        </Button>
      </div>
    );
  }

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isComplete) {
    const accuracy =
      cards.length > 0 ? Math.round((masteredCount / cards.length) * 100) : 0;
    const reviewRemaining = cards.length - masteredIds.size;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <div
          className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 dark:from-emerald-950 dark:to-emerald-900 dark:border-emerald-800"
          style={{
            boxShadow: '0 8px 32px rgba(5,150,105,0.14)',
          }}
        >
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-6">
            <div className="text-5xl mb-3">🎉</div>
            <h2
              className="text-2xl font-bold mb-1 text-emerald-900 dark:text-emerald-100"
            >
              Session Complete!
            </h2>
            <p className="text-sm text-emerald-700">{title}</p>
          </div>

          <div className="px-6 pb-8 space-y-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-2xl p-4 text-center bg-white/60 dark:bg-emerald-900/40"
              >
                <Trophy className="h-7 w-7 mx-auto text-emerald-600 mb-2" />
                <div
                  className="text-2xl font-bold text-emerald-900 dark:text-emerald-100"
                >
                  {masteredCount}
                </div>
                <div className="text-xs text-emerald-700">Mastered</div>
              </div>
              <div
                className="rounded-2xl p-4 text-center bg-white/60 dark:bg-emerald-900/40"
              >
                <RotateCcw className="h-7 w-7 mx-auto text-amber-500 mb-2" />
                <div className="text-2xl font-bold text-amber-700">
                  {reviewRemaining}
                </div>
                <div className="text-xs text-amber-700">Still reviewing</div>
              </div>
            </div>

            {/* Accuracy */}
            <div
              className="rounded-2xl p-4 text-center bg-white/60 dark:bg-emerald-900/40"
            >
              <div className="text-xs text-emerald-700 mb-1 uppercase tracking-wide font-semibold">
                Accuracy
              </div>
              <div
                className="text-4xl font-bold text-emerald-900 dark:text-emerald-100"
              >
                {accuracy}%
              </div>
            </div>

            {/* Rewards */}
            <div
              className="rounded-2xl p-4 bg-white/60 dark:bg-emerald-900/40"
            >
              <h3
                className="font-semibold text-center text-sm mb-3 uppercase tracking-wide text-emerald-900 dark:text-emerald-100"
              >
                Empire Rewards Earned
              </h3>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-amber-500" />
                  <span
                    className="text-xl font-bold text-emerald-900 dark:text-emerald-100"
                  >
                    +{totalBamboo} 🎋
                  </span>
                </div>
                {totalXp > 0 && (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="text-xl font-bold text-purple-700">
                      +{totalXp} XP
                    </span>
                  </div>
                )}
              </div>

              {/* Milestone callouts */}
              {milestoneMessages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                  {milestoneMessages.map((msg) => (
                    <Badge
                      key={msg}
                      className="bg-emerald-600 text-white text-xs"
                    >
                      🏆 {msg}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              {reviewRemaining > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  onClick={handleReviewOnly}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Review {reviewRemaining}
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1 rounded-2xl border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                onClick={handleRestart}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Again
              </Button>
              <Button
                className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleFinish}
              >
                Done
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Study view ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5 max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs border-emerald-300 text-emerald-700"
          >
            {title}
          </Badge>
          {reviewRound > 0 && (
            <Badge className="bg-amber-500 text-white text-xs">
              Review {reviewRound}/{MAX_REVIEW_ROUNDS}
            </Badge>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <FlashcardProgress
        currentCard={deckIndex + 1}
        totalCards={deck.length}
        masteredCount={masteredCount}
        reviewCount={reviewCount}
        xpEarned={totalXp}
        coinsEarned={totalBamboo}
        streak={currentStreak}
      />

      {/* Card */}
      {currentCard && (
        <AnimatePresence mode="wait">
          <SwipeableFlashcard
            key={currentCard.id + '-' + reviewRound}
            card={currentCard}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
          />
        </AnimatePresence>
      )}

      {/* Remaining count */}
      <p className="text-center text-xs text-emerald-600">
        {cardsRemaining} card{cardsRemaining !== 1 ? 's' : ''} left in this pass
      </p>
    </div>
  );
};

export default SwipeableStudyDeck;
