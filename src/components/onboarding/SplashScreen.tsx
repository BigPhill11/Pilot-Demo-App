import React, { useEffect, useState } from 'react';
import PandaLogo from '@/components/icons/PandaLogo';

interface SplashScreenProps {
  onDone: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onDone }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const dismiss = () => {
    setFadeOut(true);
    setTimeout(() => { setVisible(false); onDone(); }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(dismiss, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{
        background: 'linear-gradient(160deg, #1a4d1a 0%, #2d7a2d 45%, #4caf50 100%)',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
      onClick={dismiss}
    >
      {/* Soft glow behind logo */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div
        className="relative mb-8"
        style={{ animation: 'splashPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
      >
        <PandaLogo className="w-36 h-36 rounded-3xl shadow-2xl" />
      </div>

      {/* App name */}
      <h1
        className="text-white font-bold tracking-tight mb-2"
        style={{ fontSize: 32, animation: 'splashFadeUp 0.7s 0.2s ease both' }}
      >
        Phil's Financials
      </h1>

      {/* Tagline */}
      <p
        className="text-green-200 text-base font-medium mb-14"
        style={{ animation: 'splashFadeUp 0.7s 0.35s ease both' }}
      >
        Learn. Earn. Grow.
      </p>

      {/* Tap hint */}
      <p
        className="text-green-300 text-xs absolute bottom-12 tracking-widest uppercase"
        style={{ animation: 'splashFadeUp 0.7s 0.6s ease both' }}
      >
        Tap anywhere to continue
      </p>

      <style>{`
        @keyframes splashPop {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes splashFadeUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
