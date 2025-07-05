import React from 'react';
import '../styles/Gallery.css';
import GalleryNavbar from '../components/GalleryNavbar';
import Gallery from './Gallery';

const GalleryPage = () => {
  const categories = [
    {
      title: 'Our Arena',
      description: 'The home of our basketball dreams'
    },
    {
      title: 'Our Equipment',
      description: 'Professional-grade gear and technology'
    },
    {
      title: 'Training Moments',
      description: 'Where champions are made'
    },
    {
      title: 'Game Moments',
      description: 'Where legends are born'
    },
    {
      title: 'Our Community',
      description: 'More than just a team'
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
          marginBottom: "0.5rem",
          fontSize: "2.5rem",
          textTransform: "uppercase",
          letterSpacing: "2px",
          textAlign: "center",
          fontWeight: "700",
        }}>Gallery</h1>
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
