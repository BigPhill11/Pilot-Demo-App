import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, TrendingUp, Target, Check } from 'lucide-react';
import { evaluationLessons } from '@/data/evaluation-lessons';
import { useEvaluationProgress } from '@/hooks/useEvaluationProgress';
import EvaluationLessonView from './EvaluationLessonView';
import PhilsEvaluationTip from './PhilsEvaluationTip';

const CompanyEvaluationLessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const { getLessonProgress, isLessonUnlocked, getTotalProgress, loading } = useEvaluationProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (selectedLesson !== null) {
    const lesson = evaluationLessons[selectedLesson - 1];
    return (
      <EvaluationLessonView
        lesson={lesson}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  const totalProgress = getTotalProgress();
  const getIcon = (lessonNumber: number) => {
    if (lessonNumber === 1) return TrendingUp;
    if (lessonNumber === 2) return TrendingUp;
    return Target;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Learn to Evaluate Companies</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master the fundamentals of company evaluation through 3 comprehensive lessons. 
          Complete all lessons to unlock the Company Discovery feature!
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {totalProgress.completed} of {totalProgress.total} modules complete
              </span>
            </div>
            <Progress value={totalProgress.percentage} className="h-3" />
            <p className="text-xs text-muted-foreground text-center mt-2">
              {totalProgress.percentage === 100 
                ? '🎉 All lessons completed! You can now access Company Discovery.' 
                : `${100 - totalProgress.percentage}% remaining to unlock Company Discovery`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Phil's Tip */}
      <PhilsEvaluationTip
        message="Take your time with each lesson! Understanding these concepts will help you make smarter investment decisions. I'll be here to guide you every step of the way."
      />

      {/* Lesson Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {evaluationLessons.map((lesson) => {
          const progress = getLessonProgress(lesson.lessonNumber, lesson.modules.length);
          const isUnlocked = isLessonUnlocked(lesson.lessonNumber);
          const IconComponent = getIcon(lesson.lessonNumber);

          return (
            <Card 
              key={lesson.id} 
              className={`relative overflow-hidden transition-all ${
                !isUnlocked ? 'opacity-60' : 'hover:shadow-lg'
              }`}
            >
              {/* Badge Corner */}
              {progress.badgeEarned && (
                <div className="absolute top-2 right-2 text-3xl">
                  {lesson.badge.emoji}
                </div>
              )}

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    isUnlocked ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isUnlocked ? <IconComponent className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      Lesson {lesson.lessonNumber}
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {lesson.subtitle} • {lesson.estimatedTime}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{lesson.description}</p>

                {/* Module Progress */}
                {lesson.modules.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Modules</span>
                      <span className="font-medium">
                        {progress.modulesCompleted}/{progress.totalModules}
                      </span>
                    </div>
                    <Progress 
                      value={progress.totalModules > 0 ? (progress.modulesCompleted / progress.totalModules) * 100 : 0} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Badge Info */}
                {lesson.modules.length > 0 && (
                  <div className={`text-xs p-2 rounded-lg ${
                    progress.badgeEarned 
                      ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <div className="flex items-center gap-2">
                      {progress.badgeEarned ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span>{lesson.badge.emoji}</span>
                      )}
                      <span className="font-medium">
                        {progress.badgeEarned ? 'Badge Earned!' : `Earn: ${lesson.badge.name}`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={() => setSelectedLesson(lesson.lessonNumber)}
                  disabled={!isUnlocked || lesson.modules.length === 0}
                  className="w-full"
                  variant={progress.completed ? 'outline' : 'default'}
                >
                  {!isUnlocked && <Lock className="h-4 w-4 mr-2" />}
                  {lesson.modules.length === 0 
                    ? 'Coming Soon'
                    : progress.completed 
                      ? 'Review Lesson'
                      : progress.modulesCompleted > 0
                        ? 'Continue'
                        : 'Start Lesson'
                  }
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Unlock Message */}
      {totalProgress.percentage < 100 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                🎯 Complete All Lessons to Unlock Company Discovery!
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Once you've mastered all 3 lessons, you'll be able to swipe through companies 
                with advanced metrics and make informed investment decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyEvaluationLessons;
