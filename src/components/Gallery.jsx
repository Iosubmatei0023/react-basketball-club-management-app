import React from 'react';

const Gallery = () => {
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
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>
      <div className="gallery-categories">
        {categories.map((category, index) => (
          <div key={index} className="gallery-category">
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
