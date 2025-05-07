
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
//Pages
import EmployeeHomePage from '@pages/Homepage/Homepage';
import BaseLayout from "@layouts/BaseLayout";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<EmployeeHomePage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
