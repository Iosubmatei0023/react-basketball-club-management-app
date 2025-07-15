import React, { useState, useEffect, useRef } from 'react';
import '../styles/Gallery.css';
import GalleryNavbar from '../components/GalleryNavbar';
import ArenaSlideshow from '../components/ArenaSlideshow';
import GameSlideshow from '../components/GameSlideshow';
import TeamSlideshow from '../components/TeamSlideshow';
import TeamDetailsCard from '../components/TeamDetailsCard';

const GalleryPage = () => {
  const [hoveredArena, setHoveredArena] = useState(false);
  const [hoveredGame, setHoveredGame] = useState(false);
  const [hoveredTeam, setHoveredTeam] = useState(false);
  
  // Each carousel will rotate independently
  // Each has its own interval and state
  const [arenaIndex, setArenaIndex] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  
  useEffect(() => {
    // Arena carousel rotates every 9 seconds (3s * 3 carousels)
    const arenaInterval = setInterval(() => {
      setArenaIndex(prev => (prev + 1) % 3);
    }, 9000);
    
    // Game carousel rotates 3 seconds after Arena
    const gameInterval = setInterval(() => {
      setGameIndex(prev => (prev + 1) % 3);
    }, 9000);
    
    // Team carousel rotates 6 seconds after Arena
    const teamInterval = setInterval(() => {
      setTeamIndex(prev => (prev + 1) % 3);
    }, 9000);
    
    // Initial staggered start for Game and Team carousels
    const gameStart = setTimeout(() => {
      setGameIndex(prev => (prev + 1) % 3);
    }, 3000);
    
    const teamStart = setTimeout(() => {
      setTeamIndex(prev => (prev + 1) % 3);
    }, 6000);
    
    return () => {
      clearInterval(arenaInterval);
      clearInterval(gameInterval);
      clearInterval(teamInterval);
      clearTimeout(gameStart);
      clearTimeout(teamStart);
    };
  }, []);

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

        {/* Section 1: Our Arena */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
          <h2 style={{
            color: "#ffb07c",
            fontSize: "1.6rem",
            textTransform: "uppercase",
            textAlign: "left",
            fontWeight: "600",
            margin: "2rem 0 1.5rem 0",
            paddingLeft: '1.5rem',
            letterSpacing: "1px"
          }}>Our Arena</h2>
          
          <div style={{
            display: 'flex',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ flex: 1, minWidth: '520px' }}>
              <ArenaSlideshow currentIndex={arenaIndex} />
            </div>
            <div style={{ 
              flex: 1,
              minWidth: '520px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div
                style={{
                  background: hoveredArena ? '#ffb07c' : '#f8f8f8',
                  borderRadius: 16,
                  minHeight: '292px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  color: hoveredArena ? '#fff' : '#111',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  boxShadow: '0 2px 16px rgba(124,176,255,0.07)',
                  transition: 'background 0.2s, color 0.2s',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={() => setHoveredArena(true)}
                onMouseLeave={() => setHoveredArena(false)}
              >
                <p style={{ margin: 0, textAlign: 'center', color: hoveredArena ? '#fff' : '#000' }}>
                  Located just 10 minutes from the city center, our state-of-the-art basketball arena is the heart of the club. Designed to host both intense training sessions and thrilling match days, the facility features a full-sized court, professional-grade equipment, locker rooms, and seating for fans.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Game Moments */}
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{
              color: "#7cb0ff",
              fontSize: "1.6rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "600",
              margin: "4rem 0 1.5rem 0",
              textAlign: 'right',
              paddingRight: '1rem'
            }}>Game Moments</h2>
            
            <div style={{
              display: 'flex',
              gap: '2.5rem',
              marginBottom: '4rem'
            }}>
              <div style={{ 
                flex: 1,
                minWidth: '520px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div
                  style={{
                    background: hoveredGame ? '#7cb0ff' : '#f8f8f8',
                    borderRadius: 16,
                    minHeight: '292px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    color: hoveredGame ? '#fff' : '#111',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    boxShadow: '0 2px 16px rgba(124,176,255,0.07)',
                    transition: 'background 0.2s, color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={() => setHoveredGame(true)}
                  onMouseLeave={() => setHoveredGame(false)}
                >
                  <p style={{ margin: 0, textAlign: 'center', color: hoveredGame ? '#fff' : '#000' }}>
                    Relive the excitement with a collection of our favorite in-game highlights. From intense matchups and clutch plays to powerful teamwork and crowd energy, these photos capture the true spirit of competition. Each shot tells a part of our story — the effort, emotion, and passion we bring to every game.
                  </p>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '520px' }}>
                <GameSlideshow currentIndex={gameIndex} />
              </div>
            </div>
          </div>

          {/* Section 3: Our Team */}
          <h2 style={{
              color: "#ffb07c",
              fontSize: "1.6rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "600",
              margin: "4rem 0 1.5rem 0",
              paddingLeft: '1.5rem'
            }}>Our Team</h2>
          
          <div style={{
            display: 'flex',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ flex: 1, minWidth: '520px' }}>
              <TeamSlideshow currentIndex={teamIndex} />
            </div>
            <div style={{ 
              flex: 1,
              minWidth: '520px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <TeamDetailsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
