import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  target: number;
  progress: number;
  completed: boolean;
  xpReward: number;
  category: string;
}

const CHALLENGE_TYPES = [
  {
    id: 'tech_swiper',
    name: 'Tech Explorer',
    description: 'Swipe on 10 tech companies',
    icon: '💻',
    target: 10,
    xpReward: 100,
    category: 'Technology',
    filter: (company: any) => company.industry?.toLowerCase().includes('tech') || 
                              company.sector?.toLowerCase().includes('tech'),
  },
  {
    id: 'dividend_hunter',
    name: 'Dividend Hunter',
    description: 'Find 5 dividend-paying stocks',
    icon: '💰',
    target: 5,
    xpReward: 150,
    category: 'Finance',
    filter: (company: any) => company.dividendYield && company.dividendYield > 0,
  },
  {
    id: 'global_explorer',
    name: 'Global Explorer',
    description: 'Swipe on companies from 3 different countries',
    icon: '🌍',
    target: 3,
    xpReward: 120,
    category: 'International',
    filter: null, // Special handling needed
  },
  {
    id: 'speed_swiper',
    name: 'Speed Swiper',
    description: 'Swipe on 20 companies today',
    icon: '⚡',
    target: 20,
    xpReward: 80,
    category: 'General',
    filter: null,
  },
  {
    id: 'value_seeker',
    name: 'Value Seeker',
    description: 'Like 5 undervalued stocks (P/E < 20)',
    icon: '💎',
    target: 5,
    xpReward: 150,
    category: 'Analysis',
    filter: (company: any) => company.peRatio && company.peRatio < 20,
  },
];

export const useDailyChallenges = () => {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyChallenge();
  }, [user]);

  const loadDailyChallenge = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Load from localStorage for all users (simplified approach)
    const saved = localStorage.getItem('dailyChallenge');
    const savedDate = localStorage.getItem('dailyChallengeDate');
    
    if (saved && savedDate === today) {
      setChallenge(JSON.parse(saved));
    } else {
      generateNewChallengeLocal(today);
    }
    
    setLoading(false);
  };

  const generateNewChallengeLocal = (date: string) => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const challengeType = CHALLENGE_TYPES[dayOfYear % CHALLENGE_TYPES.length];

    const newChallenge: DailyChallenge = {
      id: challengeType.id,
      name: challengeType.name,
      description: challengeType.description,
      icon: challengeType.icon,
      target: challengeType.target,
      progress: 0,
      completed: false,
      xpReward: challengeType.xpReward,
      category: challengeType.category,
    };

    setChallenge(newChallenge);
    localStorage.setItem('dailyChallenge', JSON.stringify(newChallenge));
    localStorage.setItem('dailyChallengeDate', date);
  };

  const updateChallengeProgress = async (company: any, action: string) => {
    if (!challenge || challenge.completed) return;

    const challengeType = CHALLENGE_TYPES.find(c => c.id === challenge.id);
    if (!challengeType) return;

    let shouldIncrement = false;

    // Check if this action counts toward the challenge
    if (challenge.id === 'speed_swiper') {
      shouldIncrement = true; // Any swipe counts
    } else if (challenge.id === 'tech_swiper' && challengeType.filter) {
      shouldIncrement = challengeType.filter(company);
    } else if (challenge.id === 'dividend_hunter' && action === 'like' && challengeType.filter) {
      shouldIncrement = challengeType.filter(company);
    } else if (challenge.id === 'value_seeker' && action === 'like' && challengeType.filter) {
      shouldIncrement = challengeType.filter(company);
    }

    if (shouldIncrement) {
      const newProgress = Math.min(challenge.progress + 1, challenge.target);
      const completed = newProgress >= challenge.target;

      setChallenge(prev => prev ? { ...prev, progress: newProgress, completed } : null);

      // Always save to localStorage
      const updated = { ...challenge, progress: newProgress, completed };
      localStorage.setItem('dailyChallenge', JSON.stringify(updated));

      return { completed, xpReward: completed ? challenge.xpReward : 0 };
    }

    return { completed: false, xpReward: 0 };
  };

  return {
    challenge,
    loading,
    updateChallengeProgress,
  };
};
