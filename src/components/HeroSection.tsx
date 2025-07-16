
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Database, ArrowRight, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const exampleQueries = [
  "Show me all customers who bought more than $1000 worth of products",
  "Tunjukkan semua pelanggan yang membeli produk lebih dari RM1000",
  "Find the top 5 selling products by revenue",
  "Cari 5 produk terlaris berdasarkan pendapatan",
  "List employees hired in the last 6 months",
  "Senarai pekerja yang diambil dalam 6 bulan terakhir"
];

export function HeroSection() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleExampleSelect = (example: string) => {
    setInput(example);
    // Simulate SQL generation for demo
    setIsGenerating(true);
    setTimeout(() => {
      if (example.includes("customers") || example.includes("pelanggan")) {
        setOutput(`SELECT c.*, SUM(o.total_amount) as total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.total_amount > 1000
GROUP BY c.id
ORDER BY total_spent DESC;`);
      } else if (example.includes("products") || example.includes("produk")) {
        setOutput(`SELECT p.name, SUM(oi.quantity * oi.price) as revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 5;`);
      } else {
        setOutput(`SELECT e.*, e.hire_date
FROM employees e
WHERE e.hire_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
ORDER BY e.hire_date DESC;`);
      }
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "SQL copied to clipboard",
        description: "You can now paste it in your SQL editor",
      });
    }
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('live-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Logo and Title */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg mx-auto w-fit shadow-2xl">
            <Database className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Convert Plain English (or Bahasa) into SQL Instantly
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            No SQL knowledge? No problem. Just type your question.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Input */}
          <Card className="p-6 glass-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">Your Question</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>🇬🇧 English</span>
                  <span>•</span>
                  <span>🇲🇾 Bahasa</span>
                </div>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in plain English or Bahasa Malaysia..."
                className="min-h-[120px] glass-input text-slate-200 placeholder:text-slate-500"
              />
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQueries.slice(0, 3).map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleSelect(example)}
                      className="text-xs bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-300 transition-all duration-200"
                    >
                      {example.length > 30 ? `${example.substring(0, 30)}...` : example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Output */}
          <Card className="p-6 glass-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">Generated SQL</h3>
                {output && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-300 transition-all duration-200"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              <div className="min-h-[120px] code-block rounded-md p-4">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  </div>
                ) : output ? (
                  <pre className="text-sm text-emerald-400 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-slate-500 text-sm">SQL will appear here...</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={scrollToDemo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Try Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200 hover:text-slate-100 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => window.location.href = '/app'}
            >
              Start Generating SQL Now
            </Button>
          </div>
          
          <p className="text-sm text-slate-500">
            No signup needed • Privacy-first • Your data never leaves your browser
          </p>
        </div>
      </div>
    </section>
  );
}
