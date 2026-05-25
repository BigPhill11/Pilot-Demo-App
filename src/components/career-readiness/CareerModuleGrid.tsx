import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CAREER_MODULES } from '@/data/career-readiness/modules';
import type { CareerModule } from '@/data/career-readiness/modules';
import CareerModuleCard from './CareerModuleCard';

interface CareerModuleGridProps {
  getModuleProgress: (moduleId: string) => number;
  onStartModule: (module: CareerModule) => void;
  onViewProgress: () => void;
}

const CareerModuleGrid: React.FC<CareerModuleGridProps> = ({
  getModuleProgress,
  onStartModule,
  onViewProgress,
}) => {
  return (
    <section>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-foreground">Career Readiness Modules</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-emerald-700 hover:text-emerald-800 shrink-0"
          onClick={onViewProgress}
        >
          View Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CAREER_MODULES.map((module, index) => (
          <CareerModuleCard
            key={module.id}
            module={module}
            progress={getModuleProgress(module.id)}
            index={index}
            onStart={onStartModule}
          />
        ))}
      </div>
    </section>
  );
};

export default CareerModuleGrid;
