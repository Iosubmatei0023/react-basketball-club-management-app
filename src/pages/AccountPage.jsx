import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="account-container">
        <div className="account-box">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to access your account</p>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="login-button"
            style={{ width: '100%' }}
          >
            <span>Sign In to Your Account</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-box">
        <Link to="/" className="home-button">← Back to Home</Link>
        <div className="account-header">
          <h2>My Account</h2>
          <p>Manage your basketball club account</p>
        </div>
        
        <div className="profile-section">
          <div className="profile-avatar">
            <span>{userData.name[0]}</span>
          </div>
          
          <div className="profile-info">
            <label>Name:</label>
            <span>{userData.name}</span>
          </div>
          
          <div className="profile-info">
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          
          <div className="profile-info">
            <label>Role:</label>
            <span>{userData.role}</span>
          </div>
          
          <div className="profile-info">
            <label>Membership:</label>
            <span>{userData.membership}</span>
          </div>
          
          <div className="profile-info">
            <label>Joined:</label>
            <span>{userData.joinDate}</span>
          </div>
        </div>

        <div className="profile-section">
          <h3>Actions</h3>
          <button className="edit-profile-btn">Edit Profile</button>
          <button 
            onClick={logout} 
            className="edit-profile-btn"
            style={{ marginTop: '1rem' }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
