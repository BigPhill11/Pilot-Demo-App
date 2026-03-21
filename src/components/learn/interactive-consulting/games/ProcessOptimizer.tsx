
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Workflow, Zap, Clock, CheckCircle } from 'lucide-react';

interface ProcessOptimizerProps {
  onComplete: (score: number) => void;
}

const ProcessOptimizer: React.FC<ProcessOptimizerProps> = ({ onComplete }) => {
  const [gameComplete, setGameComplete] = useState(false);

  const handleComplete = () => {
    setGameComplete(true);
    setTimeout(() => onComplete(90), 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-green-500" />
            Process Optimizer
          </CardTitle>
          <Badge variant="outline">Operations Excellence</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-8 space-y-4">
            <Workflow className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Coming Soon!</h3>
            <p className="text-muted-foreground">
              Learn to identify bottlenecks and optimize business processes for maximum efficiency.
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Speed</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Efficiency</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Quality</span>
              </div>
            </div>
            <Button onClick={handleComplete}>Complete Demo</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessOptimizer;
