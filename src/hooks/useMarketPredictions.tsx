
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

type MarketPrediction = Tables<'market_predictions'>;

export const useMarketPredictions = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [communityPredictions, setCommunityPredictions] = useState<MarketPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPredictions();
      fetchCommunityPredictions();
    }
  }, [user]);

  const fetchPredictions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('market_predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPredictions(data || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityPredictions = async () => {
    try {
      const { data, error } = await supabase
        .from('market_predictions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setCommunityPredictions(data || []);
    } catch (error) {
      console.error('Error fetching community predictions:', error);
    }
  };

  const getNextFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday.toISOString().split('T')[0];
  };

  const submitPrediction = async (
    sentiment: 'bullish' | 'bearish' | 'neutral',
    reasoning: string,
    predictedPrice?: number
  ) => {
    if (!user) return;

    setSubmitting(true);
    try {
      const weekEnding = getNextFriday();

      const { error } = await supabase
        .from('market_predictions')
        .upsert({
          user_id: user.id,
          week_ending: weekEnding,
          predicted_price: predictedPrice,
          sentiment,
          reasoning,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,week_ending'
        });

      if (error) throw error;

      toast.success('Market prediction submitted successfully! 🎯');
      await fetchPredictions();
      await fetchCommunityPredictions();
    } catch (error) {
      console.error('Error submitting prediction:', error);
      toast.error('Failed to submit prediction');
    } finally {
      setSubmitting(false);
    }
  };

  const getCurrentWeekPrediction = () => {
    const nextFriday = getNextFriday();
    return predictions.find(p => p.week_ending === nextFriday);
  };

  return {
    predictions,
    communityPredictions,
    loading,
    submitting,
    submitPrediction,
    getCurrentWeekPrediction,
    refreshPredictions: fetchPredictions
  };
};
