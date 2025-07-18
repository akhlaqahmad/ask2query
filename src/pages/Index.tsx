
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSection } from "@/components/HeroSection";
import { LiveDemoSection } from "@/components/LiveDemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import FAQSection from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Login", href: "/login" },
];

// Intersection observer hook for section in view
function useSectionInView(sectionIds: string[]) {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      let found = "Home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = id.charAt(0).toUpperCase() + id.slice(1);
            break;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return active;
}

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

  // Replace useActiveNav with section observer
  const activeNav = useSectionInView(["features", "faq"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Smooth scroll to top for Home
  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }

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
      {/* Floating, sticky, glassy navbar */}
      <nav
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95vw] max-w-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-xl px-4 sm:px-8 py-2 flex items-center justify-between transition-all"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
      >
        {/* Logo/Brand (reloads app) */}
        <a href="/" className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-white tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-1">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="url(#a)"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="a" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#60A5FA"/><stop offset="1" stopColor="#A78BFA"/></linearGradient></defs></svg>
          </span>
          Text2SQL
        </a>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-2 w-full justify-end items-center">
          <li>
            <button
              onClick={scrollToTop}
              className={`relative px-6 py-2 font-semibold text-slate-800 dark:text-white transition rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${activeNav === 'Home' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Home' ? "page" : undefined}
            >
              Home
              {activeNav === 'Home' && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full shadow-md animate-bounce" />
              )}
            </button>
          </li>
          <li>
            <a
              href="#features"
              className={`relative px-6 py-2 font-semibold text-slate-800 dark:text-white transition rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${activeNav === 'Features' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Features' ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Features
              {activeNav === 'Features' && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full shadow-md animate-bounce" />
              )}
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className={`relative px-6 py-2 font-semibold text-slate-800 dark:text-white transition rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${activeNav === 'Faq' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Faq' ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              FAQ
              {activeNav === 'Faq' && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full shadow-md animate-bounce" />
              )}
            </a>
          </li>
          <li>
            <a
              href="/login"
              className={`relative px-6 py-2 font-semibold text-slate-800 dark:text-white transition rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${activeNav === 'Login' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Login' ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Login
              {activeNav === 'Login' && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full shadow-md animate-bounce" />
              )}
            </a>
          </li>
        </ul>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl flex flex-col items-center gap-2 py-4 animate-fade-in z-50">
            <button
              onClick={scrollToTop}
              className={`w-11/12 text-center px-6 py-3 font-semibold text-lg rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800 ${activeNav === 'Home' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Home' ? "page" : undefined}
            >
              Home
            </button>
            <a
              href="#features"
              className={`w-11/12 text-center px-6 py-3 font-semibold text-lg rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800 ${activeNav === 'Features' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Features' ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#faq"
              className={`w-11/12 text-center px-6 py-3 font-semibold text-lg rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800 ${activeNav === 'Faq' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Faq' ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </a>
            <a
              href="/login"
              className={`w-11/12 text-center px-6 py-3 font-semibold text-lg rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800 ${activeNav === 'Login' ? 'bg-slate-200 dark:bg-slate-700 shadow-lg' : ''}`}
              aria-current={activeNav === 'Login' ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Login
            </a>
          </div>
        )}
      </nav>
      {/* Spacer for fixed nav */}
      <div className="h-24" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        {/* New Navigation Menu */}
        {/* End Navigation Menu */}
        <HeroSection />
        <LiveDemoSection />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <FAQSection />
        <CallToActionSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
