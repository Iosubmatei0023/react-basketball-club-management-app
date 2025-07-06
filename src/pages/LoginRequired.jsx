import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedWaveBackground from "../components/AnimatedWaveBackground";

export default function LoginRequired() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <AnimatedWaveBackground />
      <div className="login-box">
        <h1 style={{ color: '#7cb0ff', fontWeight: 700 }}>Login Required</h1>
        <p style={{ fontSize: 18, color: '#444', margin: '1.2rem 0 2rem' }}>
          You must be logged in to view this content.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
          <button
            style={{
              background: '#7cb0ff',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '10px 28px',
              fontWeight: 600,
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(124,176,255,0.13)'
            }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
          <button
            style={{
              background: '#ffb07c',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '10px 28px',
              fontWeight: 600,
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(255,176,124,0.13)'
            }}
            onClick={() => navigate('/')}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
