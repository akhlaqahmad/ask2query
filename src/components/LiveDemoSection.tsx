import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EnhancedSQLHighlighter, SQLCopyButton } from "./EnhancedSQLHighlighter";

const schemas = [
  {
    id: "ecommerce",
    name: "E-commerce Store",
    tables: ["customers", "orders", "products", "order_items", "categories"]
  },
  {
    id: "hr",
    name: "HR Management",
    tables: ["employees", "departments", "positions", "salaries", "attendance"]
  },
  {
    id: "inventory",
    name: "Inventory System",
    tables: ["items", "suppliers", "stock", "transactions", "warehouses"]
  }
];

export function LiveDemoSection() {
  const [selectedSchema, setSelectedSchema] = useState(schemas[0]);
  const [language, setLanguage] = useState("english");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate SQL generation
    setTimeout(() => {
      const mockSQL = `SELECT *
FROM ${selectedSchema.tables[0]}
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY created_at DESC
LIMIT 10;`;
      
      setOutput(mockSQL);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section id="live-demo" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interactive Live Demo
            </h2>
            <p className="text-xl text-slate-300">
              Try Text2SQL.my with real database schemas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Your Question</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={language === "english" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("english")}
                      className="text-xs"
                    >
                      🇬🇧 English
                    </Button>
                    <Button
                      variant={language === "bahasa" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("bahasa")}
                      className="text-xs"
                    >
                      🇲🇾 Bahasa
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-300 block mb-2">Select Database Schema</label>
                    <Select value={selectedSchema.id} onValueChange={(value) => {
                      const schema = schemas.find(s => s.id === value);
                      if (schema) setSelectedSchema(schema);
                    }}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {schemas.map((schema) => (
                          <SelectItem key={schema.id} value={schema.id}>
                            <div className="flex items-center space-x-2">
                              <Database className="h-4 w-4" />
                              <span>{schema.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">Available Tables</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSchema.tables.map((table) => (
                        <Badge key={table} variant="secondary" className="bg-slate-700 text-slate-300">
                          {table}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={language === "english" 
                      ? "Ask your question in plain English..." 
                      : "Tanya soalan anda dalam Bahasa Malaysia..."}
                    className="min-h-[120px] bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500"
                  />

                  <Button 
                    onClick={handleGenerate}
                    disabled={!input.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Generating SQL...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Generate SQL</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Output Panel */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Generated SQL</h3>
                  {output && (
                    <SQLCopyButton 
                      sql={output}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    />
                  )}
                </div>

                <div className="min-h-[200px]">
                  {output ? (
                    <EnhancedSQLHighlighter
                      sql={output}
                      showCopyButton={false}
                      showLineNumbers={false}
                      animateReveal={true}
                      className="min-h-[200px]"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[200px] bg-slate-900/50 border border-slate-600 rounded-md text-slate-500">
                      <div className="text-center">
                        <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Your generated SQL will appear here</p>
                      </div>
                    </div>
                  )}
                </div>

                {output && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Query Performance</span>
                      <span className="text-green-400">✓ Optimized</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Syntax Check</span>
                      <span className="text-green-400">✓ Valid</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Generation Time</span>
                      <span className="text-slate-300">1.2s</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
