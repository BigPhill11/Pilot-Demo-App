
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import AudioRecorder from './AudioRecorder';

interface InterviewModule5Props {
  onComplete: () => void;
  onBack: () => void;
}

const InterviewModule5: React.FC<InterviewModule5Props> = ({ onComplete, onBack }) => {
  const [thankYouNote, setThankYouNote] = useState('');
  const [rejectionResponse, setRejectionResponse] = useState('');

  const handleComplete = () => {
    toast.success("Module 5 completed! 🎉");
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Badge className="bg-blue-500">Module 5 of 6</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>Post-Interview Communication</span>
          </CardTitle>
          <Progress value={100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <h3 className="text-blue-800 font-semibold mb-2">🎯 Module Objectives:</h3>
              <p className="text-blue-700 mb-2">
                Master professional post-interview communication that reinforces your candidacy and 
                maintains relationships regardless of outcome.
              </p>
              <p className="text-blue-700 text-sm">
                <strong>Why this matters:</strong> The interview doesn't end when you leave the room. 
                Professional follow-up can differentiate you from other candidates, while poor communication 
                can undo a great interview. Finance is relationship-driven, and this shows your client-ready professionalism.
              </p>
            </div>

            <p className="text-lg">
              How you handle post-interview communication can make or break your candidacy. Learn to maintain 
              professionalism whether you receive good news or bad news.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 my-6">
              <h3 className="text-blue-800 font-semibold mb-2">📧 Communication Timeline:</h3>
              <ul className="text-blue-700 space-y-1">
                <li>• Thank you note: Within 12-24 hours</li>
                <li>• Follow-up (if no response): After 1-2 weeks</li>
                <li>• Offer response: Within stated timeframe</li>
                <li>• Rejection response: Within 24-48 hours</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">✍️ Practice: Write a Thank You Note</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Write a professional thank you note referencing something specific from your conversation.
              </p>
              <Textarea
                placeholder="Dear [Name], Thank you for taking the time to speak with me today about the [Position] role at [Company]. I was particularly interested when you mentioned..."
                value={thankYouNote}
                onChange={(e) => setThankYouNote(e.target.value)}
                className="min-h-32"
              />
              <AudioRecorder 
                onTranscription={(text) => setThankYouNote(prev => prev + '\n\n' + text)}
                placeholder="Record your thank you note. Make it personal and reference specific conversation points."
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3">🤝 Practice: Professional Rejection Response</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Write a gracious response to a rejection that keeps doors open for the future.
              </p>
              <Textarea
                placeholder="Thank you for letting me know about your decision. While I'm disappointed, I appreciate the opportunity to learn about [Company] and your team..."
                value={rejectionResponse}
                onChange={(e) => setRejectionResponse(e.target.value)}
                className="min-h-32"
              />
              <AudioRecorder 
                onTranscription={(text) => setRejectionResponse(prev => prev + '\n\n' + text)}
                placeholder="Record a gracious rejection response that maintains professionalism and future opportunities."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Do This:</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Be specific about what you discussed</li>
                <li>• Reiterate your interest and enthusiasm</li>
                <li>• Keep it concise (2-3 paragraphs)</li>
                <li>• Maintain professional tone</li>
                <li>• Proofread carefully</li>
              </ul>
            </Card>
            <Card className="p-4 bg-red-50 border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">❌ Avoid This:</h4>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Generic, templated messages</li>
                <li>• Being pushy or desperate</li>
                <li>• Sending multiple follow-ups</li>
                <li>• Bringing up salary/benefits</li>
                <li>• Typos or grammatical errors</li>
              </ul>
            </Card>
          </div>

          <Button 
            onClick={handleComplete} 
            className="w-full"
            disabled={thankYouNote.length < 100 || rejectionResponse.length < 100}
          >
            Complete Module 5! 🎉
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewModule5;
