import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { CareerModule } from '@/data/career-readiness/modules';

interface CareerModuleCardProps {
  module: CareerModule;
  progress: number;
  index: number;
  onStart: (module: CareerModule) => void;
}

const CareerModuleCard: React.FC<CareerModuleCardProps> = ({
  module,
  progress,
  index,
  onStart,
}) => {
  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="rounded-2xl border-emerald-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-3 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 shadow-inner">
              <Icon className="h-7 w-7 text-emerald-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground">{module.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{module.description}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-emerald-100" />
              </div>

              <Button
                className="w-full mt-4 bg-emerald-800 hover:bg-emerald-900"
                onClick={() => onStart(module)}
              >
                Start Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CareerModuleCard;
