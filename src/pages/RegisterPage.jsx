import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const RegisterPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/" className="home-button">← Back to Home</Link>
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Sign up to start your basketball journey</p>
        </div>
        <form className="login-form" autoComplete="on">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
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
            />
          </div>
          <button type="submit" className="login-button">
            <span>Sign Up</span>
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
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
