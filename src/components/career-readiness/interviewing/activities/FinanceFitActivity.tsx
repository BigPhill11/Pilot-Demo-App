import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FINANCE_FIT_QUESTIONS } from '@/data/career-readiness/interviewing';
import type { InterviewActivityProps } from './types';

const FinanceFitActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const fitAnswers = answers.financeFitAnswers ?? {};
  const [index, setIndex] = useState(0);
  const q = FINANCE_FIT_QUESTIONS[index];

  const update = (text: string) => {
    onUpdateAnswers({ financeFitAnswers: { ...fitAnswers, [q.id]: text } });
  };

  const allValid = FINANCE_FIT_QUESTIONS.every(
    (fq) => (fitAnswers[fq.id] ?? '').trim().length >= fq.minLength
  );
  const current = fitAnswers[q.id] ?? '';
  const currentValid = current.trim().length >= q.minLength;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Finance and business roles test whether you can explain ideas clearly—not just memorize jargon.
      </p>

      <Card className="border-emerald-100">
        <CardContent className="p-4">
          <p className="font-semibold">{q.question}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Question {index + 1} of {FINANCE_FIT_QUESTIONS.length}
          </p>
        </CardContent>
      </Card>

      <Textarea
        placeholder={q.placeholder}
        value={current}
        onChange={(e) => update(e.target.value)}
        className="min-h-32"
      />
      <p className="text-xs text-muted-foreground">
        {current.length}/{q.minLength}+ characters
      </p>

      <div className="flex gap-2">
        {index > 0 && (
          <Button variant="outline" onClick={() => setIndex((i) => i - 1)}>
            Back
          </Button>
        )}
        {index < FINANCE_FIT_QUESTIONS.length - 1 ? (
          <Button
            className="flex-1 bg-emerald-800 hover:bg-emerald-900"
            disabled={!currentValid}
            onClick={() => setIndex((i) => i + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            className="flex-1 bg-emerald-800 hover:bg-emerald-900"
            disabled={!allValid}
            onClick={onComplete}
          >
            Save finance fit answers
          </Button>
        )}
      </div>
    </div>
  );
};

export default FinanceFitActivity;
