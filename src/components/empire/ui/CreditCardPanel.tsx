import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Clock, AlertTriangle } from 'lucide-react';
import { useCreditStore } from '@/store/useCreditStore';
import { useGameStore } from '@/store/useGameStore';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface CreditCardPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onPayMinimum?: () => void;
}

const CreditCardPanel: React.FC<CreditCardPanelProps> = ({ isOpen, onClose, onPayMinimum }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [lastScoreChange, setLastScoreChange] = useState<number | null>(null);

  const bamboo = useGameStore((state) => state.bamboo);
  const spendBamboo = useGameStore((state) => state.spendBamboo);

  const {
    enabled,
    balance,
    limit,
    score,
    minPaymentDue,
    nextDueAt,
    apr,
    getCreditRatingInfo,
    getTimeUntilDue,
    payBalance,
    payMinimum,
  } = useCreditStore();

  const [timeUntilDue, setTimeUntilDue] = useState(getTimeUntilDue());

  useEffect(() => {
    if (!isOpen || balance <= 0) return;
    const interval = setInterval(() => {
      setTimeUntilDue(getTimeUntilDue());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, balance, getTimeUntilDue]);

  if (!isOpen || !enabled) return null;

  const ratingInfo = getCreditRatingInfo();
  const availableCredit = limit - balance;
  const utilizationPercent = limit > 0 ? Math.round((balance / limit) * 100) : 0;
  const isOverdue = Date.now() > nextDueAt && balance > 0;

  const handlePayment = (amount: number) => {
    if (amount <= 0 || bamboo < amount) return;
    spendBamboo(amount);
    const result = payBalance(amount);
    if (result.success) {
      setShowPaymentSuccess(true);
      setLastScoreChange(result.scoreChange);
      setPaymentAmount('');
      setTimeout(() => {
        setShowPaymentSuccess(false);
        setLastScoreChange(null);
      }, 2000);
    }
  };

  const handlePayMinimum = () => {
    if (bamboo < minPaymentDue) return;
    spendBamboo(minPaymentDue);
    const result = payMinimum();
    if (result.success) {
      setShowPaymentSuccess(true);
      setLastScoreChange(result.scoreChange);
      onPayMinimum?.();
      setTimeout(() => {
        setShowPaymentSuccess(false);
        setLastScoreChange(null);
      }, 2000);
    }
  };

  const handlePayFull = () => {
    if (bamboo < balance) return;
    handlePayment(balance);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-white" />
              <h2 className="text-white font-bold text-sm">Credit</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="px-3 py-3 space-y-3">
            {/* Score + APR row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Score</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold" style={{ color: ratingInfo.color }}>
                    {score}
                  </span>
                  <span
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${ratingInfo.color}20`, color: ratingInfo.color }}
                  >
                    {ratingInfo.rating}
                  </span>
                  {lastScoreChange !== null && (
                    <motion.span
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[10px] font-medium ${lastScoreChange > 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {lastScoreChange > 0 ? '+' : ''}
                      {lastScoreChange}
                    </motion.span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">APR</p>
                <p className="text-base font-bold text-gray-900 dark:text-white">
                  {(apr * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Balance / Limit */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Balance</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {Math.round(balance)}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Available</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                  {availableCredit}
                </p>
              </div>
            </div>

            {/* Utilization bar */}
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-gray-500 dark:text-gray-400">Utilization</span>
                <span
                  className={
                    utilizationPercent >= 70
                      ? 'text-red-500 font-bold'
                      : 'text-gray-600 dark:text-gray-300 font-medium'
                  }
                >
                  {utilizationPercent}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    utilizationPercent >= 90
                      ? 'bg-red-500'
                      : utilizationPercent >= 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, utilizationPercent)}%` }}
                />
              </div>
            </div>

            {/* Payment due */}
            {balance > 0 && (
              <div
                className={`rounded-lg px-2.5 py-2 flex items-center justify-between ${
                  isOverdue ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Min due</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{minPaymentDue}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" />
                    Due in
                  </p>
                  <p
                    className={`text-sm font-bold ${isOverdue ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}
                  >
                    {timeUntilDue}
                  </p>
                </div>
              </div>
            )}

            {isOverdue && (
              <div className="px-2 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="text-[11px] text-red-700 dark:text-red-300">
                  Overdue! Late fees and score penalties apply.
                </span>
              </div>
            )}

            {/* Payment actions */}
            {showPaymentSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-2"
              >
                <p className="text-green-600 dark:text-green-400 font-medium text-sm">
                  <ThemedEmoji emoji="✅" className="h-[1em] w-[1em]" /> Payment successful
                </p>
              </motion.div>
            ) : balance > 0 ? (
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  <button
                    data-tutorial="credit-pay-minimum"
                    onClick={handlePayMinimum}
                    disabled={bamboo < minPaymentDue}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium text-xs transition-colors ${
                      bamboo >= minPaymentDue
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Pay Min ({minPaymentDue})
                  </button>
                  <button
                    onClick={handlePayFull}
                    disabled={bamboo < balance}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-medium text-xs transition-colors ${
                      bamboo >= balance
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Pay Full ({Math.round(balance)})
                  </button>
                </div>

                <div className="flex gap-1.5">
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Custom"
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => handlePayment(Number(paymentAmount))}
                    disabled={
                      !paymentAmount || Number(paymentAmount) <= 0 || bamboo < Number(paymentAmount)
                    }
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                      paymentAmount && Number(paymentAmount) > 0 && bamboo >= Number(paymentAmount)
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Pay
                  </button>
                </div>

                <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                  Bamboo: {Math.round(bamboo)}
                </p>
              </div>
            ) : (
              <p className="text-green-600 dark:text-green-400 font-medium text-sm text-center py-1">
                <ThemedEmoji emoji="🎉" className="h-[1em] w-[1em]" /> No balance due
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreditCardPanel;
