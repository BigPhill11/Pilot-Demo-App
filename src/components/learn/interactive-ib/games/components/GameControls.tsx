
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onShuffle: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onShuffle, onReset }) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <Button onClick={onShuffle} variant="outline" size="sm">
        <Shuffle className="h-4 w-4 mr-2" />
        Shuffle
      </Button>
      <Button onClick={onReset} variant="outline" size="sm">
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export default GameControls;
