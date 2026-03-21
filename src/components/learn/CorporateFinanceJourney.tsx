import React, { useState, useEffect } from 'react';
import { corporateFinanceLevels } from '@/data/corporate-finance-journey-data';
import CorporateFinanceJourneyHeader from './CorporateFinanceJourneyHeader';
import CorporateFinanceJourneyLevelCard from './CorporateFinanceJourneyLevelCard';
import CorporateFinanceLevel from './CorporateFinanceLevel';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface CorporateFinanceJourneyProps {
  onBack: () => void;
}

const CorporateFinanceJourney: React.FC<CorporateFinanceJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(false);
  const { updateQuizScore } = useProgressTracking();

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('corporateFinance-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(new Set(progress.completedLevels || []));
      setIsJourneyCompleted(progress.isCompleted || false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newCompletedLevels: Set<number>, completed: boolean) => {
    const progress = {
      completedLevels: Array.from(newCompletedLevels),
      isCompleted: completed
    };
    localStorage.setItem('corporateFinance-progress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    
    const allCompleted = newCompletedLevels.size === corporateFinanceLevels.length;
    
    setCompletedLevels(newCompletedLevels);
    setIsJourneyCompleted(allCompleted);
    saveProgress(newCompletedLevels, allCompleted);
    setSelectedLevel(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('corporate-finance', isCorrect);
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.has(levelId - 1);
  };

  const handleBackToJourney = () => {
    setSelectedLevel(null);
  };

  // If a specific level is selected, show that level
  if (selectedLevel) {
    const level = corporateFinanceLevels.find(l => l.id === selectedLevel);
    if (level) {
      return (
        <CorporateFinanceLevel
          level={level}
          onComplete={() => handleLevelComplete(selectedLevel)}
          onBack={handleBackToJourney}
          onQuizComplete={handleQuizComplete}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-orange-950/20 dark:via-yellow-950/20 dark:to-amber-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Finance Careers
          </Button>
        </div>

        <CorporateFinanceJourneyHeader
          completedLevels={completedLevels.size}
          totalLevels={corporateFinanceLevels.length}
        />

        <div className="grid gap-6 mt-8">
          {corporateFinanceLevels.map((level) => (
            <CorporateFinanceJourneyLevelCard
              key={level.id}
              level={level}
              isCompleted={completedLevels.has(level.id)}
              isUnlocked={isLevelUnlocked(level.id)}
              onLevelSelect={handleLevelSelect}
            />
          ))}

          {isJourneyCompleted && (
            <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 shadow-lg">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Trophy className="h-16 w-16 text-orange-500" />
                    <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-orange-700 dark:text-orange-300">
                  🎉 Corporate Finance Journey Complete! 🎉
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-orange-600 dark:text-orange-400 mb-6">
                  Congratulations! You've mastered the fundamentals of corporate finance. 
                  You now understand how companies make financial decisions, manage money, and create value for shareholders.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      ✅ Corporate Finance Basics
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      ✅ Financial Statements
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      ✅ Time Value of Money
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateFinanceJourney;