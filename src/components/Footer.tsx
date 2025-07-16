
import { Heart, Github, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Text2SQL.my</h3>
              <p className="text-sm text-slate-400">
                AI-powered SQL generator built for Malaysian developers and businesses.
              </p>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="text-sm">Made with</span>
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm">in Malaysia</span>
                <span className="text-lg">🇲🇾</span>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Product</h4>
              <ul className="space-y-2">
                <li><a href="/app" className="text-sm text-slate-400 hover:text-white transition-colors">Generate SQL</a></li>
                <li><a href="/upload" className="text-sm text-slate-400 hover:text-white transition-colors">Upload Database</a></li>
                <li><a href="#live-demo" className="text-sm text-slate-400 hover:text-white transition-colors">Live Demo</a></li>
                <li><span className="text-sm text-slate-500">API Access (Coming Soon)</span></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Connect</h4>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:bg-slate-700">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:bg-slate-700" asChild>
                  <a href="mailto:to@text2sql.my">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:bg-slate-700">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-400">
                <a href="mailto:to@text2sql.my" className="hover:text-white transition-colors">to@text2sql.my</a>
              </p>
              <p className="text-xs text-slate-500">
                Contact us for enterprise solutions and API access
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-slate-400">
                © 2024 Text2SQL.my. All rights reserved.
              </div>
              <div className="text-sm text-slate-400">
                Powered by OpenAI • Built for Malaysia • Privacy-First
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
