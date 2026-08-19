
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import DemoLanding from "./pages/DemoLanding";
import FAQPage from "./pages/FAQPage";
import About from "./pages/About";
import EstimateSoftware from "./pages/about/EstimateSoftware";
import InvoicingSoftware from "./pages/about/InvoicingSoftware";
import FreeSoftware from "./pages/about/FreeSoftware";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/demo" element={<DemoLanding />} />
        <Route path="/demo/sandbox" element={<Demo />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/auto-repair-estimate-software" element={<EstimateSoftware />} />
        <Route path="/about/auto-repair-invoicing-software" element={<InvoicingSoftware />} />
        <Route path="/about/free-auto-repair-shop-software" element={<FreeSoftware />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
