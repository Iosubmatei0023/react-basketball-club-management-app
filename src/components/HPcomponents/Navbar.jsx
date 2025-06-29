import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      zIndex: 2
    }}>
      <Link to="/account" style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        background: '#ffb07c',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        transition: 'all 0.3s ease'
      }}>
        My Account
      </Link>
    </nav>
  );
};

export default Navbar;
