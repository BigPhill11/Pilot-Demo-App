import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, ChevronRight, Lock, BookOpen, Sparkles, Trophy, Briefcase } from 'lucide-react';
import { EconomicsUnit, UnitStatus, UnitProgress } from '@/types/economics-curriculum';
import { getSimulatorByUnitId } from '@/data/economics-simulators';

interface EconomicsUnitCardProps {
  unit: EconomicsUnit;
  status: UnitStatus;
  progress?: UnitProgress;
  onStartUnit: () => void;
  onSelectLesson: (lessonId: string) => void;
  /** Opens full unit simulator overlay when configured for this unit */
  onOpenSimulator?: () => void;
}

const EconomicsUnitCard: React.FC<EconomicsUnitCardProps> = ({
  unit,
  status,
  progress,
  onStartUnit,
  onSelectLesson,
  onOpenSimulator,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const unitSim = getSimulatorByUnitId(unit.id);

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  
  const completedLessons = progress?.completedLessons.length ?? 0;
  const totalLessons = unit.lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <Badge className="bg-green-100 text-green-700 border border-green-300">
          <Check className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }
    if (isActive) {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">
          <BookOpen className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    }
    if (isLocked) {
      return (
        <Badge variant="outline" className="text-gray-500 border-gray-300">
          <Lock className="h-3 w-3 mr-1" />
          Locked
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-green-600 border-green-300">
        Ready
      </Badge>
    );
  };

  const handleCardClick = () => {
    if (!isLocked) {
      setShowDialog(true);
    }
  };

  return (
    <>
      <Card 
        className={`transition-all ${
          isLocked 
            ? 'opacity-60 cursor-not-allowed bg-gray-50 border-gray-200' 
            : 'cursor-pointer hover:scale-[1.02] bg-white border-green-200 hover:border-green-300'
        } ${isCompleted ? 'ring-2 ring-green-500/50' : ''}`}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`text-2xl mt-0.5 ${isLocked ? 'grayscale' : ''}`}>
              {unit.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold truncate ${isLocked ? 'text-gray-500' : 'text-green-800'}`}>
                  {unit.title}
                </h3>
                {getStatusBadge()}
              </div>
              <p className={`text-sm line-clamp-2 ${isLocked ? 'text-gray-400' : 'text-green-700/80'}`}>
                {unit.description}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={`text-xs ${isLocked ? 'text-gray-400 border-gray-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  <BookOpen className="h-3 w-3 mr-1" />
                  {totalLessons} lessons
                </Badge>
                <Badge variant="outline" className={`text-xs ${isLocked ? 'text-gray-400 border-gray-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  +{unit.rewards.xp} XP
                </Badge>
              </div>

              {(isActive || isCompleted) && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-green-600">{completedLessons}/{totalLessons} lessons</span>
                    <span className="text-green-600">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-1.5" />
                </div>
              )}
            </div>

            {!isLocked && (
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-green-400" />
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{unit.icon}</span>
              <div>
                <DialogTitle className="text-xl text-green-800">{unit.title}</DialogTitle>
                <p className="text-sm text-green-600 capitalize">{unit.track}</p>
              </div>
            </div>
            <DialogDescription className="text-base">
              {unit.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-xs text-green-600 font-medium mb-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Core Concepts
              </p>
              <div className="flex flex-wrap gap-1.5">
                {unit.coreEconomicsConcepts.map((concept, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-white text-green-700 border-green-300">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <p className="text-xs text-emerald-600 font-medium mb-2">Personal Finance Connection</p>
              <p className="text-sm text-emerald-700">{unit.personalFinanceConnection.description}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-green-800 mb-2 flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Lessons ({completedLessons}/{totalLessons})
              </p>
              <div className="space-y-2">
                {unit.lessons.map((lesson, index) => {
                  const isLessonCompleted = progress?.completedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] ${
                        isLessonCompleted 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-white border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => onSelectLesson(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-400 w-5">
                            {index + 1}.
                          </span>
                          <span className={`text-sm ${isLessonCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {lesson.estimatedMinutes}m
                          </span>
                          {isLessonCompleted && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {unit.careerExposure.length > 0 && (
              <div className="p-3 rounded-lg bg-teal-50 border border-teal-200">
                <p className="text-xs text-teal-600 font-medium mb-2 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  Career Spotlight
                </p>
                <div className="space-y-2">
                  {unit.careerExposure.slice(0, 2).map((career, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium text-teal-700">{career.title}</span>
                      <span className="text-teal-600"> • {career.salaryRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <span className="text-sm text-green-700 flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Unit Rewards
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-green-800">
                  +{unit.rewards.bamboo} 🎋
                </span>
                <span className="text-sm font-medium text-green-800">
                  +{unit.rewards.xp} XP
                </span>
              </div>
            </div>

            {unitSim && onOpenSimulator && !isLocked && (
              <Button
                type="button"
                variant="outline"
                className="w-full border-emerald-500 text-emerald-800 hover:bg-emerald-50"
                onClick={() => {
                  onOpenSimulator();
                  setShowDialog(false);
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {unitSim.title}
              </Button>
            )}

            {!isActive && !isCompleted && (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  onStartUnit();
                  setShowDialog(false);
                }}
              >
                Start Unit
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {isCompleted && (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-100 border border-green-300">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">Unit Completed!</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EconomicsUnitCard;
