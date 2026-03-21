
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarketPredictions } from '@/hooks/useMarketPredictions';
import { TrendingUp, TrendingDown, Minus, Target, Users, Calendar } from 'lucide-react';

const MarketPredictionGame: React.FC = () => {
  const {
    predictions,
    communityPredictions,
    loading,
    submitting,
    submitPrediction,
    getCurrentWeekPrediction
  } = useMarketPredictions();

  const [sentiment, setSentiment] = useState<'bullish' | 'bearish' | 'neutral'>('neutral');
  const [reasoning, setReasoning] = useState('');
  const [predictedPrice, setPredictedPrice] = useState<string>('');

  const currentPrediction = getCurrentWeekPrediction();

  const handleSubmit = async () => {
    if (!reasoning.trim()) {
      return;
    }

    const price = predictedPrice ? parseFloat(predictedPrice) : undefined;
    await submitPrediction(sentiment, reasoning.trim(), price);
    
    // Reset form
    setReasoning('');
    setPredictedPrice('');
    setSentiment('neutral');
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'bearish':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          📈 Predict the Market
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Where will the S&P 500 end by Friday? Share your prediction and reasoning!
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="predict" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predict">Make Prediction</TabsTrigger>
            <TabsTrigger value="community">Community Predictions</TabsTrigger>
            <TabsTrigger value="history">Your History</TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="mt-4">
            {currentPrediction ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Your prediction for this week:</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {getSentimentIcon(currentPrediction.sentiment)}
                    <Badge className={getSentimentColor(currentPrediction.sentiment)}>
                      {currentPrediction.sentiment.toUpperCase()}
                    </Badge>
                    {currentPrediction.predicted_price && (
                      <span className="text-sm text-muted-foreground">
                        Target: ${currentPrediction.predicted_price}
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{currentPrediction.reasoning}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  You can update your prediction until Friday market close.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Market Sentiment</label>
                  <div className="flex gap-2">
                    <Button
                      variant={sentiment === 'bullish' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSentiment('bullish')}
                      className="flex items-center gap-1"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Bullish
                    </Button>
                    <Button
                      variant={sentiment === 'neutral' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSentiment('neutral')}
                      className="flex items-center gap-1"
                    >
                      <Minus className="h-4 w-4" />
                      Neutral
                    </Button>
                    <Button
                      variant={sentiment === 'bearish' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSentiment('bearish')}
                      className="flex items-center gap-1"
                    >
                      <TrendingDown className="h-4 w-4" />
                      Bearish
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Target (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={predictedPrice}
                    onChange={(e) => setPredictedPrice(e.target.value)}
                    placeholder="e.g. 4500.00"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Reasoning *
                  </label>
                  <Textarea
                    value={reasoning}
                    onChange={(e) => setReasoning(e.target.value)}
                    placeholder="Explain your prediction in a few sentences. What factors are influencing your outlook?"
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!reasoning.trim() || submitting}
                  className="w-full"
                >
                  {submitting ? 'Submitting...' : 'Submit Prediction'}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="community" className="mt-4">
            <div className="space-y-3">
              {communityPredictions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No community predictions yet. Be the first to share your outlook!
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Community Predictions</span>
                  </div>
                  {communityPredictions.slice(0, 10).map((prediction) => (
                    <div key={prediction.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        {getSentimentIcon(prediction.sentiment)}
                        <Badge className={getSentimentColor(prediction.sentiment)}>
                          {prediction.sentiment.toUpperCase()}
                        </Badge>
                        {prediction.predicted_price && (
                          <span className="text-xs text-muted-foreground">
                            ${prediction.predicted_price}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(prediction.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{prediction.reasoning}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-3">
              {predictions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No predictions yet. Make your first prediction above!
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Your Prediction History</span>
                  </div>
                  {predictions.map((prediction) => (
                    <div key={prediction.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        {getSentimentIcon(prediction.sentiment)}
                        <Badge className={getSentimentColor(prediction.sentiment)}>
                          {prediction.sentiment.toUpperCase()}
                        </Badge>
                        {prediction.predicted_price && (
                          <span className="text-xs text-muted-foreground">
                            Target: ${prediction.predicted_price}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          Week ending: {new Date(prediction.week_ending).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{prediction.reasoning}</p>
                      {prediction.points_earned > 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          +{prediction.points_earned} points earned!
                        </Badge>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketPredictionGame;
