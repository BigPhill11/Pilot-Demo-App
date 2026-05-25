import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { InterviewActivityProps } from './types';

const QuestionRecoveryActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const text = answers.recoveryQuestions ?? '';

  const valid = text.trim().length >= 80;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Forgot to ask something important? You can follow up professionally in your thank-you note
        or a brief later email—without sounding demanding.
      </p>

      <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-2">
        <p className="font-medium">Good recovery questions sound like:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>&quot;You mentioned the mentorship program—how do analysts typically use it in year one?&quot;</li>
          <li>&quot;I&apos;m curious how the team has adapted to recent market shifts—what skills matter most now?&quot;</li>
        </ul>
      </div>

      <div className="space-y-2">
        <Label>Your follow-up questions (1–2)</Label>
        <Textarea
          placeholder="Write questions you could add to a thank-you email or polite follow-up…"
          value={text}
          onChange={(e) => onUpdateAnswers({ recoveryQuestions: e.target.value })}
          className="min-h-32"
        />
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!valid}
        onClick={onComplete}
      >
        Save recovery questions
      </Button>
    </div>
  );
};

export default QuestionRecoveryActivity;
