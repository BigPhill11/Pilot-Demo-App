import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart, Star, Clock, Ban } from 'lucide-react';
import { SwipeAction } from './hooks/useTinderSwipe';
import { motion } from 'framer-motion';

interface SwipeActionsProps {
  onSwipe: (action: SwipeAction) => void;
  superLikesRemaining: number;
  disabled?: boolean;
}

const SwipeActions: React.FC<SwipeActionsProps> = ({ onSwipe, superLikesRemaining, disabled }) => {
  const actions = [
    {
      action: 'pass' as SwipeAction,
      icon: X,
      label: 'Pass',
      color: 'bg-red-500 hover:bg-red-600',
      xp: '+5 XP',
    },
    {
      action: 'skip' as SwipeAction,
      icon: Clock,
      label: 'Skip',
      color: 'bg-gray-500 hover:bg-gray-600',
      xp: '0 XP',
    },
    {
      action: 'super_like' as SwipeAction,
      icon: Star,
      label: 'Super!',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      xp: '+25 XP',
      badge: superLikesRemaining > 0 ? `${superLikesRemaining} left` : 'None left',
      disabled: superLikesRemaining <= 0,
    },
    {
      action: 'like' as SwipeAction,
      icon: Heart,
      label: 'Like',
      color: 'bg-green-500 hover:bg-green-600',
      xp: '+10 XP',
    },
  ];

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      {actions.map((item) => {
        const Icon = item.icon;
        const isDisabled = disabled || item.disabled;
        
        return (
          <motion.div
            key={item.action}
            whileHover={{ scale: isDisabled ? 1 : 1.1 }}
            whileTap={{ scale: isDisabled ? 1 : 0.95 }}
          >
            <Button
              size="lg"
              onClick={() => onSwipe(item.action)}
              disabled={isDisabled}
              className={`${item.color} text-white rounded-full w-16 h-16 p-0 relative group`}
            >
              <Icon className="h-6 w-6" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {item.label} {item.xp}
                  {item.badge && (
                    <div className="text-[10px] text-gray-300">{item.badge}</div>
                  )}
                </div>
              </div>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SwipeActions;
