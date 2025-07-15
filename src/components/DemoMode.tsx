import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Sparkles, Clock, TrendingUp, Users, DollarSign, Package, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DemoQuery {
  id: string;
  title: string;
  description: string;
  query: string;
  category: 'sales' | 'customers' | 'products' | 'analytics';
  icon: React.ElementType;
  expectedResult: string;
}

const DEMO_QUERIES: DemoQuery[] = [
  {
    id: 'top-customers',
    title: 'Top 5 Customers by Revenue',
    description: 'Find our most valuable customers',
    query: 'Show me the top 5 customers by total revenue',
    category: 'customers',
    icon: Users,
    expectedResult: 'Customer names with their total purchase amounts'
  },
  {
    id: 'monthly-sales',
    title: 'Monthly Sales Trend',
    description: 'Analyze sales performance over time',
    query: 'What are the monthly sales totals for this year?',
    category: 'sales',
    icon: TrendingUp,
    expectedResult: 'Monthly breakdown of total sales'
  },
  {
    id: 'popular-products',
    title: 'Best Selling Products',
    description: 'Identify top performing products',
    query: 'Which products have sold the most units?',
    category: 'products',
    icon: Package,
    expectedResult: 'Products ranked by quantity sold'
  },
  {
    id: 'avg-order-value',
    title: 'Average Order Value',
    description: 'Calculate key business metrics',
    query: 'What is the average order value by customer segment?',
    category: 'analytics',
    icon: DollarSign,
    expectedResult: 'Average order values across different segments'
  },
  {
    id: 'recent-orders',
    title: 'Recent Large Orders',
    description: 'Track high-value recent transactions',
    query: 'Show me orders over $1000 from the last 30 days',
    category: 'sales',
    icon: Clock,
    expectedResult: 'Recent high-value orders with details'
  },
  {
    id: 'customer-analysis',
    title: 'Customer Purchase Patterns',
    description: 'Deep dive into customer behavior',
    query: 'How many orders does each customer make on average per month?',
    category: 'analytics',
    icon: BarChart3,
    expectedResult: 'Customer frequency analysis'
  }
];

interface DemoModeProps {
  onSelectQuery: (query: string) => void;
  onRunDemo: (queries: string[]) => void;
  isLoading?: boolean;
}

export function DemoMode({ onSelectQuery, onRunDemo, isLoading = false }: DemoModeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'All Queries', count: DEMO_QUERIES.length },
    { id: 'customers', label: 'Customers', count: DEMO_QUERIES.filter(q => q.category === 'customers').length },
    { id: 'sales', label: 'Sales', count: DEMO_QUERIES.filter(q => q.category === 'sales').length },
    { id: 'products', label: 'Products', count: DEMO_QUERIES.filter(q => q.category === 'products').length },
    { id: 'analytics', label: 'Analytics', count: DEMO_QUERIES.filter(q => q.category === 'analytics').length }
  ];

  const filteredQueries = selectedCategory === 'all' 
    ? DEMO_QUERIES 
    : DEMO_QUERIES.filter(q => q.category === selectedCategory);

  const handleRunFullDemo = () => {
    const demoSequence = [
      'Show me the top 5 customers by total revenue',
      'What are the monthly sales totals for this year?',
      'Which products have sold the most units?'
    ];
    
    toast({
      title: "Demo Started",
      description: "Running a sequence of impressive queries...",
    });
    
    onRunDemo(demoSequence);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            Try Our Demo Queries
          </CardTitle>
          <CardDescription className="text-slate-300">
            Explore the power of Text2SQL with these pre-built examples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Demo Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRunFullDemo}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Running Demo...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Try Full Demo
                </>
              )}
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Demo Queries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQueries.map((query) => (
              <Card
                key={query.id}
                className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group hover-scale"
                onClick={() => onSelectQuery(query.query)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <query.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {query.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {query.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-300"
                        >
                          {query.category}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          → {query.expectedResult}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Info */}
          <div className="text-center text-sm text-slate-400 space-y-2">
            <p>
              💡 <strong>Tip:</strong> Click any query to try it instantly, or run the full demo to see a complete showcase
            </p>
            <p>
              ⚡ All queries are optimized for the sample e-commerce database
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}