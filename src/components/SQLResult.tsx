
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Edit3, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SQLResultProps {
  sql: string;
  isVisible: boolean;
  onSqlUpdate?: (sql: string) => void;
}

export function SQLResult({ sql, isVisible, onSqlUpdate }: SQLResultProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSql, setEditedSql] = useState(sql);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "SQL query copied to clipboard",
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

  const handleEdit = () => {
    setEditedSql(sql);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSqlUpdate) {
      onSqlUpdate(editedSql);
    }
    setIsEditing(false);
    toast({
      title: "SQL Updated",
      description: "Your changes have been saved",
    });
  };

  const handleCancel = () => {
    setEditedSql(sql);
    setIsEditing(false);
  };

  if (!isVisible || !sql) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">SQL Query Generated</h3>
          <div className="flex gap-2">
            {!isEditing && (
              <>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  size="sm"
                  className="bg-green-600/20 border-green-500/40 text-green-300 hover:bg-green-600/30"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="bg-red-600/20 border-red-500/40 text-red-300 hover:bg-red-600/30"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg overflow-hidden">
          {isEditing ? (
            <Textarea
              value={editedSql}
              onChange={(e) => setEditedSql(e.target.value)}
              className="min-h-32 bg-transparent border-none text-white font-mono text-sm resize-none focus:ring-0"
              placeholder="Edit your SQL query..."
            />
          ) : (
            <SyntaxHighlighter
              language="sql"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontSize: '0.875rem',
              }}
              wrapLongLines={true}
            >
              {sql}
            </SyntaxHighlighter>
          )}
        </div>
        
        <div className="mt-4 text-sm text-slate-400">
          <p>✓ Query generated using GPT-4</p>
          <p>✓ Based on customers, products, and orders schema</p>
        </div>
      </div>
    </div>
  );
}
