import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Summarizer from "./pages/Summarizer";
import SavedPlans from "./pages/SavedPlans";
import SavedSummaries from "./pages/SavedSummaries";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";
import SingleSummary from "./pages/SingleSummary";
import ViewPlan from "./pages/ViewPlan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/study-planner" element={<StudyPlanner />} />
          <Route path="/summarizer" element={<Summarizer />} />
          <Route path="/saved-plans" element={<SavedPlans />} />
          <Route path="/saved-summaries" element={<SavedSummaries />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/summary/:id" element={<SingleSummary />} />
          <Route path="/saved-plans/:id" element={<ViewPlan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
