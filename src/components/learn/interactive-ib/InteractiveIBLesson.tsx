
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Gamepad2, Star, Brain, Users, Trophy } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import HighlightableTerm from '@/components/HighlightableTerm';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import LessonHeader from './LessonHeader';
import ProgressTracker from './ProgressTracker';
import OverviewTab from './OverviewTab';
import MiniGamesTab from './MiniGamesTab';
import KeyTermFlashcard from './KeyTermFlashcard';
import EnhancedQuiz from './EnhancedQuiz';

interface InteractiveIBLessonProps {
  lesson: InteractiveLessonContent;
  onBack: () => void;
  onComplete: () => void;
  customTermsMap?: Record<string, { term: string; definition: string; analogy: string }>;
}

const InteractiveIBLesson: React.FC<InteractiveIBLessonProps> = ({
  lesson,
  onBack,
  onComplete
}) => {
  const { profile } = useAuth();
  const [currentTab, setCurrentTab] = useState('flashcards'); // Start with flashcards tab
  const { progress, markTermMastered, saveQuizScore, markActivityCompleted, getProgressPercentage } = useLessonProgress(lesson.level.toString());

  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(userLevel);

  // Get key terms from the lesson content using keyTerms instead of keyPoints
  const keyTerms = lesson.keyTerms.map(termKey => {
    return ibTerms[termKey] || null;
  }).filter(Boolean);

  // Generate exactly 5 quiz questions from the lesson content
  const generateQuizQuestions = () => {
    const allQuestions = lesson.interactiveQuiz.questions
      .filter(q => q.difficulty === userLevel || 
        (userLevel === 'intermediate' && q.difficulty === 'beginner') ||
        (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(q.difficulty)));
    
    // Take exactly 5 questions, repeat if necessary
    const questions = [];
    for (let i = 0; i < 5; i++) {
      questions.push(allQuestions[i % allQuestions.length]);
    }
    
    return questions;
  };

  const quizQuestions = generateQuizQuestions();

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    saveQuizScore('main_quiz', score);
    markActivityCompleted('quiz');
    
    // Check if lesson is complete
    const progressPercentage = getProgressPercentage(keyTerms.length, 3); // 3 activities: terms, quiz, practice
    if (progressPercentage >= 80) {
      onComplete();
    }
  };

  const handleQuizRetry = () => {
    // Reset quiz in progress tracking if needed
  };

  const renderTermWithTooltip = (term: string) => {
    const termData = ibTerms[term];
    if (termData) {
      return (
        <HighlightableTerm 
          term={term} 
          definition={termData.definition}
          analogy={termData.analogy}
        >
          <span className="font-semibold text-primary cursor-help underline decoration-dotted">
            {term.replace('_', ' ')}
          </span>
        </HighlightableTerm>
      );
    }
    return <span className="font-semibold">{term.replace('_', ' ')}</span>;
  };

  const currentProgress = getProgressPercentage(keyTerms.length, 3);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <LessonHeader lesson={lesson} onBack={onBack} />
      <ProgressTracker progress={currentProgress} />

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Trophy className="h-4 w-4 mr-2" />
            Learn Terms
          </TabsTrigger>
          <TabsTrigger value="games">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Mini Games
          </TabsTrigger>
          <TabsTrigger value="examples">
            <Star className="h-4 w-4 mr-2" />
            Examples
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Brain className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Users className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab 
            lesson={lesson} 
            ibTerms={ibTerms} 
            renderTermWithTooltip={renderTermWithTooltip}
            onTermMastered={markTermMastered}
            masteredTerms={progress.masteredTerms}
          />
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Master Key Terms
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {progress.masteredTerms.length}/{keyTerms.length} mastered
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {keyTerms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {keyTerms.map((term, index) => (
                    <KeyTermFlashcard
                      key={index}
                      term={term.term}
                      definition={term.definition}
                      analogy={term.analogy}
                      onMastered={markTermMastered}
                      isMastered={progress.masteredTerms.includes(term.term)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No key terms available for this lesson.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <MiniGamesTab
            filteredMiniGames={lesson.miniGames.filter(game => 
              game.difficulty === userLevel || 
              (userLevel === 'intermediate' && game.difficulty === 'beginner') ||
              (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(game.difficulty))
            )}
            completedActivities={progress.completedActivities}
            onActivityComplete={markActivityCompleted}
          />
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid gap-6">
            {lesson.realWorldExamples.filter(example => 
              example.difficulty === userLevel || 
              (userLevel === 'intermediate' && example.difficulty === 'beginner') ||
              (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(example.difficulty))
            ).map((example) => (
              <Card key={example.id}>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{example.company}</span>
                    <span>•</span>
                    <span>{example.year}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{example.description}</p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Key Learning:</h4>
                    <p className="text-blue-700">{example.keyLearning}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Knowledge Quiz - 5 Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedQuiz
                questions={quizQuestions}
                onComplete={handleQuizComplete}
                onRetry={handleQuizRetry}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{lesson.practicalActivity.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{lesson.practicalActivity.description}</p>
              
              <div>
                <h4 className="font-semibold mb-3">Steps to Complete:</h4>
                <div className="space-y-2">
                  {lesson.practicalActivity.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">📋 Deliverable:</h4>
                <p className="text-green-700">{lesson.practicalActivity.deliverable}</p>
              </div>

              <Button 
                onClick={() => markActivityCompleted('practice')}
                disabled={progress.completedActivities.includes('practice')}
                className="w-full"
                size="lg"
              >
                {progress.completedActivities.includes('practice') ? 
                  'Activity Completed!' : 
                  'Mark as Complete'
                }
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveIBLesson;
