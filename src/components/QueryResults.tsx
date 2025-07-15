
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, Database, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

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

interface QueryResultsProps {
  result: QueryResult | QueryError | null;
  isVisible: boolean;
}

export function QueryResults({ result, isVisible }: QueryResultsProps) {
  if (!isVisible || !result) return null;

  const isError = 'message' in result;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 animate-fade-in">
      <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Query Results</h3>
          
          {!isError && (
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{result.executionTime.toFixed(2)}ms</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>{result.rowCount} rows</span>
              </div>
              {result.tablesAccessed.length > 0 && (
                <div className="flex items-center gap-1">
                  <Database className="h-4 w-4" />
                  <span>{result.tablesAccessed.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {isError ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Query Error</span>
            </div>
            <p className="text-red-300">{result.message}</p>
            <div className="mt-2">
              <Badge variant="outline" className="text-red-400 border-red-400">
                {result.type.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        ) : result.rowCount === 0 ? (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Query Successful</span>
            </div>
            <p className="text-blue-300">No rows returned by the query</p>
          </div>
        ) : (
          <div className="bg-black/30 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    {result.columns.map((column, index) => (
                      <TableHead key={index} className="text-slate-300 font-medium">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.values.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="border-white/10 hover:bg-white/5">
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="text-white">
                          {cell === null || cell === undefined ? (
                            <span className="text-slate-500 italic">NULL</span>
                          ) : (
                            String(cell)
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {result.rowCount >= 1000 && (
              <div className="border-t border-white/10 p-3 text-center">
                <p className="text-sm text-yellow-400">
                  Results limited to 1000 rows. Use LIMIT clause for more control.
                </p>
              </div>
            )}
          </div>
        )}

        {!isError && result.rowCount > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span>✓ Query executed successfully</span>
              <span>•</span>
              <span>Read-only mode active</span>
              {result.tablesAccessed.length > 0 && (
                <>
                  <span>•</span>
                  <span>Tables: {result.tablesAccessed.join(', ')}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
