import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface RealTeenScenarioProps {
  name: string;
  age: number;
  story: string;
  lesson: string;
}

export const RealTeenScenario = ({ name, age, story, lesson }: RealTeenScenarioProps) => {
  return (
    <Card className="p-5 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold">{name}, {age}</h4>
          <p className="text-xs text-muted-foreground">Real Teen Story</p>
        </div>
      </div>
      
      <p className="text-sm mb-3 italic text-muted-foreground">"{story}"</p>
      
      <div className="pt-3 border-t">
        <p className="text-sm font-medium text-primary mb-1">What they learned:</p>
        <p className="text-sm">{lesson}</p>
      </div>
    </Card>
  );
};
