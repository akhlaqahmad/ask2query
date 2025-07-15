
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";

interface ExampleQueriesProps {
  onSelectExample: (query: string) => void;
  onAutoGenerate?: (query: string) => void;
  isLoading?: boolean;
}

export function ExampleQueries({ onSelectExample, onAutoGenerate, isLoading = false }: ExampleQueriesProps) {
  const examples = [
    "Show all customers from USA",
    "Find total revenue by product category",
    "List top 5 orders by amount",
    "Show monthly sales trends",
    "Find customers who haven't ordered recently"
  ];

  const handleExampleClick = (example: string) => {
    onSelectExample(example);
  };

  const handleAutoGenerate = (example: string) => {
    if (onAutoGenerate) {
      onAutoGenerate(example);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Try These Examples</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              <button
                onClick={() => handleExampleClick(example)}
                className="flex-1 text-left text-slate-300 hover:text-white transition-colors text-sm"
                disabled={isLoading}
              >
                {example}
              </button>
              
              <Button
                onClick={() => handleAutoGenerate(example)}
                variant="ghost"
                size="sm"
                disabled={isLoading}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-300 hover:text-blue-200 border border-blue-500/30"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-blue-300/30 border-t-blue-300 rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="h-3 w-3 mr-1" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-slate-500 text-center">
          Click an example to fill the input, or click "Generate" to auto-create SQL
        </div>
      </div>
    </div>
  );
}
