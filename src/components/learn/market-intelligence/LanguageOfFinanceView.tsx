import React, { useState, useCallback, useEffect } from 'react';
import MIModuleCard from './shell/MIModuleCard';
import MIBossGameCard from './shell/MIBossGameCard';
import MILessonContainer from './lesson/MILessonContainer';
import PhilsBoardroom from './boss/PhilsBoardroom';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';
import { getLanguageOfFinanceLesson } from '@/data/market-intelligence/language-of-finance-lessons';
import type { MILesson } from '@/types/mi-lesson';

interface LanguageOfFinanceViewProps {
  initialModuleId?: string | null;
  onInitialModuleConsumed?: () => void;
}

const LanguageOfFinanceView: React.FC<LanguageOfFinanceViewProps> = ({
  initialModuleId,
  onInitialModuleConsumed,
}) => {
  const { getModuleProgress, completeModule, getSectionProgress } = useMarketIntelligenceProgress();
  const [activeLesson, setActiveLesson] = useState<MILesson | null>(null);
  const [bossActive, setBossActive] = useState(false);

  const allModules = MARKET_INTELLIGENCE_CATALOG.languageOfFinance;
  const coreModules = allModules.filter((m) => m.order <= 4);
  const accountingModules = allModules.filter((m) => m.order > 4 && m.order <= 8);
  const advancedModules = allModules.filter((m) => m.order > 8);

  const sectionProg = getSectionProgress('language-finance');

  const handleStartLesson = useCallback((moduleId: string) => {
    const lesson = getLanguageOfFinanceLesson(moduleId);
    if (lesson) setActiveLesson(lesson);
  }, []);

  useEffect(() => {
    if (initialModuleId) {
      handleStartLesson(initialModuleId);
      onInitialModuleConsumed?.();
    }
  }, [initialModuleId, handleStartLesson, onInitialModuleConsumed]);

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
      <PhilsBoardroom
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
      {/* Section header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200">
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-green-300 to-emerald-200" />
        <div className="relative z-10 p-6 pl-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-200">
              <span className="text-3xl">📖</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Language of Finance</h2>
              <p className="text-green-700/80 max-w-2xl">
                ~10-minute visual lessons with practice activities, career connections, and quizzes.
                Start with <strong>Income Statement Decoded</strong> for the full pilot experience.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Revenue', 'Net Income', 'EBITDA', 'Beta', 'Valuation', 'M&A'].map((term) => (
              <span
                key={term}
                className="px-2 py-1 rounded bg-green-100 border border-green-200 text-green-700 text-xs font-mono"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Core modules */}
      <div>
        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">Career & Industry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreModules.map((module) => {
            const hasLesson = Boolean(getLanguageOfFinanceLesson(module.id));
            return (
              <MIModuleCard
                key={module.id}
                module={module}
                progress={getModuleProgress(module.id)}
                accent="emerald"
                onStartLesson={hasLesson ? handleStartLesson : undefined}
                onComplete={hasLesson ? undefined : () => completeModule(module.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Accounting modules */}
      <div>
        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">Accounting & Reporting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accountingModules.map((module) => {
            const hasLesson = Boolean(getLanguageOfFinanceLesson(module.id));
            return (
              <MIModuleCard
                key={module.id}
                module={module}
                progress={getModuleProgress(module.id)}
                accent="emerald"
                onStartLesson={hasLesson ? handleStartLesson : undefined}
                onComplete={hasLesson ? undefined : () => completeModule(module.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Advanced modules */}
      <div>
        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">Advanced Finance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advancedModules.map((module) => {
            const hasLesson = Boolean(getLanguageOfFinanceLesson(module.id));
            return (
              <MIModuleCard
                key={module.id}
                module={module}
                progress={getModuleProgress(module.id)}
                accent="emerald"
                onStartLesson={hasLesson ? handleStartLesson : undefined}
                onComplete={hasLesson ? undefined : () => completeModule(module.id)}
              />
            );
          })}
        </div>
      </div>

      <MIBossGameCard
        icon="🏛️"
        title="Phil's Boardroom"
        description="Sit in on a mock investment committee. Read deal briefs, answer 3 questions, and make the call."
        accent="emerald"
        sectionPercent={sectionProg.percentage}
        unlocked={sectionProg.percentage === 100}
        completed={false}
        onPlay={() => setBossActive(true)}
      />
    </div>
  );
};

export default LanguageOfFinanceView;
