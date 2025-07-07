import React, { useState } from "react";

const TeamDetailsCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: hovered ? '#ffb07c' : '#f8f8f8',
        borderRadius: 16,
        minHeight: '292px',
        maxHeight: '292px',
        minWidth: 320,
        maxWidth: 520,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1.5rem',
        color: hovered ? '#fff' : '#000',
        fontSize: '1.1rem',
        lineHeight: 1.7,
        boxShadow: '0 2px 16px rgba(124,176,255,0.07)',
        marginTop: '0',
        transition: 'background 0.2s, color 0.2s',
        boxSizing: 'border-box',
        overflow: 'hidden',
        textAlign: 'center'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={{ margin: 0, color: hovered ? '#fff' : '#000' }}>
        Meet the people who bring our club to life — the talented juniors working hard to rise through the ranks, the professional players leading with skill and experience, and the coaches who guide and inspire every step of the journey. From early morning practices to game-day victories, this is the team that represents our values, passion, and future.
      </p>
    </div>
  );
};

export default TeamDetailsCard;
