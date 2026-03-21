import { useState, useEffect } from 'react';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export type SwipeAction = 'pass' | 'like' | 'super_like' | 'skip' | 'never';

interface SwipeResult {
  xpEarned: number;
  action: SwipeAction;
  companyId: string;
}

export const useTinderSwipe = (companies: CompanyProfile[]) => {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCompanies, setSwipedCompanies] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<string[]>([]);

  const getXPForAction = (action: SwipeAction): number => {
    const xpMap: Record<SwipeAction, number> = {
      pass: 5,
      like: 10,
      super_like: 25,
      skip: 0,
      never: -5,
    };
    return xpMap[action];
  };

  const handleSwipe = async (action: SwipeAction): Promise<SwipeResult> => {
    const company = companies[currentIndex];
    if (!company) {
      return { xpEarned: 0, action, companyId: '' };
    }

    const xpEarned = getXPForAction(action);

    // Add to swiped set
    setSwipedCompanies(prev => new Set(prev).add(company.id));

    // Add to matches if liked or super liked
    if (action === 'like' || action === 'super_like') {
      setMatches(prev => [...prev, company.id]);
    }

    // Save to database if user is logged in
    if (user) {
      try {
        await supabase.from('user_company_interactions').insert({
          user_id: user.id,
          company_id: company.id,
          interaction_type: action === 'like' ? 'like' : action === 'super_like' ? 'super_like' : 'dislike',
        });
      } catch (error) {
        console.error('Error saving swipe:', error);
      }
    } else {
      // Save to localStorage for non-authenticated users
      const savedMatches = localStorage.getItem('tinderMatches');
      const matchIds = savedMatches ? JSON.parse(savedMatches) : [];
      if (action === 'like' || action === 'super_like') {
        matchIds.push(company.id);
        localStorage.setItem('tinderMatches', JSON.stringify(matchIds));
      }
    }

    // Move to next company (unless skipped)
    if (action !== 'skip') {
      setCurrentIndex(prev => Math.min(prev + 1, companies.length - 1));
    }

    return {
      xpEarned,
      action,
      companyId: company.id,
    };
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setSwipedCompanies(new Set());
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentCompany = companies[currentIndex];
  const isLastCard = currentIndex >= companies.length - 1;
  const allSwiped = swipedCompanies.size >= companies.length;

  return {
    currentCompany,
    currentIndex,
    handleSwipe,
    resetDeck,
    goToPrevious,
    goToNext,
    isLastCard,
    allSwiped,
    swipedCompanies,
    matches,
    totalCompanies: companies.length,
  };
};
