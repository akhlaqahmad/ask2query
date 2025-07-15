import { AlertTriangle, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

interface ValidationFeedbackProps {
  validation: ValidationResult | null;
  isVisible?: boolean;
}

export function ValidationFeedback({ validation, isVisible = true }: ValidationFeedbackProps) {
  if (!isVisible || !validation) return null;

  const hasAnyFeedback = validation.errors.length > 0 || 
                        validation.warnings.length > 0 || 
                        validation.suggestions.length > 0;

  if (!hasAnyFeedback) return null;

  return (
    <div className="space-y-3">
      {/* Errors */}
      {validation.errors.map((error, index) => (
        <Alert key={`error-${index}`} variant="destructive" className="bg-red-500/10 border-red-500/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-300">
            {error}
          </AlertDescription>
        </Alert>
      ))}

      {/* Warnings */}
      {validation.warnings.map((warning, index) => (
        <Alert key={`warning-${index}`} className="bg-yellow-500/10 border-yellow-500/20">
          <AlertCircle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-300">
            {warning}
          </AlertDescription>
        </Alert>
      ))}

      {/* Suggestions */}
      {validation.suggestions.length > 0 && (
        <Alert className="bg-blue-500/10 border-blue-500/20">
          <Lightbulb className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            <div className="space-y-2">
              <div className="font-medium">💡 Suggestions:</div>
              <div className="space-y-1">
                {validation.suggestions.map((suggestion, index) => (
                  <div key={index} className="text-sm">
                    • {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Validation Status */}
      {validation.isValid && validation.suggestions.length === 0 && validation.warnings.length === 0 && (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-300">
            Query looks good! Ready to generate SQL.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}