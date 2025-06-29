import React from 'react';

const Events = () => {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#ffb07c', marginBottom: '2rem' }}>Events</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Add your events content here */}
      </div>
    </div>
  );
};

export default Events;
