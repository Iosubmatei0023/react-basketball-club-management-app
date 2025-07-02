import React from 'react';
import './styles/Gallery.css';

const EventsGrid = ({ events }) => {
  return (
    <div className="events-grid-container">
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <img 
              src={event.url} 
              alt={event.title}
              className="event-image"
            />
            <div className="event-overlay">
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsGrid;
