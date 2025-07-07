import React, { useState, useEffect, useRef } from "react";

const teamPhotos = [
  "https://assets.vogue.com/photos/66a6647ff88617d05f5eab2a/master/w_2560%2Cc_limit/2163520937",
  "https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fprinceton.sidearmsports.com%2Fimages%2F2025%2F4%2F23%2FWBB_TeamPhotosRetake_20250217_0018__1_.JPG&height=1280&quality=90&type=webp",
  "https://images.ctfassets.net/xct4vv2g1nhc/1ENDKOMe28KIieH3P0TdBK/bd48c7d3f300f273de53810e1d930fcd/How_to_Start_a_Select_Basketball_Team.png?w=3840&q=75&fm=webp",
  "https://englishschool.ac.cy/udata/contents/images/Events/2025/05-May/Junior%20Year%201%20Basketball%20Team%20Claims%203rd%20Place%20at%20EuroBasket%20Schools%20Tournament!/Slide1.JPG",
  "https://media.istockphoto.com/id/1988812146/photo/junior-basketball-team-is-practicing-game-at-indoor-court.jpg?s=612x612&w=0&k=20&c=Z98bH6_sJzK0OQxc9d09giCQDGr8VCV0fETZWt0W_Hg=",
  "https://cdn.nba.com/manage/2023/08/usa-coaching-staff.jpg",
  "https://dims.apnews.com/dims4/default/2f79e22/2147483647/strip/true/crop/7169x5122+0+0/resize/599x428!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F22%2Fb3%2F56fc55ffe3fd96bf86dbbe59157b%2F40dca396c4ed474194be42976f3c3f67"
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

const TeamCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timeoutRef = useRef(null);

  const prevPhoto = () => setCurrent((current - 1 + teamPhotos.length) % teamPhotos.length);
  const nextPhoto = () => setCurrent((current + 1) % teamPhotos.length);

  useEffect(() => {
    if (!isHovered && !lightboxOpen) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % teamPhotos.length);
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, isHovered, lightboxOpen]);

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          minWidth: 320,
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
          src={teamPhotos[current]}
          alt={`Team ${current + 1}`}
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
          {teamPhotos.map((_, idx) => (
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
            src={teamPhotos[current]}
            alt={`Team ${current + 1}`}
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

export default TeamCarousel;
