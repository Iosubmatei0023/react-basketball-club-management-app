import React, { useState, useEffect } from "react";
import AnimatedWaveBackground from "../components/AnimatedWaveBackground";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, register, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add debugging for user state
  useEffect(() => {
    console.log('LoginPage user state:', user);
    if (user) {
      console.log('Redirecting to account page');
      navigate("/account");
    }
  }, [user, navigate]);

  // Debug auth functions
  useEffect(() => {
    console.log('Auth functions:', {
      login: typeof login,
      register: typeof register,
      signInWithGoogle: typeof signInWithGoogle
    });
  }, [login, register, signInWithGoogle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log('Attempting login with:', { email, password });
      const result = await login(email, password);
      console.log('Login result:', result);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    
    try {
      console.log('Attempting Google sign-in');
      const result = await signInWithGoogle();
      console.log('Google sign-in result:', result);
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      margin: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <AnimatedWaveBackground />
      <div className="login-box">
          <Link to="/" className="home-button">← Back to Home</Link>
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to Basketball Club</p>
          </div>
          <form className="login-form" autoComplete="on" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <div className="auth-options">
            <div className="separator">
              <span>or</span>
            </div>
            <button className="social-login" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? "Signing In..." : (
                <>
                  <FontAwesomeIcon icon={faGoogle} />
                  Continue with Google
                </>
              )}
            </button>
          </div>
          <p className="signup-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;
