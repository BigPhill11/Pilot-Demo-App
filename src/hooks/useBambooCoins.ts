import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { xpToCoins, calculateCoinReward, XpSource } from '@/lib/coin-conversion';
import { toast } from 'sonner';

interface CoinBalance {
  total_coins: number;
  lifetime_earned: number;
  total_spent: number;
  last_updated: string;
}

interface XpTransaction {
  id: string;
  xp_amount: number;
  coins_awarded: number;
  source: XpSource;
  source_details?: string;
  created_at: string;
}

interface CoinSourceBreakdown {
  [key: string]: number;
}

export function useBambooCoins() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<CoinBalance>({
    total_coins: 0,
    lifetime_earned: 0,
    total_spent: 0,
    last_updated: new Date().toISOString(),
  });
  const [recentTransactions, setRecentTransactions] = useState<XpTransaction[]>([]);
  const [sourceBreakdown, setSourceBreakdown] = useState<CoinSourceBreakdown>({});
  const [loading, setLoading] = useState(true);

  // Fetch coin balance
  const fetchBalance = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_bamboo_coins' as any)
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching coin balance:', error);
        return;
      }

      if (data) {
        setBalance(data as unknown as CoinBalance);
      } else {
        // Initialize balance for new user
        const { data: newBalance, error: insertError } = await supabase
          .from('user_bamboo_coins' as any)
          .insert({
            user_id: user.id,
            total_coins: 0,
            lifetime_earned: 0,
            total_spent: 0,
          })
          .select()
          .single();

        if (!insertError && newBalance) {
          setBalance(newBalance as unknown as CoinBalance);
        }
      }
    } catch (error) {
      console.error('Error in fetchBalance:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch recent transactions
  const fetchTransactions = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('xp_transactions' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      if (data) {
        setRecentTransactions(data as unknown as XpTransaction[]);
        
        // Calculate source breakdown
        const breakdown: CoinSourceBreakdown = {};
        (data as unknown as XpTransaction[]).forEach((tx) => {
          if (!breakdown[tx.source]) {
            breakdown[tx.source] = 0;
          }
          breakdown[tx.source] += tx.coins_awarded;
        });
        setSourceBreakdown(breakdown);
      }
    } catch (error) {
      console.error('Error in fetchTransactions:', error);
    }
  }, [user]);

  // Award coins for XP earned
  const awardCoinsForXp = useCallback(
    async (xpEarned: number, source: XpSource, sourceDetails?: string, previousTotalXp?: number) => {
      if (!user || xpEarned <= 0) return 0;

      try {
        // Calculate coins to award
        const coinsAwarded = previousTotalXp 
          ? calculateCoinReward(xpEarned, previousTotalXp)
          : Math.floor(xpEarned / 10);

        if (coinsAwarded <= 0) return 0;

        // Log transaction
        const { error: txError } = await supabase
          .from('xp_transactions' as any)
          .insert({
            user_id: user.id,
            xp_amount: xpEarned,
            coins_awarded: coinsAwarded,
            source,
            source_details: sourceDetails,
          });

        if (txError) {
          console.error('Error logging XP transaction:', txError);
          return 0;
        }

        // Update coin balance
        const { error: updateError } = await supabase
          .from('user_bamboo_coins' as any)
          .update({
            total_coins: balance.total_coins + coinsAwarded,
            lifetime_earned: balance.lifetime_earned + coinsAwarded,
            last_updated: new Date().toISOString(),
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating coin balance:', updateError);
          return 0;
        }

        // Update local state
        setBalance((prev) => ({
          ...prev,
          total_coins: prev.total_coins + coinsAwarded,
          lifetime_earned: prev.lifetime_earned + coinsAwarded,
          last_updated: new Date().toISOString(),
        }));

        // Show toast notification
        toast.success(`+${coinsAwarded} 🪙 Bamboo Coins earned!`, {
          description: `${xpEarned} XP from ${source.replace(/_/g, ' ')}`,
        });

        // Refresh transactions
        fetchTransactions();

        return coinsAwarded;
      } catch (error) {
        console.error('Error in awardCoinsForXp:', error);
        return 0;
      }
    },
    [user, balance, fetchTransactions]
  );

  // Spend coins
  const spendCoins = useCallback(
    async (amount: number, itemName: string) => {
      if (!user || amount <= 0 || balance.total_coins < amount) {
        toast.error('Insufficient Bamboo Coins');
        return false;
      }

      try {
        const { error } = await supabase
          .from('user_bamboo_coins' as any)
          .update({
            total_coins: balance.total_coins - amount,
            total_spent: balance.total_spent + amount,
            last_updated: new Date().toISOString(),
          })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error spending coins:', error);
          toast.error('Failed to complete purchase');
          return false;
        }

        // Update local state
        setBalance((prev) => ({
          ...prev,
          total_coins: prev.total_coins - amount,
          total_spent: prev.total_spent + amount,
          last_updated: new Date().toISOString(),
        }));

        toast.success(`Purchased ${itemName}!`, {
          description: `-${amount} 🪙 Bamboo Coins`,
        });

        return true;
      } catch (error) {
        console.error('Error in spendCoins:', error);
        toast.error('Failed to complete purchase');
        return false;
      }
    },
    [user, balance]
  );

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchTransactions]);

  return {
    balance,
    recentTransactions,
    sourceBreakdown,
    loading,
    awardCoinsForXp,
    spendCoins,
    refresh: () => {
      fetchBalance();
      fetchTransactions();
    },
  };
}
