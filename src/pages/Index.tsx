import { useState } from "react";
import { Header } from "@/components/Header";
import { QueryInput } from "@/components/QueryInput";
import { SQLResult } from "@/components/SQLResult";
import { ExampleQueries } from "@/components/ExampleQueries";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useGenerateSQL } from "@/hooks/useGenerateSQL";
import { DatabaseStatus } from "@/components/DatabaseStatus";

const Index = () => {
  const [query, setQuery] = useState("");
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
  };

  const handleSelectExample = (exampleQuery: string) => {
    setQuery(exampleQuery);
    // Clear previous results when selecting a new example
    clearSQL();
  };

  const handleAutoGenerate = async (exampleQuery: string) => {
    setQuery(exampleQuery);
    // Clear previous results and auto-generate
    clearSQL();
    await autoGenerateFromExample(exampleQuery);
  };

  const handleSqlUpdate = (newSQL: string) => {
    updateSQL(newSQL);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
        <div className="min-h-screen flex flex-col">
          <Header />
          
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
                isLoading={isLoading}
              />
              
              <SQLResult 
                sql={generatedSQL}
                isVisible={!!generatedSQL}
                onSqlUpdate={handleSqlUpdate}
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
      </div>
    </ThemeProvider>
  );
};

export default Index;
