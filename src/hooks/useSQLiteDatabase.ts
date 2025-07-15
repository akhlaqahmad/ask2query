
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface QueryResult {
  columns: string[];
  values: any[][];
  executionTime: number;
  rowCount: number;
  tablesAccessed: string[];
}

interface QueryError {
  message: string;
  type: 'syntax' | 'runtime' | 'timeout' | 'limit_exceeded';
}

export function useSQLiteDatabase() {
  const [database, setDatabase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadDatabase = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      // Properly initialize sql.js
      const initSqlJs = (await import('sql.js')).default;
      const SQL = await initSqlJs({
        // Optional: provide path to sql-wasm.wasm file if needed
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });
      
      const arrayBuffer = await file.arrayBuffer();
      const db = new SQL.Database(new Uint8Array(arrayBuffer));
      setDatabase(db);
      
      toast({
        title: "Database loaded",
        description: "SQLite database is ready for queries",
      });
    } catch (error) {
      console.error('Error loading database:', error);
      toast({
        title: "Database load failed",
        description: "Could not load the SQLite database file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const executeQuery = useCallback(async (sql: string): Promise<QueryResult | QueryError> => {
    if (!database) {
      return { message: "No database loaded", type: "runtime" as const };
    }

    // Safety checks
    const upperSQL = sql.toUpperCase().trim();
    const forbiddenKeywords = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'TRUNCATE'];
    
    if (forbiddenKeywords.some(keyword => upperSQL.includes(keyword))) {
      return { 
        message: "Only SELECT queries are allowed for safety", 
        type: "syntax" as const 
      };
    }

    const startTime = performance.now();
    
    try {
      // Execute with timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), 10000);
      });

      const queryPromise = new Promise<any>((resolve, reject) => {
        try {
          const result = database.exec(sql);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      const result = await Promise.race([queryPromise, timeoutPromise]);
      const executionTime = performance.now() - startTime;

      if (!result || result.length === 0) {
        return {
          columns: [],
          values: [],
          executionTime,
          rowCount: 0,
          tablesAccessed: extractTablesFromSQL(sql)
        };
      }

      const firstResult = result[0];
      const rowCount = firstResult.values?.length || 0;

      // Limit results to 1000 rows
      if (rowCount > 1000) {
        return {
          message: "Query returned too many rows (>1000). Please add LIMIT clause.",
          type: "limit_exceeded" as const
        };
      }

      return {
        columns: firstResult.columns || [],
        values: firstResult.values || [],
        executionTime,
        rowCount,
        tablesAccessed: extractTablesFromSQL(sql)
      };

    } catch (error: any) {
      const executionTime = performance.now() - startTime;
      
      if (error.message === 'Query timeout') {
        return { message: "Query timed out (>10 seconds)", type: "timeout" as const };
      }

      return { 
        message: error.message || "Unknown database error", 
        type: "runtime" as const 
      };
    }
  }, [database]);

  const closeDatabase = useCallback(() => {
    if (database) {
      database.close();
      setDatabase(null);
    }
  }, [database]);

  return {
    loadDatabase,
    executeQuery,
    closeDatabase,
    isDatabaseLoaded: !!database,
    isLoading
  };
}

// Helper function to extract table names from SQL
function extractTablesFromSQL(sql: string): string[] {
  const tableRegex = /FROM\s+([a-zA-Z_][a-zA-Z0-9_]*)|JOIN\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
  const matches = [];
  let match;
  
  while ((match = tableRegex.exec(sql)) !== null) {
    const tableName = match[1] || match[2];
    if (tableName && !matches.includes(tableName)) {
      matches.push(tableName);
    }
  }
  
  return matches;
}
