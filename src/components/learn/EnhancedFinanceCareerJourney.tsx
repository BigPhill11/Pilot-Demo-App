
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Star, Trophy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PandaLogo from '@/components/icons/PandaLogo';
import InteractiveIBLesson from './InteractiveIBLesson';
import InteractivePELesson from './InteractivePELesson';
import InteractiveConsultingLesson from './InteractiveConsultingLesson';
import type { FinanceCareerData } from '@/data/finance-careers';
import { investmentBankingLessons } from '@/data/investment-banking-lessons';
import { privateEquityLessons } from '@/data/private-equity-lessons';
import { managementConsultingLessons } from '@/data/management-consulting-lessons';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLessonCompletions } from '@/hooks/useLessonCompletions';
import CareerProgressCard from './enhanced-career/CareerProgressCard';
import LessonCard from './enhanced-career/LessonCard';

interface EnhancedFinanceCareerJourneyProps {
  career: FinanceCareerData;
  onBack: () => void;
}

const EnhancedFinanceCareerJourney: React.FC<EnhancedFinanceCareerJourneyProps> = ({ career, onBack }) => {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const { profile } = useAuth();
  const isMobile = useIsMobile();
  const { 
    isLevelComplete, 
    isLevelAvailable, 
    getCompletedLevels, 
    getCurrentLevel,
    markLessonComplete 
  } = useLessonCompletions(career.id);

  const userLevel = profile?.app_version || 'beginner';
  const completedLevels = getCompletedLevels();
  const currentLevel = getCurrentLevel();

  const handleLessonComplete = async (levelNumber: number) => {
    await markLessonComplete(levelNumber);
    setCurrentLesson(null);
  };

  // If we're in a lesson, show the lesson component
  if (currentLesson !== null) {
    if (career.id === 'investment-banking') {
      const lesson = investmentBankingLessons.find(l => l.level === currentLesson);
      if (lesson) {
        return (
          <InteractiveIBLesson
            lesson={lesson}
            onBack={() => setCurrentLesson(null)}
            onComplete={() => handleLessonComplete(currentLesson)}
          />
        );
      }
    } else if (career.id === 'private-equity') {
      const lesson = privateEquityLessons.find(l => l.level === currentLesson);
      if (lesson) {
        return (
          <InteractivePELesson
            lesson={lesson}
            onBack={() => setCurrentLesson(null)}
            onComplete={() => handleLessonComplete(currentLesson)}
          />
        );
      }
    } else if (career.id === 'management-consulting') {
      const lesson = managementConsultingLessons.find(l => l.level === currentLesson);
      if (lesson) {
        return (
          <InteractiveConsultingLesson
            lesson={lesson}
            onBack={() => setCurrentLesson(null)}
            onComplete={() => handleLessonComplete(currentLesson)}
          />
        );
      }
    }
  }

  const getSpeakerIcon = (speaker: string) => {
    switch (speaker) {
      case 'intern': return <Play className="h-4 w-4" />;
      case 'professional': return <Star className="h-4 w-4" />;
      case 'professor': return <Trophy className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'intern': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'professional': return 'text-green-600 bg-green-50 border-green-200';
      case 'professor': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`animate-fade-in ${isMobile ? 'max-w-full' : 'max-w-6xl'} mx-auto`}>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Careers
      </Button>
      
      <header className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
        <div className="flex justify-center items-center gap-4 mb-4">
          <PandaLogo className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`} />
          <div>
            <h2 className={`${isMobile ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-bold tracking-tight text-foreground`}>
              {career.name} Mastery
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-muted-foreground`}>
              Interactive lessons adapted for {userLevel} level
            </p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <TabsTrigger value="journey" className={isMobile ? 'text-sm' : ''}>
            {isMobile ? 'Interactive Journey' : 'Interactive Learning Journey'}
          </TabsTrigger>
          <TabsTrigger value="videos" className={isMobile ? 'text-sm' : ''}>
            {isMobile ? 'Videos' : 'Career Videos'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="journey" className="space-y-6">
          <CareerProgressCard
            completedLevels={completedLevels.length}
            currentLevel={currentLevel}
            userLevel={userLevel}
          />

          <div className="relative">
            <div className={`absolute ${isMobile ? 'left-8' : 'left-1/2 transform -translate-x-1/2'} w-1 bg-muted h-full`}></div>
            
            <div className="space-y-6">
              {(career.id === 'investment-banking' ? investmentBankingLessons : 
                career.id === 'private-equity' ? privateEquityLessons : 
                career.id === 'management-consulting' ? managementConsultingLessons :
                investmentBankingLessons).map((lesson, index) => {
                const isCompleted = isLevelComplete(lesson.level);
                const isCurrent = lesson.level === currentLevel;
                const isLocked = !isLevelAvailable(lesson.level);
                
                return (
                  <LessonCard
                    key={lesson.level}
                    lesson={lesson}
                    index={index}
                    isCompleted={isCompleted}
                    isCurrent={isCurrent}
                    isLocked={isLocked}
                    onLessonSelect={setCurrentLesson}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Phil's encouragement */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex items-center gap-4">
                <PandaLogo className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`} />
                <div>
                  <h3 className={`font-semibold text-green-800 ${isMobile ? 'text-sm' : ''}`}>Phil's Tip</h3>
                  <p className={`text-green-700 ${isMobile ? 'text-xs' : ''}`}>
                    {currentLevel === 1 ? 
                      `Welcome to interactive ${career.name} learning! Each lesson is customized for your ${userLevel} level with games, quizzes, and real-world examples.` :
                     currentLevel <= 3 ? 
                      "Great progress! These interactive lessons will help you master each concept step by step." :
                     currentLevel <= 5 ? 
                      "You're in the advanced territory now. The real-world examples will show you how professionals think!" :
                     "Almost there! You're learning the skills that senior investment bankers use every day!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 md:gap-6`}>
            {career.videos.map((video) => (
              <Card key={video.id} className={`transition-all hover:shadow-lg cursor-pointer ${getSpeakerColor(video.speaker)}`}>
                <CardHeader className={isMobile ? 'pb-3' : ''}>
                  <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                    {getSpeakerIcon(video.speaker)}
                    {video.speaker.charAt(0).toUpperCase() + video.speaker.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className={isMobile ? 'pt-0' : ''}>
                  <div className={`aspect-video bg-gray-200 rounded-lg ${isMobile ? 'mb-3' : 'mb-4'} flex items-center justify-center`}>
                    <Play className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-500`} />
                  </div>
                  <h4 className={`font-semibold ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>{video.title}</h4>
                  <p className={`text-muted-foreground ${isMobile ? 'mb-1 text-xs' : 'mb-2 text-sm'}`}>{video.description}</p>
                  <span className={`font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}>Duration: {video.duration}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedFinanceCareerJourney;
