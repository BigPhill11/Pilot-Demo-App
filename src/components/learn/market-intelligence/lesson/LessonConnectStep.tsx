import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Wallet, Briefcase } from 'lucide-react';
import type { MILessonConnect } from '@/types/mi-lesson';
import LessonVisualImage from './LessonVisualImage';
import { cn } from '@/lib/utils';

interface LessonConnectStepProps {
  connect: MILessonConnect;
  onContinue: () => void;
  onBack: () => void;
}

const LessonConnectStep: React.FC<LessonConnectStepProps> = ({
  connect,
  onContinue,
  onBack,
}) => {
  const [panel, setPanel] = useState<'pf' | 'career'>('pf');
  const viewedBoth = panel === 'career'; // user must swipe to career at least once — track separately

  const [seenCareer, setSeenCareer] = useState(false);

  const handlePanel = (p: 'pf' | 'career') => {
    setPanel(p);
    if (p === 'career') setSeenCareer(true);
  };

  const active = panel === 'pf' ? connect.personalFinance : connect.career;
  const isPf = panel === 'pf';

  return (
    <>
      <Badge className="mb-3 bg-teal-100 text-teal-800 border-teal-200">
        Connect · Your world & careers
      </Badge>
      <h2 className="text-xl font-bold text-emerald-800 mb-3">Why this matters</h2>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => handlePanel('pf')}
          className={cn(
            'flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-1.5',
            isPf
              ? 'bg-purple-100 border-purple-300 text-purple-900'
              : 'bg-white border-emerald-200 text-emerald-700'
          )}
        >
          <Wallet className="h-4 w-4" />
          Your money
        </button>
        <button
          type="button"
          onClick={() => handlePanel('career')}
          className={cn(
            'flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-1.5',
            !isPf
              ? 'bg-cyan-100 border-cyan-300 text-cyan-900'
              : 'bg-white border-emerald-200 text-emerald-700'
          )}
        >
          <Briefcase className="h-4 w-4" />
          On the job
        </button>
      </div>

      <LessonVisualImage
        visual={isPf ? connect.personalFinance.visual : connect.career.visual}
        className="mb-4"
        fallbackSeed={isPf ? 'pf' : 'career'}
      />

      <Card
        className={cn(
          'border mb-6',
          isPf ? 'border-purple-200 bg-purple-50/40' : 'border-cyan-200 bg-cyan-50/40'
        )}
      >
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold text-emerald-900">{active.title}</h3>
          {isPf ? (
            <>
              <p className="text-sm text-gray-700 leading-relaxed">
                {connect.personalFinance.description}
              </p>
              <p className="text-sm italic text-purple-900/80 border-l-2 border-purple-300 pl-3">
                {connect.personalFinance.scenario}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-700 leading-relaxed">
                {connect.career.description}
              </p>
              <p className="text-sm font-semibold text-cyan-900">
                Role: {connect.career.role}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {connect.career.skills.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs border-cyan-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {!seenCareer && isPf && (
        <p className="text-xs text-center text-emerald-700 mb-3">
          Tap <strong>On the job</strong> to see the career connection, then continue.
        </p>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={onBack} className="border-emerald-300 text-emerald-700">
          Back
        </Button>
        <Button
          onClick={onContinue}
          disabled={!seenCareer}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </>
  );
};

export default LessonConnectStep;
