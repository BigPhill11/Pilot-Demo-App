import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { getLevelFromTotalXp } from '@/lib/progression';

const RANKS = [
  { name: 'Bamboo Sprout', emoji: '🌱' },
  { name: 'Curious Cub', emoji: '🐼' },
  { name: 'Bamboo Biter', emoji: '🎋' },
  { name: 'Forest Explorer', emoji: '🌿' },
  { name: 'River Rambler', emoji: '🏞️' },
  { name: 'Mountain Climber', emoji: '⛰️' },
  { name: 'Swift Pouncer', emoji: '⚡' },
  { name: 'Wisdom Seeker', emoji: '📘' },
  { name: 'Bamboo Guardian', emoji: '🛡️' },
  { name: 'Zen Nibbler', emoji: '🧘' },
  { name: 'Grove Protector', emoji: '🌳' },
  { name: 'Moonlight Scholar', emoji: '🌙' },
  { name: 'Star Bamboo Sage', emoji: '⭐' },
  { name: 'Legendary Panda', emoji: '🐾' },
  { name: 'Grandmaster Panda', emoji: '🏆' },
];

// dynamic XP per level via progression lib

const RankBadge: React.FC = () => {
  const { progress } = useProgressTracking();
  const total = progress.total_points || 0;
  const currentLevel = getLevelFromTotalXp(total);
  const rankIndex = Math.min(currentLevel - 1, RANKS.length - 1);
  const rank = RANKS[rankIndex];
  const next = RANKS[Math.min(rankIndex + 1, RANKS.length - 1)];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl" aria-hidden>{rank.emoji}</div>
            <div>
              <div className="text-sm text-muted-foreground">Current Rank</div>
              <div className="font-semibold">{rank.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Next</div>
            <div className="text-sm">{next.name}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankBadge;
