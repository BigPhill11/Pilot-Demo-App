import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, ArrowLeft } from 'lucide-react';
import type { InterviewModuleAnswers } from '@/types/career-readiness';

interface InterviewFinishScreenProps {
  answers: InterviewModuleAnswers;
  onBackToCareer: () => void;
}

const InterviewFinishScreen: React.FC<InterviewFinishScreenProps> = ({
  answers,
  onBackToCareer,
}) => {
  const star = answers.starStories?.[0];
  const why = answers.whyRole;
  const email = answers.thankYouEmail;

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-emerald-900">Interview Prep Complete!</h2>
          <p className="text-emerald-800/80 mt-2">
            You&apos;ve practiced research, behavioral stories, mock responses, and professional follow-up.
            Badge unlocked!
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {why && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Your Why This Role</h3>
              <p className="text-sm">
                <strong>{why.role}</strong> at <strong>{why.company}</strong>
              </p>
              <p className="text-sm mt-2 text-muted-foreground line-clamp-3">{why.specificReason}</p>
            </CardContent>
          </Card>
        )}

        {star && star.situation && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Strongest STAR Story</h3>
              <p className="text-sm"><strong>S:</strong> {star.situation.slice(0, 120)}…</p>
              <p className="text-sm mt-1"><strong>R:</strong> {star.result.slice(0, 120)}…</p>
            </CardContent>
          </Card>
        )}

        {email && email.subject && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Thank-You Email Draft</h3>
              <p className="text-sm font-medium">{email.subject}</p>
              <p className="text-sm mt-2 text-muted-foreground line-clamp-4">
                {email.specificReference}
              </p>
            </CardContent>
          </Card>
        )}

        {answers.plannedQuestions && answers.plannedQuestions.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Questions to Ask</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {answers.plannedQuestions.filter(Boolean).map((q, i) => (
                  <li key={i} className="line-clamp-2">{q}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <Button className="w-full bg-emerald-800 hover:bg-emerald-900" onClick={onBackToCareer}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Career Readiness
      </Button>
    </div>
  );
};

export default InterviewFinishScreen;
