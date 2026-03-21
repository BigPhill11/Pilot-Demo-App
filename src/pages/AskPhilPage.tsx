
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAskPhilUi } from '@/contexts/AskPhilUiContext';

const AskPhilPage: React.FC = () => {
  const navigate = useNavigate();
  const { openAskPhil } = useAskPhilUi();

  useEffect(() => {
    openAskPhil();
    navigate('/', { replace: true });
  }, [openAskPhil, navigate]);

  return null;
};

export default AskPhilPage;
