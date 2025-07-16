
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSection } from "@/components/HeroSection";
import { LiveDemoSection } from "@/components/LiveDemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Footer } from "@/components/Footer";

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
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
