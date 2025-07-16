
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SchemaBrowserToggle } from "./SchemaBrowserToggle";
import { QueryHistoryDropdown } from "./QueryHistoryDropdown";
import { LogoutButton } from "./LogoutButton";
import { TutorialOverlay } from "./TutorialOverlay";
import { AboutSection } from "./AboutSection";
import { FeedbackForm } from "./FeedbackForm";
import { PoweredByOpenAI } from "./PoweredByOpenAI";
import { HelpCircle, Sparkles } from "lucide-react";
import { HistoryItem } from "@/hooks/useQueryHistory";

interface HeaderProps {
  isSchemaBrowserOpen?: boolean;
  onToggleSchemaBrowser?: () => void;
  history?: HistoryItem[];
  favorites?: HistoryItem[];
  onRunQuery?: (item: HistoryItem) => void;
  onToggleFavorite?: (itemId: string) => void;
  onOpenFullHistory?: () => void;
}

export function Header({ 
  isSchemaBrowserOpen = false, 
  onToggleSchemaBrowser,
  history = [],
  favorites = [],
  onRunQuery,
  onToggleFavorite,
  onOpenFullHistory
}: HeaderProps) {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem('text2sql_tutorial_completed');
    if (!hasCompletedTutorial) {
      const timer = setTimeout(() => setShowTutorial(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">
                Text2SQL
              </h1>
            </div>
            <SchemaBrowserToggle isOpen={isSchemaBrowserOpen} onToggle={onToggleSchemaBrowser} />
          </div>

          <div className="flex items-center gap-2">
            <PoweredByOpenAI />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowTutorial(true)} 
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-200"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <AboutSection />
            <FeedbackForm />
            <QueryHistoryDropdown 
              history={history} 
              favorites={favorites} 
              onRunQuery={onRunQuery} 
              onToggleFavorite={onToggleFavorite} 
              onOpenFullHistory={onOpenFullHistory} 
            />
            <LogoutButton />
          </div>
        </div>
      </header>

      <TutorialOverlay 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        onComplete={() => localStorage.setItem('text2sql_tutorial_completed', 'true')} 
      />
    </>
  );
}
