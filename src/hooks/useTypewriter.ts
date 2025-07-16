
import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function useTypewriter({ 
  text, 
  speed = 50, 
  delay = 0,
  loop = false 
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      
      if (loop) {
        const resetTimeout = setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          setIsComplete(false);
        }, 2000);
        
        return () => clearTimeout(resetTimeout);
      }
    }
  }, [currentIndex, text, speed, delay, loop]);

  return { displayText, isComplete };
}
