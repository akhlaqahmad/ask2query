
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSection } from "@/components/HeroSection";
import { LiveDemoSection } from "@/components/LiveDemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  const { user, isLoading } = useAuth();

  // Redirect authenticated users to /app
  useEffect(() => {
    if (!isLoading && user) {
      window.location.href = '/app';
    }
  }, [user, isLoading]);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Structured data for homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text2SQL.my",
    "url": "https://text2sql.my",
    "description": "AI-powered SQL generator for Malaysia supporting English and Bahasa Malaysia",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MYR",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Text2SQL.my",
      "url": "https://text2sql.my",
      "logo": {
        "@type": "ImageObject",
        "url": "https://text2sql.my/images/hero.png"
      }
    },
    "inLanguage": ["en-MY", "ms-MY"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Data Analysts, Database Administrators",
      "geographicArea": {
        "@type": "Country",
        "name": "Malaysia"
      }
    },
    "featureList": [
      "Natural Language to SQL Conversion",
      "Bahasa Malaysia Support",
      "Privacy-First Approach",
      "Instant SQL Generation",
      "Database Schema Browser",
      "Query History"
    ]
  };

  return (
    <ThemeProvider>
      <SEO
        title="AI SQL Generator for Malaysia - Convert Text to SQL Instantly"
        description="Convert English or Bahasa Malaysia text to SQL instantly. AI-powered SQL generator with 100% privacy-first approach. No data leaves your browser."
        keywords="text2sql, sql generator, ai sql, malaysia, bahasa malaysia, natural language to sql, privacy-first, database query, sql ai, convert text to sql"
        canonical="https://text2sql.my/"
        structuredData={homepageStructuredData}
      />
      <ScrollProgress />
      <AnimatedBackground />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        <HeroSection />
        <LiveDemoSection />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <CallToActionSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
