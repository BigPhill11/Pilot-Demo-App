import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUp,
  Trash2,
  Info,
  Coins,
  TrendingUp,
  Shield,
  Zap,
  Users,
  RefreshCw,
  CreditCard,
  Clock,
} from 'lucide-react';
import {
  PlacedBuilding,
  BUILDING_DEFINITIONS,
  getBuildingStats,
  getUpgradeCost,
} from '../buildings/BuildingTypes';
import { getUpgradeDurationSeconds } from '../buildings/buildingTiming';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore } from '@/store/useCreditStore';
import { useBaseLayoutStore } from '@/store/useBaseLayoutStore';
import { getBuildingCollectThresholdFor, isBuildingCollectionReady } from '../systems/economy';

interface BuildingInfoPanelProps {
  building: PlacedBuilding | null;
  onClose: () => void;
  onCollect: (buildingId: string) => void;
  onUpgrade?: () => void;
  onDojoProgram?: (program: DojoProgram) => boolean;
  dojoCooldowns?: Record<string, number>;
}

export type DojoProgram = 'meditation' | 'workout' | 'happy_hour';

const DOJO_PROGRAMS: Array<{
  id: DojoProgram;
  label: string;
  description: string;
  effect: string;
  tutorialTarget?: string;
}> = [
  {
    id: 'meditation',
    label: 'Meditation',
    description: 'A focused rest break that restores productivity right away.',
    effect: '+12 productivity',
    tutorialTarget: 'dojo-meditation',
  },
  {
    id: 'workout',
    label: 'Workout',
    description: 'Movement boosts morale and creates a short production lift.',
    effect: 'Productivity + production event',
  },
  {
    id: 'happy_hour',
    label: 'Happy Hour',
    description: 'A social event that improves morale and networking energy.',
    effect: 'Social production boost',
  },
];

const BuildingInfoPanel: React.FC<BuildingInfoPanelProps> = ({
  building,
  onClose,
  onCollect,
  onUpgrade,
  onDojoProgram,
  dojoCooldowns = {},
}) => {
  const [showEducational, setShowEducational] = useState(false);
  const xp = useGameStore((state) => state.xp);
  const addXp = useGameStore((state) => state.addXp);
  const upgradeBuilding = useBaseLayoutStore((state) => state.upgradeBuilding);
  const removeBuilding = useBaseLayoutStore((state) => state.removeBuilding);
  const {
    chargeEmpireExpense,
    enabled: creditEnabled,
    balance: creditBalance,
    limit: creditLimit,
  } = useCreditStore();

  if (!building) return null;

  const def = BUILDING_DEFINITIONS[building.type];
  const stats = getBuildingStats(building.type, building.level);
  const nextLevelStats = getBuildingStats(building.type, building.level + 1);
  const upgradeCost = getUpgradeCost(building.type, building.level);
  const upgradeSeconds = getUpgradeDurationSeconds(building.type, building.level, xp);
  const availableCredit = creditLimit - creditBalance;
  const isBusy = building.status === 'constructing' || building.status === 'upgrading';
  const canUpgrade =
    building.status === 'active' &&
    building.level < def.maxLevel &&
    creditEnabled &&
    upgradeCost <= availableCredit;
  const pendingAmount = Math.round(building.pendingCollection || 0);
  const MIN_COLLECT_THRESHOLD = getBuildingCollectThresholdFor(building.type);
  const canCollect = isBuildingCollectionReady(building.type, building.pendingCollection || 0);
  const hasCollection = pendingAmount > 0;
  const now = Date.now();

  const handleUpgrade = () => {
    if (!canUpgrade) return;
    const charge = chargeEmpireExpense(upgradeCost);
    if (!charge.success) return;
    const started = upgradeBuilding(building.id, xp);
    if (started) {
      onUpgrade?.();
      onClose();
    }
  };

  const handleDemolish = () => {
    if (
      confirm(
        `Are you sure you want to demolish this ${def.name}? You will receive ${Math.floor(def.cost * 0.5)} coins back.`,
      )
    ) {
      removeBuilding(building.id);
      onClose();
    }
  };

  const handleConvertToXP = () => {
    if (building.type !== 'trading_post' || !stats.xpConversionRate || isBusy) return;
    const conversionCost = 50;
    const charge = chargeEmpireExpense(conversionCost);
    if (charge.success) {
      const xpGained = Math.floor(conversionCost * stats.xpConversionRate);
      addXp(xpGained);
    }
  };

  const getPhilTip = () => {
    const tips: Record<string, string> = {
      bamboo_farm:
        'Build multiple farms to maximize your income! Just like having multiple income streams in real life, diversification helps you grow faster.',
      storage:
        'Always build storage before your coins overflow! In real life, this is like having an emergency fund - you need capacity to save before you can save.',
      bank:
        "The bank's interest compounds over time. The earlier you build it, the more you'll earn! This is the power of starting to invest early.",
      market_stall:
        'Markets can be unpredictable, but that\'s what makes them exciting! In real investing, some volatility can lead to higher returns over time.',
      insurance_hut:
        "Insurance might seem like an expense, but it's really peace of mind. One bad event without protection can wipe out months of progress!",
      training_dojo:
        "Education, health, and rest are all productivity investments. The dojo helps your empire grow without pretending nonstop grinding is sustainable.",
      trading_post:
        'Sometimes spending money strategically is better than hoarding it. Smart investments in growth can multiply your returns.',
      panda_house:
        'To grow big, you need to build capacity first. Every successful business invests in infrastructure before scaling up.',
    };
    return tips[building.type] || 'Keep building and learning!';
  };

  return (
    <AnimatePresence>
      {building && (
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{def.emoji}</span>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">{def.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Level {building.level} / {def.maxLevel}
                    </p>
                    <div className="flex gap-0.5">
                      {[...Array(def.maxLevel)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < building.level ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      building.status === 'active'
                        ? 'bg-green-500 animate-pulse'
                        : 'bg-yellow-500'
                    }`}
                  />
                  <span className="capitalize font-medium text-sm">{building.status}</span>
                  {isBusy && (
                    <span className="text-xs text-amber-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      In progress
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{def.description}</p>
              </div>

              <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
                  Current Stats
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats.production && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="text-xs text-gray-500">Production</div>
                        <div className="font-bold text-amber-600">+{stats.production}/hr</div>
                      </div>
                    </div>
                  )}
                  {stats.storage && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="text-xs text-gray-500">Capacity</div>
                        <div className="font-bold text-blue-600">+{stats.storage}</div>
                      </div>
                    </div>
                  )}
                  {stats.interestRate && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="text-xs text-gray-500">Interest</div>
                        <div className="font-bold text-emerald-600">
                          +{stats.interestRate.toFixed(1)}%/hr
                        </div>
                      </div>
                    </div>
                  )}
                  {stats.eventProtection && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <Shield className="w-4 h-4 text-indigo-500" />
                      <div>
                        <div className="text-xs text-gray-500">Protection</div>
                        <div className="font-bold text-indigo-600">
                          -{stats.eventProtection}% dmg
                        </div>
                      </div>
                    </div>
                  )}
                  {stats.productionBoost && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <Zap className="w-4 h-4 text-pink-500" />
                      <div>
                        <div className="text-xs text-gray-500">Farm Boost</div>
                        <div className="font-bold text-pink-600">+{stats.productionBoost}%</div>
                      </div>
                    </div>
                  )}
                  {stats.xpConversionRate && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <RefreshCw className="w-4 h-4 text-purple-500" />
                      <div>
                        <div className="text-xs text-gray-500">XP Rate</div>
                        <div className="font-bold text-purple-600">{stats.xpConversionRate}x</div>
                      </div>
                    </div>
                  )}
                  {stats.buildingSlots && (
                    <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <Users className="w-4 h-4 text-cyan-500" />
                      <div>
                        <div className="text-xs text-gray-500">Slots</div>
                        <div className="font-bold text-cyan-600">+{stats.buildingSlots}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {hasCollection && (
                <div className="mb-4">
                  <motion.button
                    data-tutorial="building-info-collect"
                    onClick={() => canCollect && !isBusy && onCollect(building.id)}
                    disabled={!canCollect || isBusy}
                    className={`w-full p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg ${
                      canCollect && !isBusy
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white cursor-pointer'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={canCollect && !isBusy ? { scale: 1.02 } : {}}
                    whileTap={canCollect && !isBusy ? { scale: 0.98 } : {}}
                  >
                    <Coins className="w-5 h-5" />
                    {canCollect
                      ? `Collect ${pendingAmount} Coins!`
                      : `${pendingAmount} / ${MIN_COLLECT_THRESHOLD} coins (min to collect)`}
                  </motion.button>
                </div>
              )}

              {building.type === 'training_dojo' && (
                <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                        Dojo Programs
                      </div>
                      <p className="text-xs text-emerald-700/80 dark:text-emerald-200/80">
                        Rest, training, and social connection keep production sustainable.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {DOJO_PROGRAMS.map((program) => {
                      const cooldownUntil = dojoCooldowns[program.id] ?? 0;
                      const remainingMs = Math.max(0, cooldownUntil - now);
                      const isCoolingDown = remainingMs > 0;
                      const remainingMinutes = Math.ceil(remainingMs / 60000);
                      const disabled = isBusy || isCoolingDown || !onDojoProgram;

                      return (
                        <motion.button
                          key={program.id}
                          type="button"
                          data-tutorial={program.tutorialTarget}
                          onClick={() => {
                            if (!disabled) onDojoProgram?.(program.id);
                          }}
                          disabled={disabled}
                          className={`rounded-xl p-3 text-left shadow-sm transition-all ${
                            disabled
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                              : 'bg-white/80 dark:bg-gray-800/70 text-emerald-900 dark:text-emerald-100 hover:shadow-md'
                          }`}
                          whileHover={!disabled ? { scale: 1.02 } : {}}
                          whileTap={!disabled ? { scale: 0.98 } : {}}
                        >
                          <div className="text-sm font-bold">{program.label}</div>
                          <p className="mt-1 text-xs opacity-80">{program.description}</p>
                          <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                            {isCoolingDown ? `Ready in ${remainingMinutes}m` : program.effect}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {building.type === 'trading_post' && stats.xpConversionRate && (
                <div className="mb-4">
                  <motion.button
                    onClick={handleConvertToXP}
                    disabled={isBusy || !creditEnabled || 50 > availableCredit}
                    className={`w-full p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg ${
                      !isBusy && creditEnabled && 50 <= availableCredit
                        ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white cursor-pointer'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={
                      !isBusy && creditEnabled && 50 <= availableCredit ? { scale: 1.02 } : {}
                    }
                    whileTap={
                      !isBusy && creditEnabled && 50 <= availableCredit ? { scale: 0.98 } : {}
                    }
                  >
                    <RefreshCw className="w-5 h-5" />
                    Charge 50 to card → {Math.floor(50 * stats.xpConversionRate)} XP
                  </motion.button>
                </div>
              )}

              {building.level < def.maxLevel && (
                <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
                      Upgrade to Level {building.level + 1}
                    </span>
                    <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-white/50 dark:bg-gray-800/50">
                      <CreditCard className="w-4 h-4 text-indigo-500" />
                      <span
                        className={
                          canUpgrade ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'
                        }
                      >
                        {upgradeCost}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-300 mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Upgrade time: {upgradeSeconds}s
                  </p>

                  <div className="space-y-1 text-sm">
                    {nextLevelStats.production && stats.production && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        Production: {stats.production} →{' '}
                        <span className="font-bold">{nextLevelStats.production}</span>
                      </div>
                    )}
                    {nextLevelStats.storage && stats.storage && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        Storage: {stats.storage} →{' '}
                        <span className="font-bold">{nextLevelStats.storage}</span>
                      </div>
                    )}
                    {nextLevelStats.interestRate && stats.interestRate && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        Interest: {stats.interestRate.toFixed(1)}% →{' '}
                        <span className="font-bold">{nextLevelStats.interestRate.toFixed(1)}%</span>
                      </div>
                    )}
                    {nextLevelStats.eventProtection && stats.eventProtection && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        Protection: {stats.eventProtection}% →{' '}
                        <span className="font-bold">{nextLevelStats.eventProtection}%</span>
                      </div>
                    )}
                    {nextLevelStats.productionBoost && stats.productionBoost && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        Boost: {stats.productionBoost}% →{' '}
                        <span className="font-bold">{nextLevelStats.productionBoost}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mb-4">
                <motion.button
                  type="button"
                  data-tutorial="building-info-upgrade"
                  onClick={handleUpgrade}
                  disabled={!canUpgrade}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    canUpgrade
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={canUpgrade ? { scale: 1.05 } : {}}
                  whileTap={canUpgrade ? { scale: 0.95 } : {}}
                >
                  <ArrowUp className="w-5 h-5" />
                  <span className="text-xs font-medium">Upgrade</span>
                </motion.button>

                <motion.button
                  onClick={() => setShowEducational(true)}
                  className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex flex-col items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Info className="w-5 h-5" />
                  <span className="text-xs font-medium">Learn</span>
                </motion.button>

                <motion.button
                  onClick={handleDemolish}
                  disabled={isBusy}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1 ${
                    isBusy
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-br from-red-500 to-rose-500 text-white'
                  }`}
                  whileHover={!isBusy ? { scale: 1.05 } : {}}
                  whileTap={!isBusy ? { scale: 0.95 } : {}}
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-xs font-medium">Demolish</span>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showEducational && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-white dark:bg-gray-900 p-4 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Learn About {def.name}</h3>
                    <button
                      onClick={() => setShowEducational(false)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-6xl text-center mb-4">{def.emoji}</div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 mb-4">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                      Real-World Connection
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {def.educationalDescription}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🐼</span>
                      <h4 className="font-bold text-blue-700 dark:text-blue-400">Phil's Tip</h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{getPhilTip()}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BuildingInfoPanel;
