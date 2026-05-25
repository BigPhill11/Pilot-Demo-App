import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FOLLOW_UP_TIMING_SCENARIOS } from '@/data/career-readiness/interviewing';
import type { InterviewActivityProps } from './types';

const FollowUpTimingActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
}) => {
  const results = answers.followUpTimingResults ?? {};
  const [index, setIndex] = useState(0);
  const scenario = FOLLOW_UP_TIMING_SCENARIOS[index];
  const chosen = results[scenario.id];
  const chosenOption = scenario.options.find((o) => o.id === chosen);

  const pick = (optionId: string) => {
    onUpdateAnswers({
      followUpTimingResults: { ...results, [scenario.id]: optionId },
    });
  };

  const allCorrect = FOLLOW_UP_TIMING_SCENARIOS.every((s) => {
    const pickId = results[s.id];
    return s.options.find((o) => o.id === pickId)?.isCorrect;
  });

  const handleNext = () => {
    if (index < FOLLOW_UP_TIMING_SCENARIOS.length - 1) {
      setIndex((i) => i + 1);
    } else if (allCorrect) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Scenario {index + 1} of {FOLLOW_UP_TIMING_SCENARIOS.length} — choose the professional move.
      </p>

      <Card className="border-emerald-100 bg-emerald-50/30">
        <CardContent className="p-4">
          <p className="font-medium">{scenario.situation}</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {scenario.options.map((opt) => (
          <Button
            key={opt.id}
            variant="outline"
            disabled={!!chosen && !allowEdit}
            className={`w-full justify-start h-auto py-3 text-left whitespace-normal ${
              chosen === opt.id
                ? opt.isCorrect
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-red-300 bg-red-50'
                : ''
            }`}
            onClick={() => pick(opt.id)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {chosenOption && (
        <div
          className={`p-3 rounded-lg text-sm ${
            chosenOption.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
          }`}
        >
          {chosenOption.feedback}
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
                onUpdateAnswers({ followUpTimingResults: next });
              }}
            >
              Change my answer
            </Button>
          )}
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            onClick={handleNext}
            disabled={index === FOLLOW_UP_TIMING_SCENARIOS.length - 1 && !allCorrect}
          >
            {index < FOLLOW_UP_TIMING_SCENARIOS.length - 1
              ? 'Next scenario'
              : allCorrect
                ? 'Save & mark simulation complete'
                : 'Review scenarios'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FollowUpTimingActivity;
