import React, { useState, useEffect } from 'react';
import { ChevronRight, Flame, Star, Trophy, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  VILLAGE_ASSET_VERSION,
  VILLAGE_BUILDING_ASSETS,
} from './market-intelligence/village/village-assets';
import VillageModuleView from './market-intelligence/village/VillageModuleView';
import { VILLAGE_MODULES, getVillageModule } from '@/data/village-lessons';
import { useVillageLessonProgress } from '@/hooks/useVillageLessonProgress';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { recordPathTouched } from '@/hooks/useDashboardProgress';
import { consumeDashboardDeepLink } from '@/lib/dashboardDeepLink';
import { ThemedEmoji } from '@/components/ui/themed-icons';

/* ─── Module theme colors for building directory cards ─── */
const CARD_THEMES: Record<string, {
  gradient: string;
  border: string;
  icon: string;
  badge: string;
}> = {
  'business-economics':   { gradient: 'from-slate-700 to-slate-600',   border: 'border-slate-300', icon: '🏛️', badge: 'bg-slate-600' },
  'ownership':            { gradient: 'from-amber-600 to-yellow-500',  border: 'border-amber-300', icon: '🏦', badge: 'bg-amber-600' },
  'language-finance':     { gradient: 'from-violet-700 to-purple-600', border: 'border-violet-300', icon: '📚', badge: 'bg-violet-600' },
  'markets-headlines':    { gradient: 'from-teal-700 to-emerald-600',  border: 'border-teal-300',   icon: '📡', badge: 'bg-teal-600'   },
  'business-foundations': { gradient: 'from-orange-700 to-amber-600',  border: 'border-orange-300', icon: '⚒️', badge: 'bg-orange-600' },
  'company-tinder':       { gradient: 'from-rose-700 to-pink-600',     border: 'border-rose-300',   icon: '🏪', badge: 'bg-rose-600'   },
};

const MarketIntelligenceTab: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const { totalXp, totalBamboo, getModuleProgress } = useVillageLessonProgress();
  const { currentStreak } = useUnifiedStreak();

  useEffect(() => {
    recordPathTouched('companyDiscovery');
  }, []);

  useEffect(() => {
    const intent = consumeDashboardDeepLink();
    if (!intent || intent.targetTab !== 'companies') return;
    if (intent.sectionId) setActiveModuleId(intent.sectionId);
  }, []);

  /* ─── Overall progress ─── */
  const overallProgress = (() => {
    let completed = 0;
    let total = 0;
    for (const m of VILLAGE_MODULES) {
      if (m.isSwipeGame) continue;
      const prog = getModuleProgress(m.id, m.lessons.length);
      completed += prog.completed;
      total += prog.total;
    }
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  })();

  const getNextModule = () => {
    for (const m of VILLAGE_MODULES) {
      if (m.isSwipeGame) continue;
      const prog = getModuleProgress(m.id, m.lessons.length);
      if (prog.completed < prog.total) return m.id;
    }
    return VILLAGE_MODULES[0].id;
  };

  /* ─── Active module view ─── */
  const activeModule = activeModuleId ? getVillageModule(activeModuleId) : null;
  if (activeModule) {
    return (
      <div className="flex flex-col" style={{ minHeight: 500 }}>
        <VillageModuleView
          module={activeModule}
          onBack={() => setActiveModuleId(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-0">

      {/* ════════════════════════════════════════════
          HERO HEADER — Panda & Village entrance
      ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-800 shadow-xl mb-4">
        {/* Background forest texture */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22c55e 0%, transparent 40%)' }} />

        {/* Bamboo decorations */}
        <div className="absolute right-0 top-0 bottom-0 w-24 opacity-15 select-none pointer-events-none flex items-center justify-end pr-2">
          <span className="text-[80px]"><ThemedEmoji emoji="🎋" className="h-[1em] w-[1em]" /></span>
        </div>
        <div className="absolute left-0 bottom-0 opacity-10 select-none pointer-events-none">
          <span className="text-[60px]"><ThemedEmoji emoji="🌿" className="h-[1em] w-[1em]" /></span>
        </div>

        <div className="relative z-10 p-5">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Phil logo — only panda visual in this area */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                <PandaLogo className="h-11 w-11 object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-2xl font-bold text-white">Market Intelligence</h1>
                </div>
                <p className="text-green-300 text-sm">
                  Phil's Village of Financial Knowledge
                </p>
                <p className="text-green-400 text-xs mt-0.5">
                  Pick a building below to explore its lessons
                </p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-2">
            {currentStreak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-400/25 border border-orange-300/40">
                <Flame className="h-4 w-4 text-orange-300" />
                <span className="text-sm font-semibold text-orange-100">{currentStreak}-day streak</span>
              </div>
            )}
            {totalXp > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-300/30">
                <span className="text-sm">⚡</span>
                <span className="text-sm font-semibold text-yellow-100">{totalXp.toLocaleString()} XP</span>
              </div>
            )}
            {totalBamboo > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/20 border border-green-300/30">
                <span className="text-sm">🎋</span>
                <span className="text-sm font-semibold text-green-100">{totalBamboo.toLocaleString()} Bamboo</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 ml-auto">
              <Trophy className="h-3.5 w-3.5 text-white/70" />
              <span className="text-sm font-semibold text-white">{overallProgress}% done</span>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-3">
            <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full transition-all duration-1000"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="flex items-center justify-between px-5 py-3 bg-black/20 border-t border-white/10">
          <p className="text-xs text-green-300 font-medium">
            {overallProgress === 0 ? "Start your first lesson below" :
             overallProgress === 100 ? "🏆 You have completed the village!" :
             "Continue your journey — your empire grows with each lesson"}
          </p>
          <Button
            onClick={() => setActiveModuleId(getNextModule())}
            size="sm"
            className="bg-white text-green-800 hover:bg-green-50 font-bold shadow-md flex-shrink-0"
          >
            {overallProgress === 0 ? 'Begin' : 'Continue'}
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BUILDING DIRECTORY — village navigation
      ════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Building2 className="h-4 w-4 text-green-700" />
          <h2 className="text-sm font-bold text-gray-800">Building Directory</h2>
          <span className="text-xs text-gray-500 ml-1">— tap a building to start learning</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VILLAGE_MODULES.map(module => {
            const prog = module.isSwipeGame
              ? { completed: 0, total: 0, percent: 0 }
              : getModuleProgress(module.id, module.lessons.length);
            const theme = CARD_THEMES[module.id];
            const isComplete = !module.isSwipeGame && prog.percent === 100;
            const buildingImageSrc = `${VILLAGE_BUILDING_ASSETS[module.id]}?${VILLAGE_ASSET_VERSION}`;

            return (
              <button
                key={module.id}
                onClick={() => setActiveModuleId(module.id)}
                className="group relative text-left rounded-2xl border-2 bg-white overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                style={{ borderColor: isComplete ? '#22c55e' : undefined }}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} />

                <div className="p-3">
                  {/* Building image + name */}
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-sm flex-shrink-0 overflow-hidden`}>
                      <img
                        src={buildingImageSrc}
                        alt={`${module.name} building`}
                        className="h-full w-full object-contain scale-125"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 leading-tight">{module.name}</p>
                      <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-2">{module.tagline}</p>
                    </div>
                  </div>

                  {/* Progress / badge */}
                  {module.isSwipeGame ? (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold">Swipe Game</span>
                    </div>
                  ) : prog.total > 0 ? (
                    <div>
                      <div className="flex items-center justify-between text-[9px] text-gray-400 mb-1">
                        <span>{prog.completed}/{prog.total} lessons</span>
                        <span className="font-semibold text-gray-600">{prog.percent}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-700`}
                          style={{ width: `${prog.percent}%` }}
                        />
                      </div>
                      {isComplete && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="h-3 w-3 text-amber-400" />
                          <span className="text-[9px] text-amber-600 font-bold">Complete!</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/3 transition-colors rounded-2xl pointer-events-none" />

                {/* Enter arrow */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md`}>
                  <ChevronRight className="h-3 w-3 text-white" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          EMPIRE TEASER — bottom banner
      ════════════════════════════════════════════ */}
      <div className="mt-4 rounded-2xl overflow-hidden border-2 border-amber-200 shadow-sm">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-500 px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🏰</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Battle Empire</p>
            <p className="text-xs text-amber-100">Every lesson you complete adds to your empire</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 border border-white/30">
            <span className="text-xs font-bold text-white">{totalXp} XP</span>
          </div>
        </div>
        <div className="bg-amber-50 px-4 py-2.5 flex items-center gap-2">
          <span className="text-sm">🎋</span>
          <p className="text-xs text-amber-700">
            You have <strong>{totalBamboo} Bamboo</strong> — visit the Empire tab to build your kingdom!
          </p>
          <ChevronRight className="h-3.5 w-3.5 text-amber-400 ml-auto flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligenceTab;
