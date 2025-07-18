import React, { useState } from 'react';
import '../styles/Events.css';
import EventsNavbar from '../components/EventsNavbar';
import Popout from '../components/Popout';
import NewsletterPopout from '../components/NewsletterPopout';
import DetailsPopout from '../components/DetailsPopout';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

const Events = () => {
  const { user } = useAuth();

  const futureEvents = [
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
        text: 'Join Our Newsletter',
        href: '#',
        color: 'blue'
      }
    }
  ];

  const pastEvents = [
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
    },
    {
      title: 'Autograph Session with Basketball Legends',
      date: 'July 2, 2025',
      description: 'A memorable moment with the Legends — autographs, smiles, and inspiration.',
      image: 'https://cdn.nba.com/teams/legacy/www.nba.com/suns/sites/suns/files/legacy/photos/autograph11_0.jpg',
      button: {
        text: 'View Details',
        color: 'blue'
      }
    },
    {
      title: 'Open Tryouts – Show Us What You\'ve Got!',
      date: 'June 28, 2025',
      description: 'Join us on the court and prove your skills — your journey to the team starts here.',
      image: 'https://www.onpointbasketball.com/wp-content/uploads/2019/09/IMG-20190907-WA0013.jpg',
      button: {
        text: 'View Details',
        href: '#',
        color: 'blue'
      }
    },
    {
      title: 'Meet the Team',
      date: 'June 16, 2025',
      description: 'The minds and mentors guiding our club on and off the court.',
      image: 'https://images.gametime.co/sport/other/gametime-images/otherunrivaled/hero@4x/unrivaled-basketball-league.jpg?auto=webp&format=pjpg&disable=upscale&dpr=2&fit=crop&width=440&quality=50%2C35&height=200',
      button: {
        text: 'View Details',
        href: '#',
        color: 'blue'
      }
    }
  ];



  // Popout state
  const [popoutOpen, setPopoutOpen] = useState(false);
  const [popoutMessage, setPopoutMessage] = useState('');
  const [newsletterPopoutOpen, setNewsletterPopoutOpen] = useState(false);
  // Details popout state
  const [detailsPopoutOpen, setDetailsPopoutOpen] = useState(false);
  const [detailsPopoutTitle, setDetailsPopoutTitle] = useState('');
  const [detailsPopoutDetails, setDetailsPopoutDetails] = useState('');

  // Handler for Join Event
  const handleJoinEvent = async (event) => {
    if (!user || !user.uid) {
      setPopoutMessage('Please log in to join this event.');
      setPopoutOpen(true);
      return;
    }

    try {
      const docRef = doc(db, 'users', user.uid);
      // Always get the latest scheduledEvents from Firestore
      let docSnap = await getDoc(docRef);
      let scheduledEvents = [];
      if (docSnap.exists()) {
        scheduledEvents = docSnap.data().scheduledEvents || [];
      }
      // Normalize for comparison
      const normalize = (s) => String(s).trim().toLowerCase();
      const joinedEvent = scheduledEvents.find(
        (e) =>
          normalize(e.eventName) === normalize(event.title) &&
          normalize(e.date) === normalize(event.date)
      );
      if (joinedEvent) {
        setPopoutMessage(`You already joined this event on ${joinedEvent.date}`);
        setPopoutOpen(true);
        return;
      }
      // Not joined, add event, then re-fetch and show popout
      const updated = [...scheduledEvents, { eventName: event.title, date: event.date }];
      await updateDoc(docRef, { scheduledEvents: updated });
      // Re-fetch to confirm
      docSnap = await getDoc(docRef);
      scheduledEvents = docSnap.exists() ? docSnap.data().scheduledEvents || [] : [];
      const newJoinedEvent = scheduledEvents.find(
        (e) =>
          normalize(e.eventName) === normalize(event.title) &&
          normalize(e.date) === normalize(event.date)
      );
      setPopoutMessage(
        newJoinedEvent
          ? `Congratulations! You joined this event on ${newJoinedEvent.date}`
          : `Congratulations! You joined this event on ${event.date}`
      );
      setPopoutOpen(true);
    } catch (err) {
      setPopoutMessage('Failed to join event. Please try again.');
      setPopoutOpen(true);
      console.error('Failed to update scheduled events in Firestore:', err);
    }
  };

  return (
    <div className="events-page">
      <Popout open={popoutOpen} onClose={() => setPopoutOpen(false)} message={popoutMessage} />
      <NewsletterPopout open={newsletterPopoutOpen} onClose={() => setNewsletterPopoutOpen(false)} />
      <DetailsPopout open={detailsPopoutOpen} onClose={() => setDetailsPopoutOpen(false)} title={detailsPopoutTitle} details={detailsPopoutDetails} />
      <EventsNavbar />
      <h1 className="events-title">Events</h1>
      <div className="events-container">
        <h2 className="future-events-title">Future Events</h2>
        <div className="events-row">
          {futureEvents.slice(0, 3).map((event, index) => (
            <div key={index} className={`event-card ${event.button?.color === 'blue' ? 'blue' : 'orange'}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                {event.button?.color === 'orange' && event.button?.text === 'Join Event' ? (
                  <button className={`event-button orange`} onClick={() => handleJoinEvent(event)}>
                    {event.button?.text}
                  </button>
                ) : event.button?.text === 'Join Our Newsletter' ? (
                  <button
                    className={`event-button ${event.button?.color}`}
                    onClick={async () => {
                      if (user && user.uid) {
                        try {
                          const docRef = doc(db, 'users', user.uid);
                          // Always get latest from Firestore
                          let docSnap = await getDoc(docRef);
                          let newsletterJoined = false;
                          if (docSnap.exists()) {
                            newsletterJoined = !!docSnap.data().newsletterJoined;
                          }
                          if (newsletterJoined) {
                            setPopoutMessage('You have already joined our newsletter.');
                            setPopoutOpen(true);
                            return;
                          }
                          await updateDoc(docRef, { newsletterJoined: true });
                          // Re-fetch to confirm
                          docSnap = await getDoc(docRef);
                          newsletterJoined = docSnap.exists() ? !!docSnap.data().newsletterJoined : false;
                          setPopoutMessage(
                            newsletterJoined
                              ? 'Thank you for joining our newsletter.'
                              : 'Thank you for joining our newsletter.'
                          );
                          setPopoutOpen(true);
                        } catch (err) {
                          setPopoutMessage('Failed to join the newsletter. Please try again.');
                          setPopoutOpen(true);
                        }
                      } else {
                        setPopoutMessage('Please log in to join the newsletter.');
                        setPopoutOpen(true);
                      }
                    }}
                  >
                    {event.button?.text}
                  </button>
                ) : (
                  <a href={event.button?.href} className={`event-button ${event.button?.color}`}>
                    {event.button?.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="events-row">
          {futureEvents.slice(3, 6).map((event, index) => (
            <div key={index + 3} className={`event-card ${event.button?.color === 'blue' ? 'blue' : 'orange'}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                {event.button?.color === 'orange' && event.button?.text === 'Join Event' ? (
                  <button className={`event-button orange`} onClick={() => handleJoinEvent(event)}>
                    {event.button?.text}
                  </button>
                ) : event.button?.text === 'Join Our Newsletter' ? (
                  <button
                    className={`event-button ${event.button?.color}`}
                    onClick={async () => {
                      if (user && user.uid) {
                        try {
                          const docRef = doc(db, 'users', user.uid);
                          // Always get latest from Firestore
                          let docSnap = await getDoc(docRef);
                          let newsletterJoined = false;
                          if (docSnap.exists()) {
                            newsletterJoined = !!docSnap.data().newsletterJoined;
                          }
                          if (newsletterJoined) {
                            setPopoutMessage('You have already joined our newsletter.');
                            setPopoutOpen(true);
                            return;
                          }
                          await updateDoc(docRef, { newsletterJoined: true });
                          // Re-fetch to confirm
                          docSnap = await getDoc(docRef);
                          newsletterJoined = docSnap.exists() ? !!docSnap.data().newsletterJoined : false;
                          setPopoutMessage(
                            newsletterJoined
                              ? 'Thank you for joining our newsletter.'
                              : 'Thank you for joining our newsletter.'
                          );
                          setPopoutOpen(true);
                        } catch (err) {
                          setPopoutMessage('Failed to join the newsletter. Please try again.');
                          setPopoutOpen(true);
                        }
                      } else {
                        setPopoutMessage('Please log in to join the newsletter.');
                        setPopoutOpen(true);
                      }
                    }}
                  >
                    {event.button?.text}
                  </button>
                ) : (
                  <a href={event.button?.href} className={`event-button ${event.button?.color}`}>
                    {event.button?.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <h2 className="past-events-title">Past Events</h2>
        <div className="events-row">
          {pastEvents.map((event, index) => (
            <div key={index} className={`event-card ${event.button?.color === 'blue' ? 'blue' : 'orange'}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                {event.button?.text === 'View Details' ? (
                  <button
                    className={`event-button ${event.button?.color}`}
                    onClick={() => {
                      let details = '';
                      if (index === 0) {
                        details = `Throughout the week, participants engaged in a dynamic program that combined skill-building drills, tactical coaching, and competitive gameplay. Each day featured focused sessions on shooting, defense, ball-handling, agility, and game IQ — all led by experienced coaches and special guest mentors. In addition to the on-court work, players participated in team-building exercises and basketball workshops covering topics like nutrition, injury prevention, and mental preparation.`;
                      } else if (index === 1) {
                        details = `A memorable moment where basketball fans met their heroes up close — an unforgettable day filled with autographs, smiles, and stories from the court.\n\nAttendees of all ages had the rare opportunity to interact with legendary players, capture photos, and walk away with signed memorabilia and priceless memories. The atmosphere was electric, blending nostalgia, inspiration, and excitement for the next generation of athletes.`;
                      } else if (index === 2) {
                        details = `The Open Tryouts proved to be an exciting and high-energy day filled with skill, determination, and ambition. Athletes of all ages and backgrounds participated in a series of drills, scrimmages, and evaluations, all under the eyes of our coaching staff. From sharp shooting to smart plays and hustle defense, each player had the chance to showcase their strengths and prove they belonged.`;
                      } else if (index === 3) {
                        details = `During this special event, club members, supporters, and fans had the opportunity to meet the leadership behind the scenes: our coaches, staff, and management team. Guests heard firsthand about the club’s vision, training philosophy, and plans for the future.\n\nFrom insightful talks to casual meet-and-greet moments, the event offered a rare chance to connect with the people who shape the club’s culture and success. Attendees asked questions, shared feedback, and left feeling more connected than ever to the mission of the club.`;
                      }
                      setDetailsPopoutTitle(event.title);
                      setDetailsPopoutDetails(details);
                      setDetailsPopoutOpen(true);
                    }}
                  >
                    {event.button?.text}
                  </button>
                ) : (
                  <a href={event.button?.href} className={`event-button ${event.button?.color}`}>
                    {event.button?.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
