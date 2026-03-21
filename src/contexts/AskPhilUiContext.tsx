import React, { createContext, useContext, useState, useCallback } from 'react';

interface AskPhilUiContextType {
  isOpen: boolean;
  openAskPhil: () => void;
  closeAskPhil: () => void;
  toggleAskPhil: () => void;
}

const AskPhilUiContext = createContext<AskPhilUiContextType | undefined>(undefined);

export const useAskPhilUi = (): AskPhilUiContextType => {
  const context = useContext(AskPhilUiContext);
  if (context === undefined) {
    throw new Error('useAskPhilUi must be used within an AskPhilUiProvider');
  }
  return context;
};

interface AskPhilUiProviderProps {
  children: React.ReactNode;
}

export const AskPhilUiProvider: React.FC<AskPhilUiProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAskPhil = useCallback(() => setIsOpen(true), []);
  const closeAskPhil = useCallback(() => setIsOpen(false), []);
  const toggleAskPhil = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <AskPhilUiContext.Provider value={{ isOpen, openAskPhil, closeAskPhil, toggleAskPhil }}>
      {children}
    </AskPhilUiContext.Provider>
  );
};
