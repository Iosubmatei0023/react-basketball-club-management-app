import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getNavbarStyle = () => {
    const opacity = 1 - (scrollPosition / 500);
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: `rgba(255, 176, 124, ${Math.max(0.5, opacity)})`,
      padding: '0.5rem 1rem',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'background-color 0.3s ease'
    };
  };

  return (
    <nav style={getNavbarStyle()}>
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

        </div>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontSize: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 12px rgba(0, 0, 255, 0.2)'
  }
};

export default Navbar;
