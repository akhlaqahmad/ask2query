
interface ExampleQueriesProps {
  onSelectExample: (query: string) => void;
}

export function ExampleQueries({ onSelectExample }: ExampleQueriesProps) {
  const examples = [
    "Show top 5 customers by total revenue",
    "List all products in electronics category under $100",
    "Find customers who haven't placed any orders",
    "Get monthly sales revenue for the last 6 months",
    "Show the most popular products by quantity sold",
    "Find customers from USA who ordered more than $500 total"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Example Queries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onSelectExample(example)}
              className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
