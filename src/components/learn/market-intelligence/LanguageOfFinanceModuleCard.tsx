import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, ChevronRight, Play } from 'lucide-react';
import { ModuleCardData } from '@/data/market-intelligence/catalog';
import { getLanguageOfFinanceLesson } from '@/data/market-intelligence/language-of-finance-lessons';

interface LanguageOfFinanceModuleCardProps {
  module: ModuleCardData;
  progress: { completed: boolean };
  onStartLesson: (moduleId: string) => void;
}

const LanguageOfFinanceModuleCard: React.FC<LanguageOfFinanceModuleCardProps> = ({
  module,
  progress,
  onStartLesson,
}) => {
  const lesson = getLanguageOfFinanceLesson(module.id);
  const hasLesson = !!lesson;

  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-[1.01] bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:border-green-300 ${
        progress.completed ? 'ring-2 ring-green-500/50' : ''
      }`}
      onClick={() => hasLesson && onStartLesson(module.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5">{module.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate text-green-800">{module.title}</h3>
              {progress.completed && (
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm line-clamp-2 text-green-700/80">{module.description}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className="text-xs bg-teal-100 text-teal-700 border-teal-200">
                <Clock className="h-3 w-3 mr-1" />
                {lesson?.estimatedMinutes ?? module.estimatedMinutes} min lesson
              </Badge>
              {hasLesson && (
                <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200">
                  Interactive
                </Badge>
              )}
            </div>
          </div>
          {progress.completed ? (
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 border-green-300 text-green-800"
              onClick={(e) => {
                e.stopPropagation();
                onStartLesson(module.id);
              }}
            >
              Review
            </Button>
          ) : (
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-green-400" />
          )}
        </div>
        {!progress.completed && hasLesson && (
          <Button
            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStartLesson(module.id);
            }}
          >
            <Play className="h-4 w-4 mr-1" />
            Start Lesson
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageOfFinanceModuleCard;
