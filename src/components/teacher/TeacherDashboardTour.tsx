import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Mic,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import type { TeacherView } from '@/components/teacher/TeacherShell';

interface TourStep {
  id: string;
  title: string;
  body: string;
  target: string | null;
  view?: TeacherView;
  icon: typeof Sparkles;
}

const STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Your classroom, at a glance',
    body: "I'll show you where to spot learning gains, misconceptions, and students who need a nudge. This takes about a minute.",
    target: null,
    view: 'overview',
    icon: Sparkles,
  },
  {
    id: 'classes',
    title: 'Switch between classes',
    body: 'Each classroom has its own join code, roster, trends, and report. Create another class from this same area.',
    target: 'teacher-classes',
    icon: GraduationCap,
  },
  {
    id: 'momentum',
    title: 'See whether learning is moving',
    body: 'Learning Momentum compares the same students across two weeks. It blends scenario accuracy with how well they explain concepts back to Phil.',
    target: 'teacher-momentum',
    view: 'overview',
    icon: BarChart3,
  },
  {
    id: 'students',
    title: 'Open any student',
    body: 'The Students view shows pace and activity. Select a student for their modules, answers, and teach-back history.',
    target: 'teacher-view-roster',
    view: 'roster',
    icon: Users,
  },
  {
    id: 'scenarios',
    title: 'Find the misconception',
    body: 'Scenario answers show the wrong option students chose—not just the score—so reteaching can address the actual misunderstanding.',
    target: 'teacher-view-scenarios',
    view: 'scenarios',
    icon: Target,
  },
  {
    id: 'teachbacks',
    title: 'Check understanding in their own words',
    body: 'Teach-backs reveal whether students can explain a concept and which important facts they left out.',
    target: 'teacher-view-teachback',
    view: 'teachback',
    icon: Mic,
  },
  {
    id: 'report',
    title: 'Take the story with you',
    body: 'Download the class report for the learning trend, strongest and weakest topics, and a focused teaching brief.',
    target: 'teacher-report',
    view: 'overview',
    icon: FileText,
  },
  {
    id: 'done',
    title: 'You are ready',
    body: 'Use Replay tutorial in the sidebar—or the help button on your phone—whenever you want to walk through this again.',
    target: null,
    view: 'overview',
    icon: BookOpen,
  },
];

interface TeacherDashboardTourProps {
  open: boolean;
  onComplete: () => void;
  onChangeView: (view: TeacherView) => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function visibleTarget(name: string): HTMLElement | null {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-tutorial="${name}"]`)
  );
  return nodes.find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }) ?? null;
}

const TeacherDashboardTour: React.FC<TeacherDashboardTourProps> = ({
  open,
  onComplete,
  onChangeView,
}) => {
  const [index, setIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const step = STEPS[index];

  useEffect(() => {
    if (!open) return;
    setIndex(0);
  }, [open]);

  useEffect(() => {
    if (open && step.view) onChangeView(step.view);
  }, [open, step.view, onChangeView]);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      if (!step.target) {
        setTargetRect(null);
        return;
      }
      const node = visibleTarget(step.target);
      if (!node) {
        setTargetRect(null);
        return;
      }
      node.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      const rect = node.getBoundingClientRect();
      setTargetRect({
        top: Math.max(6, rect.top - 7),
        left: Math.max(6, rect.left - 7),
        width: Math.min(window.innerWidth - 12, rect.width + 14),
        height: rect.height + 14,
      });
    };
    update();
    const timer = window.setTimeout(update, 180);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, index, step.target]);

  if (!open) return null;

  const last = index === STEPS.length - 1;
  const Icon = step.icon;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-live="polite">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <mask id="teacher-tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(2, 44, 34, .78)" mask="url(#teacher-tour-mask)" />
        {targetRect && (
          <rect
            x={targetRect.left}
            y={targetRect.top}
            width={targetRect.width}
            height={targetRect.height}
            rx="12"
            fill="none"
            stroke="#86efac"
            strokeWidth="3"
          />
        )}
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          ref={cardRef}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="pointer-events-auto fixed bottom-0 left-0 right-0 rounded-t-3xl bg-background p-5 shadow-2xl sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2 sm:w-[26rem] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-6"
          style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))' }}
        >
          <button
            type="button"
            onClick={onComplete}
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted"
            aria-label="Close tutorial"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3 pr-8">
            <PandaLogo className="h-11 w-11 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Dashboard tour · {index + 1}/{STEPS.length}
              </p>
              <h2 className="mt-1 text-xl font-bold">{step.title}</h2>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          <div className="mt-4 flex gap-2">
            {index > 0 && (
              <button
                type="button"
                onClick={() => setIndex((value) => value - 1)}
                className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => (last ? onComplete() : setIndex((value) => value + 1))}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
            >
              {last ? 'Finish tour' : 'Next'}
              {!last && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TeacherDashboardTour;
