import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Database, LogIn, User, Shield, FileText } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="text-center p-8 bg-black/30 rounded-2xl shadow-2xl border border-white/10 max-w-lg w-full animate-fade-in">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Sparkles className="h-10 w-10 text-purple-400 mb-2" />
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">404</h1>
          <p className="text-2xl text-slate-200 font-semibold mb-2">Page Not Found</p>
          <p className="text-slate-400 mb-4">Sorry, we couldn't find the page <span className="font-mono text-pink-300">{location.pathname}</span></p>
        </div>
        <div className="grid gap-3 mb-6">
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/">
              <Home className="h-4 w-4 mr-2" /> Home
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/app">
              <Sparkles className="h-4 w-4 mr-2" /> Generate SQL
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/upload">
              <Database className="h-4 w-4 mr-2" /> Upload Database
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/login">
              <LogIn className="h-4 w-4 mr-2" /> Login
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/profile">
              <User className="h-4 w-4 mr-2" /> Profile
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/privacy">
              <Shield className="h-4 w-4 mr-2" /> Privacy Policy
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <a href="/terms">
              <FileText className="h-4 w-4 mr-2" /> Terms of Service
            </a>
          </Button>
        </div>
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Text2SQL.my</p>
      </div>
    </div>
  );
};

export default NotFound;
