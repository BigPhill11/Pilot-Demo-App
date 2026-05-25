import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HeadlineDecoderHeadline } from '@/types/mi-lesson';

interface HeadlineDecoderTryProps {
  title: string;
  description: string;
  headlines: HeadlineDecoderHeadline[];
  onComplete: () => void;
}

type CallChoice = 'signal' | 'noise';

interface HeadlineState {
  choice?: CallChoice;
  highlightedPhrase?: string;
  revealed: boolean;
}

const HeadlineDecoderTry: React.FC<HeadlineDecoderTryProps> = ({
  title,
  description,
  headlines,
  onComplete,
}) => {
  const [index, setIndex] = useState(0);
  const [states, setStates] = useState<HeadlineState[]>(headlines.map(() => ({ revealed: false })));
  const [done, setDone] = useState(false);

  const current = headlines[index];
  const currentState = states[index];

  const makeCall = (choice: CallChoice) => {
    if (currentState.revealed) return;
    setStates(prev => {
      const next = [...prev];
      next[index] = { ...next[index], choice, revealed: true };
      return next;
    });
  };

  const isCorrect = currentState.choice === current?.correctCall;

  const handleNext = () => {
    if (index < headlines.length - 1) {
      setIndex(i => i + 1);
    } else {
      setDone(true);
    }
  };

  const correct = states.filter((s, i) => s.choice === headlines[i].correctCall).length;

  if (done) {
    return (
      <div className="space-y-4">
        <div className="text-center p-6 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="text-4xl mb-3">
            {correct >= Math.ceil(headlines.length * 0.7) ? '🎯' : '📰'}
          </div>
          <h3 className="text-lg font-bold text-green-800 mb-1">
            {correct}/{headlines.length} Signal Calls
          </h3>
          <p className="text-sm text-green-700/80">
            {correct >= Math.ceil(headlines.length * 0.7)
              ? "Sharp eye — you caught the real signals."
              : "Keep practicing. The signal gets clearer every time."}
          </p>
        </div>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onComplete}>
          Continue <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-green-800 text-base">{title}</h3>
        <p className="text-sm text-green-700/70 mt-1">{description}</p>
      </div>

      <div className="text-xs text-green-600/60">{index + 1} of {headlines.length}</div>

      {/* Headline */}
      <div className="p-4 rounded-xl bg-[#faf8f0] border-2 border-green-200">
        <div className="text-xs uppercase tracking-widest text-green-600/60 mb-2 font-serif">Headline</div>
        <p className="text-base font-serif font-semibold text-green-900 leading-snug">
          {currentState.revealed && current.signalPhrase
            ? current.text.split(current.signalPhrase).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className={cn(
                      'rounded px-0.5',
                      currentState.choice === 'signal' ? 'bg-emerald-200 text-emerald-900' : 'bg-red-100 text-red-800'
                    )}>
                      {current.signalPhrase}
                    </span>
                  )}
                </React.Fragment>
              ))
            : current.text}
        </p>
      </div>

      {/* Call buttons */}
      {!currentState.revealed ? (
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            onClick={() => makeCall('signal')}
          >
            📈 Signal
          </Button>
          <Button
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
            onClick={() => makeCall('noise')}
          >
            🔇 Noise
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={cn(
            'flex items-center gap-2 p-3 rounded-lg text-sm font-medium',
            isCorrect ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          )}>
            {isCorrect ? <Check className="h-4 w-4 shrink-0" /> : <X className="h-4 w-4 shrink-0" />}
            <span>{isCorrect ? 'Right call.' : `Actually: ${current.correctCall}.`}</span>
          </div>
          <p className="text-sm text-green-700/80 bg-green-50 border border-green-200 rounded-lg p-3">
            {current.feedback}
          </p>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleNext}>
            {index < headlines.length - 1 ? 'Next Headline' : 'See Results'}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeadlineDecoderTry;
