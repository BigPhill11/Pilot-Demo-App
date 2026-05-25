import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Check,
  Lock,
  Zap,
  HelpCircle,
  Trophy,
  Star,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type {
  BusinessEconomicsPathwayId,
  VillageModuleConfig,
  VillageLesson,
  VillageLessonSection,
} from '@/types/village-lesson';
import { useVillageLessonProgress } from '@/hooks/useVillageLessonProgress';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { emitDailyGoalEvent } from '@/lib/dailyGoalEvents';
import VillageLessonShell from './VillageLessonShell';
import CompanyTinderView from '../CompanyTinderView';

interface Props {
  module: VillageModuleConfig;
  onBack: () => void;
}

const MODULE_THEMES: Record<
  string,
  {
    gradient: string;
    accentBg: string;
    accentText: string;
    badgeBg: string;
    pandaMessage: string;
  }
> = {
  'business-economics': {
    gradient: 'from-slate-700 via-slate-600 to-slate-500',
    accentBg: 'bg-slate-100',
    accentText: 'text-slate-800',
    badgeBg: 'bg-slate-600',
    pandaMessage:
      'Economics is a life skill — micro choices, macro forces, and competition shape every dollar you earn or spend.',
  },
  ownership: {
    gradient: 'from-amber-700 via-amber-600 to-yellow-500',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-900',
    badgeBg: 'bg-amber-600',
    pandaMessage:
      'Investing and ownership: build real net worth, understand corporate power, and allocate like a long-term owner.',
  },
  'language-finance': {
    gradient: 'from-violet-800 via-violet-600 to-purple-500',
    accentBg: 'bg-violet-50',
    accentText: 'text-violet-900',
    badgeBg: 'bg-violet-700',
    pandaMessage:
      'Wall Street shows symptoms — charts and hype. Accounting is the source code. Learn the statements and you play the strategy game with your eyes open.',
  },
  'markets-headlines': {
    gradient: 'from-teal-800 via-teal-600 to-emerald-500',
    accentBg: 'bg-teal-50',
    accentText: 'text-teal-900',
    badgeBg: 'bg-teal-600',
    pandaMessage:
      "The news moves markets. Learn to decode headlines, Fed announcements, and market psychology like a pro.",
  },
  'business-foundations': {
    gradient: 'from-orange-700 via-orange-600 to-amber-500',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-900',
    badgeBg: 'bg-orange-600',
    pandaMessage:
      'Every great business follows the same strategic principles. Understand them and you will spot winners before the crowd.',
  },
  'company-tinder': {
    gradient: 'from-rose-700 via-rose-600 to-pink-500',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-900',
    badgeBg: 'bg-rose-600',
    pandaMessage:
      'Swipe right on companies you would invest in. Train your instincts through real company data.',
  },
};

const FLOW_STEPS = [
  { icon: BookOpen, label: 'Learn', color: 'bg-blue-100 text-blue-700' },
  { icon: Zap, label: 'Simulate', color: 'bg-orange-100 text-orange-700' },
  { icon: HelpCircle, label: 'Quiz', color: 'bg-purple-100 text-purple-700' },
  { icon: Trophy, label: 'Empire', color: 'bg-green-100 text-green-700' },
];

const PATHWAY_TAB_ACTIVE: Record<BusinessEconomicsPathwayId, string> = {
  microeconomics: 'bg-white text-slate-800 shadow-sm border-slate-300',
  macroeconomics: 'bg-white text-emerald-800 shadow-sm border-emerald-300',
  competition: 'bg-white text-amber-900 shadow-sm border-amber-300',
};

const SECTION_HEADER_STYLES: Record<
  VillageLessonSection,
  { emoji: string; bg: string; text: string }
> = {
  Microeconomics: { emoji: '🔬', bg: 'bg-blue-50', text: 'text-blue-800' },
  Macroeconomics: { emoji: '🌍', bg: 'bg-emerald-50', text: 'text-emerald-800' },
  Competition: { emoji: '🏢', bg: 'bg-amber-50', text: 'text-amber-800' },
  'Philosophy of Wealth': { emoji: '💎', bg: 'bg-violet-50', text: 'text-violet-800' },
  'Asset Ownership': { emoji: '🏛️', bg: 'bg-amber-50', text: 'text-amber-900' },
  Entrepreneurship: { emoji: '🚀', bg: 'bg-orange-50', text: 'text-orange-800' },
  'Portfolio Allocation': { emoji: '📊', bg: 'bg-emerald-50', text: 'text-emerald-800' },
};

function countCompleted(
  lessons: VillageLesson[],
  isLessonCompleted: (id: string) => boolean
) {
  const completed = lessons.filter((l) => isLessonCompleted(l.id)).length;
  const total = lessons.length;
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

/** Previous lesson in the same section (separate tracks unlock independently). */
function getPreviousLessonInSection(
  lessons: VillageLesson[],
  index: number
): VillageLesson | null {
  const current = lessons[index];
  if (!current.section) {
    return index > 0 ? lessons[index - 1] : null;
  }
  for (let i = index - 1; i >= 0; i--) {
    if (lessons[i].section === current.section) return lessons[i];
  }
  return null;
}

function isLessonLocked(
  lessons: VillageLesson[],
  index: number,
  hasSections: boolean,
  isLessonCompleted: (id: string) => boolean
): boolean {
  const previous = hasSections
    ? getPreviousLessonInSection(lessons, index)
    : index > 0
      ? lessons[index - 1]
      : null;
  if (!previous) return false;
  return !isLessonCompleted(previous.id);
}

function getNextUnlockedLesson(
  lessons: VillageLesson[],
  hasSections: boolean,
  isLessonCompleted: (id: string) => boolean
): VillageLesson | undefined {
  return lessons.find(
    (l, index) =>
      !isLessonCompleted(l.id) &&
      !isLessonLocked(lessons, index, hasSections, isLessonCompleted)
  );
}

const VillageModuleView: React.FC<Props> = ({ module, onBack }) => {
  const { isLessonCompleted, completeLesson, getModuleProgress } =
    useVillageLessonProgress();
  const { awardResources } = usePlatformIntegration();
  const { recordActivity } = useUnifiedStreak();
  const [activeLesson, setActiveLesson] = useState<VillageLesson | null>(null);

  const hasSections = module.lessons.some((l) => l.section != null);

  const hasPathways =
    !hasSections &&
    module.id === 'business-economics' &&
    module.pathways != null &&
    module.pathways.length > 0;

  const defaultPathwayId: BusinessEconomicsPathwayId =
    module.pathways?.[0]?.id ?? 'microeconomics';

  const [activePathwayId, setActivePathwayId] =
    useState<BusinessEconomicsPathwayId>(defaultPathwayId);

  const progress = getModuleProgress(module.id, module.lessons.length);
  const theme = MODULE_THEMES[module.id] ?? MODULE_THEMES['business-economics'];

  const pathwayLessons = useMemo(() => {
    if (hasSections || !hasPathways) return module.lessons;
    return module.lessons.filter((l) => l.pathwayId === activePathwayId);
  }, [hasSections, hasPathways, module.lessons, activePathwayId]);

  const pathwayProgress = useMemo(
    () => countCompleted(pathwayLessons, isLessonCompleted),
    [pathwayLessons, isLessonCompleted]
  );

  const activePathwayConfig = module.pathways?.find((p) => p.id === activePathwayId);

  if (module.isSwipeGame) {
    return (
      <div className="flex flex-col h-full">
        <div
          className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${theme.gradient}`}
        >
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <span className="text-2xl">{module.buildingEmoji}</span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-white">{module.name}</h2>
            <p className="text-xs text-white/70 truncate">{module.tagline}</p>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <CompanyTinderView />
        </div>
      </div>
    );
  }

  if (activeLesson) {
    return (
      <VillageLessonShell
        lesson={activeLesson}
        module={module}
        onBack={() => setActiveLesson(null)}
        onComplete={(xp, bamboo) => {
          completeLesson(activeLesson.id, xp, bamboo);
          emitDailyGoalEvent({
            type: 'lesson',
            pathId: 'companies',
            moduleId: module.id,
            lessonId: activeLesson.id,
          });
          emitDailyGoalEvent({ type: 'any_activity' });
          awardResources(bamboo, Math.floor(xp / 5), 'Village Lesson Complete', true);
          recordActivity();
          setActiveLesson(null);
        }}
      />
    );
  }

  const nextLesson = getNextUnlockedLesson(
    pathwayLessons,
    hasSections,
    isLessonCompleted
  );
  const pathwayComplete =
    pathwayLessons.length > 0 && pathwayProgress.percent === 100;
  const allComplete = progress.percent === 100;

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} flex-shrink-0`}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

        <div className="relative z-10 px-4 pt-4 pb-5">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <span className="text-sm text-white/70 font-medium">Building Directory</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl shadow-lg">
              {module.buildingEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white leading-tight">{module.name}</h1>
              <p className="text-sm text-white/75 mt-0.5">{module.tagline}</p>

              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                  <span>
                    {progress.completed} of {progress.total} lessons complete
                    {hasPathways && activePathwayConfig
                      ? ` · ${activePathwayConfig.label}`
                      : ''}
                  </span>
                  <span className="font-semibold text-white">{progress.percent}%</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-black/20 backdrop-blur-sm border-t border-white/10">
          <MessageCircle className="h-5 w-5 text-green-300 flex-shrink-0" aria-hidden />
          <p className="text-xs text-white/85 leading-relaxed italic">{theme.pandaMessage}</p>
        </div>
      </div>

      {hasPathways && module.pathways && (
        <div className={`${theme.accentBg} border-b border-gray-200 flex-shrink-0 px-3 py-3 space-y-2`}>
          <div className="grid grid-cols-3 gap-1.5">
            {module.pathways.map((pathway) => {
              const p = countCompleted(
                module.lessons.filter((l) => l.pathwayId === pathway.id),
                isLessonCompleted
              );
              const isActive = pathway.id === activePathwayId;
              return (
                <button
                  key={pathway.id}
                  type="button"
                  onClick={() => setActivePathwayId(pathway.id)}
                  className={`rounded-xl border px-2 py-2 text-left transition-all ${
                    isActive
                      ? PATHWAY_TAB_ACTIVE[pathway.id]
                      : 'border-transparent bg-white/60 text-gray-600 hover:bg-white/90'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm" aria-hidden>
                      {pathway.emoji}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold leading-tight truncate">
                      {pathway.label}
                    </span>
                  </div>
                  <p className="text-[9px] mt-0.5 opacity-80 line-clamp-2 hidden sm:block">
                    {pathway.summary}
                  </p>
                  <p className="text-[9px] mt-1 font-semibold">
                    {p.completed}/{p.total}
                  </p>
                </button>
              );
            })}
          </div>
          {activePathwayConfig && (
            <p className={`text-[11px] ${theme.accentText} px-1`}>
              {activePathwayConfig.summary}
            </p>
          )}
        </div>
      )}

      <div
        className={`flex items-center justify-center gap-1.5 px-4 py-2.5 ${theme.accentBg} border-b border-gray-200 flex-shrink-0`}
      >
        <span className="text-[10px] text-gray-500 font-medium mr-1">Each lesson:</span>
        {FLOW_STEPS.map((s, i) => (
          <React.Fragment key={s.label}>
            <span
              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${s.color}`}
            >
              <s.icon className="h-2.5 w-2.5" />
              {s.label}
            </span>
            {i < FLOW_STEPS.length - 1 && (
              <ChevronRight className="h-2.5 w-2.5 text-gray-300 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {hasPathways && pathwayComplete && !allComplete && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-50 border-b border-emerald-200 flex-shrink-0">
          <Star className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <p className="text-xs text-emerald-800 font-medium">
            {activePathwayConfig?.label} pathway complete — try another tab!
          </p>
        </div>
      )}

      {allComplete && (
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 flex-shrink-0">
          <Star className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-800">Building Complete!</p>
            <p className="text-xs text-amber-600">
              You have mastered all lessons in {module.name}.
            </p>
          </div>
          <span className="ml-auto text-2xl">🏆</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
        {pathwayLessons.map((lesson, index) => {
          const completed = isLessonCompleted(lesson.id);
          const locked = isLessonLocked(
            pathwayLessons,
            index,
            hasSections,
            isLessonCompleted
          );
          const sectionLessons = lesson.section
            ? pathwayLessons.filter((l) => l.section === lesson.section)
            : pathwayLessons;
          const nextInSection = getNextUnlockedLesson(
            sectionLessons,
            hasSections,
            isLessonCompleted
          );
          const isNext =
            !completed &&
            !locked &&
            nextInSection?.id === lesson.id;
          const prevSection =
            index > 0 ? pathwayLessons[index - 1].section : undefined;
          const showSectionHeader =
            hasSections &&
            lesson.section != null &&
            lesson.section !== prevSection;
          const sectionStyle = lesson.section
            ? SECTION_HEADER_STYLES[lesson.section]
            : null;

          return (
            <React.Fragment key={lesson.id}>
              {showSectionHeader && sectionStyle && (
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl ${sectionStyle.bg} border border-gray-200/80`}
                >
                  <span className="text-lg" aria-hidden>
                    {sectionStyle.emoji}
                  </span>
                  <h2 className={`text-sm font-bold ${sectionStyle.text}`}>
                    {lesson.section}
                  </h2>
                </div>
              )}
            <button
              disabled={locked}
              onClick={() => !locked && setActiveLesson(lesson)}
              className={`w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                completed
                  ? 'border-green-300 bg-white hover:border-green-400 shadow-sm'
                  : locked
                    ? 'border-gray-200 bg-gray-50/80 opacity-55 cursor-not-allowed'
                    : isNext
                      ? 'border-green-400 bg-white hover:shadow-md hover:scale-[1.01] shadow-sm cursor-pointer'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm cursor-pointer'
              }`}
            >
              {isNext && !completed && (
                <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-400" />
              )}

              <div className="p-3.5 flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm ${
                    completed
                      ? 'bg-green-500 text-white'
                      : locked
                        ? 'bg-gray-200 text-gray-400'
                        : isNext
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                  }`}
                >
                  {completed ? (
                    <Check className="h-4 w-4" />
                  ) : locked ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    (lesson.section
                      ? sectionLessons.findIndex((l) => l.id === lesson.id)
                      : index) + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {lesson.unitLabel && (
                    <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                      {lesson.unitLabel}
                    </p>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`font-semibold text-sm leading-snug ${
                        completed
                          ? 'text-gray-700'
                          : locked
                            ? 'text-gray-400'
                            : 'text-gray-800'
                      }`}
                    >
                      {lesson.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5 flex-shrink-0 mt-0.5">
                      <BookOpen className="h-2.5 w-2.5" />
                      {lesson.estimatedMinutes}m
                    </span>
                  </div>

                  <p
                    className={`text-[11px] mt-0.5 leading-relaxed ${locked ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {lesson.hook.question}
                  </p>

                  {!locked && (
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                          completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        ⚡ +{lesson.rewards.xp} XP
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                          completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-green-50 text-green-700'
                        }`}
                      >
                        🎋 +{lesson.rewards.bamboo}
                      </span>
                      {completed && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 ml-auto">
                          ✓ Done
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {!locked && !completed && (
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 mt-1 ${isNext ? 'text-green-600' : 'text-gray-300'}`}
                  />
                )}
              </div>
            </button>
            </React.Fragment>
          );
        })}

        {pathwayLessons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <span className="text-5xl">🚧</span>
            <h3 className="text-base font-bold text-gray-700">Coming Soon</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Phil is still writing lessons for this pathway. Check back soon!
            </p>
          </div>
        )}
      </div>

      {nextLesson && (
        <div className="p-3 border-t bg-white flex-shrink-0">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 rounded-xl"
            onClick={() => setActiveLesson(nextLesson)}
          >
            {pathwayProgress.completed === 0
              ? 'Start First Lesson'
              : pathwayComplete && hasPathways
                ? 'Review Lessons'
                : 'Continue Learning'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VillageModuleView;
