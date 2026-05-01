import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EconomicsUnit, EconomicsTrack, UnitProgress } from '@/types/economics-curriculum';
import EconomicsUnitCard from './EconomicsUnitCard';

interface EconomicsTrackSectionProps {
  track: EconomicsTrack;
  units: EconomicsUnit[];
  getUnitStatus: (unitId: string, track: EconomicsTrack, previousUnitId?: string) => 'locked' | 'unlocked' | 'active' | 'completed';
  getUnitProgress: (unitId: string, track: EconomicsTrack) => UnitProgress | undefined;
  onStartUnit: (unitId: string, track: EconomicsTrack) => void;
  onSelectLesson: (unitId: string, lessonId: string) => void;
  /** Optional unit-level simulator (e.g. Market Price Simulator) */
  onOpenSimulator?: (unitId: string, track: EconomicsTrack) => void;
}

const trackConfig: Record<EconomicsTrack, {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  badgeColor: string;
}> = {
  microeconomics: {
    title: 'Microeconomics',
    description: 'Individual choices, markets, and how businesses and consumers make decisions',
    icon: '🔬',
    gradient: 'from-green-50 via-emerald-50 to-teal-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    badgeColor: 'bg-green-100 text-green-700 border-green-200',
  },
  macroeconomics: {
    title: 'Macroeconomics',
    description: 'The big picture: national economies, GDP, inflation, and monetary policy',
    icon: '🌍',
    gradient: 'from-teal-50 via-cyan-50 to-emerald-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-800',
    badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
  },
};

const EconomicsTrackSection: React.FC<EconomicsTrackSectionProps> = ({
  track,
  units,
  getUnitStatus,
  getUnitProgress,
  onStartUnit,
  onSelectLesson,
  onOpenSimulator,
}) => {
  const config = trackConfig[track];
  const trackUnits = units.filter(u => u.track === track).sort((a, b) => a.order - b.order);
  
  const completedUnits = trackUnits.filter(unit => 
    getUnitStatus(unit.id, track, unit.unlockRequirements.previousUnitId) === 'completed'
  ).length;
  
  const progressPercent = trackUnits.length > 0 
    ? Math.round((completedUnits / trackUnits.length) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${config.gradient} ${config.borderColor} border shadow-sm`}>
        <div className={`flex items-center gap-2 px-4 py-2 bg-white/40 border-b ${config.borderColor}`}>
          <span className="text-xl">{config.icon}</span>
          <span className={`${config.textColor} font-semibold`}>{config.title}</span>
          <Badge variant="outline" className={`ml-auto text-xs ${config.badgeColor}`}>
            {completedUnits}/{trackUnits.length} units
          </Badge>
        </div>

        <div className="p-4">
          <p className={`text-sm ${config.textColor}/80 mb-3`}>
            {config.description}
          </p>
          
          <div className="flex items-center gap-3">
            <Progress value={progressPercent} className="flex-1 h-2" />
            <span className={`text-sm font-medium ${config.textColor}`}>
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trackUnits.map((unit) => {
          const status = getUnitStatus(unit.id, track, unit.unlockRequirements.previousUnitId);
          const progress = getUnitProgress(unit.id, track);
          
          return (
            <EconomicsUnitCard
              key={unit.id}
              unit={unit}
              status={status}
              progress={progress}
              onStartUnit={() => onStartUnit(unit.id, track)}
              onSelectLesson={(lessonId) => onSelectLesson(unit.id, lessonId)}
              onOpenSimulator={onOpenSimulator ? () => onOpenSimulator(unit.id, track) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EconomicsTrackSection;
