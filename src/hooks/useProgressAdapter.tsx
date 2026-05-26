import { useUnifiedProgress, ModuleProgress } from '@/hooks/useUnifiedProgress';

// Legacy adapter for consulting progress
export const useConsultingProgressAdapter = () => {
  const levelHooks = Array.from({ length: 7 }, (_, i) => 
    useUnifiedProgress({
      moduleId: `level_${i + 1}`,
      moduleType: 'consulting',
      courseId: 'management-consulting'
    })
  );

  const moduleProgress = levelHooks.reduce((acc, hook, index) => {
    if (hook.progress) {
      const level = index + 1;
      acc[level] = {
        level,
        overviewCompleted: hook.progress.detailedProgress.overview_completed || false,
        termsProgress: hook.progress.detailedProgress.terms_progress || {
          totalTerms: 0,
          masteredTerms: [],
          completionPercentage: 0
        },
        miniGamesProgress: hook.progress.detailedProgress.mini_games_progress || {},
        totalProgress: hook.progress.progressPercentage,
        lastAccessed: hook.progress.lastAccessed
      };
    }
    return acc;
  }, {} as Record<number, any>);

  const saveModuleProgress = async (level: number, updates: any) => {
    const hook = levelHooks[level - 1];
    if (!hook) return;
    
    // Update the detailed progress with the new data
    const currentProgress = hook.progress?.detailedProgress || {};
    const updatedProgress = { ...currentProgress, ...updates };
    
    // Calculate total progress
    const overviewWeight = 20;
    const termsWeight = 40;
    const miniGamesWeight = 40;

    const overviewProgress = updatedProgress.overviewCompleted ? 100 : 0;
    const termsProgress = updatedProgress.termsProgress?.completionPercentage || 0;
    
    const gameIds = Object.keys(updatedProgress.miniGamesProgress || {});
    const completedGames = gameIds.filter(id => updatedProgress.miniGamesProgress[id].completed).length;
    const miniGamesProgress = gameIds.length > 0 ? (completedGames / gameIds.length) * 100 : 0;

    const totalProgress = Math.round(
      (overviewProgress * overviewWeight / 100) +
      (termsProgress * termsWeight / 100) +
      (miniGamesProgress * miniGamesWeight / 100)
    );

    // Update the detailed progress
    await hook.updateDetailedProgress('overview_completed', updatedProgress.overviewCompleted);
    await hook.updateDetailedProgress('terms_progress', updatedProgress.termsProgress);
    await hook.updateDetailedProgress('mini_games_progress', updatedProgress.miniGamesProgress);
    
    // Update the overall progress percentage
    await hook.updateProgress(totalProgress);
  };

  return {
    moduleProgress,
    loading: levelHooks.some(hook => hook.loading),
    saveModuleProgress,
    markOverviewComplete: (level: number) => saveModuleProgress(level, { overviewCompleted: true }),
    updateTermsProgress: (level: number, masteredTerms: string[], totalTerms: number) => {
      const completionPercentage = totalTerms > 0 ? Math.round((masteredTerms.length / totalTerms) * 100) : 0;
      return saveModuleProgress(level, {
        termsProgress: { totalTerms, masteredTerms, completionPercentage }
      });
    },
    saveMiniGameProgress: (level: number, gameId: string, score: number, completed: boolean = true) => {
      const currentProgress = moduleProgress[level] || { miniGamesProgress: {} };
      const currentGameProgress = currentProgress.miniGamesProgress[gameId];
      
      const updatedMiniGamesProgress = {
        ...currentProgress.miniGamesProgress,
        [gameId]: {
          completed,
          score,
          completedAt: new Date().toISOString(),
          attempts: currentGameProgress ? currentGameProgress.attempts + 1 : 1
        }
      };

      return saveModuleProgress(level, { miniGamesProgress: updatedMiniGamesProgress });
    },
    getLevelProgress: (level: number) => moduleProgress[level] || {
      level,
      overviewCompleted: false,
      termsProgress: { totalTerms: 0, masteredTerms: [], completionPercentage: 0 },
      miniGamesProgress: {},
      totalProgress: 0,
      lastAccessed: new Date().toISOString()
    },
    isGameCompleted: (level: number, gameId: string) => {
      const progress = moduleProgress[level];
      return progress?.miniGamesProgress[gameId]?.completed || false;
    },
    getGameScore: (level: number, gameId: string) => {
      const progress = moduleProgress[level];
      return progress?.miniGamesProgress[gameId]?.score || 0;
    },
    getTotalCompletedLevels: () => Object.values(moduleProgress).filter((p: any) => p.totalProgress >= 100).length,
    getOverallProgress: () => {
      const totalLevels = 7;
      const completedLevels = Object.values(moduleProgress).filter((p: any) => p.totalProgress >= 100).length;
      return Math.round((completedLevels / totalLevels) * 100);
    },
    refetch: () => Promise.resolve()
  };
};

// Legacy adapter for VC progress - similar structure to consulting
export const useVCProgressAdapter = () => {
  const levelHooks = Array.from({ length: 7 }, (_, i) => 
    useUnifiedProgress({
      moduleId: `level_${i + 1}`,
      moduleType: 'venture_capital',
      courseId: 'venture-capital'
    })
  );

  // Transform to match the legacy format
  const moduleProgress = levelHooks
    .map((hook, index) => {
      if (!hook.progress) return null;
      return {
        level: index + 1,
        overviewCompleted: hook.progress.detailedProgress.overview_completed || false,
        termsProgress: hook.progress.detailedProgress.terms_progress || {
          totalTerms: 0,
          masteredTerms: [],
          completionPercentage: 0
        },
        miniGamesProgress: hook.progress.detailedProgress.mini_games_progress || {},
        totalProgress: hook.progress.progressPercentage,
        lastAccessed: hook.progress.lastAccessed
      };
    })
    .filter(Boolean);

  const saveModuleProgress = async (level: number, updates: any) => {
    const hook = levelHooks[level - 1];
    if (!hook) return;
    
    // Similar implementation to consulting adapter
    const currentProgress = hook.progress?.detailedProgress || {};
    const updatedProgress = { ...currentProgress, ...updates };
    
    // Calculate total progress using the same weights
    const overviewWeight = 20;
    const termsWeight = 40;
    const gamesWeight = 40;

    const overviewScore = updatedProgress.overviewCompleted ? overviewWeight : 0;
    const termsScore = (updatedProgress.termsProgress?.completionPercentage || 0 / 100) * termsWeight;
    
    const gameKeys = Object.keys(updatedProgress.miniGamesProgress || {});
    const completedGames = gameKeys.filter(key => updatedProgress.miniGamesProgress[key].completed).length;
    const gamesScore = gameKeys.length > 0 ? (completedGames / gameKeys.length) * gamesWeight : 0;

    const totalProgress = Math.round(overviewScore + termsScore + gamesScore);

    // Update detailed progress
    for (const [key, value] of Object.entries(updatedProgress)) {
      await hook.updateDetailedProgress(key, value);
    }
    
    await hook.updateProgress(totalProgress);
  };

  return {
    moduleProgress,
    isLoading: levelHooks.some(hook => hook.loading),
    saveModuleProgress,
    markOverviewComplete: (level: number) => saveModuleProgress(level, { overviewCompleted: true }),
    updateTermsProgress: (level: number, termsProgress: any) => saveModuleProgress(level, { termsProgress }),
    saveMiniGameProgress: (level: number, gameId: string, score: number) => {
      const currentLevel = moduleProgress.find(p => p?.level === level);
      const updatedGamesProgress = {
        ...currentLevel?.miniGamesProgress,
        [gameId]: { completed: true, score }
      };
      return saveModuleProgress(level, { miniGamesProgress: updatedGamesProgress });
    },
    getLevelProgress: (level: number) => moduleProgress.find(p => p?.level === level) || {
      level,
      overviewCompleted: false,
      termsProgress: { totalTerms: 0, masteredTerms: [], completionPercentage: 0 },
      miniGamesProgress: {},
      totalProgress: 0,
      lastAccessed: new Date().toISOString()
    },
    isGameCompleted: (level: number, gameId: string) => {
      const progress = moduleProgress.find(p => p?.level === level);
      return progress?.miniGamesProgress[gameId]?.completed || false;
    },
    getGameScore: (level: number, gameId: string) => {
      const progress = moduleProgress.find(p => p?.level === level);
      return progress?.miniGamesProgress[gameId]?.score || 0;
    },
    getTotalCompletedLevels: () => moduleProgress.filter(p => p && p.totalProgress >= 100).length,
    getOverallProgress: () => {
      if (moduleProgress.length === 0) return 0;
      const totalProgress = moduleProgress.reduce((sum, level) => sum + (level?.totalProgress || 0), 0);
      return Math.round(totalProgress / moduleProgress.length);
    },
    loadAllProgress: () => Promise.resolve()
  };
};