import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Coins, Zap, CreditCard, Hammer, Sparkles, ChevronRight } from 'lucide-react';

/**
 * First-visit Bamboo Empire tutorial.
 *
 * - Auto-starts the first time the user lands on the Empire page (no prior
 *   completion flag in localStorage).
 * - Highlights the real DOM element for each concept using a spotlight
 *   cut-out; every other part of the screen is dimmed and non-interactive,
 *   forcing the user to progress through the tutorial.
 * - Mobile-first: big tap targets, pinned card that never overlaps the
 *   highlighted element, safe-area aware.
 */

const STORAGE_KEY = 'bamboo_empire_tutorial_v1_completed';

type StepIcon = React.ComponentType<{ className?: string }>;

interface TutorialStep {
  id: string;
  title: string;
  body: string;
  /** `data-tutorial` value of the element to spotlight. `null` = fullscreen (intro/outro). */
  target: string | null;
  icon: StepIcon;
  accent: string; // tailwind color accent for the card
}

const STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to your Bamboo Empire',
    body:
      "This is where everything you learn pays off. You'll earn coins, manage productivity and credit, and build structures that grow your empire. Let me show you the ropes — it'll only take a minute.",
    target: null,
    icon: Sparkles,
    accent: 'emerald',
  },
  {
    id: 'coins',
    title: 'Coins — your currency',
    body:
      'This counter tracks your bamboo coins. You earn them from lessons and from the structures you build. Coins are what you spend to put up new buildings. The small number underneath is your storage capacity — if it fills up, production pauses until you spend or upgrade storage.',
    target: 'coin-counter',
    icon: Coins,
    accent: 'amber',
  },
  {
    id: 'productivity',
    title: 'Productivity level',
    body:
      "Productivity is a multiplier on everything your buildings produce. It drops if you grind without breaks, and in-game events can knock it down further. Keep an eye on it — a healthy empire is a productive empire.",
    target: 'productivity-indicator',
    icon: Zap,
    accent: 'emerald',
  },
  {
    id: 'credit',
    title: 'Credit — borrow wisely',
    body:
      "Short on coins? You can use credit to buy buildings now and pay later. Your credit score rises when you pay on time and drops if you miss payments. Higher score = bigger credit limit. Tap this chip anytime to open your credit panel.",
    target: 'credit-indicator',
    icon: CreditCard,
    accent: 'indigo',
  },
  {
    id: 'xp',
    title: 'XP unlocks new structures',
    body:
      'XP tracks your learning progress. As it climbs, new building types unlock — farms, storage, banks, markets, and more. Keep learning to expand what you can build.',
    target: 'xp-indicator',
    icon: Sparkles,
    accent: 'purple',
  },
  {
    id: 'build',
    title: 'Building new structures',
    body:
      "Tap this Build button to open the structure menu. You'll see every building type, its cost, build time, and what it does — farms passively produce coins, banks earn interest, storage holds more, and panda houses expand your slots. Pick one, then tap a grass tile to place it.",
    target: 'build-button',
    icon: Hammer,
    accent: 'emerald',
  },
  {
    id: 'done',
    title: "You're ready to build",
    body:
      "That's everything. Earn coins, watch your productivity, use credit smartly, and keep building. Tap the Build button whenever you're ready to expand your empire.",
    target: null,
    icon: Sparkles,
    accent: 'emerald',
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 10;

function isTutorialComplete(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function markComplete(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    /* ignore */
  }
}

const accentClasses: Record<string, { chip: string; button: string; ring: string }> = {
  emerald: {
    chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    button: 'bg-emerald-500 active:bg-emerald-600',
    ring: 'ring-emerald-400',
  },
  amber: {
    chip: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    button: 'bg-amber-500 active:bg-amber-600',
    ring: 'ring-amber-400',
  },
  indigo: {
    chip: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    button: 'bg-indigo-500 active:bg-indigo-600',
    ring: 'ring-indigo-400',
  },
  purple: {
    chip: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    button: 'bg-purple-500 active:bg-purple-600',
    ring: 'ring-purple-400',
  },
};

const BambooEmpireTutorial: React.FC = () => {
  // Initialise closed; open on mount if first visit. This avoids SSR flicker.
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTutorialComplete()) {
      // Small delay so the page has painted before we start measuring anchors.
      const timer = window.setTimeout(() => setIsOpen(true), 400);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const step = STEPS[stepIndex];

  // Measure the highlighted element's position every time the step changes
  // and when the window resizes. Using useLayoutEffect avoids a flash of
  // wrong-position spotlight.
  useLayoutEffect(() => {
    if (!isOpen) return;
    if (!step.target) {
      setTargetRect(null);
      return;
    }

    const measure = () => {
      const el = document.querySelector<HTMLElement>(`[data-tutorial="${step.target}"]`);
      if (!el) {
        setTargetRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setTargetRect({
        top: r.top - PADDING,
        left: r.left - PADDING,
        width: r.width + PADDING * 2,
        height: r.height + PADDING * 2,
      });
    };

    measure();
    // Retry briefly in case the target animates into place (e.g. drawer open).
    const retry = window.setTimeout(measure, 150);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.clearTimeout(retry);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [isOpen, step.target, stepIndex]);

  const handleNext = () => {
    if (stepIndex >= STEPS.length - 1) {
      markComplete();
      setIsOpen(false);
      return;
    }
    setStepIndex((i) => i + 1);
  };

  if (!isOpen) return null;

  const accent = accentClasses[step.accent] ?? accentClasses.emerald;
  const Icon = step.icon;
  const isLast = stepIndex === STEPS.length - 1;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  // Decide whether the card sits above or below the spotlight so it never
  // overlaps the highlighted element on small screens.
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 0;
  const cardAbove = targetRect ? targetRect.top > viewportH / 2 : false;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-live="polite">
      {/* Dim + spotlight layer. We use a single SVG so the cut-out is pixel-perfect. */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
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

      {/* Tutorial card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          ref={cardRef}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 w-[min(92vw,28rem)]"
          style={
            targetRect
              ? cardAbove
                ? {
                    top: Math.max(16, targetRect.top - 16 - 260),
                  }
                : {
                    top: Math.min(
                      viewportH - 280,
                      targetRect.top + targetRect.height + 16,
                    ),
                  }
              : {
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }
          }
        >
          <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-white/10 overflow-hidden">
            {/* progress */}
            <div className="h-1 bg-gray-200 dark:bg-gray-800">
              <motion.div
                className={`h-full ${accent.button}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.chip}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Step {stepIndex + 1} of {STEPS.length}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {step.body}
              </p>

              <button
                type="button"
                onClick={handleNext}
                className={`w-full flex items-center justify-center gap-2 rounded-xl ${accent.button} px-6 py-3.5 text-base font-bold text-white shadow-lg touch-manipulation select-none`}
              >
                {isLast ? "Let's build" : 'Next'}
                {!isLast && <ChevronRight className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BambooEmpireTutorial;
