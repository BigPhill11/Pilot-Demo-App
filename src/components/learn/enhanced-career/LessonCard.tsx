
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import PandaLogo from '@/components/icons/PandaLogo';
import { useIsMobile } from '@/hooks/use-mobile';

interface LessonCardProps {
  lesson: InteractiveLessonContent;
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onLessonSelect: (level: number) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  index,
  isCompleted,
  isCurrent,
  isLocked,
  onLessonSelect
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex items-center ${isMobile ? 'flex-row' : (index % 2 === 0 ? 'flex-row' : 'flex-row-reverse')}`}>
      {/* Level node */}
      <div className={`flex-shrink-0 ${isMobile ? 'w-16' : 'w-1/2'} flex ${isMobile ? 'justify-start' : 'justify-center'}`}>
        <div className={`relative z-10 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full flex items-center justify-center border-4 transition-all ${
          isCompleted ? 'bg-green-500 border-green-500 text-white' :
          isCurrent ? 'bg-primary border-primary text-white animate-pulse' :
          'bg-muted border-muted-foreground text-muted-foreground'
        }`}>
          {isCompleted ? (
            <CheckCircle className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
          ) : isLocked ? (
            <Lock className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
          ) : (
            <span className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>{lesson.level}</span>
          )}
        </div>
      </div>
      
      {/* Lesson content */}
      <div className={`flex-1 ${isMobile ? 'px-4' : 'px-6'}`}>
        <Card className={`transition-all cursor-pointer hover:shadow-lg ${
          isCurrent ? 'border-primary border-2 shadow-lg' :
          isCompleted ? 'border-green-200 bg-green-50' :
          isLocked ? 'opacity-60' : 'hover:border-primary'
        }`} onClick={() => !isLocked && onLessonSelect(lesson.level)}>
          <CardHeader className={isMobile ? 'pb-3' : ''}>
            <div className="flex items-center justify-between">
              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-2`}>
                Level {lesson.level}: {lesson.title}
                <PandaLogo className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
              </CardTitle>
              {isCompleted && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {lesson.description}
            </p>
          </CardHeader>
          <CardContent className={isMobile ? 'pt-0' : ''}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  Theme: {lesson.theme}
                </span>
                <span className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {lesson.objectives.length} objectives
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-blue-50 p-2 rounded border border-blue-200">
                  <div className="font-semibold text-blue-700">{lesson.miniGames.length}</div>
                  <div className="text-blue-600">Games</div>
                </div>
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <div className="font-semibold text-green-700">{lesson.realWorldExamples.length}</div>
                  <div className="text-green-600">Examples</div>
                </div>
                <div className="bg-purple-50 p-2 rounded border border-purple-200">
                  <div className="font-semibold text-purple-700">1</div>
                  <div className="text-purple-600">Quiz</div>
                </div>
              </div>
              
              <Button 
                className={`w-full ${isMobile ? 'text-sm' : ''}`}
                size={isMobile ? 'sm' : 'default'}
                disabled={isLocked}
                variant={isCurrent ? "default" : isCompleted ? "outline" : "ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  !isLocked && onLessonSelect(lesson.level);
                }}
              >
                {isCompleted ? "Review Lesson ✓" : 
                 isCurrent ? "Start Interactive Lesson" : 
                 "Locked"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonCard;
