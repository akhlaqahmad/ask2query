
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Edit3, Save, X, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useSQLiteDatabaseContext } from '@/contexts/SQLiteDatabaseContext';
import { SocialShare } from './SocialShare';

interface SQLResultProps {
  sql: string;
  isVisible: boolean;
  onSqlUpdate?: (sql: string) => void;
  onQueryExecuted?: (result: any) => void;
  originalQuery?: string;
  queryResults?: any;
}

export function SQLResult({ sql, isVisible, onSqlUpdate, onQueryExecuted, originalQuery, queryResults }: SQLResultProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSql, setEditedSql] = useState(sql);
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();
  const { isCustomDatabase } = useDatabase();
  const { executeQuery, isDatabaseLoaded } = useSQLiteDatabaseContext();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "SQL query copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    setEditedSql(sql);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSqlUpdate) {
      onSqlUpdate(editedSql);
    }
    setIsEditing(false);
    toast({
      title: "SQL Updated",
      description: "Your changes have been saved",
    });
  };

  const handleCancel = () => {
    setEditedSql(sql);
    setIsEditing(false);
  };

  const handleRunQuery = async () => {
    if (!isDatabaseLoaded) {
      toast({
        title: "No database loaded",
        description: "Please upload a SQLite database file first",
        variant: "destructive",
      });
      return;
    }

    // Basic SQL validation
    const sqlLower = sql.toLowerCase().trim();
    if (!sqlLower.startsWith('select')) {
      toast({
        title: "Invalid SQL",
        description: "Only SELECT queries are allowed for security reasons",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    
    try {
      const result = await executeQuery(sql);
      
      if (onQueryExecuted) {
        onQueryExecuted(result);
      }

      if ('message' in result) {
        // Enhanced error handling based on error type
        let errorTitle = "Query Failed";
        let errorDescription = result.message;

        if (result.message.includes('syntax error')) {
          errorTitle = "SQL Syntax Error";
          errorDescription = "Please check your SQL syntax and try again.";
        } else if (result.message.includes('no such table')) {
          errorTitle = "Table Not Found";
          errorDescription = "The specified table doesn't exist in your database.";
        } else if (result.message.includes('no such column')) {
          errorTitle = "Column Not Found";
          errorDescription = "The specified column doesn't exist in the table.";
        }

        toast({
          title: errorTitle,
          description: errorDescription,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Query Executed Successfully",
          description: `Returned ${result.rowCount} rows in ${result.executionTime.toFixed(2)}ms`,
        });
      }
    } catch (error) {
      console.error('Query execution error:', error);
      
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = "Query timed out. Try a simpler query or add LIMIT clause.";
        } else if (error.message.includes('memory')) {
          errorMessage = "Query requires too much memory. Try filtering your results.";
        }
      }
      
      toast({
        title: "Execution Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  if (!isVisible || !sql) return null;

  const canRunQuery = isCustomDatabase && isDatabaseLoaded;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-100">SQL Query Generated</h3>
          <div className="flex gap-2">
            {canRunQuery && !isEditing && (
              <Button
                onClick={handleRunQuery}
                disabled={isExecuting}
                variant="outline"
                size="sm"
                className="bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 hover:text-emerald-200 transition-all duration-200"
              >
                {isExecuting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-300/30 border-t-emerald-300 rounded-full animate-spin mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Query
                  </>
                )}
              </Button>
            )}

            {/* Social Share Button */}
            {originalQuery && !isEditing && (
              <SocialShare 
                query={originalQuery} 
                sql={sql} 
                results={queryResults}
              />
            )}
            
            {!isEditing && (
              <>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200 hover:text-slate-100 transition-all duration-200"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200 hover:text-slate-100 transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  size="sm"
                  className="bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/30 transition-all duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="code-block rounded-lg overflow-hidden">
          {isEditing ? (
            <Textarea
              value={editedSql}
              onChange={(e) => setEditedSql(e.target.value)}
              className="min-h-32 bg-transparent border-none text-slate-200 font-mono text-sm resize-none focus:ring-0"
              placeholder="Edit your SQL query..."
            />
          ) : (
            <SyntaxHighlighter
              language="sql"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontSize: '0.875rem',
              }}
              wrapLongLines={true}
            >
              {sql}
            </SyntaxHighlighter>
          )}
        </div>
        
        <div className="mt-4 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            Query generated using GPT-4
          </p>
          {isCustomDatabase ? (
            <p className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Based on your uploaded database schema
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Based on customers, products, and orders schema
            </p>
          )}
          {!canRunQuery && isCustomDatabase && (
            <p className="flex items-center gap-2 text-amber-400">
              <span>⚠</span>
              Upload a SQLite file to run queries
            </p>
          )}
          {!isCustomDatabase && (
            <p className="flex items-center gap-2 text-blue-400">
              <span>ℹ</span>
              Upload a database to run queries against your data
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
