import { useState, useCallback } from 'react';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

const HARMFUL_PATTERNS = [
  /drop\s+table/i,
  /delete\s+from/i,
  /truncate\s+table/i,
  /alter\s+table/i,
  /create\s+table/i,
  /update\s+.*\s+set/i,
  /insert\s+into/i,
  /exec\s*\(/i,
  /execute\s*\(/i,
  /sp_/i,
  /xp_/i,
  /--\s*$/m,
  /\/\*.*\*\//s,
  /;\s*--/,
  /union\s+select/i,
  /information_schema/i,
  /pg_/i,
  /mysql\./i,
  /sys\./i,
];

const COMMON_MISTAKES = [
  {
    pattern: /select\s+\*\s+from\s+(\w+)\s+where\s+\w+\s*=\s*'[^']*'\s*$/i,
    suggestion: "Consider using parameterized queries and LIMIT clause for better performance"
  },
  {
    pattern: /select\s+\*\s+from\s+\w+\s*$/i,
    suggestion: "Consider using LIMIT to avoid returning too many rows"
  },
  {
    pattern: /where\s+\w+\s+like\s+'%.*%'/i,
    suggestion: "Leading wildcards in LIKE queries can be slow on large tables"
  },
  {
    pattern: /order\s+by\s+\w+\s*$/i,
    suggestion: "Consider adding LIMIT when using ORDER BY"
  }
];

export function useInputValidation() {
  const [lastValidation, setLastValidation] = useState<ValidationResult | null>(null);

  const validateQuery = useCallback((query: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Minimum length check
    if (query.trim().length < 3) {
      errors.push("Query is too short. Please provide more details.");
    }

    // Maximum length check
    if (query.length > 1000) {
      warnings.push("Very long query. Consider breaking it down into smaller parts.");
    }

    // Check for harmful patterns
    const harmfulPattern = HARMFUL_PATTERNS.find(pattern => pattern.test(query));
    if (harmfulPattern) {
      errors.push("Query contains potentially harmful operations. Only SELECT queries are allowed.");
    }

    // Check for common mistakes and provide suggestions
    COMMON_MISTAKES.forEach(({ pattern, suggestion }) => {
      if (pattern.test(query)) {
        suggestions.push(suggestion);
      }
    });

    // Check for missing keywords
    if (query.toLowerCase().includes('show') && !query.toLowerCase().includes('select')) {
      suggestions.push("Try: 'SELECT column_name FROM table_name' instead of 'SHOW'");
    }

    // Check for SQL injection patterns
    if (/['"];?\s*(drop|delete|update|insert)/i.test(query)) {
      errors.push("Query appears to contain SQL injection patterns.");
    }

    // Performance warnings
    if (query.toLowerCase().includes('select *') && !query.toLowerCase().includes('limit')) {
      warnings.push("Consider using specific column names and LIMIT clause for better performance.");
    }

    // Provide helpful suggestions for natural language
    if (!query.toLowerCase().includes('select') && 
        !query.toLowerCase().includes('show') && 
        !query.toLowerCase().includes('find') &&
        !query.toLowerCase().includes('get') &&
        !query.toLowerCase().includes('count') &&
        !query.toLowerCase().includes('sum') &&
        !query.toLowerCase().includes('average')) {
      suggestions.push("Try phrases like: 'Show me...', 'Find all...', 'Count the...', 'What is the average...'");
    }

    const result: ValidationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };

    setLastValidation(result);
    return result;
  }, []);

  const clearValidation = useCallback(() => {
    setLastValidation(null);
  }, []);

  return {
    validateQuery,
    clearValidation,
    lastValidation
  };
}