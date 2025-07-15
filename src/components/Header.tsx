
import { Moon, Sun, Database } from "lucide-react";
import { SchemaBrowserToggle } from "@/components/SchemaBrowserToggle";
import { LogoutButton } from "@/components/LogoutButton";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  isSchemaBrowserOpen?: boolean;
  onToggleSchemaBrowser?: () => void;
}

export function Header({ isSchemaBrowserOpen = false, onToggleSchemaBrowser }: HeaderProps) {
  const { user } = useAuth();

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
            
            {user && <LogoutButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
