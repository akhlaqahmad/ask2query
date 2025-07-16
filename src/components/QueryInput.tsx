
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, RotateCcw, HelpCircle } from "lucide-react";
import { useActivityLogger } from "@/hooks/useActivityLogger";
import { useInputValidation } from "@/hooks/useInputValidation";
import { useDebounce } from "@/hooks/useDebounce";
import { ValidationFeedback } from "./ValidationFeedback";
import { PerformanceIndicator } from "./PerformanceIndicator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading?: boolean;
  cacheSize?: number;
  lastExecutionTime?: number;
}

export function QueryInput({ 
  value, 
  onChange, 
  onGenerate, 
  onReset, 
  isLoading = false,
  cacheSize = 0,
  lastExecutionTime
}: QueryInputProps) {
  const { logActivity } = useActivityLogger();
  const { validateQuery, lastValidation } = useInputValidation();
  const debouncedValue = useDebounce(value, 300);

  // Validate on debounced value change
  React.useEffect(() => {
    if (debouncedValue.trim()) {
      validateQuery(debouncedValue);
    }
  }, [debouncedValue, validateQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl/Cmd + Enter to generate
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
    // Ctrl/Cmd + R to reset
    if (e.key === 'r' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onReset();
    }
  };

  const handleGenerate = () => {
    // Validate before generating
    const validation = validateQuery(value);
    if (!validation.isValid) {
      return; // Don't proceed if validation fails
    }

    logActivity('query_execution', 'Generated SQL from natural language query', {
      query: value,
      queryLength: value.length,
      hasValidationWarnings: validation.warnings.length > 0
    });
    onGenerate();
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="relative">
              <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your data... (e.g., 'Show top 3 customers by revenue')"
                className={`min-h-32 text-lg glass-input text-slate-100 placeholder:text-slate-400 focus:border-blue-500 resize-none rounded-xl ${
                  lastValidation && !lastValidation.isValid ? 'border-red-400/50 focus:border-red-400' : ''
                }`}
              />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-slate-400 hover:text-slate-300 cursor-help transition-colors duration-200" />
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-sm glass-card">
                    <div className="space-y-2 text-xs text-slate-200">
                      <div><strong>Keyboard Shortcuts:</strong></div>
                      <div>• Ctrl/Cmd + Enter: Generate SQL</div>
                      <div>• Ctrl/Cmd + R: Reset form</div>
                      <div className="pt-2 border-t border-slate-600">
                        <strong>Tips:</strong> Be specific about what you want to find. 
                        Use phrases like "Show me...", "Find all...", "Count the..."
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
                <Sparkles className="h-5 w-5 text-slate-400" />
              </div>
            </div>

            {/* Validation Feedback */}
            <ValidationFeedback 
              validation={lastValidation} 
              isVisible={!!value.trim() && !!lastValidation}
            />
          
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
            <div className="space-y-2">
              <div className="text-sm text-slate-400">
                <p>Powered by GPT-4 • Supports customers, products, and orders tables</p>
                <p className="text-xs mt-1 text-slate-500">Press Cmd/Ctrl + Enter to generate • Cmd/Ctrl + R to reset</p>
              </div>
              
              {/* Performance Indicator */}
              <PerformanceIndicator 
                cacheSize={cacheSize}
                isLoading={isLoading}
                lastExecutionTime={lastExecutionTime || undefined}
                queryLength={value.length}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={onReset}
                variant="outline"
                size="lg"
                className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200 hover:text-slate-100 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Button
                onClick={handleGenerate}
                disabled={!value.trim() || isLoading || (lastValidation && !lastValidation.isValid)}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-40 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Generate SQL</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
