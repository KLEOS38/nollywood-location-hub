
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface RateLimiterProps {
  maxAttempts: number;
  windowMs: number;
  children: (canProceed: boolean, remainingAttempts: number) => React.ReactNode;
}

const RateLimiter: React.FC<RateLimiterProps> = ({ 
  maxAttempts, 
  windowMs, 
  children 
}) => {
  const [attempts, setAttempts] = useState<number[]>([]);
  const [canProceed, setCanProceed] = useState(true);

  useEffect(() => {
    const now = Date.now();
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    setAttempts(validAttempts);
    setCanProceed(validAttempts.length < maxAttempts);
    
    if (validAttempts.length >= maxAttempts) {
      toast.error(`Too many attempts. Please wait ${Math.ceil(windowMs / 1000)} seconds.`);
    }
  }, [attempts, maxAttempts, windowMs]);

  const recordAttempt = () => {
    setAttempts(prev => [...prev, Date.now()]);
  };

  return (
    <>
      {children(canProceed, Math.max(0, maxAttempts - attempts.length))}
      <div style={{ display: 'none' }} onClick={recordAttempt} />
    </>
  );
};

export default RateLimiter;
