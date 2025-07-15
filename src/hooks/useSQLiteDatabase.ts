
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedDatabaseSchema, TableSchema, ColumnSchema } from '@/types/database';

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
  const [schema, setSchema] = useState<EnhancedDatabaseSchema | null>(null);
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
      
      // Extract enhanced schema
      const enhancedSchema = await extractEnhancedSchema(db, file);
      setSchema(enhancedSchema);
      
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

  const extractEnhancedSchema = async (db: any, file: File): Promise<EnhancedDatabaseSchema> => {
    const tables: TableSchema[] = [];
    
    // Get table names
    const tablesResult = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    
    if (tablesResult.length > 0) {
      for (const tableName of tablesResult[0].values.flat()) {
        try {
          // Get column info with detailed metadata
          const columnsResult = db.exec(`PRAGMA table_info(${tableName})`);
          const columns: ColumnSchema[] = columnsResult[0]?.values.map((row: any) => ({
            name: row[1], // column name
            type: row[2], // column type
            isPrimaryKey: row[5] === 1, // pk flag
            isForeignKey: false, // will be set below
            isNotNull: row[3] === 1, // not null flag
            defaultValue: row[4], // default value
          })) || [];

          // Get foreign key info
          const fkResult = db.exec(`PRAGMA foreign_key_list(${tableName})`);
          if (fkResult.length > 0) {
            fkResult[0].values.forEach((fkRow: any) => {
              const columnName = fkRow[3]; // from column
              const referencedTable = fkRow[2]; // to table
              const referencedColumn = fkRow[4]; // to column
              
              const column = columns.find(c => c.name === columnName);
              if (column) {
                column.isForeignKey = true;
                column.references = {
                  table: referencedTable,
                  column: referencedColumn
                };
              }
            });
          }

          // Get row count
          const rowCountResult = db.exec(`SELECT COUNT(*) FROM ${tableName}`);
          const rowCount = rowCountResult[0]?.values[0]?.[0] || 0;

          // Get sample data (first 3 rows)
          const sampleDataResult = db.exec(`SELECT * FROM ${tableName} LIMIT 3`);
          const sampleData = sampleDataResult[0]?.values || [];

          // Get relationships (simplified - based on foreign keys)
          const relationships = columns
            .filter(col => col.isForeignKey && col.references)
            .map(col => ({
              type: 'one-to-many' as const,
              targetTable: col.references!.table,
              column: col.name,
              targetColumn: col.references!.column
            }));

          tables.push({
            name: tableName as string,
            rowCount: Number(rowCount),
            columns,
            sampleData,
            relationships
          });
        } catch (error) {
          console.error(`Error processing table ${tableName}:`, error);
        }
      }
    }

    return {
      databaseName: file.name,
      fileSize: file.size,
      totalTables: tables.length,
      tables
    };
  };

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
      setSchema(null);
    }
  }, [database]);

  return {
    loadDatabase,
    executeQuery,
    closeDatabase,
    isDatabaseLoaded: !!database,
    isLoading,
    schema
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
