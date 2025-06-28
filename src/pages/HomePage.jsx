import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
      <nav className="nav-bar">
        <Link to="/account" className="account-button">
          Account
        </Link>
      </nav>
      <main className="main-content">
        <h1>Welcome to Basketball Club Management</h1>
        <p>
          Your one-stop solution for basketball club subscriptions and payments
        </p>
      </main>
    </div>
  );
}

export default HomePage;
