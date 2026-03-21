
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, PlayCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JourneyLevel } from '@/data/industry-journeys';

export type JourneyNodeStatus = 'locked' | 'active' | 'completed';

interface IndustryJourneyNodeProps {
  levelData: JourneyLevel;
  status: JourneyNodeStatus;
  side: 'left' | 'right';
}

const statusConfig = {
  locked: {
    Icon: Lock,
    iconColor: 'text-muted-foreground',
    cardClasses: 'bg-muted/50 border-dashed cursor-not-allowed',
    textColor: 'text-muted-foreground',
    buttonText: 'Locked',
  },
  active: {
    Icon: PlayCircle,
    iconColor: 'text-primary',
    cardClasses: 'border-primary border-2 shadow-lg scale-105',
    textColor: 'text-foreground',
    buttonText: 'Start Lesson',
  },
  completed: {
    Icon: CheckCircle,
    iconColor: 'text-green-500',
    cardClasses: 'bg-green-500/10 border-green-500/50',
    textColor: 'text-foreground',
    buttonText: 'Review',
  },
};

const IndustryJourneyNode: React.FC<IndustryJourneyNodeProps> = ({ levelData, status, side }) => {
  const config = statusConfig[status];

  return (
    <div className={cn('w-full flex', side === 'left' ? 'justify-start' : 'justify-end')}>
      <div className="w-full md:w-5/12">
        <Card className={cn('relative transition-all', config.cardClasses)}>
          <div className="absolute top-3 right-3">
            <config.Icon className={cn('h-6 w-6', config.iconColor)} />
          </div>
          <CardHeader>
            <CardTitle className={cn('text-xl', config.textColor)}>
              Level {levelData.level || levelData.id}: {levelData.focusArea || levelData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {(levelData.sampleTopics || levelData.keyTakeaways || []).map(topic => 
                <li key={topic}>{topic}</li>
              )}
            </ul>
            <Button variant={status === 'active' ? 'default' : 'secondary'} disabled={status === 'locked'} className="w-full mt-4">
              {config.buttonText}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustryJourneyNode;
