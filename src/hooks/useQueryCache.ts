import { useState, useCallback } from 'react';

interface CacheEntry {
  query: string;
  result: string;
  timestamp: number;
}

const CACHE_KEY = 'text2sql_query_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 50;

export function useQueryCache() {
  const [cache, setCache] = useState<Map<string, CacheEntry>>(() => {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const cacheMap = new Map<string, CacheEntry>();
        
        // Filter out expired entries
        const now = Date.now();
        Object.entries(parsed).forEach(([key, value]) => {
          const entry = value as CacheEntry;
          if (now - entry.timestamp < CACHE_EXPIRY) {
            cacheMap.set(key, entry);
          }
        });
        
        return cacheMap;
      }
    } catch (error) {
      console.warn('Failed to load query cache:', error);
    }
    return new Map();
  });

  const getCacheKey = useCallback((query: string): string => {
    return query.toLowerCase().trim().replace(/\s+/g, ' ');
  }, []);

  const getCachedResult = useCallback((query: string): string | null => {
    const key = getCacheKey(query);
    const entry = cache.get(key);
    
    if (entry && Date.now() - entry.timestamp < CACHE_EXPIRY) {
      return entry.result;
    }
    
    return null;
  }, [cache, getCacheKey]);

  const setCachedResult = useCallback((query: string, result: string) => {
    const key = getCacheKey(query);
    const newEntry: CacheEntry = {
      query: query.trim(),
      result,
      timestamp: Date.now()
    };

    setCache(prevCache => {
      const newCache = new Map(prevCache);
      
      // Remove oldest entries if cache is full
      if (newCache.size >= MAX_CACHE_SIZE) {
        const sortedEntries = Array.from(newCache.entries())
          .sort(([, a], [, b]) => a.timestamp - b.timestamp);
        
        // Remove oldest 10 entries
        for (let i = 0; i < Math.min(10, sortedEntries.length); i++) {
          newCache.delete(sortedEntries[i][0]);
        }
      }
      
      newCache.set(key, newEntry);
      
      // Persist to localStorage
      try {
        const serialized = Object.fromEntries(newCache);
        localStorage.setItem(CACHE_KEY, JSON.stringify(serialized));
      } catch (error) {
        console.warn('Failed to save query cache:', error);
      }
      
      return newCache;
    });
  }, [getCacheKey]);

  const clearCache = useCallback(() => {
    setCache(new Map());
    localStorage.removeItem(CACHE_KEY);
  }, []);

  const getCacheStats = useCallback(() => {
    return {
      size: cache.size,
      maxSize: MAX_CACHE_SIZE,
      expiryHours: CACHE_EXPIRY / (60 * 60 * 1000)
    };
  }, [cache]);

  return {
    getCachedResult,
    setCachedResult,
    clearCache,
    getCacheStats,
    cacheSize: cache.size
  };
}