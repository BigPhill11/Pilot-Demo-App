import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  TrendingUp, 
  Clock, 
  Target, 
  Trophy,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import CompanyTinderGame from '../company-tinder/CompanyTinderGame';
import { useCompanies } from '@/hooks/useCompanies';
import { getDailyMacroScenario, MacroScenario } from '../company-tinder/macroScenarios';

export type TinderGameMode = 'classic' | 'macro-aware' | 'thesis-builder' | 'time-horizon' | 'challenge-run';

interface GameModeConfig {
  id: TinderGameMode;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  requiresMacro?: boolean;
}

const GAME_MODES: GameModeConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Swipe on company quality only',
    icon: <Heart className="h-5 w-5" />,
    color: 'from-pink-500 to-rose-500',
    difficulty: 'Easy',
  },
  {
    id: 'macro-aware',
    name: 'Macro-Aware',
    description: 'Consider the economic backdrop when deciding',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'from-emerald-500 to-teal-500',
    difficulty: 'Medium',
    requiresMacro: true,
  },
  {
    id: 'thesis-builder',
    name: 'Thesis Builder',
    description: 'Pick 2-3 reasons before you can swipe',
    icon: <Target className="h-5 w-5" />,
    color: 'from-blue-500 to-indigo-500',
    difficulty: 'Medium',
  },
  {
    id: 'time-horizon',
    name: 'Time Horizon',
    description: 'Long-term vs short-term recommendations',
    icon: <Clock className="h-5 w-5" />,
    color: 'from-violet-500 to-purple-500',
    difficulty: 'Hard',
    requiresMacro: true,
  },
  {
    id: 'challenge-run',
    name: 'Challenge Run',
    description: '10 companies, scorecard at the end',
    icon: <Trophy className="h-5 w-5" />,
    color: 'from-amber-500 to-orange-500',
    difficulty: 'Hard',
  },
];

/**
 * Company Tinder View
 * 
 * Wrapper around the Company Tinder game with mode selection
 * and macro backdrop integration.
 */
const CompanyTinderView: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<TinderGameMode | null>(null);
  const [showMacroInfo, setShowMacroInfo] = useState(false);
  const { companies, loading } = useCompanies();
  
  const todaysMacro = getDailyMacroScenario();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading companies...</p>
      </div>
    );
  }

  // If a mode is selected, show the game
  if (selectedMode) {
    return (
      <div className="space-y-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => setSelectedMode(null)}
          className="mb-2"
        >
          ← Back to Mode Selection
        </Button>

        {/* Macro Banner (if applicable) */}
        {GAME_MODES.find(m => m.id === selectedMode)?.requiresMacro && (
          <MacroBanner scenario={todaysMacro} />
        )}

        {/* Game */}
        <CompanyTinderGame 
          companies={companies} 
          mode={selectedMode}
          macroScenario={todaysMacro}
        />
      </div>
    );
  }

  // Mode Selection Screen
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-950 via-pink-900 to-rose-900 border border-rose-500/30">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-48 h-48 bg-rose-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30">
              <span className="text-3xl">💘</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Company Tinder</h2>
              <p className="text-rose-200/80 max-w-2xl">
                Practice making investment decisions. Swipe right on companies you'd invest in, 
                left on those you'd pass. Choose a game mode to get started.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Macro Backdrop */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-white">Today's Economic Backdrop</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMacroInfo(!showMacroInfo)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{todaysMacro.icon}</span>
            <div>
              <p className="font-medium text-white">{todaysMacro.name}</p>
              <p className="text-sm text-slate-400">{todaysMacro.shortDescription}</p>
            </div>
          </div>

          {showMacroInfo && (
            <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300 mb-3">{todaysMacro.narrative}</p>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {todaysMacro.indicators.map((indicator, i) => (
                  <div key={i} className="text-center p-2 rounded bg-slate-700/50">
                    <p className="text-xs text-slate-400">{indicator.name}</p>
                    <p className="font-mono text-sm text-white">{indicator.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2 rounded bg-green-900/30 border border-green-500/30">
                  <p className="text-green-400 font-medium mb-1">Tends to Win</p>
                  <p className="text-green-300/70">{todaysMacro.tendsToWin}</p>
                </div>
                <div className="p-2 rounded bg-red-900/30 border border-red-500/30">
                  <p className="text-red-400 font-medium mb-1">Tends to Lose</p>
                  <p className="text-red-300/70">{todaysMacro.tendsToLose}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Game Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAME_MODES.map((mode) => (
          <Card 
            key={mode.id}
            className="cursor-pointer hover:border-white/30 transition-all hover:scale-[1.02] border-slate-700 bg-slate-900/50"
            onClick={() => setSelectedMode(mode.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${mode.color} text-white`}>
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{mode.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        mode.difficulty === 'Easy' ? 'border-green-500 text-green-400' :
                        mode.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-400' :
                        'border-red-500 text-red-400'
                      }`}
                    >
                      {mode.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{mode.description}</p>
                  {mode.requiresMacro && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                      <Zap className="h-3 w-3" />
                      Uses macro backdrop
                    </div>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

/**
 * Macro Banner Component
 * Shows the current economic scenario during gameplay
 */
const MacroBanner: React.FC<{ scenario: MacroScenario }> = ({ scenario }) => {
  return (
    <div className="p-3 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700">
      <div className="flex items-center gap-3">
        <span className="text-xl">{scenario.icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">
            Current Backdrop: {scenario.name}
          </p>
          <p className="text-xs text-slate-400">{scenario.shortDescription}</p>
        </div>
        <div className="flex gap-2">
          {scenario.indicators.map((ind, i) => (
            <div key={i} className="text-center px-2 py-1 rounded bg-slate-700/50 text-xs">
              <span className="text-slate-400">{ind.name}: </span>
              <span className="text-white font-mono">{ind.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTinderView;



