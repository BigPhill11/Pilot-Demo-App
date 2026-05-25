import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AudioRecorder from '../AudioRecorder';
import type { InterviewActivityProps } from './types';

const MOCK_PROMPT =
  'Tell me about yourself and why you are interested in a business or finance role.';

const MockRecorderActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const reflections = answers.mockReflections ?? {};
  const response = reflections['intro'] ?? '';
  const reflection = reflections['introReflection'] ?? '';

  const update = (key: string, value: string) => {
    onUpdateAnswers({ mockReflections: { ...reflections, [key]: value } });
  };

  const valid = response.trim().length >= 100 && reflection.trim().length >= 40;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
        <p className="text-sm font-medium text-emerald-900">Mock interviewer says:</p>
        <p className="text-lg font-semibold mt-1">&quot;{MOCK_PROMPT}&quot;</p>
        <p className="text-xs text-emerald-700/80 mt-2">Aim for 60–90 seconds when spoken aloud.</p>
      </div>

      <div className="space-y-2">
        <Label>Your practice answer</Label>
        <Textarea
          placeholder="Write your answer here. Hit the key points: who you are, what you've done, why finance/business…"
          value={response}
          onChange={(e) => update('intro', e.target.value)}
          className="min-h-36"
        />
      </div>

      <AudioRecorder
        onTranscription={(text) => update('intro', response ? `${response}\n\n${text}` : text)}
        placeholder="Practice your intro answer out loud."
      />

      <div className="space-y-2">
        <Label>Quick reflection</Label>
        <Textarea
          placeholder="What felt strong? What would you tighten next time?"
          value={reflection}
          onChange={(e) => update('introReflection', e.target.value)}
          className="min-h-20"
        />
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!valid}
        onClick={onComplete}
      >
        Save mock practice
      </Button>
    </div>
  );
};

export default MockRecorderActivity;
