
import { Database, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSQLiteDatabaseContext } from "@/contexts/SQLiteDatabaseContext";

interface SchemaBrowserToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SchemaBrowserToggle({ isOpen, onToggle }: SchemaBrowserToggleProps) {
  const { schema } = useSQLiteDatabaseContext();

  if (!schema) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="flex items-center gap-2"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Schema</span>
            <Badge variant="secondary" className="ml-1">
              {schema.totalTables}
            </Badge>
            <PanelRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isOpen ? 'Hide' : 'Show'} database schema browser
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
