/**
 * BambooLeafCard — square card with a bamboo-leaf aesthetic.
 *
 * Front: term + section badge
 * Back: definition + Phil's analogy
 *
 * Palette from panda-image-style skill:
 *  - bg gradient: #ecfdf5 → #d1fae5
 *  - title text: #065f46
 *  - accent: #059669
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { UnifiedFlashcard } from '@/data/unified-flashcards';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface BambooLeafCardProps {
  card: UnifiedFlashcard;
  isFlipped?: boolean;
  onFlip?: () => void;
  className?: string;
}

const SECTION_BADGE: Record<string, { label: string; color: string }> = {
  'personal-finance': { label: 'Personal Finance', color: 'bg-emerald-600 text-white' },
  'market-intelligence': { label: 'Markets', color: 'bg-teal-600 text-white' },
  'careers': { label: 'Careers', color: 'bg-amber-600 text-white' },
};

const DIFFICULTY_DOT: Record<string, string> = {
  beginner: 'bg-emerald-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-red-400',
};

const BambooLeafCard: React.FC<BambooLeafCardProps> = ({
  card,
  isFlipped = false,
  onFlip,
  className = '',
}) => {
  const badge = SECTION_BADGE[card.sourceModule] ?? {
    label: card.sourceModule,
    color: 'bg-gray-500 text-white',
  };

  return (
    <div
      className={`relative w-full aspect-square select-none ${className}`}
      style={{ perspective: '1200px' }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFlip?.()}
      aria-label={isFlipped ? `Definition: ${card.definition}` : `Term: ${card.term}. Tap to flip.`}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front — term */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 dark:from-emerald-950 dark:to-emerald-900 dark:border-emerald-800"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 8px 32px rgba(5,150,105,0.12)',
          }}
        >
          {/* Decorative leaf shapes */}
          <svg
            className="absolute top-0 right-0 opacity-10 pointer-events-none"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <ellipse cx="90" cy="30" rx="50" ry="30" fill="#059669" transform="rotate(-30 90 30)" />
            <ellipse cx="100" cy="60" rx="40" ry="22" fill="#059669" transform="rotate(-15 100 60)" />
          </svg>
          <svg
            className="absolute bottom-0 left-0 opacity-10 pointer-events-none"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <ellipse cx="20" cy="80" rx="40" ry="22" fill="#059669" transform="rotate(30 20 80)" />
          </svg>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Icon */}
            {card.icon && (
              <div className="text-4xl mb-4 leading-none">{card.icon}</div>
            )}
            {/* Term */}
            <h3
              className="text-xl font-bold leading-snug mb-4 text-emerald-900 dark:text-emerald-100"
            >
              {card.term}
            </h3>
            {/* Category badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge className={`text-xs ${badge.color}`}>{badge.label}</Badge>
              {card.subcategory && (
                <Badge
                  variant="outline"
                  className="text-xs border-emerald-300 text-emerald-700"
                >
                  {card.subcategory}
                </Badge>
              )}
            </div>
            {/* Difficulty dot */}
            <div className="flex items-center gap-1.5 mt-4">
              <span
                className={`w-2 h-2 rounded-full ${DIFFICULTY_DOT[card.difficulty] ?? 'bg-gray-400'}`}
              />
              <span className="text-xs text-emerald-700 dark:text-emerald-300 capitalize">
                {card.difficulty}
              </span>
            </div>
            {/* Tap hint */}
            <p className="absolute bottom-4 text-[10px] text-emerald-500 dark:text-emerald-400 font-medium tracking-wide">
              Tap to flip
            </p>
          </div>
        </div>

        {/* Back — definition */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-300 dark:from-emerald-900 dark:to-emerald-800 dark:border-emerald-700"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '0 8px 32px rgba(5,150,105,0.18)',
          }}
        >
          <svg
            className="absolute top-0 left-0 opacity-10 pointer-events-none"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <ellipse cx="30" cy="30" rx="50" ry="28" fill="#047857" transform="rotate(30 30 30)" />
          </svg>

          <div className="relative h-full flex flex-col justify-center p-6 overflow-y-auto">
            {/* Definition */}
            <p
              className="text-sm font-semibold leading-relaxed mb-4 text-center text-emerald-900 dark:text-emerald-100"
            >
              {card.definition}
            </p>
            {/* Phil's analogy */}
            {card.philExample && (
              <div
                className="rounded-xl p-3 text-xs leading-relaxed text-center bg-white/55 dark:bg-emerald-900/40 border-l-[3px] border-l-emerald-600 text-emerald-900 dark:text-emerald-100"
              >
                <span className="font-bold"><ThemedEmoji emoji="🐼" className="h-[1em] w-[1em]" /> Phil says: </span>
                {card.philExample}
              </div>
            )}
            <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-emerald-600 dark:text-emerald-400 font-medium tracking-wide">
              Tap to flip back
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BambooLeafCard;
