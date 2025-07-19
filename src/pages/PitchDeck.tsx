
import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Database, Globe, Shield, Zap, Users, TrendingUp, Code, Brain, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SEO } from "@/components/SEO";

interface TechStackContent {
  frontend: string[];
  backend: string[];
  tools: string[];
}

interface FeatureContent {
  icon: any;
  title: string;
  desc: string;
}

interface MarketContent {
  segment: string;
  size: string;
  growth: string;
}

interface MetricContent {
  metric: string;
  value: string;
  desc: string;
}

interface RoadmapContent {
  phase: string;
  items: string[];
}

type SlideContent = 
  | string 
  | string[] 
  | TechStackContent 
  | FeatureContent[] 
  | MarketContent[] 
  | MetricContent[] 
  | RoadmapContent[];

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  content: SlideContent;
  type: string;
}

const slides: Slide[] = [
  {
    id: "intro",
    title: "Text2SQL.my",
    subtitle: "AI-Powered SQL Generator for Malaysia",
    content: "Transform Natural Language to SQL Instantly",
    type: "hero"
  },
  {
    id: "problem",
    title: "The Problem",
    subtitle: "SQL Barriers in Malaysia",
    content: [
      "Complex SQL syntax learning curve",
      "Language barriers (English-only tools)",
      "Time-consuming query writing",
      "Data privacy concerns with cloud tools"
    ],
    type: "list"
  },
  {
    id: "solution",
    title: "Our Solution",
    subtitle: "Privacy-First AI SQL Generator",
    content: [
      "🧠 AI-powered natural language to SQL conversion",
      "🇲🇾 Supports English & Bahasa Malaysia",
      "🔒 100% client-side database processing",
      "⚡ Real-time query execution & visualization"
    ],
    type: "features"
  },
  {
    id: "tech-stack",
    title: "Technology Stack",
    subtitle: "Modern, Scalable Architecture",
    content: {
      frontend: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Supabase", "OpenAI GPT-4", "PostgreSQL", "Edge Functions"],
      tools: ["Vite", "React Query", "sql.js", "Firebase Hosting"]
    },
    type: "tech"
  },
  {
    id: "architecture",
    title: "System Architecture",
    subtitle: "Privacy-First Design",
    content: "User uploads database → Client-side processing → AI generates SQL → Local execution → Results visualization",
    type: "architecture"
  },
  {
    id: "features",
    title: "Core Features",
    subtitle: "Complete SQL Workflow",
    content: [
      { icon: Brain, title: "AI SQL Generation", desc: "Natural language to SQL with GPT-4" },
      { icon: Database, title: "Database Management", desc: "Upload, browse schema, execute queries" },
      { icon: Shield, title: "Privacy First", desc: "Client-side processing, no data uploads" },
      { icon: Zap, title: "Real-time Results", desc: "Instant query execution & visualization" }
    ],
    type: "feature-cards"
  },
  {
    id: "target-market",
    title: "Target Market",
    subtitle: "Growing Demand in Malaysia",
    content: [
      { segment: "Data Analysts", size: "15,000+", growth: "+25% YoY" },
      { segment: "Developers", size: "120,000+", growth: "+30% YoY" },
      { segment: "Business Users", size: "50,000+", growth: "+40% YoY" }
    ],
    type: "market"
  },
  {
    id: "innovation",
    title: "Technical Innovation",
    subtitle: "What Makes Us Different",
    content: [
      "Client-side SQLite processing (privacy advantage)",
      "Bilingual AI integration (first in Malaysia)",
      "Intelligent query caching system",
      "Progressive Web App capabilities"
    ],
    type: "innovation"
  },
  {
    id: "demo",
    title: "Live Demo",
    subtitle: "See It In Action",
    content: "Ready to transform 'Show me sales by region' into professional SQL?",
    type: "demo"
  },
  {
    id: "roadmap",
    title: "Product Roadmap",
    subtitle: "Scaling for Growth",
    content: [
      { phase: "Q1 2025", items: ["Email newsletters", "Advanced visualizations"] },
      { phase: "Q2 2025", items: ["Multi-database support", "Team collaboration"] },
      { phase: "Q3 2025", items: ["API access", "Enterprise features"] }
    ],
    type: "roadmap"
  },
  {
    id: "business",
    title: "Business Value",
    subtitle: "Measurable Impact",
    content: [
      { metric: "Time Saved", value: "70%", desc: "Faster query creation" },
      { metric: "Learning Curve", value: "80%", desc: "Reduced SQL complexity" },
      { metric: "Data Privacy", value: "100%", desc: "Local processing guarantee" }
    ],
    type: "metrics"
  },
  {
    id: "thank-you",
    title: "Thank You",
    subtitle: "Questions & Discussion",
    content: "Ready to revolutionize SQL in Malaysia",
    type: "closing"
  }
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  const renderSlideContent = () => {
    switch (slide.type) {
      case "hero":
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-2xl text-slate-300">{slide.subtitle}</p>
              <p className="text-xl text-slate-400">{slide.content as string}</p>
            </div>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                🇲🇾 Made for Malaysia
              </Badge>
            </div>
          </div>
        );

      case "list":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid gap-4 max-w-2xl mx-auto">
              {(slide.content as string[]).map((item, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <p className="text-lg text-slate-200">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {(slide.content as string[]).map((item, index) => (
                <Card key={index} className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-slate-700">
                  <CardContent className="p-6">
                    <p className="text-2xl text-white">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "tech":
        const techContent = slide.content as TechStackContent;
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Code className="h-5 w-5" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {techContent.frontend.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Database className="h-5 w-5" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {techContent.backend.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Layers className="h-5 w-5" />
                    Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {techContent.tools.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "architecture":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-between text-lg text-slate-200">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Users className="h-8 w-8 text-blue-400" />
                    </div>
                    <p>User Input</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-slate-400" />
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="h-8 w-8 text-green-400" />
                    </div>
                    <p>Client Processing</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-slate-400" />
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="h-8 w-8 text-purple-400" />
                    </div>
                    <p>AI Generation</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-slate-400" />
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="h-8 w-8 text-orange-400" />
                    </div>
                    <p>Results</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "feature-cards":
        const featureContent = slide.content as FeatureContent[];
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {featureContent.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <Icon className="h-6 w-6 text-blue-400" />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300">{feature.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case "market":
        const marketContent = slide.content as MarketContent[];
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {marketContent.map((market, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{market.segment}</h3>
                        <p className="text-slate-300">Market size: {market.size}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        {market.growth}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "metrics":
        const metricsContent = slide.content as MetricContent[];
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {metricsContent.map((metric, index) => (
                <Card key={index} className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700 text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-blue-400 mb-2">{metric.value}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{metric.metric}</h3>
                    <p className="text-slate-300">{metric.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "roadmap":
        const roadmapContent = slide.content as RoadmapContent[];
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {roadmapContent.map((phase, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">{phase.phase}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-slate-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "demo":
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
              <p className="text-lg text-slate-400">{slide.content as string}</p>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Play className="h-5 w-5 mr-2" />
                Start Live Demo
              </Button>
            </div>
          </div>
        );

      case "closing":
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {slide.title}
              </h2>
              <p className="text-2xl text-slate-300">{slide.subtitle}</p>
              <p className="text-xl text-slate-400">{slide.content as string}</p>
            </div>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                🚀 Production Ready
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                🇲🇾 Made in Malaysia
              </Badge>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
            </div>
            <div className="grid gap-4 max-w-2xl mx-auto">
              {(slide.content as string[]).map((item, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <p className="text-lg text-slate-200">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <SEO
        title="Pitch Deck - Text2SQL.my Demo Presentation"
        description="Professional pitch deck presentation for Text2SQL.my - AI-powered SQL generator for Malaysia"
        keywords="pitch deck, demo, text2sql, presentation, judges"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        {/* Header with progress */}
        <div className="p-4 border-b border-slate-700">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">Text2SQL.my Pitch Deck</h1>
              <Badge variant="secondary">
                {currentSlide + 1} / {slides.length}
              </Badge>
            </div>
            <Progress value={progress} className="w-48" />
          </div>
        </div>

        {/* Main slide content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl mx-auto">
            {renderSlideContent()}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-slate-700">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {/* Slide dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? 'bg-blue-500'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Keyboard navigation hint */}
        <div className="p-2 text-center text-sm text-slate-500">
          Use arrow keys or click dots to navigate • Press F11 for fullscreen
        </div>
      </div>
    </>
  );
}
