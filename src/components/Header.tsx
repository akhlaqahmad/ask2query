
import { Moon, Sun, Database, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SchemaBrowserToggle } from "@/components/SchemaBrowserToggle";
import { LogoutButton } from "@/components/LogoutButton";
import { QueryHistoryDropdown } from "@/components/QueryHistoryDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { HistoryItem } from "@/hooks/useQueryHistory";

interface HeaderProps {
  isSchemaBrowserOpen?: boolean;
  onToggleSchemaBrowser?: () => void;
  history?: HistoryItem[];
  favorites?: HistoryItem[];
  onRunQuery?: (item: HistoryItem) => void;
  onToggleFavorite?: (itemId: string) => void;
  onOpenFullHistory?: () => void;
}

export function Header({ 
  isSchemaBrowserOpen = false, 
  onToggleSchemaBrowser,
  history = [],
  favorites = [],
  onRunQuery,
  onToggleFavorite,
  onOpenFullHistory
}: HeaderProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Text2SQL</h1>
              <p className="text-sm text-slate-300 dark:text-slate-400">Transform Natural Language to SQL</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {onToggleSchemaBrowser && (
              <SchemaBrowserToggle
                isOpen={isSchemaBrowserOpen}
                onToggle={onToggleSchemaBrowser}
              />
            )}
            
            {user && onRunQuery && onToggleFavorite && onOpenFullHistory && (
              <QueryHistoryDropdown
                history={history}
                favorites={favorites}
                onRunQuery={onRunQuery}
                onToggleFavorite={onToggleFavorite}
                onOpenFullHistory={onOpenFullHistory}
              />
            )}
            
            {user && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/profile')}
                  className="gap-2 text-white hover:bg-white/10"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
