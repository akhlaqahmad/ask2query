
import { Moon, Sun, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { SchemaBrowserToggle } from "@/components/SchemaBrowserToggle";

interface HeaderProps {
  isSchemaBrowserOpen?: boolean;
  onToggleSchemaBrowser?: () => void;
}

export function Header({ isSchemaBrowserOpen = false, onToggleSchemaBrowser }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ask2Query</h1>
              <p className="text-sm text-slate-300 dark:text-slate-400">Turn English into SQL</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {onToggleSchemaBrowser && (
              <SchemaBrowserToggle
                isOpen={isSchemaBrowserOpen}
                onToggle={onToggleSchemaBrowser}
              />
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:bg-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
