import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Consequence } from '@/types/career-story';
import { CheckCircle, XCircle, Lightbulb, MessageSquare } from 'lucide-react';

interface ConsequenceFeedbackProps {
  consequence: Consequence;
  onContinue: () => void;
}

const ConsequenceFeedback: React.FC<ConsequenceFeedbackProps> = ({ consequence, onContinue }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-4">Decision Impact</h3>
        
        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
          <p className="text-lg">{consequence.feedbackText}</p>
        </div>

        {consequence.positiveAspects.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold">What Went Well</h4>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {consequence.positiveAspects.map((aspect, i) => (
                <li key={i}>{aspect}</li>
              ))}
            </ul>
          </div>
        )}

        {consequence.negativeAspects.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-yellow-500" />
              <h4 className="font-semibold">Challenges</h4>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {consequence.negativeAspects.map((aspect, i) => (
                <li key={i}>{aspect}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4 p-4 bg-accent rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">Career Insight</h4>
          </div>
          <p className="text-sm">{consequence.careerInsight}</p>
        </div>

        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5" />
            <h4 className="font-semibold">Phil's Take</h4>
          </div>
          <p className="text-sm">{consequence.philsComment}</p>
        </div>

        <Button onClick={onContinue} className="w-full mt-6" size="lg">
          Continue Story
        </Button>
      </Card>
    </div>
  );
};

export default ConsequenceFeedback;
