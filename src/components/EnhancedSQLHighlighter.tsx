
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatSQL } from '@/utils/sqlFormatter';

// Custom theme for SQL syntax highlighting with proper TypeScript types
const customSQLTheme = {
  'code[class*="language-"]': {
    color: '#e2e8f0',
    background: 'transparent',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: 2,
    hyphens: 'none' as const,
  },
  'pre[class*="language-"]': {
    color: '#e2e8f0',
    background: 'transparent',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: 2,
    hyphens: 'none' as const,
    padding: '1rem',
    margin: '0',
    overflow: 'auto',
  },
  // SQL Keywords (SELECT, FROM, WHERE, etc.)
  'keyword': {
    color: '#60a5fa', // blue-400
    fontWeight: 'bold',
  },
  // SQL Functions (COUNT, SUM, AVG, etc.)
  'function': {
    color: '#c084fc', // purple-400
    fontWeight: '500',
  },
  // String literals
  'string': {
    color: '#4ade80', // green-400
  },
  // Numbers
  'number': {
    color: '#fb923c', // orange-400
  },
  // Operators (=, >, <, etc.)
  'operator': {
    color: '#facc15', // yellow-400
  },
  // Comments
  'comment': {
    color: '#64748b', // slate-500
    fontStyle: 'italic',
  },
  // Table and column names
  'property': {
    color: '#22d3ee', // cyan-400
  },
  // Punctuation
  'punctuation': {
    color: '#94a3b8', // slate-400
  },
  // Brackets and parentheses
  'bracket': {
    color: '#f1f5f9', // slate-100
  },
};

interface EnhancedSQLHighlighterProps {
  sql: string;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
  animateReveal?: boolean;
  className?: string;
}

export function EnhancedSQLHighlighter({
  sql,
  showCopyButton = true,
  showLineNumbers = false,
  animateReveal = false,
  className = '',
}: EnhancedSQLHighlighterProps) {
  const [copied, setCopied] = useState(false);
  const [displayedSQL, setDisplayedSQL] = useState('');
  const { toast } = useToast();

  // Format the SQL
  const formattedSQL = formatSQL(sql);

  // Animate SQL reveal character by character
  useEffect(() => {
    if (animateReveal && formattedSQL) {
      setDisplayedSQL('');
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayedSQL(formattedSQL.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex >= formattedSQL.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedSQL(formattedSQL);
    }
  }, [formattedSQL, animateReveal]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedSQL);
      setCopied(true);
      toast({
        title: "SQL copied to clipboard",
        description: "The formatted SQL query has been copied",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!sql || !displayedSQL) {
    return (
      <div className="min-h-[120px] bg-slate-900/80 border border-slate-700 rounded-lg p-4 flex items-center justify-center">
        <p className="text-slate-500 text-sm">SQL will appear here...</p>
      </div>
    );
  }

  return (
    <div className={`relative bg-slate-900/80 border border-slate-700 rounded-lg overflow-hidden ${className}`}>
      {showCopyButton && (
        <div className="absolute top-2 right-2 z-10">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="bg-slate-800/80 hover:bg-slate-700 border-slate-600 text-slate-300 hover:text-slate-100 transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}
      
      <SyntaxHighlighter
        language="sql"
        style={customSQLTheme}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
        }}
        wrapLongLines={true}
      >
        {displayedSQL}
      </SyntaxHighlighter>
    </div>
  );
}
