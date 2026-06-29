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
  GraduationCap,
  MoreHorizontal,
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore } from '@/store/useCreditStore';

export interface CoinCounterProps {
  totalStorage: number;
  productionRate?: number;
  onOpenCredit?: () => void;
  onOpenEventHistory?: () => void;
  onGoHome?: () => void;
  onStartTutorial?: () => void;
  eventHistoryCount?: number;
  creditOverdue?: boolean;
}

const CoinCounter: React.FC<CoinCounterProps> = ({
  totalStorage,
  productionRate = 0,
  onOpenCredit,
  onOpenEventHistory,
  onGoHome,
  onStartTutorial,
  eventHistoryCount = 0,
  creditOverdue = false,
}) => {
  const bamboo = useGameStore((state) => state.bamboo);
  const xp = useGameStore((state) => state.xp);
  const empireProductivity = useGameStore((state) => state.empireProductivity);

  const {
    enabled: creditEnabled,
    score: creditScore,
    balance: creditBalance,
    limit: creditLimit,
    getCreditRatingInfo,
  } = useCreditStore();

  const [displayBamboo, setDisplayBamboo] = useState(bamboo);
  const [isAnimating, setIsAnimating] = useState(false);
  const [changeAmount, setChangeAmount] = useState(0);
  const prevBambooRef = useRef(bamboo);

  const [prevCreditScore, setPrevCreditScore] = useState(creditScore);
  const [scoreFlash, setScoreFlash] = useState<'up' | 'down' | null>(null);
  const [scoreTrend, setScoreTrend] = useState<'up' | 'down' | 'stable'>('stable');

  const [showStats, setShowStats] = useState(false);

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

  const creditUtilization = creditLimit > 0 ? Math.round((creditBalance / creditLimit) * 100) : 0;
  const utilHigh = creditUtilization >= 70;
  const utilCritical = creditUtilization >= 90;

  // Close popover when tapping outside
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showStats) return;
    const handle = (e: MouseEvent | TouchEvent) => {
      if (statsRef.current && !statsRef.current.contains(e.target as Node)) {
        setShowStats(false);
      }
    };
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [showStats]);

  return (
    <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2 max-w-[100vw] box-border">
      {onGoHome && (
        <button
          type="button"
          onClick={onGoHome}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Exit to home"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Storage card */}
      <motion.div
        data-tutorial="coin-counter"
        className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl shadow-lg backdrop-blur-sm flex-shrink min-w-0
          ${isAnimating ? 'ring-2 ring-amber-400' : ''}
          ${isFull ? 'bg-red-500/90' : 'bg-white/90 dark:bg-gray-800/90'}
        `}
        animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Coins className={`w-5 h-5 flex-shrink-0 ${isFull ? 'text-white' : 'text-amber-500'}`} />
        <div className="flex flex-col min-w-0">
          <span className={`font-bold text-sm leading-tight ${isFull ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {Math.round(displayBamboo).toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <Package className={`w-3 h-3 flex-shrink-0 ${isFull ? 'text-white/70' : 'text-gray-400'}`} />
            <span className={`text-[10px] truncate ${isFull ? 'text-white/70' : 'text-gray-500'}`}>
              /{totalStorage.toLocaleString()}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {isAnimating && changeAmount !== 0 && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold
                ${changeAmount > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
              `}
            >
              {changeAmount > 0 ? '+' : ''}
              {Math.round(changeAmount)}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Productivity chip */}
      <div
        data-tutorial="productivity-indicator"
        className="flex items-center px-2 py-1.5 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm border border-emerald-200/60 dark:border-emerald-800/40 flex-shrink-0"
        title="Empire productivity"
      >
        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 whitespace-nowrap">
          {Math.round(empireProductivity)}%
        </span>
      </div>

      {/* Credit utilization chip */}
      {creditEnabled && onOpenCredit && (
        <motion.button
          type="button"
          data-tutorial="credit-indicator"
          onClick={onOpenCredit}
          className={`flex items-center gap-1 px-2 py-1.5 rounded-xl shadow-md backdrop-blur-sm flex-shrink-0
            ${creditOverdue ? 'ring-2 ring-yellow-400 bg-red-500/90 text-white' : ''}
            ${!creditOverdue && utilCritical ? 'bg-red-500/90 text-white' : ''}
            ${!creditOverdue && !utilCritical && utilHigh ? 'bg-amber-500/90 text-white' : ''}
            ${!creditOverdue && !utilHigh ? 'bg-white/90 dark:bg-gray-800/90' : ''}
          `}
          animate={scoreFlash ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
          aria-label="Open credit"
        >
          <CreditCard
            className={`w-3.5 h-3.5 flex-shrink-0 ${creditOverdue || utilHigh ? 'text-white' : 'text-indigo-500'}`}
          />
          <span
            className={`text-[11px] font-bold whitespace-nowrap ${creditOverdue || utilHigh ? 'text-white' : ''}`}
            style={creditOverdue || utilHigh ? undefined : { color: getCreditRatingInfo().color }}
          >
            {creditUtilization}%
          </span>
          {creditOverdue && (
            <span className="text-[10px] font-bold bg-yellow-400 text-black rounded px-1">!</span>
          )}
        </motion.button>
      )}

      {/* Stats popover trigger */}
      <div ref={statsRef} className="relative ml-auto flex-shrink-0">
        <button
          type="button"
          onClick={() => setShowStats((s) => !s)}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="More stats"
          title="More stats"
        >
          <MoreHorizontal className="h-5 w-5" />
          {eventHistoryCount > 0 && !showStats && (
            <span className="absolute -top-1 -right-1 min-w-[1rem] h-4 px-1 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              {eventHistoryCount > 9 ? '9+' : eventHistoryCount}
            </span>
          )}
        </button>

        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-11 w-56 rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-2xl backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 overflow-hidden"
            >
              {/* Production rate */}
              <div
                data-tutorial="production-rate"
                className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200/60 dark:border-gray-700/60"
              >
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Production
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-300">
                  +{Math.round(productionRate)}/hr
                </span>
              </div>

              {/* XP */}
              <div
                data-tutorial="xp-indicator"
                className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200/60 dark:border-gray-700/60"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">XP</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {Math.round(xp).toLocaleString()}
                </span>
              </div>

              {/* Credit score (detail) */}
              {creditEnabled && (
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200/60 dark:border-gray-700/60">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-indigo-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Credit score
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs font-bold"
                      style={{ color: getCreditRatingInfo().color }}
                    >
                      {creditScore}
                    </span>
                    {scoreTrend === 'up' && (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    )}
                    {scoreTrend === 'down' && (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </div>
              )}

              {/* Event history button */}
              {onOpenEventHistory && (
                <button
                  type="button"
                  onClick={() => {
                    setShowStats(false);
                    onOpenEventHistory();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 border-b border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                      Event history
                    </span>
                  </div>
                  {eventHistoryCount > 0 && (
                    <span className="min-w-[1rem] h-4 px-1 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                      {eventHistoryCount > 9 ? '9+' : eventHistoryCount}
                    </span>
                  )}
                </button>
              )}

              {/* Tutorial */}
              {onStartTutorial && (
                <button
                  type="button"
                  data-tutorial="tutorial-replay-button"
                  onClick={() => {
                    setShowStats(false);
                    onStartTutorial();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors"
                >
                  <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                    Tutorial
                  </span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isNearFull && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl shadow-lg mx-auto w-fit
              ${isFull ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}
            `}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium">{isFull ? 'Storage Full!' : 'Storage Almost Full!'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoinCounter;
