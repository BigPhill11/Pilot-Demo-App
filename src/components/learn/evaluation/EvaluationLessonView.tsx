import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Target, CheckCircle, Lock } from 'lucide-react';
import { EvaluationLesson } from '@/data/evaluation-lessons';
import { useEvaluationProgress } from '@/hooks/useEvaluationProgress';
import EvaluationModule from './EvaluationModule';
import ProgressTracker from '../interactive-ib/ProgressTracker';

interface EvaluationLessonViewProps {
  lesson: EvaluationLesson;
  onBack: () => void;
}

const EvaluationLessonView: React.FC<EvaluationLessonViewProps> = ({ lesson, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { getLessonProgress, isModuleUnlocked, getModuleProgress, refreshProgress } = useEvaluationProgress();
  
  const progress = getLessonProgress(lesson.lessonNumber, lesson.modules.length);
  const progressPercentage = lesson.modules.length > 0 
    ? (progress.modulesCompleted / progress.totalModules) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lessons
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Lesson {lesson.lessonNumber}
            </div>
            {progress.badgeEarned && (
              <span className="text-2xl">{lesson.badge.emoji}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-muted-foreground text-sm">{lesson.subtitle} • {lesson.estimatedTime}</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker progress={progressPercentage} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          {lesson.modules.map((module, index) => {
            const isUnlocked = isModuleUnlocked(lesson.lessonNumber, module.moduleNumber);
            const moduleCompletion = getModuleProgress(lesson.lessonNumber, module.moduleNumber);
            const isCompleted = moduleCompletion?.completed || false;

            return (
              <TabsTrigger 
                key={module.id} 
                value={module.id}
                disabled={!isUnlocked}
                className="relative"
              >
                {!isUnlocked && <Lock className="h-3 w-3 mr-1" />}
                {isCompleted && <CheckCircle className="h-3 w-3 mr-1 text-green-500" />}
                Module {module.moduleNumber}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                About This Lesson
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{lesson.description}</p>

              <div className="space-y-2">
                <h3 className="font-semibold">What You'll Learn:</h3>
                <div className="grid gap-3">
                  {lesson.modules.map((module, index) => (
                    <div key={module.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">{module.title}</div>
                        <div className="text-sm text-muted-foreground">{module.description}</div>
                        <div className="text-xs text-muted-foreground">⏱️ {module.estimatedTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {lesson.badge.emoji} {lesson.badge.name}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {lesson.badge.description}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  Complete all modules to earn this badge!
                </p>
              </div>

              {lesson.modules.length > 0 && (
                <Button 
                  onClick={() => setActiveTab(lesson.modules[0].id)}
                  className="w-full"
                >
                  {progress.modulesCompleted > 0 ? 'Continue Learning' : 'Start First Module'}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Module Tabs */}
        {lesson.modules.map((module) => (
          <TabsContent key={module.id} value={module.id}>
            <EvaluationModule 
              module={module} 
              lessonNumber={lesson.lessonNumber}
              onComplete={async () => {
                // Refresh progress to get latest completion state
                await refreshProgress();
                
                // Find next module
                const currentIndex = lesson.modules.findIndex(m => m.id === module.id);
                if (currentIndex < lesson.modules.length - 1) {
                  // Navigate to next module
                  setActiveTab(lesson.modules[currentIndex + 1].id);
                } else {
                  // All modules completed, go back to overview
                  setActiveTab('overview');
                }
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EvaluationLessonView;
