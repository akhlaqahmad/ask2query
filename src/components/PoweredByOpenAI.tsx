import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles, ExternalLink } from 'lucide-react';

export function PoweredByOpenAI() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <Badge 
              variant="outline" 
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30 text-green-300 hover:border-green-400/50 cursor-pointer"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by OpenAI GPT-4
              <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
            </Badge>
          </a>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2 text-xs">
            <div className="font-medium">OpenAI GPT-4</div>
            <div>Advanced language model that understands natural language and generates accurate SQL queries</div>
            <div className="pt-1 border-t opacity-70">
              Click to learn more about OpenAI
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}