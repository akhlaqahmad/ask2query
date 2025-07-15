
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Database, ArrowRight } from "lucide-react";

const Index = () => {
  const { user, isLoading } = useAuth();

  // Redirect authenticated users to /app
  useEffect(() => {
    if (!isLoading && user) {
      window.location.href = '/app';
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg mx-auto w-fit mb-8">
              <Database className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Ask2Query
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 font-light mb-6">
              Turn English into SQL
            </p>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
              Transform your natural language questions into powerful SQL queries instantly using GPT-4. 
              Upload your database and start querying with simple English.
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                onClick={() => window.location.href = '/login'}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white px-8 py-3"
                onClick={() => window.location.href = '/upload'}
              >
                Upload Database
              </Button>
            </div>
            
            <p className="text-sm text-slate-500">
              Sign up to save your queries and access advanced features
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200 mb-3">Natural Language</h3>
                <p className="text-slate-400">Ask questions in plain English and get SQL queries back</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200 mb-3">Multiple Formats</h3>
                <p className="text-slate-400">Support for SQLite, CSV uploads, and more</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200 mb-3">AI Powered</h3>
                <p className="text-slate-400">Powered by GPT-4 for accurate query generation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
