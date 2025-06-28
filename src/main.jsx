import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import "./styles/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/payment/:planId" element={<PaymentPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
