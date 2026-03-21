import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, FileText, Send, CheckCircle, Gamepad2, BookOpen, Eye } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule3Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule3: React.FC<CommunicationModule3Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<'content' | 'games' | 'quiz'>('content');
  const [gameScore, setGameScore] = useState(0);
  const [currentGame, setCurrentGame] = useState<'email' | 'proofreading' | 'report'>('email');
  const { toast } = useToast();

  const sections = [
    {
      title: "Email Etiquette Excellence",
      icon: <Mail className="h-5 w-5" />,
      content: {
        overview: "Professional email communication is the backbone of modern business. Every email represents your brand and professionalism to colleagues, clients, and stakeholders worldwide.",
        keyPoints: [
          "Subject line mastery: Clear, specific, and action-oriented headlines that prioritize recipient time",
          "Greeting protocols: Appropriate salutations that match relationship levels and cultural contexts",
          "Body structure excellence: Logical flow with clear purpose, supporting details, and specific requests",
          "Professional closing: Consistent signatures with contact information and appropriate sign-offs"
        ],
        practicalTips: [
          "Use the BRIEF framework: Brief, Relevant, Informative, Engaging, Friendly",
          "Apply the 24-48 hour response rule for non-urgent communications",
          "Implement the CC/BCC protocol: CC for transparency, BCC for privacy protection",
          "Practice email triage: Sort by urgency and importance before responding"
        ],
        examples: [
          "Subject: 'Action Required: Budget Approval by Friday 3pm' vs 'Budget Stuff'",
          "Opening: 'I hope this email finds you well, John' vs 'Hey there!'",
          "Closing: 'Please let me know if you need any clarification' vs 'Thanks'"
        ]
      }
    },
    {
      title: "Proofreading & Editing Mastery", 
      icon: <Eye className="h-5 w-5" />,
      content: {
        overview: "Exceptional proofreading skills demonstrate attention to detail and respect for your audience. Error-free communication builds credibility and ensures your message is received clearly.",
        keyPoints: [
          "Multi-pass editing strategy: Content review, structure check, grammar scan, and final polish",
          "Common error identification: Homophone mistakes, comma splices, subject-verb disagreements",
          "Tone consistency maintenance: Ensuring voice remains professional and appropriate throughout",
          "Fact-checking protocols: Verifying data, names, dates, and technical information accuracy"
        ],
        practicalTips: [
          "Read aloud technique: Hearing your writing reveals rhythm issues and unclear phrasing",
          "Reverse reading method: Start from the end to catch spelling and grammar errors",
          "Use the 24-hour rule: Let important documents rest before final review",
          "Leverage technology wisely: Use tools like Grammarly but don't rely solely on them"
        ],
        examples: [
          "Error: 'Their going to the meeting at 3pm' → Correct: 'They're going to the meeting at 3pm'",
          "Error: 'The team are ready' → Correct: 'The team is ready'",
          "Error: 'Quick update on the project, it's going well, we should finish on time' → Correct: 'Quick update on the project: it's going well, and we should finish on time'"
        ]
      }
    },
    {
      title: "Report Writing Excellence",
      icon: <FileText className="h-5 w-5" />,
      content: {
        overview: "Strategic report writing transforms complex information into actionable insights that drive decision-making and organizational success.",
        keyPoints: [
          "Executive summary mastery: Concise overview that captures essence for time-pressed leaders",
          "Data storytelling: Converting numbers and facts into compelling narratives with clear implications",
          "Structure optimization: Logical flow with clear headings, subheadings, and transition sentences",
          "Visual integration: Strategic use of charts, graphs, and images to support key messages"
        ],
        practicalTips: [
          "Start with conclusions: Lead with recommendations, then provide supporting evidence",
          "Use the pyramid principle: Most important information first, supporting details follow",
          "Apply the SCRAP framework: Situation, Complication, Resolution, Action, Polish",
          "Include specific next steps: Make recommendations actionable with timelines and ownership"
        ],
        examples: [
          "Weak: 'Sales were bad this quarter' → Strong: 'Q3 sales declined 15% due to market conditions, requiring immediate strategy adjustment'",
          "Weak: 'We need to improve' → Strong: 'Implementing customer feedback system will increase satisfaction scores by 20% within 6 months'",
          "Weak: 'Various issues occurred' → Strong: 'Three critical issues identified: supply chain delays (40% of problems), staff shortages (35%), and system outages (25%)'"
        ]
      }
    }
  ];

  const writingTerms = [
    { term: "Subject Line", definition: "The first impression of your email that determines if it gets opened and prioritized" },
    { term: "CC/BCC Protocol", definition: "CC for transparency when others need visibility; BCC for privacy protection in mass emails" },
    { term: "Executive Summary", definition: "Concise overview of a report's key findings and recommendations for senior decision-makers" },
    { term: "Active Voice", definition: "Direct writing style where the subject performs the action, creating clearer, more engaging content" },
    { term: "Parallel Structure", definition: "Consistent grammatical patterns in lists and series that improve readability and professionalism" },
    { term: "Transition Sentences", definition: "Bridging statements that guide readers smoothly from one idea or section to the next" }
  ];

  const emailGameScenarios = [
    {
      scenario: "Writing to a client about a project delay",
      options: [
        "Subject: Project Update",
        "Subject: Urgent: Timeline Adjustment Required for Smith Project",
        "Subject: Bad News About Your Project",
        "Subject: Project Smith - Delayed"
      ],
      correct: 1,
      explanation: "Clear, specific subject lines with urgency indicators help recipients prioritize and understand content immediately."
    },
    {
      scenario: "Responding to a colleague's request for feedback",
      options: [
        "Thanks for sending this over! Looks great!",
        "I reviewed your proposal and have three specific suggestions that will strengthen the client presentation.",
        "This is good but needs work.",
        "I'll get back to you on this."
      ],
      correct: 1,
      explanation: "Specific, constructive feedback demonstrates engagement and provides clear value to the recipient."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the most critical element of professional email communication?",
      options: [
        "Using formal language in every email",
        "Clear subject lines that prioritize recipient's time",
        "Including your complete contact information",
        "Copying everyone who might be interested"
      ],
      correct: 1,
      explanation: "Clear, specific subject lines help recipients understand urgency and content, enabling them to prioritize their time effectively. This demonstrates respect for their schedule."
    },
    {
      question: "Which proofreading technique is most effective for catching errors?",
      options: [
        "Reading quickly to get through it faster",
        "Relying entirely on spell-check software",
        "Multi-pass editing with different focuses each time",
        "Only checking grammar and spelling"
      ],
      correct: 2,
      explanation: "Multi-pass editing allows you to focus on different aspects (content, structure, grammar, polish) ensuring nothing is missed and the final product is professional."
    },
    {
      question: "What should come first in a business report?",
      options: [
        "Detailed methodology and data collection process",
        "Executive summary with key findings and recommendations",
        "Historical background and context",
        "Complete data tables and appendices"
      ],
      correct: 1,
      explanation: "Executive summaries lead with the most important information for busy decision-makers who may only read this section. It respects their time while ensuring key messages are communicated."
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
        description: "You understand written communication principles.",
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
        description: "Consider the key principles of professional written communication.",
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
      description: `You scored ${score} points! Keep practicing to improve your written communication skills.`
    });
  };

  const handleCompleteModule = () => {
    setShowCelebration(true);
    setModuleCompleted(true);
    toast({
      title: "Module Completed!",
      description: "Congratulations on mastering written communication skills!",
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
        moduleTitle="Written Communication Excellence"
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
          <Badge variant="secondary">Module 3 of 6</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <FileText className="h-6 w-6 text-purple-600" />
              <span>Written Communication Excellence</span>
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
                  Games
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
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-700">
                      Why Written Communication Excellence Matters
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In our digital-first world, written communication often forms the first and lasting impression of your professionalism. 
                      Studies show that <strong>professionals spend 23% of their workday</strong> writing emails and documents. 
                      Mastering these skills can <strong>increase your perceived competence by 40%</strong> and significantly impact career advancement.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-700">Key Terms to Master</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {writingTerms.map((term, index) => (
                        <div key={index} className="bg-purple-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-800">{term.term}</h5>
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
                      Written Communication Games
                    </h3>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">Score: {gameScore}</Badge>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={currentGame === 'email' ? 'default' : 'outline'}
                          onClick={() => setCurrentGame('email')}
                        >
                          Email Challenge
                        </Button>
                        <Button
                          size="sm"
                          variant={currentGame === 'proofreading' ? 'default' : 'outline'}
                          onClick={() => setCurrentGame('proofreading')}
                        >
                          Proofreading Puzzle
                        </Button>
                        <Button
                          size="sm"
                          variant={currentGame === 'report' ? 'default' : 'outline'}
                          onClick={() => setCurrentGame('report')}
                        >
                          Report Builder
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {currentGame === 'email' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold">Email Excellence Challenge</h4>
                      <p className="text-gray-600">Choose the best email element for each scenario:</p>
                      
                      {emailGameScenarios.map((scenario, index) => (
                        <Card key={index} className="border-2 border-blue-100">
                          <CardContent className="p-4">
                            <h5 className="font-semibold mb-3 text-blue-700">Scenario: {scenario.scenario}</h5>
                            <div className="grid gap-2">
                              {scenario.options.map((option, optionIndex) => (
                                <Button
                                  key={optionIndex}
                                  variant="outline"
                                  onClick={() => {
                                    if (optionIndex === scenario.correct) {
                                      handleGameComplete(10);
                                      toast({
                                        title: "Correct!",
                                        description: scenario.explanation
                                      });
                                    } else {
                                      toast({
                                        title: "Try Again",
                                        description: "Think about what makes email communication most effective.",
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
                  
                  {currentGame === 'proofreading' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold">Proofreading Challenge</h4>
                      <p className="text-gray-600">Find and fix the errors in these business communications:</p>
                      
                      <Card className="border-2 border-red-100">
                        <CardContent className="p-4">
                          <h5 className="font-semibold mb-3 text-red-700">Find the Errors:</h5>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="text-gray-700">
                              "Thank you for you're interest in our services. The team are excited to work with you and we're confident that this partnership will be mutually benefical. Please let us know if their are any questions about the proposal, we'd be happy to provide additional information."
                            </p>
                          </div>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              handleGameComplete(15);
                              toast({
                                title: "Errors Found!",
                                description: "Corrections: your (not you're), team is (not are), beneficial (not benefical), there (not their)"
                              });
                            }}
                          >
                            Check My Work
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  {currentGame === 'report' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold">Report Structure Challenge</h4>
                      <p className="text-gray-600">Arrange these report sections in the optimal order:</p>
                      
                      <Card className="border-2 border-green-100">
                        <CardContent className="p-4">
                          <h5 className="font-semibold mb-3 text-green-700">Drag to Reorder (Click to simulate):</h5>
                          <div className="space-y-2">
                            {[
                              "Detailed Analysis and Findings",
                              "Executive Summary", 
                              "Recommendations and Next Steps",
                              "Methodology and Data Sources",
                              "Appendices and Supporting Data"
                            ].map((section, index) => (
                              <div key={index} className="bg-green-50 p-3 rounded-lg border cursor-pointer hover:bg-green-100">
                                <span className="text-green-800">{section}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => {
                              handleGameComplete(20);
                              toast({
                                title: "Correct Order!",
                                description: "Optimal order: Executive Summary → Recommendations → Methodology → Analysis → Appendices"
                              });
                            }}
                          >
                            Check Structure
                          </Button>
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
                        <p className="text-gray-600">You've mastered written communication excellence.</p>
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

export default CommunicationModule3;