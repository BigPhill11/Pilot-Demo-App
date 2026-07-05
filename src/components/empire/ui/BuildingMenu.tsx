import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CreditCard, Clock, Grid3X3 } from 'lucide-react';
import {
  BuildingType,
  BUILDING_DEFINITIONS,
  isBuildingUnlocked,
} from '../buildings/BuildingTypes';
import { getBuildDurationSeconds } from '../buildings/buildingTiming';
import EmpireBuildingImage from '../buildings/EmpireBuildingImage';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore } from '@/store/useCreditStore';
import { useTeachBacksCompleted } from '@/hooks/useTeachBacksCompleted';

interface BuildingMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBuilding: (type: BuildingType) => void;
  /** When set, only this building type can be selected (tutorial). */
  lockToBuildingType?: BuildingType | null;
}

const BuildingMenu: React.FC<BuildingMenuProps> = ({
  isOpen,
  onClose,
  onSelectBuilding,
  lockToBuildingType = null,
}) => {
  const xp = useGameStore((state) => state.xp);
  const teachBacksCompleted = useTeachBacksCompleted();

  const { enabled: creditEnabled, balance: creditBalance, limit: creditLimit } = useCreditStore();
  const availableCredit = creditLimit - creditBalance;

  const buildings = Object.values(BUILDING_DEFINITIONS);

  const handleSelectBuilding = (type: BuildingType) => {
    if (lockToBuildingType && type !== lockToBuildingType) return;
    const def = BUILDING_DEFINITIONS[type];
    if (!isBuildingUnlocked(type, xp, teachBacksCompleted)) return;
    if (!creditEnabled || def.cost > availableCredit) return;

    onSelectBuilding(type);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[60vh] overflow-hidden"
            data-tutorial="building-menu"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Build New Structure
                </h2>
                <p className="text-xs text-indigo-600 dark:text-indigo-400">
                  Builds charge your card. Production creates bamboo. Use bamboo to pay debt down.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(60vh-60px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {buildings.map((building, index) => {
                  const isUnlocked = isBuildingUnlocked(building.id, xp, teachBacksCompleted);
                  const buildSeconds = getBuildDurationSeconds(building.id, 1, xp);
                  const canAffordWithCredit =
                    creditEnabled && building.cost <= availableCredit;
                  const lockedByTutorial =
                    lockToBuildingType !== null && building.id !== lockToBuildingType;
                  const isDisabled =
                    lockedByTutorial || !isUnlocked || !canAffordWithCredit;

                  return (
                    <motion.div
                      key={building.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleSelectBuilding(building.id)}
                        disabled={isDisabled}
                        data-tutorial={`building-${building.id}`}
                        className={`
                          w-full p-4 rounded-xl border-2 text-left transition-all
                          ${isDisabled
                            ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
                            : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 hover:shadow-lg hover:scale-[1.02]'
                          }
                        `}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex h-20 w-20 items-end justify-center rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30">
                            <EmpireBuildingImage
                              type={building.id}
                              size="md"
                              alt={building.name}
                            />
                          </div>
                          {!isUnlocked && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium">
                              <Lock className="w-3 h-3" />
                              {building.unlockTeachBacks != null && teachBacksCompleted < building.unlockTeachBacks
                                ? `Teach Phil ×${building.unlockTeachBacks} 🐼`
                                : `${building.unlockXP} XP`}
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {building.name}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {building.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <div
                            className={`
                            flex items-center gap-1 px-2 py-1 rounded-full
                            ${canAffordWithCredit
                              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            }
                          `}
                          >
                            <CreditCard className="w-3 h-3" />
                            {building.cost}
                          </div>

                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                            <Clock className="w-3 h-3" />
                            {buildSeconds}s
                          </div>

                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                            <Grid3X3 className="w-3 h-3" />
                            {building.size.width}x{building.size.height}
                          </div>
                        </div>

                        {building.baseProduction && (
                          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                            +{building.baseProduction} coins/hour
                          </div>
                        )}
                        {building.baseStorage && (
                          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                            +{building.baseStorage} storage capacity
                          </div>
                        )}
                        {building.baseInterestRate && (
                          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                            +{building.baseInterestRate}% interest/hour
                          </div>
                        )}
                        {building.eventProtection && (
                          <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                            -{building.eventProtection}% event damage
                          </div>
                        )}
                        {building.productionBoost && (
                          <div className="mt-2 text-xs text-pink-600 dark:text-pink-400">
                            +{building.productionBoost}% farm production
                          </div>
                        )}
                        {building.xpConversionRate && (
                          <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                            {building.xpConversionRate}x XP conversion
                          </div>
                        )}
                        {building.buildingSlots && (
                          <div className="mt-2 text-xs text-cyan-600 dark:text-cyan-400">
                            +{building.buildingSlots} building slots
                          </div>
                        )}

                        {isUnlocked && !canAffordWithCredit && (
                          <div className="mt-2 text-xs text-red-500 font-medium">
                            Need {building.cost - Math.floor(availableCredit)} more credit
                            available
                          </div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BuildingMenu;
