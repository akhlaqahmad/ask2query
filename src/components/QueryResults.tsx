
import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Database, BarChart3, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { EnhancedTable } from './EnhancedTable';
import { DataVisualization } from './DataVisualization';
import { analyzeColumns, detectChartType } from '@/utils/chartDetection';

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

  // Analyze data for visualization and statistics
  const analysisData = useMemo(() => {
    if (isError || result.rowCount === 0) return null;
    
    const columnInfo = analyzeColumns(result.columns, result.values);
    const chartData = detectChartType(result.columns, result.values, columnInfo);
    
    return { columnInfo, chartData };
  }, [result, isError]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Query Results</CardTitle>
              {!isError && (
                <CardDescription className="mt-1">
                  {result.rowCount === 0 ? 'No rows returned' : `Found ${result.rowCount.toLocaleString()} records`}
                </CardDescription>
              )}
            </div>
            
            {!isError && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        </CardHeader>

        <CardContent>
          {isError ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Query Error</span>
              </div>
              <p className="text-destructive/80 mb-3">{result.message}</p>
              <Badge variant="destructive" className="text-xs">
                {result.type.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          ) : result.rowCount === 0 ? (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Query Successful</span>
              </div>
              <p className="text-blue-600/80">No rows returned by the query</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Data Statistics */}
              {analysisData && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{result.columns.length}</div>
                    <div className="text-sm text-muted-foreground">Columns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{result.rowCount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Rows</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {analysisData.columnInfo.filter(col => col.type === 'number').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Numeric</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {analysisData.columnInfo.reduce((sum, col) => sum + col.nullCount, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Nulls</div>
                  </div>
                </div>
              )}

              {/* Data Visualization */}
              {analysisData && analysisData.chartData.type !== 'none' && (
                <DataVisualization chartData={analysisData.chartData} />
              )}

              {/* Enhanced Table */}
              {analysisData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Data Table
                    </CardTitle>
                    <CardDescription>
                      Interactive table with sorting, filtering, and export options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnhancedTable 
                      columns={result.columns}
                      values={result.values}
                      columnInfo={analysisData.columnInfo}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Limit Warning */}
              {result.rowCount >= 1000 && (
                <div className="border-t border-border pt-3 text-center">
                  <p className="text-sm text-yellow-600">
                    Results limited to 1000 rows. Use LIMIT clause for more control.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Information */}
      {!isError && result.rowCount > 0 && (
        <div className="text-center text-xs text-muted-foreground space-x-2">
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
      )}
    </div>
  );
}
