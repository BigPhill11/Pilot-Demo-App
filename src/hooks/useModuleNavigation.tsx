import { useState, useCallback } from 'react';
import { getModuleById, getLevelById } from '@/data/ModuleRegistry';

export interface NavigationState {
  currentModule: string | null;
  currentLevel: number | null;
  isAdminOverride: boolean;
}

export const useModuleNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentModule: null,
    currentLevel: null,
    isAdminOverride: false
  });

  const navigateToLevel = useCallback((moduleId: string, levelId: number) => {
    setNavigationState({
      currentModule: moduleId,
      currentLevel: levelId,
      isAdminOverride: false
    });
  }, []);

  const canAccessLevel = useCallback((moduleId: string, levelId: number, userProgress?: any) => {
    
    // Check user progress for normal users
    const module = getModuleById(moduleId);
    if (!module) return false;
    
    const level = getLevelById(moduleId, levelId);
    if (!level) return false;
    
    // First level is always accessible
    if (levelId === 1) return true;
    
    // Check prerequisites
    if (level.prerequisites) {
      return level.prerequisites.every(prereqId => {
        // Check if prerequisite level is completed
        return userProgress?.[moduleId]?.[prereqId]?.completed === true;
      });
    }
    
    // Check if previous level is completed
    return userProgress?.[moduleId]?.[levelId - 1]?.completed === true;
  }, []);

  const getModuleProgress = useCallback((moduleId: string, userProgress?: any) => {
    const module = getModuleById(moduleId);
    if (!module) return { completed: 0, total: 0, percentage: 0 };
    
    const completed = module.levels.filter(level => 
      userProgress?.[moduleId]?.[level.id]?.completed === true
    ).length;
    
    return {
      completed,
      total: module.levels.length,
      percentage: Math.round((completed / module.levels.length) * 100)
    };
  }, []);

  const getAllModulesProgress = useCallback((userProgress?: any) => {
    const allModules = [
      'personal-finance',
      'investment-banking', 
      'company-discovery',
      'interactive-hub',
      'asset-management',
      'management-consulting'
    ];
    
    return allModules.map(moduleId => ({
      moduleId,
      ...getModuleProgress(moduleId, userProgress)
    }));
  }, [getModuleProgress]);

  return {
    navigationState,
    navigateToLevel,
    canAccessLevel,
    getModuleProgress,
    getAllModulesProgress
  };
};