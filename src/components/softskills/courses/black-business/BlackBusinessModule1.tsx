import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Play, BookOpen, Target, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';

interface BlackBusinessModule1Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const BlackBusinessModule1: React.FC<BlackBusinessModule1Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const { 
    progress, 
    updateProgress, 
    updateDetailedProgress, 
    completeModule, 
    isCompleted: moduleCompleted 
  } = useUnifiedProgress({
    moduleId: 'module-1',
    moduleType: 'soft_skills',
    courseId: 'black-business-excellence'
  });

  const sections = [
    {
      title: "Understanding Authentic Leadership",
      content: "Authentic leadership is about being genuine and true to yourself while adapting to professional contexts. As a Black professional, this means honoring your identity while building the skills needed to excel in corporate environments."
    },
    {
      title: "Cultural Code-Switching",
      content: "Code-switching is a valuable professional skill that allows you to communicate effectively across different contexts while maintaining your authentic self. It's like having different playlists for different occasions - you're still expressing yourself, but choosing the most appropriate style."
    },
    {
      title: "Building Executive Presence",
      content: "Executive presence is your ability to command respect and inspire confidence. It's not about changing who you are, but about developing the confidence to lead authentically in any environment."
    }
  ];

  const quizQuestion = {
    question: "What is the most important aspect of authentic leadership?",
    options: [
      "Staying exactly the same in all situations",
      "Being true to your values while adapting your communication style",
      "Avoiding any form of code-switching",
      "Always speaking about your cultural background"
    ],
    correct: 1,
    feedback: "Authentic leadership means staying true to your core values while being flexible in how you communicate and present yourself in different professional contexts."
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const score = answerIndex === quizQuestion.correct ? 100 : 0;
    setQuizScore(score);
    
    // Save quiz progress
    updateDetailedProgress('quiz_completed', true);
    updateDetailedProgress('quiz_score', score);
    updateDetailedProgress('quiz_answer', answerIndex);
  };

  // Update progress when sections are viewed or completed
  const handleSectionComplete = (sectionIndex: number) => {
    updateDetailedProgress(`section_${sectionIndex}_completed`, true);
    const completedSections = Object.keys(progress?.detailedProgress || {})
      .filter(key => key.includes('section_') && key.includes('_completed'))
      .length;
    
    const newProgress = Math.round((completedSections / sections.length) * 70); // 70% for content
    updateProgress(newProgress);
  };

  // Load saved progress on component mount
  useEffect(() => {
    if (progress?.detailedProgress) {
      // Restore quiz state
      if (progress.detailedProgress.quiz_completed) {
        setQuizScore(progress.detailedProgress.quiz_score || 0);
        setSelectedAnswer(progress.detailedProgress.quiz_answer || null);
      }
      
      // Restore current section based on progress
      const completedSections = Object.keys(progress.detailedProgress)
        .filter(key => key.includes('section_') && key.includes('_completed'))
        .length;
      
      if (completedSections > 0) {
        setCurrentSection(Math.min(completedSections, sections.length - 1));
      }
    }
  }, [progress]);

  const handleModuleComplete = async () => {
    await completeModule();
    onComplete();
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Authentic Leadership & Identity</h1>
          <p className="text-muted-foreground">Module 1 - Black in Business Excellence</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Module Progress</span>
                </CardTitle>
                <Badge variant="secondary">{progress?.progressPercentage || 0}% Complete</Badge>
              </div>
              <Progress value={progress?.progressPercentage || 0} className="h-2" />
            </CardHeader>
          </Card>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="keyterms">Key Terms</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{sections[currentSection].title}</CardTitle>
                  <CardDescription>Section {currentSection + 1} of {sections.length}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed">{sections[currentSection].content}</p>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      disabled={currentSection === 0}
                      onClick={() => setCurrentSection(currentSection - 1)}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant={currentSection === sections.length - 1 ? "default" : "outline"}
                      onClick={() => {
                        handleSectionComplete(currentSection);
                        if (currentSection < sections.length - 1) {
                          setCurrentSection(currentSection + 1);
                        }
                      }}
                    >
                      {currentSection === sections.length - 1 ? "Complete Content" : "Next"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keyterms" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Authentic Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">A leadership approach that emphasizes being genuine, true to oneself, and transparent in interactions with others.</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-800"><strong>Phil's Analogy:</strong> Like being the original version of yourself rather than a photocopy - maintaining your core values while adapting your communication style.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cultural Code-Switching</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">The practice of alternating between different cultural behaviors, languages, or communication styles depending on the social context.</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-800"><strong>Phil's Analogy:</strong> Like having different outfits for different occasions - you're still the same person, but you dress appropriately for the setting.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Executive Presence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">The ability to connect authentically with others in a way that motivates and inspires confidence, demonstrating leadership qualities.</p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-800"><strong>Phil's Analogy:</strong> Like having a magnetic personality that draws people in - commanding respect through your presence and authenticity.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Check</CardTitle>
                  <CardDescription>Test your understanding of authentic leadership principles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold">{quizQuestion.question}</h3>
                  <div className="space-y-2">
                    {quizQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="w-full text-left justify-start"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </Button>
                    ))}
                  </div>
                  
                  {quizScore !== null && (
                    <div className={`p-4 rounded-lg ${quizScore === 100 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      <p className="font-semibold">{quizScore === 100 ? 'Correct!' : 'Not quite right.'}</p>
                      <p className="text-sm">{quizQuestion.feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>Real-World Example</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-3">The Power of Authentic Leadership</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Meet Marcus Johnson, VP of Strategy at a Fortune 500 company, who transformed his career by embracing his authentic leadership style. Early in his career, Marcus felt pressure to minimize his cultural identity to fit in. However, he discovered that his unique perspective, rooted in his experiences growing up in an underserved community, gave him invaluable insights into untapped markets.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800"><strong>Key Lesson:</strong> Your authentic identity is not a barrier to overcome but a competitive advantage to leverage.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Practice Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-3">Leadership Presence Assessment</h3>
                  <p className="text-sm mb-4">Complete a comprehensive self-assessment of your current leadership presence and create a development plan.</p>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Record a 2-minute video introducing yourself as you would in a new job</li>
                    <li>Analyze your body language, voice tone, and confidence level</li>
                    <li>Identify three unique strengths you bring based on your background</li>
                    <li>Create a 30-day action plan to enhance your authentic executive presence</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {!moduleCompleted && (
            <Card>
              <CardContent className="pt-6">
                <Button onClick={handleModuleComplete} className="w-full" size="lg">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Complete Module 1
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm">Understand the value of authentic leadership</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm">Develop strategies to maintain cultural identity</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm">Build confidence in your unique value proposition</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Module Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Duration: 40 minutes</p>
              <p className="text-sm text-muted-foreground">Difficulty: Intermediate</p>
              <Badge variant="outline">Professional Development</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlackBusinessModule1;