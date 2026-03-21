import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Presentation, Lightbulb, Target, CheckCircle, Gamepad2, BookOpen, Palette, Mic, HelpCircle } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule4Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule4: React.FC<CommunicationModule4Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<'content' | 'games' | 'quiz'>('content');
  const [gameScore, setGameScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<'slides' | 'speaking' | 'qa'>('slides');
  const { toast } = useToast();

  const sections = [
    {
      title: "Slide Design Mastery",
      icon: <Palette className="h-5 w-5" />,
      content: {
        overview: "Exceptional slide design transforms complex information into visually compelling stories that captivate audiences and drive action. Great design isn't about being flashy - it's about clarity, hierarchy, and strategic visual communication that supports your message.",
        keyPoints: [
          "Visual hierarchy mastery: Strategic use of size, color, and placement to guide audience attention to key messages",
          "Content optimization: The 6x6 rule and beyond - balancing information density with comprehension",
          "Color psychology application: Understanding how colors influence mood, attention, and brand perception",
          "Typography excellence: Font pairing, readability optimization, and consistent brand voice through design"
        ],
        practicalTips: [
          "Apply the Z-pattern reading flow: Important information top-left, conclusion bottom-right",
          "Use the rule of thirds for image and content placement to create visual interest",
          "Implement consistent spacing: Equal margins and padding create professional, polished appearance",
          "Choose color schemes with 60-30-10 rule: Dominant color 60%, secondary 30%, accent 10%"
        ],
        examples: [
          "Bad: Text-heavy slides with 12+ bullet points → Good: One key concept per slide with supporting visual",
          "Bad: Random colors throughout presentation → Good: Consistent brand palette with strategic accent colors",
          "Bad: Multiple font families and sizes → Good: Maximum 2 fonts with clear hierarchy"
        ]
      }
    },
    {
      title: "Public Speaking Excellence", 
      icon: <Mic className="h-5 w-5" />,
      content: {
        overview: "Masterful public speaking combines technical skill with authentic connection to inspire, inform, and influence audiences. It's about creating an experience that resonates long after your presentation ends.",
        keyPoints: [
          "Voice mastery techniques: Projection, pace variation, strategic pausing, and vocal emphasis for maximum impact",
          "Body language fluency: Confident posture, purposeful gestures, and strategic movement that reinforces your message",
          "Audience connection strategies: Eye contact patterns, energy matching, and reading room dynamics",
          "Storytelling integration: Weaving personal anecdotes and case studies that make abstract concepts memorable"
        ],
        practicalTips: [
          "Practice the 7-38-55 rule: 7% words, 38% tone, 55% body language determine impact",
          "Use the PREP structure: Point, Reason, Example, Point to organize impromptu responses",
          "Apply the 10-20-30 rule: 10 slides maximum, 20 minutes maximum, 30-point font minimum",
          "Master the pause: Strategic silence creates emphasis and allows audience processing time"
        ],
        examples: [
          "Weak opening: 'Um, thanks for having me today' → Strong: 'Imagine doubling your team's productivity in 30 days'",
          "Monotone delivery → Varied pace: slow for emphasis, normal for information, fast for excitement",
          "Reading from slides → Conversational delivery with slides as visual support"
        ]
      }
    },
    {
      title: "Q&A Handling Mastery",
      icon: <HelpCircle className="h-5 w-5" />,
      content: {
        overview: "Expert Q&A handling transforms potentially challenging moments into opportunities to demonstrate expertise, build credibility, and deepen audience engagement. It's where preparation meets spontaneity.",
        keyPoints: [
          "Question anticipation strategies: Predicting likely questions and preparing thoughtful, concise responses",
          "Active listening techniques: Fully understanding questions before responding, including emotional undertones",
          "Graceful deflection methods: Handling difficult, off-topic, or hostile questions with professionalism",
          "Bridging techniques: Connecting any question back to your key messages and value propositions"
        ],
        practicalTips: [
          "Use the SOAR method: Stop, Observe, Acknowledge, Respond to ensure thoughtful answers",
          "Practice the bridge phrase: 'That's a great question, and it relates to...' to redirect smoothly",
          "Employ the echo technique: Repeat or rephrase questions to ensure audience clarity",
          "Master the parking lot: 'Let's discuss that offline' for complex or inappropriate questions"
        ],
        examples: [
          "Hostile question → 'I understand your concern. Let me address the core issue you've raised...'",
          "Off-topic question → 'That's important, and while it's outside today's scope, the key point for our discussion is...'",
          "Don't know answer → 'That's a thoughtful question. I want to give you accurate information, so let me research that and follow up'"
        ]
      }
    }
  ];

  const presentationTerms = [
    { term: "Visual Hierarchy", definition: "Strategic arrangement of design elements to guide viewer attention and communicate importance" },
    { term: "Vocal Variety", definition: "Intentional changes in pace, pitch, and volume to maintain audience engagement and emphasize key points" },
    { term: "Bridging", definition: "Technique to smoothly connect any question or topic back to your core message and objectives" },
    { term: "Signposting", definition: "Verbal cues that help audience follow your presentation structure and anticipate what's coming next" },
    { term: "Call to Action", definition: "Clear, specific request that tells your audience exactly what you want them to do next" },
    { term: "Anchor Stories", definition: "Memorable anecdotes that illustrate key points and help audience connect emotionally with your message" }
  ];

  const slideDesignChallenges = [
    {
      scenario: "Presenting quarterly financial results to executives",
      options: [
        "15 slides with detailed data tables and small text",
        "3 key slides: Overview, Key Insights, Action Items with large visuals",
        "One slide with all numbers and charts",
        "10 slides of bullet points explaining each metric"
      ],
      correct: 1,
      explanation: "Executives need high-level insights quickly. Focus on 'so what' rather than raw data, using visual hierarchy to highlight key decisions needed."
    },
    {
      scenario: "Choosing colors for a healthcare presentation",
      options: [
        "Bright red and yellow for energy and attention",
        "Cool blues and greens for trust and calm",
        "Black and white for maximum contrast",
        "Rainbow colors to show diversity"
      ],
      correct: 1,
      explanation: "Healthcare requires trust and professionalism. Cool colors psychologically convey stability, reliability, and calm - exactly what patients and professionals need."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the most important principle of effective slide design?",
      options: [
        "Including as much information as possible on each slide",
        "Using consistent visual hierarchy to guide attention",
        "Making slides colorful and animated",
        "Adding your company logo to every slide"
      ],
      correct: 1,
      explanation: "Visual hierarchy guides the audience's eye to the most important information first, ensuring your key messages are received and understood effectively."
    },
    {
      question: "According to the 7-38-55 rule, what has the biggest impact on your presentation?",
      options: [
        "The words you say (7%)",
        "Your tone of voice (38%)",
        "Your body language (55%)",
        "Your slide design"
      ],
      correct: 2,
      explanation: "Body language accounts for 55% of communication impact. Your posture, gestures, and movement must align with and reinforce your verbal message."
    },
    {
      question: "When handling a hostile question during Q&A, what should you do first?",
      options: [
        "Defend your position immediately",
        "Dismiss the question as inappropriate",
        "Acknowledge the concern and find the core issue",
        "Ask the person to speak with you privately"
      ],
      correct: 2,
      explanation: "Acknowledging concerns demonstrates respect and professionalism. Finding the core issue allows you to address the real problem rather than just the emotion."
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
        title: "Outstanding!",
        description: "You understand presentation excellence principles.",
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
        description: "Think about what makes presentations truly engaging and effective.",
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

  const handleGameComplete = (score: number) => {
    setGameScore(prev => prev + score);
    toast({
      title: "Game Complete!",
      description: `You scored ${score} points! Your presentation skills are improving.`
    });
  };

  const handleCompleteModule = () => {
    setShowCelebration(true);
    setModuleCompleted(true);
    toast({
      title: "Module Completed!",
      description: "Congratulations on mastering presentation excellence!",
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
        moduleTitle="Presentation Excellence"
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
          <Badge variant="secondary">Module 4 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Presentation className="h-6 w-6 text-purple-600" />
              <span>Presentation Excellence</span>
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
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn
                </Button>
                <Button
                  variant={currentActivity === 'games' ? 'default' : 'ghost'}
                  onClick={() => setCurrentActivity('games')}
                  size="sm"
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Practice Games
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
                  <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-4 mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-700">
                      Why Presentation Skills Are Critical for Success
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Presentation skills directly impact career advancement and business success. Research shows that <strong>professionals with strong presentation skills earn 25% more</strong> and are <strong>3x more likely to be promoted</strong>. 
                      In our visual-first digital world, the ability to design compelling slides and deliver engaging presentations is a competitive advantage that sets leaders apart.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-700">Master These Essential Terms</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {presentationTerms.map((term, index) => (
                        <div key={index} className="bg-orange-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-orange-800">{term.term}</h5>
                          <p className="text-sm text-gray-700 mt-1">{term.definition}</p>
                        </div>
                      ))}
                    </div>
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

                    <div>
                      <h4 className="font-semibold mb-3 text-purple-700">Examples</h4>
                      <div className="space-y-2">
                        {sections[currentSection].content.examples.map((example, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-700 text-sm">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentActivity === 'games' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-purple-700">
                      Presentation Skills Practice Games
                    </h3>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">Score: {gameScore}</Badge>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={currentGame === 'slides' ? 'default' : 'outline'}
                          onClick={() => setCurrentGame('slides')}
                        >
                          <Palette className="h-4 w-4 mr-2" />
                          Slide Design
                        </Button>
                        <Button
                          size="sm"
                          variant={currentGame === 'speaking' ? 'default' : 'outline'}
                          onClick={() => setCurrentGame('speaking')}
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Speaking
                        </Button>
                        <Button
                          size="sm"
                          variant={currentGame === 'qa' ? 'default' : 'outline'}
                          onClick={() => setCurrentGame('qa')}
                        >
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Q&A Handling
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {currentGame === 'slides' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold">Slide Design Challenge</h4>
                      <p className="text-gray-600">Choose the best design approach for each scenario:</p>
                      
                      {slideDesignChallenges.map((scenario, index) => (
                        <Card key={index} className="border-2 border-orange-100">
                          <CardContent className="p-4">
                            <h5 className="font-semibold mb-3 text-orange-700">Scenario: {scenario.scenario}</h5>
                            <div className="grid gap-2">
                              {scenario.options.map((option, optionIndex) => (
                                <Button
                                  key={optionIndex}
                                  variant="outline"
                                  onClick={() => {
                                    if (optionIndex === scenario.correct) {
                                      handleGameComplete(15);
                                      toast({
                                        title: "Excellent Design Choice!",
                                        description: scenario.explanation
                                      });
                                    } else {
                                      toast({
                                        title: "Try Again",
                                        description: "Consider your audience and the clarity of your message.",
                                        variant: "destructive"
                                      });
                                    }
                                  }}
                                  className="justify-start text-left h-auto py-2"
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {currentGame === 'speaking' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold">Public Speaking Simulator</h4>
                      <p className="text-gray-600">Practice these speaking scenarios:</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border-2 border-blue-100">
                          <CardContent className="p-4">
                            <h5 className="font-semibold mb-3 text-blue-700">Opening Strong</h5>
                            <p className="text-sm text-gray-600 mb-4">
                              You're presenting quarterly results to the board. Choose your opening:
                            </p>
                            <div className="space-y-2">
                              <Button 
                                variant="outline" 
                                className="w-full text-left h-auto py-2"
                                onClick={() => {
                                  toast({
                                    title: "Weak Opening",
                                    description: "Too generic. Start with impact or a compelling statistic.",
                                    variant: "destructive"
                                  });
                                }}
                              >
                                "Thank you for having me today..."
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full text-left h-auto py-2"
                                onClick={() => {
                                  handleGameComplete(10);
                                  toast({
                                    title: "Strong Opening!",
                                    description: "Leading with results immediately captures attention and sets the tone."
                                  });
                                }}
                              >
                                "This quarter, we exceeded targets by 23% - here's how we did it and what it means for our future."
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-green-100">
                          <CardContent className="p-4">
                            <h5 className="font-semibold mb-3 text-green-700">Voice & Delivery</h5>
                            <p className="text-sm text-gray-600 mb-4">
                              Practice proper vocal techniques:
                            </p>
                            <div className="space-y-3">
                              <div className="bg-green-50 p-3 rounded">
                                <strong>Exercise:</strong> Read this with varied pace:
                                <p className="mt-2 text-sm">"Our revenue grew 15% this quarter [PAUSE] but more importantly [SLOW] we retained 95% of our client base [EMPHASIS]."</p>
                              </div>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  handleGameComplete(10);
                                  toast({
                                    title: "Great Practice!",
                                    description: "Vocal variety keeps audiences engaged and emphasizes key points."
                                  });
                                }}
                              >
                                Practice Complete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                  
                  {currentGame === 'qa' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold">Q&A Handling Practice</h4>
                      <p className="text-gray-600">How would you handle these challenging questions?</p>
                      
                      <Card className="border-2 border-red-100">
                        <CardContent className="p-4">
                          <h5 className="font-semibold mb-3 text-red-700">Hostile Question:</h5>
                          <p className="bg-red-50 p-3 rounded mb-4 text-sm">
                            "Your strategy clearly isn't working. Why should we trust you with more budget when you've already wasted so much money?"
                          </p>
                          <div className="space-y-2">
                            <Button 
                              variant="outline" 
                              className="w-full text-left h-auto py-2"
                              onClick={() => {
                                toast({
                                  title: "Too Defensive",
                                  description: "Acknowledge the concern first, then address the underlying issue.",
                                  variant: "destructive"
                                });
                              }}
                            >
                              "That's completely unfair. Our strategy is solid and you're misunderstanding the data."
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full text-left h-auto py-2"
                              onClick={() => {
                                handleGameComplete(20);
                                toast({
                                  title: "Excellent Response!",
                                  description: "You acknowledged the concern and pivoted to facts while staying professional."
                                });
                              }}
                            >
                              "I understand your concern about ROI. Let me share the specific metrics that show our progress and the adjustments we're making to accelerate results."
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
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
                        <p className="text-gray-600">You've mastered presentation excellence.</p>
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

export default CommunicationModule4;