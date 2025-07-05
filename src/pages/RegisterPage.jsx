import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, signInWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const user = await register(email, password, name);
      
      // Get user data from Firebase
      const userData = {
        name: user.displayName,
        email: user.email,
        role: "Member",
        membership: "Active",
        joinDate: new Date().toLocaleDateString()
      };
      
      navigate("/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    
    try {
      const user = await signInWithGoogle();
      
      // Get user data from Firebase
      const userData = {
        name: user.displayName,
        email: user.email,
        role: "Member",
        membership: "Active",
        joinDate: new Date().toLocaleDateString()
      };
      
      navigate("/account");
    } catch (err) {
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
      background: "linear-gradient(120deg, #7cb0ff 0%, #ffb07c 100%)"
    }}>
      <div className="login-box">
          <Link to="/" className="home-button">← Back to Home</Link>
          <div className="login-header">
            <h2>Create Account</h2>
            <p>Sign up to start your basketball journey</p>
          </div>
          <form className="login-form" autoComplete="on" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                autoComplete="new-password"
                required
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <div className="auth-options">
            <div className="separator">
              <span>or</span>
            </div>
            <button className="social-login" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? "Signing In..." : <>
                <FontAwesomeIcon icon={faGoogle} />
                Continue with Google
              </>}
            </button>
          </div>
          <p className="signup-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
  );
};

export default RegisterPage;
