
import { useState } from "react";
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
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useSQLiteDatabaseContext } from "@/contexts/SQLiteDatabaseContext";

const Index = () => {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any>(null);
  const { schema } = useSQLiteDatabaseContext();
  const { 
    generateSQL, 
    autoGenerateFromExample, 
    updateSQL, 
    clearSQL, 
    isLoading, 
    generatedSQL 
  } = useGenerateSQL();

  const handleGenerateSQL = () => {
    generateSQL(query);
    // Clear previous query results when generating new SQL
    setQueryResult(null);
  };

  const handleSelectExample = (exampleQuery: string) => {
    setQuery(exampleQuery);
    // Clear previous results when selecting a new example
    clearSQL();
    setQueryResult(null);
  };

  const handleAutoGenerate = async (exampleQuery: string) => {
    setQuery(exampleQuery);
    // Clear previous results and auto-generate
    clearSQL();
    setQueryResult(null);
    await autoGenerateFromExample(exampleQuery);
  };

  const handleSqlUpdate = (newSQL: string) => {
    updateSQL(newSQL);
    // Clear query results when SQL is manually updated
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
    // Insert text at cursor position or append to query
    const textarea = document.querySelector('textarea[placeholder*="natural language"]') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = query.substring(0, start) + text + query.substring(end);
      setQuery(newValue);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    } else {
      // Fallback: append to end
      setQuery(prev => prev ? `${prev} ${text}` : text);
    }
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
          <div className="min-h-screen flex w-full">
            {/* Schema Browser Sidebar */}
            <SchemaBrowser 
              schema={schema} 
              onInsertText={handleInsertFromSchema}
            />
            
            {/* Main Content */}
            <SidebarInset className="flex-1 flex flex-col">
              <Header />
              
              {/* Sidebar Toggle */}
              <div className="flex items-center gap-2 p-4 border-b">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">
                  {schema ? `${schema.totalTables} tables loaded` : 'No database loaded'}
                </span>
              </div>
              
              {/* Hero Section */}
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
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
