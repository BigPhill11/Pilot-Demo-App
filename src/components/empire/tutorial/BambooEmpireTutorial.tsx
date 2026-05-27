import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { useEmpireTutorial } from './EmpireTutorialContext';
import {
  computeCardTop,
  getTutorialPadding,
  getVisualViewportBounds,
  measureTargetRect,
  type TutorialRect,
} from './tutorialPlacement';

const accentClasses: Record<string, { chip: string; button: string }> = {
  emerald: {
    chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    button: 'bg-emerald-500 active:bg-emerald-600',
  },
  amber: {
    chip: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    button: 'bg-amber-500 active:bg-amber-600',
  },
  indigo: {
    chip: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    button: 'bg-indigo-500 active:bg-indigo-600',
  },
  purple: {
    chip: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    button: 'bg-purple-500 active:bg-purple-600',
  },
  rose: {
    chip: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    button: 'bg-rose-500 active:bg-rose-600',
  },
};

const BambooEmpireTutorial: React.FC = () => {
  const { isActive, step, stepIndex, totalSteps, advance, skipTutorial, handleSpotlightTap, runType } =
    useEmpireTutorial();
  const [targetRect, setTargetRect] = useState<TutorialRect | null>(null);
  const [cardTop, setCardTop] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const padding = getTutorialPadding();

  const updatePlacement = useCallback(() => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);

    const viewport = getVisualViewportBounds();
    const rect = step.target ? measureTargetRect(step.target, padding) : null;
    setTargetRect(rect);

    if (!mobile) {
      const cardHeight = cardRef.current?.offsetHeight ?? 0;
      const top = computeCardTop({
        targetRect: rect,
        cardHeight: cardHeight > 0 ? cardHeight : 180,
        preference: step.cardPlacement ?? 'auto',
        viewport,
      });
      setCardTop(top);
    }
  }, [step.target, step.cardPlacement, padding]);

  useLayoutEffect(() => {
    if (!isActive) return;

    updatePlacement();
    const retry = window.setTimeout(updatePlacement, 150);
    const retry2 = window.setTimeout(updatePlacement, 400);

    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    const vv = window.visualViewport;
    vv?.addEventListener('resize', updatePlacement);
    vv?.addEventListener('scroll', updatePlacement);

    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(retry2);
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
      vv?.removeEventListener('resize', updatePlacement);
      vv?.removeEventListener('scroll', updatePlacement);
    };
  }, [isActive, step.target, stepIndex, updatePlacement]);

  useLayoutEffect(() => {
    if (!isActive || !cardRef.current) return;

    const observer = new ResizeObserver(() => updatePlacement());
    observer.observe(cardRef.current);
    updatePlacement();

    return () => observer.disconnect();
  }, [isActive, stepIndex, updatePlacement]);

  if (!isActive) return null;

  const accent = accentClasses[step.accent] ?? accentClasses.emerald;
  const Icon = step.icon;
  const isLast = stepIndex >= totalSteps - 1;
  const isActionStep = step.advance === 'action';
  const isReplayActionStep = isActionStep && runType === 'replay';
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  // On mobile, if the spotlight target sits in the lower half of the screen
  // (e.g. the Build button), anchor the sheet to the top so it doesn't
  // overlap the highlighted element.
  const targetCenterY = targetRect ? targetRect.top + targetRect.height / 2 : 0;
  const anchorSheetToTop = isMobile && targetRect != null && targetCenterY > window.innerHeight * 0.5;

  const desktopCardStyle: React.CSSProperties =
    cardTop != null
      ? { top: cardTop, left: '50%', transform: 'translateX(-50%)' }
      : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  const cardBody = (
    <>
      <div className="h-1 bg-gray-200 dark:bg-gray-800">
        <motion.div
          className={`h-full ${accent.button}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl shrink-0 ${accent.chip}`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Step {stepIndex + 1} of {totalSteps}
            </div>
            <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
              {step.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={skipTutorial}
            className="pointer-events-auto shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white touch-manipulation"
            aria-label="Skip tutorial"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {step.body}
        </p>

        {(!isActionStep || isReplayActionStep) && (
          <button
            type="button"
            onClick={advance}
            className={`pointer-events-auto w-full flex items-center justify-center gap-2 rounded-xl ${accent.button} px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-lg touch-manipulation select-none`}
          >
            {isLast ? "Let's build" : 'Next'}
            {!isLast && <ChevronRight className="h-5 w-5" />}
          </button>
        )}

        {isActionStep && !isReplayActionStep && (
          <p className="text-center text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400">
            Follow the highlight to continue ↑
          </p>
        )}

        <button
          type="button"
          onClick={skipTutorial}
          className="pointer-events-auto w-full text-center text-xs sm:text-sm font-medium text-gray-500 underline-offset-2 hover:underline dark:text-gray-400 touch-manipulation"
        >
          Skip tutorial — replay anytime from the Tutorial button
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-live="polite">
      {/* Skip button always visible in top-right */}
      <button
        type="button"
        onClick={skipTutorial}
        className="pointer-events-auto fixed right-3 z-[101] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-sm touch-manipulation dark:bg-gray-900/95 dark:text-gray-200"
        style={{ top: 'max(12px, env(safe-area-inset-top, 0px))' }}
        aria-label="Skip tutorial"
      >
        Skip tutorial
      </button>

      {/* Spotlight overlay */}
      <svg
        className={`absolute inset-0 w-full h-full ${isActionStep ? 'pointer-events-none' : 'pointer-events-auto'}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <defs>
          <mask id="bamboo-tutorial-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx={16}
                ry={16}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.72)"
          mask="url(#bamboo-tutorial-mask)"
        />
        {targetRect && (
          <rect
            x={targetRect.left}
            y={targetRect.top}
            width={targetRect.width}
            height={targetRect.height}
            rx={16}
            ry={16}
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeOpacity={0.9}
          />
        )}
      </svg>

      {/* Transparent tap target over spotlight for action steps */}
      {isActionStep && !isReplayActionStep && targetRect && (
        <button
          type="button"
          aria-label="Tutorial target"
          className="pointer-events-auto absolute rounded-2xl ring-2 ring-white/80 touch-manipulation cursor-pointer bg-transparent border-0 p-0"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          }}
          onClick={handleSpotlightTap}
        />
      )}

      {/* ── Mobile: fixed bottom (or top) sheet ── */}
      {isMobile && (
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            ref={cardRef}
            initial={{ opacity: 0, y: anchorSheetToTop ? -24 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: anchorSheetToTop ? -24 : 24 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto fixed left-0 right-0"
            style={
              anchorSheetToTop
                ? { top: 0, paddingTop: 'env(safe-area-inset-top, 0px)' }
                : { bottom: 0, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }
            }
          >
            <div
              className={`bg-white dark:bg-gray-900 shadow-2xl border border-white/10 overflow-hidden ${
                anchorSheetToTop ? 'rounded-b-2xl' : 'rounded-t-2xl'
              }`}
            >
              {cardBody}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Desktop: floating positioned card ── */}
      {!isMobile && (
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            ref={cardRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className={`absolute w-[min(92vw,28rem)] ${isActionStep ? 'pointer-events-none' : 'pointer-events-auto'}`}
            style={desktopCardStyle}
          >
            <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-white/10 overflow-hidden">
              {cardBody}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default BambooEmpireTutorial;
