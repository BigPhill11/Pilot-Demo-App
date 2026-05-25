import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart2,
  BriefcaseBusiness,
  Building2,
  Flame,
  GraduationCap,
  Home,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  computeCardTop,
  getVisualViewportBounds,
  measureTargetRect,
  type TutorialRect,
} from '@/components/empire/tutorial/tutorialPlacement';

interface AppTourStep {
  id: string;
  title: string;
  body: string;
  target: string | null;
  icon: LucideIcon;
  cardPlacement?: 'above' | 'below' | 'auto';
}

const APP_TOUR_STEPS: AppTourStep[] = [
  {
    id: 'welcome',
    target: null,
    icon: Sparkles,
    title: "Welcome to Phil's Financials!",
    body: "I'm Phil, your personal finance panda. Let me show you around your new home. Tap Next and I'll highlight each section as we go.",
  },
  {
    id: 'nav-tabs',
    target: 'app-nav-tabs',
    icon: Home,
    title: 'Your Navigation',
    body: 'These tabs take you everywhere in the app — Home, Empire, Learn, Career, Friends, and Ask Phil. All one tap away.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-home',
    target: 'app-nav-home',
    icon: Home,
    title: 'Home',
    body: 'Your dashboard. See your daily progress, streak, XP, and quick access to every module all from one screen.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-learn',
    target: 'app-nav-learn',
    icon: GraduationCap,
    title: 'Learn',
    body: 'Structured courses across Personal Finance, Market Intelligence, and Business. Bite-sized lessons with quizzes and XP rewards after every module.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-empire',
    target: 'app-nav-empire',
    icon: Building2,
    title: 'Bamboo Empire',
    body: 'Spend the XP and bamboo coins you earn from lessons to build and grow your own empire. A gamified simulation of real financial life.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-career',
    target: 'app-nav-career',
    icon: BriefcaseBusiness,
    title: 'Career Hub',
    body: 'Interview prep, resume tips, and deep dives into finance career paths — investment banking, equity research, financial planning, and more.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-phils-friends',
    target: 'app-nav-phils-friends',
    icon: Users,
    title: "Phil's Friends",
    body: 'Exclusive video content from real finance professionals. Watch their career stories, get insider tips, and learn things you will not find in any textbook.',
    cardPlacement: 'below',
  },
  {
    id: 'header-ask-phil',
    target: 'app-header-ask-phil',
    icon: MessageCircle,
    title: 'Ask Phil',
    body: 'Got a question? I am your AI finance assistant, available 24/7. Ask me anything about budgeting, investing, career moves, or any concept you are studying.',
    cardPlacement: 'below',
  },
  {
    id: 'header-my-progress',
    target: 'app-header-my-progress',
    icon: BarChart2,
    title: 'My Progress',
    body: 'Track your streaks, daily time goal, XP across all modules, and quiz wins. Your complete learning snapshot is always one tap away.',
    cardPlacement: 'below',
  },
  {
    id: 'header-streak',
    target: 'app-header-streak',
    icon: Flame,
    title: 'Daily Streak',
    body: 'Come back every day to keep your streak alive. Longer streaks multiply your XP earnings — consistency is the biggest wealth-building superpower.',
    cardPlacement: 'below',
  },
  {
    id: 'done',
    target: null,
    icon: Sparkles,
    title: "You're Ready to Explore!",
    body: "That's the full tour! Everything is yours to explore. Remember, I'm always here in the Ask Phil button whenever you need help. Now let's start building that financial future!",
  },
];

/** Returns the current visual viewport height, listening to orientation + keyboard changes. */
function useViewportHeight() {
  const getHeight = () =>
    (typeof window !== 'undefined'
      ? window.visualViewport?.height ?? window.innerHeight
      : 600);

  const [height, setHeight] = useState(getHeight);

  useEffect(() => {
    const update = () => setHeight(getHeight());
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    window.screen?.orientation?.addEventListener?.('change', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
      window.screen?.orientation?.removeEventListener?.('change', update);
    };
  }, []);

  return height;
}

interface OnboardingAppTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingAppTour: React.FC<OnboardingAppTourProps> = ({ onComplete, onSkip }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TutorialRect | null>(null);
  const [cardTop, setCardTop] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const viewportHeight = useViewportHeight();
  // Compact layout in landscape (height < 500px) or very short screens
  const isCompact = viewportHeight < 500;
  // Padding around the spotlight — tighter on mobile
  const padding = typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 10;

  // Cap at 55 % of viewport so the card is always fully visible on any phone
  const maxCardHeight = Math.max(160, Math.round(viewportHeight * 0.55));

  const step = APP_TOUR_STEPS[stepIndex];
  const totalSteps = APP_TOUR_STEPS.length;
  const isLastStep = stepIndex >= totalSteps - 1;
  const isFirstStep = stepIndex === 0;
  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const Icon = step.icon;

  const updatePlacement = useCallback(() => {
    const vp = getVisualViewportBounds();
    const rect = step.target ? measureTargetRect(step.target, padding) : null;
    setTargetRect(rect);

    const cardHeight = cardRef.current?.offsetHeight ?? (isCompact ? 160 : 220);
    const top = computeCardTop({
      targetRect: rect,
      cardHeight,
      preference: step.cardPlacement ?? 'auto',
      viewport: vp,
    });
    setCardTop(top);
  }, [step.target, step.cardPlacement, padding, isCompact]);

  // Re-measure whenever step changes, viewport resizes, or orientation changes
  useLayoutEffect(() => {
    updatePlacement();
    const t1 = window.setTimeout(updatePlacement, 100);
    const t2 = window.setTimeout(updatePlacement, 350);
    const t3 = window.setTimeout(updatePlacement, 700); // catches slow orientation repaints

    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', updatePlacement);
    vv?.addEventListener('scroll', updatePlacement);
    window.screen?.orientation?.addEventListener?.('change', updatePlacement);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
      vv?.removeEventListener('resize', updatePlacement);
      vv?.removeEventListener('scroll', updatePlacement);
      window.screen?.orientation?.removeEventListener?.('change', updatePlacement);
    };
  }, [stepIndex, updatePlacement]);

  // Watch card height changes (e.g. text wrapping differently after resize)
  useLayoutEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver(() => updatePlacement());
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [stepIndex, updatePlacement]);

  const handleNext = () => {
    if (isLastStep) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onComplete();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) setStepIndex((i) => i - 1);
  };

  // Clamp so the card's bottom never overflows the viewport
  const safeCardTop =
    cardTop != null
      ? Math.min(cardTop, viewportHeight - maxCardHeight - 8)
      : null;

  const cardPositionStyle: React.CSSProperties =
    safeCardTop != null
      ? { top: safeCardTop, left: '50%', transform: 'translateX(-50%)' }
      : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-live="polite">
      {/* Skip button — pinned top-right, respects safe area */}
      <button
        type="button"
        onClick={onSkip}
        className="pointer-events-auto fixed right-3 z-[101] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-sm touch-manipulation dark:bg-gray-900/95 dark:text-gray-200"
        style={{ top: 'max(12px, env(safe-area-inset-top, 0px))' }}
      >
        Skip tour
      </button>

      {/* Spotlight SVG overlay — dark scrim with a hole punched at the target */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <defs>
          <mask id="app-tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx={10}
                ry={10}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.72)" mask="url(#app-tour-mask)" />
        {targetRect && (
          <rect
            x={targetRect.left}
            y={targetRect.top}
            width={targetRect.width}
            height={targetRect.height}
            rx={10}
            ry={10}
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeOpacity={0.85}
          />
        )}
      </svg>

      {/* Tour card — auto-placed above or below the spotlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          ref={cardRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="fixed pointer-events-auto w-[min(92vw,24rem)] max-w-[calc(100vw-16px)]"
          style={cardPositionStyle}
        >
          {/*
           * Inner wrapper constrains height and makes content scrollable.
           * This ensures the card never exceeds the available viewport space
           * regardless of orientation or screen size.
           */}
          <div
            className="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-white/10 overflow-hidden flex flex-col"
            style={{ maxHeight: maxCardHeight }}
          >
            {/* Progress bar — always visible at top */}
            <div className="h-1 shrink-0 bg-gray-200 dark:bg-gray-800">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Scrollable content area */}
            <div className={`flex flex-col overflow-y-auto overscroll-contain ${isCompact ? 'p-3 gap-2' : 'p-4 sm:p-5 gap-3'}`}>

              {/* Header row: Phil panda + title + close */}
              <div className="flex items-start gap-2.5 shrink-0">
                {!isCompact && (
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="shrink-0"
                  >
                    <PandaLogo className="h-10 w-10" />
                  </motion.div>
                )}
                {isCompact && (
                  <div className="shrink-0">
                    <PandaLogo className="h-7 w-7" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Step {stepIndex + 1} of {totalSteps}
                  </div>
                  <h3 className={`font-bold text-gray-900 dark:text-white leading-tight ${isCompact ? 'text-sm' : 'text-base sm:text-lg'}`}>
                    {step.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onSkip}
                  className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white touch-manipulation"
                  aria-label="Skip tour"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body: icon + description */}
              <div className="flex items-start gap-2.5 shrink-0">
                <div className={`shrink-0 flex items-center justify-center rounded-xl bg-primary/10 text-primary ${isCompact ? 'h-6 w-6' : 'h-8 w-8'}`}>
                  <Icon className={isCompact ? 'h-3 w-3' : 'h-4 w-4'} />
                </div>
                <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {step.body}
                </p>
              </div>

              {/* Navigation buttons — sized small so they fit on narrow phones (min 320px) */}
              <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className={`flex-none rounded-lg border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 touch-manipulation ${isCompact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs'}`}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className={`flex-1 min-w-0 flex items-center justify-center gap-1 rounded-lg bg-primary font-bold text-white shadow-md touch-manipulation select-none ${isCompact ? 'px-3 py-1.5 text-xs' : 'px-3 py-2 text-xs sm:text-sm'}`}
                >
                  {isLastStep ? (
                    <span className="truncate">Explore the App</span>
                  ) : (
                    <>
                      <span className="truncate">Next</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </>
                  )}
                </button>
              </div>

              {/* Step dot indicators */}
              <div className="flex justify-center gap-1 shrink-0">
                {APP_TOUR_STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStepIndex(i)}
                    className={`rounded-full transition-all touch-manipulation ${
                      i === stepIndex
                        ? 'bg-primary'
                        : i < stepIndex
                        ? 'bg-primary/40'
                        : 'bg-gray-300 dark:bg-gray-600'
                    } ${isCompact ? 'w-1.5 h-1.5' : i === stepIndex ? 'w-4 h-2' : 'w-2 h-2'}`}
                  />
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingAppTour;
