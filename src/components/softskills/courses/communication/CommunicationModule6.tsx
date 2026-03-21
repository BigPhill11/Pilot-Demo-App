import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Smartphone, Video, MessageSquare, CheckCircle } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule6Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule6: React.FC<CommunicationModule6Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const { toast } = useToast();

  const sections = [
    {
      title: "Video Conferencing",
      icon: <Video className="h-5 w-5" />,
      content: {
        overview: "Professional video conferencing skills are essential for remote work success and building strong virtual relationships.",
        keyPoints: [
          "Optimal camera positioning at eye level for natural conversation flow",
          "Professional lighting setup that illuminates your face clearly and evenly",
          "Strategic background choices that minimize distractions and project professionalism",
          "Clear audio quality through quality microphones and noise reduction techniques"
        ],
        practicalTips: [
          "Test your setup before important meetings - check camera, audio, and lighting",
          "Maintain eye contact by looking at the camera, not the screen",
          "Mute when not speaking to reduce background noise and distractions",
          "Have backup plans for technology failures - phone numbers, alternative platforms"
        ]
      }
    },
    {
      title: "Digital Messaging", 
      icon: <MessageSquare className="h-5 w-5" />,
      content: {
        overview: "Effective digital messaging builds relationships, improves productivity, and maintains professional standards across all platforms.",
        keyPoints: [
          "Platform-appropriate communication styles for Slack, Teams, email, and SMS",
          "Emoji and formatting usage that enhances rather than undermines professionalism",
          "Response time expectations and status communication for different urgency levels",
          "Thread management and organization to keep conversations focused and searchable"
        ],
        practicalTips: [
          "Use subject lines and thread titles that clearly indicate content and urgency",
          "Employ the 'phone rule' - if explanation requires more than 2 messages, call instead",
          "Set clear availability hours and use status indicators to manage expectations",
          "Proofread messages for tone - digital communication often sounds harsher than intended"
        ]
      }
    },
    {
      title: "Digital Etiquette",
      icon: <Smartphone className="h-5 w-5" />,
      content: {
        overview: "Digital etiquette demonstrates respect for others' time and attention while building trust in virtual environments.",
        keyPoints: [
          "Response time expectations that balance promptness with quality",
          "Appropriate sharing of personal information and professional boundaries",
          "Meeting etiquette including punctuality, participation, and follow-up",
          "Crisis communication protocols for urgent situations and emergencies"
        ],
        practicalTips: [
          "Follow the 24-48 hour rule for non-urgent email responses",
          "Use 'urgent' labels sparingly - overuse reduces their effectiveness",
          "Share calendar availability to facilitate scheduling and set expectations",
          "Create email signatures with multiple contact methods for different urgency levels"
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      question: "What is most important for professional video conferencing setup?",
      options: [
        "Having the most expensive equipment possible",
        "Camera at eye level with clear audio and good lighting",
        "Always using a virtual background",
        "Having multiple monitors visible in the background"
      ],
      correct: 1,
      explanation: "Eye-level camera positioning, clear audio, and good lighting create professional presence and natural conversation flow. These basics matter more than expensive equipment."
    },
    {
      question: "When should you switch from digital messaging to a phone call?",
      options: [
        "Never - all communication should be documented",
        "Only for emergency situations",
        "When explanation requires more than 2 back-and-forth messages",
        "Only when talking to senior management"
      ],
      correct: 2,
      explanation: "The 'phone rule' prevents lengthy message chains that waste time and increase misunderstanding. Complex topics are better handled through real-time conversation."
    },
    {
      question: "What characterizes good digital etiquette for response times?",
      options: [
        "Responding to all messages within 5 minutes",
        "Never responding on weekends or after hours",
        "Following 24-48 hour rule for non-urgent communications",
        "Only responding when you have a complete solution"
      ],
      correct: 2,
      explanation: "The 24-48 hour rule balances responsiveness with quality responses. It gives time for thoughtful replies while maintaining professional communication standards."
    }
  ];

  const handleQuizAnswer = (questionIndex: number, selectedAnswer: number) => {
    const newAnswers = { ...quizAnswers, [questionIndex]: selectedAnswer };
    setQuizAnswers(newAnswers);

    const question = quizQuestions[questionIndex];
    const isCorrect = selectedAnswer === question.correct;

    if (isCorrect) {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'completed',
          message: `Correct! ${question.explanation}`
        }
      });
      toast({
        title: "Perfect!",
        description: "You understand digital communication excellence.",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'incorrect',
          message: `Not quite right. ${question.explanation}`
        }
      });
      toast({
        title: "Try Again",
        description: "Think about what makes digital communication effective and professional.",
        variant: "destructive",
      });
    }
  };

  const resetQuiz = (questionIndex: number) => {
    const newAnswers = { ...quizAnswers };
    const newFeedback = { ...feedback };
    delete newAnswers[questionIndex];
    delete newFeedback[questionIndex];
    setQuizAnswers(newAnswers);
    setFeedback(newFeedback);
  };

  const allQuizQuestionsAnsweredCorrectly = () => {
    return quizQuestions.every((_, index) => {
      const answer = quizAnswers[index];
      return answer !== undefined && answer === quizQuestions[index].correct;
    });
  };

  const handleCompleteModule = () => {
    setShowCelebration(true);
    setModuleCompleted(true);
    toast({
      title: "Course Completed!",
      description: "Congratulations on completing Business Communication Excellence!",
    });
    
    setTimeout(() => {
      setShowCelebration(false);
      onComplete();
    }, 3000);
  };

  if (showCelebration) {
    return (
      <PandaCelebration 
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        moduleTitle="Digital Communication"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <Badge variant="secondary">Module 6 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Smartphone className="h-6 w-6 text-purple-600" />
              <span>Digital Communication</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {sections.map((section, index) => (
                <Button
                  key={index}
                  variant={currentSection === index ? "default" : "outline"}
                  onClick={() => setCurrentSection(index)}
                  className="h-auto p-4 justify-start"
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                {sections[currentSection].icon}
                <span>{sections[currentSection].title}</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-purple-700">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {sections[currentSection].content.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Key Points</h4>
                  <ul className="space-y-2">
                    {sections[currentSection].content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Practical Tips</h4>
                  <ul className="space-y-2">
                    {sections[currentSection].content.practicalTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="h-2 w-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Knowledge Check</h3>
              <div className="space-y-8">
                {quizQuestions.map((question, questionIndex) => (
                  <div key={questionIndex} className="border-l-4 border-purple-400 pl-6">
                    <h4 className="font-medium mb-4">{question.question}</h4>
                    <div className="grid gap-3">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = quizAnswers[questionIndex] === optionIndex;
                        const isCorrect = optionIndex === question.correct;
                        const hasAnswered = quizAnswers[questionIndex] !== undefined;
                        
                        let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
                        if (hasAnswered) {
                          if (isSelected && isCorrect) buttonVariant = "default";
                          else if (isSelected && !isCorrect) buttonVariant = "destructive";
                          else if (isCorrect) buttonVariant = "secondary";
                        }

                        return (
                          <Button
                            key={optionIndex}
                            variant={buttonVariant}
                            onClick={() => handleQuizAnswer(questionIndex, optionIndex)}
                            disabled={hasAnswered}
                            className="justify-start text-left h-auto py-3 px-4"
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                    
                    {feedback[questionIndex] && (
                      <QuizFeedback 
                        type={feedback[questionIndex].type}
                        message={feedback[questionIndex].message}
                      />
                    )}
                    
                    <QuizActions
                      hasAttempted={quizAnswers[questionIndex] !== undefined}
                      isCompleted={quizAnswers[questionIndex] === question.correct}
                      onRetry={() => resetQuiz(questionIndex)}
                    />
                  </div>
                ))}
              </div>

              {allQuizQuestionsAnsweredCorrectly() && !moduleCompleted && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="mb-4">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-green-700">Final Module Complete!</h3>
                      <p className="text-gray-600">You've completed the entire Business Communication Excellence course!</p>
                    </div>
                    <Button onClick={handleCompleteModule} size="lg" className="px-8">
                      Complete Course
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationModule6;