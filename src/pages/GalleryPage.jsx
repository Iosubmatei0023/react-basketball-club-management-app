import React from 'react';
import '../styles/Gallery.css';
import GalleryNavbar from '../components/GalleryNavbar';
import Gallery from './Gallery';

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
  marginTop: "5.5rem", // Adjust this value if your navbar is taller/shorter
  marginBottom: "2.5rem",
  fontSize: "2.5rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
  textAlign: "center",
  fontWeight: "700"
}}>Gallery</h1>
<Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
