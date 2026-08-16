import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PandaLogo from '@/components/icons/PandaLogo';
import { Check, ClipboardCopy, Loader2, School, Sparkles, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { createClassroom } from '@/lib/teacherApi';

interface OnboardingTeacherSetupProps {
  onComplete: () => void;
}

const PHIL_MESSAGES = [
  "Welcome aboard! Let's set up your first classroom.",
  'Here is the code your students will use. Share it and you are done.',
];

/**
 * The teacher branch of onboarding. Teachers skip the student interest survey
 * and app tour entirely — neither applies to them — and instead name a
 * classroom and collect the code their students sign up with.
 */
const OnboardingTeacherSetup: React.FC<OnboardingTeacherSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<0 | 1>(0);
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
      setStep(1);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Could not create the classroom. Please try again.'
      );
    } finally {
      setCreating(false);
    }
  };

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
              <span>Step {step + 1} of 2</span>
              <span>{step === 0 ? '50%' : '100%'}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: step === 0 ? '50%' : '100%' }}
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

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
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
              </motion.form>
            ) : (
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
