import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Play, Upload, Sparkles, BarChart3, History } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tip: string;
  action?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Text2SQL!',
    description: 'Transform your natural language questions into powerful SQL queries using AI. This tutorial will guide you through all the features.',
    icon: Sparkles,
    tip: 'Text2SQL works best with specific, detailed questions about your data.',
  },
  {
    id: 'input',
    title: 'Ask Your Question',
    description: 'Type your question in natural language. For example: "Show me the top 5 customers by revenue" or "What are our monthly sales?"',
    icon: Play,
    tip: 'Be specific about what you want to see. Include column names if you know them.',
    action: 'Try typing a question in the input box'
  },
  {
    id: 'database',
    title: 'Upload Your Database',
    description: 'Upload a SQLite database file to query your own data. Without a database, you can still explore using our demo mode.',
    icon: Upload,
    tip: 'SQLite files are secure and processed locally in your browser.',
    action: 'Click the database upload area to get started'
  },
  {
    id: 'results',
    title: 'View Results & Visualizations',
    description: 'See your data in interactive tables and automatic charts. Export results, edit SQL queries, and run them again.',
    icon: BarChart3,
    tip: 'Large result sets are automatically paginated for better performance.',
  },
  {
    id: 'history',
    title: 'Query History & Favorites',
    description: 'Access your recent queries, star favorites, and re-run past queries. Everything is saved locally.',
    icon: History,
    tip: 'Use the search function to quickly find past queries.',
    action: 'Check the history dropdown in the header'
  }
];

interface TutorialOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function TutorialOverlay({ isOpen, onClose, onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setHasStarted(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    
    // Store completion in localStorage
    localStorage.setItem('text2sql_tutorial_completed', 'true');
  };

  const handleSkip = () => {
    onClose();
  };

  const currentStepData = TUTORIAL_STEPS[currentStep];
  const Icon = currentStepData?.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white">
              Getting Started with Text2SQL
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-purple-400">
                {currentStep + 1} of {TUTORIAL_STEPS.length}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step Content */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="p-3 rounded-full bg-purple-500/20">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-xl text-white">
                    {currentStepData?.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 mt-1">
                    Step {currentStep + 1} of {TUTORIAL_STEPS.length}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                {currentStepData?.description}
              </p>

              {currentStepData?.action && (
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Play className="h-4 w-4" />
                    <span className="font-medium">Try this:</span>
                  </div>
                  <p className="text-purple-200 mt-1">{currentStepData.action}</p>
                </div>
              )}

              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Sparkles className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-blue-300 font-medium">Pro Tip: </span>
                  <span className="text-blue-200">{currentStepData?.tip}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2">
            {TUTORIAL_STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentStep
                    ? 'bg-purple-500 scale-125'
                    : index < currentStep
                    ? 'bg-purple-400/60'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-slate-400 hover:text-white"
              >
                Skip Tutorial
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {currentStep === TUTORIAL_STEPS.length - 1 ? (
                  <>
                    Complete Tutorial
                    <Sparkles className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}