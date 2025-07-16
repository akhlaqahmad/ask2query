
import { Card } from "@/components/ui/card";
import { Zap, Brain, Globe, Shield, Wrench } from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";

const features = [
  {
    icon: Zap,
    title: "Fast & Accurate SQL Generation",
    description: "Generate complex SQL queries in seconds with high accuracy using advanced AI models.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Brain,
    title: "Smart Joins, Groupings & Filters",
    description: "Automatically handles complex relationships, aggregations, and filtering logic.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "English & Bahasa Malaysia Support",
    description: "Ask questions in English or Bahasa Malaysia - we understand both languages perfectly.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Privacy-First: Your Data Never Leaves Your Browser",
    description: "All processing happens locally. Your sensitive data stays secure on your device.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Wrench,
    title: "API Access (Coming Soon)",
    description: "Integrate Text2SQL.my directly into your applications with our developer-friendly API.",
    color: "from-red-500 to-rose-500"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Why Choose Text2SQL.my?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Built specifically for Malaysian developers and businesses with local language support and privacy-first approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard 
                key={index} 
                delay={index * 200}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}>
                    <feature.icon className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
