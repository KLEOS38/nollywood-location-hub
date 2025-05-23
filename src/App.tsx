
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import LocationsPage from "./pages/LocationsPage";
import LocationDetail from "./pages/LocationDetail";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ListPropertyPage from "./pages/ListPropertyPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import BookingCanceledPage from "./pages/BookingCanceledPage";

// Help Center Pages
import HelpCenter from "./pages/support/HelpCenter";
import SafetyInfo from "./pages/support/SafetyInfo";
import CancellationOptions from "./pages/support/CancellationOptions";
import CovidGuidelines from "./pages/support/CovidGuidelines";

// Community Pages
import ForFilmmakers from "./pages/community/ForFilmmakers";
import ForPropertyOwners from "./pages/community/ForPropertyOwners";
import CommunityForum from "./pages/community/CommunityForum";
import FilmingResources from "./pages/community/FilmingResources";

// About Pages
import HowItWorks from "./pages/about/HowItWorks";
import Newsroom from "./pages/about/Newsroom";
import Investors from "./pages/about/Investors";
import Careers from "./pages/about/Careers";

// Legal Pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Sitemap from "./pages/legal/Sitemap";

// Add the PropertyManagementPage import
import PropertyManagementPage from '@/pages/PropertyManagementPage';

// Create a stable QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Create a stable router key
const ROUTER_KEY = "film-loca-router-v1";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter key={ROUTER_KEY}>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:id" element={<LocationDetail />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/list-property" element={<ListPropertyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/booking-success" element={<BookingSuccessPage />} />
            <Route path="/booking-canceled" element={<BookingCanceledPage />} />
            
            {/* Support Pages */}
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/safety" element={<SafetyInfo />} />
            <Route path="/cancellation" element={<CancellationOptions />} />
            <Route path="/covid" element={<CovidGuidelines />} />
            
            {/* Community Pages */}
            <Route path="/filmmakers" element={<ForFilmmakers />} />
            <Route path="/homeowners" element={<ForPropertyOwners />} />
            <Route path="/forum" element={<CommunityForum />} />
            <Route path="/resources" element={<FilmingResources />} />
            
            {/* About Pages */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/news" element={<Newsroom />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/manage-properties" element={<PropertyManagementPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
