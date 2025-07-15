import { Card } from "@/components/ui/card";
import { Zap, Brain, Globe, Shield, Wrench } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Accurate SQL Generation",
    description: "Generate complex SQL queries in seconds with high accuracy using advanced AI models."
  },
  {
    icon: Brain,
    title: "Smart Joins, Groupings & Filters",
    description: "Automatically handles complex relationships, aggregations, and filtering logic."
  },
  {
    icon: Globe,
    title: "English & Bahasa Malaysia Support",
    description: "Ask questions in English or Bahasa Malaysia - we understand both languages perfectly."
  },
  {
    icon: Shield,
    title: "Privacy-First: Your Data Never Leaves Your Browser",
    description: "All processing happens locally. Your sensitive data stays secure on your device."
  },
  {
    icon: Wrench,
    title: "API Access (Coming Soon)",
    description: "Integrate Text2SQL.my directly into your applications with our developer-friendly API."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Text2SQL.my?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Built specifically for Malaysian developers and businesses with local language support and privacy-first approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}