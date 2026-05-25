import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LessonExampleContent } from '@/data/career-readiness/interviewing';

interface LessonExamplePanelProps {
  content: LessonExampleContent;
  onContinue: () => void;
  isReview?: boolean;
}

const LessonExamplePanel: React.FC<LessonExamplePanelProps> = ({
  content,
  onContinue,
  isReview = false,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [revealedTakeaway, setRevealedTakeaway] = useState(false);

  const handleNextStep = () => {
    if (activeStep < content.walkthrough.length - 1) {
      setActiveStep((s) => s + 1);
    } else {
      setRevealedTakeaway(true);
    }
  };

  if (isReview) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <h3 className="font-bold text-emerald-900">{content.headline}</h3>
            <p className="text-sm text-muted-foreground mt-2">{content.scenario}</p>
            <div className="mt-4 space-y-2">
              {content.walkthrough.map((step) => (
                <div key={step.label} className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <p className="text-sm font-semibold text-emerald-900">{step.label}</p>
                  <p className="text-sm mt-1">{step.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-emerald-100/50 text-sm">
              <strong>Takeaway:</strong> {content.takeaway}
            </div>
          </CardContent>
        </Card>
        <Button className="w-full bg-emerald-800 hover:bg-emerald-900" onClick={onContinue}>
          Back to practice simulations
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-emerald-100">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <h3 className="font-bold text-emerald-900">{content.headline}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{content.scenario}</p>
        </CardContent>
      </Card>

      <div className="flex gap-1">
        {content.walkthrough.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= activeStep ? 'bg-emerald-600' : 'bg-emerald-100'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
        >
          <Card className="border-2 border-emerald-200 shadow-sm">
            <CardContent className="p-5">
              <Badge variant="outline" className="text-emerald-700 border-emerald-200 mb-3">
                Step {activeStep + 1} of {content.walkthrough.length}
              </Badge>
              <p className="font-semibold text-emerald-900">
                {content.walkthrough[activeStep].label}
              </p>
              <p className="text-sm mt-2 leading-relaxed">
                {content.walkthrough[activeStep].detail}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {!revealedTakeaway ? (
        <Button
          className="w-full bg-emerald-800 hover:bg-emerald-900"
          onClick={handleNextStep}
        >
          {activeStep < content.walkthrough.length - 1 ? (
            <>
              Next part
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Reveal takeaway'
          )}
        </Button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
            <p className="font-semibold mb-1">Takeaway</p>
            <p>{content.takeaway}</p>
          </div>
          <Button className="w-full bg-emerald-800 hover:bg-emerald-900" onClick={onContinue}>
            {isReview ? 'Back to practice simulations' : 'Start practice simulations'}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LessonExamplePanel;
