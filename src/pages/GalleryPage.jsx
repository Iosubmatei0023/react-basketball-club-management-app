import React from 'react';
import '../styles/Gallery.css';
import GalleryNavbar from '../components/GalleryNavbar';
import ArenaCarousel from '../components/ArenaCarousel';
import GameCarousel from '../components/GameCarousel';
import TeamCarousel from '../components/TeamCarousel';
import TeamDetailsCard from '../components/TeamDetailsCard';

const GalleryPage = () => {
  const categories = [
    {
      title: 'Our Arena',
      description: 'The home of our basketball dreams'
    }
  ];

  return (
    <div className="gallery-page" style={{
          backgroundColor: "white",
          padding: "0",
          margin: "0",
          minHeight: "100vh",
        }}>
      <GalleryNavbar />
      <div className="gallery-content" style={{
        padding: "0",
        margin: "0"
      }}>
        
        <h1 style={{
  color: "#ffb07c",
  marginTop: "5.5rem",
  marginBottom: "2.5rem",
  fontSize: "2.5rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
  textAlign: "center",
  fontWeight: "700"
}}>Gallery</h1>
        <h2 style={{
          color: "#ffb07c",
          fontSize: "1.6rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
          textAlign: "left",
          fontWeight: "600",
          margin: "2rem 0 1rem 2.5rem"
        }}>Our Arena</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.5rem',
          alignItems: 'flex-start',
          marginLeft: '2.5rem',
          marginRight: '2.5rem',
          maxWidth: '1200px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 520px', minWidth: 320, maxWidth: 520 }}>
            <ArenaCarousel />
            {/* Game Moments Description Card with Hover Effect */}
            {(() => {
              const [hoveredGame, setHoveredGame] = React.useState(false);
              return (
                <div
                  style={{
                    background: hoveredGame ? '#7cb0ff' : '#f8f8f8',
                    borderRadius: 16,
                    height: '100%',
                    minHeight: '292px',
                    maxHeight: '292px',
                    minWidth: 320,
                    maxWidth: 520,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem 1.5rem',
                    color: hoveredGame ? '#fff' : '#111',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    boxShadow: '0 2px 16px rgba(124,176,255,0.07)',
                    marginTop: '12rem',
                    transition: 'background 0.2s, color 0.2s',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={() => setHoveredGame(true)}
                  onMouseLeave={() => setHoveredGame(false)}
                >
                  <p style={{ margin: 0, color: hoveredGame ? '#fff' : '#111', textAlign: 'center' }}>
                    Relive the excitement with a collection of our favorite in-game highlights. From intense matchups and clutch plays to powerful teamwork and crowd energy, these photos capture the true spirit of competition. Each shot tells a part of our story — the effort, emotion, and passion we bring to every game.
                  </p>
                </div>
              );
            })()}

            <h2 style={{
              color: "#ffb07c",
              fontSize: "1.6rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              textAlign: "left",
              fontWeight: "600",
              margin: "4rem 0 1rem 0"
            }}>Our team</h2>
            <div style={{ margin: '2rem auto 3rem auto', maxWidth: 520, minWidth: 320, width: '100%' }}>
              <TeamCarousel />
            </div>

          </div>
          <div style={{
            flex: '1 1 520px',
            minWidth: 320,
            maxWidth: 520,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.2rem',
          }}>
            {/* Description Card with Hover Effect */}
            {(() => {
              const [hovered, setHovered] = React.useState(false);
              return (
                <div
                  style={{
                    background: hovered ? '#ffb07c' : '#f8f8f8',
                    borderRadius: 16,
                    height: '100%',
                    minHeight: '292px',
                    maxHeight: '292px',
                    minWidth: 320,
                    maxWidth: 520,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem 1.5rem',
                    color: hovered ? '#fff' : '#111',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    boxShadow: '0 2px 16px rgba(124,176,255,0.07)',
                    marginTop: '2rem',
                    transition: 'background 0.2s, color 0.2s',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <p style={{ margin: 0, color: hovered ? '#fff' : '#111', textAlign: 'center' }}>
                    Located just 10 minutes from the city center, our state-of-the-art basketball arena is the heart of the club. Designed to host both intense training sessions and thrilling match days, the facility features a full-sized court, professional-grade equipment, locker rooms, and seating for fans. With easy access by public transport or car, it’s a vibrant hub where athletes, coaches, and supporters come together — united by the love of the game.
                  </p>
                </div>
              );
            })()}
            <h2 style={{
              color: "#7cb0ff",
              fontSize: "1.6rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              textAlign: "left",
              fontWeight: "600",
              margin: "2.5rem 0 1rem 0",
              marginLeft: "13rem"
            }}>Game moments</h2>
            <div style={{ marginTop: '0' }}>
              <GameCarousel />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryPage;
