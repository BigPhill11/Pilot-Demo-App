import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { LessonContextContent } from '@/data/career-readiness/interviewing';

interface LessonContextPanelProps {
  content: LessonContextContent;
  reflectionValue?: string;
  onReflectionChange: (value: string) => void;
  onContinue: () => void;
  isReview?: boolean;
}

const LessonContextPanel: React.FC<LessonContextPanelProps> = ({
  content,
  reflectionValue = '',
  onReflectionChange,
  onContinue,
  isReview = false,
}) => {
  const [termsOpen, setTermsOpen] = useState(true);
  const canContinue =
    reflectionValue.trim().length >= 12 ||
    (isReview && reflectionValue.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 shrink-0">
              <BookOpen className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900">{content.headline}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{content.intro}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-100">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <Lightbulb className="h-4 w-4" />
            Why this matters
          </div>
          <ul className="space-y-2">
            {content.significance.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-sm flex gap-2"
              >
                <span className="text-emerald-600 font-bold shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <button
        type="button"
        onClick={() => setTermsOpen((o) => !o)}
        className="w-full flex items-center justify-between text-sm font-medium text-emerald-800 px-1"
      >
        Key terms
        <ChevronDown className={`h-4 w-4 transition-transform ${termsOpen ? 'rotate-180' : ''}`} />
      </button>

      {termsOpen && (
        <div className="grid gap-2">
          {content.keyTerms.map((kt) => (
            <div
              key={kt.term}
              className="p-3 rounded-xl border border-emerald-100 bg-white hover:border-emerald-200 transition-colors"
            >
              <p className="text-sm font-semibold text-emerald-900">{kt.term}</p>
              <p className="text-sm text-muted-foreground mt-1">{kt.definition}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="context-reflection">
          Quick reflection
        </label>
        <Textarea
          id="context-reflection"
          placeholder={content.reflectionPrompt}
          value={reflectionValue}
          onChange={(e) => onReflectionChange(e.target.value)}
          className="min-h-[88px] border-emerald-100 focus-visible:ring-emerald-500"
        />
        <p className="text-xs text-muted-foreground">
          {canContinue
            ? 'Great—writing this down helps you remember what to avoid.'
            : 'Write at least a short sentence (12+ characters) to continue.'}
        </p>
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!canContinue && !isReview}
        onClick={onContinue}
      >
        {isReview ? 'Save & return to example' : 'Continue to example'}
      </Button>
    </motion.div>
  );
};

export default LessonContextPanel;
