import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AudioRecorder from '../AudioRecorder';
import type { InterviewActivityProps } from './types';

const ThankYouEmailActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const email = answers.thankYouEmail ?? {
    subject: '',
    greeting: '',
    specificReference: '',
    interestRestatement: '',
    close: '',
  };

  const update = (field: keyof typeof email, value: string) => {
    onUpdateAnswers({ thankYouEmail: { ...email, [field]: value } });
  };

  const preview = useMemo(() => {
    const parts = [
      email.greeting && `${email.greeting}\n`,
      email.specificReference,
      email.interestRestatement,
      email.close,
    ].filter(Boolean);
    return parts.join('\n\n');
  }, [email]);

  const valid =
    email.subject.trim().length >= 5 &&
    email.greeting.trim().length >= 10 &&
    email.specificReference.trim().length >= 40 &&
    email.interestRestatement.trim().length >= 30 &&
    email.close.trim().length >= 5;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Send within 12–24 hours. Reference something specific from the conversation—generic notes
        get forgotten.
      </p>

      <div className="space-y-2">
        <Label>Subject line</Label>
        <Input
          placeholder="Thank you — Summer Analyst interview"
          value={email.subject}
          onChange={(e) => update('subject', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Greeting</Label>
        <Input
          placeholder="Dear Ms. Rivera,"
          value={email.greeting}
          onChange={(e) => update('greeting', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Specific reference (what you discussed)</Label>
        <Textarea
          placeholder="Thank you for taking the time today. I especially enjoyed our discussion about…"
          value={email.specificReference}
          onChange={(e) => update('specificReference', e.target.value)}
          className="min-h-20"
        />
      </div>

      <div className="space-y-2">
        <Label>Restate your interest</Label>
        <Textarea
          placeholder="Our conversation reinforced my interest in…"
          value={email.interestRestatement}
          onChange={(e) => update('interestRestatement', e.target.value)}
          className="min-h-20"
        />
      </div>

      <div className="space-y-2">
        <Label>Professional close</Label>
        <Input
          placeholder="Best regards, Jordan"
          value={email.close}
          onChange={(e) => update('close', e.target.value)}
        />
      </div>

      <AudioRecorder
        onTranscription={(text) =>
          update('specificReference', email.specificReference ? `${email.specificReference}\n${text}` : text)
        }
        placeholder="Practice reading your thank-you note aloud."
      />

      {preview.length > 50 && (
        <div className="p-4 rounded-xl bg-muted/40 border text-sm whitespace-pre-wrap">
          <p className="font-medium text-xs text-muted-foreground mb-2">Preview</p>
          <p className="font-medium">{email.subject}</p>
          <hr className="my-2" />
          {preview}
        </div>
      )}

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!valid}
        onClick={onComplete}
      >
        Save thank-you email
      </Button>
    </div>
  );
};

export default ThankYouEmailActivity;
