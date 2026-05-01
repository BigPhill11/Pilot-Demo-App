import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { EconomicsHandsOnConfig, EconomicsHandsOnMeterDef } from '@/types/economics-curriculum';
import { cn } from '@/lib/utils';

interface EconomicsMiniSimulatorProps {
  config: EconomicsHandsOnConfig;
  onComplete: () => void;
}

function clampMeter(m: EconomicsHandsOnMeterDef, value: number): number {
  return Math.min(m.max, Math.max(m.min, value));
}

const EconomicsMiniSimulator: React.FC<EconomicsMiniSimulatorProps> = ({ config, onComplete }) => {
  const initialMap = useMemo(() => {
    const o: Record<string, number> = {};
    for (const m of config.meters) o[m.id] = m.value;
    return o;
  }, [config.meters]);

  const [meters, setMeters] = useState<Record<string, number>>(initialMap);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const scenario = config.scenarios[scenarioIndex];
  const isLast = scenarioIndex >= config.scenarios.length - 1;

  const meterDefsById = useMemo(() => {
    const map = new Map<string, EconomicsHandsOnMeterDef>();
    for (const m of config.meters) map.set(m.id, m);
    return map;
  }, [config.meters]);

  const applyChoice = () => {
    if (!selectedId || !scenario) return;
    const choice = scenario.choices.find((c) => c.id === selectedId);
    if (!choice) return;

    setMeters((prev) => {
      const next = { ...prev };
      for (const [id, delta] of Object.entries(choice.outcome.meterChanges)) {
        const def = meterDefsById.get(id);
        if (!def) continue;
        next[id] = clampMeter(def, (next[id] ?? def.value) + delta);
      }
      return next;
    });
    setFeedbackText(choice.outcome.feedback);
    setShowFeedback(true);
  };

  const advance = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setScenarioIndex((i) => i + 1);
    setSelectedId(null);
    setShowFeedback(false);
  };

  const pct = (m: EconomicsHandsOnMeterDef) => {
    const v = meters[m.id] ?? m.value;
    return ((v - m.min) / (m.max - m.min || 1)) * 100;
  };

  return (
    <div className="min-h-[70vh] flex flex-col max-w-lg mx-auto px-2 py-4">
      <div className="flex items-center gap-2 mb-4 text-emerald-800">
        <Gamepad2 className="h-6 w-6" />
        <div>
          <h2 className="text-lg font-bold leading-tight">{config.title}</h2>
          <p className="text-sm text-emerald-700/85">{config.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {config.meters.map((m) => {
          const v = meters[m.id] ?? m.value;
          return (
            <Card key={m.id} className="border-emerald-200 bg-white/90 shadow-sm">
              <CardContent className="p-3 pt-3">
                <div className="text-xs text-emerald-600 flex items-center gap-1 mb-1">
                  <span>{m.icon}</span>
                  <span className="truncate">{m.label}</span>
                </div>
                <div className="text-lg font-bold text-emerald-900 tabular-nums">
                  {v}
                  {m.unit ? <span className="text-sm font-medium text-emerald-700">{m.unit}</span> : null}
                </div>
                {m.hint ? <p className="text-[10px] text-emerald-600/90 mt-0.5 leading-tight">{m.hint}</p> : null}
                <Progress value={pct(m)} className="h-1.5 mt-2 bg-emerald-100" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-xs font-medium text-emerald-600 mb-2">
        Decision {scenarioIndex + 1} of {config.scenarios.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario?.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-4 flex-1"
        >
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-emerald-900 mb-1">{scenario?.title}</h3>
              <p className="text-sm text-emerald-800/90">{scenario?.description}</p>
            </CardContent>
          </Card>

          {!showFeedback ? (
            <>
              <div className="space-y-2">
                {scenario?.choices.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedId(ch.id)}
                    className={cn(
                      'w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
                      selectedId === ch.id
                        ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
                        : 'border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50'
                    )}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4"
                disabled={!selectedId}
                onClick={applyChoice}
              >
                Make this choice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Card className="border-emerald-300 bg-white">
                <CardContent className="p-4 text-sm text-emerald-900">{feedbackText}</CardContent>
              </Card>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={advance}>
                {isLast ? 'Continue lesson' : 'Next scenario'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EconomicsMiniSimulator;
