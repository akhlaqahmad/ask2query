import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Code, Building, GraduationCap, ArrowRight } from "lucide-react";

const useCases = [
  {
    icon: BarChart3,
    title: "For Analysts",
    description: "Generate complex analytical queries without deep SQL knowledge. Perfect for business intelligence and reporting.",
    examples: [
      "Customer segmentation analysis",
      "Sales trend reports",
      "Performance metrics"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "For Developers",
    description: "Speed up development with instant SQL generation. Focus on building features, not writing queries.",
    examples: [
      "API endpoint queries",
      "Database migrations",
      "Testing scenarios"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Building,
    title: "For SMEs",
    description: "Empower small businesses to make data-driven decisions without hiring SQL experts.",
    examples: [
      "Inventory management",
      "Customer insights",
      "Financial reports"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Learn SQL by example. See how natural language translates to SQL syntax.",
    examples: [
      "Database coursework",
      "Learning SQL syntax",
      "Project development"
    ],
    color: "from-orange-500 to-red-500"
  }
];

export function UseCasesSection() {
  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perfect for Every Use Case
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Whether you're a data analyst, developer, business owner, or student - Text2SQL.my adapts to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-8 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center`}>
                      <useCase.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {useCase.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-lg">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                      Common Use Cases:
                    </h4>
                    <ul className="space-y-2">
                      {useCase.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center space-x-2 text-slate-400">
                          <ArrowRight className="h-4 w-4 text-blue-400" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 group-hover:border-slate-500"
                    onClick={() => window.location.href = '/app'}
                  >
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}