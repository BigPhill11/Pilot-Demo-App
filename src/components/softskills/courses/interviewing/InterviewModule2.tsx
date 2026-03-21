
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, Star, Target, Trophy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import AudioRecorder from './AudioRecorder';

interface InterviewModule2Props {
  onComplete: () => void;
  onBack: () => void;
}

const InterviewModule2: React.FC<InterviewModule2Props> = ({ onComplete, onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [behavioralStories, setBehavioralStories] = useState<{[key: string]: string}>({});
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const sections = [
    { title: "Behavioral Excellence Overview", icon: Users },
    { title: "Top Behavioral Questions", icon: Target },
    { title: "Story Banking Exercise", icon: Star },
    { title: "Strategic Honesty Game", icon: Trophy },
    { title: "Module 2 Assessment", icon: CheckCircle }
  ];

  const topBehavioralQuestions = [
    "Why this firm specifically?",
    "Tell me about a time you failed",
    "Describe a leadership experience under pressure",
    "Give an example of effective teamwork",
    "How do you handle conflict resolution?"
  ];

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex]);
    }
    
    if (sectionIndex < sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    } else {
      toast.success("Module 2 completed! 🎉");
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
                className="w-full justify-start text-left h-auto p-3 whitespace-normal break-words"
                onClick={() => !hasAnswered && setQuizAnswers({...quizAnswers, [questionKey]: index})}
                disabled={hasAnswered}
              >
                <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-1">{option}</span>
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
                <Users className="h-5 w-5 text-blue-600" />
                <span>Behavioral Excellence Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
                  <h3 className="text-blue-800 font-semibold mb-2">🎯 Module Objectives:</h3>
                  <p className="text-blue-700 mb-2">
                    Master behavioral storytelling that showcases your personality, values, and cultural fit. 
                    Transform your experiences into compelling narratives that demonstrate finance-relevant traits.
                  </p>
                  <p className="text-blue-700 text-sm">
                    <strong>Why this matters:</strong> Technical skills get you in the door, but behavioral interviews 
                    determine if you get the offer. Finance firms hire for cultural fit and soft skills—they need 
                    to trust you'll represent them well with clients and work effectively under pressure.
                  </p>
                </div>

                <p className="text-lg">
                  Welcome to Module 2! Behavioral interviews are where you showcase your personality, values, 
                  and fit for the role beyond technical skills.
                </p>
                <p>
                  The key to behavioral success is authentic storytelling that highlights traits finance firms value: 
                  leadership, resilience, teamwork, and drive. You'll learn to turn your experiences into compelling 
                  narratives that make you memorable.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 my-6">
                  <h3 className="text-blue-800 font-semibold mb-2">🎯 Module 2 Objectives:</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Master the top 5 behavioral questions</li>
                    <li>• Build a bank of compelling STAR stories</li>
                    <li>• Learn strategic honesty techniques</li>
                    <li>• Quantify your impact effectively</li>
                    <li>• Tailor responses to finance values</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">What Finance Firms Really Want</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Card className="p-4 bg-green-50 border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Sought-After Traits:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Grit and perseverance</li>
                      <li>• Intellectual curiosity</li>
                      <li>• Strong work ethic</li>
                      <li>• Leadership potential</li>
                      <li>• Team collaboration</li>
                      <li>• Client focus</li>
                    </ul>
                  </Card>
                  <Card className="p-4 bg-yellow-50 border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Be specific, not generic</li>
                      <li>• Quantify your impact</li>
                      <li>• Show growth mindset</li>
                      <li>• Demonstrate learning from failure</li>
                      <li>• Connect to finance context</li>
                    </ul>
                  </Card>
                </div>
              </div>
              
              <Button onClick={() => handleSectionComplete(0)} className="w-full">
                Continue to Top Behavioral Questions
              </Button>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-red-600" />
                <span>Top Behavioral Questions Deep Dive</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p>
                  Let's break down the 5 most common behavioral questions and what interviewers are really 
                  looking for in your responses.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "Why this firm specifically?",
                    lookingFor: "Genuine research, cultural fit, specific reasons beyond prestige",
                    example: "I'm drawn to Goldman's commitment to innovation in sustainable finance. Your recent work on the $2B green bond for renewable energy aligns with my passion for ESG investing...",
                    avoid: "You're prestigious and pay well"
                  },
                  {
                    question: "Tell me about a time you failed",
                    lookingFor: "Self-awareness, learning ability, resilience, growth mindset",
                    example: "In my finance club, I overestimated our fundraising capacity and committed to a speaker we couldn't afford. I learned to better validate assumptions and now always build contingency plans...",
                    avoid: "I've never really failed at anything important"
                  },
                  {
                    question: "Leadership under pressure",
                    lookingFor: "Decision-making, composure, team management, problem-solving",
                    example: "During finals week, our group project leader dropped out. I stepped up, reorganized tasks, established daily check-ins, and we delivered on time with a 95% grade...",
                    avoid: "Generic leadership examples without pressure context"
                  }
                ].map((item, index) => (
                  <Card key={index} className="p-4 border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">"{item.question}"</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-green-700 mb-1">What they're looking for:</p>
                        <p className="text-green-600 mb-2">{item.lookingFor}</p>
                        <p className="font-medium text-blue-700 mb-1">Strong example:</p>
                        <p className="text-blue-600 italic">"{item.example}"</p>
                      </div>
                      <div>
                        <p className="font-medium text-red-700 mb-1">Avoid saying:</p>
                        <p className="text-red-600 italic">"{item.avoid}"</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button onClick={() => handleSectionComplete(1)} className="w-full">
                Continue to Story Banking Exercise
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Story Banking Exercise</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                  <h3 className="text-yellow-800 font-semibold mb-2">🎯 Objective:</h3>
                  <p className="text-yellow-700 mb-2">
                    Build a "bank" of versatile STAR stories that can be adapted for different behavioral questions.
                  </p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Why this matters:</strong> Having prepared stories prevents you from blanking out during 
                    interviews. With 5 solid stories, you can adapt them to answer dozens of different behavioral questions 
                    while sounding natural and unrehearsed.
                  </p>
                </div>

                <p>
                  Create a "bank" of 5 versatile STAR stories that can be adapted for different behavioral questions. 
                  Each story should demonstrate different strengths.
                </p>
                
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-2">🏦 Your Story Bank Should Include:</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• A leadership/initiative story</li>
                    <li>• A failure/learning experience</li>
                    <li>• A teamwork/collaboration example</li>
                    <li>• A challenge/problem-solving situation</li>
                    <li>• A conflict resolution scenario</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                {topBehavioralQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-blue-800">
                      Story #{index + 1}: {question}
                    </h4>
                    <Textarea
                      placeholder={`Write your STAR story for: "${question}". Include specific details, actions you took, and quantified results.`}
                      value={behavioralStories[`story${index}`] || ''}
                      onChange={(e) => setBehavioralStories({
                        ...behavioralStories,
                        [`story${index}`]: e.target.value
                      })}
                      className="min-h-24"
                    />
                    <AudioRecorder 
                      onTranscription={(text) => setBehavioralStories(prev => ({
                        ...prev,
                        [`story${index}`]: (prev[`story${index}`] || '') + '\n\n' + text
                      }))}
                      placeholder={`Record your STAR story for: "${question}"`}
                    />
                    <div className="text-xs text-muted-foreground">
                      Characters: {(behavioralStories[`story${index}`] || '').length}
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => handleSectionComplete(2)} 
                className="w-full"
                disabled={Object.keys(behavioralStories).length < 3}
              >
                Continue to Strategic Honesty Game (Complete at least 3 stories)
              </Button>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                <span>Strategic Honesty & Impact Quantification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p>
                  Strategic honesty means being authentic while framing your experiences in the most compelling way. 
                  You're not lying—you're highlighting the aspects that best demonstrate your strengths.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-green-50 border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Strategic Honesty Best Practices:</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Focus on what you learned, not just what went wrong</li>
                    <li>• Quantify impact wherever possible</li>
                    <li>• Show progression and growth</li>
                    <li>• Connect experiences to finance skills</li>
                    <li>• Be vulnerable but not self-destructive</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-red-50 border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Avoid These Mistakes:</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Oversharing personal struggles</li>
                    <li>• Blaming others for failures</li>
                    <li>• Using vague, generic language</li>
                    <li>• Forgetting to mention results</li>
                    <li>• Making yourself look incompetent</li>
                  </ul>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">🎯 Strategic Honesty Challenge</h4>
                <p className="text-sm text-muted-foreground">
                  Test your understanding of how to frame experiences strategically.
                </p>
                
                {renderQuizQuestion(
                  "When discussing a failure, you should focus MOST on:",
                  [
                    "How unfair the situation was",
                    "What you learned and how you've improved",
                    "Why it wasn't really your fault",
                    "How it made you feel"
                  ],
                  1,
                  "strategic1"
                )}

                {renderQuizQuestion(
                  "Which is the BEST way to quantify impact in a story?",
                  [
                    "We did really well on the project",
                    "I increased team efficiency by 30% and delivered 2 weeks early",
                    "Everyone was happy with the results",
                    "It was one of our most successful initiatives"
                  ],
                  1,
                  "strategic2"
                )}

                {renderQuizQuestion(
                  "When sharing a weakness, you should:",
                  [
                    "Choose something that makes you look bad",
                    "Pick a strength disguised as a weakness",
                    "Share a real weakness with steps you're taking to improve",
                    "Avoid the question entirely"
                  ],
                  2,
                  "strategic3"
                )}
              </div>

              <Button 
                onClick={() => handleSectionComplete(3)} 
                className="w-full"
                disabled={Object.keys(quizAnswers).length < 3}
              >
                Continue to Final Assessment
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Module 2 Final Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Test your mastery of behavioral interview techniques!</p>
              
              {renderQuizQuestion(
                "The most important part of answering 'Why this firm?' is:",
                [
                  "Mentioning the firm's prestige and reputation",
                  "Showing specific research and genuine connection to their work",
                  "Talking about compensation and benefits",
                  "Comparing them favorably to competitors"
                ],
                1,
                "final1"
              )}

              {renderQuizQuestion(
                "In a STAR story about teamwork, you should emphasize:",
                [
                  "How you were the best team member",
                  "Your specific contributions and the team's collective success",
                  "Problems other team members caused",
                  "Why teamwork is generally important"
                ],
                1,
                "final2"
              )}

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🎉 Module 2 Assignment:</h4>
                <div className="text-green-700 space-y-2 text-sm">
                  <p><strong>Practice Task:</strong> Practice your 5 STAR stories out loud until they feel natural.</p>
                  <p><strong>Goal:</strong> Each story should be 90-120 seconds when spoken.</p>
                  <p><strong>Bonus:</strong> Get feedback from a friend or mentor on one story.</p>
                  <p><strong>Next:</strong> Move on to Module 3 - Technical Excellence!</p>
                </div>
              </div>

              <Button 
                onClick={() => handleSectionComplete(4)} 
                className="w-full"
                disabled={Object.keys(quizAnswers).length < 5}
              >
                Complete Module 2! 🎉
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
        <Badge className="bg-blue-500">Module 2 of 6</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Behavioral Mastery</CardTitle>
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

export default InterviewModule2;
