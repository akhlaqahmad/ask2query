
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { SQLiteDatabaseProvider } from "@/contexts/SQLiteDatabaseContext";
import Index from "./pages/Index";
import DatabaseUpload from "./pages/DatabaseUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DatabaseProvider>
      <SQLiteDatabaseProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/upload" element={<DatabaseUpload />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SQLiteDatabaseProvider>
    </DatabaseProvider>
  </QueryClientProvider>
);

export default App;
