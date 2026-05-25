import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Sparkles } from 'lucide-react';
import type { EventHistoryEntry } from '../systems/EventManager';

interface OfflineAwaySummaryProps {
  isOpen: boolean;
  events: EventHistoryEntry[];
  onClose: () => void;
}

const OfflineAwaySummary: React.FC<OfflineAwaySummaryProps> = ({
  isOpen,
  events,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && events.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">While you were away</h2>
              <p className="text-indigo-100 text-sm mt-1">
                {events.length} economic event{events.length > 1 ? 's' : ''} affected your empire
              </p>
            </div>

            <ul className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
              {events.map((entry) => (
                <li
                  key={entry.event.id}
                  className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800"
                >
                  <span className="text-2xl">{entry.event.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {entry.event.name}
                      </span>
                      {entry.event.isNegative ? (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {entry.event.description}
                    </p>
                    {entry.mitigated && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                        Insurance reduced the impact
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineAwaySummary;
