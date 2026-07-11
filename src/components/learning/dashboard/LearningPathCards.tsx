import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardPath } from '@/hooks/useDashboardProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface LearningPathCardsProps {
  paths: DashboardPath[];
  loading: boolean;
  onPathClick: (targetTab: string) => void;
}

const pathStyles = [
  'border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-primary/5 to-transparent hover:border-emerald-500/50',
  'border-primary/25 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-amber-500/5 hover:border-primary/40',
  'border-amber-400/25 bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent hover:border-amber-400/40',
];

const progressColors = ['bg-emerald-500', 'bg-primary', 'bg-amber-500'];

const LearningPathCards: React.FC<LearningPathCardsProps> = ({ paths, loading, onPathClick }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
        <Lightbulb className="h-5 w-5 text-primary" />
        Your Learning Paths
      </h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse border-primary/10 rounded-xl">
                <CardHeader className="pb-3">
                  <div className="h-8 w-8 bg-muted rounded-lg mb-2" />
                  <div className="h-5 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-muted rounded mb-4" />
                </CardContent>
              </Card>
            ))
          : paths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
              >
                <Card
                  className={cn(
                    'cursor-pointer transition-all duration-300 rounded-xl border-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]',
                    pathStyles[index % pathStyles.length]
                  )}
                  onClick={() => onPathClick(path.targetTab)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl drop-shadow-sm"><ThemedEmoji emoji={path.icon} className="h-[1em] w-[1em]" /></span>
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {path.lessonsCompleted}/{path.totalLessons}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-primary">{path.progressPct}%</span>
                      </div>
                      <div className="h-2 bg-muted/60 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full transition-all duration-500 rounded-full', progressColors[index % 3])}
                          style={{ width: `${path.progressPct}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{path.estimatedTime}</span>
                      </div>
                      <Button
                        size="sm"
                        className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPathClick(path.targetTab);
                        }}
                      >
                        {path.progressPct === 0 ? 'Start' : 'Continue'}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                    {path.progressPct > 0 && path.progressPct < 100 && (
                      <p className="text-xs text-primary/80 italic line-clamp-1">
                        Next: {path.nextActionLabel}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default LearningPathCards;
