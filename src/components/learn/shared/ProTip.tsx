import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface ProTipProps {
  tip: string;
  author?: string;
}

export const ProTip = ({ tip, author = "Phil" }: ProTipProps) => {
  return (
    <Card className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
      <div className="flex gap-3">
        <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm leading-relaxed">{tip}</p>
          {author && (
            <p className="text-xs text-muted-foreground mt-2">— {author}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
