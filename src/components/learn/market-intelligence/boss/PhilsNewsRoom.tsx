/**
 * Phil's News Room — Markets & Headlines boss game.
 * 20 headlines, rapid-fire: Above the Fold (signal), Below the Fold (noise), Spike It (clickbait).
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BossShell, { BossScoreCard } from './BossShell';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface Headline {
  text: string;
  correct: 'signal' | 'noise' | 'clickbait';
  feedback: string;
}

const HEADLINES: Headline[] = [
  {
    text: 'Fed raises rates by 0.25% — third consecutive hike this year',
    correct: 'signal',
    feedback: 'Rate decisions directly affect borrowing costs, mortgages, and valuations. Always above the fold.',
  },
  {
    text: 'MARKETS ARE COLLAPSING — You won\'t believe what happens next 😱',
    correct: 'clickbait',
    feedback: 'All-caps panic + clickbait hook = spike it. No data, no context, pure fear-bait.',
  },
  {
    text: 'Local bakery wins "Best Croissant" award for third year in a row',
    correct: 'noise',
    feedback: 'Delicious, but not market-moving. Below the fold.',
  },
  {
    text: 'Apple reports Q3 EPS of $1.26 — beats estimates by 8%',
    correct: 'signal',
    feedback: 'Earnings beats move stock prices. Above the fold.',
  },
  {
    text: 'This ONE trick Wall Street doesn\'t want you to know about investing',
    correct: 'clickbait',
    feedback: '"One trick they don\'t want you to know" is the clickbait playbook. Spike it.',
  },
  {
    text: 'U.S. unemployment falls to 3.7% — lowest in 18 months',
    correct: 'signal',
    feedback: 'Employment data is a core economic indicator. Markets move on this. Above the fold.',
  },
  {
    text: 'Celebrity couple spotted at NYC restaurant — sources say they\'re back together',
    correct: 'noise',
    feedback: 'Celebrity gossip has no bearing on financial markets. Below the fold.',
  },
  {
    text: 'BREAKING: Stock market DOWN today — investors panic sell everything',
    correct: 'clickbait',
    feedback: '"Investors panic sell everything" is hyperbole designed to get clicks. No specifics, pure fear.',
  },
  {
    text: 'China GDP growth slows to 4.5% — lowest since 2009',
    correct: 'signal',
    feedback: 'China\'s growth rate affects global supply chains, commodity prices, and multinational earnings.',
  },
  {
    text: 'New study shows coffee may be good for you (or maybe not)',
    correct: 'noise',
    feedback: 'Health study noise — vague, contradictory, and irrelevant to markets.',
  },
  {
    text: 'Treasury yield curve inverts — historically precedes recessions',
    correct: 'signal',
    feedback: 'Yield curve inversions are closely watched recession predictors. Serious signal.',
  },
  {
    text: 'I turned $500 into $2 million — here\'s my SECRET strategy',
    correct: 'clickbait',
    feedback: 'Lottery-ticket anecdote + "SECRET" = pure clickbait. Spike it immediately.',
  },
  {
    text: 'OPEC agrees to cut oil production by 1.5 million barrels per day',
    correct: 'signal',
    feedback: 'Production cuts raise oil prices globally. Energy stocks, inflation expectations, and consumer spending all shift.',
  },
  {
    text: 'Local sports team wins game in overtime thriller',
    correct: 'noise',
    feedback: 'Sports results don\'t move financial markets (usually). Below the fold.',
  },
  {
    text: 'SHOCKING: This country\'s economy is about to IMPLODE — experts terrified',
    correct: 'clickbait',
    feedback: '"SHOCKING" + "IMPLODE" + no named sources = clickbait structure. Spike it.',
  },
  {
    text: 'Inflation falls to 2.3% — first time at target range in two years',
    correct: 'signal',
    feedback: 'On-target inflation signals potential rate cuts ahead. Markets reprice growth assets.',
  },
  {
    text: 'Popular social media app adds new filter feature',
    correct: 'noise',
    feedback: 'Product updates for consumer apps rarely move markets unless tied to earnings or regulatory news.',
  },
  {
    text: 'Berkshire Hathaway discloses $8B stake in energy sector',
    correct: 'signal',
    feedback: 'Buffett\'s disclosures move markets. Institutional positioning signals are real information.',
  },
  {
    text: 'Scientists discover planet that MIGHT support life — humanity\'s future revealed',
    correct: 'noise',
    feedback: 'Fascinating astronomy news, but not a financial signal. Below the fold.',
  },
  {
    text: 'Major bank raises recession probability to 45% for next 12 months',
    correct: 'signal',
    feedback: 'Institutional forecasts shift asset allocation decisions. This is market-moving analysis.',
  },
];

const ACTION_LABELS = {
  signal: { label: 'Above the Fold', emoji: '📰', desc: 'Market-moving signal', color: 'border-emerald-500 bg-emerald-900/40 text-emerald-300' },
  noise: { label: 'Below the Fold', emoji: '📄', desc: 'Background noise', color: 'border-slate-500 bg-slate-800 text-slate-300' },
  clickbait: { label: 'Spike It', emoji: '🗑️', desc: 'Clickbait / fake', color: 'border-red-500 bg-red-900/30 text-red-300' },
};

interface PhilsNewsRoomProps {
  onComplete: (result: { bambooEarned: number; xpEarned: number }) => void;
  onExit: () => void;
}

const TOTAL_TIME = 180; // 3 minutes

const PhilsNewsRoom: React.FC<PhilsNewsRoomProps> = ({ onComplete, onExit }) => {
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<('signal' | 'noise' | 'clickbait' | null)[]>(Array(HEADLINES.length).fill(null));
  const [pending, setPending] = useState<'signal' | 'noise' | 'clickbait' | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { awardResources } = usePlatformIntegration();

  const endGame = useCallback((isTimeout = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimedOut(isTimeout);
    setGameOver(true);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { endGame(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [endGame]);

  const headline = HEADLINES[index];
  const correctChoices = choices.filter((c, i) => c !== null && c === HEADLINES[i].correct).length;
  const answered = choices.filter(c => c !== null).length;

  const choose = (action: 'signal' | 'noise' | 'clickbait') => {
    if (revealed) return;
    setPending(action);
  };

  const confirm = () => {
    if (!pending) return;
    const next = [...choices];
    next[index] = pending;
    setChoices(next);
    setRevealed(true);
  };

  const advance = () => {
    if (index < HEADLINES.length - 1) {
      setIndex(i => i + 1);
      setPending(null);
      setRevealed(false);
    } else {
      endGame(false);
    }
  };

  const score = choices.filter((c, i) => c !== null && c === HEADLINES[i].correct).length;
  const maxScore = HEADLINES.length;

  const handleContinue = () => {
    awardResources(100, 25, 'Boss: Phil\'s News Room', true);
    onComplete({ bambooEarned: 100, xpEarned: 25 });
  };

  const handleReplay = () => {
    setIndex(0);
    setChoices(Array(HEADLINES.length).fill(null));
    setPending(null);
    setRevealed(false);
    setTimeLeft(TOTAL_TIME);
    setGameOver(false);
    setTimedOut(false);
    // Restart timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { endGame(true); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const timerPct = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timerPct > 50 ? 'bg-emerald-500' : timerPct > 25 ? 'bg-amber-500' : 'bg-red-500';
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (gameOver) {
    return (
      <BossShell title="Phil's News Room" icon="📰" onExit={onExit}>
        <div className="space-y-4">
          {timedOut && (
            <div className="p-3 rounded-lg bg-amber-900/30 border border-amber-600 text-center text-amber-300 text-sm">
              <ThemedEmoji emoji="⏰" className="h-[1em] w-[1em]" /> Time\'s up! You sorted {answered} of {HEADLINES.length} headlines.
            </div>
          )}
          <BossScoreCard
            score={score}
            maxScore={maxScore}
            goldThreshold={80}
            silverThreshold={55}
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
    <BossShell title="Phil's News Room" icon="📰" onExit={onExit}>
      <div className="space-y-4">
        {/* Timer & progress */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{index + 1}/{HEADLINES.length}</span>
          <span className={cn('font-mono font-bold', timeLeft <= 30 ? 'text-red-400' : 'text-emerald-400')}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
          <span>{correctChoices} correct</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-1000', timerColor)} style={{ width: `${timerPct}%` }} />
        </div>

        {/* Newspaper masthead */}
        <div className="rounded-xl border-2 border-slate-600 overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-600">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">Bamboo City Financial Times</span>
            <span className="text-xs text-slate-500 font-mono">WIRE</span>
          </div>
          <div className="bg-slate-900 p-4 min-h-[80px] flex items-center">
            <p className="text-white font-bold text-sm leading-snug">{headline.text}</p>
          </div>
        </div>

        {/* Action buttons */}
        {!revealed ? (
          <div className="space-y-3">
            <p className="text-sm text-emerald-400 text-center">Where does this headline go?</p>
            <div className="space-y-2">
              {(Object.entries(ACTION_LABELS) as [keyof typeof ACTION_LABELS, typeof ACTION_LABELS[keyof typeof ACTION_LABELS]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => choose(key)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center gap-3',
                    pending === key ? val.color : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                  )}
                >
                  <span className="text-xl">{val.emoji}</span>
                  <div>
                    <div className="font-medium">{val.label}</div>
                    <div className="text-xs opacity-70">{val.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            {pending && (
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={confirm}>
                File It
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className={cn(
              'p-3 rounded-lg border text-sm font-medium text-center',
              choices[index] === headline.correct
                ? 'bg-emerald-900/50 border-emerald-500 text-emerald-300'
                : 'bg-red-900/30 border-red-500 text-red-300'
            )}>
              {choices[index] === headline.correct
                ? `✓ ${ACTION_LABELS[headline.correct].label}`
                : `✗ Should be: ${ACTION_LABELS[headline.correct].emoji} ${ACTION_LABELS[headline.correct].label}`}
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
              {headline.feedback}
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={advance}>
              {index < HEADLINES.length - 1 ? 'Next Headline →' : 'See Results'}
            </Button>
          </div>
        )}
      </div>
    </BossShell>
  );
};

export default PhilsNewsRoom;
