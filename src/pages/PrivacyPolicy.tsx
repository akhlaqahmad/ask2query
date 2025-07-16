import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Database, Eye, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Your privacy is our priority. Learn how we protect your data.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              Overview
            </CardTitle>
            <CardDescription className="text-slate-300">
              Text2SQL.my is committed to protecting your privacy and data security.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              This Privacy Policy explains how Text2SQL.my ("we," "our," or "us") collects, uses, and protects your information when you use our AI-powered SQL generation service.
            </p>
            <p>
              <strong>Key Principle:</strong> Your database files and query data are processed entirely in your browser and never leave your device.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="h-5 w-5 text-green-400" />
              Data Collection & Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What We DON'T Collect:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Your database files or their contents</li>
                <li>SQL query results or data outputs</li>
                <li>Personal information from your databases</li>
                <li>Sensitive business or personal data</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What We DO Collect:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Natural language queries (for SQL generation via OpenAI API)</li>
                <li>Basic usage analytics (page views, feature usage)</li>
                <li>Error logs (for debugging and improvement)</li>
                <li>Account information (email, if you create an account)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Local Processing:</h3>
              <p className="text-slate-400">
                Your database files are processed entirely in your browser using WebAssembly (WASM). 
                This means your data never leaves your device and is not transmitted to our servers.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-yellow-400" />
              Data Security & Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Browser Storage:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Query history stored locally in your browser</li>
                <li>User preferences saved in local storage</li>
                <li>No server-side storage of your personal data</li>
                <li>You can clear this data anytime through your browser settings</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Third-Party Services:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong>OpenAI API:</strong> Natural language queries are sent to OpenAI for SQL generation</li>
                <li><strong>Supabase:</strong> User authentication and basic analytics</li>
                <li><strong>Firebase:</strong> Hosting and analytics</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Retention:</h3>
              <p className="text-slate-400">
                We retain minimal data for the shortest time necessary. Query logs are automatically deleted after 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of analytics</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Cookies & Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              We use minimal cookies and analytics to improve our service:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Essential cookies for authentication and preferences</li>
              <li>Analytics cookies to understand usage patterns</li>
              <li>No tracking cookies or third-party advertising</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-400" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-white font-medium">Email: <a href="mailto:to@text2sql.my" className="text-purple-400 hover:text-purple-300">to@text2sql.my</a></p>
              <p className="text-slate-400 text-sm mt-1">We typically respond within 24 hours</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Text2SQL.my. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
} 