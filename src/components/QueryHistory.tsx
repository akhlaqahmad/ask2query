import { useState } from 'react';
import { HistoryItem } from '@/hooks/useQueryHistory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Play, 
  Search, 
  Trash2, 
  Download, 
  Upload,
  Calendar,
  Code,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QueryHistoryProps {
  history: HistoryItem[];
  favorites: HistoryItem[];
  onRunQuery: (item: HistoryItem) => void;
  onToggleFavorite: (itemId: string) => void;
  onRemoveFavorite: (itemId: string) => void;
  onClearHistory: () => void;
  onClearFavorites: () => void;
  onSearchHistory: (term: string) => HistoryItem[];
  onSearchFavorites: (term: string) => HistoryItem[];
  onExportHistory: () => void;
  onImportHistory: (file: File) => Promise<void>;
}

export function QueryHistory({
  history,
  favorites,
  onRunQuery,
  onToggleFavorite,
  onRemoveFavorite,
  onClearHistory,
  onClearFavorites,
  onSearchHistory,
  onSearchFavorites,
  onExportHistory,
  onImportHistory
}: QueryHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('history');
  const [isImporting, setIsImporting] = useState(false);

  const filteredHistory = onSearchHistory(searchTerm);
  const filteredFavorites = onSearchFavorites(searchTerm);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      await onImportHistory(file);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  const renderHistoryItem = (item: HistoryItem, showRemoveFavorite = false) => (
    <Card key={item.id} className="mb-3 bg-slate-800/30 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <p className="text-sm text-slate-300 truncate">
                {item.naturalLanguage}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              {formatTimestamp(item.timestamp)}
            </div>
          </div>
          <div className="flex items-center gap-1 ml-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRunQuery(item)}
              className="h-8 w-8 p-0 hover:bg-blue-500/20"
            >
              <Play className="h-4 w-4 text-blue-400" />
            </Button>
            {showRemoveFavorite ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFavorite(item.id)}
                className="h-8 w-8 p-0 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(item.id)}
                className="h-8 w-8 p-0 hover:bg-yellow-500/20"
              >
                <Star 
                  className={`h-4 w-4 ${
                    favorites.some(fav => fav.id === item.id)
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-slate-400'
                  }`} 
                />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-2">
          <Code className="h-4 w-4 text-green-400 flex-shrink-0" />
          <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
            SQL
          </Badge>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-md border border-slate-700">
          <pre className="text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
            {item.generatedSQL}
          </pre>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Query History
          </CardTitle>
          
          {/* Search and Actions */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-slate-100"
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={onExportHistory}
                className="flex items-center gap-2 border-slate-600 hover:bg-slate-700"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isImporting}
                />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isImporting}
                  className="flex items-center gap-2 border-slate-600 hover:bg-slate-700"
                >
                  <Upload className="h-4 w-4" />
                  {isImporting ? 'Importing...' : 'Import'}
                </Button>
              </div>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={activeTab === 'history' ? onClearHistory : onClearFavorites}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear {activeTab === 'history' ? 'History' : 'Favorites'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="history" className="data-[state=active]:bg-slate-600">
                Recent ({filteredHistory.length})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-slate-600">
                Favorites ({filteredFavorites.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="mt-4">
              <ScrollArea className="h-96">
                {filteredHistory.length === 0 ? (
                  <Alert className="border-slate-700 bg-slate-800/30">
                    <AlertDescription className="text-slate-400">
                      {searchTerm ? 'No queries found matching your search.' : 'No query history yet. Start by asking a question!'}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {filteredHistory.map(item => renderHistoryItem(item))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-4">
              <ScrollArea className="h-96">
                {filteredFavorites.length === 0 ? (
                  <Alert className="border-slate-700 bg-slate-800/30">
                    <AlertDescription className="text-slate-400">
                      {searchTerm ? 'No favorite queries found matching your search.' : 'No favorite queries yet. Star some queries to save them here!'}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {filteredFavorites.map(item => renderHistoryItem(item, true))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}