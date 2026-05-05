import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutDashboard, Users, Package, ShoppingCart, Tag, Image as ImageIcon, BarChart3, FileText, Settings, ShieldAlert, History, Layers, Folder, UserSquare2, FileBarChart, Bell, User } from "lucide-react";

import SiteLayout from "./components/site/SiteLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import { About, Contact, FAQ, Privacy, Terms, Returns } from "./pages/Content";

import AdminOverview from "./pages/admin/Overview";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSellers from "./pages/admin/Sellers";
import AdminInventory from "./pages/admin/Inventory";
import AdminCoupons from "./pages/admin/Coupons";
import AdminAnalytics from "./pages/admin/Analytics";
import { AdminCustomers, AdminCategories, AdminCollections, AdminBanners, AdminSettings, AdminAuditLogs, AdminSecurityLogs, AdminReports } from "./pages/admin/Misc";

import { SellerOverview, SellerOrders, SellerSimple } from "./pages/seller/SellerPages";

const queryClient = new QueryClient();

const adminNav = [
  { to: "", label: "Overview", icon: LayoutDashboard },
  { to: "/sellers", label: "Sellers", icon: Users },
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: Folder },
  { to: "/collections", label: "Collections", icon: Layers },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/customers", label: "Customers", icon: UserSquare2 },
  { to: "/coupons", label: "Coupons", icon: Tag },
  { to: "/banners", label: "Content", icon: ImageIcon },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/audit", label: "Audit Logs", icon: History },
  { to: "/security", label: "Security", icon: ShieldAlert },
];

const sellerNav = [
  { to: "", label: "Overview", icon: LayoutDashboard },
  { to: "/orders", label: "Assigned Orders", icon: ShoppingCart },
  { to: "/sales", label: "Sales History", icon: BarChart3 },
  { to: "/products", label: "Product Performance", icon: Package },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop mode="shop" />} />
            <Route path="/search" element={<Shop mode="search" />} />
            <Route path="/category/:slug" element={<Shop mode="category" />} />
            <Route path="/collection/:slug" element={<Shop mode="collection" />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/returns" element={<Returns />} />
          </Route>

          <Route path="/admin" element={<DashboardLayout brand="Atelier Admin" basePath="/admin" role="Admin" navItems={adminNav} />}>
            <Route index element={<AdminOverview />} />
            <Route path="sellers" element={<AdminSellers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="collections" element={<AdminCollections />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="audit" element={<AdminAuditLogs />} />
            <Route path="security" element={<AdminSecurityLogs />} />
          </Route>

          <Route path="/seller" element={<DashboardLayout brand="Atelier Seller" basePath="/seller" role="Seller" navItems={sellerNav} />}>
            <Route index element={<SellerOverview />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="sales" element={<SellerSimple title="Sales History" />} />
            <Route path="products" element={<SellerSimple title="Product Performance" />} />
            <Route path="analytics" element={<SellerSimple title="Seller Analytics" />} />
            <Route path="notifications" element={<SellerSimple title="Notifications" />} />
            <Route path="profile" element={<SellerSimple title="Profile" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
