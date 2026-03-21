import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Shield, Target } from 'lucide-react';
import { assetManagementMiniGameData } from '@/data/asset-management-journey-data';

const AssetManagementMiniGame: React.FC = () => {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const gameData = assetManagementMiniGameData.gameData;

  const handleAllocationChange = (assetName: string, value: number) => {
    setAllocations(prev => ({
      ...prev,
      [assetName]: Math.max(0, Math.min(100, value))
    }));
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  };

  const calculateResults = () => {
    const total = getTotalAllocation();
    if (total !== 100) {
      alert('Total allocation must equal 100%');
      return;
    }

    let portfolioRisk = 0;
    let portfolioReturn = 0;
    let portfolioESG = 0;
    let portfolioLiquidity = 0;

    gameData.assets.forEach((asset: any) => {
      const allocation = allocations[asset.name] || 0;
      const weight = allocation / 100;
      
      portfolioRisk += asset.risk * weight;
      portfolioReturn += asset.return * weight;
      portfolioESG += asset.esg * weight;
      portfolioLiquidity += asset.liquidity * weight;
    });

    // Check constraints
    const meetsMinCash = (allocations['Cash'] || 0) >= gameData.constraints.minCash;
    const meetsMaxSingleAsset = Object.values(allocations).every(val => val <= gameData.constraints.maxSingleAsset);
    const meetsESGRequirement = portfolioESG >= gameData.constraints.esgRequirement;

    const score = calculateScore(portfolioRisk, portfolioReturn, portfolioESG, meetsMinCash, meetsMaxSingleAsset, meetsESGRequirement);

    setResults({
      risk: portfolioRisk,
      return: portfolioReturn,
      esg: portfolioESG,
      liquidity: portfolioLiquidity,
      meetsMinCash,
      meetsMaxSingleAsset,
      meetsESGRequirement,
      score
    });
    setGameComplete(true);
  };

  const calculateScore = (risk: number, ret: number, esg: number, minCash: boolean, maxAsset: boolean, esgReq: boolean) => {
    let score = 0;
    
    // Risk-return balance (0-40 points)
    const riskReturnRatio = ret / Math.max(risk, 1);
    score += Math.min(40, riskReturnRatio * 5);
    
    // ESG score (0-30 points)
    score += (esg / 100) * 30;
    
    // Constraint compliance (0-30 points)
    if (minCash) score += 10;
    if (maxAsset) score += 10;
    if (esgReq) score += 10;
    
    return Math.round(score);
  };

  const getRating = (score: number) => {
    if (score >= 85) return { text: '🥇 Portfolio Master', color: 'bg-yellow-500' };
    if (score >= 70) return { text: '🥈 Asset Allocator', color: 'bg-gray-400' };
    if (score >= 55) return { text: '🥉 Portfolio Builder', color: 'bg-amber-600' };
    return { text: '📚 Keep Learning', color: 'bg-blue-500' };
  };

  const resetGame = () => {
    setAllocations({});
    setGameComplete(false);
    setResults(null);
  };

  if (gameComplete && results) {
    const rating = getRating(results.score);
    
    return (
      <div className="space-y-6">
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Trophy className="h-6 w-6" />
              Portfolio Analysis Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{results.score}/100</div>
              <Badge className={`text-lg py-2 px-4 text-white ${rating.color}`}>
                {rating.text}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="font-semibold text-green-600">{results.return.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Expected Return</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <Shield className="h-6 w-6 text-red-500 mx-auto mb-1" />
                <div className="font-semibold text-red-600">{results.risk.toFixed(1)}/10</div>
                <div className="text-xs text-muted-foreground">Risk Level</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <Target className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="font-semibold text-blue-600">{results.esg.toFixed(0)}/100</div>
                <div className="text-xs text-muted-foreground">ESG Score</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="h-6 w-6 text-purple-500 mx-auto mb-1 text-center">💧</div>
                <div className="font-semibold text-purple-600">{results.liquidity.toFixed(0)}/100</div>
                <div className="text-xs text-muted-foreground">Liquidity</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Constraint Compliance:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Badge className={results.meetsMinCash ? 'bg-green-500' : 'bg-red-500'}>
                  {results.meetsMinCash ? '✓' : '✗'} Min 5% Cash
                </Badge>
                <Badge className={results.meetsMaxSingleAsset ? 'bg-green-500' : 'bg-red-500'}>
                  {results.meetsMaxSingleAsset ? '✓' : '✗'} Max 40% Single Asset
                </Badge>
                <Badge className={results.meetsESGRequirement ? 'bg-green-500' : 'bg-red-500'}>
                  {results.meetsESGRequirement ? '✓' : '✗'} 30+ ESG Score
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={resetGame} className="flex-1">
                Try Again
              </Button>
              <Button variant="outline" className="flex-1">
                Share Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-blue-700">Portfolio Master Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{gameData.scenario}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="font-semibold text-blue-600">Minimum 5% Cash</div>
              <div className="text-xs text-muted-foreground">Liquidity requirement</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="font-semibold text-blue-600">Maximum 40%</div>
              <div className="text-xs text-muted-foreground">Single asset limit</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="font-semibold text-blue-600">ESG Score 30+</div>
              <div className="text-xs text-muted-foreground">Sustainability target</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Asset Allocation
            <Badge variant="outline">
              Total: {getTotalAllocation()}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gameData.assets.map((asset: any) => (
              <div key={asset.name} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-3 border rounded-lg">
                <div className="font-medium">{asset.name}</div>
                <div className="text-sm text-muted-foreground">
                  Risk: {asset.risk}/10
                </div>
                <div className="text-sm text-muted-foreground">
                  Return: {asset.return}%
                </div>
                <div className="text-sm text-muted-foreground">
                  ESG: {asset.esg}/100
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={allocations[asset.name] || 0}
                    onChange={(e) => handleAllocationChange(asset.name, parseInt(e.target.value) || 0)}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button 
              onClick={calculateResults}
              disabled={getTotalAllocation() !== 100}
              className="bg-blue-500 hover:bg-blue-600"
              size="lg"
            >
              Analyze Portfolio
            </Button>
            {getTotalAllocation() !== 100 && (
              <p className="text-sm text-muted-foreground mt-2">
                Total allocation must equal 100% (currently {getTotalAllocation()}%)
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetManagementMiniGame;