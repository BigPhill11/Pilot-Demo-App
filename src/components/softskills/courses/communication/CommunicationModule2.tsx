import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, FileText, Send, CheckCircle, Mic, Play, Volume2 } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';
import { AudioRecorder } from './AudioRecorder';

interface CommunicationModule2Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule2: React.FC<CommunicationModule2Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<'content' | 'practice' | 'quiz'>('content');
  const { toast } = useToast();

  const sections = [
    {
      title: "Active Listening",
      icon: <Volume2 className="h-5 w-5" />,
      content: {
        overview: "Active listening is the foundation of meaningful communication. It's not just hearing words - it's fully engaging with the speaker to understand their message, emotions, and intent.",
        keyPoints: [
          "Full attention and presence - eliminating distractions and focusing completely on the speaker",
          "Non-verbal engagement through appropriate eye contact, nodding, and open body language",
          "Reflective responses that demonstrate understanding and encourage deeper sharing",
          "Emotional awareness to pick up on feelings behind the words being spoken"
        ],
        practicalTips: [
          "Practice the 80/20 rule: Listen 80% of the time, speak 20%",
          "Use phrases like 'What I hear you saying is...' to confirm understanding",
          "Ask open-ended questions to encourage elaboration and deeper conversation",
          "Notice tone, pace, and energy changes that signal emotional shifts"
        ],
        practicePrompts: [
          "Practice active listening with a colleague discussing a recent challenge they faced",
          "Record yourself having a conversation and analyze your listening vs. speaking ratio",
          "Try the 'mirror technique' - reflect back what you heard before responding"
        ]
      }
    },
    {
      title: "Empathetic Communication", 
      icon: <Mail className="h-5 w-5" />,
      content: {
        overview: "Empathetic communication creates deep connections by acknowledging and validating others' experiences and emotions, even when you disagree with their perspective.",
        keyPoints: [
          "Perspective-taking ability to see situations through others' eyes and understand their viewpoint",
          "Emotional validation that acknowledges feelings without necessarily agreeing with actions",
          "Compassionate language that shows care and concern for the other person's wellbeing",
          "Cultural sensitivity that recognizes how background shapes communication styles and preferences"
        ],
        practicalTips: [
          "Use 'I can see how that would be frustrating' to validate emotions",
          "Ask 'Help me understand your perspective' when you disagree",
          "Share appropriate personal experiences to show you relate to their situation",
          "Acknowledge the courage it takes to share difficult feelings or experiences"
        ],
        practicePrompts: [
          "Practice responding empathetically to a difficult situation someone shares with you",
          "Record yourself giving feedback and analyze your tone and word choices",
          "Practice acknowledging emotions before addressing the practical aspects of a problem"
        ]
      }
    },
    {
      title: "Responsive Communication",
      icon: <Send className="h-5 w-5" />,
      content: {
        overview: "Responsive communication involves thoughtful, timely reactions that move conversations forward constructively and build stronger relationships.",
        keyPoints: [
          "Thoughtful responses that address both content and emotions in the conversation",
          "Appropriate timing that balances quick acknowledgment with well-considered replies",
          "Solution-oriented language that focuses on possibilities rather than problems",
          "Follow-through consistency that builds trust through reliable communication patterns"
        ],
        practicalTips: [
          "Use the 'Yes, and...' technique to build on others' ideas constructively",
          "Respond to emails within 24 hours, even if just to acknowledge receipt",
          "Ask clarifying questions before offering solutions or advice",
          "End conversations with clear next steps and follow-up commitments"
        ],
        practicePrompts: [
          "Practice responding to challenging feedback with grace and openness",
          "Record yourself in a mock difficult conversation and analyze your responses",
          "Practice turning complaints into opportunities for improvement"
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      question: "What is the foundation of active listening?",
      options: [
        "Thinking about what you'll say next",
        "Full attention and presence with the speaker",
        "Taking detailed notes during conversation",
        "Asking lots of questions"
      ],
      correct: 1,
      explanation: "Active listening requires your complete attention and presence. When you're mentally preparing your response, you're not truly listening to understand the speaker's perspective."
    },
    {
      question: "How should you respond when someone shares difficult emotions?",
      options: [
        "Immediately offer solutions to fix their problems",
        "Change the subject to something more positive",
        "Validate their emotions before addressing practical aspects",
        "Tell them about a similar experience you had"
      ],
      correct: 2,
      explanation: "Empathetic communication starts with validating emotions. People need to feel heard and understood before they're ready to consider solutions or advice."
    },
    {
      question: "What characterizes responsive communication?",
      options: [
        "Replying to messages as quickly as possible",
        "Always having the perfect solution ready",
        "Thoughtful responses that move conversations forward",
        "Avoiding difficult topics or emotions"
      ],
      correct: 2,
      explanation: "Responsive communication is about quality, not speed. It involves thoughtful replies that acknowledge both content and emotions while moving the conversation in a constructive direction."
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
        title: "Excellent!",
        description: "You understand interactive communication principles.",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionIndex]: {
          type: 'incorrect',
          message: `Not quite. ${question.explanation}`
        }
      });
      toast({
        title: "Try Again",
        description: "Consider the key principles of interactive communication.",
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
      title: "Module Completed!",
      description: "Congratulations on mastering interactive communication!",
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
        moduleTitle="Interactive Communication Mastery"
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
          <Badge variant="secondary">Module 2 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Volume2 className="h-6 w-6 text-purple-600" />
              <span>Interactive Communication Mastery</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={currentActivity === 'content' ? 'default' : 'ghost'}
                  onClick={() => setCurrentActivity('content')}
                  size="sm"
                >
                  Learn
                </Button>
                <Button
                  variant={currentActivity === 'practice' ? 'default' : 'ghost'}
                  onClick={() => setCurrentActivity('practice')}
                  size="sm"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Practice
                </Button>
                <Button
                  variant={currentActivity === 'quiz' ? 'default' : 'ghost'}
                  onClick={() => setCurrentActivity('quiz')}
                  size="sm"
                >
                  Quiz
                </Button>
              </div>
            </div>

            {currentActivity === 'content' && (
              <>
                <div className="bg-white rounded-lg p-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-700">
                      Why Interactive Communication Matters
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Interactive communication isn't just about talking and listening - it's about creating meaningful connections that drive results. 
                      Research shows that teams with strong interactive communication are <strong>5x more likely to achieve their goals</strong> and 
                      experience <strong>25% higher job satisfaction</strong>. In today's hybrid work environment, these skills are more critical than ever.
                    </p>
                  </div>
                </div>

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

                <div className="bg-white rounded-lg p-6">
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
              </>
            )}

            {currentActivity === 'practice' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-700">
                    Practice Interactive Communication
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose a scenario below and practice your response. Record yourself to review your tone, pace, and clarity.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {sections.map((section, index) => (
                      <Card key={index} className="border-2 border-purple-100">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center space-x-2">
                            {section.icon}
                            <span>{section.title} Scenarios</span>
                          </h4>
                          <div className="space-y-3">
                            {section.content.practicePrompts?.map((prompt, promptIndex) => (
                              <div key={promptIndex} className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-700 mb-2">{prompt}</p>
                                <Button size="sm" variant="outline" className="mt-2">
                                  <Play className="h-3 w-3 mr-2" />
                                  Practice This
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <AudioRecorder 
                    onRecordingComplete={(blob) => {
                      toast({
                        title: "Great Practice!",
                        description: "Review your recording and try again to improve your interactive communication skills."
                      });
                    }}
                    maxDuration={180}
                  />
                </div>
              </div>
            )}

            {currentActivity === 'quiz' && (
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
                        <h3 className="text-lg font-semibold text-green-700">Module Complete!</h3>
                        <p className="text-gray-600">You've mastered interactive communication skills.</p>
                      </div>
                      <Button onClick={handleCompleteModule} size="lg" className="px-8">
                        Complete Module
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationModule2;