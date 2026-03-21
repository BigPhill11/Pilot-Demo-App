import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StoryMetrics } from '@/types/career-story';
import { Brain, Clock, Users, Activity } from 'lucide-react';

interface MetricsDisplayProps {
  metrics: StoryMetrics;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  const getColorClass = (value: number, invert = false) => {
    const threshold = invert ? 
      (value > 70 ? 'text-destructive' : value > 40 ? 'text-yellow-500' : 'text-green-500') :
      (value >= 70 ? 'text-green-500' : value >= 40 ? 'text-yellow-500' : 'text-destructive');
    return threshold;
  };

  return (
    <Card className="p-4">
      <h4 className="text-sm font-semibold mb-4">Your Performance Metrics</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Technical Skill</span>
          </div>
          <Progress value={metrics.technicalSkill} className="h-2" />
          <span className={`text-xs font-semibold ${getColorClass(metrics.technicalSkill)}`}>
            {Math.round(metrics.technicalSkill)}%
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Time Management</span>
          </div>
          <Progress value={metrics.timeManagement} className="h-2" />
          <span className={`text-xs font-semibold ${getColorClass(metrics.timeManagement)}`}>
            {Math.round(metrics.timeManagement)}%
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Relationships</span>
          </div>
          <Progress 
            value={Object.values(metrics.relationships).reduce((a, b) => a + b, 0) / Object.values(metrics.relationships).length} 
            className="h-2" 
          />
          <span className={`text-xs font-semibold ${getColorClass(
            Object.values(metrics.relationships).reduce((a, b) => a + b, 0) / Object.values(metrics.relationships).length
          )}`}>
            {Math.round(Object.values(metrics.relationships).reduce((a, b) => a + b, 0) / Object.values(metrics.relationships).length)}%
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Stress Level</span>
          </div>
          <Progress value={metrics.stressLevel} className="h-2" />
          <span className={`text-xs font-semibold ${getColorClass(metrics.stressLevel, true)}`}>
            {Math.round(metrics.stressLevel)}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MetricsDisplay;
