
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
//Pages
import EmployeeHomePage from '@pages/EmployeeHomePage';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmployeeHomePage/>} />
    </Routes>
  </BrowserRouter>
);
