
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
//Pages
import EmployeeHomePage from '@pages/Homepage/Homepage';
import Orders from '@pages/Orders/Orders';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmployeeHomePage/>} />
      <Route path="/orders" element={<Orders/>} />
    </Routes>
  </BrowserRouter>
);
