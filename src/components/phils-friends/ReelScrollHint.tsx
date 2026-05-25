import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const HINT_KEY = 'phils_friends_swipe_hint_seen';

interface ReelScrollHintProps {
  visible: boolean;
  onDismiss: () => void;
}

const ReelScrollHint: React.FC<ReelScrollHintProps> = ({ visible, onDismiss }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShow(false);
      return;
    }
    try {
      if (localStorage.getItem(HINT_KEY) === '1') return;
      setShow(true);
    } catch {
      setShow(true);
    }
  }, [visible]);

  const dismiss = () => {
    try {
      localStorage.setItem(HINT_KEY, '1');
    } catch {
      // ignore
    }
    setShow(false);
    onDismiss();
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={dismiss}
      className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-auto animate-bounce"
      aria-label="Swipe up for next clip"
    >
      <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-green-800 shadow-lg ring-1 ring-green-200">
        Swipe up for the next pro
      </span>
      <ChevronUp className="h-5 w-5 text-primary" />
    </button>
  );
};

export function markReelSwipeHintSeen(): void {
  try {
    localStorage.setItem(HINT_KEY, '1');
  } catch {
    // ignore
  }
}

export default ReelScrollHint;
