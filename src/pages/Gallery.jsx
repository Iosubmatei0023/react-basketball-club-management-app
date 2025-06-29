import React, { useState } from 'react';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoDetails, setPhotoDetails] = useState({});

  const photos = [
    {
      url: 'https://cdn.prod.website-files.com/645c37312e4131ceca6d3887/68588e7a2c57abb8e75838b4_Highflyerimages-4949.jpg',
      title: 'Team Practice',
      description: 'Intense practice session focusing on team coordination and drills'
    },
    {
      url: 'https://sydneybasketball.com.au/wp-content/uploads/2025/06/newslider_2.jpeg',
      title: 'Game Day',
      description: 'Exciting match against rival team with passionate fans'
    },
    {
      url: 'https://media.licdn.com/dms/image/v2/C4E1BAQH3ixpZsmulxw/company-background_10000/company-background_10000/0/1642497977252/sevenoaks_suns_basketball_club_cover?e=2147483647&v=beta&t=-xc3PU6sZhLzL23yg91aTLtXiynA2_zeyAqXJXLj1_M',
      title: 'Team Celebration',
      description: 'Post-game celebration with the championship trophy'
    },
    {
      url: 'https://miro.medium.com/v2/resize:fit:1012/1*yxcHFgE13kXcyUa74tErOQ.jpeg',
      title: 'Training Session',
      description: 'Focused training with professional coach'
    },
    {
      url: 'https://images.squarespace-cdn.com/content/v1/618e7535fd4f8e175cb825c3/333fc155-2291-40f3-ae83-83332776b439/plymouth+basketball+club-under+16s_-91.jpg',
      title: 'Youth Development',
      description: 'Young players learning fundamental skills'
    },
    {
      url: 'https://i.pinimg.com/736x/3a/e3/2d/3ae32d7a1c5ea4c51fff03250b1b8098.jpg',
      title: 'Team Huddle',
      description: 'Pre-game strategy discussion'
    },
    {
      url: 'https://static.wixstatic.com/media/8e3023_c1ed6503d99c40dcbb5f16f271709d50~mv2.jpg/v1/fill/w_640,h_486,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8e3023_c1ed6503d99c40dcbb5f16f271709d50~mv2.jpg',
      title: 'Game Action',
      description: 'Intense in-game action'
    },
    {
      url: 'https://ucclermont.edu/athletics/mensbasketball/_jcr_content/main/image.img.jpeg/1730215588801/2024-mens-basketball-team.jpeg',
      title: 'Team Lineup',
      description: 'Official team photo with all players'
    }
  ];

  const containerStyles = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa'
  };

  const titleStyles = {
    color: '#ffb07c', 
    marginBottom: '3rem',
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: '700'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '0 1rem'
  };

  const photoCardStyles = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const photoCardHoverStyles = {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
  };

  const photoImageStyles = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    display: 'block',
    transition: 'opacity 0.3s ease'
  };

  const photoDetailsStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    transform: 'translateY(100%)'
  };

  const photoDetailsHoverStyles = {
    opacity: 1,
    transform: 'translateY(0)'
  };

  const photoTitleStyles = {
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const shareButtonStyles = {
    background: 'none',
    border: 'none',
    color: '#7cb0ff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease'
  };

  const lightboxStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease'
  };

  const lightboxContentStyles = {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    animation: 'slideIn 0.3s ease'
  };

  const closeButtonStyles = {
    padding: '0.75rem 1.5rem',
    background: '#7cb0ff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Photo Gallery</h1>
      <div style={gridStyles}>
        {photos.map((photo, index) => (
          <div 
            key={index}
            onClick={() => {
              setSelectedPhoto(photo.url);
              setPhotoDetails({
                title: photo.title,
                description: photo.description
              });
            }}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                display: 'block',
                transition: 'opacity 0.3s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: 'translateY(100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0';
              e.currentTarget.style.transform = 'translateY(100%)';
            }}
            >
              <span style={{
                fontSize: '1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>{photo.title}</span>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#7cb0ff',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease'
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(photo.url).then(() => {
                  alert('Photo URL copied to clipboard!');
                });
              }}
              >
                <svg style={{
                  width: '16px',
                  height: '16px',
                  marginRight: '8px'
                }} viewBox="0 0 24 24" fill="none" stroke="#7cb0ff" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Share
              </button>
            </div>
          </div>
        ))}

        {/* Lightbox */}
        {selectedPhoto && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => {
            setSelectedPhoto(null);
            setPhotoDetails({});
          }}
          >
            <div style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto} 
                alt={photoDetails.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}
              />
              <h2 style={{
                color: '#ffb07c',
                marginBottom: '0.5rem',
                fontSize: '1.5rem'
              }}>{photoDetails.title}</h2>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>{photoDetails.description}</p>
              <button 
                onClick={() => {
                  setSelectedPhoto(null);
                  setPhotoDetails({});
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#7cb0ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
