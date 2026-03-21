import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Users, Brain, Target, CheckCircle, Gamepad2, Star, History, BookOpen } from 'lucide-react';
import { useSoftSkillsProgressAdapter } from '@/hooks/useProgressAdapter';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';

interface NetworkingModule1Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

const NetworkingModule1: React.FC<NetworkingModule1Props> = ({ onBack, onComplete, isCompleted = false }) => {
  const { toast } = useToast();
  
  // Memoize networking terms to prevent recreation on every render
  const networkingTerms = useMemo(() => [
    { term: "Networking", definition: "The practice of building and maintaining professional relationships for mutual benefit" },
    { term: "Rapport", definition: "A harmonious relationship characterized by mutual understanding and trust" },
    { term: "Value Proposition", definition: "A clear statement of the value you bring to a professional relationship" },
    { term: "Follow-up", definition: "The practice of maintaining contact after an initial meeting or interaction" },
    { term: "Personal Brand", definition: "How you present yourself professionally and what you're known for" },
    { term: "Cold Outreach", definition: "Initiating contact with someone you haven't met before" }
  ], []);

  const { progress: moduleProgress, saveResponse, saveGameScore, completeModule, updateCompletionPercentage, getProgressHistory } = 
    useSoftSkillsProgressAdapter('networking-like-pro', 'module-1', 'What is Professional Networking?');
    
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  const [gameScore, setGameScore] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [gameFeedback, setGameFeedback] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [progressHistory, setProgressHistory] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [termGame, setTermGame] = useState({
    currentTerm: 0,
    selectedDefinition: null as number | null,
    score: 0,
    completed: false
  });

  // Memoize game options to prevent recreation on every render
  const gameOptions = useMemo(() => {
    return networkingTerms.map((currentTerm) => {
      const correctAnswer = currentTerm;
      const wrongAnswers = networkingTerms
        .filter(term => term.term !== currentTerm.term)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      return [correctAnswer, ...wrongAnswers]
        .sort(() => Math.random() - 0.5);
    });
  }, [networkingTerms]);

  // Load progress history on component mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getProgressHistory();
        setProgressHistory(history);
      } catch (error) {
        console.error('Failed to load progress history:', error);
        toast({
          title: "Error",
          description: "Failed to load progress history",
          variant: "destructive"
        });
      }
    };
    loadHistory();
  }, [getProgressHistory, toast]);

  // Optimized quiz answer handler with error handling
  const handleQuizAnswer = useCallback(async (questionIndex: number, answerIndex: number, answerText: string, isCorrect: boolean) => {
    if (isProcessing) return;
    
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    setShowFeedback(prev => ({ ...prev, [questionIndex]: true }));
    
    try {
      setIsProcessing(true);
      await saveResponse(
        `quiz-${questionIndex}`,
        questionIndex === 0 ? "What is the primary focus of effective networking?" : "Which mindset is most important for successful networking?",
        answerIndex,
        answerText,
        isCorrect
      );
    } catch (error) {
      console.error('Failed to save quiz response:', error);
      toast({
        title: "Error",
        description: "Failed to save your answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [saveResponse, isProcessing, toast]);

  // Optimized game score saving with error handling
  useEffect(() => {
    const saveScore = async () => {
      if (termGame.completed && gameScore > 0) {
        try {
          await saveGameScore('networking-terms-match', gameScore, 60);
        } catch (error) {
          console.error('Failed to save game score:', error);
          toast({
            title: "Error",
            description: "Failed to save your game score",
            variant: "destructive"
          });
        }
      }
    };
    saveScore();
  }, [termGame.completed, gameScore, saveGameScore, toast]);


  const steps = [
    {
      title: "What is Professional Networking?",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-4 animate-fade-in" />
            <h2 className="text-2xl font-bold mb-4">Understanding Professional Networking</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Professional networking is the practice of building and maintaining mutually beneficial 
              relationships with other professionals in your industry and related fields.
            </p>
            
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-blue-800">🌟 Key Components of Networking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Relationship Building</h4>
                      <p className="text-sm text-muted-foreground">Creating genuine connections based on trust</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Mutual Value</h4>
                      <p className="text-sm text-muted-foreground">Offering and receiving benefits equally</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Long-term Focus</h4>
                      <p className="text-sm text-muted-foreground">Building lasting professional relationships</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Strategic Approach</h4>
                      <p className="text-sm text-muted-foreground">Purposeful and planned networking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Terms Game",
      type: "game",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Gamepad2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Networking Terms Match Game</h2>
            <p className="text-muted-foreground">Match the networking terms with their correct definitions!</p>
          </div>
          
          {!termGame.completed ? (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Term: {networkingTerms[termGame.currentTerm]?.term}</span>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Score: {termGame.score}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-semibold text-center mb-6">
                  What does "{networkingTerms[termGame.currentTerm]?.term}" mean?
                </p>
                
                <div className="grid gap-3">
                  {gameOptions[termGame.currentTerm]?.map((option, index) => {
                    const isCorrect = option.definition === networkingTerms[termGame.currentTerm]?.definition;
                    const isSelected = termGame.selectedDefinition === index;
                    
                    return (
                        <div key={index} className="space-y-2">
                          <Button
                            variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                            className={`text-left justify-start p-4 h-auto hover:scale-102 transition-transform w-full ${
                              isSelected ? (isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600") : ""
                            }`}
                            disabled={termGame.selectedDefinition !== null}
                            onClick={() => {
                              if (termGame.selectedDefinition !== null) return;
                              
                              setTermGame(prev => ({ ...prev, selectedDefinition: index }));
                              
                              const feedbackText = isCorrect 
                                ? `✅ Correct! "${option.term}" means "${option.definition}"`
                                : `❌ Incorrect. This defines "${option.term}", not "${networkingTerms[termGame.currentTerm]?.term}"`;
                              
                              setGameFeedback(feedbackText);
                              
                              setTimeout(() => {
                                const newScore = isCorrect ? termGame.score + 10 : termGame.score;
                                const isLastTerm = termGame.currentTerm >= networkingTerms.length - 1;
                                
                                setTermGame(prev => ({ 
                                  ...prev, 
                                  score: newScore,
                                  currentTerm: isLastTerm ? prev.currentTerm : prev.currentTerm + 1,
                                  selectedDefinition: null,
                                  completed: isLastTerm
                                }));
                                
                                if (isLastTerm) {
                                  setGameScore(newScore);
                                }
                                setGameFeedback('');
                              }, 2500);
                            }}
                          >
                            {option.definition}
                          </Button>
                          
                          {isSelected && gameFeedback && (
                            <Card className={`${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} animate-fade-in`}>
                              <CardContent className="p-3">
                                <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                                  {gameFeedback}
                                </p>
                                {!isCorrect && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    💡 The correct answer is: "{networkingTerms[termGame.currentTerm]?.definition}"
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          )}
                         </div>
                      );
                    }) || []}
                </div>
                
                <div className="text-center">
                  <Progress 
                    value={((termGame.currentTerm + 1) / networkingTerms.length) * 100} 
                    className="w-full h-2"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Question {termGame.currentTerm + 1} of {networkingTerms.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <div className="space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-800">Game Complete!</h3>
                  <p className="text-green-700">
                    Your final score: <span className="font-bold text-2xl">{gameScore}</span> points
                  </p>
                  <p className="text-green-600">
                    {gameScore >= 50 ? "Excellent! You're mastering networking terminology!" : 
                     gameScore >= 30 ? "Good job! Keep learning those terms!" : 
                     "Keep practicing! Review the terms and try again."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )
    },
    {
      title: "The Networking Mindset",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Developing the Right Mindset</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>✅ Growth Mindset</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-green-700">
                <div className="flex items-center space-x-2 p-2 bg-green-100 rounded">
                  <span>🎯</span>
                  <span>Focus on giving value first</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-100 rounded">
                  <span>❤️</span>
                  <span>Be genuinely interested in others</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-100 rounded">
                  <span>🤝</span>
                  <span>View networking as relationship building</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-100 rounded">
                  <span>📚</span>
                  <span>Embrace continuous learning</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-100 rounded">
                  <span>⭐</span>
                  <span>Quality over quantity</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center space-x-2">
                  <span>❌</span>
                  <span>Fixed Mindset</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-red-700">
                <div className="flex items-center space-x-2 p-2 bg-red-100 rounded">
                  <span>🚫</span>
                  <span>Only reaching out when you need something</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-100 rounded">
                  <span>💰</span>
                  <span>Focusing solely on personal gain</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-100 rounded">
                  <span>🤖</span>
                  <span>Treating people as transactions</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-100 rounded">
                  <span>😐</span>
                  <span>Being superficial in conversations</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-100 rounded">
                  <span>📱</span>
                  <span>Collecting contacts without building relationships</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-blue-50 border-blue-200 border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">💡 Remember:</h3>
                  <p className="text-blue-700">
                    Successful networking is about building authentic relationships that benefit everyone involved. 
                    When you help others succeed, they'll naturally want to help you too.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Quick Terms Reference",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Target className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Networking Terms Flashcards</h2>
            <p className="text-muted-foreground">Review key networking terminology</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkingTerms.map((term, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105"
                onClick={() => setShowTerms(!showTerms)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-center">{term.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`transition-all duration-300 ${showTerms ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    <p className="text-sm text-muted-foreground text-center">
                      {term.definition}
                    </p>
                  </div>
                  {!showTerms && (
                    <p className="text-center text-sm text-blue-600 group-hover:text-blue-800">
                      Click to reveal definition
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => setShowTerms(!showTerms)}
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              {showTerms ? 'Hide All Definitions' : 'Show All Definitions'}
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "Knowledge Check",
      type: "quiz",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Test Your Understanding</h2>
          
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Question 1: What is the primary focus of effective networking?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Getting as many business cards as possible",
                  "Building genuine, mutually beneficial relationships",
                  "Only connecting with senior executives",
                  "Promoting your services to everyone you meet"
                ].map((option, index) => {
                  const isSelected = quizAnswers[0] === index;
                  const isCorrect = index === 1;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <Button
                        variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                        className={`w-full text-left justify-start hover:scale-102 transition-transform ${
                          isSelected ? (isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600") : ""
                        }`}
                        onClick={async () => {
                          await handleQuizAnswer(0, index, option, isCorrect);
                        }}
                      >
                        {option}
                      </Button>
                      
                      {isSelected && showFeedback[0] && (
                        <Card className={`${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} animate-fade-in`}>
                          <CardContent className="p-3">
                            <p className={`text-sm font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                              {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                            </p>
                            <p className={`text-xs mt-1 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                              {index === 0 && "This is a common misconception. Collecting business cards without building relationships is ineffective networking."}
                              {index === 1 && "Exactly! Effective networking is about creating genuine connections where both parties benefit and support each other."}
                              {index === 2 && "This approach is too narrow and can come across as opportunistic. Networking works best when you connect with people at all levels."}
                              {index === 3 && "This is pushy and transactional. Effective networking focuses on relationships first, not immediate sales."}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Question 2: Which mindset is most important for successful networking?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Focus on what others can do for you",
                  "Give value first and help others succeed",
                  "Only network when you need something",
                  "Collect as many contacts as possible"
                ].map((option, index) => {
                  const isSelected = quizAnswers[1] === index;
                  const isCorrect = index === 1;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <Button
                        variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                        className={`w-full text-left justify-start hover:scale-102 transition-transform ${
                          isSelected ? (isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600") : ""
                        }`}
                        onClick={async () => {
                          await handleQuizAnswer(1, index, option, isCorrect);
                        }}
                      >
                        {option}
                      </Button>
                      
                      {isSelected && showFeedback[1] && (
                        <Card className={`${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} animate-fade-in`}>
                          <CardContent className="p-3">
                            <p className={`text-sm font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                              {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                            </p>
                            <p className={`text-xs mt-1 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                              {index === 0 && "This transactional approach often backfires. People can sense when you're only interested in what they can do for you, making them less likely to help."}
                              {index === 1 && "Perfect! When you help others achieve their goals first, they naturally want to reciprocate and support your success too. This builds genuine, lasting relationships."}
                              {index === 2 && "This reactive approach misses countless opportunities. Networking should be ongoing to build relationships before you need them."}
                              {index === 3 && "Quantity without quality leads nowhere. Having 1,000 contacts who don't know or trust you is far less valuable than having 50 genuine relationships."}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const isQuizComplete = Object.keys(quizAnswers).length >= 2;
  const isGameComplete = termGame.completed;
  
  // Simplified completion logic - allow progression through steps, require quiz and game for final completion
  const canProceed = useMemo(() => {
    if (currentStep < steps.length - 1) return true;
    return isQuizComplete && isGameComplete;
  }, [currentStep, isQuizComplete, isGameComplete, steps.length]);
  
  const handleNext = useCallback(async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        await updateCompletionPercentage(((currentStep + 2) / steps.length) * 100);
      } else if (canProceed) {
        await completeModule();
        setShowCelebration(true);
        toast({
          title: "Module Complete!",
          description: "You've successfully completed the Networking Fundamentals module."
        });
      }
    } catch (error) {
      console.error('Failed to proceed:', error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [currentStep, steps.length, canProceed, updateCompletionPercentage, completeModule, isProcessing, toast]);

  const handleModuleComplete = useCallback(async () => {
    setShowCelebration(false);
    onComplete();
    setTimeout(() => {
      onBack();
    }, 1000);
  }, [onComplete, onBack]);

  const loadProgressHistory = useCallback(async () => {
    try {
      const history = await getProgressHistory();
      setProgressHistory(history);
      setShowHistory(true);
    } catch (error) {
      console.error('Failed to load progress history:', error);
      toast({
        title: "Error",
        description: "Failed to load progress history",
        variant: "destructive"
      });
    }
  }, [getProgressHistory, toast]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="hover:scale-105 transition-transform">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Module 1: Networking Fundamentals</h1>
          <p className="text-muted-foreground">Understanding the basics of professional networking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadProgressHistory} className="hover:scale-105 transition-transform">
            <History className="h-4 w-4 mr-2" />
            Review Progress
          </Button>
          {isCompleted && (
            <div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{currentStep + 1} of {steps.length}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="min-h-[500px]">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {steps[currentStep].content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="hover:scale-105 transition-transform"
        >
            {currentStep === steps.length - 1 ? 'Complete Module' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Feedback */}
      {steps[currentStep]?.type === 'quiz' && Object.keys(quizAnswers).length >= 2 && (
        <Card className={`animate-fade-in ${isQuizComplete ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <CardContent className="pt-6">
            {isQuizComplete ? (
              <p className="text-green-700 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>✅ Excellent! You understand the networking fundamentals perfectly!</span>
              </p>
            ) : (
              <p className="text-red-700">❌ Review the material and try again. Focus on building genuine relationships and giving value first.</p>
            )}
          </CardContent>
        </Card>
      )}

      {steps[currentStep]?.type === 'game' && termGame.completed && (
        <Card className="bg-blue-50 border-blue-200 animate-fade-in">
          <CardContent className="pt-6 text-center">
            <p className="text-blue-700">
              🎮 Great job completing the terms game! You've earned <strong>{gameScore} points</strong> and reinforced your networking vocabulary.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Progress History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Your Learning Progress</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>×</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {progressHistory.length === 0 ? (
                <p className="text-muted-foreground">No previous progress found.</p>
              ) : (
                progressHistory.map((item, index) => (
                  <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{item.module_title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Completion: {item.completion_percentage}%</div>
                        <div>Time: {item.time_spent_minutes} min</div>
                      </div>
                      {item.responses && item.responses.length > 0 && (
                        <div className="space-y-1">
                          <h4 className="text-xs font-medium text-muted-foreground">Quiz Responses:</h4>
                          {item.responses.map((response: any, i: number) => (
                            <div key={i} className="text-xs bg-white/50 p-2 rounded">
                              <span className={response.isCorrect ? "text-green-600" : "text-red-600"}>
                                {response.isCorrect ? "✅" : "❌"} {response.question}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Panda Celebration */}
      <PandaCelebration
        isVisible={showCelebration}
        onClose={handleModuleComplete}
        moduleTitle="Networking Fundamentals"
        score={gameScore + (Object.values(quizAnswers).filter((answer, index) => 
          (index === 0 && answer === 1) || (index === 1 && answer === 1)
        ).length * 10)}
        achievements={[
          ...(gameScore >= 50 ? ["Networking Terms Master"] : []),
          ...(isQuizComplete ? ["Networking Fundamentals Expert"] : []),
          "Module 1 Completed"
        ]}
      />
    </div>
  );
};

export default NetworkingModule1;