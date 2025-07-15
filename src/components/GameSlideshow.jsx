// This file was renamed from GameCarousel.jsx to GameSlideshow.jsx
// All code remains the same except the filename and component name.

import React, { useState, useEffect, useRef } from "react";

const gamePhotos = [
  "https://www.shutterstock.com/image-photo/junior-basketball-players-playing-indoor-600nw-2423122601.jpg",
  "https://www.active.com/Assets/active-family/basketball-benefits/cardio.jpg",
  "https://storage.googleapis.com/proudcity/ketteringohparks/uploads/2020/10/de5d274d-basketball-54.jpg",
  "https://www.dailynews.com/wp-content/uploads/2021/06/LDN-L-PREP-SIERRA-BB-050201-01.jpg?w=1024",
  "https://280living.com/downloads/43611/download/250226_Mountain%20Brook%20vs%20Chelsea%20AHSAA%206A%20Semifinal_BKB-11.jpg?cb=38dd02bdeef58dde1185105771d20bf2",
  "https://images.sidearmdev.com/convert?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fvillanova.com%2Fimages%2F2025%2F3%2F4%2FJB_1_at_GU.jpg&type=webp",
  "https://cdn.forumcomm.com/dims4/default/467e757/2147483647/strip/true/crop/5088x3392+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fc9%2Ffd%2F7f6c382742a2a761360d01611da9%2F031225-s-dmg-prepbhoops-c007.jpg"
];

const arrowButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  padding: 0,
  lineHeight: 1,
  width: "2.2rem",
  height: "2.2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds

const GameSlideshow = ({ currentIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  
  // Update current photo when currentIndex changes
  useEffect(() => {
    setCurrent(prev => (prev + 1) % gamePhotos.length);
  }, [currentIndex]);
  
  const prevPhoto = () => setCurrent(prev => (prev - 1 + gamePhotos.length) % gamePhotos.length);
  const nextPhoto = () => setCurrent(prev => (prev + 1) % gamePhotos.length);

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          aspectRatio: "16/9",
          margin: "2rem auto 3rem auto",
          background: "#f8f8f8",
          position: "relative",
          overflow: "hidden",
          border: '4px solid #ffb07c',
          borderRadius: 18
        }}
      >
        <button
          style={{ ...arrowButtonStyle, left: 10, top: "50%" }}
          onClick={prevPhoto}
          aria-label="Previous photo"
        >
          <svg width="1.6rem" height="1.6rem" viewBox="0 0 32 32" fill="white" stroke="#7cb0ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" style={{filter: "drop-shadow(0 0 6px #222)"}}>
            <polyline points="20 8 12 16 20 24" />
          </svg>
        </button>
        <img
          src={gamePhotos[current]}
          alt={`Game moment ${current + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            transition: "opacity 0.5s",
            borderRadius: 16,
            cursor: "pointer"
          }}
          loading="lazy"
          onClick={() => setLightboxOpen(true)}
        />
        <button
          style={{ ...arrowButtonStyle, right: 10, top: "50%" }}
          onClick={nextPhoto}
          aria-label="Next photo"
        >
          <svg width="1.6rem" height="1.6rem" viewBox="0 0 32 32" fill="white" stroke="#7cb0ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{filter: "drop-shadow(0 0 8px #222)"}}>
            <polyline points="12 8 20 16 12 24" />
          </svg>
        </button>
        {/* Dots */}
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10,
          display: "flex",
          justifyContent: "center",
          gap: 8
        }}>
          {gamePhotos.map((_, idx) => (
            <span
              key={idx}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: idx === current ? "#7cb0ff" : "#d3d3d3",
                display: "inline-block",
                transition: "background 0.3s"
              }}
            />
          ))}
        </div>
      </div>
      {lightboxOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: 2000,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s"
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={gamePhotos[current]}
            alt={`Game moment ${current + 1}`}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: 16,
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              background: "#fff",
              objectFit: "contain"
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              top: 30,
              right: 40,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              borderRadius: 8,
              cursor: "pointer",
              zIndex: 2100,
              padding: "0.2em 0.7em"
            }}
            aria-label="Close large photo"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default GameSlideshow;
