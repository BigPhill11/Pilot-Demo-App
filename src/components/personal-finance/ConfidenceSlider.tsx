import React from 'react';
import { Slider } from '@/components/ui/slider';
import { ThemedEmoji } from '@/components/ui/themed-icons';
import { cn } from '@/lib/utils';

interface ConfidenceSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
}

const LABELS: { max: number; label: string }[] = [
  { max: 25, label: 'Just guessing' },
  { max: 50, label: 'Somewhat sure' },
  { max: 75, label: 'Pretty sure' },
  { max: 101, label: 'Very sure' },
];

function labelFor(value: number): string {
  return LABELS.find((l) => value <= l.max)?.label ?? 'Very sure';
}

/**
 * A confidence rating styled as a growing bamboo stalk — the further right the
 * student drags it, the taller and fuller the bamboo, tying the "how sure are
 * you" question to the app's growth theme instead of feeling like a survey.
 */
const STALK_SIZES = ['h-4 w-4', 'h-5 w-5', 'h-6 w-6', 'h-7 w-7', 'h-8 w-8'];

const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({ value, onChange }) => {
  const stalks = Math.max(1, Math.round((value / 100) * 5));

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-center gap-1 h-10">
        {STALK_SIZES.map((size, i) => (
          <ThemedEmoji
            key={i}
            emoji="🎋"
            className={cn(size, 'transition-opacity duration-200', i < stalks ? 'opacity-100' : 'opacity-15 grayscale')}
          />
        ))}
      </div>

      <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={0} max={100} step={1} />

      <p className="text-center text-sm font-medium text-primary">{labelFor(value)}</p>
    </div>
  );
};

export default ConfidenceSlider;
