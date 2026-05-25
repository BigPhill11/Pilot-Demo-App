import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, Clock } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';
import { cn } from '@/lib/utils';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

type Phase = 'sort' | 'fed' | 'result';

interface SortCard {
  id: string;
  text: string;
  bucket: 'signal' | 'noise';
  feedback: string;
}

const SORT_CARDS: SortCard[] = [
  {
    id: 'c1',
    text: 'CEO tweets a funny panda meme about their new app',
    bucket: 'noise',
    feedback: 'Viral posts do not change how much cash the business makes. Noise.',
  },
  {
    id: 'c2',
    text: 'Profit margin drops 3% because factory parts cost more',
    bucket: 'signal',
    feedback: 'Higher costs hit real earnings. That is signal.',
  },
  {
    id: 'c3',
    text: 'Stock had its "worst Tuesday since last Tuesday"',
    bucket: 'noise',
    feedback: 'Dramatic wording on a tiny move. Ignore it.',
  },
  {
    id: 'c4',
    text: 'Company restates three years of revenue numbers',
    bucket: 'signal',
    feedback: 'Past financials were wrong. Investors must rethink everything.',
  },
  {
    id: 'c5',
    text: 'Influencer says "this stock is the next big thing"',
    bucket: 'noise',
    feedback: 'Hype without business proof. Classic noise.',
  },
  {
    id: 'c6',
    text: 'Largest supplier files for bankruptcy',
    bucket: 'signal',
    feedback: 'Supply chain breaks change future profits. Major signal.',
  },
];

const MacroHeadlinesSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [phase, setPhase] = useState<Phase>('sort');
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [cardIndex, setCardIndex] = useState(0);
  const [sortScore, setSortScore] = useState(0);
  const [portfolioLeak, setPortfolioLeak] = useState(0);
  const [sortFeedback, setSortFeedback] = useState<string | null>(null);
  const [sortDone, setSortDone] = useState(false);

  const [tech, setTech] = useState(85);
  const [safe, setSafe] = useState(10);
  const cash = Math.max(0, 100 - tech - safe);
  const [fedSeconds, setFedSeconds] = useState(10);
  const [fedSubmitted, setFedSubmitted] = useState(false);
  const [resultText, setResultText] = useState('');

  const card = SORT_CARDS[cardIndex];

  const submitFed = (timedOut?: boolean) => {
    if (fedSubmitted) return;
    setFedSubmitted(true);
    setPhase('result');
    const tooRisky = tech >= 70;
    if (tooRisky) {
      setResultText(
        timedOut
          ? 'Fed hiked rates 0.50% and you ran out of time. Staying 85%+ in risky tech crushed your balance as borrowing got expensive. Macro Master badge missed—try shifting toward savings next time.'
          : 'Fed hiked rates 0.50% to cool inflation. Heavy tech exposure got hit hard. Investors rotated to safer savings. Your virtual balance shrank.'
      );
    } else {
      setResultText(
        'Macro Master move. You moved cash into safer savings when rates jumped. You avoided the worst of the tech selloff and kept your portfolio steadier.'
      );
    }
  };

  useEffect(() => {
    if (phase !== 'sort' || sortDone || sortFeedback) return;
    if (secondsLeft <= 0) {
      setSortDone(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, sortDone, sortFeedback, secondsLeft]);

  useEffect(() => {
    if (phase !== 'fed' || fedSubmitted) return;
    if (fedSeconds <= 0) {
      submitFed(true);
      return;
    }
    const t = setTimeout(() => setFedSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, fedSubmitted, fedSeconds]);

  const pickBucket = (bucket: 'signal' | 'noise') => {
    if (sortFeedback || sortDone) return;
    const ok = bucket === card.bucket;
    if (ok) setSortScore((s) => s + 1);
    else {
      setPortfolioLeak((l) => l + 8);
    }
    setSortFeedback(card.feedback);
  };

  const nextCard = () => {
    setSortFeedback(null);
    if (cardIndex >= SORT_CARDS.length - 1) {
      setSortDone(true);
      return;
    }
    setCardIndex((i) => i + 1);
  };

  const startFed = () => {
    setPhase('fed');
    setFedSeconds(10);
  };

  const setTechVal = (v: number) => {
    const maxTech = 100 - safe;
    setTech(Math.min(v, maxTech));
  };

  const setSafeVal = (v: number) => {
    const maxSafe = 100 - tech;
    setSafe(Math.min(v, maxSafe));
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        phase === 'result' ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      {phase === 'sort' && !sortDone && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {secondsLeft}s left
            </span>
            <span>
              Card {cardIndex + 1}/{SORT_CARDS.length} · Score {sortScore}
            </span>
          </div>
          {portfolioLeak > 0 && (
            <p className="text-xs text-red-600 font-medium">
              Portfolio leak: -{portfolioLeak}% from sorting noise into your investing column
            </p>
          )}
          <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-4 animate-in fade-in">
            <p className="text-sm font-medium text-gray-900">{card.text}</p>
          </div>
          {!sortFeedback ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-14 border-amber-400 text-amber-900"
                onClick={() => pickBucket('noise')}
              >
                Swipe → NOISE
              </Button>
              <Button
                className="h-14 bg-teal-600 hover:bg-teal-700"
                onClick={() => pickBucket('signal')}
              >
                Swipe → SIGNAL
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border">{sortFeedback}</p>
              <Button className="w-full" onClick={nextCard}>
                Next card
              </Button>
            </div>
          )}
        </div>
      )}

      {phase === 'sort' && sortDone && (
        <div className="space-y-3">
          <p className="text-sm text-gray-800">
            Trash-sort complete: {sortScore}/{SORT_CARDS.length} correct.
            {portfolioLeak > 0
              ? ` Noise mistakes cost your portfolio ${portfolioLeak}%.`
              : ' Clean filter—nice.'}
          </p>
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={startFed}>
            Flash macro alert: Fed rate hike
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {phase === 'fed' && !fedSubmitted && (
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-red-500 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800">
              The Fed just raised interest rates by 0.50% to stop rising prices!
            </p>
            <p className="text-xs text-red-700 mt-1">Rebalance in {fedSeconds}s</p>
          </div>
          <p className="text-xs text-gray-600">Interest rates UP → risky stocks usually DOWN</p>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>High-risk tech stocks</span>
              <span>{tech}%</span>
            </div>
            <Slider value={[tech]} onValueChange={(v) => setTechVal(v[0])} max={100} step={5} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Safe savings / bonds</span>
              <span>{safe}%</span>
            </div>
            <Slider value={[safe]} onValueChange={(v) => setSafeVal(v[0])} max={100} step={5} />
          </div>
          <p className="text-xs text-gray-500">Cash: {cash}% (fixed for this drill)</p>
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={() => submitFed()}>
            Lock portfolio mix
          </Button>
        </div>
      )}

      {phase === 'result' && (
        <div
          className={cn(
            'rounded-xl border-2 p-4',
            tech >= 70 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
          )}
        >
          {tech < 70 && (
            <p className="text-center text-lg font-bold text-green-700 mb-2">Macro Master</p>
          )}
          <p className="text-sm text-gray-800 leading-relaxed">{resultText}</p>
        </div>
      )}
    </SimulatorShell>
  );
};

export default MacroHeadlinesSimulator;
