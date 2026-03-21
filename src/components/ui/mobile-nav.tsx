import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface MobileTabNavProps {
  items: MobileNavItem[];
  activeValue: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const MobileTabNav: React.FC<MobileTabNavProps> = ({
  items,
  activeValue,
  onValueChange,
  className
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border safe-area-pb",
      className
    )}>
      <nav className="flex items-center justify-around py-2 px-1">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-lg transition-all",
              activeValue === item.value
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium truncate max-w-[60px]">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Mobile container with proper padding and safe areas
interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  hasBottomNav?: boolean;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  className,
  hasBottomNav = false
}) => {
  return (
    <div className={cn(
      "px-4 sm:px-6",
      hasBottomNav && "pb-20", // Account for bottom nav
      className
    )}>
      {children}
    </div>
  );
};

// Touch-friendly card with minimum height
interface TouchCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const TouchCard: React.FC<TouchCardProps> = ({
  children,
  className,
  onClick,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full text-left p-4 min-h-[56px] rounded-xl border transition-all",
        "active:scale-[0.98] touch-manipulation",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "hover:shadow-md",
        className
      )}
    >
      {children}
    </button>
  );
};
