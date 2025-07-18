
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { SQLiteDatabaseProvider } from "@/contexts/SQLiteDatabaseContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AppPage from "./pages/App";
import UserProfile from "./pages/UserProfile";
import AnimatedLogin from "./pages/AnimatedLogin";
import DatabaseUpload from "./pages/DatabaseUpload";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CookieConsent from './components/CookieConsent';

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DatabaseProvider>
          <SQLiteDatabaseProvider>
            <TooltipProvider>
              <CookieConsent />
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<AnimatedLogin />} />
                  <Route path="/animated-login" element={<AnimatedLogin />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route 
                    path="/app" 
                    element={
                      <ProtectedRoute>
                        <AppPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/admin/*" element={<Admin />} />
                  <Route path="/upload" element={<DatabaseUpload />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SQLiteDatabaseProvider>
        </DatabaseProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
