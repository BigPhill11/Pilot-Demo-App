import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { StarStory } from '@/types/career-readiness';
import type { InterviewActivityProps } from './types';

const EMPTY_STAR: StarStory = { situation: '', task: '', action: '', result: '' };

const StarBuilderActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const story = answers.starStories?.[0] ?? EMPTY_STAR;

  const update = (field: keyof StarStory, value: string) => {
    onUpdateAnswers({ starStories: [{ ...story, [field]: value }] });
  };

  const valid =
    story.situation.trim().length >= 20 &&
    story.task.trim().length >= 15 &&
    story.action.trim().length >= 30 &&
    story.result.trim().length >= 15;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Build one STAR story for: <strong>&quot;Tell me about a time you overcame a challenge.&quot;</strong>
      </p>

      <div className="grid gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-sm">
        <p><strong>S</strong>ituation — set the scene (20%)</p>
        <p><strong>T</strong>ask — your responsibility (10%)</p>
        <p><strong>A</strong>ction — what YOU did (40%)</p>
        <p><strong>R</strong>esult — outcome with numbers if possible (30%)</p>
      </div>

      {(
        [
          ['situation', 'Situation', 'When and where? What was the challenge?'],
          ['task', 'Task', 'What were you responsible for?'],
          ['action', 'Action', 'What specific steps did you take?'],
          ['result', 'Result', 'What happened? Include metrics if you can.'],
        ] as const
      ).map(([field, label, hint]) => (
        <div key={field} className="space-y-2">
          <Label>{label}</Label>
          <p className="text-xs text-muted-foreground">{hint}</p>
          <Textarea
            value={story[field]}
            onChange={(e) => update(field, e.target.value)}
            className="min-h-20"
          />
        </div>
      ))}

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!valid}
        onClick={onComplete}
      >
        Save & mark simulation complete
      </Button>
    </div>
  );
};

export default StarBuilderActivity;
