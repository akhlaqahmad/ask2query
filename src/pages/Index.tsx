
import { useState } from "react";
import { Header } from "@/components/Header";
import { QueryInput } from "@/components/QueryInput";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = () => {
  const [query, setQuery] = useState("");

  const handleGenerateSQL = () => {
    // TODO: Implement SQL generation logic
    console.log("Generating SQL for:", query);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
        <div className="min-h-screen flex flex-col">
          <Header />
          
          {/* Hero Section */}
          <main className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                  Ask2Query
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 dark:text-slate-400 font-light">
                  Turn English into SQL
                </p>
                <p className="text-lg text-slate-400 dark:text-slate-500 mt-4 max-w-2xl mx-auto">
                  Transform your natural language questions into powerful SQL queries instantly
                </p>
              </div>
              
              <QueryInput 
                value={query}
                onChange={setQuery}
                onGenerate={handleGenerateSQL}
              />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
