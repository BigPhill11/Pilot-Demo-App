import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Calendar, Users, MessageSquare, Target } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSoftSkillsProgressAdapter } from '@/hooks/useProgressAdapter';

interface NetworkingModule5Props {
  onComplete: () => void;
  onBack: () => void;
  isCompleted?: boolean;
}

const NetworkingModule5: React.FC<NetworkingModule5Props> = ({ onComplete, onBack, isCompleted }) => {
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});
  const { toast } = useToast();
  const { progress: moduleProgress, saveTextResponse, completeModule } = 
    useSoftSkillsProgressAdapter('networking-like-pro', 'module-5', 'Event Mastery');

  const renderQuizQuestion = (question: string, options: string[], correctAnswer: number, questionKey: string) => {
    const selectedAnswer = quizAnswers[questionKey];
    const isAnswered = selectedAnswer !== undefined;
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <Card key={questionKey} className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">{question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant={
                  isAnswered
                    ? index === correctAnswer
                      ? "default"
                      : index === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                className="w-full text-left justify-start"
                onClick={() => setQuizAnswers(prev => ({ ...prev, [questionKey]: index }))}
                disabled={isAnswered}
              >
                {option}
              </Button>
            ))}
          </div>
          {isAnswered && (
            <div className={`mt-3 p-3 rounded-lg ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect.'} 
              {questionKey === 'q1' && ' Great networking events require preparation and clear goals.'}
              {questionKey === 'q2' && ' The best networkers focus on helping others and building genuine relationships.'}
              {questionKey === 'q3' && ' Following up within 24-48 hours shows professionalism and genuine interest.'}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const answeredQuestions = Object.keys(quizAnswers).length;
  const totalQuestions = 3;

  const handleComplete = async () => {
    await saveTextResponse('quiz-answers', JSON.stringify(quizAnswers));
    await completeModule();
    
    toast({
      title: "Module 5 Completed!",
      description: "You're ready to master any networking event.",
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Button>
        <Badge variant="secondary">Module 5</Badge>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Event Networking Mastery</h2>
        <Progress value={100} className="flex-1" />
        
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Event Networking Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium">Pre-Event</h4>
                <p className="text-sm text-muted-foreground">Research, set goals, prepare materials</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium">During Event</h4>
                <p className="text-sm text-muted-foreground">Work the room, quality conversations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium">Post-Event</h4>
                <p className="text-sm text-muted-foreground">Follow up, nurture connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Working the Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">The 3-Question Framework</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>1. What brings you to this event?</li>
                  <li>2. What's exciting in your industry right now?</li>
                  <li>3. How can I help you with your goals?</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Body Language Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>• Open posture and genuine smile</li>
                  <li>• Active listening and eye contact</li>
                  <li>• Confident handshake</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Follow-Up Excellence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">24-Hour Rule</h4>
                <p className="text-sm text-muted-foreground">Send personalized messages within 24 hours</p>
              </div>
              <div>
                <h4 className="font-medium">Value-First Approach</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>• Share relevant resources</li>
                  <li>• Make strategic introductions</li>
                  <li>• Offer genuine assistance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Knowledge Check</h3>
          
          {renderQuizQuestion(
            "What's the most important thing to do before attending a networking event?",
            [
              "Bring plenty of business cards",
              "Research attendees and set specific goals",
              "Prepare a sales pitch",
              "Dress professionally"
            ],
            1,
            "q1"
          )}

          {renderQuizQuestion(
            "What's the best mindset for effective networking?",
            [
              "Focus on what others can do for you",
              "Promote your company and services",
              "Help others and build genuine relationships",
              "Collect as many contacts as possible"
            ],
            2,
            "q2"
          )}

          {renderQuizQuestion(
            "When should you follow up after meeting someone at an event?",
            [
              "Within 1 week",
              "Wait for them to contact you first",
              "Within 24-48 hours",
              "After 1 month"
            ],
            2,
            "q3"
          )}
        </div>

        <Button 
          onClick={handleComplete}
          disabled={answeredQuestions < totalQuestions}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Complete Module
        </Button>
      </div>
    </div>
  );
};

export default NetworkingModule5;