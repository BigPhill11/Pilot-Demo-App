import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Coins, Sparkles, Zap } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { useBaseLayoutStore } from '@/store/useBaseLayoutStore';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GameStatusCard: React.FC = () => {
  const initialized = useGameStore((s) => s.initialized);
  const bamboo = useGameStore((s) => s.bamboo);
  const xp = useGameStore((s) => s.xp);
  const energy = useGameStore((s) => s.energy);
  const getStorageCapacity = useGameStore((s) => s.getStorageCapacity);
  const buildingCount = useBaseLayoutStore((s) => s.buildings.length);

  if (!initialized) {
    return (
      <div
        className="max-w-xl mx-auto rounded-2xl border border-green-200/80 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-emerald-900/40 dark:bg-gray-900/50"
        aria-busy="true"
        aria-label="Loading game status"
      >
        <div className="h-5 w-40 animate-pulse rounded bg-green-100 dark:bg-gray-700" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-green-50 dark:bg-gray-800" />
        <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-green-50 dark:bg-gray-800" />
      </div>
    );
  }

  const capacity = getStorageCapacity();
  const bambooPercent = capacity > 0 ? Math.min(100, (bamboo / capacity) * 100) : 0;

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-green-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-emerald-900/40 dark:bg-gray-900/60">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-green-800 dark:text-emerald-200">Your Bamboo Empire</h2>
          <p className="mt-1 text-sm text-green-600 dark:text-emerald-400/90">
            {buildingCount === 0
              ? 'Place your first building and start earning bamboo.'
              : `${buildingCount} structure${buildingCount === 1 ? '' : 's'} on your base`}
          </p>
        </div>
        <Building2 className="h-10 w-10 shrink-0 text-green-600/80 dark:text-emerald-400/80" aria-hidden />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-green-50/90 px-4 py-3 dark:bg-gray-800/80">
          <div className="flex items-center gap-2 text-green-700 dark:text-emerald-300">
            <Coins className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Bamboo</span>
          </div>
          <p className="mt-1 font-bold tabular-nums text-green-900 dark:text-white">
            {Math.floor(bamboo).toLocaleString()}
          </p>
          <Progress value={bambooPercent} className="mt-2 h-1.5 bg-green-200/80 dark:bg-gray-700" />
          <p className="mt-1 text-xs text-green-600/90 dark:text-emerald-400/80">
            {Math.floor(bamboo).toLocaleString()} / {Math.floor(capacity).toLocaleString()} storage
          </p>
        </div>

        <div className="rounded-xl bg-purple-50/90 px-4 py-3 dark:bg-gray-800/80">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">XP</span>
          </div>
          <p className="mt-1 font-bold tabular-nums text-purple-900 dark:text-white">
            {Math.floor(xp).toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-amber-50/90 px-4 py-3 dark:bg-gray-800/80">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Energy</span>
          </div>
          <p
            className={cn(
              'mt-1 font-bold tabular-nums',
              energy > 60 ? 'text-amber-900 dark:text-amber-100' : energy > 30 ? 'text-orange-800 dark:text-orange-200' : 'text-red-800 dark:text-red-200',
            )}
          >
            {Math.floor(energy)}%
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link to="/empire" className="inline-flex items-center gap-2">
            Open empire
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default GameStatusCard;
