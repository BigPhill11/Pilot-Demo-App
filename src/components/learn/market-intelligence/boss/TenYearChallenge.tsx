/**
 * Phil's 10-Year Challenge — Ownership boss game.
 * 10 turns (years), each with 2 headlines and a choice. Tracks portfolio value.
 */
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BossShell, { BossScoreCard } from './BossShell';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';

interface Year {
  headlines: [string, string];
  returns: { stay: number; add: number; sell: number; rebalance: number };
  bestAction: 'stay' | 'add' | 'sell' | 'rebalance';
  explanation: string;
}

const YEARS: Year[] = [
  {
    headlines: ['Markets up 22% this year', 'Friends are calling this the best investment environment ever'],
    returns: { stay: 1.22, add: 1.25, sell: 1.0, rebalance: 1.2 },
    bestAction: 'stay',
    explanation: 'When euphoria is high, the best move is usually to stay steady, not to FOMO-buy more.',
  },
  {
    headlines: ['Market corrects 15% on Fed concerns', 'Panic selling hits record levels'],
    returns: { stay: 0.85, add: 0.92, sell: 0.80, rebalance: 0.87 },
    bestAction: 'add',
    explanation: 'Corrections are buying opportunities for long-term investors. Adding on fear is often the right call.',
  },
  {
    headlines: ['Steady growth quarter — nothing exciting', 'GDP up 2.1%'],
    returns: { stay: 1.08, add: 1.09, sell: 0.98, rebalance: 1.07 },
    bestAction: 'stay',
    explanation: 'Boring markets are healthy markets. Staying invested captures normal long-run returns.',
  },
  {
    headlines: ['Tech crashes 35% on AI regulation fears', '"Sell everything" trending on social media'],
    returns: { stay: 0.78, add: 0.85, sell: 0.72, rebalance: 0.82 },
    bestAction: 'add',
    explanation: 'Large drawdowns historically precede strong recoveries. Adding in a crash rewards patience.',
  },
  {
    headlines: ['Recovery: markets up 40% from last year\'s low', 'Bull market declared'],
    returns: { stay: 1.40, add: 1.42, sell: 1.02, rebalance: 1.35 },
    bestAction: 'stay',
    explanation: 'Those who stayed invested captured the full 40% recovery. Sellers missed most of it.',
  },
  {
    headlines: ['New sector (AI chips) dominates headlines', 'Analysts say this time is different'],
    returns: { stay: 1.15, add: 1.10, sell: 0.98, rebalance: 1.14 },
    bestAction: 'stay',
    explanation: '"This time is different" is often wrong. Diversified staying beats chasing hot sectors.',
  },
  {
    headlines: ['Recession confirmed — GDP negative two quarters', 'Job market weakens sharply'],
    returns: { stay: 0.82, add: 0.88, sell: 0.77, rebalance: 0.84 },
    bestAction: 'add',
    explanation: 'Recessions feel terrible but end. Adding near the bottom captures the recovery upside.',
  },
  {
    headlines: ['Inflation at 7% — highest in 40 years', 'Central banks worldwide raise rates'],
    returns: { stay: 0.93, add: 0.91, sell: 0.88, rebalance: 0.95 },
    bestAction: 'rebalance',
    explanation: 'High inflation hurts bonds more than stocks. Rebalancing toward equities and real assets is smart.',
  },
  {
    headlines: ['Market hits all-time high for 5th consecutive month', 'IPO market going crazy'],
    returns: { stay: 1.18, add: 1.15, sell: 1.0, rebalance: 1.17 },
    bestAction: 'stay',
    explanation: 'All-time highs are normal in rising markets. Staying invested beats waiting for a pullback that may not come.',
  },
  {
    headlines: ['Election uncertainty causes short-term volatility', 'Analysts split on market outlook'],
    returns: { stay: 1.10, add: 1.12, sell: 0.97, rebalance: 1.09 },
    bestAction: 'stay',
    explanation: 'Political uncertainty is usually noise for long-term investors. Markets historically perform regardless of which party wins.',
  },
];

const ACTION_LABELS = { stay: '🧘 Stay', add: '💰 Add Cash', sell: '🚪 Sell', rebalance: '⚖️ Rebalance' };

interface TenYearChallengeProps {
  onComplete: (result: { bambooEarned: number; xpEarned: number }) => void;
  onExit: () => void;
}

const TenYearChallenge: React.FC<TenYearChallengeProps> = ({ onComplete, onExit }) => {
  const [yearIndex, setYearIndex] = useState(0);
  const [portfolio, setPortfolio] = useState(1000);
  const [monthlyAdd] = useState(50);
  const [choices, setChoices] = useState<string[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { awardResources } = usePlatformIntegration();

  const year = YEARS[yearIndex];

  const choose = (action: string) => {
    if (revealed) return;
    setPending(action);
  };

  const confirm = () => {
    if (!pending) return;
    const action = pending as keyof typeof year.returns;
    const mult = year.returns[action];
    const addedCash = action === 'add' ? monthlyAdd * 12 : 0;
    setPortfolio(p => Math.round((p + addedCash) * mult));
    setChoices(c => [...c, pending!]);
    setRevealed(true);
  };

  const next = () => {
    if (yearIndex < YEARS.length - 1) {
      setYearIndex(i => i + 1);
      setPending(null);
      setRevealed(false);
    } else {
      setGameOver(true);
    }
  };

  const goodChoices = choices.filter((c, i) => c === YEARS[i]?.bestAction).length;

  const handleContinue = () => {
    awardResources(100, 25, 'Boss: 10-Year Challenge', true);
    onComplete({ bambooEarned: 100, xpEarned: 25 });
  };

  const handleReplay = () => {
    setYearIndex(0);
    setPortfolio(1000);
    setChoices([]);
    setPending(null);
    setRevealed(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <BossShell title="Phil's 10-Year Challenge" icon="📈" onExit={onExit}>
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-emerald-900/30 border border-emerald-600 text-center">
            <div className="text-5xl mb-3">🏛️</div>
            <h3 className="text-2xl font-bold text-emerald-300 mb-1">
              Final Portfolio: ${portfolio.toLocaleString()}
            </h3>
            <p className="text-emerald-400 text-sm">Started with $1,000 + $50/mo auto-invest</p>
          </div>
          <BossScoreCard
            score={goodChoices}
            maxScore={10}
            goldThreshold={80}
            silverThreshold={60}
            onContinue={handleContinue}
            onReplay={handleReplay}
            rewardBamboo={100}
            rewardXp={25}
            firstClear
          />
        </div>
      </BossShell>
    );
  }

  return (
    <BossShell title="Phil's 10-Year Challenge" icon="📈" onExit={onExit}>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-400">Year {yearIndex + 1}/10</span>
          <span className="text-emerald-300 font-bold">${portfolio.toLocaleString()}</span>
        </div>

        {/* Empire visual */}
        <div className="p-4 rounded-xl bg-slate-800 border border-slate-600 text-center">
          <div className="text-4xl mb-2">{'🌱'.repeat(Math.min(Math.floor(portfolio / 500), 10))}</div>
          <p className="text-slate-400 text-xs">Your bamboo empire grows with patience</p>
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          {year.headlines.map((h, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white">
              📰 {h}
            </div>
          ))}
        </div>

        {!revealed ? (
          <div className="space-y-3">
            <p className="text-emerald-400 text-sm text-center">What do you do?</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ACTION_LABELS).map(([key, label]) => (
                <Button
                  key={key}
                  variant="outline"
                  className={cn('border-slate-600 text-white hover:bg-slate-700', pending === key && 'border-emerald-500 bg-emerald-900/30')}
                  onClick={() => choose(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
            {pending && (
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={confirm}>
                Confirm: {ACTION_LABELS[pending as keyof typeof ACTION_LABELS]}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className={cn('p-3 rounded-lg text-sm', choices[yearIndex] === year.bestAction ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-300' : 'bg-red-900/30 border border-red-500 text-red-300')}>
              {choices[yearIndex] === year.bestAction ? '✓ Great call.' : `Best move was: ${ACTION_LABELS[year.bestAction as keyof typeof ACTION_LABELS]}`}
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300">
              {year.explanation}
            </div>
            <p className="text-emerald-400 text-sm text-center">New portfolio: ${portfolio.toLocaleString()}</p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={next}>
              {yearIndex < YEARS.length - 1 ? 'Next Year' : 'See Final Results'}
            </Button>
          </div>
        )}
      </div>
    </BossShell>
  );
};

export default TenYearChallenge;
