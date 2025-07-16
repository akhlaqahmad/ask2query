
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Database, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTypewriter } from "@/hooks/useTypewriter";
import { EnhancedSQLHighlighter } from "./EnhancedSQLHighlighter";

const exampleQueries = [
  "Show me all customers who bought more than $1000 worth of products",
  "Tunjukkan semua pelanggan yang membeli produk lebih dari RM1000",
  "Find the top 5 selling products by revenue",
  "Cari 5 produk terlaris berdasarkan pendapatan",
  "List employees hired in the last 6 months",
  "Senarai pekerja yang diambil dalam 6 bulan terakhir"
];

const autoTypeQueries = [
  "Show me all customers who bought more than $1000",
  "Find the top 5 selling products",
  "List employees hired recently"
];

export function HeroSection() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoTypeIndex, setAutoTypeIndex] = useState(0);
  const [showAutoType, setShowAutoType] = useState(true);
  const { toast } = useToast();

  // Typewriter effect for main headline
  const { displayText: heroText, isComplete } = useTypewriter({
    text: "Convert Plain English (or Bahasa) into SQL Instantly",
    speed: 80,
    delay: 1000
  });

  // Auto-typing demo effect
  const { displayText: autoTypeText, isComplete: autoTypeComplete } = useTypewriter({
    text: autoTypeQueries[autoTypeIndex],
    speed: 100,
    delay: 2000
  });

  useEffect(() => {
    if (autoTypeComplete && showAutoType) {
      const timer = setTimeout(() => {
        if (input === "") {
          setInput(autoTypeText);
          handleExampleSelect(autoTypeText);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoTypeComplete, autoTypeText, input, showAutoType]);

  useEffect(() => {
    if (autoTypeComplete) {
      const timer = setTimeout(() => {
        setAutoTypeIndex((prev) => (prev + 1) % autoTypeQueries.length);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoTypeComplete]);

  const handleExampleSelect = (example: string) => {
    setInput(example);
    setShowAutoType(false);
    setIsGenerating(true);
    
    setTimeout(() => {
      if (example.includes("customers") || example.includes("pelanggan")) {
        const sql = `SELECT c.*, SUM(o.total_amount) as total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.total_amount > 1000
GROUP BY c.id
ORDER BY total_spent DESC;`;
        setOutput(sql);
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

  const scrollToDemo = () => {
    const demoSection = document.getElementById('live-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-pulse" />
      
      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        {/* Logo and Title with animations */}
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg mx-auto w-fit shadow-2xl transform hover:scale-110 transition-all duration-300 group">
            <Database className="h-12 w-12 text-white group-hover:rotate-12 transition-transform duration-300" />
            <Sparkles className="h-4 w-4 text-white/60 absolute -top-1 -right-1 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text min-h-[120px] flex items-center justify-center">
            {heroText}
            {!isComplete && <span className="animate-pulse">|</span>}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
            No SQL knowledge? No problem. Just type your question.
          </p>
        </div>

        {/* Demo Interface with enhanced animations */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '4s', animationFillMode: 'forwards' }}>
          {/* Input */}
          <Card className="p-6 glass-card hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">Your Question</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span className="animate-bounce">🇬🇧 English</span>
                  <span>•</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🇲🇾 Bahasa</span>
                </div>
              </div>
              
              <Textarea
                value={showAutoType && input === "" ? autoTypeText : input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowAutoType(false);
                }}
                placeholder="Ask in plain English or Bahasa Malaysia..."
                className="min-h-[120px] glass-input text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:border-blue-400"
                onFocus={() => setShowAutoType(false)}
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
                      className="text-xs bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-300 transition-all duration-200 hover:scale-105 hover:border-blue-400"
                    >
                      {example.length > 30 ? `${example.substring(0, 30)}...` : example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Output */}
          <Card className="p-6 glass-card hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">Generated SQL</h3>
              </div>
              
              <div className="min-h-[120px]">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full min-h-[120px] bg-slate-900/80 border border-slate-700 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    <span className="ml-2 text-slate-400">Generating SQL...</span>
                  </div>
                ) : output ? (
                  <EnhancedSQLHighlighter
                    sql={output}
                    showCopyButton={true}
                    showLineNumbers={false}
                    animateReveal={true}
                    className="min-h-[120px]"
                  />
                ) : (
                  <div className="min-h-[120px] bg-slate-900/80 border border-slate-700 rounded-lg p-4 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">SQL will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action with enhanced animations */}
        <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: '5s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={scrollToDemo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:scale-105 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Try Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200 hover:text-slate-100 px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-400"
              onClick={() => window.location.href = '/app'}
            >
              Start Generating SQL Now
            </Button>
          </div>
          
          <p className="text-sm text-slate-500 animate-pulse">
            No signup needed • Privacy-first • Your data never leaves your browser
          </p>
        </div>
      </div>
    </section>
  );
}
