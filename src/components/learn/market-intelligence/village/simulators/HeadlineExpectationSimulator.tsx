import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, TrendingDown, TrendingUp } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

type Phase = 'headline' | 'filing' | 'done';

const HEADLINE =
  'Bamboo Corp Announces Record Shoe Sales, But Misses Expert Projections by 1%';
const CONSENSUS = 'Wall Street expected slightly higher sales';
const ACTUAL_MOVE = 'down' as const;

const FILING_LINES = [
  {
    id: 'fluff',
    text: 'Our brand mission is to inspire every customer to walk with confidence.',
    isTrap: false,
  },
  {
    id: 'trap',
    text: 'Our factory rent may jump by a random amount next year, which could squeeze margins.',
    isTrap: true,
  },
  {
    id: 'hype',
    text: 'We believe our viral marketing campaign will keep sentiment strong through any setback.',
    isTrap: false,
  },
];

const HeadlineExpectationSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [phase, setPhase] = useState<Phase>('headline');
  const [prediction, setPrediction] = useState(50);
  const [showHeadlineFeedback, setShowHeadlineFeedback] = useState(false);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [filingFeedback, setFilingFeedback] = useState<string | null>(null);
  const [multiplierUnlocked, setMultiplierUnlocked] = useState(false);

  const predictedUp = prediction >= 50;

  const submitPrediction = () => {
    setShowHeadlineFeedback(true);
  };

  const goToFiling = () => {
    setPhase('filing');
    setShowHeadlineFeedback(false);
  };

  const pickLine = (id: string) => {
    if (filingFeedback) return;
    setSelectedLine(id);
    const line = FILING_LINES.find((l) => l.id === id)!;
    if (line.isTrap) {
      setMultiplierUnlocked(true);
      setFilingFeedback(
        'You found the real risk buried in the fine print. Smart owners read Item 1A-style warnings before they buy. Homework bonus unlocked.'
      );
    } else {
      setFilingFeedback(
        'That line sounds important, but it is PR fluff—not a cash-flow threat. Keep scanning for what could actually hurt the business.'
      );
    }
  };

  const finish = () => {
    setPhase('done');
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        phase === 'done' ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      {phase === 'headline' && (
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-teal-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wide mb-2">
              Live ticker
            </p>
            <p className="text-sm font-semibold text-gray-900 leading-snug">{HEADLINE}</p>
            <p className="text-xs text-gray-500 mt-2">{CONSENSUS}</p>
          </div>

          {!showHeadlineFeedback ? (
            <>
              <p className="text-sm text-gray-700">
                Slide to predict the stock&apos;s next move. High sales sound good—but did the
                company beat the hype?
              </p>
              <div className="flex items-center justify-between text-xs font-medium text-gray-600">
                <span className="flex items-center gap-1">
                  <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                  Price drops
                </span>
                <span className="flex items-center gap-1">
                  Price pops
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                </span>
              </div>
              <Slider
                value={[prediction]}
                onValueChange={(v) => setPrediction(v[0])}
                max={100}
                step={1}
                className="py-2"
              />
              <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={submitPrediction}>
                Lock in my prediction
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <div
                className={`rounded-xl border-2 p-4 ${
                  predictedUp === (ACTUAL_MOVE === 'up')
                    ? 'border-green-300 bg-green-50'
                    : 'border-amber-300 bg-amber-50'
                }`}
              >
                <p className="text-xs font-bold text-gray-800 mb-2">Phil says:</p>
                {predictedUp ? (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Sales were strong, but the stock dipped because results missed the{' '}
                    <strong>hype threshold</strong>—what experts expected. Markets trade on
                    surprise, not vibes.
                  </p>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Nice read. Even &quot;good&quot; headlines can drop the stock when reality
                    lands below expectations.
                  </p>
                )}
                <p className="text-xs text-gray-600 mt-2 italic">
                  Actual move: stock dipped ~2% after the headline.
                </p>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={goToFiling}>
                Next: scan the 10-K snippet
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {phase === 'filing' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">
              Snippet from a 10-K (Risk Factors)
            </p>
            <div className="space-y-2">
              {FILING_LINES.map((line) => (
                <button
                  key={line.id}
                  type="button"
                  disabled={!!filingFeedback && selectedLine !== line.id}
                  onClick={() => pickLine(line.id)}
                  className={`w-full text-left text-sm p-3 rounded-lg border-2 transition-all ${
                    selectedLine === line.id
                      ? line.isTrap
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-teal-400'
                  }`}
                >
                  {line.text}
                </button>
              ))}
            </div>
          </div>
          {filingFeedback && (
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-3">
              <p className="text-sm text-teal-900">{filingFeedback}</p>
              {multiplierUnlocked && (
                <p className="text-xs font-bold text-green-700 mt-2">
                  Bonus: +15% homework multiplier on your next virtual buy
                </p>
              )}
            </div>
          )}
          {filingFeedback && (
            <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={finish}>
              Finish simulation
            </Button>
          )}
        </div>
      )}
    </SimulatorShell>
  );
};

export default HeadlineExpectationSimulator;
