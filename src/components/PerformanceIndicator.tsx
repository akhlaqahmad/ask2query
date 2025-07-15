import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Zap, Clock, Database, TrendingUp } from 'lucide-react';

interface PerformanceIndicatorProps {
  cacheSize: number;
  isLoading?: boolean;
  lastExecutionTime?: number;
  queryLength?: number;
}

export function PerformanceIndicator({ 
  cacheSize, 
  isLoading = false, 
  lastExecutionTime,
  queryLength = 0 
}: PerformanceIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getPerformanceScore = () => {
    let score = 100;
    
    // Deduct points for long queries
    if (queryLength > 500) score -= 20;
    else if (queryLength > 200) score -= 10;
    
    // Add points for cache usage
    if (cacheSize > 10) score += 5;
    
    // Execution time factor
    if (lastExecutionTime) {
      if (lastExecutionTime > 2000) score -= 30;
      else if (lastExecutionTime > 1000) score -= 15;
      else if (lastExecutionTime < 500) score += 10;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 border-green-400/50 bg-green-400/10';
    if (score >= 60) return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
    return 'text-red-400 border-red-400/50 bg-red-400/10';
  };

  const score = getPerformanceScore();

  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 text-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={`${getScoreColor(score)} transition-all duration-300`}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Performance: {score}%
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <div className="font-medium">Performance Factors:</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Query Length:</span>
                  <span className={queryLength > 200 ? 'text-yellow-400' : 'text-green-400'}>
                    {queryLength} chars
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cache Size:</span>
                  <span className="text-blue-400">{cacheSize} entries</span>
                </div>
                {lastExecutionTime && (
                  <div className="flex justify-between">
                    <span>Last Execution:</span>
                    <span className={lastExecutionTime > 1000 ? 'text-yellow-400' : 'text-green-400'}>
                      {lastExecutionTime}ms
                    </span>
                  </div>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10">
              <Database className="h-3 w-3 mr-1" />
              {cacheSize} cached
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-xs">
              {cacheSize} queries cached for faster responses
            </div>
          </TooltipContent>
        </Tooltip>

        {isLoading && (
          <Badge variant="outline" className="text-purple-400 border-purple-400/50 bg-purple-400/10">
            <div className="w-3 h-3 border border-purple-400/50 border-t-purple-400 rounded-full animate-spin mr-1" />
            Processing...
          </Badge>
        )}

        {lastExecutionTime && !isLoading && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-slate-400 border-slate-400/50 bg-slate-400/10">
                <Clock className="h-3 w-3 mr-1" />
                {lastExecutionTime}ms
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="text-xs">
                Last query execution time
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}