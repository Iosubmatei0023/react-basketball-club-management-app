import React from 'react';
import Gallery from '../components/Gallery';
import '../styles/Gallery.css';

const GalleryPage = () => {
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800',
      title: 'Game Day',
      description: 'Intense match against rivals'
    },
    {
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      title: 'Team Celebration',
      description: 'Winning the championship'
    },
    {
      url: 'https://images.unsplash.com/photo-1517832607807-9c04dcef353b?w=800',
      title: 'Practice Session',
      description: 'Hard work pays off'
    },
    {
      url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      title: 'Game Action',
      description: 'High-flying dunk'
    },
    {
      url: 'https://images.unsplash.com/photo-1517836429999-0837f0e3fc0c?w=800',
      title: 'Team Huddle',
      description: 'Planning the next move'
    },
    {
      url: 'https://images.unsplash.com/photo-1555041468-22b81f2ec4b1?w=800',
      title: 'Training Camp',
      description: 'Building team chemistry'
    }
  ];

  return (
    <div className="gallery-page">
      <Gallery images={galleryImages} />
    </div>
  );
};

export default GalleryPage;
