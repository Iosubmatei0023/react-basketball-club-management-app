import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || user.displayName || "",
        email: user.email,
        role: user.role || "Member",
        membership: "Active",
        joinDate: new Date(user.created || Date.now()).toLocaleDateString()
      };
      setUserData(userData);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="account-container">
        <div className="account-box">
          <div className="loading-header">
            <h2>My Account</h2>
            <p>Loading your account information...</p>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="account-header">
          <h1>My Account</h1>
          <p>Your basketball club membership details</p>
        </div>
        
        <div className="profile-section">
          <div className="profile-avatar">
            <span>{userData.name[0].toUpperCase()}</span>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <div className="info-icon">👤</div>
              <span className="info-label">Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📧</div>
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📅</div>
              <span className="info-label">Joined:</span>
              <span className="info-value">{userData.joinDate}</span>
            </div>
            
            <div className="info-item">
              <div className="info-icon">✅</div>
              <span className="info-label">Membership Status:</span>
              <span className="info-value active">{userData.membership}</span>
            </div>
          </div>
        </div>

        <div className="profile-section actions-section">
          <h3>Account Actions</h3>
          <div className="action-buttons">
            <button className="action-button edit-btn">
              📝 Edit Profile
            </button>
            <button 
              onClick={logout} 
              className="action-button logout-btn"
            >
              ❌ Logout
            </button>
          </div>
        </div>

        <Link to="/" className="home-link">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AccountPage;
