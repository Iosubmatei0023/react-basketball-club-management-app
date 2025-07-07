import React, { useState, useEffect, useRef } from "react";

const arenaPhotos = [
  "https://images.unsplash.com/photo-1504450758481-7338eba7524a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbCUyMGFyZW5hfGVufDB8fDB8fHww",
  "https://wallpapercave.com/wp/wp10188847.jpg",
  "https://img.fcbayern.com/image/upload/f_auto/q_auto/t_cms-16x9-seo/v1718264535/cms/public/images/fcb-basketball/news/2023-24/06/SAP_Garden_240606_BP119_Baustellenfortschritt_68059p_Credit_Hagena_Red_Bull_16x9.png",
  "https://preview.redd.it/clune-arena-u-s-air-force-academy-colorado-v0-4xrmlwbrrarc1.jpeg?width=1080&crop=smart&auto=webp&s=eeeb146acba56391939bbb99d83aa5b19b75d68b",
  "https://www.highpoint.edu/arena/files/2021/11/211025-Arena-Samet-085-scaled.jpg",
  "https://highpointpanthers.com/images/2025/2/12/IMG_6923.jpg",
  "https://images.businessnc.com/wp-content/uploads/2022/01/hpu-arena-5-1.jpg"
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

const ArenaCarousel = ({ currentIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  
  // Update current photo when currentIndex changes
  useEffect(() => {
    setCurrent(prev => (prev + 1) % arenaPhotos.length);
  }, [currentIndex]);
  
  const prevPhoto = () => setCurrent(prev => (prev - 1 + arenaPhotos.length) % arenaPhotos.length);
  const nextPhoto = () => setCurrent(prev => (prev + 1) % arenaPhotos.length);

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
          border: '4px solid #7cb0ff',
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
          src={arenaPhotos[current]}
          alt={`Arena ${current + 1}`}
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
          {arenaPhotos.map((_, idx) => (
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
            src={arenaPhotos[current]}
            alt={`Arena ${current + 1}`}
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

export default ArenaCarousel;
