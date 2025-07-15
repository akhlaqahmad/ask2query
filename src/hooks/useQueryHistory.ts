import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
  id: string;
  naturalLanguage: string;
  generatedSQL: string;
  timestamp: Date;
  isFavorite: boolean;
  results?: any;
}

const MAX_HISTORY_ITEMS = 10;
const HISTORY_STORAGE_KEY = 'text2sql-query-history';
const FAVORITES_STORAGE_KEY = 'text2sql-favorites';

export function useQueryHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<HistoryItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      }
      
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading query history:', error);
    }
  }, []);

  // Save to localStorage whenever history or favorites change
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving query history:', error);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addToHistory = useCallback((naturalLanguage: string, generatedSQL: string, results?: any) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      naturalLanguage,
      generatedSQL,
      timestamp: new Date(),
      isFavorite: false,
      results
    };

    setHistory(prev => {
      // Remove duplicate if exists (same natural language query)
      const filtered = prev.filter(item => item.naturalLanguage !== naturalLanguage);
      
      // Add new item at the beginning and keep only MAX_HISTORY_ITEMS
      const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      return newHistory;
    });
  }, []);

  const toggleFavorite = useCallback((itemId: string) => {
    // Find item in history
    const historyItem = history.find(item => item.id === itemId);
    if (!historyItem) return;

    const isFavorited = favorites.some(fav => fav.id === itemId);

    if (isFavorited) {
      // Remove from favorites
      setFavorites(prev => prev.filter(fav => fav.id !== itemId));
    } else {
      // Add to favorites
      const favoriteItem = { ...historyItem, isFavorite: true };
      setFavorites(prev => [favoriteItem, ...prev]);
    }

    // Update history item favorite status
    setHistory(prev => prev.map(item => 
      item.id === itemId ? { ...item, isFavorite: !isFavorited } : item
    ));
  }, [history, favorites]);

  const removeFavorite = useCallback((itemId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== itemId));
    setHistory(prev => prev.map(item => 
      item.id === itemId ? { ...item, isFavorite: false } : item
    ));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    setHistory(prev => prev.map(item => ({ ...item, isFavorite: false })));
  }, []);

  const searchHistory = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return history;
    
    const term = searchTerm.toLowerCase();
    return history.filter(item => 
      item.naturalLanguage.toLowerCase().includes(term) ||
      item.generatedSQL.toLowerCase().includes(term)
    );
  }, [history]);

  const searchFavorites = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return favorites;
    
    const term = searchTerm.toLowerCase();
    return favorites.filter(item => 
      item.naturalLanguage.toLowerCase().includes(term) ||
      item.generatedSQL.toLowerCase().includes(term)
    );
  }, [favorites]);

  const exportHistory = useCallback(() => {
    const exportData = {
      history,
      favorites,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text2sql-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [history, favorites]);

  const importHistory = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (data.history) {
            const importedHistory = data.history.map((item: any) => ({
              ...item,
              timestamp: new Date(item.timestamp)
            }));
            setHistory(prev => [...importedHistory, ...prev].slice(0, MAX_HISTORY_ITEMS));
          }
          
          if (data.favorites) {
            const importedFavorites = data.favorites.map((item: any) => ({
              ...item,
              timestamp: new Date(item.timestamp)
            }));
            setFavorites(prev => [...importedFavorites, ...prev]);
          }
          
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  return {
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    removeFavorite,
    clearHistory,
    clearFavorites,
    searchHistory,
    searchFavorites,
    exportHistory,
    importHistory
  };
}
