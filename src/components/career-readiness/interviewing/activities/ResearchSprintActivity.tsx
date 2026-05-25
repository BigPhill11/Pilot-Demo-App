import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Building2 } from 'lucide-react';
import { MOCK_COMPANY, RESEARCH_SPRINT_MIN_SELECTIONS } from '@/data/career-readiness/interviewing';
import type { InterviewActivityProps } from './types';

const ResearchSprintActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
  isActivityComplete = false,
}) => {
  const selected = new Set(answers.selectedResearchFacts ?? []);
  const [submitted, setSubmitted] = useState(isActivityComplete);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onUpdateAnswers({ selectedResearchFacts: Array.from(next) });
  };

  const usefulCount = MOCK_COMPANY.facts.filter(
    (f) => selected.has(f.id) && f.isUseful
  ).length;
  const wrongCount = MOCK_COMPANY.facts.filter(
    (f) => selected.has(f.id) && !f.isUseful
  ).length;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const passed = usefulCount >= RESEARCH_SPRINT_MIN_SELECTIONS && wrongCount <= 1;

  return (
    <div className="space-y-4">
      <Card className="border-emerald-100 bg-emerald-50/40">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Building2 className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-900">{MOCK_COMPANY.name}</h3>
              <p className="text-sm text-emerald-800/80">{MOCK_COMPANY.role}</p>
              <Badge variant="outline" className="mt-2 text-emerald-700 border-emerald-200">
                {MOCK_COMPANY.sector}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            You have 10 minutes before a mock interview. Select the facts you would actually use in
            your answers—skip the noise.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        {MOCK_COMPANY.facts.map((fact) => {
          const isSelected = selected.has(fact.id);
          return (
            <button
              key={fact.id}
              type="button"
              onClick={() => !submitted && toggle(fact.id)}
              disabled={submitted && !allowEdit}
              className={`text-left p-3 rounded-xl border transition-colors ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-border hover:border-emerald-200 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-2">
                {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />}
                <div>
                  <span className="text-xs text-muted-foreground">{fact.category}</span>
                  <p className="text-sm mt-0.5">{fact.text}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`p-3 rounded-lg text-sm ${
            passed ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
          }`}
        >
          {passed ? (
            <p>
              Strong research instincts! You picked {usefulCount} high-signal facts. In real prep,
              aim for deals, clients, culture, and competitors—not random trivia.
            </p>
          ) : (
            <p>
              Pick at least {RESEARCH_SPRINT_MIN_SELECTIONS} useful facts and avoid more than 1
              noise item. Useful: deals, clients, culture, competitors, recruiting.
            </p>
          )}
        </div>
      )}

      {!submitted ? (
        <Button
          className="w-full bg-emerald-800 hover:bg-emerald-900"
          disabled={selected.size < RESEARCH_SPRINT_MIN_SELECTIONS}
          onClick={handleSubmit}
        >
          Check my research ({selected.size} selected)
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          {passed && (
            <Button className="w-full bg-emerald-800 hover:bg-emerald-900" onClick={onComplete}>
              Save & mark simulation complete
            </Button>
          )}
          {(allowEdit || !passed) && (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setSubmitted(false)}
            >
              {passed ? 'Change my selections' : 'Try again'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResearchSprintActivity;
