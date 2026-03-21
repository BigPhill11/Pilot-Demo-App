import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useBambooCoins } from '@/hooks/useBambooCoins';
import { ShopItem, SHOP_CATALOG } from '@/lib/shop-catalog';
import { toast } from 'sonner';

interface Purchase {
  id: string;
  item_id: string;
  purchased_at: string;
  expires_at?: string;
  is_active: boolean;
}

export function useShopItems() {
  const { user } = useAuth();
  const { balance, spendCoins, refresh: refreshBalance } = useBambooCoins();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [activePowerUps, setActivePowerUps] = useState<Purchase[]>([]);
  const [inventory, setInventory] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user purchases
  const fetchPurchases = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('shop_purchases' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('purchased_at', { ascending: false });

      if (error) {
        console.error('Error fetching purchases:', error);
        return;
      }

      if (data) {
        const purchaseList = data as unknown as Purchase[];
        setPurchases(purchaseList);

        // Filter active power-ups (consumables with future expiry)
        const now = new Date();
        const active = purchaseList.filter((p) => {
          if (!p.expires_at) return false;
          const expiryDate = new Date(p.expires_at);
          return expiryDate > now && p.is_active;
        });
        setActivePowerUps(active);

        // Permanent items inventory
        const permanent = purchaseList.filter((p) => !p.expires_at && p.is_active);
        setInventory(permanent);
      }
    } catch (error) {
      console.error('Error in fetchPurchases:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Check if user owns an item
  const ownsItem = useCallback(
    (itemId: string): boolean => {
      return purchases.some((p) => p.item_id === itemId && p.is_active);
    },
    [purchases]
  );

  // Check if item is active (for consumables)
  const isItemActive = useCallback(
    (itemId: string): boolean => {
      const purchase = activePowerUps.find((p) => p.item_id === itemId);
      if (!purchase || !purchase.expires_at) return false;
      return new Date(purchase.expires_at) > new Date();
    },
    [activePowerUps]
  );

  // Purchase an item
  const purchaseItem = useCallback(
    async (item: ShopItem): Promise<boolean> => {
      if (!user) {
        toast.error('Please sign in to make purchases');
        return false;
      }

      // Check balance
      if (balance.total_coins < item.price) {
        toast.error('Insufficient Bamboo Coins', {
          description: `You need ${item.price - balance.total_coins} more coins`,
        });
        return false;
      }

      // Check if already owned (for permanent items)
      if (item.type === 'permanent' && ownsItem(item.id)) {
        toast.error('You already own this item');
        return false;
      }

      try {
        // Spend coins
        const success = await spendCoins(item.price, item.name);
        if (!success) return false;

        // Calculate expiry for consumables
        let expiresAt: string | undefined;
        if (item.type === 'consumable' && item.duration) {
          const expiry = new Date();
          expiry.setMinutes(expiry.getMinutes() + item.duration);
          expiresAt = expiry.toISOString();
        }

        // Record purchase
        const { error } = await supabase
          .from('shop_purchases' as any)
          .insert({
            user_id: user.id,
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            item_effect: item.effect,
            price_paid: item.price,
            expires_at: expiresAt,
            is_active: true,
          });

        if (error) {
          console.error('Error recording purchase:', error);
          toast.error('Purchase failed. Please contact support.');
          return false;
        }

        // Success!
        toast.success(`Purchased ${item.name}!`, {
          description: item.type === 'consumable' && item.duration
            ? `Active for ${item.duration} minutes`
            : 'Added to your inventory',
        });

        // Refresh data
        fetchPurchases();
        refreshBalance();

        return true;
      } catch (error) {
        console.error('Error in purchaseItem:', error);
        toast.error('Purchase failed');
        return false;
      }
    },
    [user, balance, ownsItem, spendCoins, fetchPurchases, refreshBalance]
  );

  // Activate a consumable from inventory (future feature)
  const activateItem = useCallback(
    async (purchaseId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from('shop_purchases' as any)
          .update({ is_active: true })
          .eq('id', purchaseId)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error activating item:', error);
          return false;
        }

        toast.success('Item activated!');
        fetchPurchases();
        return true;
      } catch (error) {
        console.error('Error in activateItem:', error);
        return false;
      }
    },
    [user, fetchPurchases]
  );

  // Get remaining time for active power-up
  const getRemainingTime = useCallback((itemId: string): number => {
    const purchase = activePowerUps.find((p) => p.item_id === itemId);
    if (!purchase || !purchase.expires_at) return 0;

    const now = new Date();
    const expiry = new Date(purchase.expires_at);
    const remaining = expiry.getTime() - now.getTime();
    return Math.max(0, Math.floor(remaining / 60000)); // minutes
  }, [activePowerUps]);

  useEffect(() => {
    fetchPurchases();

    // Refresh every minute to update active power-ups
    const interval = setInterval(fetchPurchases, 60000);
    return () => clearInterval(interval);
  }, [fetchPurchases]);

  return {
    purchases,
    activePowerUps,
    inventory,
    loading,
    ownsItem,
    isItemActive,
    purchaseItem,
    activateItem,
    getRemainingTime,
    refresh: fetchPurchases,
  };
}
