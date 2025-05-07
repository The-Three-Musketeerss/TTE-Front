
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
//Pages
import EmployeeHomePage from '@pages/Homepage/Homepage';
import ShopperLayout from "@layouts/ShopperLayout";
import AdminLayout from "@layouts/AdminLayout";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<EmployeeHomePage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
