import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import UserList from "./pages/users";
import UserPage from "./pages/users";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
