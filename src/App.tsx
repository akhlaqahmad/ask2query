
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { SQLiteDatabaseProvider } from "@/contexts/SQLiteDatabaseContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AppPage from "./pages/App";
import UserProfile from "./pages/UserProfile";
import AnimatedLogin from "./pages/AnimatedLogin";
import DatabaseUpload from "./pages/DatabaseUpload";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DatabaseProvider>
        <SQLiteDatabaseProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<AnimatedLogin />} />
                <Route path="/animated-login" element={<AnimatedLogin />} />
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
                <Route path="/upload" element={<DatabaseUpload />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SQLiteDatabaseProvider>
      </DatabaseProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
