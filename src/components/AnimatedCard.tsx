
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Card } from '@/components/ui/card';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '' 
}: AnimatedCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const getTransformClass = () => {
    if (isIntersecting) return 'translate-x-0 translate-y-0 opacity-100';
    
    switch (direction) {
      case 'up': return 'translate-y-8 opacity-0';
      case 'down': return '-translate-y-8 opacity-0';
      case 'left': return 'translate-x-8 opacity-0';
      case 'right': return '-translate-x-8 opacity-0';
      default: return 'translate-y-8 opacity-0';
    }
  };

  return (
    <Card
      ref={ref}
      className={`transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 group ${getTransformClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  );
}
