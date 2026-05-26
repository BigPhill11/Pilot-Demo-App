import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Landmark,
  LineChart,
  PiggyBank,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Wallet,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurveyData {
  goal: string;
  interests: string[];
  financeGoals: string[];
  timeCommitment: string;
}

const MAIN_GOALS = [
  { id: 'personal-finance', label: 'Personal Finance', icon: Wallet, desc: 'Budgeting, saving & debt' },
  { id: 'investing', label: 'Investing & Markets', icon: LineChart, desc: 'Stocks, crypto & trading' },
  { id: 'career', label: 'Finance Career', icon: BriefcaseBusiness, desc: 'Break into finance' },
  { id: 'curious', label: 'Just Curious', icon: Compass, desc: 'Explore everything' },
];

const INTEREST_OPTIONS = [
  { id: 'personal-finance', label: 'Personal Finance', icon: Wallet },
  { id: 'market-intelligence', label: 'Market Intelligence', icon: LineChart },
  { id: 'business-economics', label: 'Business Economics', icon: Landmark },
  { id: 'crypto', label: 'Crypto', icon: BadgeDollarSign },
  { id: 'career-readiness', label: 'Career Readiness', icon: Target },
  { id: 'phils-friends', label: "Phil's Friends", icon: Users },
];

const FINANCE_GOALS = [
  { id: 'save-money', label: 'Save More Money', icon: PiggyBank },
  { id: 'invest-smarter', label: 'Invest Smarter', icon: LineChart },
  { id: 'finance-job', label: 'Get a Finance Job', icon: BriefcaseBusiness },
  { id: 'start-business', label: 'Start a Business', icon: Rocket },
  { id: 'pay-off-debt', label: 'Pay Off Debt', icon: ShieldCheck },
  { id: 'build-wealth', label: 'Build Long-Term Wealth', icon: Building2 },
];

const TIME_OPTIONS = [
  { id: '5min', label: '5 min / day', icon: Clock, desc: 'Quick daily habit' },
  { id: '15min', label: '15 min / day', icon: Clock, desc: 'Steady progress' },
  { id: '30min', label: '30 min / day', icon: Clock, desc: 'Serious learner' },
  { id: '1hr', label: '1+ hr / day', icon: Clock, desc: 'All in!' },
];

const PHIL_MESSAGES = [
  "What's your main goal? I'll tailor your experience just for you!",
  'Which topics excite you? Pick as many as you like!',
  'What financial goals matter most? Pick all that apply.',
  'Last one — how much time can you commit each day?',
];

interface OnboardingInterestSurveyProps {
  onComplete: (data: SurveyData) => void;
}

const OnboardingInterestSurvey: React.FC<OnboardingInterestSurveyProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>({
    goal: '',
    interests: [],
    financeGoals: [],
    timeCommitment: '',
  });

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleInterest = (id: string) =>
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }));

  const toggleGoal = (id: string) =>
    setData(prev => ({
      ...prev,
      financeGoals: prev.financeGoals.includes(id)
        ? prev.financeGoals.filter(g => g !== id)
        : [...prev.financeGoals, id],
    }));

  const canAdvance = () => {
    if (step === 0) return !!data.goal;
    if (step === 1) return data.interests.length > 0;
    if (step === 2) return data.financeGoals.length > 0;
    if (step === 3) return !!data.timeCommitment;
    return true;
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    // z-[200] keeps this above the sticky header (z-50) and the app tour (z-[100])
    // bg-background (fully opaque) ensures nothing from the app bleeds through
    <div className="fixed inset-0 z-[200] flex flex-col bg-background">

      {/* Fixed header — never scrolls away */}
      <div
        className="shrink-0 px-5 pb-3"
        style={{ paddingTop: 'max(20px, env(safe-area-inset-top, 20px))' }}
      >
        {/* Panda + progress row */}
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
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Phil speech bubble */}
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

      {/* Scrollable card area */}
      <div className="flex-1 overflow-y-auto px-5 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 0: Main goal */}
            {step === 0 && (
              <div className="grid grid-cols-2 gap-3">
                {MAIN_GOALS.map(g => {
                  const Icon = g.icon;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setData(prev => ({ ...prev, goal: g.id }))}
                      className={`relative rounded-2xl p-5 text-left border-2 transition-all touch-manipulation ${
                        data.goal === g.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      {data.goal === g.id && (
                        <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <Icon className="mb-2.5 h-7 w-7 text-primary" />
                      <div className="font-semibold text-sm leading-tight">{g.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-tight">{g.desc}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 1: Interests (multi-select) */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-2.5">
                {INTEREST_OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  const selected = data.interests.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleInterest(opt.id)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-4 border-2 text-left transition-all touch-manipulation ${
                        selected
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm font-medium leading-tight flex-1">{opt.label}</span>
                      {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 2: Finance goals (multi-select) */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-2.5">
                {FINANCE_GOALS.map(g => {
                  const Icon = g.icon;
                  const selected = data.financeGoals.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-4 border-2 text-left transition-all touch-manipulation ${
                        selected
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm font-medium leading-tight flex-1">{g.label}</span>
                      {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3: Time commitment */}
            {step === 3 && (
              <div className="grid grid-cols-2 gap-3">
                {TIME_OPTIONS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setData(prev => ({ ...prev, timeCommitment: t.id }))}
                      className={`relative rounded-2xl p-5 text-left border-2 transition-all touch-manipulation ${
                        data.timeCommitment === t.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      {data.timeCommitment === t.id && (
                        <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <Icon className="mb-2.5 h-7 w-7 text-primary" />
                      <div className="font-semibold text-sm leading-tight">{t.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-tight">{t.desc}</div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed navigation — always visible at bottom, clears home indicator */}
      <div
        className="shrink-0 flex gap-3 px-5 pt-3 border-t border-border bg-background"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))' }}
      >
        {step > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="shrink-0 h-14 px-5 text-base rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!canAdvance()}
          className="flex-1 h-14 text-base font-bold rounded-xl"
        >
          {step === totalSteps - 1 ? "Let's go!" : (
            <>Next <ChevronRight className="h-5 w-5 ml-1.5" /></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingInterestSurvey;
