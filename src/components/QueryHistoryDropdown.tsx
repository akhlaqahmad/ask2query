import { useState } from 'react';
import { HistoryItem } from '@/hooks/useQueryHistory';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  History, 
  Play, 
  Star, 
  Clock, 
  MessageSquare,
  Code,
  Settings
} from 'lucide-react';

interface QueryHistoryDropdownProps {
  history: HistoryItem[];
  favorites: HistoryItem[];
  onRunQuery: (item: HistoryItem) => void;
  onToggleFavorite: (itemId: string) => void;
  onOpenFullHistory: () => void;
}

export function QueryHistoryDropdown({
  history,
  favorites,
  onRunQuery,
  onToggleFavorite,
  onOpenFullHistory
}: QueryHistoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const recentHistory = history.slice(0, 5); // Show only 5 most recent
  const recentFavorites = favorites.slice(0, 3); // Show only 3 most recent favorites

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const renderHistoryItem = (item: HistoryItem, isFavorite = false) => (
    <div key={item.id} className="p-3 border-b border-slate-700 last:border-b-0">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-3 w-3 text-blue-400 flex-shrink-0" />
            <p className="text-xs text-slate-300 font-medium leading-tight">
              {truncateText(item.naturalLanguage, 40)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            {formatTimestamp(item.timestamp)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRunQuery(item);
              setIsOpen(false);
            }}
            className="h-6 w-6 p-0 hover:bg-blue-500/20"
          >
            <Play className="h-3 w-3 text-blue-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className="h-6 w-6 p-0 hover:bg-yellow-500/20"
          >
            <Star 
              className={`h-3 w-3 ${
                isFavorite || favorites.some(fav => fav.id === item.id)
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-slate-400'
              }`} 
            />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Code className="h-3 w-3 text-green-400 flex-shrink-0" />
        <p className="text-xs text-slate-400 font-mono truncate">
          {truncateText(item.generatedSQL, 45)}
        </p>
      </div>
    </div>
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-white hover:bg-white/10 relative"
        >
          <History className="h-4 w-4" />
          History
          {(history.length > 0 || favorites.length > 0) && (
            <Badge 
              variant="secondary" 
              className="ml-1 h-4 min-w-4 p-0 text-xs bg-blue-500 text-white border-0"
            >
              {history.length + favorites.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 bg-slate-800 border-slate-700 p-0"
        align="end"
        sideOffset={5}
      >
        {/* Favorites Section */}
        {recentFavorites.length > 0 && (
          <>
            <DropdownMenuLabel className="px-3 py-2 text-xs text-slate-400 bg-slate-900/50 flex items-center gap-2">
              <Star className="h-3 w-3 text-yellow-400" />
              Favorite Queries
            </DropdownMenuLabel>
            <div className="max-h-32 overflow-y-auto">
              {recentFavorites.map(item => renderHistoryItem(item, true))}
            </div>
            <DropdownMenuSeparator className="bg-slate-700" />
          </>
        )}

        {/* Recent History Section */}
        {recentHistory.length > 0 && (
          <>
            <DropdownMenuLabel className="px-3 py-2 text-xs text-slate-400 bg-slate-900/50 flex items-center gap-2">
              <Clock className="h-3 w-3 text-blue-400" />
              Recent Queries
            </DropdownMenuLabel>
            <ScrollArea className="max-h-40">
              {recentHistory.map(item => renderHistoryItem(item))}
            </ScrollArea>
            <DropdownMenuSeparator className="bg-slate-700" />
          </>
        )}

        {/* Empty State */}
        {history.length === 0 && favorites.length === 0 && (
          <div className="p-4 text-center text-slate-400 text-sm">
            <History className="h-8 w-8 mx-auto mb-2 text-slate-500" />
            <p>No query history yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Start asking questions to build your history
            </p>
          </div>
        )}

        {/* View All Button */}
        {(history.length > 0 || favorites.length > 0) && (
          <DropdownMenuItem
            className="mx-2 my-2 justify-center text-center cursor-pointer focus:bg-slate-700"
            onClick={() => {
              onOpenFullHistory();
              setIsOpen(false);
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            View All & Manage
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}