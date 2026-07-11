/**
 * Phil's Boardroom — Language of Finance boss game.
 * 3 rounds: read deal brief → answer 3 questions → recommend.
 */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BossShell, { BossScoreCard } from './BossShell';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface Round {
  dealBrief: string;
  questions: {
    q: string;
    options: string[];
    correct: number;
    sharp?: number; // index of option using precise vocabulary
    explanation: string;
  }[];
  recommendations: ('approve' | 'pass' | 'defer')[];
  bestRecommendation: 'approve' | 'pass' | 'defer';
}

const ROUNDS: Round[] = [
  {
    dealBrief: 'Target: FoodTech Inc., SaaS subscription model for restaurant supply chain. Revenue $85M (+32% YoY), gross margin 74%, EBITDA margin 18%, ARR $90M. Asking price: $800M (9.4x revenue, 52x EBITDA). No debt. Competitor just sold for 11x revenue.',
    questions: [
      {
        q: 'What is the EBITDA margin?',
        options: ['8%', '18%', '32%', '74%'],
        correct: 1,
        explanation: 'EBITDA margin = EBITDA / Revenue. 18% is stated in the brief.',
      },
      {
        q: 'At 9.4x revenue, how does this compare to the comparable acquisition?',
        options: ['Premium — comp was 11x', 'Discount — comp was 11x', 'At market — comp was 9.4x', 'Cannot be compared'],
        correct: 0,
        sharp: 0,
        explanation: 'The comp sold for 11x revenue. This deal at 9.4x is a relative discount — potentially good value.',
      },
      {
        q: 'What\'s the strongest case for the growth premium?',
        options: ['The CEO has a good reputation', '32% ARR growth signals strong product-market fit in a large market', 'The company has no debt', 'EBITDA margins are improving'],
        correct: 1,
        sharp: 1,
        explanation: '32% ARR growth at $90M scale is strong evidence of durable demand — the core justification for a premium.',
      },
    ],
    recommendations: ['approve', 'pass', 'defer'],
    bestRecommendation: 'approve',
  },
  {
    dealBrief: 'Target: RetailCo, brick-and-mortar apparel chain. Revenue $450M (-8% YoY), gross margin 32%, EBITDA margin 4%, net debt $200M. Asking price: $300M (0.67x revenue, 16.7x EBITDA). E-commerce penetration of customer base: 12% and declining.',
    questions: [
      {
        q: 'What is concerning about the 4% EBITDA margin?',
        options: ['It is too high for retail', 'It provides minimal buffer — any revenue miss turns profitable to unprofitable', 'EBITDA doesn\'t matter for retail', 'The margin should be measured differently'],
        correct: 1,
        sharp: 1,
        explanation: 'Thin EBITDA margins in a declining revenue environment mean small revenue drops create outsized losses.',
      },
      {
        q: 'The $200M net debt with $300M offer means enterprise value is:',
        options: ['$300M', '$500M', '$100M', 'Cannot determine'],
        correct: 1,
        sharp: 1,
        explanation: 'EV = equity value ($300M) + net debt ($200M) = $500M. The real acquisition cost is $500M, not $300M.',
      },
      {
        q: 'With 12% e-commerce penetration declining, what\'s the primary structural risk?',
        options: ['The stores are in bad locations', 'The customer base is not transitioning to online — secular decline risk', 'The gross margins are too high', 'Management turnover is the concern'],
        correct: 1,
        sharp: 1,
        explanation: 'Declining e-commerce adoption in retail signals the customer base is aging or defecting — a structural, not cyclical, problem.',
      },
    ],
    recommendations: ['approve', 'pass', 'defer'],
    bestRecommendation: 'pass',
  },
  {
    dealBrief: 'Target: HealthTech startup, AI diagnostics platform. Revenue $22M (+65% YoY), gross margin 68%, EBITDA margin -35% (investing in R&D), FDA clearance pending for flagship product. Asking price: $400M (18x revenue). Comparable cleared device companies trade at 8-12x revenue.',
    questions: [
      {
        q: 'What does the -35% EBITDA margin tell you?',
        options: ['The company is losing money on every sale', 'The company is investing heavily in R&D/growth — cash burn is intentional', 'The gross margin is wrong', 'The company should be shut down'],
        correct: 1,
        explanation: 'Negative EBITDA in a high-growth startup is often intentional investment, not dysfunction. Key is whether growth justifies the burn.',
      },
      {
        q: 'At 18x revenue vs. cleared comparables at 8-12x, the premium is justified only if:',
        options: ['The CEO is well-known', 'FDA clearance is approved and high-growth trajectory continues', 'Revenue growth is above 50%', 'The company has no debt'],
        correct: 1,
        sharp: 1,
        explanation: 'The 18x premium vs 8-12x cleared comps only makes sense if FDA clearance happens — which changes the company\'s risk profile entirely.',
      },
      {
        q: 'What is the appropriate closing recommendation?',
        options: ['Approve at the full $400M', 'Pass — too expensive', 'Defer for diligence — conditional on FDA outcome', 'Offer $200M'],
        correct: 2,
        sharp: 2,
        explanation: 'Binary regulatory risk (FDA approval) that could swing the valuation 2x is exactly when deferring for diligence is the right professional call.',
      },
    ],
    recommendations: ['approve', 'pass', 'defer'],
    bestRecommendation: 'defer',
  },
];

const RECOMMENDATION_LABELS = {
  approve: { emoji: '✅', label: 'Approve' },
  pass: { emoji: '❌', label: 'Pass' },
  defer: { emoji: '🔍', label: 'Defer for Diligence' },
};

interface PhilsBoardroomProps {
  onComplete: (result: { bambooEarned: number; xpEarned: number }) => void;
  onExit: () => void;
}

const PhilsBoardroom: React.FC<PhilsBoardroomProps> = ({ onComplete, onExit }) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [phase, setPhase] = useState<'questions' | 'recommend' | 'reveal'>('questions');
  const [roundResults, setRoundResults] = useState<{ correct: number; total: number; recCorrect: boolean }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const { awardResources } = usePlatformIntegration();

  const round = ROUNDS[roundIndex];
  const q = round.questions[qIndex];

  const selectAnswer = (i: number) => {
    if (answerRevealed) return;
    setPendingAnswer(i);
  };

  const confirmAnswer = () => {
    if (pendingAnswer === null) return;
    setAnswers(a => [...a, pendingAnswer]);
    setAnswerRevealed(true);
  };

  const nextQuestion = () => {
    if (qIndex < round.questions.length - 1) {
      setQIndex(i => i + 1);
      setPendingAnswer(null);
      setAnswerRevealed(false);
    } else {
      setPhase('recommend');
      setPendingAnswer(null);
      setAnswerRevealed(false);
    }
  };

  const submitRecommendation = () => {
    if (!recommendation) return;
    const correct = answers.filter((a, i) => a === round.questions[i].correct).length;
    const recCorrect = recommendation === round.bestRecommendation;
    setRoundResults(r => [...r, { correct, total: round.questions.length, recCorrect }]);
    setPhase('reveal');
  };

  const nextRound = () => {
    if (roundIndex < ROUNDS.length - 1) {
      setRoundIndex(i => i + 1);
      setQIndex(0);
      setAnswers([]);
      setRecommendation(null);
      setPhase('questions');
      setPendingAnswer(null);
      setAnswerRevealed(false);
    } else {
      setGameOver(true);
    }
  };

  const totalScore = roundResults.reduce((sum, r) => sum + r.correct + (r.recCorrect ? 1 : 0), 0);
  const maxScore = ROUNDS.length * (ROUNDS[0].questions.length + 1);

  const handleContinue = () => {
    awardResources(100, 25, 'Boss: Phil\'s Boardroom', true);
    onComplete({ bambooEarned: 100, xpEarned: 25 });
  };

  const handleReplay = () => {
    setRoundIndex(0);
    setQIndex(0);
    setAnswers([]);
    setRecommendation(null);
    setPhase('questions');
    setRoundResults([]);
    setGameOver(false);
    setPendingAnswer(null);
    setAnswerRevealed(false);
  };

  if (gameOver) {
    return (
      <BossShell title="Phil's Boardroom" icon="🏛️" onExit={onExit}>
        <BossScoreCard
          score={totalScore}
          maxScore={maxScore}
          goldThreshold={75}
          silverThreshold={58}
          onContinue={handleContinue}
          onReplay={handleReplay}
          rewardBamboo={100}
          rewardXp={25}
          firstClear
        />
      </BossShell>
    );
  }

  return (
    <BossShell title="Phil's Boardroom" icon="🏛️" onExit={onExit}>
      <div className="space-y-4">
        <div className="text-xs text-emerald-400 text-center">Deal {roundIndex + 1} of {ROUNDS.length}</div>

        {/* Conference table */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50">
          <div className="flex gap-2 mb-3 justify-center text-2xl">
            <span><ThemedEmoji emoji="🐼" className="h-[1em] w-[1em]" /></span><span><ThemedEmoji emoji="🐼" className="h-[1em] w-[1em]" /></span><span title="Phil">👔</span><span><ThemedEmoji emoji="🐼" className="h-[1em] w-[1em]" /></span><span><ThemedEmoji emoji="🐼" className="h-[1em] w-[1em]" /></span>
          </div>
          <p className="text-xs text-amber-200/70 text-center mb-2">Deal Brief</p>
          <p className="text-sm text-amber-100 leading-relaxed">{round.dealBrief}</p>
        </div>

        {phase === 'questions' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-600">
              <p className="text-xs text-slate-400 mb-1">Q{qIndex + 1} of {round.questions.length}</p>
              <p className="text-sm text-white font-medium">{q.q}</p>
            </div>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border text-sm transition-colors',
                    !answerRevealed && pendingAnswer === i ? 'border-emerald-500 bg-emerald-900/30 text-emerald-200' : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500',
                    answerRevealed && i === q.correct ? 'border-emerald-500 bg-emerald-900/30 text-emerald-200' : '',
                    answerRevealed && pendingAnswer === i && i !== q.correct ? 'border-red-500 bg-red-900/30 text-red-300' : '',
                  )}
                >
                  {opt}
                  {answerRevealed && i === q.correct && q.sharp === i && <span className="ml-2 text-xs text-emerald-400"><ThemedEmoji emoji="⚡" className="h-[1em] w-[1em]" /> Sharp</span>}
                </button>
              ))}
            </div>
            {!answerRevealed ? (
              pendingAnswer !== null && (
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={confirmAnswer}>
                  Submit Answer
                </Button>
              )
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 bg-slate-800 p-3 rounded-lg">{q.explanation}</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={nextQuestion}>
                  {qIndex < round.questions.length - 1 ? 'Next Question' : 'Make Recommendation'}
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === 'recommend' && (
          <div className="space-y-3">
            <p className="text-sm text-emerald-300 text-center">The PM is watching. What\'s your recommendation?</p>
            <div className="space-y-2">
              {Object.entries(RECOMMENDATION_LABELS).map(([key, { emoji, label }]) => (
                <button
                  key={key}
                  onClick={() => setRecommendation(key)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border text-sm transition-colors flex items-center gap-3',
                    recommendation === key ? 'border-emerald-500 bg-emerald-900/30 text-emerald-200' : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                  )}
                >
                  <span className="text-xl">{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            {recommendation && (
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={submitRecommendation}>
                Present to Investment Committee
              </Button>
            )}
          </div>
        )}

        {phase === 'reveal' && roundResults.length > 0 && (
          <div className="space-y-3">
            {(() => {
              const r = roundResults[roundResults.length - 1];
              return (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={cn('p-3 rounded-lg text-center text-sm', r.correct >= Math.ceil(round.questions.length * 0.67) ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-300' : 'bg-amber-900/30 border border-amber-600 text-amber-300')}>
                      <div className="text-lg font-bold">{r.correct}/{r.total}</div>
                      <div>Questions</div>
                    </div>
                    <div className={cn('p-3 rounded-lg text-center text-sm', r.recCorrect ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-300' : 'bg-red-900/30 border border-red-500 text-red-300')}>
                      <div className="text-lg">{r.recCorrect ? '✓' : '✗'}</div>
                      <div>Recommendation</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300">
                    Best recommendation: <span className="text-emerald-300 font-medium">{RECOMMENDATION_LABELS[round.bestRecommendation as keyof typeof RECOMMENDATION_LABELS].label}</span>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={nextRound}>
                    {roundIndex < ROUNDS.length - 1 ? 'Next Deal' : 'See Final Score'}
                  </Button>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </BossShell>
  );
};

export default PhilsBoardroom;
