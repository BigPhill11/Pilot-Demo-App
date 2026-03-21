import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, TrendingUp, MessageCircle, Heart, Repeat2 } from 'lucide-react';

interface SocialScenario {
  id: string;
  companyName: string;
  ticker: string;
  socialPosts: {
    platform: string;
    message: string;
    engagement: string;
  }[];
  hypeLevel: number; // 0-100
  fundamentals: {
    revenue: string;
    profitability: string;
    debt: string;
  };
  verdict: 'opportunity' | 'hype' | 'danger';
  reasoning: string;
  recommendation: string;
}

const scenarios: SocialScenario[] = [
  {
    id: '1',
    companyName: 'AI Startup Inc',
    ticker: 'AIST',
    socialPosts: [
      {
        platform: 'Twitter',
        message: '🚀 AIST TO THE MOON! Get in now before it 10x!!! #NextTesla',
        engagement: '50K likes, 10K retweets'
      },
      {
        platform: 'Reddit',
        message: 'YOLO\'d my life savings into AIST. This can\'t go tits up!',
        engagement: '5K upvotes'
      },
      {
        platform: 'TikTok',
        message: 'Why AIST will make you RICH in 30 days (not financial advice 😉)',
        engagement: '2M views'
      }
    ],
    hypeLevel: 95,
    fundamentals: {
      revenue: 'Declining 20% YoY',
      profitability: 'Negative margins',
      debt: 'Debt-to-equity: 4.5'
    },
    verdict: 'danger',
    reasoning: 'Extreme hype with terrible fundamentals = classic pump-and-dump setup. Anonymous accounts promising huge gains with no substance.',
    recommendation: 'AVOID - This is FOMO trap. Fundamentals don\'t support the hype. High probability of crashing.'
  },
  {
    id: '2',
    companyName: 'SolidTech Corp',
    ticker: 'SLDTCH',
    socialPosts: [
      {
        platform: 'Twitter',
        message: 'Interesting analysis on SLDTCH\'s cloud growth. Revenue up 30%, margins improving. Worth researching.',
        engagement: '2K likes'
      },
      {
        platform: 'Reddit',
        message: 'Did DD on SLDTCH. Strong fundamentals, reasonable P/E. Not flashy but solid long-term hold.',
        engagement: '800 upvotes'
      },
      {
        platform: 'Discord',
        message: 'SLDTCH flying under radar. Good risk/reward at current price based on fundamentals.',
        engagement: '150 reactions'
      }
    ],
    hypeLevel: 35,
    fundamentals: {
      revenue: 'Growing 30% YoY',
      profitability: '25% net margin',
      debt: 'Debt-to-equity: 0.6'
    },
    verdict: 'opportunity',
    reasoning: 'Moderate, thoughtful discussion focused on fundamentals. No FOMO pressure. Strong underlying business.',
    recommendation: 'WORTH RESEARCHING - Social chatter is balanced and backed by solid fundamentals. Good candidate for deeper analysis.'
  },
  {
    id: '3',
    companyName: 'MemeStock Co',
    ticker: 'MEME',
    socialPosts: [
      {
        platform: 'Reddit',
        message: '🦍 APES TOGETHER STRONG! MEME to $500!! Diamond hands!! 💎🙌',
        engagement: '100K upvotes'
      },
      {
        platform: 'Twitter',
        message: 'Short squeeze incoming on MEME! Hedgies r fuk! Not selling until $1000!',
        engagement: '75K likes, 25K retweets'
      },
      {
        platform: 'WallStreetBets',
        message: 'YOLO update: $500K in MEME calls. This is the way. 🚀🚀🚀',
        engagement: '50K upvotes, 100 awards'
      }
    ],
    hypeLevel: 98,
    fundamentals: {
      revenue: 'Flat growth',
      profitability: 'Breakeven',
      debt: 'Debt-to-equity: 1.8'
    },
    verdict: 'hype',
    reasoning: 'Classic meme stock behavior: extreme hype, short squeeze narrative, emoji-heavy posts. Mediocre fundamentals.',
    recommendation: 'HIGH RISK - Pure momentum play, not investment. Only for experienced traders with risk capital. Could 10x or crash 90%.'
  }
];

const SocialSentimentMeter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const scenario = scenarios[currentIndex];

  const handleGuess = (verdict: 'opportunity' | 'hype' | 'danger') => {
    setUserGuess(verdict);
    setShowAnalysis(true);
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess(null);
      setShowAnalysis(false);
    } else {
      setCurrentIndex(0);
      setUserGuess(null);
      setShowAnalysis(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'opportunity': return 'text-green-600';
      case 'hype': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getVerdictBg = (verdict: string) => {
    switch (verdict) {
      case 'opportunity': return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'hype': return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
      case 'danger': return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
      default: return 'bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Social Sentiment Meter</CardTitle>
            <CardDescription>
              Analyze social media buzz: opportunity, hype, or danger?
            </CardDescription>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {scenarios.length}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Header */}
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-bold">{scenario.companyName}</h3>
          <p className="text-muted-foreground">(${scenario.ticker})</p>
        </div>

        {/* Hype Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Social Media Hype Level</span>
            <span className={`font-bold ${scenario.hypeLevel > 80 ? 'text-red-600' : scenario.hypeLevel > 50 ? 'text-yellow-600' : 'text-green-600'}`}>
              {scenario.hypeLevel}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full transition-all ${
                scenario.hypeLevel > 80 ? 'bg-red-500' : scenario.hypeLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${scenario.hypeLevel}%` }}
            />
          </div>
        </div>

        {/* Social Posts */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Recent Social Media Activity
          </h4>
          
          {scenario.socialPosts.map((post, index) => (
            <div key={index} className="bg-muted rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold">{post.platform}</span>
                <span>•</span>
                <span>{post.engagement}</span>
              </div>
              <p className="text-sm italic">"{post.message}"</p>
            </div>
          ))}
        </div>

        {/* Fundamentals */}
        <div className="space-y-2">
          <h4 className="font-semibold">Company Fundamentals</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-muted rounded p-2 text-center">
              <p className="text-muted-foreground mb-1">Revenue</p>
              <p className="font-medium">{scenario.fundamentals.revenue}</p>
            </div>
            <div className="bg-muted rounded p-2 text-center">
              <p className="text-muted-foreground mb-1">Profitability</p>
              <p className="font-medium">{scenario.fundamentals.profitability}</p>
            </div>
            <div className="bg-muted rounded p-2 text-center">
              <p className="text-muted-foreground mb-1">Debt</p>
              <p className="font-medium">{scenario.fundamentals.debt}</p>
            </div>
          </div>
        </div>

        {/* Verdict Buttons */}
        {!showAnalysis && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">What's your verdict?</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleGuess('opportunity')}
                variant="outline"
                className="h-20 flex-col"
              >
                <CheckCircle2 className="h-6 w-6 mb-1 text-green-600" />
                <span className="text-xs">Opportunity</span>
              </Button>
              
              <Button
                onClick={() => handleGuess('hype')}
                variant="outline"
                className="h-20 flex-col"
              >
                <TrendingUp className="h-6 w-6 mb-1 text-yellow-600" />
                <span className="text-xs">Risky Hype</span>
              </Button>
              
              <Button
                onClick={() => handleGuess('danger')}
                variant="outline"
                className="h-20 flex-col"
              >
                <AlertTriangle className="h-6 w-6 mb-1 text-red-600" />
                <span className="text-xs">Danger</span>
              </Button>
            </div>
          </div>
        )}

        {/* Analysis */}
        {showAnalysis && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className={`rounded-lg p-4 border ${getVerdictBg(scenario.verdict)}`}>
              <div className="flex items-center gap-2 mb-2">
                {userGuess === scenario.verdict ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                )}
                <h4 className={`font-bold ${getVerdictColor(scenario.verdict)}`}>
                  {userGuess === scenario.verdict ? 'Correct! ' : 'Not quite. '}
                  Verdict: {scenario.verdict.toUpperCase()}
                </h4>
              </div>
              <p className="text-sm mb-3">{scenario.reasoning}</p>
              <div className="bg-white/50 dark:bg-black/20 rounded p-3">
                <p className="text-sm font-medium">💡 Recommendation:</p>
                <p className="text-sm mt-1">{scenario.recommendation}</p>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'Start Over'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialSentimentMeter;
