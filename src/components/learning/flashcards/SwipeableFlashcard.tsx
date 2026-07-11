/**
 * SwipeableFlashcard — bamboo-leaf swipeable study card.
 *
 * Swipe right = Mastered  |  Swipe left = Review later  |  Tap = Flip
 *
 * UX fixes:
 *  - Tap-to-flip blocked during active drag
 *  - Flip state resets when card prop changes
 *  - 100px threshold for swipe decision
 *  - Accessible fallback buttons preserved
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  animate,
  type PanInfo,
} from 'framer-motion';
import type { UnifiedFlashcard } from '@/data/unified-flashcards';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface SwipeableFlashcardProps {
  card: UnifiedFlashcard;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const SECTION_BADGE: Record<string, { label: string; color: string }> = {
  'personal-finance': { label: 'Personal Finance', color: 'bg-emerald-600 text-white' },
  'market-intelligence': { label: 'Markets', color: 'bg-teal-600 text-white' },
  careers: { label: 'Careers', color: 'bg-amber-600 text-white' },
};

const DIFFICULTY_DOT: Record<string, string> = {
  beginner: 'bg-emerald-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-red-400',
};

const SWIPE_THRESHOLD = 100;

const SwipeableFlashcard: React.FC<SwipeableFlashcardProps> = ({
  card,
  onSwipeRight,
  onSwipeLeft,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const leftOverlay = useTransform(x, [-160, -50, 0], [0.85, 0.3, 0]);
  const rightOverlay = useTransform(x, [0, 50, 160], [0, 0.3, 0.85]);

  // Reset flip state and exit direction when card changes
  useEffect(() => {
    setIsFlipped(false);
    setExitDir(null);
    x.set(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x > SWIPE_THRESHOLD) {
      // Drive x to the right before exit so the green overlay stays visible
      animate(x, 400, { duration: 0.2, ease: 'easeOut' });
      setExitDir('right');
      setTimeout(onSwipeRight, 220);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      animate(x, -400, { duration: 0.2, ease: 'easeOut' });
      setExitDir('left');
      setTimeout(onSwipeLeft, 220);
    }
  };

  const handleCardClick = () => {
    if (!isDragging) setIsFlipped((f) => !f);
  };

  const triggerLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    animate(x, -400, { duration: 0.2, ease: 'easeOut' });
    setExitDir('left');
    setTimeout(onSwipeLeft, 220);
  };

  const triggerRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    animate(x, 400, { duration: 0.2, ease: 'easeOut' });
    setExitDir('right');
    setTimeout(onSwipeRight, 220);
  };

  const badge = SECTION_BADGE[card.sourceModule] ?? {
    label: card.sourceModule,
    color: 'bg-gray-500 text-white',
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto gap-6">
      {/* Card wrapper */}
      <div className="relative w-full" style={{ perspective: '1200px' }}>
        <AnimatePresence>
          {!exitDir && (
            <motion.div
              key={card.id}
              className="relative w-full cursor-grab active:cursor-grabbing touch-none"
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.65}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.95, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.22 } }}
              onClick={handleCardClick}
            >
              {/* "Review" red overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl z-20 pointer-events-none flex items-center justify-center"
                style={{
                  opacity: leftOverlay,
                  background: 'rgba(239,68,68,0.75)',
                }}
              >
                <X className="h-16 w-16 text-white drop-shadow-lg" />
              </motion.div>

              {/* "Got it" green overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl z-20 pointer-events-none flex items-center justify-center"
                style={{
                  opacity: rightOverlay,
                  background: 'rgba(16,185,129,0.75)',
                }}
              >
                <Check className="h-16 w-16 text-white drop-shadow-lg" />
              </motion.div>

              {/* Flip container */}
              <motion.div
                className="w-full"
                style={{
                  transformStyle: 'preserve-3d',
                  minHeight: 360,
                  position: 'relative',
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* ── Front ── */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 dark:from-emerald-950 dark:to-emerald-900 dark:border-emerald-800"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow: '0 8px 32px rgba(5,150,105,0.14)',
                    minHeight: 360,
                  }}
                >
                  {/* Decorative leaf */}
                  <svg
                    className="absolute top-0 right-0 opacity-10 pointer-events-none"
                    width="140"
                    height="140"
                    viewBox="0 0 140 140"
                    aria-hidden="true"
                  >
                    <ellipse
                      cx="110"
                      cy="30"
                      rx="60"
                      ry="34"
                      fill="#059669"
                      transform="rotate(-30 110 30)"
                    />
                  </svg>
                  <svg
                    className="absolute bottom-0 left-0 opacity-10 pointer-events-none"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <ellipse
                      cx="20"
                      cy="90"
                      rx="45"
                      ry="24"
                      fill="#059669"
                      transform="rotate(25 20 90)"
                    />
                  </svg>

                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    {card.icon && (
                      <div className="text-5xl mb-4 leading-none">{card.icon}</div>
                    )}
                    <h2
                      className="text-2xl font-bold leading-snug mb-5 text-emerald-900 dark:text-emerald-100"
                    >
                      {card.term}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Badge className={`text-xs ${badge.color}`}>
                        {badge.label}
                      </Badge>
                      {card.subcategory && (
                        <Badge
                          variant="outline"
                          className="text-xs border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-300"
                        >
                          {card.subcategory}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-4">
                      <span
                        className={`w-2 h-2 rounded-full ${DIFFICULTY_DOT[card.difficulty] ?? 'bg-gray-400'}`}
                      />
                      <span className="text-xs text-emerald-700 dark:text-emerald-300 capitalize">
                        {card.difficulty}
                      </span>
                    </div>
                    <p className="absolute bottom-4 text-[10px] text-emerald-500 dark:text-emerald-400 font-medium tracking-wide">
                      Tap to reveal definition
                    </p>
                  </div>
                </div>

                {/* ── Back ── */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-300 dark:from-emerald-900 dark:to-emerald-800 dark:border-emerald-700"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow: '0 8px 32px rgba(5,150,105,0.18)',
                    minHeight: 360,
                  }}
                >
                  <div
                    className="relative h-full flex flex-col justify-center p-7"
                    style={{ minHeight: 360 }}
                  >
                    {/* Term reminder */}
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60 text-emerald-900 dark:text-emerald-100"
                    >
                      {card.term}
                    </p>
                    <p
                      className="text-base font-semibold leading-relaxed mb-5 text-emerald-900 dark:text-emerald-100"
                    >
                      {card.definition}
                    </p>
                    {card.philExample && (
                      <div
                        className="rounded-2xl p-4 text-sm leading-relaxed bg-white/60 dark:bg-emerald-900/40 border-l-[3px] border-l-emerald-600 text-emerald-900 dark:text-emerald-100"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-14 border-2 border-red-400/40 bg-red-50 hover:bg-red-100 hover:border-red-400/70 text-red-600 font-semibold rounded-2xl"
          onClick={triggerLeft}
          aria-label="Review later"
        >
          <X className="h-5 w-5 mr-2" />
          Review
        </Button>
        <Button
          size="lg"
          className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl"
          onClick={triggerRight}
          aria-label="Mark as mastered"
        >
          <Check className="h-5 w-5 mr-2" />
          Got It!
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground -mt-2">
        or swipe the card left / right
      </p>
    </div>
  );
};

export default SwipeableFlashcard;
