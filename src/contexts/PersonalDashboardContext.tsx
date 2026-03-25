import React, { createContext, useContext, useState, useCallback } from 'react';

interface PersonalDashboardContextType {
  isOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;
  toggleDashboard: () => void;
}

const PersonalDashboardContext = createContext<PersonalDashboardContextType | undefined>(undefined);

export const usePersonalDashboard = (): PersonalDashboardContextType => {
  const context = useContext(PersonalDashboardContext);
  if (context === undefined) {
    throw new Error('usePersonalDashboard must be used within a PersonalDashboardProvider');
  }
  return context;
};

interface PersonalDashboardProviderProps {
  children: React.ReactNode;
}

export const PersonalDashboardProvider: React.FC<PersonalDashboardProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDashboard = useCallback(() => setIsOpen(true), []);
  const closeDashboard = useCallback(() => setIsOpen(false), []);
  const toggleDashboard = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <PersonalDashboardContext.Provider value={{ isOpen, openDashboard, closeDashboard, toggleDashboard }}>
      {children}
    </PersonalDashboardContext.Provider>
  );
};
