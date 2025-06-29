import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate login (replace with actual API call)
    const userData = {
      name: "John Doe",
      email: email,
      role: "Member",
      membership: "Active",
      joinDate: "June 2023"
    };
    
    login(userData);
    navigate("/account");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/" className="home-button">← Back to Home</Link>
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to Basketball Club</p>
        </div>
        <form className="login-form" autoComplete="on">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              required
              placeholder="Enter your email"
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
            />
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">
            <span>Sign In</span>
          </button>
        </form>
        <div className="auth-options">
          <div className="separator">
            <span>or</span>
          </div>
          <button className="social-login">
            <FontAwesomeIcon icon={faGoogle} />
            Continue with Google
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
