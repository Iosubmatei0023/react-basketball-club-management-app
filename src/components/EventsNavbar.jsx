import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const EventsNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 176, 124, 0.8)',
      padding: '0.5rem 1rem',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <button
          onClick={() => user ? navigate('/account') : navigate('/redirection') }
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(124, 176, 255, 0.4)';
            e.currentTarget.style.color = '#7cb0ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            e.currentTarget.style.color = 'white';
          }}
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {user ? (user.displayName || user.email) : 'My Account'}
        </button>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          {/* Dynamically show the other page's button */}
          {(() => {
            const location = useLocation();
            if (location.pathname === '/events') {
              return (
                <Link to="/plans"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(124, 176, 255, 0.4)';
                    e.currentTarget.style.color = '#7cb0ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    e.currentTarget.style.color = 'white';
                  }}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                  Plans
                </Link>
              );
            } else if (location.pathname === '/plans') {
              return (
                <Link to="/events"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(124, 176, 255, 0.4)';
                    e.currentTarget.style.color = '#7cb0ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    e.currentTarget.style.color = 'white';
                  }}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                  Events
                </Link>
              );
            }
            return null;
          })()}

          <Link to="/gallery"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(124, 176, 255, 0.4)';
              e.currentTarget.style.color = '#7cb0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.color = 'white';
            }}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
            Gallery
          </Link>
          <Link to="/" 
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(124, 176, 255, 0.4)';
              e.currentTarget.style.color = '#7cb0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.color = 'white';
            }}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
            Home Page
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default EventsNavbar;
