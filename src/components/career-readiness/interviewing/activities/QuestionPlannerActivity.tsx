import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { InterviewActivityProps } from './types';

const PROMPTS = [
  'About the team: culture, feedback, or day-to-day work',
  'About growth: skills successful people build here',
  'About the business: trends, clients, or recent work',
];

const QuestionPlannerActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const questions = answers.plannedQuestions ?? ['', '', ''];

  const update = (index: number, value: string) => {
    const next = [...questions];
    next[index] = value;
    onUpdateAnswers({ plannedQuestions: next });
  };

  const valid = questions.every((q) => q.trim().length >= 15);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Strong candidates always ask thoughtful questions at the end. Draft three—you will sound
        curious, not scripted.
      </p>

      {PROMPTS.map((prompt, i) => (
        <div key={i} className="space-y-2">
          <Label>Question {i + 1}</Label>
          <p className="text-xs text-muted-foreground">{prompt}</p>
          <Textarea
            placeholder="Write your question here…"
            value={questions[i] ?? ''}
            onChange={(e) => update(i, e.target.value)}
            className="min-h-20"
          />
        </div>
      ))}

      <div className="p-3 rounded-lg bg-muted/50 text-sm">
        <p className="font-medium mb-1">Avoid asking first:</p>
        <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
          <li>Salary and benefits (early rounds)</li>
          <li>Hours/vacation unless they bring it up</li>
          <li>Anything easily Googled</li>
        </ul>
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!valid}
        onClick={onComplete}
      >
        Save my questions
      </Button>
    </div>
  );
};

export default QuestionPlannerActivity;
