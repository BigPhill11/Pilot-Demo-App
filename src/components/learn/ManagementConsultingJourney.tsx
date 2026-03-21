import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManagementConsultingLevel from './ManagementConsultingLevel';
import ManagementConsultingJourneyHeader from './ManagementConsultingJourneyHeader';
import ManagementConsultingJourneyLevelCard from './ManagementConsultingJourneyLevelCard';
import { managementConsultingLevels } from '@/data/management-consulting-journey-data';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import CareerStoriesHub from './career-stories/CareerStoriesHub';
import { careerStories } from '@/data/career-stories';

interface ManagementConsultingJourneyProps {
  onBack: () => void;
}

const ManagementConsultingJourney: React.FC<ManagementConsultingJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { updateQuizScore } = useProgressTracking();

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('managementConsultingProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (completed: number[], isJourneyComplete: boolean) => {
    const progress = {
      completedLevels: completed,
      journeyCompleted: isJourneyComplete,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('managementConsultingProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const updatedCompleted = [...completedLevels];
    if (!updatedCompleted.includes(levelId)) {
      updatedCompleted.push(levelId);
      setCompletedLevels(updatedCompleted);
    }

    // Check if all levels are completed
    const allCompleted = managementConsultingLevels.every(level => 
      updatedCompleted.includes(level.id)
    );
    
    if (allCompleted && !journeyCompleted) {
      setJourneyCompleted(true);
      saveProgress(updatedCompleted, true);
      
      // Trigger celebration or completion event
      setTimeout(() => {
        const event = new CustomEvent('achievementUnlocked', {
          detail: { 
            type: 'journey_complete',
            title: 'Management Consulting Master!',
            description: 'You have completed the entire Management Consulting Journey!'
          }
        });
        window.dispatchEvent(event);
      }, 500);
    } else {
      saveProgress(updatedCompleted, journeyCompleted);
    }

    // Auto-advance to next level if available
    const currentIndex = managementConsultingLevels.findIndex(level => level.id === levelId);
    if (currentIndex < managementConsultingLevels.length - 1) {
      setTimeout(() => {
        setSelectedLevel(managementConsultingLevels[currentIndex + 1].id);
      }, 2000);
    } else {
      // Return to overview after completing final level
      setTimeout(() => {
        setSelectedLevel(null);
      }, 3000);
    }
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('management_consulting', isCorrect);
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true; // First level always unlocked
    return completedLevels.includes(levelId - 1); // Previous level must be completed
  };

  const handleLevelSelect = (levelId: number) => {
    if (isLevelUnlocked(levelId)) {
      setSelectedLevel(levelId);
    }
  };

  if (selectedLevel) {
    const level = managementConsultingLevels.find(l => l.id === selectedLevel);
    if (level) {
      return (
        <ManagementConsultingLevel
          level={level}
          isUnlocked={isLevelUnlocked(selectedLevel)}
          isCompleted={completedLevels.includes(selectedLevel)}
          onComplete={() => handleLevelComplete(selectedLevel)}
          onQuizComplete={handleQuizComplete}
          onBack={() => setSelectedLevel(null)}
        />
      );
    }
  }

  const consultingStories = careerStories.filter(story => story.careerType === 'management-consulting');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learning
        </Button>
      </div>

      <ManagementConsultingJourneyHeader 
        completedLevels={completedLevels}
        totalLevels={managementConsultingLevels.length}
        journeyCompleted={journeyCompleted}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementConsultingLevels.map((level) => (
          <ManagementConsultingJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.includes(level.id)}
            onSelect={() => handleLevelSelect(level.id)}
          />
        ))}
          </div>

          {journeyCompleted && (
            <div className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                🎉 Congratulations! Journey Complete! 🎉
              </h3>
              <p className="text-green-700">
                You've mastered all aspects of management consulting. You're ready to tackle real-world business challenges!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stories" className="mt-6">
          <CareerStoriesHub stories={consultingStories} careerName="Management Consulting" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagementConsultingJourney;