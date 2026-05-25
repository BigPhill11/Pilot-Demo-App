import React, { useState, useCallback } from 'react';
import MISectionHeader from './shell/MISectionHeader';
import MIModuleCard from './shell/MIModuleCard';
import MIBossGameCard from './shell/MIBossGameCard';
import MILessonContainer from './lesson/MILessonContainer';
import TenYearChallenge from './boss/TenYearChallenge';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';
import { getOwnershipLesson } from '@/data/market-intelligence/ownership-lessons';
import type { MILesson } from '@/types/mi-lesson';

const OwnershipView: React.FC = () => {
  const { getModuleProgress, completeModule, getSectionProgress } = useMarketIntelligenceProgress();
  const modules = MARKET_INTELLIGENCE_CATALOG.ownership;
  const [activeLesson, setActiveLesson] = useState<MILesson | null>(null);
  const [bossActive, setBossActive] = useState(false);

  const sectionProg = getSectionProgress('ownership');

  const handleStartLesson = useCallback((moduleId: string) => {
    const lesson = getOwnershipLesson(moduleId);
    if (lesson) setActiveLesson(lesson);
  }, []);

  const handleLessonComplete = useCallback(
    (moduleId: string) => {
      completeModule(moduleId);
      setActiveLesson(null);
    },
    [completeModule]
  );

  const handleExitLesson = useCallback(() => setActiveLesson(null), []);

  if (bossActive) {
    return (
      <TenYearChallenge
        onComplete={() => setBossActive(false)}
        onExit={() => setBossActive(false)}
      />
    );
  }

  if (activeLesson) {
    return (
      <MILessonContainer
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
      />
    );
  }

  return (
    <div className="space-y-6">
      <MISectionHeader
        icon="🏛️"
        title="Ownership"
        intro="The wealth-building mindset. Understand what it truly means to own stock, how time works as your ally, and why patience consistently beats reaction."
        accent="gold"
        chips={[
          { icon: '📅', label: `${modules.length} modules` },
          { icon: '⏱️', label: '~100 min total' },
          { icon: '🌱', label: 'Compound Growth' },
        ]}
        progressCompleted={sectionProg.completed}
        progressTotal={sectionProg.total}
        stripeContent={
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-2xl">📅</span>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Today → 10 Years → Financial Freedom</div>
              <div className="text-sm text-amber-800 mt-0.5">Time is the only edge that can't be bought</div>
            </div>
            <span className="text-2xl">🌟</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const hasLesson = Boolean(getOwnershipLesson(module.id));
          return (
            <MIModuleCard
              key={module.id}
              module={module}
              progress={getModuleProgress(module.id)}
              accent="gold"
              onStartLesson={hasLesson ? handleStartLesson : undefined}
              onComplete={hasLesson ? undefined : () => completeModule(module.id)}
            />
          );
        })}
      </div>

      <MIBossGameCard
        icon="📈"
        title="Phil's 10-Year Challenge"
        description="Simulate 10 years of market events — hold, add, sell, or rebalance. See compound growth in action."
        accent="gold"
        sectionPercent={sectionProg.percentage}
        unlocked={sectionProg.percentage === 100}
        completed={false}
        onPlay={() => setBossActive(true)}
      />
    </div>
  );
};

export default OwnershipView;
