import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, ChevronRight, Play } from 'lucide-react';
import { ModuleCardData } from '@/data/market-intelligence/catalog';
import { getOwnershipLesson } from '@/data/market-intelligence/ownership-lessons';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface OwnershipModuleCardProps {
  module: ModuleCardData;
  progress: { completed: boolean };
  onStartLesson: (moduleId: string) => void;
}

const OwnershipModuleCard: React.FC<OwnershipModuleCardProps> = ({
  module,
  progress,
  onStartLesson,
}) => {
  const lesson = getOwnershipLesson(module.id);
  const hasLesson = !!lesson;

  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-[1.01] bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300 ${
        progress.completed ? 'ring-2 ring-emerald-500/50' : ''
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
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm line-clamp-2 text-green-700/80">{module.description}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200">
                <Clock className="h-3 w-3 mr-1" />
                {lesson?.estimatedMinutes ?? module.estimatedMinutes} min lesson
              </Badge>
              {hasLesson && (
                <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                  Interactive
                </Badge>
              )}
              {module.rewards && (
                <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                  +{module.rewards.bamboo} <ThemedEmoji emoji="🎋" className="h-[1em] w-[1em]" />
                </Badge>
              )}
            </div>
          </div>
          {progress.completed ? (
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 border-emerald-300 text-green-800"
              onClick={(e) => {
                e.stopPropagation();
                onStartLesson(module.id);
              }}
            >
              Review
            </Button>
          ) : (
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-emerald-400" />
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

export default OwnershipModuleCard;
