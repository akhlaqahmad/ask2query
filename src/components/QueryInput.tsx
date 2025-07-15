
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function QueryInput({ value, onChange, onGenerate, onReset, isLoading = false }: QueryInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="space-y-6">
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your data... (e.g., 'Show top 3 customers by revenue')"
              className="min-h-32 text-lg bg-white/10 dark:bg-black/20 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none rounded-xl"
            />
            <div className="absolute top-4 right-4 text-slate-400">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-slate-400 dark:text-slate-500">
              <p>Powered by GPT-4 • Supports customers, products, and orders tables</p>
              <p className="text-xs mt-1">Press Cmd/Ctrl + Enter to generate</p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={onReset}
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Button
                onClick={onGenerate}
                disabled={!value.trim() || isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-40"
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
  );
}
