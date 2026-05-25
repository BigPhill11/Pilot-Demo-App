import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TONE_CHECK_SCENARIOS } from '@/data/career-readiness/interviewing';
import type { InterviewActivityProps } from './types';

const ToneCheckActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
}) => {
  const results = answers.toneCheckResults ?? {};
  const [index, setIndex] = useState(0);
  const scenario = TONE_CHECK_SCENARIOS[index];
  const chosen = results[scenario.id];
  const isCorrect = chosen === scenario.correctId;

  const pick = (emailId: string) => {
    onUpdateAnswers({ toneCheckResults: { ...results, [scenario.id]: emailId } });
  };

  const allCorrect = TONE_CHECK_SCENARIOS.every((s) => results[s.id] === s.correctId);

  const handleNext = () => {
    if (index < TONE_CHECK_SCENARIOS.length - 1) {
      setIndex((i) => i + 1);
    } else if (allCorrect) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{scenario.context}</p>

      <div className="space-y-3">
        {scenario.emails.map((email) => (
          <button
            key={email.id}
            type="button"
            disabled={!!chosen && !allowEdit}
            onClick={() => pick(email.id)}
            className={`w-full text-left p-3 rounded-xl border-2 transition-colors ${
              chosen === email.id
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-red-300 bg-red-50'
                : 'border-border hover:border-emerald-200'
            }`}
          >
            <p className="text-xs font-medium text-muted-foreground">{email.subject}</p>
            <p className="text-sm mt-1">{email.body}</p>
          </button>
        ))}
      </div>

      {chosen && (
        <div
          className={`p-3 rounded-lg text-sm ${
            isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
          }`}
        >
          {scenario.feedback}
        </div>
      )}

      {chosen && (
        <div className="flex flex-col gap-2">
          {allowEdit && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const next = { ...results };
                delete next[scenario.id];
                onUpdateAnswers({ toneCheckResults: next });
              }}
            >
              Change my answer
            </Button>
          )}
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            onClick={handleNext}
            disabled={index === TONE_CHECK_SCENARIOS.length - 1 && !allCorrect}
          >
            {index < TONE_CHECK_SCENARIOS.length - 1
              ? 'Next'
              : allCorrect
                ? 'Save & mark simulation complete'
                : 'Try again'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ToneCheckActivity;
