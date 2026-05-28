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
  Menu,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
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
  mobileTarget?: string | null;
  icon: LucideIcon;
  cardPlacement?: 'above' | 'below' | 'auto';
  /** Path to navigate to when this step becomes active */
  navigateTo?: string;
  /** Use a light semi-transparent overlay so the page is visible behind the card */
  pageView?: boolean;
}

// ─── Desktop tour: spotlight nav tabs one by one ────────────────────────────
const DESKTOP_APP_TOUR_STEPS: AppTourStep[] = [
  {
    id: 'welcome',
    target: null,
    icon: Sparkles,
    title: "Welcome to Phil's Financials!",
    body: "I'm Phil, your finance panda! Let me show you around. Tap Next to see each section.",
  },
  {
    id: 'nav-tabs',
    target: 'app-nav-tabs',
    icon: Home,
    title: 'Navigation',
    body: 'These tabs take you everywhere — Home, Empire, Learn, Career, Friends, and Ask Phil.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-home',
    target: 'app-nav-home',
    icon: Home,
    title: 'Home',
    body: 'Your dashboard. See daily progress, streak, XP, and quick access to every module.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-learn',
    target: 'app-nav-learn',
    icon: GraduationCap,
    title: 'Learn',
    body: 'Courses in Personal Finance, Markets, and Business. Bite-sized lessons with XP rewards.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-empire',
    target: 'app-nav-empire',
    icon: Building2,
    title: 'Bamboo Empire',
    body: 'Spend your XP and bamboo coins to build and grow your own financial empire.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-career',
    target: 'app-nav-career',
    icon: BriefcaseBusiness,
    title: 'Career Hub',
    body: 'Interview prep, resume tips, and deep dives into finance career paths.',
    cardPlacement: 'below',
  },
  {
    id: 'nav-phils-friends',
    target: 'app-nav-phils-friends',
    icon: Users,
    title: "Phil's Friends",
    body: 'Exclusive videos from real finance pros — career stories and insider tips.',
    cardPlacement: 'below',
  },
  {
    id: 'header-ask-phil',
    target: 'app-header-ask-phil',
    icon: MessageCircle,
    title: 'Ask Phil',
    body: 'Your AI finance assistant, 24/7. Ask anything about money, investing, or careers.',
    cardPlacement: 'below',
  },
  {
    id: 'header-my-progress',
    target: 'app-header-my-progress',
    icon: BarChart2,
    title: 'My Progress',
    body: 'Track streaks, daily goals, XP across all modules, and quiz wins.',
    cardPlacement: 'below',
  },
  {
    id: 'header-streak',
    target: 'app-header-streak',
    icon: Flame,
    title: 'Daily Streak',
    body: 'Come back daily to keep your streak alive. Longer streaks multiply your XP.',
    cardPlacement: 'below',
  },
  {
    id: 'done',
    target: null,
    icon: Sparkles,
    title: "You're Ready!",
    body: "That's the tour! I'm always in Ask Phil when you need help. Let's build your financial future!",
  },
];

// ─── Mobile tour: navigate to each page so users see it live ────────────────
const MOBILE_APP_TOUR_STEPS: AppTourStep[] = [
  {
    id: 'welcome',
    target: null,
    navigateTo: '/',
    icon: Sparkles,
    title: "Welcome to Phil's Financials!",
    body: "I'm Phil, your finance panda! I'll take you on a quick tour of the app. Tap Next to explore each section!",
  },
  {
    id: 'home-page',
    target: null,
    navigateTo: '/',
    pageView: true,
    icon: Home,
    title: 'Home — Your Dashboard',
    body: 'This is your home base. See your daily progress, XP, streaks, and quick links to every module.',
  },
  {
    id: 'learn-page',
    target: null,
    navigateTo: '/learn',
    pageView: true,
    icon: GraduationCap,
    title: 'Learn',
    body: 'Bite-sized courses in Personal Finance, Markets, and Business. Complete lessons to earn XP!',
  },
  {
    id: 'empire-page',
    target: null,
    navigateTo: '/empire',
    pageView: true,
    icon: Building2,
    title: 'Bamboo Empire',
    body: 'Spend your XP and bamboo coins to build and grow your own financial empire here.',
  },
  {
    id: 'career-page',
    target: null,
    navigateTo: '/career',
    pageView: true,
    icon: BriefcaseBusiness,
    title: 'Career Hub',
    body: 'Interview prep, resume tips, and deep dives into finance career paths — all in one place.',
  },
  {
    id: 'friends-page',
    target: null,
    navigateTo: '/phils-friends',
    pageView: true,
    icon: Users,
    title: "Phil's Friends",
    body: 'Exclusive videos from real finance pros sharing career stories and insider tips.',
  },
  {
    id: 'menu-button',
    target: 'app-mobile-menu',
    navigateTo: '/',
    icon: Menu,
    title: 'Navigate Anywhere',
    body: "Tap this Menu button to switch between sections, check your progress, or chat with Ask Phil anytime.",
    cardPlacement: 'below',
  },
  {
    id: 'done',
    target: null,
    icon: Sparkles,
    title: "You're All Set!",
    body: "That's the tour! Use the Menu button whenever you need to switch sections. Let's build your financial future!",
  },
];

function useViewportHeight() {
  const getHeight = () =>
    typeof window !== 'undefined'
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 600;
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
  const navigate = useNavigate();

  const viewportHeight = useViewportHeight();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const isCompact = isMobile || viewportHeight < 500;

  const STEPS = isMobile ? MOBILE_APP_TOUR_STEPS : DESKTOP_APP_TOUR_STEPS;

  const maxCardHeight = isMobile
    ? 999
    : Math.max(200, Math.round(viewportHeight * 0.50));

  const padding = isMobile ? 6 : 10;

  const step = STEPS[stepIndex];
  const totalSteps = STEPS.length;
  const isLastStep = stepIndex >= totalSteps - 1;
  const isFirstStep = stepIndex === 0;
  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const Icon = step.icon;

  // Desktop only: fall back to whole nav bar when individual tabs aren't in DOM
  const effectiveTarget =
    !isMobile && 'mobileTarget' in step
      ? (step as AppTourStep & { mobileTarget?: string | null }).mobileTarget ?? null
      : step.target;

  // Navigate to the page associated with the current step
  useEffect(() => {
    if (step.navigateTo) {
      navigate(step.navigateTo, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  // --- Placement logic (desktop only) ---
  const updatePlacement = useCallback(() => {
    const vp = getVisualViewportBounds();
    const rect = effectiveTarget ? measureTargetRect(effectiveTarget, padding) : null;
    setTargetRect(rect);
    if (isMobile) return;
    const cardHeight = cardRef.current?.offsetHeight ?? (isCompact ? 160 : 220);
    const top = computeCardTop({
      targetRect: rect,
      cardHeight,
      preference: step.cardPlacement ?? 'auto',
      viewport: vp,
    });
    setCardTop(top);
  }, [effectiveTarget, step.cardPlacement, padding, isCompact, isMobile]);

  useLayoutEffect(() => {
    updatePlacement();
    const t1 = window.setTimeout(updatePlacement, 100);
    const t2 = window.setTimeout(updatePlacement, 350);
    const t3 = window.setTimeout(updatePlacement, 700);
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

  useLayoutEffect(() => {
    if (!cardRef.current || isMobile) return;
    const observer = new ResizeObserver(() => updatePlacement());
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [stepIndex, updatePlacement, isMobile]);

  const handleNext = () => {
    if (isLastStep) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onComplete();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) setStepIndex((i) => i - 1);
  };

  const safeCardTop =
    !isMobile && cardTop != null
      ? Math.min(cardTop, viewportHeight - maxCardHeight - 8)
      : null;

  const desktopCardStyle: React.CSSProperties =
    safeCardTop != null
      ? { top: safeCardTop, left: '50%', transform: 'translateX(-50%)' }
      : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  // pageView steps use a lighter overlay so users can see the page beneath
  const overlayOpacity = isMobile && step.pageView ? 0.38 : 0.72;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-live="polite">

      {/* Skip button */}
      <button
        type="button"
        onClick={onSkip}
        className="pointer-events-auto fixed right-3 z-[103] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-sm touch-manipulation dark:bg-gray-900/95 dark:text-gray-200"
        style={{ top: 'max(12px, env(safe-area-inset-top, 0px))' }}
      >
        Skip
      </button>

      {/* Click-blocker: prevents accidental taps on app content */}
      <div
        className="pointer-events-auto absolute inset-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />

      {/* SVG spotlight overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
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
        <rect
          width="100%"
          height="100%"
          fill={`rgba(0,0,0,${overlayOpacity})`}
          mask="url(#app-tour-mask)"
        />
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

      {/* Tour card */}
      <AnimatePresence mode="wait">
        {isMobile ? (
          /*
           * MOBILE: fixed bottom sheet, always pinned to the bottom.
           * Safe-area padding for iPhone home bar.
           */
          <motion.div
            key={step.id}
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="pointer-events-auto fixed bottom-0 left-0 right-0 z-[102] bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl border-t border-gray-100 dark:border-gray-800"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Progress bar */}
            <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-t-2xl overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-4 flex flex-col gap-3">
              {/* Header: panda + title + step count + close */}
              <div className="flex items-center gap-3">
                <PandaLogo className="h-9 w-9 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    Step {stepIndex + 1} of {totalSteps}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {step.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onSkip}
                  className="shrink-0 rounded-xl p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                  aria-label="Skip tour"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body: icon + description */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 h-8 w-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {step.body}
                </p>
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all ${
                      i === stepIndex
                        ? 'bg-primary w-4 h-2'
                        : i < stepIndex
                        ? 'bg-primary/40 w-2 h-2'
                        : 'bg-gray-300 dark:bg-gray-600 w-2 h-2'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons — large tap targets */}
              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-none rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 touch-manipulation active:scale-95 transition-transform"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-bold text-white shadow-md touch-manipulation active:scale-95 transition-transform select-none"
                >
                  {isLastStep ? (
                    "Let's Go!"
                  ) : (
                    <>
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /*
           * DESKTOP: floating card, auto-placed above or below the spotlight.
           */
          <motion.div
            key={step.id}
            ref={cardRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed pointer-events-auto z-[102] w-[min(92vw,24rem)] max-w-[calc(100vw-16px)]"
            style={desktopCardStyle}
          >
            <div
              className="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-white/10 overflow-hidden flex flex-col"
              style={{ maxHeight: maxCardHeight }}
            >
              {/* Progress bar */}
              <div className="h-1 shrink-0 bg-gray-200 dark:bg-gray-800">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Scrollable content */}
              <div className={`flex flex-col overflow-y-auto overscroll-contain ${isCompact ? 'p-3 gap-2' : 'p-4 gap-3'}`}>

                {/* Header */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="shrink-0"
                  >
                    <PandaLogo className={isCompact ? 'h-7 w-7' : 'h-9 w-9'} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Step {stepIndex + 1} of {totalSteps}
                    </p>
                    <h3 className={`font-bold text-gray-900 dark:text-white leading-tight ${isCompact ? 'text-sm' : 'text-base'}`}>
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

                {/* Body */}
                <div className="flex items-start gap-2.5 shrink-0">
                  <div className={`shrink-0 flex items-center justify-center rounded-xl bg-primary/10 text-primary ${isCompact ? 'h-6 w-6' : 'h-8 w-8'}`}>
                    <Icon className={isCompact ? 'h-3 w-3' : 'h-4 w-4'} />
                  </div>
                  <p className={`text-gray-700 dark:text-gray-300 leading-relaxed ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {step.body}
                  </p>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {!isFirstStep && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className={`flex-none rounded-lg border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 touch-manipulation active:scale-95 transition-transform ${isCompact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs'}`}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`flex-1 min-w-0 flex items-center justify-center gap-1 rounded-lg bg-primary font-bold text-white shadow-md touch-manipulation active:scale-95 transition-transform select-none ${isCompact ? 'px-3 py-1.5 text-xs' : 'px-3 py-2 text-sm'}`}
                  >
                    {isLastStep ? (
                      <span className="truncate">Let's Go!</span>
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
                  {STEPS.map((_, i) => (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingAppTour;
