import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "@layouts/BaseLayout";
//Pages
import EmployeeHomePage from "@pages/Homepage/Homepage";
import Orders from "@pages/Orders/Orders";
import Wishlist from "@pages/Wishlist/Wishlist";
import Landing from "@pages/Landing/Landing";
import NotFound from "@pages/NotFound/NotFound";
import Listing from "@pages/Listing/Listing";
import ProductDetail from "@pages/Listing/Id/ProductDetail";
import Login from "@pages/Login/Login";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <CookiesProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/employee" element={<EmployeeHomePage />} />
        </Route>

        <Route element={<BaseLayout showHeader={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<BaseLayout showFooter />}>
          <Route path="/" element={<Landing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/:id" element={<ProductDetail />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);
