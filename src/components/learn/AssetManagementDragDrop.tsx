import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { AssetManagementDragDropActivity } from '@/data/asset-management-journey-data';

interface AssetManagementDragDropProps {
  activity: AssetManagementDragDropActivity;
  onComplete: (isCorrect: boolean) => void;
}

const AssetManagementDragDrop: React.FC<AssetManagementDragDropProps> = ({
  activity,
  onComplete
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [categoryAssignments, setCategoryAssignments] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (draggedItem) {
      setCategoryAssignments(prev => ({
        ...prev,
        [draggedItem]: categoryId
      }));
      setDraggedItem(null);
    }
  };

  const checkAnswers = () => {
    let correct = 0;
    activity.items.forEach(item => {
      if (categoryAssignments[item.id] === item.category) {
        correct++;
      }
    });
    
    const isCorrect = correct === activity.items.length;
    setShowResults(true);
    onComplete(isCorrect);
  };

  const getItemsForCategory = (categoryId: string) => {
    return Object.entries(categoryAssignments)
      .filter(([_, category]) => category === categoryId)
      .map(([itemId]) => activity.items.find(item => item.id === itemId))
      .filter(Boolean);
  };

  const unassignedItems = activity.items.filter(item => !categoryAssignments[item.id]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">{activity.title}</h3>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </div>

      {/* Unassigned Items */}
      <div>
        <h4 className="font-medium mb-3">Drag these items to the correct categories:</h4>
        <div className="flex flex-wrap gap-2">
          {unassignedItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg cursor-move hover:bg-blue-200 transition-colors text-sm"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activity.categories.map(category => {
          const assignedItems = getItemsForCategory(category.id);
          return (
            <Card
              key={category.id}
              className="border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-blue-600">{category.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="min-h-[100px] space-y-2">
                  {assignedItems.map(item => (
                    <div
                      key={item?.id}
                      className="px-2 py-1 bg-blue-50 border border-blue-200 rounded text-sm"
                    >
                      {item?.content}
                      {showResults && (
                        <span className="ml-2">
                          {categoryAssignments[item?.id || ''] === activity.items.find(i => i.id === item?.id)?.category ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 inline" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Check Answers Button */}
      {unassignedItems.length === 0 && !showResults && (
        <div className="text-center">
          <Button onClick={checkAnswers} className="bg-blue-500 hover:bg-blue-600">
            Check My Answers
          </Button>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="text-center p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            {Object.values(categoryAssignments).every((assigned, index) => 
              assigned === activity.items[index]?.category
            ) ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <Badge className="bg-green-500 text-white">Perfect! All correct!</Badge>
              </>
            ) : (
              <Badge variant="outline">Some answers need review</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagementDragDrop;