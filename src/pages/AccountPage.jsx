import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would implement the actual authentication logic
    // For now, we'll just navigate to the subscriptions page
    navigate("/subscriptions");
  };

  return (
    <div className="account-container">
      <div className="account-form">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AccountPage;
