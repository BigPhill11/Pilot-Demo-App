import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Target, Lightbulb, CheckCircle, Play, Trophy, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import AudioRecorder from './AudioRecorder';

interface InterviewModule1Props {
  onComplete: () => void;
  onBack: () => void;
}

const InterviewModule1: React.FC<InterviewModule1Props> = ({ onComplete, onBack }) => {
  // Use unified progress tracking
  const moduleProgress = useUnifiedProgress({
    moduleId: 'interview-module-1',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [elevatorPitch, setElevatorPitch] = useState('');
  const [whyFinance, setWhyFinance] = useState('');
  const [starStory, setStarStory] = useState({
    situation: '',
    task: '',
    action: '',
    result: ''
  });
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  // Load saved progress on component mount
  useEffect(() => {
    if (moduleProgress.progress?.detailedProgress) {
      const saved = moduleProgress.progress.detailedProgress;
      if (saved.currentSection !== undefined) setCurrentSection(saved.currentSection);
      if (saved.elevatorPitch) setElevatorPitch(saved.elevatorPitch);
      if (saved.whyFinance) setWhyFinance(saved.whyFinance);
      if (saved.starStory) setStarStory(saved.starStory);
      if (saved.quizAnswers) setQuizAnswers(saved.quizAnswers);
      if (saved.completedSections) setCompletedSections(saved.completedSections);
    }
  }, [moduleProgress.progress]);

  // Auto-save progress when state changes
  useEffect(() => {
    if (moduleProgress.progress) {
      const progressData = {
        currentSection,
        elevatorPitch,
        whyFinance,
        starStory,
        quizAnswers,
        completedSections
      };
      moduleProgress.updateDetailedProgress('moduleState', progressData);
    }
  }, [currentSection, elevatorPitch, whyFinance, starStory, quizAnswers, completedSections]);

  const sections = [
    { title: "Introduction & Mindset", icon: Target },
    { title: "Your 'Why Finance' Story", icon: Lightbulb },
    { title: "Elevator Pitch Mastery", icon: Star },
    { title: "STAR Method Training", icon: Trophy },
    { title: "Research & Prep Game", icon: Play },
    { title: "Module Quiz", icon: CheckCircle }
  ];

  const handleSectionComplete = async (sectionIndex: number) => {
    const newCompletedSections = !completedSections.includes(sectionIndex) 
      ? [...completedSections, sectionIndex]
      : completedSections;
    
    setCompletedSections(newCompletedSections);
    
    // Update progress percentage
    const progressPercentage = ((newCompletedSections.length) / sections.length) * 100;
    await moduleProgress.updateProgress(progressPercentage);
    
    if (sectionIndex < sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    } else {
      toast.success("Module 1 completed! 🎉");
      await moduleProgress.completeModule();
      onComplete();
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  const renderQuizQuestion = (question: string, options: string[], correctAnswer: number, questionKey: string) => {
    const userAnswer = quizAnswers[questionKey];
    const hasAnswered = userAnswer !== undefined;
    
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">{question}</h4>
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant={hasAnswered ? 
                  (index === correctAnswer ? "default" : 
                   index === userAnswer ? "destructive" : "outline") : 
                  "outline"}
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => !hasAnswered && setQuizAnswers({...quizAnswers, [questionKey]: index})}
                disabled={hasAnswered}
              >
                <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
          {hasAnswered && (
            <div className={`mt-3 p-3 rounded ${userAnswer === correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {userAnswer === correctAnswer ? '✅ Correct!' : '❌ Incorrect. '}
              {userAnswer !== correctAnswer && `The correct answer is ${String.fromCharCode(65 + correctAnswer)}.`}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Introduction & Interview Mindset</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
                  <h3 className="text-blue-800 font-semibold mb-2">🎯 Module Objectives:</h3>
                  <p className="text-blue-700 mb-2">
                    This foundational module builds your interview confidence and preparation strategy. 
                    You'll develop the core narratives and mindset that separate good candidates from great ones.
                  </p>
                  <p className="text-blue-700 text-sm">
                    <strong>Why this matters:</strong> First impressions are everything in finance interviews. 
                    Having a clear story and confident delivery sets the tone for the entire conversation 
                    and shows you've done the self-reflection work that top firms expect.
                  </p>
                </div>

                <p className="text-lg">
                  Welcome to Module 1! This foundational module will set you up for interview success by building 
                  the right mindset and preparation strategies.
                </p>
                <p>
                  Interviews aren't just about proving you're qualified—they're about showing you're the RIGHT fit. 
                  The most successful candidates combine technical competence with authentic storytelling and genuine 
                  enthusiasm for the role.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 my-6">
                  <h3 className="text-blue-800 font-semibold mb-2">🎯 What You'll Master:</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Develop your authentic "Why Finance" narrative</li>
                    <li>• Create a compelling 60-second elevator pitch</li>
                    <li>• Master the STAR format for behavioral stories</li>
                    <li>• Learn effective company research strategies</li>
                    <li>• Build confidence through preparation</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">The Interview Success Pyramid</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="text-center p-4 bg-yellow-50 border-yellow-200">
                    <div className="text-2xl mb-2">🧠</div>
                    <h4 className="font-semibold text-yellow-800">Mindset</h4>
                    <p className="text-sm text-yellow-700">Confidence, curiosity, authenticity</p>
                  </Card>
                  <Card className="text-center p-4 bg-green-50 border-green-200">
                    <div className="text-2xl mb-2">📚</div>
                    <h4 className="font-semibold text-green-800">Preparation</h4>
                    <p className="text-sm text-green-700">Stories, research, practice</p>
                  </Card>
                  <Card className="text-center p-4 bg-purple-50 border-purple-200">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold text-purple-800">Execution</h4>
                    <p className="text-sm text-purple-700">Delivery, presence, follow-up</p>
                  </Card>
                </div>
              </div>
              
              <Button onClick={() => handleSectionComplete(0)} className="w-full">
                Continue to Your Finance Story
              </Button>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Crafting Your "Why Finance" Story</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                  <h3 className="text-yellow-800 font-semibold mb-2">🎯 Objective:</h3>
                  <p className="text-yellow-700 mb-2">
                    Develop an authentic, compelling narrative that explains your genuine interest in finance.
                  </p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Why this matters:</strong> Generic answers like "I'm good with numbers" immediately 
                    signal lack of self-awareness. Your story should be memorable and demonstrate deeper thinking 
                    about your career path.
                  </p>
                </div>

                <p>
                  Your "Why Finance" story is the foundation of every great interview. It should be authentic, 
                  specific, and demonstrate genuine passion for the field.
                </p>
                
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-2">💡 Great "Why Finance" Stories Include:</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• A specific moment or experience that sparked your interest</li>
                    <li>• What aspects of finance excite you most</li>
                    <li>• How your background/skills align with finance</li>
                    <li>• Your career aspirations in the field</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Interactive Exercise: Build Your Story</h4>
                <Textarea
                  placeholder="Write your authentic 'Why Finance' story here. Think about: What first interested you in finance? What specific aspects excite you? How do your experiences prepare you for this field?"
                  value={whyFinance}
                  onChange={(e) => setWhyFinance(e.target.value)}
                  className="min-h-32"
                />
                
                <AudioRecorder 
                  onTranscription={(text) => setWhyFinance(prev => prev + '\n\n' + text)}
                  placeholder="Tell your authentic 'Why Finance' story. What sparked your interest? What aspects excite you most?"
                />
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <Card className="p-4 bg-green-50 border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">✅ Strong Example:</h5>
                    <p className="text-green-700">
                      "My interest in finance began when I analyzed my family's restaurant business during COVID. 
                      I saw how financial decisions directly impact real people and businesses. I'm drawn to 
                      investment banking because I want to help companies navigate transformative moments..."
                    </p>
                  </Card>
                  <Card className="p-4 bg-red-50 border-red-200">
                    <h5 className="font-semibold text-red-800 mb-2">❌ Avoid:</h5>
                    <p className="text-red-700">
                      "I want to work in finance because it pays well and I'm good with numbers. 
                      I've always been interested in money and want to learn more about it."
                    </p>
                  </Card>
                </div>
              </div>

              <Button 
                onClick={() => handleSectionComplete(1)} 
                className="w-full"
                disabled={whyFinance.length < 100}
              >
                Continue to Elevator Pitch {whyFinance.length < 100 && '(Write at least 100 characters)'}
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-purple-600" />
                <span>Elevator Pitch Mastery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400 mb-4">
                  <h3 className="text-purple-800 font-semibold mb-2">🎯 Objective:</h3>
                  <p className="text-purple-700 mb-2">
                    Create a concise, compelling 60-second introduction that makes a strong first impression.
                  </p>
                  <p className="text-purple-700 text-sm">
                    <strong>Why this matters:</strong> Your elevator pitch sets the tone for the entire interview. 
                    It's often the first substantial thing you say, and interviewers form quick judgments. 
                    A polished pitch shows preparation and professionalism.
                  </p>
                </div>

                <p>
                  Your elevator pitch is a concise, compelling introduction that you can deliver in 60 seconds or less. 
                  It's your chance to make a strong first impression and set the tone for the entire interview.
                </p>
                
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold text-purple-800 mb-2">🚀 Perfect Pitch Structure (60 seconds):</h4>
                  <ol className="text-purple-700 space-y-1 text-sm list-decimal list-inside">
                    <li><strong>Who you are</strong> - Name, school/background (10 seconds)</li>
                    <li><strong>What you've done</strong> - Key experiences/achievements (20 seconds)</li>
                    <li><strong>Why you're interested</strong> - Connection to finance/this role (20 seconds)</li>
                    <li><strong>What you're seeking</strong> - Your goals and enthusiasm (10 seconds)</li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🎯 Pitch Builder Game</h4>
                <p className="text-sm text-muted-foreground">
                  Create your elevator pitch using the 4-part structure. Aim for 60 seconds when spoken aloud.
                </p>
                
                <Textarea
                  placeholder="Write your 60-second elevator pitch here. Remember: Who you are → What you've done → Why finance → What you're seeking"
                  value={elevatorPitch}
                  onChange={(e) => setElevatorPitch(e.target.value)}
                  className="min-h-32"
                />
                
                <AudioRecorder 
                  onTranscription={(text) => setElevatorPitch(prev => prev + '\n\n' + text)}
                  placeholder="Record your 60-second elevator pitch. Practice until it sounds natural and confident!"
                />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Character count: {elevatorPitch.length}</span>
                  <span>Est. speaking time: ~{Math.round(elevatorPitch.split(' ').length / 2)} seconds</span>
                </div>

                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">💎 Pro Tips:</h5>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Practice until it feels natural, not rehearsed</li>
                    <li>• Include specific, quantifiable achievements</li>
                    <li>• Tailor slightly for each firm/role</li>
                    <li>• End with enthusiasm and forward momentum</li>
                  </ul>
                </Card>
              </div>

              <Button 
                onClick={() => handleSectionComplete(2)} 
                className="w-full"
                disabled={elevatorPitch.length < 150}
              >
                Continue to STAR Method Training {elevatorPitch.length < 150 && '(Write at least 150 characters)'}
              </Button>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-green-600" />
                <span>STAR Method Mastery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 mb-4">
                  <h3 className="text-green-800 font-semibold mb-2">🎯 Objective:</h3>
                  <p className="text-green-700 mb-2">
                    Master the STAR framework for structured, compelling behavioral storytelling.
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Why this matters:</strong> Behavioral questions can make or break your interview. 
                    The STAR method ensures your stories are structured, impactful, and highlight your 
                    specific contributions rather than rambling narratives.
                  </p>
                </div>

                <p>
                  The STAR method (Situation, Task, Action, Result) is your secret weapon for behavioral interviews. 
                  It provides structure for compelling storytelling that showcases your skills and impact.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-green-50 border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">⭐ STAR Framework:</h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li><strong>Situation:</strong> Set the context (20%)</li>
                      <li><strong>Task:</strong> Your responsibility (15%)</li>
                      <li><strong>Action:</strong> What YOU did (50%)</li>
                      <li><strong>Result:</strong> Quantified outcome (15%)</li>
                    </ul>
                  </Card>
                  <Card className="p-4 bg-yellow-50 border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">🎯 Common Questions:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Tell me about a challenge you overcame</li>
                      <li>• Describe a leadership experience</li>
                      <li>• Share a time you failed</li>
                      <li>• Example of teamwork</li>
                    </ul>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">📝 STAR Story Builder</h4>
                <p className="text-sm text-muted-foreground">
                  Create a STAR story for: "Tell me about a time you overcame a significant challenge."
                </p>
                
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Situation (Context - keep brief)</label>
                    <Textarea
                      placeholder="Briefly describe the situation and context..."
                      value={starStory.situation}
                      onChange={(e) => setStarStory({...starStory, situation: e.target.value})}
                      className="mt-1"
                    />
                    <AudioRecorder 
                      onTranscription={(text) => setStarStory(prev => ({...prev, situation: prev.situation + '\n\n' + text}))}
                      placeholder="Describe the challenging situation you faced..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Task (Your responsibility)</label>
                    <Textarea
                      placeholder="What was your specific responsibility or goal?"
                      value={starStory.task}
                      onChange={(e) => setStarStory({...starStory, task: e.target.value})}
                      className="mt-1"
                    />
                    <AudioRecorder 
                      onTranscription={(text) => setStarStory(prev => ({...prev, task: prev.task + '\n\n' + text}))}
                      placeholder="What was your specific responsibility in this situation?"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Action (What YOU did - most important!)</label>
                    <Textarea
                      placeholder="Describe the specific actions you took. Focus on YOUR contributions..."
                      value={starStory.action}
                      onChange={(e) => setStarStory({...starStory, action: e.target.value})}
                      className="mt-1"
                    />
                    <AudioRecorder 
                      onTranscription={(text) => setStarStory(prev => ({...prev, action: prev.action + '\n\n' + text}))}
                      placeholder="Detail the specific actions YOU took to address the challenge..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Result (Quantified outcome)</label>
                    <Textarea
                      placeholder="What was the outcome? Include specific metrics if possible..."
                      value={starStory.result}
                      onChange={(e) => setStarStory({...starStory, result: e.target.value})}
                      className="mt-1"
                    />
                    <AudioRecorder 
                      onTranscription={(text) => setStarStory(prev => ({...prev, result: prev.result + '\n\n' + text}))}
                      placeholder="What was the quantified result of your actions?"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleSectionComplete(3)} 
                className="w-full"
                disabled={!starStory.situation || !starStory.task || !starStory.action || !starStory.result}
              >
                Continue to Research Game
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-orange-600" />
                <span>Company Research & Prep Game</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p>
                  Thorough research separates good candidates from great ones. It shows genuine interest and 
                  helps you ask thoughtful questions that demonstrate your engagement.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 Research Checklist</h4>
                  <ul className="text-blue-700 space-y-2 text-sm">
                    <li>✓ Recent deals and transactions</li>
                    <li>✓ Company culture and values</li>
                    <li>✓ Leadership team and backgrounds</li>
                    <li>✓ Market position and competitors</li>
                    <li>✓ Recent news and developments</li>
                    <li>✓ Industry trends and challenges</li>
                  </ul>
                </Card>
                
                <Card className="p-4 bg-green-50 border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">💡 Great Questions to Ask</h4>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• "What's the most rewarding part of working here?"</li>
                    <li>• "How is feedback typically delivered?"</li>
                    <li>• "What traits do successful analysts share?"</li>
                    <li>• "How has the team adapted to recent market changes?"</li>
                  </ul>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🎮 Research Challenge Game</h4>
                <p className="text-sm text-muted-foreground">
                  Test your research skills! Answer these questions about preparing for interviews.
                </p>
                
                {renderQuizQuestion(
                  "What's the BEST source for finding recent deals a bank has worked on?",
                  [
                    "Company's Wikipedia page",
                    "Bank's website 'Recent Transactions' section",
                    "General Google search",
                    "Social media posts"
                  ],
                  1,
                  "research1"
                )}

                {renderQuizQuestion(
                  "When researching company culture, which source is MOST valuable?",
                  [
                    "Company's marketing materials only",
                    "Current employee LinkedIn posts and interviews",
                    "Competitor websites",
                    "Generic Glassdoor reviews"
                  ],
                  1,
                  "research2"
                )}
              </div>

              <Button 
                onClick={() => handleSectionComplete(4)} 
                className="w-full"
                disabled={Object.keys(quizAnswers).length < 2}
              >
                Continue to Module Quiz
              </Button>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Module 1 Knowledge Check</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Test your understanding of Module 1 concepts!</p>
              
              {renderQuizQuestion(
                "What percentage of your STAR story should focus on the 'Action' component?",
                ["20%", "30%", "40%", "50%"],
                3,
                "final1"
              )}

              {renderQuizQuestion(
                "A strong elevator pitch should be approximately how long?",
                ["30 seconds", "60 seconds", "90 seconds", "2 minutes"],
                1,
                "final2"
              )}

              {renderQuizQuestion(
                "What makes a 'Why Finance' story compelling?",
                [
                  "Mentioning high salary potential",
                  "A specific, authentic moment that sparked interest",
                  "Listing all finance courses taken",
                  "Talking about prestige"
                ],
                1,
                "final3"
              )}

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🎉 Module 1 Assignment:</h4>
                <div className="text-green-700 space-y-2 text-sm">
                  <p><strong>Practice Task:</strong> Record yourself delivering your elevator pitch and "Why Finance" story.</p>
                  <p><strong>Goal:</strong> Sound natural and confident, not rehearsed.</p>
                  <p><strong>Next:</strong> Move on to Module 2 - Behavioral Mastery!</p>
                </div>
              </div>

              <Button 
                onClick={() => handleSectionComplete(5)} 
                className="w-full"
                disabled={Object.keys(quizAnswers).length < 5}
              >
                Complete Module 1! 🎉
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Badge className="bg-blue-500">Module 1 of 6</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Interview Mindset & Preparation</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentSection + 1} of {sections.length}
            </span>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
      </Card>

      {renderCurrentSection()}
    </div>
  );
};

export default InterviewModule1;
