import React from 'react';
import '../styles/Events.css';
import EventsNavbar from '../components/EventsNavbar';

const Events = () => {
  const events = [
    {
      title: 'Young Talents Basketball Tournament 2025',
      date: 'September 10, 2025',
      description: 'High-energy games featuring the most talented young basketball players.',
      image: 'https://brooklynbridgeparents.com/wp-content/uploads/2024/02/BBA-Feature-Image-800x600.jpg',
      button: {
        text: 'Join Event',
        color: 'orange'
      }
    },
    {
      title: 'Kids Basketball Open Day 2025',
      date: 'September 15, 2025',
      description: 'Free-entry basketball fun to get kids moving and loving the game!',
      image: 'https://www.edinburghleisure.co.uk/wp-content/smush-webp/2025/01/Chris-Watt-Photography_151-scaled.jpg.webp',
      button: {
        text: 'Join Event',
        color: 'orange'
      }
    },
    {
      title: 'Community Hoops Meetup',
      date: 'September 18, 2025',
      description: 'An open-air gathering for basketball lovers of all ages to play, connect, and share the passion.',
      image: 'https://www.hastingsjournal.news/uploads/original/20240829-145227-8c3-IMG_0023.jpg',
      button: {
        text: 'Join Event',
        color: 'orange'
      }
    },
    {
      title: 'Win a Ticket to the Next NBA Game in Paris!',
      date: 'August 8, 2025',
      description: 'Enter for a chance to experience NBA action live in Paris — courtside thrills, superstar moments, and unforgettable memories!',
      image: 'https://t3.ftcdn.net/jpg/10/04/56/74/360_F_1004567472_Yt2hqQCeHDpxGHvp7BLB9s4eDAEfYonG.jpg',
      button: {
        text: 'Join Event',
        color: 'orange'
      }
    },
    {
      title: 'Junior Team’s First Official Match!',
      date: 'August 10, 2025',
      description: 'Cheer on the juniors as they take their first step towards greatness.',
      image: 'https://houseofbasketball.org/wp-content/uploads/2023/11/campz.webp',
      button: {
        text: 'Join Event',
        href: '#',
        color: 'orange'
      }
    },
    {
      title: 'No more upcoming events planned, but exciting things are coming!',
      description: 'Subscribe to our newsletter to stay updated on future events and exclusive opportunities!',
      image: 'https://pbs.twimg.com/media/ER5XpD3WoAAfiN3.jpg',
      button: {
        text: 'Join Event',
        href: '#',
        color: 'blue'
      }
    },
    {
      title: 'Basketball Camp 2025 – Train Like a Pro!',
      date: 'July 15-21, 2025',
      description: 'A week full of drills, games, and teamwork to take your basketball to the next level.',
      image: 'https://cdn.nba.com/teams/uploads/sites/1610612749/2022/05/EO1Y0RVX4AEO-EK.jpg',
      button: {
        text: 'View Details',
        href: '#',
        color: 'blue'
      }
    }
  ];

  return (
    <div className="events-page">
      <EventsNavbar />
      <h1 className="events-title">Events</h1>
      <div className="events-container">
        <h2 className="future-events-title">Future Events</h2>
        <div className="events-row">
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className={`event-card ${event.button?.color === 'blue' ? 'blue' : 'orange'}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                <a href={event.button?.href} className={`event-button ${event.button?.color}`}>
                  {event.button?.text}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="events-row">
          {events.slice(3, 6).map((event, index) => (
            <div key={index + 3} className={`event-card ${event.button?.color === 'blue' ? 'blue' : 'orange'}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                <a href={event.button?.href} className={`event-button ${event.button?.color}`}>
                  {event.button?.text}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="past-events-title" style={{ gridColumn: '1' }}>
          Past Events
        </div>
      </div>
    </div>
  );
};

export default Events;
