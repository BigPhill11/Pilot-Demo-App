
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PandaTermTooltipProps {
  term: string;
  definition: string;
  analogy: string;
  children?: React.ReactNode;
}

const PandaTermTooltip: React.FC<PandaTermTooltipProps> = ({ 
  term, 
  definition, 
  analogy, 
  children 
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children ? children : (
            <button className="font-bold text-primary hover:text-primary/80 underline decoration-dotted cursor-pointer transition-colors">
              {term}
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent className="max-w-sm bg-popover text-popover-foreground p-4 rounded-lg shadow-lg border">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <div className="text-lg">🐼</div>
              <div>
                <p className="font-semibold text-primary mb-1">{term}</p>
                <p className="text-xs leading-relaxed mb-2">{definition}</p>
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-md p-2 border border-primary/20">
              <p className="text-xs font-medium text-primary mb-1">Phil's Simple Explanation:</p>
              <p className="text-xs text-primary/80 italic">{analogy}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PandaTermTooltip;
