import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coins,
  Package,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CreditCard,
  History,
  ChevronLeft,
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore } from '@/store/useCreditStore';

export interface CoinCounterProps {
  totalStorage: number;
  onOpenCredit?: () => void;
  onOpenEventHistory?: () => void;
  onGoHome?: () => void;
  eventHistoryCount?: number;
  creditOverdue?: boolean;
}

const CoinCounter: React.FC<CoinCounterProps> = ({
  totalStorage,
  onOpenCredit,
  onOpenEventHistory,
  onGoHome,
  eventHistoryCount = 0,
  creditOverdue = false,
}) => {
  const bamboo = useGameStore((state) => state.bamboo);
  const xp = useGameStore((state) => state.xp);
  const empireProductivity = useGameStore((state) => state.empireProductivity);

  const { enabled: creditEnabled, score: creditScore, getCreditRatingInfo } = useCreditStore();

  const [displayBamboo, setDisplayBamboo] = useState(bamboo);
  const [isAnimating, setIsAnimating] = useState(false);
  const [changeAmount, setChangeAmount] = useState(0);
  const prevBambooRef = useRef(bamboo);

  const [prevCreditScore, setPrevCreditScore] = useState(creditScore);
  const [scoreFlash, setScoreFlash] = useState<'up' | 'down' | null>(null);
  const [scoreTrend, setScoreTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    if (creditScore !== prevCreditScore) {
      if (creditScore > prevCreditScore) {
        setScoreFlash('up');
        setScoreTrend('up');
      } else {
        setScoreFlash('down');
        setScoreTrend('down');
      }
      setPrevCreditScore(creditScore);

      setTimeout(() => setScoreFlash(null), 2000);
      setTimeout(() => setScoreTrend('stable'), 10000);
    }
  }, [creditScore, prevCreditScore]);

  useEffect(() => {
    const diff = bamboo - prevBambooRef.current;
    if (diff !== 0) {
      setChangeAmount(diff);
      setIsAnimating(true);

      const duration = 500;
      const steps = 20;
      const stepDuration = duration / steps;
      const stepAmount = diff / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setDisplayBamboo((prev) => prev + stepAmount);

        if (currentStep >= steps) {
          clearInterval(interval);
          setDisplayBamboo(bamboo);
          setTimeout(() => setIsAnimating(false), 300);
        }
      }, stepDuration);

      prevBambooRef.current = bamboo;

      return () => clearInterval(interval);
    }
  }, [bamboo]);

  const storagePercentage = totalStorage > 0 ? (bamboo / totalStorage) * 100 : 0;
  const isNearFull = storagePercentage >= 90;
  const isFull = storagePercentage >= 100;

  return (
    <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-2 sm:gap-3 pr-1 sm:pr-2 max-w-[100vw] box-border">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {onGoHome && (
          <button
            type="button"
            onClick={onGoHome}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Exit to home"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <motion.div
          data-tutorial="coin-counter"
          className={`
            relative flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg backdrop-blur-sm
            ${isAnimating ? 'ring-2 ring-amber-400' : ''}
            ${isFull ? 'bg-red-500/90' : 'bg-white/90 dark:bg-gray-800/90'}
          `}
          animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Coins className={`w-6 h-6 flex-shrink-0 ${isFull ? 'text-white' : 'text-amber-500'}`} />
          <div className="flex flex-col min-w-0">
            <span className={`font-bold text-base sm:text-lg leading-tight ${isFull ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {Math.round(displayBamboo).toLocaleString()}
            </span>
            <div className="flex items-center gap-1">
              <Package className={`w-3 h-3 flex-shrink-0 ${isFull ? 'text-white/70' : 'text-gray-400'}`} />
              <span className={`text-[10px] sm:text-xs truncate ${isFull ? 'text-white/70' : 'text-gray-500'}`}>
                {Math.round(bamboo).toLocaleString()} / {totalStorage.toLocaleString()}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {isAnimating && changeAmount !== 0 && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`
                  absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold
                  ${changeAmount > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                `}
              >
                {changeAmount > 0 ? '+' : ''}
                {Math.round(changeAmount)}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {isNearFull && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg order-last sm:order-none w-full sm:w-auto justify-center sm:justify-start
              ${isFull ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}
            `}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{isFull ? 'Storage Full!' : 'Storage Almost Full!'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto flex-shrink-0 flex-wrap justify-end max-[380px]:max-w-[calc(100vw-8rem)]">
        <div
          data-tutorial="productivity-indicator"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/85 dark:bg-gray-800/90 shadow-md backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/40"
          title="Empire productivity — drops if you grind without breaks; events can lower it too."
        >
          <span className="text-[10px] sm:text-xs font-semibold text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
            {Math.round(empireProductivity)}% prod
          </span>
        </div>

        {creditEnabled && onOpenCredit && (
          <motion.button
            type="button"
            data-tutorial="credit-indicator"
            onClick={onOpenCredit}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg backdrop-blur-sm cursor-pointer text-left
              ${creditOverdue ? 'ring-2 ring-yellow-400 bg-red-500/90 text-white' : ''}
              ${scoreFlash === 'down' && !creditOverdue ? 'bg-red-500/90 text-white' : ''}
              ${scoreFlash === 'up' && !creditOverdue ? 'bg-green-500/90 text-white' : ''}
              ${!scoreFlash && !creditOverdue ? 'bg-white/90 dark:bg-gray-800/90' : ''}
            `}
            animate={scoreFlash ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
            aria-label="Open credit"
          >
            <CreditCard className={`w-4 h-4 flex-shrink-0 ${scoreFlash || creditOverdue ? 'text-white' : 'text-indigo-500'}`} />
            <div className="flex items-center gap-1">
              <span
                className={`font-bold text-sm ${scoreFlash || creditOverdue ? 'text-white' : ''}`}
                style={scoreFlash || creditOverdue ? undefined : { color: getCreditRatingInfo().color }}
              >
                {creditScore}
              </span>
              {creditOverdue && (
                <span className="text-[10px] font-bold bg-yellow-400 text-black rounded px-1">!</span>
              )}
              {scoreTrend !== 'stable' && !creditOverdue && (
                <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}>
                  {scoreTrend === 'up' ? (
                    <TrendingUp className={`w-3 h-3 ${scoreFlash ? 'text-white' : 'text-green-500'}`} />
                  ) : (
                    <TrendingDown className={`w-3 h-3 ${scoreFlash ? 'text-white' : 'text-red-500'}`} />
                  )}
                </motion.span>
              )}
            </div>
          </motion.button>
        )}

        {onOpenEventHistory && (
          <button
            type="button"
            onClick={onOpenEventHistory}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Event history"
          >
            <History className="h-5 w-5" />
            {eventHistoryCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[1rem] h-4 px-1 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                {eventHistoryCount > 9 ? '9+' : eventHistoryCount}
              </span>
            )}
          </button>
        )}

        <motion.div
          data-tutorial="xp-indicator"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm"
        >
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white whitespace-nowrap">
            {Math.round(xp).toLocaleString()} XP
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default CoinCounter;
