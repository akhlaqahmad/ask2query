
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CountdownOverlayProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function CountdownOverlay({ onComplete, onSkip }: CountdownOverlayProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-white/20 text-center max-w-md mx-4">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4 animate-scale-in" />
          <h2 className="text-2xl font-bold text-white mb-2">Upload Successful!</h2>
          <p className="text-slate-300">Your database has been processed successfully.</p>
        </div>
        
        <div className="mb-6">
          <div className="text-4xl font-bold text-blue-400 mb-2">{countdown}</div>
          <p className="text-slate-300">Redirecting to query page...</p>
        </div>
        
        <Button
          onClick={onSkip}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Go Now
        </Button>
      </div>
    </div>
  );
}
