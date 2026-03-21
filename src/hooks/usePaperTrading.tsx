
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

type Portfolio = Tables<'paper_portfolios'>;
type Position = Tables<'paper_positions'>;
type Transaction = Tables<'paper_transactions'>;

export const usePaperTrading = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      initializePortfolio();
    }
  }, [user]);

  const initializePortfolio = async () => {
    if (!user) return;

    try {
      // Try to get existing portfolio
      let { data: existingPortfolio, error } = await supabase
        .from('paper_portfolios')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No portfolio exists, create one
        const { data: newPortfolio, error: createError } = await supabase
          .from('paper_portfolios')
          .insert({
            user_id: user.id,
            cash: 10000,
            total_value: 10000
          })
          .select()
          .single();

        if (createError) throw createError;
        existingPortfolio = newPortfolio;
      } else if (error) {
        throw error;
      }

      setPortfolio(existingPortfolio);
      await fetchPositions(existingPortfolio.id);
      await fetchTransactions(existingPortfolio.id);
    } catch (error) {
      console.error('Error initializing portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPositions = async (portfolioId: string) => {
    try {
      const { data, error } = await supabase
        .from('paper_positions')
        .select('*')
        .eq('portfolio_id', portfolioId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPositions(data || []);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const fetchTransactions = async (portfolioId: string) => {
    try {
      const { data, error } = await supabase
        .from('paper_transactions')
        .select('*')
        .eq('portfolio_id', portfolioId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const executeTrade = async (
    symbol: string,
    shares: number,
    price: number,
    type: 'buy' | 'sell'
  ) => {
    if (!portfolio) return;

    const totalAmount = shares * price;

    try {
      if (type === 'buy') {
        if (portfolio.cash < totalAmount) {
          toast.error('Insufficient cash for this trade');
          return;
        }

        // Update or create position
        const existingPosition = positions.find(p => p.symbol === symbol);
        
        if (existingPosition) {
          const newShares = existingPosition.shares + shares;
          const newAvgPrice = ((existingPosition.avg_price * existingPosition.shares) + totalAmount) / newShares;

          await supabase
            .from('paper_positions')
            .update({
              shares: newShares,
              avg_price: newAvgPrice,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPosition.id);
        } else {
          await supabase
            .from('paper_positions')
            .insert({
              portfolio_id: portfolio.id,
              symbol,
              asset_type: 'stock',
              shares,
              avg_price: price
            });
        }

        // Update portfolio cash
        await supabase
          .from('paper_portfolios')
          .update({
            cash: portfolio.cash - totalAmount,
            updated_at: new Date().toISOString()
          })
          .eq('id', portfolio.id);

      } else {
        // Sell logic
        const position = positions.find(p => p.symbol === symbol);
        if (!position || position.shares < shares) {
          toast.error('Insufficient shares for this trade');
          return;
        }

        if (position.shares === shares) {
          // Remove position entirely
          await supabase
            .from('paper_positions')
            .delete()
            .eq('id', position.id);
        } else {
          // Update position
          await supabase
            .from('paper_positions')
            .update({
              shares: position.shares - shares,
              updated_at: new Date().toISOString()
            })
            .eq('id', position.id);
        }

        // Update portfolio cash
        await supabase
          .from('paper_portfolios')
          .update({
            cash: portfolio.cash + totalAmount,
            updated_at: new Date().toISOString()
          })
          .eq('id', portfolio.id);
      }

      // Record transaction
      await supabase
        .from('paper_transactions')
        .insert({
          portfolio_id: portfolio.id,
          symbol,
          asset_type: 'stock',
          transaction_type: type,
          shares,
          price,
          total_amount: totalAmount
        });

      toast.success(`${type === 'buy' ? 'Bought' : 'Sold'} ${shares} shares of ${symbol}!`);
      
      // Refresh data
      await initializePortfolio();
    } catch (error) {
      console.error('Error executing trade:', error);
      toast.error('Failed to execute trade');
    }
  };

  const calculateTotalValue = (stockPrices: Record<string, number>) => {
    if (!portfolio) return 0;

    const positionsValue = positions.reduce((total, position) => {
      const currentPrice = stockPrices[position.symbol] || position.avg_price;
      return total + (position.shares * currentPrice);
    }, 0);

    return portfolio.cash + positionsValue;
  };

  return {
    portfolio,
    positions,
    transactions,
    loading,
    executeTrade,
    calculateTotalValue,
    refreshPortfolio: initializePortfolio
  };
};
