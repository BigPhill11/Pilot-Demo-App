import { useState, useEffect } from 'react';

const GUEST_STORAGE_KEY = 'phil_guest_data';

interface GuestData {
  tourCompleted: boolean;
  xp: number;
  coins: number;
  completedLessons: string[];
}

const defaultGuestData: GuestData = {
  tourCompleted: false,
  xp: 0,
  coins: 0,
  completedLessons: [],
};

export const useGuestMode = () => {
  const [guestData, setGuestData] = useState<GuestData>(defaultGuestData);

  useEffect(() => {
    const stored = localStorage.getItem(GUEST_STORAGE_KEY);
    if (stored) {
      try {
        setGuestData(JSON.parse(stored));
      } catch {
        setGuestData(defaultGuestData);
      }
    }
  }, []);

  const updateGuestData = (updates: Partial<GuestData>) => {
    const newData = { ...guestData, ...updates };
    setGuestData(newData);
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(newData));
  };

  const markTourCompleted = () => {
    updateGuestData({ tourCompleted: true });
  };

  const clearGuestData = () => {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    setGuestData(defaultGuestData);
  };

  const getGuestDataForMigration = (): GuestData => {
    return guestData;
  };

  return {
    guestData,
    isGuestTourCompleted: guestData.tourCompleted,
    markTourCompleted,
    updateGuestData,
    clearGuestData,
    getGuestDataForMigration,
  };
};
