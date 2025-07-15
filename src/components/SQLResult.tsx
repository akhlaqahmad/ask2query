
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SQLResultProps {
  sql: string;
  isVisible: boolean;
}

export function SQLResult({ sql, isVisible }: SQLResultProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "SQL query copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!isVisible || !sql) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Generated SQL Query</h3>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap">
            {sql}
          </pre>
        </div>
        
        <div className="mt-4 text-sm text-slate-400">
          <p>✓ Query generated using GPT-4</p>
          <p>✓ Based on customers, products, and orders schema</p>
        </div>
      </div>
    </div>
  );
}
