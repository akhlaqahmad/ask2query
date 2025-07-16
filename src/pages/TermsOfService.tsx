import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Shield, Scale, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function TermsOfService() {
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: "Terms of Service", url: "/terms", current: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <SEO
        title="Terms of Service - Usage Guidelines & Legal Terms"
        description="Read Text2SQL.my's Terms of Service. Understanding your rights and responsibilities when using our AI-powered SQL generator service."
        keywords="terms of service, usage guidelines, legal terms, text2sql terms, service agreement, user agreement"
        canonical="https://text2sql.my/terms"
        breadcrumbs={breadcrumbs}
      />
      
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
          
          <Breadcrumb items={breadcrumbs} className="ml-4" />
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using Text2SQL.my services.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-400" />
              Agreement to Terms
            </CardTitle>
            <CardDescription className="text-slate-300">
              By accessing and using Text2SQL.my, you agree to be bound by these Terms of Service.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              These Terms of Service ("Terms") govern your use of Text2SQL.my ("Service"), operated by Text2SQL.my ("we," "our," or "us").
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Service Description</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              Text2SQL.my is an AI-powered service that converts natural language queries into SQL statements. Our service:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Processes your natural language queries using OpenAI's GPT-4</li>
              <li>Generates SQL queries based on your input</li>
              <li>Allows you to upload and query SQLite databases locally</li>
              <li>Provides data visualization and export capabilities</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">You agree to:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to reverse engineer or hack the Service</li>
                <li>Not upload malicious or harmful content</li>
                <li>Respect intellectual property rights</li>
                <li>Not use the Service to generate harmful or illegal SQL queries</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">You are responsible for:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>The accuracy and legality of your database content</li>
                <li>Ensuring you have rights to query your uploaded databases</li>
                <li>Complying with applicable data protection laws</li>
                <li>Maintaining the confidentiality of your account credentials</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Data Processing & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Local Processing:</h3>
              <p className="text-slate-400">
                Your database files are processed entirely in your browser using WebAssembly. We do not store or have access to your database contents.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Query Processing:</h3>
              <p className="text-slate-400">
                Natural language queries are sent to OpenAI's API for SQL generation. We do not store these queries permanently and they are automatically deleted after 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Service Availability</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              We strive to provide reliable service, but we cannot guarantee:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>100% uptime or uninterrupted service</li>
              <li>Accuracy of all generated SQL queries</li>
              <li>Compatibility with all database schemas</li>
              <li>Availability of all features at all times</li>
            </ul>
            <p className="text-slate-400">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Our Rights:</h3>
              <p className="text-slate-400">
                The Service, including its design, features, and underlying technology, is owned by Text2SQL.my and protected by intellectual property laws.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Rights:</h3>
              <p className="text-slate-400">
                You retain all rights to your data and database content. Generated SQL queries are yours to use freely.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Disclaimers & Limitations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Service Disclaimer:</h3>
              <p className="text-slate-400">
                The Service is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of generated SQL queries.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Limitation of Liability:</h3>
              <p className="text-slate-400">
                We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">User Responsibility:</h3>
              <p className="text-slate-400">
                You are responsible for reviewing and testing all generated SQL queries before using them in production environments.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              We may terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Violation of these Terms</li>
              <li>Misuse of the Service</li>
              <li>Illegal or harmful activities</li>
              <li>Extended periods of inactivity</li>
            </ul>
            <p className="text-slate-400">
              You may terminate your account at any time by contacting us or deleting your account through the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Posting the updated Terms on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending email notifications for significant changes</li>
            </ul>
            <p className="text-slate-400">
              Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              These Terms are governed by the laws of Malaysia. Any disputes arising from these Terms or your use of the Service will be resolved in Malaysian courts.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-400" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              If you have any questions about these Terms of Service, please contact us:
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