import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RateLimitedButtonProps {
  onClick: () => void | Promise<void>;
  children: React.ReactNode;
  maxClicks?: number;
  windowMs?: number;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const RateLimitedButton: React.FC<RateLimitedButtonProps> = ({
  onClick,
  children,
  maxClicks = 5,
  windowMs = 60000, // 1 minute
  disabled = false,
  className = '',
  variant = 'default'
}) => {
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const validClicks = clickTimes.filter(time => now - time < windowMs);
    
    if (validClicks.length !== clickTimes.length) {
      setClickTimes(validClicks);
    }
    
    setIsRateLimited(validClicks.length >= maxClicks);
  }, [clickTimes, maxClicks, windowMs]);

  const handleClick = async () => {
    const now = Date.now();
    const validClicks = clickTimes.filter(time => now - time < windowMs);
    
    if (validClicks.length >= maxClicks) {
      toast.error(`Too many attempts. Please wait ${Math.ceil(windowMs / 1000)} seconds.`);
      return;
    }

    setClickTimes([...validClicks, now]);
    setIsLoading(true);

    try {
      await onClick();
    } catch (error) {
      console.error('Rate limited action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingTime = Math.max(0, windowMs - (Date.now() - Math.min(...clickTimes)));
  const isButtonDisabled = disabled || isRateLimited || isLoading;

  return (
    <Button
      onClick={handleClick}
      disabled={isButtonDisabled}
      className={className}
      variant={variant}
      title={isRateLimited ? `Rate limited. Try again in ${Math.ceil(remainingTime / 1000)}s` : undefined}
    >
      {isLoading ? 'Loading...' : children}
    </Button>
  );
};