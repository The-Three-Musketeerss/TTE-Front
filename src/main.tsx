
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "@layouts/BaseLayout";
//Pages
import EmployeeHomePage from '@pages/Homepage/Homepage';
import Orders from '@pages/Orders/Orders';
import Wishlist from '@pages/Wishlist/Wishlist';
import Users from "@pages/Users/Users";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<EmployeeHomePage/>}/>
        <Route path="/users" element={<Users/>}/>
      </Route>
      <Route element={<BaseLayout showFooter/>}>
        <Route path="/orders" element={<Orders/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
