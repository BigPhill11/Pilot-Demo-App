export type AchievementCategory = 
  | 'learning'
  | 'mastery'
  | 'consistency'
  | 'social'
  | 'collector'
  | 'elite';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  requirement: number;
  rewardCoins: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  hidden?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Earn your first 100 XP',
    category: 'learning',
    icon: '🌱',
    requirement: 100,
    rewardCoins: 5,
    rarity: 'common'
  },
  {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Earn 1,000 XP',
    category: 'learning',
    icon: '📚',
    requirement: 1000,
    rewardCoins: 25,
    rarity: 'common'
  },
  {
    id: 'wisdom_warrior',
    name: 'Wisdom Warrior',
    description: 'Earn 5,000 XP',
    category: 'learning',
    icon: '⚔️',
    requirement: 5000,
    rewardCoins: 100,
    rarity: 'rare'
  },
  {
    id: 'enlightened_master',
    name: 'Enlightened Master',
    description: 'Earn 10,000 XP',
    category: 'learning',
    icon: '🎓',
    requirement: 10000,
    rewardCoins: 250,
    rarity: 'epic'
  },
  {
    id: 'legend_ascended',
    name: 'Legend Ascended',
    description: 'Earn 50,000 XP',
    category: 'learning',
    icon: '👑',
    requirement: 50000,
    rewardCoins: 1000,
    rarity: 'legendary'
  },

  // Mastery Achievements
  {
    id: 'quiz_novice',
    name: 'Quiz Novice',
    description: 'Complete 5 quizzes',
    category: 'mastery',
    icon: '✍️',
    requirement: 5,
    rewardCoins: 10,
    rarity: 'common'
  },
  {
    id: 'quiz_expert',
    name: 'Quiz Expert',
    description: 'Complete 25 quizzes',
    category: 'mastery',
    icon: '🎯',
    requirement: 25,
    rewardCoins: 50,
    rarity: 'rare'
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Get 100% on 10 quizzes',
    category: 'mastery',
    icon: '💯',
    requirement: 10,
    rewardCoins: 100,
    rarity: 'epic'
  },
  {
    id: 'module_complete',
    name: 'Module Master',
    description: 'Complete 5 modules',
    category: 'mastery',
    icon: '📖',
    requirement: 5,
    rewardCoins: 75,
    rarity: 'rare'
  },
  {
    id: 'story_reader',
    name: 'Story Reader',
    description: 'Complete 10 stories',
    category: 'mastery',
    icon: '📜',
    requirement: 10,
    rewardCoins: 30,
    rarity: 'common'
  },

  // Consistency Achievements
  {
    id: 'daily_dedication',
    name: 'Daily Dedication',
    description: 'Maintain a 7-day streak',
    category: 'consistency',
    icon: '🔥',
    requirement: 7,
    rewardCoins: 50,
    rarity: 'common'
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 30-day streak',
    category: 'consistency',
    icon: '⚡',
    requirement: 30,
    rewardCoins: 200,
    rarity: 'rare'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Maintain a 100-day streak',
    category: 'consistency',
    icon: '💪',
    requirement: 100,
    rewardCoins: 500,
    rarity: 'epic'
  },
  {
    id: 'eternal_flame',
    name: 'Eternal Flame',
    description: 'Maintain a 365-day streak',
    category: 'consistency',
    icon: '🌟',
    requirement: 365,
    rewardCoins: 2000,
    rarity: 'legendary'
  },

  // Social Achievements
  {
    id: 'top_ten',
    name: 'Top Ten',
    description: 'Reach top 10 on the leaderboard',
    category: 'social',
    icon: '🏆',
    requirement: 10,
    rewardCoins: 100,
    rarity: 'rare'
  },
  {
    id: 'podium_finish',
    name: 'Podium Finish',
    description: 'Reach top 3 on the leaderboard',
    category: 'social',
    icon: '🥇',
    requirement: 3,
    rewardCoins: 250,
    rarity: 'epic'
  },
  {
    id: 'emperor',
    name: 'Emperor',
    description: 'Reach #1 on the leaderboard',
    category: 'social',
    icon: '👑',
    requirement: 1,
    rewardCoins: 500,
    rarity: 'legendary'
  },

  // Collector Achievements
  {
    id: 'coin_collector',
    name: 'Coin Collector',
    description: 'Earn 1,000 Bamboo Coins',
    category: 'collector',
    icon: '💰',
    requirement: 1000,
    rewardCoins: 50,
    rarity: 'common'
  },
  {
    id: 'treasure_hunter',
    name: 'Treasure Hunter',
    description: 'Earn 10,000 Bamboo Coins',
    category: 'collector',
    icon: '💎',
    requirement: 10000,
    rewardCoins: 500,
    rarity: 'epic'
  },
  {
    id: 'first_purchase',
    name: 'First Purchase',
    description: 'Make your first shop purchase',
    category: 'collector',
    icon: '🛒',
    requirement: 1,
    rewardCoins: 10,
    rarity: 'common'
  },
  {
    id: 'big_spender',
    name: 'Big Spender',
    description: 'Spend 5,000 Bamboo Coins',
    category: 'collector',
    icon: '💸',
    requirement: 5000,
    rewardCoins: 250,
    rarity: 'rare'
  },
  {
    id: 'shop_collector',
    name: 'Shop Collector',
    description: 'Own 10 shop items',
    category: 'collector',
    icon: '🎁',
    requirement: 10,
    rewardCoins: 100,
    rarity: 'rare'
  },

  // Elite Achievements
  {
    id: 'achievement_hunter',
    name: 'Achievement Hunter',
    description: 'Unlock 10 achievements',
    category: 'elite',
    icon: '🎖️',
    requirement: 10,
    rewardCoins: 100,
    rarity: 'rare'
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Unlock 25 achievements',
    category: 'elite',
    icon: '🏅',
    requirement: 25,
    rewardCoins: 500,
    rarity: 'epic'
  },
  {
    id: 'legend',
    name: 'Living Legend',
    description: 'Unlock all achievements',
    category: 'elite',
    icon: '⭐',
    requirement: 50,
    rewardCoins: 2000,
    rarity: 'legendary',
    hidden: true
  }
];

export const ACHIEVEMENT_CATEGORIES = {
  learning: { name: 'Learning', color: 'bg-blue-500', icon: '📚' },
  mastery: { name: 'Mastery', color: 'bg-purple-500', icon: '🎯' },
  consistency: { name: 'Consistency', color: 'bg-orange-500', icon: '🔥' },
  social: { name: 'Social', color: 'bg-green-500', icon: '🏆' },
  collector: { name: 'Collector', color: 'bg-amber-500', icon: '💰' },
  elite: { name: 'Elite', color: 'bg-red-500', icon: '⭐' }
};

export const RARITY_STYLES = {
  common: {
    border: 'border-gray-400',
    glow: 'shadow-gray-400/20',
    text: 'text-gray-600 dark:text-gray-400'
  },
  rare: {
    border: 'border-blue-400',
    glow: 'shadow-blue-400/30',
    text: 'text-blue-600 dark:text-blue-400'
  },
  epic: {
    border: 'border-purple-400',
    glow: 'shadow-purple-400/40',
    text: 'text-purple-600 dark:text-purple-400'
  },
  legendary: {
    border: 'border-amber-400',
    glow: 'shadow-amber-400/50',
    text: 'text-amber-600 dark:text-amber-400'
  }
};
