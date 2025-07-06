import React from 'react';

const DetailsPopout = ({ open, onClose, title, details }) => {
  if (!open) return null;
  return (
    <div className="popout-overlay">
      <div className="popout-container" style={{ maxWidth: 520 }}>
        <div className="popout-message" style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{title}</div>
        <div style={{ whiteSpace: 'pre-line', marginBottom: 20, fontSize: 16, color: '#222' }}>{details}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="popout-close" onClick={onClose} style={{ background: 'linear-gradient(90deg, #7cb0ff 0%, #ffb07c 100%)', minWidth: 110 }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopout;
