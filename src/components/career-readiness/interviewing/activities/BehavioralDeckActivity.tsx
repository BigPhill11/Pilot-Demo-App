import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BEHAVIORAL_QUESTIONS, BEHAVIORAL_MIN_ANSWERS } from '@/data/career-readiness/interviewing';
import AudioRecorder from '../AudioRecorder';
import type { InterviewActivityProps } from './types';

const BehavioralDeckActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const behavioralAnswers = answers.behavioralAnswers ?? {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const q = BEHAVIORAL_QUESTIONS[currentIndex];

  const answeredCount = BEHAVIORAL_QUESTIONS.filter(
    (bq) => (behavioralAnswers[bq.id] ?? '').trim().length >= 80
  ).length;

  const updateAnswer = (text: string) => {
    onUpdateAnswers({
      behavioralAnswers: { ...behavioralAnswers, [q.id]: text },
    });
  };

  const currentAnswer = behavioralAnswers[q.id] ?? '';
  const canAdvance = currentAnswer.trim().length >= 80;

  const handleNext = () => {
    if (currentIndex < BEHAVIORAL_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleComplete = () => {
    if (answeredCount >= BEHAVIORAL_MIN_ANSWERS) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-emerald-700">
          Question {currentIndex + 1} of {BEHAVIORAL_QUESTIONS.length}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {answeredCount}/{BEHAVIORAL_MIN_ANSWERS}+ answered
        </span>
      </div>

      <Card className="border-emerald-100">
        <CardContent className="p-4 space-y-3">
          <p className="font-semibold text-lg">&quot;{q.question}&quot;</p>
          <p className="text-sm text-emerald-800">
            <strong>They want:</strong> {q.lookingFor}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> {q.tip}
          </p>
        </CardContent>
      </Card>

      <Textarea
        placeholder="Write your STAR-style answer (80+ characters)…"
        value={currentAnswer}
        onChange={(e) => updateAnswer(e.target.value)}
        className="min-h-32"
      />

      <AudioRecorder
        onTranscription={(text) => updateAnswer(currentAnswer ? `${currentAnswer}\n\n${text}` : text)}
        placeholder="Practice your answer out loud, then add notes here."
      />

      <div className="flex gap-2">
        {currentIndex > 0 && (
          <Button variant="outline" onClick={() => setCurrentIndex((i) => i - 1)}>
            Previous
          </Button>
        )}
        {currentIndex < BEHAVIORAL_QUESTIONS.length - 1 ? (
          <Button
            className="flex-1 bg-emerald-800 hover:bg-emerald-900"
            disabled={!canAdvance}
            onClick={handleNext}
          >
            Next question
          </Button>
        ) : (
          <Button
            className="flex-1 bg-emerald-800 hover:bg-emerald-900"
            disabled={answeredCount < BEHAVIORAL_MIN_ANSWERS}
            onClick={handleComplete}
          >
            Complete behavioral practice
          </Button>
        )}
      </div>
    </div>
  );
};

export default BehavioralDeckActivity;
