import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import RegisterPage from "./pages/RegisterPage";
import Events from "./pages/Events";
import GalleryPage from "./pages/GalleryPage";
import Plans from "./pages/Plans";
import RequireAuth from "./components/RequireAuth";
import LoginRequired from "./pages/LoginRequired";
import RedirectionPage from "./pages/RedirectionPage";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/main.css";
//import {Auth} from "./components/Auth";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/payment/:planId" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<RequireAuth><Events /></RequireAuth>} />
            <Route path="/gallery" element={<RequireAuth><GalleryPage /></RequireAuth>} />
            <Route path="/plans" element={<RequireAuth><Plans /></RequireAuth>} />
            <Route path="/login-required" element={<LoginRequired />} />
            <Route path="/redirection" element={<RedirectionPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  </StrictMode>
);
