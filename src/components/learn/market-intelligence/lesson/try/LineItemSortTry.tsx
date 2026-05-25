import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Gamepad2 } from 'lucide-react';
import type { MILessonTryActivity } from '@/types/mi-lesson';

interface LineItemSortTryProps {
  activity: MILessonTryActivity;
  onComplete: () => void;
}

const LineItemSortTry: React.FC<LineItemSortTryProps> = ({ activity, onComplete }) => {
  const buckets = activity.buckets ?? [];
  const items = activity.items ?? [];
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(false);

  const unassigned = items.filter((i) => !assignments[i.id]);
  const allAssigned = unassigned.length === 0;

  const assign = (bucketId: string) => {
    if (!selectedItem) return;
    setAssignments((prev) => ({ ...prev, [selectedItem]: bucketId }));
    setSelectedItem(null);
  };

  const handleFinish = () => {
    setShowHints(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-800">
        <Gamepad2 className="h-5 w-5" />
        <h3 className="font-bold">{activity.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{activity.description}</p>

      {unassigned.length > 0 && (
        <div>
          <p className="text-xs font-medium text-emerald-700 mb-2">Tap an item, then a bucket</p>
          <div className="flex flex-wrap gap-2">
            {unassigned.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item.id)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  selectedItem === item.id
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white border-emerald-200 text-emerald-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {buckets.map((bucket) => {
          const inBucket = items.filter((i) => assignments[i.id] === bucket.id);
          return (
            <Card
              key={bucket.id}
              className={`border-2 border-dashed ${
                selectedItem ? 'border-emerald-400 cursor-pointer' : 'border-emerald-200'
              }`}
              onClick={() => selectedItem && assign(bucket.id)}
            >
              <CardContent className="p-3">
                <p className="text-sm font-semibold text-emerald-800 mb-2">{bucket.label}</p>
                <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                  {inBucket.map((item) => (
                    <Badge key={item.id} variant="secondary" className="text-xs">
                      {item.label}
                      {showHints && (
                        <span className="ml-1">
                          {assignments[item.id] === item.correctBucket ? '✓' : '↻'}
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!allAssigned ? (
        <p className="text-xs text-center text-muted-foreground">
          {selectedItem ? 'Now tap a bucket above' : 'Select an item to place'}
        </p>
      ) : !showHints ? (
        <Button onClick={handleFinish} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Check layout
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Nice work — you mapped the statement!</span>
          </div>
          <Button onClick={handleContinue} className="w-full bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default LineItemSortTry;
