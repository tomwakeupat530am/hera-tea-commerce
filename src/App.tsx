
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import OrdersPage from "./pages/AccountPage/OrdersPage";
import PointsPage from "./pages/AccountPage/PointsPage";
import SettingsPage from "./pages/AccountPage/SettingsPage";
import AffiliatePage from "./pages/AffiliatePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ReturnsPage from "./pages/Policy/ReturnsPage";
import ShippingPage from "./pages/Policy/ShippingPage";
import PrivacyPage from "./pages/Policy/PrivacyPage";
import TermsPage from "./pages/Policy/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Account Routes */}
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders" element={<OrdersPage />} />
              <Route path="/account/points" element={<PointsPage />} />
              <Route path="/account/settings" element={<SettingsPage />} />
              
              {/* Information Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />
              
              {/* Policy Pages */}
              <Route path="/policy/returns" element={<ReturnsPage />} />
              <Route path="/policy/shipping" element={<ShippingPage />} />
              <Route path="/policy/privacy" element={<PrivacyPage />} />
              <Route path="/policy/terms" element={<TermsPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
