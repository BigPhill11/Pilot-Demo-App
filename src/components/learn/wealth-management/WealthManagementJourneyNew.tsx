/**
 * Wealth Management Journey (New)
 * 
 * Module-based journey with progressive unlock:
 * - Module 1: Overview + Comic
 * - Modules 2-6: Year Simulation + Flashcards + Quiz
 * - Module 7: Final Scenarios + Endings
 * 
 * Shows a module selection grid and tracks progress across modules.
 */

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  Play,
  Calendar,
  BookOpen,
  Target,
  Trophy
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import WealthManagementModuleLevel from './WealthManagementModuleLevel';
import WMSimMeters from './WMSimMeters';
import { wealthManagementJourneyData, WealthLevel } from '@/data/wealth-management-journey-data';
import { useWealthManagementSim } from '@/hooks/useWealthManagementSim';

interface WealthManagementJourneyNewProps {
  onBack: () => void;
}

const WealthManagementJourneyNew: React.FC<WealthManagementJourneyNewProps> = ({
  onBack,
}) => {
  const {
    meters,
    isModuleUnlocked,
    isModuleCompleted,
    completeModule,
    moduleProgress,
    resetSimulation,
    resetModuleProgress,
  } = useWealthManagementSim();

  const [selectedModule, setSelectedModule] = useState<WealthLevel | null>(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);

  // Sort modules by their display order (1, 2, 4, 5, 6, 7, 3)
  // The data has IDs: 1, 2, 4, 5, 6, 7, 3 which maps to modules 1-7
  const sortedModules = useMemo(() => {
    const moduleOrder = [1, 2, 4, 5, 6, 7, 3]; // IDs in display order
    return moduleOrder.map(id => 
      wealthManagementJourneyData.find(m => m.id === id)!
    );
  }, []);

  const completedCount = moduleProgress.completedModules.length;
  const totalModules = sortedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const handleModuleSelect = (module: WealthLevel, index: number) => {
    const moduleId = index + 1; // Module IDs are 1-based
    const unlocked = isModuleUnlocked(moduleId);
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementJourneyNew.tsx:handleModuleSelect',message:'Module selected',data:{moduleId:moduleId,dataId:module.id,title:module.title,unlocked:unlocked,completedModules:moduleProgress.completedModules},hypothesisId:'H1,H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (unlocked) {
      setSelectedModule(module);
      setSelectedModuleIndex(index);
    }
  };

  const handleModuleComplete = () => {
    const moduleId = selectedModuleIndex + 1;
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementJourneyNew.tsx:handleModuleComplete',message:'Completing module',data:{moduleId:moduleId,selectedModuleIndex:selectedModuleIndex,completedModulesBefore:moduleProgress.completedModules},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    completeModule(moduleId);
    setSelectedModule(null);
  };

  const handleModuleBack = () => {
    setSelectedModule(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    // Quiz completion tracking
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetSimulation();
      resetModuleProgress();
    }
  };

  const getModuleIcon = (module: WealthLevel, index: number) => {
    if (module.hasOverview) return <Play className="h-5 w-5" />;
    if (module.simulationYear) return <Calendar className="h-5 w-5" />;
    if (module.hasFinalScenarios) return <Trophy className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getModuleTypeLabel = (module: WealthLevel) => {
    if (module.hasOverview) return 'Introduction';
    if (module.simulationYear) return `Year ${module.simulationYear}`;
    if (module.hasFinalScenarios) return 'Final Challenge';
    return 'Module';
  };

  const getModuleDescription = (module: WealthLevel) => {
    if (module.hasOverview) return 'Learn about wealth management and meet Phil';
    if (module.simulationYear === 1) return 'Start your career as a Junior Advisor';
    if (module.simulationYear === 2) return 'Grow your skills and client base';
    if (module.simulationYear === 3) return 'Advance to Associate Advisor';
    if (module.simulationYear === 4) return 'Become a Senior Advisor';
    if (module.simulationYear === 5) return 'Reach for Managing Director';
    if (module.hasFinalScenarios) return 'Face final challenges and see your ending';
    return module.overview.slice(0, 80) + '...';
  };

  // If a module is selected, render the module level
  if (selectedModule) {
    return (
      <WealthManagementModuleLevel
        level={selectedModule}
        moduleIndex={selectedModuleIndex}
        onComplete={handleModuleComplete}
        onBack={handleModuleBack}
        onQuizComplete={handleQuizComplete}
        isCompleted={isModuleCompleted(selectedModuleIndex + 1)}
      />
    );
  }

  // Render module selection grid
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-4 w-2 h-48 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-20 left-8 w-1.5 h-36 bg-gradient-to-b from-green-200/15 to-green-400/10 rounded-full" />
        <div className="absolute top-0 right-4 w-2 h-44 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-24 right-10 w-1.5 h-32 bg-gradient-to-b from-green-200/15 to-green-400/10 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-green-700 hover:text-green-800 hover:bg-green-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetProgress}
            className="text-green-600/60 hover:text-green-700 text-xs"
          >
            Reset Progress
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <PandaLogo className="h-16 w-16" />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                <Target className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
            Wealth Management Journey
          </h1>
          
          <p className="text-green-600/80 max-w-xl mx-auto">
            Progress through 7 modules to experience a complete wealth management career
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="border-green-200 bg-white/80 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Journey Progress</span>
              <span className="text-sm text-green-600">{completedCount}/{totalModules} modules</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-green-100" />
            
            {/* Career Stats Preview (if simulation started) */}
            {completedCount > 0 && (
              <div className="mt-4 pt-4 border-t border-green-100">
                <h3 className="text-xs font-medium text-green-700 mb-2">Career Stats</h3>
                <WMSimMeters meters={meters} compact showSalary={true} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Module Grid */}
        <div className="space-y-3">
          {sortedModules.map((module, index) => {
            const moduleId = index + 1;
            const isUnlocked = isModuleUnlocked(moduleId);
            const isComplete = isModuleCompleted(moduleId);
            
            return (
              <Card
                key={module.id}
                className={`
                  border-green-200 transition-all cursor-pointer
                  ${isUnlocked 
                    ? 'bg-white hover:shadow-md hover:border-emerald-300' 
                    : 'bg-gray-50 opacity-60 cursor-not-allowed'
                  }
                  ${isComplete ? 'border-emerald-300 bg-emerald-50/50' : ''}
                `}
                onClick={() => handleModuleSelect(module, index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Module Number/Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${isComplete 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : isUnlocked 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-400'
                      }
                    `}>
                      {isComplete ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : isUnlocked ? (
                        getModuleIcon(module, index)
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </div>

                    {/* Module Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline" 
                          className={`
                            text-xs
                            ${isComplete 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                              : 'bg-green-50 border-green-200 text-green-700'
                            }
                          `}
                        >
                          {getModuleTypeLabel(module)}
                        </Badge>
                        {isComplete && (
                          <span className="text-xs text-emerald-600">Complete</span>
                        )}
                      </div>
                      
                      <h3 className={`font-semibold ${isUnlocked ? 'text-green-800' : 'text-gray-500'}`}>
                        Module {moduleId}: {module.title}
                      </h3>
                      
                      <p className={`text-sm mt-1 ${isUnlocked ? 'text-green-600/70' : 'text-gray-400'}`}>
                        {getModuleDescription(module)}
                      </p>
                    </div>

                    {/* Action Indicator */}
                    {isUnlocked && !isComplete && (
                      <div className="flex-shrink-0">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Start
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Phil's Encouragement */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <PandaLogo className="h-10 w-10 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
                <p className="text-sm text-green-600/80 italic">
                  {completedCount === 0 
                    ? "Welcome to your wealth management journey! Start with Module 1 to learn the basics and meet me in the comic story."
                    : completedCount < totalModules 
                      ? `Great progress! You've completed ${completedCount} modules. Keep going to see how your career unfolds!`
                      : "Amazing! You've completed the entire journey! Try replaying to explore different career paths."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WealthManagementJourneyNew;
