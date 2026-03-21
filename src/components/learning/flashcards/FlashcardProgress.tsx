/**
 * FlashcardProgress - Visual progress component for flashcard sessions
 * 
 * Shows:
 * - Circular progress ring
 * - Cards mastered/total
 * - XP earned this session
 * - Streak indicator
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Coins, Sparkles, Trophy } from 'lucide-react';

interface FlashcardProgressProps {
  currentCard: number;
  totalCards: number;
  masteredCount: number;
  reviewCount: number;
  xpEarned: number;
  coinsEarned: number;
  streak: number;
}

const FlashcardProgress: React.FC<FlashcardProgressProps> = ({
  currentCard,
  totalCards,
  masteredCount,
  reviewCount,
  xpEarned,
  coinsEarned,
  streak,
}) => {
  const progress = totalCards > 0 ? (currentCard / totalCards) * 100 : 0;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/30 border-2">
      <div className="flex items-center justify-between gap-4">
        {/* Circular Progress */}
        <div className="relative">
          <svg width="100" height="100" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-primary"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{currentCard}</span>
            <span className="text-xs text-muted-foreground">of {totalCards}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Mastered */}
          <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="h-4 w-4 text-green-500" />
              <span className="text-lg font-bold text-green-600">{masteredCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Mastered</span>
          </div>

          {/* Review */}
          <div className="bg-orange-500/10 rounded-lg p-3 text-center border border-orange-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-lg">🔄</span>
              <span className="text-lg font-bold text-orange-600">{reviewCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Review</span>
          </div>

          {/* XP Earned */}
          <div className="bg-purple-500/10 rounded-lg p-3 text-center border border-purple-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-lg font-bold text-purple-600">+{xpEarned}</span>
            </div>
            <span className="text-xs text-muted-foreground">XP</span>
          </div>

          {/* Coins Earned */}
          <div className="bg-yellow-500/10 rounded-lg p-3 text-center border border-yellow-500/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="text-lg font-bold text-yellow-600">+{coinsEarned}</span>
            </div>
            <span className="text-xs text-muted-foreground">Coins</span>
          </div>
        </div>
      </div>

      {/* Streak badge */}
      {streak > 0 && (
        <motion.div 
          className="mt-4 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 gap-2">
            <Flame className="h-4 w-4" />
            {streak} Day Streak!
          </Badge>
        </motion.div>
      )}
    </Card>
  );
};

export default FlashcardProgress;
