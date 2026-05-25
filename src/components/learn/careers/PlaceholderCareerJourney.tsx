/**
 * Placeholder career journey — module titles only until content is ready.
 */

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock } from 'lucide-react';
import { getCareerById } from '@/data/finance-careers';
import { useIsMobile } from '@/hooks/use-mobile';
import { unlockCareersFlashcards } from '@/data/flashcards/flashcardUnlockStore';
import { extractCareersFlashcards } from '@/data/flashcards/extractCareersFlashcards';

// Career ID → careers flashcard category label mapping
const CAREER_CATEGORY_MAP: Record<string, string> = {
  'investment-banking': 'Investment Banking',
  'ib': 'Investment Banking',
  'private-equity': 'Private Equity',
  'pe': 'Private Equity',
  'management-consulting': 'Management Consulting',
  'consulting': 'Management Consulting',
  'venture-capital': 'Venture Capital',
  'vc': 'Venture Capital',
};

interface PlaceholderCareerJourneyProps {
  careerId: string;
  onBack: () => void;
}

const PlaceholderCareerJourney: React.FC<PlaceholderCareerJourneyProps> = ({
  careerId,
  onBack,
}) => {
  const isMobile = useIsMobile();
  const career = getCareerById(careerId);

  // Unlock beginner-level flashcards for this career path as soon as user explores it
  useEffect(() => {
    const category = CAREER_CATEGORY_MAP[careerId];
    if (!category) return;
    const cards = extractCareersFlashcards();
    const beginnerIds = cards
      .filter((c) => c.category === category && c.difficulty === 'beginner')
      .map((c) => c.id);
    if (beginnerIds.length > 0) {
      unlockCareersFlashcards(beginnerIds);
    }
  }, [careerId]);

  if (!career) {
    return (
      <div className="space-y-4 px-4 py-6">
        <Button variant="ghost" onClick={onBack} className="text-green-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p className="text-muted-foreground">Career not found.</p>
      </div>
    );
  }

  const Icon = career.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-green-700 hover:text-green-800 hover:bg-green-100 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div
        className={`rounded-2xl bg-gradient-to-r ${career.color} p-6 text-white shadow-lg`}
      >
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white/20 p-3">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
              {career.name}
            </h1>
            <p className="mt-2 text-white/90 text-sm md:text-base">
              {career.description}
            </p>
            <p className="mt-1 text-white/75 text-sm">{career.kidFriendlyDescription}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-green-800 mb-1">Modules</h2>
        <p className="text-sm text-green-600/80 mb-4">
          {career.levels.length} modules — content coming soon
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {career.levels.map((level) => (
            <Card
              key={level.id}
              className="border-green-200 bg-white/80 opacity-90"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="shrink-0 border-green-300 text-green-700"
                  >
                    Module {level.id}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Coming soon
                  </Badge>
                </div>
                <h3 className="mt-3 font-semibold text-green-900">{level.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {level.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCareerJourney;
