
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
//Pages
import EmployeeHomePage from '@pages/Homepage/Homepage';
import Orders from '@pages/Orders/Orders';
import BaseLayout from "@layouts/BaseLayout";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<EmployeeHomePage/>} />
      </Route>
      <Route element={<BaseLayout showFooter/>}>
        <Route path="/my-orders" element={<Orders/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
