import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Gamepad2, Star, Brain, Users } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import HighlightableTerm from '@/components/HighlightableTerm';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';
import LessonHeader from './interactive-ib/LessonHeader';
import ProgressTracker from './interactive-ib/ProgressTracker';
import OverviewTab from './interactive-ib/OverviewTab';
import MiniGamesTab from './interactive-ib/MiniGamesTab';
import LearnTermsTab from './interactive-ib/LearnTermsTab';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface InteractiveIBLessonProps {
  lesson: InteractiveLessonContent;
  onBack: () => void;
  onComplete: () => void;
}

const InteractiveIBLesson: React.FC<InteractiveIBLessonProps> = ({
  lesson,
  onBack,
  onComplete
}) => {
  const { profile } = useAuth();
  const { awardPoints } = useProgressTracking();
  const [currentTab, setCurrentTab] = useState('overview');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [masteredTerms, setMasteredTerms] = useState<string[]>([]);

  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(lesson.level);

  const handleActivityComplete = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      const newCompleted = [...completedActivities, activityId];
      setCompletedActivities(newCompleted);
      
      const totalActivities = lesson.miniGames.length + 1 + 1;
      const progress = (newCompleted.length / totalActivities) * 100;
      setLessonProgress(progress);
      // Award a flat 25 XP per activity completion
      awardPoints(25, 'Lesson Activity');
      
      if (progress >= 100) {
        onComplete();
      }
    }
  };

  const handleTermMastered = (term: string) => {
    setMasteredTerms(prev => 
      prev.includes(term) 
        ? prev.filter(t => t !== term)
        : [...prev, term]
    );
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

  const renderTextWithTermHighlights = (text: string) => {
    let processedText = text;
    
    // Find all terms that exist in our ibTerms and wrap them with HighlightableTerm
    Object.keys(ibTerms).forEach(termKey => {
      const term = ibTerms[termKey];
      const termDisplayName = term.term;
      
      // Create regex to find the term (case insensitive, whole word)
      const regex = new RegExp(`\\b${termDisplayName}\\b`, 'gi');
      
      processedText = processedText.replace(regex, (match) => {
        return `<TERM_HIGHLIGHT>${match}</TERM_HIGHLIGHT>`;
      });
    });

    // Split the text and render with highlights
    const parts = processedText.split(/(<TERM_HIGHLIGHT>.*?<\/TERM_HIGHLIGHT>)/);
    
    return parts.map((part, index) => {
      const termMatch = part.match(/<TERM_HIGHLIGHT>(.*?)<\/TERM_HIGHLIGHT>/);
      if (termMatch) {
        const termText = termMatch[1];
        // Find matching term data
        const termData = Object.values(ibTerms).find(term => 
          term.term.toLowerCase() === termText.toLowerCase()
        );
        
        if (termData) {
          return (
            <HighlightableTerm
              key={index}
              term={termData.term}
              definition={termData.definition}
              analogy={termData.analogy}
            >
              <span className="font-semibold text-primary cursor-help underline decoration-dotted">
                {termText}
              </span>
            </HighlightableTerm>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  const getLevelAppropriateContent = (content: any[], userLevel: string) => {
    return content.filter(item => 
      item.difficulty === userLevel || 
      (userLevel === 'intermediate' && item.difficulty === 'beginner') ||
      (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(item.difficulty))
    );
  };

  const filteredMiniGames = getLevelAppropriateContent(lesson.miniGames, userLevel);
  const filteredExamples = getLevelAppropriateContent(lesson.realWorldExamples, userLevel);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <LessonHeader lesson={lesson} onBack={onBack} />
      <ProgressTracker progress={lessonProgress} />

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="terms">
            <Brain className="h-4 w-4 mr-2" />
            Learn Terms
          </TabsTrigger>
          <TabsTrigger value="games">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Mini Games
          </TabsTrigger>
          <TabsTrigger value="examples">
            <Star className="h-4 w-4 mr-2" />
            Real Examples
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
            onTermMastered={handleTermMastered}
            masteredTerms={masteredTerms}
          />
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <LearnTermsTab 
            lesson={lesson} 
            ibTerms={ibTerms} 
            onTermMastered={handleTermMastered}
            masteredTerms={masteredTerms}
          />
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <MiniGamesTab
            filteredMiniGames={filteredMiniGames}
            completedActivities={completedActivities}
            onActivityComplete={handleActivityComplete}
          />
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid gap-6">
            {filteredExamples.map((example) => (
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
                  <p>{renderTextWithTermHighlights(example.description)}</p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Key Learning:</h4>
                    <p className="text-blue-700">{renderTextWithTermHighlights(example.keyLearning)}</p>
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
                <span>Test Your Knowledge</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.interactiveQuiz.questions
                .filter(q => q.difficulty === userLevel || 
                  (userLevel === 'intermediate' && q.difficulty === 'beginner') ||
                  (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(q.difficulty)))
                .map((question) => (
                <div key={question.id} className="mb-6">
                  <InteractiveQuiz
                    topicId={question.id}
                    question={question.question}
                    options={question.options}
                    correctAnswerIndex={question.correctAnswer}
                    feedbackForIncorrect={question.explanation}
                    onQuizComplete={(id, isCorrect) => {
                      if (isCorrect) handleActivityComplete('quiz');
                    }}
                    isCompleted={completedActivities.includes('quiz')}
                  />
                </div>
              ))}
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
              <p className="text-lg">{renderTextWithTermHighlights(lesson.practicalActivity.description)}</p>
              
              <div>
                <h4 className="font-semibold mb-3">Steps to Complete:</h4>
                <div className="space-y-2">
                  {lesson.practicalActivity.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{renderTextWithTermHighlights(step)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">📋 Deliverable:</h4>
                <p className="text-green-700">{renderTextWithTermHighlights(lesson.practicalActivity.deliverable)}</p>
              </div>

              <Button 
                onClick={() => handleActivityComplete('practice')}
                disabled={completedActivities.includes('practice')}
                className="w-full"
                size="lg"
              >
                {completedActivities.includes('practice') ? 
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
