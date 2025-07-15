import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { QueryInput } from "@/components/QueryInput";
import { SQLResult } from "@/components/SQLResult";
import { QueryResults } from "@/components/QueryResults";
import { ExampleQueries } from "@/components/ExampleQueries";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SchemaBrowser } from "@/components/SchemaBrowser";
import { useGenerateSQL } from "@/hooks/useGenerateSQL";
import { DatabaseStatus } from "@/components/DatabaseStatus";
import { useSQLiteDatabaseContext } from "@/contexts/SQLiteDatabaseContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function App() {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isSchemaBrowserOpen, setIsSchemaBrowserOpen] = useState(false);
  const { schema } = useSQLiteDatabaseContext();
  const { 
    generateSQL, 
    autoGenerateFromExample, 
    updateSQL, 
    clearSQL, 
    isLoading, 
    generatedSQL 
  } = useGenerateSQL();

  // Close schema browser when no database is loaded
  useEffect(() => {
    if (!schema) {
      setIsSchemaBrowserOpen(false);
    }
  }, [schema]);

  // Keyboard shortcut for toggling schema browser
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b' && schema) {
        e.preventDefault();
        setIsSchemaBrowserOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSchemaBrowserOpen) {
        setIsSchemaBrowserOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [schema, isSchemaBrowserOpen]);

  const handleGenerateSQL = () => {
    generateSQL(query);
    setQueryResult(null);
  };

  const handleSelectExample = (exampleQuery: string) => {
    setQuery(exampleQuery);
    clearSQL();
    setQueryResult(null);
  };

  const handleAutoGenerate = async (exampleQuery: string) => {
    setQuery(exampleQuery);
    clearSQL();
    setQueryResult(null);
    await autoGenerateFromExample(exampleQuery);
  };

  const handleSqlUpdate = (newSQL: string) => {
    updateSQL(newSQL);
    setQueryResult(null);
  };

  const handleQueryExecuted = (result: any) => {
    setQueryResult(result);
  };

  const handleReset = () => {
    setQuery("");
    clearSQL();
    setQueryResult(null);
  };

  const handleInsertFromSchema = (text: string) => {
    const textarea = document.querySelector('textarea[placeholder*="natural language"]') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = query.substring(0, start) + text + query.substring(end);
      setQuery(newValue);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    } else {
      setQuery(prev => prev ? `${prev} ${text}` : text);
    }
  };

  const toggleSchemaBrowser = () => {
    if (schema) {
      setIsSchemaBrowserOpen(prev => !prev);
    }
  };

  return (
    <ProtectedRoute>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
          <div className="min-h-screen flex flex-col">
            <Header 
              isSchemaBrowserOpen={isSchemaBrowserOpen}
              onToggleSchemaBrowser={toggleSchemaBrowser}
            />
            
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
              <div className="w-full max-w-4xl mx-auto">
                {/* Database Status */}
                <div className="flex justify-end mb-6">
                  <DatabaseStatus />
                </div>
                
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    Ask2Query
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 dark:text-slate-400 font-light">
                    Turn English into SQL
                  </p>
                  <p className="text-lg text-slate-400 dark:text-slate-500 mt-4 max-w-2xl mx-auto">
                    Transform your natural language questions into powerful SQL queries instantly using GPT-4
                  </p>
                  {schema && (
                    <p className="text-sm text-slate-500 dark:text-slate-600 mt-2">
                      Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+B</kbd> to toggle schema browser
                    </p>
                  )}
                </div>
                
                <QueryInput 
                  value={query}
                  onChange={setQuery}
                  onGenerate={handleGenerateSQL}
                  onReset={handleReset}
                  isLoading={isLoading}
                />
                
                <SQLResult 
                  sql={generatedSQL}
                  isVisible={!!generatedSQL}
                  onSqlUpdate={handleSqlUpdate}
                  onQueryExecuted={handleQueryExecuted}
                />
                
                <QueryResults
                  result={queryResult}
                  isVisible={!!queryResult}
                />
                
                {!generatedSQL && (
                  <ExampleQueries 
                    onSelectExample={handleSelectExample}
                    onAutoGenerate={handleAutoGenerate}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </main>
            
            <Footer />
          </div>

          {/* Schema Browser */}
          <SchemaBrowser
            schema={schema}
            isOpen={isSchemaBrowserOpen}
            onClose={() => setIsSchemaBrowserOpen(false)}
            onInsertText={handleInsertFromSchema}
          />
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}