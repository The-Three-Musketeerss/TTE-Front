import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import * as Sentry from "@sentry/react";
import BaseLayout from "@layouts/BaseLayout";
import AuthLayout from "@layouts/AuthLayout";
import { ShopProvider } from "@contexts/ShopContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
//Pages
import EmployeeHomePage from "@pages/Homepage/Homepage";
import Orders from "@pages/Orders/Orders";
import Wishlist from "@pages/Wishlist/Wishlist";
import Landing from "@pages/Landing/Landing";
import NotFound from "@pages/NotFound/NotFound";
import Listing from "@pages/Listing/Listing";
import ProductDetail from "@pages/Listing/Id/ProductDetail";
import Login from "@pages/Login/Login";
import Cart from "@pages/Cart/Cart";
import Checkout from "@pages/Checkout/Checkout";
import ForgotPassword from "@pages/ForgotPassword/ForgotPassword";
import Signup from "@pages/Signup/Signup";
import OrderDetail from "@pages/Orders/Id/OrderDetail";

const ENV = import.meta.env.VITE_ENV;

const traceSampleRate = ENV === "production" ? 0.1 : 1.0;


const traceTargets = ENV === "production"
  ? [import.meta.env.VITE_API_URL]
  : [import.meta.env.VITE_TRACE_TARGET_DEV];

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: traceSampleRate,
  tracePropagationTargets: traceTargets,
  environment: ENV,
});


const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <Toaster />
      <BrowserRouter>
        <ShopProvider>
          <Routes>
            <Route element={<BaseLayout />}>
              <Route path="/employee" element={<EmployeeHomePage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route element={<BaseLayout showFooter />}>
              <Route path="/" element={<Landing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/listing/:id" element={<ProductDetail />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ShopProvider>
      </BrowserRouter>
    </CookiesProvider>
  </QueryClientProvider>
);
