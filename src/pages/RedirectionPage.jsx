import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectionPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #7cb0ff 0%, #ffb07c 100%)",
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <div style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        padding: "2.5rem 2rem",
        maxWidth: 380,
        width: "100%",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#ff7c7c", marginBottom: 16 }}>Oops...</h2>
        <p style={{ marginBottom: 32, color: "#333", fontSize: 18 }}>
          You are not signed in.<br />
          Please sign in to access your account.
        </p>
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
  );
};

export default RedirectionPage;
