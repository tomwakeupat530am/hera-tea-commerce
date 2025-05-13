
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

// Pages
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/Products/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";
import OrderHistory from "./pages/Orders/OrderHistory";
import PointsPage from "./pages/AccountPage/PointsPage";
import SettingsPage from "./pages/AccountPage/SettingsPage";
import Dashboard from "./pages/Affiliate/Dashboard";
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
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Account Routes */}
              <Route path="/account" element={<Profile />} />
              <Route path="/account/orders" element={<OrderHistory />} />
              <Route path="/account/points" element={<PointsPage />} />
              <Route path="/account/settings" element={<SettingsPage />} />
              <Route path="/affiliate" element={<Dashboard />} />
              
              {/* Information Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Policy Pages */}
              <Route path="/policy/returns" element={<ReturnsPage />} />
              <Route path="/policy/shipping" element={<ShippingPage />} />
              <Route path="/policy/privacy" element={<PrivacyPage />} />
              <Route path="/policy/terms" element={<TermsPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
