import { useState, useEffect } from "react";
import { 
  StreakData, 
  MasteryProgress, 
  StudySession, 
  FlashcardProgress,
  MASTERY_TIERS,
  XP_REWARDS
} from "@/types/flashcard-gamification";
import { UnifiedFlashcard } from "@/data/unified-flashcards";

// Compatibility type alias
type CategorizedFlashcard = UnifiedFlashcard;
import { 
  SM2Progress, 
  calculateSM2, 
  confidenceToQuality, 
  initializeSM2Progress,
  isDueForReview,
  getDueCards,
  sortCardsByPriority
} from "@/utils/spaced-repetition";

const STORAGE_KEYS = {
  STREAK: 'flashcard_streak_data',
  MASTERY: 'flashcard_mastery_data',
  SESSIONS: 'flashcard_sessions',
  DAILY_CHALLENGE: 'daily_challenge_data',
  SM2_PROGRESS: 'flashcard_sm2_progress'
};

export const useFlashcardGamification = (userId: string = 'default') => {
  const [streakData, setStreakData] = useState<StreakData>({
    userId,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: '',
    streakFreezeTokens: 0,
    weeklyStreak: 0,
    monthlyStreak: 0
  });

  const [masteryData, setMasteryData] = useState<Map<string, MasteryProgress>>(new Map());
  const [sm2Progress, setSm2Progress] = useState<Map<string, SM2Progress>>(new Map());
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);

  // Load data from localStorage
  useEffect(() => {
    loadStreakData();
    loadMasteryData();
    loadSM2Progress();
  }, [userId]);

  const loadStreakData = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (saved) {
      const data = JSON.parse(saved);
      setStreakData(data);
      updateStreakIfNeeded(data);
    }
  };

  const loadMasteryData = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.MASTERY);
    if (saved) {
      const data = JSON.parse(saved);
      const map = new Map<string, MasteryProgress>(Object.entries(data));
      setMasteryData(map);
    }
  };

  const loadSM2Progress = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.SM2_PROGRESS);
    if (saved) {
      const data = JSON.parse(saved);
      const map = new Map<string, SM2Progress>(Object.entries(data));
      setSm2Progress(map);
    }
  };

  const saveSM2Progress = () => {
    const obj = Object.fromEntries(sm2Progress);
    localStorage.setItem(STORAGE_KEYS.SM2_PROGRESS, JSON.stringify(obj));
  };

  const updateStreakIfNeeded = (data: StreakData) => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = data.lastStudyDate.split('T')[0];

    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yesterdayStr) {
        // Continue streak
        const newStreak = data.currentStreak + 1;
        updateStreak(newStreak);
      } else if (lastDate < yesterdayStr) {
        // Streak broken - check for freeze token
        if (data.streakFreezeTokens > 0) {
          useStreakFreeze();
        } else {
          resetStreak();
        }
      }
    }
  };

  const updateStreak = (newStreak: number) => {
    const today = new Date().toISOString();
    const updated = {
      ...streakData,
      currentStreak: newStreak,
      longestStreak: Math.max(streakData.longestStreak, newStreak),
      lastStudyDate: today,
      weeklyStreak: streakData.weeklyStreak + 1,
      monthlyStreak: streakData.monthlyStreak + 1
    };
    setStreakData(updated);
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updated));
  };

  const resetStreak = () => {
    const updated = { ...streakData, currentStreak: 0, weeklyStreak: 0 };
    setStreakData(updated);
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updated));
  };

  const useStreakFreeze = () => {
    const updated = {
      ...streakData,
      streakFreezeTokens: streakData.streakFreezeTokens - 1,
      lastStudyDate: new Date().toISOString()
    };
    setStreakData(updated);
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updated));
  };

  const earnStreakFreeze = () => {
    const updated = {
      ...streakData,
      streakFreezeTokens: streakData.streakFreezeTokens + 1
    };
    setStreakData(updated);
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updated));
  };

  const recordCardReview = (
    cardId: string, 
    isCorrect: boolean, 
    confidence: number
  ): { xpEarned: number; tierUpgrade: boolean; nextReviewDays: number } => {
    // Update SM-2 spaced repetition
    const existingSM2 = sm2Progress.get(cardId) || initializeSM2Progress(cardId);
    const quality = confidenceToQuality(isCorrect, confidence);
    const updatedSM2 = calculateSM2(quality, existingSM2);
    
    sm2Progress.set(cardId, updatedSM2);
    setSm2Progress(new Map(sm2Progress));
    saveSM2Progress();
    const existing = masteryData.get(cardId) || {
      cardId,
      correctCount: 0,
      incorrectCount: 0,
      tier: 'new' as const,
      lastReviewed: new Date().toISOString(),
      confidenceRatings: [],
      averageConfidence: 0
    };

    const newCorrect = existing.correctCount + (isCorrect ? 1 : 0);
    const newIncorrect = existing.incorrectCount + (isCorrect ? 0 : 1);
    const confidenceRatings = [...existing.confidenceRatings, confidence];
    const averageConfidence = confidenceRatings.reduce((a, b) => a + b, 0) / confidenceRatings.length;

    const oldTier = existing.tier;
    const newTier = calculateTier(newCorrect);
    const tierUpgrade = newTier !== oldTier && getTierLevel(newTier) > getTierLevel(oldTier);

    const updated: MasteryProgress = {
      ...existing,
      correctCount: newCorrect,
      incorrectCount: newIncorrect,
      tier: newTier,
      lastReviewed: new Date().toISOString(),
      confidenceRatings,
      averageConfidence
    };

    masteryData.set(cardId, updated);
    setMasteryData(new Map(masteryData));
    saveMasteryData();

    // Calculate XP
    const baseXP = isCorrect ? XP_REWARDS.cardReview : 0;
    const multiplier = MASTERY_TIERS[newTier].xpMultiplier;
    const xpEarned = Math.round(baseXP * multiplier);

    // Award freeze token for mastering cards
    if (tierUpgrade && newTier === 'diamond') {
      earnStreakFreeze();
    }

    // Update session
    if (currentSession) {
      updateCurrentSession(isCorrect, confidence, xpEarned);
    }

    return { 
      xpEarned, 
      tierUpgrade,
      nextReviewDays: updatedSM2.interval 
    };
  };

  const calculateTier = (correctCount: number): keyof typeof MASTERY_TIERS => {
    if (correctCount >= MASTERY_TIERS.diamond.minCorrect) return 'diamond';
    if (correctCount >= MASTERY_TIERS.gold.minCorrect) return 'gold';
    if (correctCount >= MASTERY_TIERS.silver.minCorrect) return 'silver';
    if (correctCount >= MASTERY_TIERS.bronze.minCorrect) return 'bronze';
    return 'new';
  };

  const getTierLevel = (tier: keyof typeof MASTERY_TIERS): number => {
    const levels = { new: 0, bronze: 1, silver: 2, gold: 3, diamond: 4 };
    return levels[tier];
  };

  const saveMasteryData = () => {
    const obj = Object.fromEntries(masteryData);
    localStorage.setItem(STORAGE_KEYS.MASTERY, JSON.stringify(obj));
  };

  const startSession = (categoryIds: string[], subsectionIds: string[]) => {
    const session: StudySession = {
      id: Date.now().toString(),
      userId,
      startTime: new Date().toISOString(),
      cardsReviewed: 0,
      correctAnswers: 0,
      averageConfidence: 0,
      categoryIds,
      subsectionIds,
      xpEarned: 0
    };
    setCurrentSession(session);
  };

  const updateCurrentSession = (isCorrect: boolean, confidence: number, xpEarned: number) => {
    if (!currentSession) return;

    const updated = {
      ...currentSession,
      cardsReviewed: currentSession.cardsReviewed + 1,
      correctAnswers: currentSession.correctAnswers + (isCorrect ? 1 : 0),
      averageConfidence: 
        (currentSession.averageConfidence * currentSession.cardsReviewed + confidence) / 
        (currentSession.cardsReviewed + 1),
      xpEarned: currentSession.xpEarned + xpEarned
    };
    setCurrentSession(updated);
  };

  const endSession = () => {
    if (!currentSession) return null;

    const completed = {
      ...currentSession,
      endTime: new Date().toISOString()
    };

    // Save to history
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
    history.push(completed);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(history.slice(-50))); // Keep last 50

    setCurrentSession(null);
    return completed;
  };

  const getMasteryForCard = (cardId: string): MasteryProgress | undefined => {
    return masteryData.get(cardId);
  };

  const getDueCardsForReview = (): string[] => {
    return getDueCards(sm2Progress);
  };

  const getSM2Progress = (cardId: string): SM2Progress | undefined => {
    return sm2Progress.get(cardId);
  };

  const getAllSM2Progress = (): Map<string, SM2Progress> => {
    return sm2Progress;
  };

  const getCardsByPriority = (cardIds: string[]): string[] => {
    const progressList = cardIds
      .map(id => sm2Progress.get(id) || initializeSM2Progress(id))
      .filter(p => isDueForReview(p));
    
    const sorted = sortCardsByPriority(progressList);
    return sorted.map(p => p.cardId);
  };

  return {
    streakData,
    masteryData,
    sm2Progress,
    currentSession,
    recordCardReview,
    startSession,
    endSession,
    useStreakFreeze,
    getMasteryForCard,
    updateStreak,
    getDueCardsForReview,
    getSM2Progress,
    getAllSM2Progress,
    getCardsByPriority
  };
};
