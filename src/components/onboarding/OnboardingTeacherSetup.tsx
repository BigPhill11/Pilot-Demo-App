import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  Check,
  ClipboardCopy,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  Mic,
  School,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { createClassroom } from '@/lib/teacherApi';

interface OnboardingTeacherSetupProps {
  onComplete: () => void;
}

const PHIL_MESSAGES = [
  "Welcome aboard! I'll get your class running in about a minute.",
  "First things first — what are we calling your class?",
  'Here is the code your students will use. Share it and they are in.',
  'Last thing: here is what you can see once they start working.',
];

const TOTAL_STEPS = PHIL_MESSAGES.length;

/** What the dashboard gives a teacher, in the order they will meet it. */
const DASHBOARD_TOUR = [
  {
    icon: LayoutDashboard,
    title: 'Overview',
    body: 'Who is showing up, how often, and how far through each module they are.',
  },
  {
    icon: Users,
    title: 'Students',
    body: 'One row per student. Tap any of them for their full picture.',
  },
  {
    icon: Target,
    title: 'Scenario answers',
    body: 'Not just which questions were missed — which wrong answer they picked, so you can see the misconception behind it.',
  },
  {
    icon: Mic,
    title: 'Teach-backs',
    body: 'How well each student explains a concept back in their own words, and the points they leave out.',
  },
  {
    icon: FileText,
    title: 'Class report',
    body: 'A PDF you can download any time: progress, usage, what to reteach, and what is working.',
  },
];

/**
 * The teacher branch of onboarding.
 *
 * Teachers skip the student interest survey and app tour — neither applies to
 * them — but they get the same shape of welcome: Phil talking them through a
 * short numbered flow, ending on what they will actually see day to day.
 */
const OnboardingTeacherSetup: React.FC<OnboardingTeacherSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [className, setClassName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [term, setTerm] = useState('');
  const [creating, setCreating] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = className.trim();
    if (!name) return;

    setCreating(true);
    try {
      const result = await createClassroom({
        name,
        schoolName: schoolName.trim() || undefined,
        term: term.trim() || undefined,
      });
      setJoinCode(result.join_code);
      setStep(2);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Could not create the classroom. Please try again.'
      );
    } finally {
      setCreating(false);
    }
  };

  const percentComplete = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy — write the code down instead.');
    }
  };

  return (
    // Matches the survey's stacking: above the sticky header and the app tour.
    <div className="fixed inset-0 z-[200] flex flex-col bg-background">
      <div
        className="shrink-0 px-5 pb-3"
        style={{ paddingTop: 'max(20px, env(safe-area-inset-top, 20px))' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="shrink-0"
          >
            <PandaLogo className="h-12 w-12" />
          </motion.div>
          <div className="flex-1">
            <div className="flex justify-between text-sm text-muted-foreground mb-1.5">
              <span>
                Step {step + 1} of {TOTAL_STEPS}
              </span>
              <span>{percentComplete}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${percentComplete}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`msg-${step}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-primary/10 border border-primary/20 rounded-xl rounded-tl-sm px-4 py-3 text-sm font-medium leading-snug"
          >
            {PHIL_MESSAGES[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3">
        <div className="mx-auto w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="welcome"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                  <div className="mb-3 flex items-center gap-2 text-primary">
                    <GraduationCap className="h-5 w-5" />
                    <h2 className="font-semibold">You are set up as a teacher</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your account opens straight to a dashboard instead of the student app. You
                    will not be working through lessons — you will be watching a class work
                    through them.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-border bg-card p-5">
                  <h3 className="mb-3 text-sm font-semibold">Three things to know</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    {[
                      'You create a class and get a code. Students who sign up with it land on your roster automatically.',
                      'Everything they do in the app rolls up for you — progress, how often they open it, and the questions they miss.',
                      'Nothing appears retroactively. The dashboard fills in from the moment your students start.',
                    ].map((line, index) => (
                      <li key={line} className="flex gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                          {index + 1}
                        </span>
                        {line}
                      </li>
                    ))}
                  </ol>
                </div>

                <Button size="lg" className="w-full" onClick={() => setStep(1)}>
                  Set up my class
                </Button>
              </motion.div>
            ) : step === 1 ? (
              <motion.form
                key="setup"
                onSubmit={handleCreate}
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border-2 border-border bg-card p-5 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" />
                    <h2 className="font-semibold">Your classroom</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class-name">Class name</Label>
                    <Input
                      id="class-name"
                      placeholder="e.g. Period 3 Personal Finance"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="school-name">School (optional)</Label>
                      <Input
                        id="school-name"
                        placeholder="e.g. Grady High"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="term">Term (optional)</Label>
                      <Input
                        id="term"
                        placeholder="e.g. Fall 2026"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                  <School className="h-4 w-4 shrink-0 text-primary" />
                  <p>
                    You can create more classes later. Each one gets its own code, so a student
                    only ever appears on the roster of the class they joined.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="shrink-0"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    disabled={creating || !className.trim()}
                  >
                    {creating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      'Create classroom'
                    )}
                  </Button>
                </div>
              </motion.form>
            ) : step === 2 ? (
              <motion.div
                key="share"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
                  <Sparkles className="mx-auto mb-3 h-7 w-7 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Students join {className.trim()} with
                  </p>
                  <p className="font-mono text-3xl font-bold tracking-[0.2em] text-primary break-all">
                    {joinCode}
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="h-4 w-4 mr-2" />
                        Copy code
                      </>
                    )}
                  </Button>
                </div>

                <div className="rounded-2xl border-2 border-border bg-card p-5">
                  <h3 className="font-semibold text-sm mb-3">How your students join</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                        1
                      </span>
                      They download the app and tap Sign up.
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                        2
                      </span>
                      They enter this code in the Access code field.
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                        3
                      </span>
                      They appear on your roster automatically — no approval needed.
                    </li>
                  </ol>
                </div>

                <Button size="lg" className="w-full" onClick={() => setStep(3)}>
                  Next
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="tour"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-2.5">
                  {DASHBOARD_TOUR.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex gap-3 rounded-2xl border-2 border-border bg-card p-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{item.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button size="lg" className="w-full" onClick={onComplete}>
                  Go to my dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTeacherSetup;
