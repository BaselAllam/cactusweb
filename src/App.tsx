import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaqsPage from "./routes/faqs";
import Index from "./routes/index";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ProductsPage from "./routes/services";
import ProductDetailsPage from "./routes/servicesdetails";
import ScrollToTop from "./components/ScrollToTop";
import { LangProvider } from "./contexts/LangContext";
import NotFound from "./routes/NotFound";
import PixelTracker from "./lib/PixelTracker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LangProvider>
    <TooltipProvider>
        <BrowserRouter>
        <PixelTracker />
        <ScrollToTop />
            <Toaster />
            <Sonner />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/services" element={<ProductsPage />} />
            <Route path="/services/:slug" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </TooltipProvider>
    </LangProvider>
  </QueryClientProvider>
);

export default App;