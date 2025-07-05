import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  // Redirect to login if user logs out
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [hometown, setHometown] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || user.displayName || "",
        email: user.email,
        role: user.role || "Member",
        membership: "Active",
        joinDate: new Date(user.created || Date.now()).toLocaleDateString(),
        birthDate: user.birthDate || "",
        hometown: user.hometown || "",
        plan: user.plan || ""
      };
      setUserData(userData);
      setBirthDate(userData.birthDate);
      setHometown(userData.hometown);
      setPlan(userData.plan);
      setLoading(false);
    }
  }, [user]);

  const handleSave = () => {
    // TODO: Save birthDate and hometown to backend (Firestore)
    setEditMode(false);
    setUserData(prev => ({ ...prev, birthDate, hometown }));
  };

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
            onClick={() => navigate("/login")}
            className="login-button"
            style={{ width: "100%" }}
          >
            <span>Sign In to Your Account</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #7cb0ff 0%, #ffb07c 100%)', padding: '40px 0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{
        maxWidth: 500,
        margin: '0 auto',
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 8px 40px rgba(124,176,255,0.15)',
        padding: '2.5rem 2rem',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7cb0ff 60%, #ffb07c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            color: 'white',
            fontWeight: 700,
            margin: '0 auto 1rem'
          }}>
            {userData.name[0].toUpperCase()}
          </div>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 32 }}>{userData.name}</h1>
          <p style={{ color: '#7cb0ff', margin: '0.5rem 0 0' }}>{userData.email}</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Joined:</span>
            <span style={{ color: '#333' }}>{userData.joinDate}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Membership Status:</span>
            <span style={{ color: userData.plan ? '#7cb0ff' : '#e67e22', fontWeight: 600 }}>
              {userData.plan ? userData.plan : 'No membership acquired'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Birth Date:</span>
            {editMode ? (
              <input
                type="date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                style={{
                  border: '1px solid #7cb0ff',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 16,
                  marginLeft: 10
                }}
              />
            ) : (
              <span style={{ color: '#333', marginLeft: 10 }}>{birthDate || 'Not set'}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Hometown:</span>
            {editMode ? (
              <input
                type="text"
                value={hometown}
                onChange={e => setHometown(e.target.value)}
                placeholder="Enter hometown"
                style={{
                  border: '1px solid #7cb0ff',
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: 16,
                  marginLeft: 10
                }}
              />
            ) : (
              <span style={{ color: '#333', marginLeft: 10 }}>{hometown || 'Not set'}</span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editMode ? (
            <>
              <button
                style={{
                  background: '#7cb0ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 600,
                  fontSize: 16,
                  marginRight: 8,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(124,176,255,0.13)'
                }}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                style={{
                  background: '#e67e22',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(255,176,124,0.13)'
                }}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              style={{
                background: '#7cb0ff',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(124,176,255,0.13)'
              }}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
          <button
            style={{
              background: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(255,0,0,0.13)'
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <Link to="/" style={{
          display: 'block',
          textAlign: 'center',
          marginTop: 32,
          color: '#7cb0ff',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 18
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AccountPage;
