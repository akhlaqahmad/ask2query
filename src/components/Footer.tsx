
import { Trophy, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-slate-300 dark:text-slate-400">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">Built for FutureHack! A.I. Battlefield 2025</span>
          </div>
          
          <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 text-sm">
            <Zap className="h-4 w-4" />
            <span>Powered by AI • Lightning Fast • Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
