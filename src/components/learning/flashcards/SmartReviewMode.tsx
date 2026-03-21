import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { ReviewScheduleCard } from "./ReviewScheduleCard";
import { ReviewDashboard } from "./ReviewDashboard";
import { getAllUnifiedFlashcards, UnifiedFlashcard } from "@/data/unified-flashcards";
import { SM2Progress, isDueForReview, getDaysUntilReview, sortCardsByPriority } from "@/utils/spaced-repetition";

// Compatibility type alias
type CategorizedFlashcard = UnifiedFlashcard;

interface SmartReviewModeProps {
  allSM2Progress: Map<string, SM2Progress>;
  onStartReview: () => void;
  onCardClick?: (card: CategorizedFlashcard) => void;
}

export const SmartReviewMode = ({ allSM2Progress, onStartReview, onCardClick }: SmartReviewModeProps) => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'schedule'>('dashboard');
  const allCards = getAllUnifiedFlashcards();

  const getDueCards = () => {
    return Array.from(allSM2Progress.values())
      .filter(p => isDueForReview(p))
      .sort((a, b) => getDaysUntilReview(a) - getDaysUntilReview(b));
  };

  const getUpcomingCards = () => {
    return Array.from(allSM2Progress.values())
      .filter(p => !isDueForReview(p))
      .sort((a, b) => getDaysUntilReview(a) - getDaysUntilReview(b));
  };

  const dueCards = getDueCards();
  const upcomingCards = getUpcomingCards();

  const getCardForProgress = (progress: SM2Progress): CategorizedFlashcard | undefined => {
    return allCards.find(c => c.id === progress.cardId);
  };

  if (allSM2Progress.size === 0) {
    return (
      <Card className="p-8 text-center">
        <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Start Learning!</h3>
        <p className="text-muted-foreground mb-6">
          Study some cards first to build your personalized review schedule.
        </p>
        <Button onClick={onStartReview} size="lg">
          Begin Studying
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'dashboard' | 'schedule')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">
            <Brain className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <ReviewDashboard allProgress={allSM2Progress} />
          
          {dueCards.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold">Ready to Review</h3>
                  <Badge variant="destructive">{dueCards.length}</Badge>
                </div>
                <Button onClick={onStartReview}>
                  Start Review Session
                </Button>
              </div>
              
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {dueCards.slice(0, 10).map((progress) => {
                    const card = getCardForProgress(progress);
                    if (!card) return null;
                    return (
                      <ReviewScheduleCard
                        key={progress.cardId}
                        progress={progress}
                        cardTerm={card.term}
                        onClick={() => onCardClick?.(card)}
                      />
                    );
                  })}
                </div>
                {dueCards.length > 10 && (
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    + {dueCards.length - 10} more cards due for review
                  </div>
                )}
              </ScrollArea>
            </Card>
          )}

          {dueCards.length === 0 && (
            <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">All Caught Up! 🎉</h3>
              <p className="text-muted-foreground mb-4">
                No cards are due for review right now. Great work!
              </p>
              {upcomingCards.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Next review in {getDaysUntilReview(upcomingCards[0])} day
                  {getDaysUntilReview(upcomingCards[0]) !== 1 ? 's' : ''}
                </p>
              )}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          {dueCards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">Due Now</h3>
                <Badge variant="destructive">{dueCards.length}</Badge>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {dueCards.map((progress) => {
                    const card = getCardForProgress(progress);
                    if (!card) return null;
                    return (
                      <ReviewScheduleCard
                        key={progress.cardId}
                        progress={progress}
                        cardTerm={card.term}
                        onClick={() => onCardClick?.(card)}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {upcomingCards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Upcoming Reviews</h3>
                <Badge variant="secondary">{upcomingCards.length}</Badge>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {upcomingCards.slice(0, 20).map((progress) => {
                    const card = getCardForProgress(progress);
                    if (!card) return null;
                    return (
                      <ReviewScheduleCard
                        key={progress.cardId}
                        progress={progress}
                        cardTerm={card.term}
                        onClick={() => onCardClick?.(card)}
                      />
                    );
                  })}
                </div>
                {upcomingCards.length > 20 && (
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    + {upcomingCards.length - 20} more upcoming reviews
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
