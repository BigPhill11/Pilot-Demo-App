import React, { useState, useCallback } from 'react';
import MISectionHeader from './shell/MISectionHeader';
import MIModuleCard from './shell/MIModuleCard';
import MIBossGameCard from './shell/MIBossGameCard';
import MILessonContainer from './lesson/MILessonContainer';
import PhilsNewsRoom from './boss/PhilsNewsRoom';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';
import { getHeadlinesLesson } from '@/data/market-intelligence/headlines-lessons';
import type { MILesson } from '@/types/mi-lesson';

const MarketsHeadlinesView: React.FC = () => {
  const { getModuleProgress, completeModule, getSectionProgress } = useMarketIntelligenceProgress();
  const [activeLesson, setActiveLesson] = useState<MILesson | null>(null);
  const [bossActive, setBossActive] = useState(false);

  const modules = MARKET_INTELLIGENCE_CATALOG.marketsHeadlines;
  const sectionProg = getSectionProgress('markets-headlines');

  const handleStartLesson = useCallback((moduleId: string) => {
    const lesson = getHeadlinesLesson(moduleId);
    if (lesson) {
      setActiveLesson(lesson);
    }
  }, []);

  const handleLessonComplete = useCallback((moduleId: string) => {
    completeModule(moduleId);
    setActiveLesson(null);
  }, [completeModule]);

  const handleExitLesson = useCallback(() => setActiveLesson(null), []);

  if (bossActive) {
    return (
      <PhilsNewsRoom
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
        icon="📰"
        title="Markets & Headlines"
        intro="Learn to decode financial news without panic, separate signal from noise, understand what companies reveal in earnings calls, and read market sentiment like a professional."
        accent="newsprint"
        chips={[
          { icon: '🗞️', label: `${modules.length} modules` },
          { icon: '⏱️', label: '~96 min total' },
          { icon: '🎯', label: 'Signal vs. Noise' },
        ]}
        progressCompleted={sectionProg.completed}
        progressTotal={sectionProg.total}
        stripeContent={
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-green-700 mb-0.5">
              The Financial Times of Bamboo City
            </div>
            <div className="text-2xl font-serif font-black text-green-900 tracking-tight">
              Markets & Headlines
            </div>
            <div className="text-xs text-green-600 mt-0.5">
              Vol. XXIII · Learn to Read the Language of Money · Est. 2024
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const hasLesson = Boolean(getHeadlinesLesson(module.id));
          return (
            <MIModuleCard
              key={module.id}
              module={module}
              progress={getModuleProgress(module.id)}
              accent="newsprint"
              onStartLesson={hasLesson ? handleStartLesson : undefined}
              onComplete={hasLesson ? undefined : () => completeModule(module.id)}
            />
          );
        })}
      </div>

      <MIBossGameCard
        icon="📺"
        title="Phil's News Room"
        description="Sort headlines before broadcast — signal, noise, or clickbait. 3-minute rapid-fire."
        accent="newsprint"
        sectionPercent={sectionProg.percentage}
        unlocked={sectionProg.percentage === 100}
        completed={false}
        onPlay={() => setBossActive(true)}
      />
    </div>
  );
};

export default MarketsHeadlinesView;
