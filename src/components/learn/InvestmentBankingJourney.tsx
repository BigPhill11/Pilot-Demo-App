import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Sparkles, Trophy, Clock, BarChart3, BookOpen } from 'lucide-react';
import { investmentBankingLessons } from '@/data/investment-banking-lessons';
import InteractiveIBLesson from './InteractiveIBLesson';
import { ibDivisions, type IBDivision } from '@/data/ib-divisions';
import InvestmentBankingJourneyHeader from './InvestmentBankingJourneyHeader';
import InvestmentBankingJourneyLevelCard from './InvestmentBankingJourneyLevelCard';
import CareerStoriesHub from './career-stories/CareerStoriesHub';
import { careerStories } from '@/data/career-stories';

interface InvestmentBankingJourneyProps {
  onBack: () => void;
  onOpenDivisions?: () => void;
}

const InvestmentBankingJourney: React.FC<InvestmentBankingJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<IBDivision | null>(null);
  const [selectedDivisionLessonIndex, setSelectedDivisionLessonIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('investmentBanking-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompletedLevels(new Set(parsed.completedLevels || []));
      setIsJourneyCompleted(Boolean(parsed.isCompleted));
    }
  }, []);

  const saveProgress = (levels: Set<number>, completed: boolean) => {
    localStorage.setItem(
      'investmentBanking-progress',
      JSON.stringify({ completedLevels: Array.from(levels), isCompleted: completed })
    );
  };

  const handleLevelComplete = (levelNum: number) => {
    const next = new Set(completedLevels);
    next.add(levelNum);
    const allDone = next.size === investmentBankingLessons.length;
    setCompletedLevels(next);
    setIsJourneyCompleted(allDone);
    saveProgress(next, allDone);
    setSelectedLevel(null);
  };

  const isLevelUnlocked = (levelNum: number) => {
    if (levelNum === 1) return true;
    return completedLevels.has(levelNum - 1);
  };

  if (selectedLevel !== null) {
    const lesson = investmentBankingLessons.find(l => l.level === selectedLevel);
    if (lesson) {
      return (
        <InteractiveIBLesson
          lesson={lesson}
          onBack={() => setSelectedLevel(null)}
          onComplete={() => handleLevelComplete(selectedLevel)}
        />
      );
    }
  }

  if (selectedDivision) {
    const lesson = selectedDivision.lessons[selectedDivisionLessonIndex];
    return (
      <InteractiveIBLesson
        lesson={lesson}
        onBack={() => setSelectedDivision(null)}
        onComplete={() => {
          if (selectedDivisionLessonIndex < selectedDivision.lessons.length - 1) {
            setSelectedDivisionLessonIndex(selectedDivisionLessonIndex + 1);
          } else {
            setSelectedDivision(null);
            setSelectedDivisionLessonIndex(0);
          }
        }}
      />
    );
  }

  const ibStories = careerStories.filter(story => story.careerType === 'investment-banking');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button onClick={onBack} variant="ghost" size="sm" className="text-blue-700 hover:text-blue-800 hover:bg-blue-100">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers
          </Button>
        </div>

        <InvestmentBankingJourneyHeader
          completedLevels={completedLevels.size}
          totalLevels={investmentBankingLessons.length}
        />

        <Tabs defaultValue="lessons" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="lessons">
              <BookOpen className="h-4 w-4 mr-2" />
              Learning Journey
            </TabsTrigger>
            <TabsTrigger value="stories">
              📖 Interactive Stories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6 mt-6">
            <div className="grid gap-6">
          {investmentBankingLessons.map(level => (
            <InvestmentBankingJourneyLevelCard
              key={level.level}
              level={level}
              isCompleted={completedLevels.has(level.level)}
              isUnlocked={isLevelUnlocked(level.level)}
              onLevelSelect={setSelectedLevel}
            />
          ))}

          {isJourneyCompleted && (
            <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg animate-fade-in">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <Trophy className="h-16 w-16 text-blue-500" />
                    <Sparkles className="h-6 w-6 text-indigo-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">🎉 Investment Banking Journey Complete! 🎉</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-700 dark:text-blue-300 mb-6">
                  Outstanding achievement! You've mastered investment banking fundamentals from analyst to MD level. 
                  Now explore specialized divisions to become a true expert.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      ✅ Banking Fundamentals
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      ✅ Financial Modeling
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      ✅ Deal Execution
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
            </div>

            <div className="mt-10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold tracking-tight text-blue-800 dark:text-blue-300">Specialized IB Divisions</h3>
            <p className="text-muted-foreground">Deep dives into M&A, DCM, ECM, LevFin, Sales & Trading, and Restructuring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ibDivisions.map((division) => (
              <Card 
                key={division.id}
                className="flex flex-col hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer group h-full hover-scale animate-fade-in"
                onClick={() => setSelectedDivision(division)}
              >
                <CardHeader className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">{division.icon}</div>
                    <Badge variant={division.difficulty === 'advanced' ? 'destructive' : 'secondary'}>
                      {division.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{division.name}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{division.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{division.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>{division.lessons.length} Levels</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Course Structure:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {division.lessons.map((lesson, idx) => (
                        <div key={idx} className="bg-muted rounded-md p-2 text-center">
                          <div className="text-xs font-medium">Level {lesson.level}</div>
                          <div className="text-xs text-muted-foreground truncate">{lesson.theme}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
            </div>
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <CareerStoriesHub stories={ibStories} careerName="Investment Banking" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentBankingJourney;


