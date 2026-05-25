import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Sparkles } from 'lucide-react';
import type { CareerModule } from '@/data/career-readiness/modules';

interface ModuleComingSoonSheetProps {
  module: CareerModule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModuleComingSoonSheet: React.FC<ModuleComingSoonSheetProps> = ({
  module,
  open,
  onOpenChange,
}) => {
  if (!module) return null;

  const Icon = module.icon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] overflow-y-auto">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <SheetTitle className="text-xl">{module.title}</SheetTitle>
              <SheetDescription className="text-base mt-1">
                {module.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
            <Clock className="h-3 w-3 mr-1" />
            {module.estimatedMinutes} min estimated
          </Badge>

          <div className="p-4 rounded-xl bg-muted/50 space-y-2">
            <p className="text-sm font-medium text-foreground">What you&apos;ll learn</p>
            <ul className="space-y-2">
              {module.learningPoints.map((point) => (
                <li key={point} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-medium text-emerald-800">Content coming soon!</p>
            <p className="text-xs text-emerald-700/80 mt-1">
              We&apos;re building interactive lessons for this module. Check back soon.
            </p>
          </div>

          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModuleComingSoonSheet;
