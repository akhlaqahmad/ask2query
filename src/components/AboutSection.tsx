import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles, Database, Zap, Shield, Brain, Github, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function AboutSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Uses GPT-4 to understand natural language and generate accurate SQL queries'
    },
    {
      icon: Database,
      title: 'SQLite Support',
      description: 'Upload and query your own SQLite databases securely in your browser'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Instant query execution with interactive tables and visualizations'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays in your browser. No server uploads or data sharing'
    }
  ];

  const technologies = [
    { name: 'OpenAI GPT-4', description: 'Natural language processing' },
    { name: 'React + TypeScript', description: 'Frontend framework' },
    { name: 'SQLite WASM', description: 'In-browser database engine' },
    { name: 'Recharts', description: 'Data visualization' },
    { name: 'Tailwind CSS', description: 'UI styling' },
    { name: 'Supabase', description: 'Backend infrastructure' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
          About Text2SQL
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            About Text2SQL
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Text2SQL
            </div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transform natural language questions into powerful SQL queries using advanced AI technology
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <span>Powered by</span>
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300">
                OpenAI GPT-4
              </Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <feature.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">How It Works</CardTitle>
              <CardDescription className="text-slate-300">
                The process behind converting natural language to SQL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <h4 className="font-medium text-white">Parse Input</h4>
                  <p className="text-sm text-slate-400">AI analyzes your natural language question</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <h4 className="font-medium text-white">Generate SQL</h4>
                  <p className="text-sm text-slate-400">Creates optimized SQL based on your schema</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-green-400 font-bold">3</span>
                  </div>
                  <h4 className="font-medium text-white">Execute & Visualize</h4>
                  <p className="text-sm text-slate-400">Runs query and shows results with charts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Technology Stack</CardTitle>
              <CardDescription className="text-slate-300">
                Built with modern web technologies for performance and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white text-sm">{tech.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{tech.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-300">🔒 Local Processing</h4>
                  <p className="text-slate-300">Your database files are processed entirely in your browser using WebAssembly</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-300">🚫 No Data Upload</h4>
                  <p className="text-slate-300">Database contents never leave your device or get sent to any server</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-300">🔐 Secure Queries</h4>
                  <p className="text-slate-300">Only SELECT queries are allowed for read-only database access</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-300">💾 Local Storage</h4>
                  <p className="text-slate-300">Query history and preferences stored locally in your browser</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links & Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-700">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700">
                <Github className="h-4 w-4 mr-2" />
                View Source
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700">
                <Globe className="h-4 w-4 mr-2" />
                Live Demo
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div className="text-sm text-slate-400 text-center">
              <p>Built with ❤️ for data analysts and developers</p>
              <p className="mt-1">© 2024 Text2SQL. Open source project.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}