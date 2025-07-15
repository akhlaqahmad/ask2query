import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-slate-800/30 border-slate-700 backdrop-blur-sm">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Ready to Transform Your Data Queries?
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Join thousands of Malaysian developers, analysts, and businesses using Text2SQL.my to generate SQL queries instantly.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Instant Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacy-First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>English & Bahasa</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/app'}
                >
                  Start Generating SQL Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/upload'}
                >
                  Upload Your Database
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">
                  No Signup Needed • Free to Use
                </p>
                <p className="text-sm text-slate-500">
                  Request API access for enterprise integration
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}