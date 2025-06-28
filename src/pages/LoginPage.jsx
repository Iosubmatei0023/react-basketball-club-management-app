import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" autoComplete="on">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              required
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
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/sign-in">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
