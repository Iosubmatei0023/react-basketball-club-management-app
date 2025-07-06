import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewsletterPopout = ({ open, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="popout-overlay">
      <div className="popout-container">
        <div className="popout-message">Thank you for joining our newsletter.</div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            className="popout-close"
            style={{ background: 'linear-gradient(90deg, #7cb0ff 0%, #ffb07c 100%)' }}
            onClick={() => navigate('/account')}
          >
            View in your account
          </button>
          <button className="popout-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopout;
