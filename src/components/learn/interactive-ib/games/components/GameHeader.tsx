
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface GameHeaderProps {
  score: number;
  attempts: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, attempts }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>Wall Street Word Match</span>
        <div className="flex items-center gap-4">
          <span className="text-sm font-normal">Score: {score}</span>
          <span className="text-sm font-normal">Attempts: {attempts}</span>
        </div>
      </CardTitle>
    </CardHeader>
  );
};

export default GameHeader;
