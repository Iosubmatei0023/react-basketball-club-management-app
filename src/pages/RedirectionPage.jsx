import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedWaveBackground from "../components/AnimatedWaveBackground";

const RedirectionPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <AnimatedWaveBackground />
      <div className="login-box" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#ff7c7c", marginBottom: 16 }}>Oops...</h2>
        <p style={{ marginBottom: 32, color: "#333", fontSize: 18 }}>
          You are not signed in.<br />
          Please sign in to access your account.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <button
            style={{
              background: "linear-gradient(120deg, #7cb0ff 0%, #ffb07c 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.75rem 2rem",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(124,176,255,0.15)",
              transition: "background 0.2s"
            }}
            onClick={() => navigate("/login")}
          >
            Continue to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectionPage;
