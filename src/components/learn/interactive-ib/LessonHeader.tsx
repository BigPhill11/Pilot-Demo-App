
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';

interface LessonHeaderProps {
  lesson: InteractiveLessonContent;
  onBack: () => void;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ lesson, onBack }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Target className="h-8 w-8 text-primary" />
            <span>Level {lesson.level}: {lesson.title}</span>
          </h1>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>
      </div>
      <Badge variant="outline" className="text-lg px-4 py-2">
        {lesson.theme}
      </Badge>
    </div>
  );
};

export default LessonHeader;
