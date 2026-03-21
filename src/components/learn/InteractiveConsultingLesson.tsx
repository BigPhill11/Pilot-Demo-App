import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Gamepad2, Star, Brain, Users, Trophy, CheckCircle } from 'lucide-react';
import { ConsultingLessonContent } from '@/data/management-consulting-lessons';
import HighlightableTerm from '@/components/HighlightableTerm';
import { consultingTerms } from '@/data/management-consulting-terms';
import { useAuth } from '@/hooks/useAuth';
import { useConsultingProgressAdapter } from '@/hooks/useProgressAdapter';
import LessonHeader from './interactive-ib/LessonHeader';
import ProgressTracker from './interactive-ib/ProgressTracker';
import OverviewTab from './interactive-consulting/OverviewTab';
import LearnTermsTab from './interactive-consulting/LearnTermsTab';
import MiniGamesTab from './interactive-consulting/MiniGamesTab';
import EnhancedQuiz from './interactive-ib/EnhancedQuiz';

interface InteractiveConsultingLessonProps {
  lesson: ConsultingLessonContent;
  onBack: () => void;
  onComplete: () => void;
}

const InteractiveConsultingLesson: React.FC<InteractiveConsultingLessonProps> = ({
  lesson,
  onBack,
  onComplete
}) => {
  const { profile } = useAuth();
  const { 
    getLevelProgress,
    saveMiniGameProgress 
  } = useConsultingProgressAdapter();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const levelProgress = getLevelProgress(lesson.level);

  useEffect(() => {
    // Check if lesson is complete and trigger onComplete if 100%
    if (levelProgress.totalProgress >= 100) {
      onComplete();
    }
  }, [levelProgress.totalProgress, onComplete]);

  const generateQuizQuestions = () => {
    // Ensure lesson and interactiveQuiz exist
    if (!lesson?.interactiveQuiz?.questions) {
      console.warn('No quiz questions available for lesson:', lesson?.title);
      return [];
    }

    const userLevel = profile?.app_version || 'beginner';
    const difficultyMap: Record<string, string> = {
      'beginner': 'beginner',
      'intermediate': 'intermediate', 
      'advanced': 'advanced'
    };
    const targetDifficulty = difficultyMap[userLevel] || 'beginner';

    const filteredQuestions = lesson.interactiveQuiz.questions.filter(
      q => q?.difficulty === targetDifficulty || q?.difficulty === 'beginner'
    ).slice(0, 5);

    console.log('Generated quiz questions:', filteredQuestions.length, 'for difficulty:', targetDifficulty);
    return filteredQuestions;
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    saveMiniGameProgress(lesson.level, 'main_quiz', score, true);
    
    if (!completedActivities.includes('quiz')) {
      setCompletedActivities(prev => [...prev, 'quiz']);
    }
  };

  const handleQuizRetry = () => {
    // Handle quiz retry logic
  };

  const markActivityCompleted = (activity: string) => {
    if (!completedActivities.includes(activity)) {
      setCompletedActivities(prev => [...prev, activity]);
    }
  };

  const renderTermWithTooltip = (term: string) => {
    const termData = consultingTerms[term];
    if (!termData) return term;

    return (
      <HighlightableTerm
        key={term}
        term={termData.term}
        definition={termData.definition}
        analogy={termData.analogy}
      >
        <span className="font-medium text-primary cursor-help border-b border-dotted border-primary">
          {termData.term}
        </span>
      </HighlightableTerm>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <LessonHeader lesson={lesson} onBack={onBack} />
      
      <ProgressTracker 
        progress={levelProgress.totalProgress}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Learn Terms
          </TabsTrigger>
          <TabsTrigger value="mini-games" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Mini Games
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Examples
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab 
            lesson={lesson} 
            consultingTerms={consultingTerms}
            onActivityComplete={() => markActivityCompleted('overview')}
          />
        </TabsContent>

        <TabsContent value="terms" className="mt-6">
          <LearnTermsTab 
            lesson={lesson} 
            consultingTerms={consultingTerms}
            onActivityComplete={() => markActivityCompleted('terms')}
          />
        </TabsContent>

        <TabsContent value="mini-games" className="mt-6">
          <MiniGamesTab 
            lesson={lesson}
            completedActivities={completedActivities}
            onActivityComplete={() => markActivityCompleted('mini_games')}
          />
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Real-World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {lesson.realWorldExamples.map((example) => (
                <div key={example.id} className="border-l-4 border-primary pl-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{example.title}</h3>
                    <Badge variant="outline">{example.difficulty}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {example.company} • {example.year}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {example.description}
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Key Learning:</h4>
                    <p className="text-sm">{example.keyLearning}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <EnhancedQuiz
            questions={generateQuizQuestions()}
            onComplete={handleQuizComplete}
            onRetry={handleQuizRetry}
          />
        </TabsContent>

        <TabsContent value="practice" className="mt-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Practical Activity: {lesson.practicalActivity.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {lesson.practicalActivity.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Steps to Complete:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  {lesson.practicalActivity.steps.map((step, index) => (
                    <li key={index} className="text-sm leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Deliverable:</h4>
                <p className="text-blue-800 text-sm">{lesson.practicalActivity.deliverable}</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => markActivityCompleted('practice')}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Mark Practice Complete
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveConsultingLesson;