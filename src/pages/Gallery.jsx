import React, { useState } from "react";

const closeButtonStyles = {
  padding: "0.75rem 1.5rem",
  background: "#7cb0ff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
};

const shareButtonStyles = {
  background: "none",
  border: "none",
  color: "#7cb0ff",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: "600",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "background-color 0.3s ease",
};

const lightboxStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  animation: "fadeIn 0.3s ease",
};

const lightboxContentStyles = {
  position: "relative",
  maxWidth: "90vw",
  maxHeight: "90vh",
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "2rem",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  animation: "slideIn 0.3s ease",
};

const containerStyles = {
  padding: "4rem 2rem",
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "white",
};

const titleStyles = {
  color: "#ffb07c",
  marginBottom: "0.5rem",
  fontSize: "2.5rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
  textAlign: "center",
  fontWeight: "700",
};

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
  padding: "0 1rem",
};

const photoCardStyles = {
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  height: "300px",
  width: "calc(33.33% - 2rem)",
};

const photoCardHoverStyles = {
  transform: "scale(1.02)",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
};

const photoImageStyles = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
  display: "block",
};

const arrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  zIndex: 10,
  padding: "1rem",
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50%",
  color: "white",
};

const arrowLeftStyles = {
  ...arrowStyles,
  left: "1rem",
};

const arrowRightStyles = {
  ...arrowStyles,
  right: "1rem",
};

const slideshowStyles = {
  position: "relative",
  overflow: "hidden",
  marginBottom: "2rem",
  height: "300px",
};

const slideTrackStyles = {
  display: "flex",
  transition: "transform 0.5s ease-in-out",
  gap: "2rem",
};

const slideGroupStyles = {
  display: "flex",
  gap: "1.5rem",
  margin: "0 -0.75rem",
};

const slideContainerStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1.5rem",
  padding: "1rem",
  margin: "0 -0.75rem",
};



const categories = [
  {
    title: "Our Arena",
    photos: [
      {
        url: "https://www.fohhn.com/fileadmin/_processed_/1/0/csm_gallery-main-anyang-01_b1289a3ad5.jpg",
        title: "Arena Overview",
        description: "Modern basketball arena with excellent facilities",
      },
      {
        url: "https://www.ab-alpha.de/wp-content/uploads/2024/09/abacus-alpha-asb-innovative-technologien.webp",
        title: "Arena Technology",
        description: "State-of-the-art technology integration in our arena",
      },
      {
        url: "https://libertyflamesclub.org/images/2023/6/22/20210617_6634KT.jpg",
        title: "Arena Court",
        description: "Professional basketball court with perfect playing conditions",
      },
      {
        url: "https://altomfuresoe.dk/wp-content/uploads/2024/11/Basketballgulv.png",
        title: "Arena Floor",
        description: "Professional basketball court flooring",
      },
      {
        url: "https://www.shutterstock.com/image-illustration/empty-basketball-arena-perfectly-placed-600nw-2476620517.jpg",
        title: "Arena Layout",
        description: "Perfectly designed basketball arena layout",
      },
    ],
  },
  {
    title: "Team Photos",
    photos: [
      {
        url: "https://cdn.prod.website-files.com/645c37312e4131ceca6d3887/68588e7a2c57abb8e75838b4_Highflyerimages-4949.jpg",
        title: "Team Practice",
        description: "Intense practice session focusing on team coordination and drills",
      },
      {
        url: "https://sydneybasketball.com.au/wp-content/uploads/2025/06/newslider_2.jpeg",
        title: "Game Day",
        description: "Exciting match against rival team with passionate fans",
      },
      {
        url: "https://media.licdn.com/dms/image/v2/C4E1BAQH3ixpZsmulxw/company-background_10000/company-background_10000/0/1642497977252/sevenoaks_suns_basketball_club_cover?e=2147483647&v=beta&t=-xc3PU6sZhLzL23yg91aTLtXiynA2_zeyAqXJXLj1_M",
        title: "Team Celebration",
        description: "Post-game celebration with the championship trophy",
      },
    ],
  },
  {
    title: "Training",
    photos: [
      {
        url: "https://miro.medium.com/v2/resize:fit:1012/1*yxcHFgE13kXcyUa74tErOQ.jpeg",
        title: "Training Session",
        description: "Focused training with professional coach",
      },
      {
        url: "https://images.squarespace-cdn.com/content/v1/618e7535fd4f8e175cb825c3/333fc155-2291-40f3-ae83-83332776b439/plymouth+basketball+club-under+16s_-91.jpg",
        title: "Youth Development",
        description: "Young players learning fundamental skills",
      },
    ],
  },
  {
    title: "Game Action",
    photos: [
      {
        url: "https://i.pinimg.com/736x/3a/e3/2d/3ae32d7a1c5ea4c51fff03250b1b8098.jpg",
        title: "Team Huddle",
        description: "Pre-game strategy discussion",
      },
      {
        url: "https://static.wixstatic.com/media/8e3023_c1ed6503d99c40dcbb5f16f271709d50~mv2.jpg/v1/fill/w_640,h_486,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8e3023_c1ed6503d99c40dcbb5f16f271709d50~mv2.jpg",
        title: "Game Action",
        description: "Intense in-game action",
      },
      {
        url: "https://ucclermont.edu/athletics/mensbasketball/_jcr_content/main/image.img.jpeg/1730215588801/2024-mens-basketball-team.jpeg",
        title: "Team Lineup",
        description: "Official team photo with all players",
      },
    ],
  },
];

const getPhotoDetails = (photoUrl) => {
  const photo = categories.flatMap(category => category.photos).find(p => p.url === photoUrl);
  return photo || {};
};

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoDetails, setPhotoDetails] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(categories[0].photos.length - 3);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide === categories[0].photos.length - 3) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div style={containerStyles}>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          {category.title && (
            <h2 style={{
              color: "#ffb07c",
              marginBottom: "1.5rem",
              fontSize: "1.8rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              textAlign: "left",
              fontWeight: "600",
              position: "relative",
              display: "block",
              width: "100%",
              paddingLeft: "1.5rem",
            }}>{category.title}</h2>
          )}
          {categoryIndex === 0 ? (
            <div style={slideshowStyles}>
              <button style={arrowLeftStyles} onClick={handlePrev}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 6L9 12L15 18" />
                </svg>
              </button>
              <button style={arrowRightStyles} onClick={handleNext}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6L15 12L9 18" />
                </svg>
              </button>
              <div style={{ ...slideTrackStyles, transform: `translateX(-${currentSlide * (300 + 40)}px)` }}>
                {category.photos.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    style={{ ...photoCardStyles, ...(selectedPhoto === photo.url ? photoCardHoverStyles : {}), width: "300px" }}
                    onClick={() => {
                      setSelectedPhoto(selectedPhoto === photo.url ? null : photo.url);
                      setPhotoDetails(photo);
                    }}
                  >
                    <img src={photo.url} alt={photo.title} style={photoImageStyles} onError={(e) => e.target.src = 'https://via.placeholder.com/300'} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={gridStyles}>
              {category.photos.map((photo, photoIndex) => (
                <div
                  key={photoIndex}
                  style={{ ...photoCardStyles, ...(selectedPhoto === photo.url ? photoCardHoverStyles : {}) }}
                  onClick={() => {
                    setSelectedPhoto(selectedPhoto === photo.url ? null : photo.url);
                    setPhotoDetails(photo);
                  }}
                >
                  <img src={photo.url} alt={photo.title} style={photoImageStyles} onError={(e) => e.target.src = 'https://via.placeholder.com/300'} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {selectedPhoto && (
        <div
          style={lightboxStyles}
          onClick={() => {
            setSelectedPhoto(null);
            setPhotoDetails({});
          }}
        >
          <div
            style={lightboxContentStyles}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto}
              alt={photoDetails.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "1.5rem",
              }}
            />
            <h2
              style={{
                color: "#ffb07c",
                marginBottom: "0.5rem",
                fontSize: "1.5rem",
              }}
            >
              {photoDetails.title}
            </h2>
            <p
              style={{
                color: "#666",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
              }}
            >
              {photoDetails.description}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1rem"
              }}
            >
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  setPhotoDetails({});
                }}
                style={closeButtonStyles}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Close
                </span>
              </button>
              <button
                style={shareButtonStyles}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(photoDetails.url).then(() => {
                    alert("Photo URL copied to clipboard!");
                  });
                }}
              >
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7cb0ff"
                  strokeWidth="2"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
