import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ANSWER_COACH_SCENARIOS } from '@/data/career-readiness/interviewing';
import type { InterviewActivityProps } from './types';

const AnswerCoachActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
}) => {
  const results = answers.answerCoachResults ?? {};
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = ANSWER_COACH_SCENARIOS[scenarioIndex];
  const chosen = results[scenario.id];

  const pick = (choice: 'weak' | 'okay' | 'strong') => {
    onUpdateAnswers({
      answerCoachResults: { ...results, [scenario.id]: choice },
    });
  };

  const allDone = ANSWER_COACH_SCENARIOS.every((s) => results[s.id]);
  const allCorrect = ANSWER_COACH_SCENARIOS.every(
    (s) => results[s.id] === s.correctChoice
  );

  const handleNext = () => {
    if (scenarioIndex < ANSWER_COACH_SCENARIOS.length - 1) {
      setScenarioIndex((i) => i + 1);
    } else if (allCorrect) {
      onComplete();
    }
  };

  const options = [
    { key: 'weak' as const, label: 'Weak', text: scenario.weak, class: 'border-red-200 hover:bg-red-50' },
    { key: 'okay' as const, label: 'Okay', text: scenario.okay, class: 'border-amber-200 hover:bg-amber-50' },
    { key: 'strong' as const, label: 'Strong', text: scenario.strong, class: 'border-emerald-200 hover:bg-emerald-50' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Which answer would impress a finance interviewer? Scenario {scenarioIndex + 1} of{' '}
        {ANSWER_COACH_SCENARIOS.length}
      </p>

      <Card>
        <CardContent className="p-4">
          <p className="font-semibold">&quot;{scenario.question}&quot;</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            disabled={!!chosen && !allowEdit}
            onClick={() => pick(opt.key)}
            className={`w-full text-left p-3 rounded-xl border-2 transition-colors ${opt.class} ${
              chosen === opt.key
                ? opt.key === scenario.correctChoice
                  ? 'ring-2 ring-emerald-500'
                  : 'ring-2 ring-red-400'
                : ''
            }`}
          >
            <span className="text-xs font-bold uppercase text-muted-foreground">{opt.label}</span>
            <p className="text-sm mt-1">{opt.text}</p>
          </button>
        ))}
      </div>

      {chosen && (
        <div
          className={`p-3 rounded-lg text-sm ${
            chosen === scenario.correctChoice
              ? 'bg-emerald-50 text-emerald-800'
              : 'bg-amber-50 text-amber-900'
          }`}
        >
          {chosen === scenario.correctChoice ? '✓ ' : ''}
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
                onUpdateAnswers({ answerCoachResults: next });
              }}
            >
              Change my answer
            </Button>
          )}
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            onClick={handleNext}
            disabled={scenarioIndex === ANSWER_COACH_SCENARIOS.length - 1 && !allCorrect}
          >
            {scenarioIndex < ANSWER_COACH_SCENARIOS.length - 1
              ? 'Next scenario'
              : allCorrect
                ? 'Save & mark simulation complete'
                : 'Review and retry scenarios'}
          </Button>
        </div>
      )}

      {allDone && !allCorrect && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            onUpdateAnswers({ answerCoachResults: {} });
            setScenarioIndex(0);
          }}
        >
          Reset coach
        </Button>
      )}
    </div>
  );
};

export default AnswerCoachActivity;
