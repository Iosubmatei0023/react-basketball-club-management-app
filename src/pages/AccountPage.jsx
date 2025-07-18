import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MultiSelectCheckbox from "../components/MultiSelectCheckbox";
import AnimatedWaveBackground from "../components/AnimatedWaveBackground";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  // DEBUG LOGGING
  console.log('AccountPage: user from useAuth()', user);
  console.log('AccountPage: userData state', userData);
  const [selectedAttendedEvents, setSelectedAttendedEvents] = useState([]);
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [membershipStatus, setMembershipStatus] = useState({ planName: "", period: "" });
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  // Add a loading state for userData
  const [userDataLoading, setUserDataLoading] = useState(true);

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

  // Fetch user data from Firestore on mount
  useEffect(() => {
    const fetchUserData = async () => {
      setUserDataLoading(true);
      if (user && user.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('AccountPage: Firestore user doc found', data);
            setUserData(data);
            setBirthDate(data.birthDate || "");
            setHometown(data.hometown || "");
            setSelectedAttendedEvents(data.attendedEvents || []);
            setScheduledEvents(data.scheduledEvents || []);
            setMembershipStatus(data.membershipStatus || { planName: "", period: "" });
            setNewsletterJoined(typeof data.newsletterJoined === 'boolean' ? data.newsletterJoined : false);
          } else {
            console.log('AccountPage: Firestore user doc NOT found for uid', user?.uid);
            setUserData(null);
          }
        } catch (err) {
          console.error("Failed to fetch user data from Firestore:", err);
          setUserData(null);
        }
        setUserDataLoading(false);
      } else {
        setUserDataLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  // Show loading or fallback if userData is not loaded
  if (userDataLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  // Save birthDate, hometown, and attended events to Firestore
  const handleSave = async () => {
    if (user && user.uid) {
      try {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          birthDate,
          hometown,
          attendedEvents: selectedAttendedEvents,
          newsletterJoined
        });
        setUserData(prev => ({ ...prev, birthDate, hometown, attendedEvents: selectedAttendedEvents, newsletterJoined }));
      } catch (err) {
        console.error("Failed to update Firestore profile fields:", err);
      }
    }
    // Re-fetch user data to ensure UI is in sync with Firestore
    if (user && user.uid) {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setBirthDate(data.birthDate || "");
          setHometown(data.hometown || "");
          setSelectedAttendedEvents(data.attendedEvents || []);
          setScheduledEvents(data.scheduledEvents || []);
          setMembershipStatus(data.membershipStatus || { planName: "", period: "" });
          setNewsletterJoined(typeof data.newsletterJoined === 'boolean' ? data.newsletterJoined : false);
        }
      } catch (err) {
        // handle error
      }
    }
    setEditMode(false);
  };

  if (userDataLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #7cb0ff 0%, #ffb07c 100%)', padding: '40px 0', fontFamily: 'Segoe UI, Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <AnimatedWaveBackground />
      <div style={{
        maxWidth: 600,
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
            {(userData?.name?.[0]?.toUpperCase() || userData?.displayName?.[0]?.toUpperCase() || '?')}
          </div>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 32 }}>{userData?.name || userData?.displayName || 'Unknown User'}</h1>
          <p style={{ color: '#7cb0ff', margin: '0.5rem 0 0' }}>{userData?.email || user?.email || ''}</p>
        </div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Joined:</span>
            <span style={{ color: '#333', marginLeft: 10 }}>
              {userData?.created
                ? new Date(userData.created).toLocaleDateString()
                : 'Not set'}
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
                  marginLeft: 10,
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #7cb0ff',
                  fontSize: 16
                }}
              />
            ) : (
              <span style={{ color: '#333', marginLeft: 10 }}>
                {birthDate || 'Not set'}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Hometown:</span>
            {editMode ? (
              <input
                type="text"
                value={hometown}
                onChange={e => setHometown(e.target.value)}
                style={{
                  marginLeft: 10,
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #7cb0ff',
                  fontSize: 16
                }}
              />
            ) : (
              <span style={{ color: '#333', marginLeft: 10 }}>
                {hometown || 'Not set'}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Membership:</span>
            <span style={{ color: '#333', marginLeft: 10 }}>
              {membershipStatus?.planName ? `${membershipStatus.planName} (${membershipStatus.period})` : 'Not set'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#444', width: 120 }}>Newsletter:</span>
            {editMode ? (
              <label style={{ marginLeft: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={newsletterJoined}
                  onChange={e => setNewsletterJoined(e.target.checked)}
                  style={{ width: 18, height: 18 }}
                />
                <span style={{ color: '#333', fontSize: 16 }}>
                  {newsletterJoined ? 'Joined' : 'Not Joined'}
                </span>
              </label>
            ) : (
              <span style={{ color: newsletterJoined ? '#27ae60' : '#e74c3c', marginLeft: 10, fontWeight: 600 }}>
                {newsletterJoined ? 'Joined' : 'Not Joined'}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 32 }}>
          <span style={{ fontWeight: 600, color: '#444', width: 120, marginTop: 6 }}>Attended Events:</span>
          {editMode ? (
            <MultiSelectCheckbox
              options={[
                'Basketball Camp 2025 – Train Like a Pro!',
                'Autograph Session with Basketball Legends',
                "Open Tryouts – Show Us What You've Got!",
                'Meet the Team'
                // Add more here as new past events are added in Events.jsx
              ]}
              selected={selectedAttendedEvents}
              setSelected={setSelectedAttendedEvents}
            />
          ) : (
            <div style={{
              color: '#333',
              marginLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 220,
              padding: '10px 16px 10px 16px',
              background: '#f8f9fa',
              borderRadius: 6,
              fontSize: 16,
              boxShadow: '0 1px 6px rgba(124,176,255,0.08)',
              letterSpacing: 0.1,
              wordBreak: 'break-word',
              lineHeight: 1.7,
              border: '2px solid #ffb07c',
              paddingLeft: 16
            }}>
              {(userData?.attendedEvents?.length > 0
                ? userData.attendedEvents.map((ev, idx) => (
                  <div
                    key={typeof ev === 'string' ? ev : ev?.eventName || idx}
                    style={{
                      padding: '2px 0',
                      borderBottom: idx !== userData.attendedEvents.length - 1 ? '1px solid #e6eaf2' : 'none',
                      marginBottom: 2,
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#ffb07c',
                      marginRight: 10,
                      marginLeft: 0
                    }}></span>
                    {typeof ev === 'string' ? ev : ev?.eventName || JSON.stringify(ev)}
                  </div>
                ))
                : 'Not set')}
            </div>
          )}
        </div>
        {!user && (
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
        )}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 32 }}>
          <span style={{ fontWeight: 600, color: '#444', width: 120, marginTop: 6 }}>Scheduled Events:</span>
          <div style={{
            color: '#333',
            marginLeft: 0,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 220,
            padding: '10px 16px 10px 16px',
            background: '#f8f9fa',
            borderRadius: 6,
            fontSize: 16,
            boxShadow: '0 1px 6px rgba(124,176,255,0.08)',
            letterSpacing: 0.1,
            wordBreak: 'break-word',
            lineHeight: 1.7,
            border: '2px solid #7cb0ff',
            paddingLeft: 16
          }}>
            {(userData?.scheduledEvents?.length > 0
              ? userData.scheduledEvents.map((ev, idx) => (
                <div
                  key={typeof ev === 'string' ? ev : ev?.eventName || idx}
                  style={{
                    padding: '2px 0',
                    borderBottom: idx !== userData.scheduledEvents.length - 1 ? '1px solid #e6eaf2' : 'none',
                    marginBottom: 2,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#7cb0ff',
                    marginRight: 10,
                    marginLeft: 0
                  }}></span>
                  {typeof ev === 'string' ? ev : `${ev?.eventName || JSON.stringify(ev)}${ev?.date ? ' – ' + ev.date : ''}`}
                </div>
              ))
              : 'Not set')}

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
