import React from 'react';
import '@styles/features-grid.css';

const HomePageFeatures = () => {
  const features = [
    {
      image: "https://ccbasketball.com.au/wp-content/uploads/2022/11/Junior-League-scaled.jpg",
      title: "Access Resources",
      description: "Get access to training materials, game schedules, and club news."
    },
    {
      image: "https://tsblogadmin.teamsnap.com/wp-content/uploads/2024/04/iStock-1399212293.jpg",
      title: "Track Your Progress",
      description: "Monitor your performance, set goals, and see your improvement over time."
    },
    {
      image: "https://res.cloudinary.com/ddsbdyeyj/image/upload/v1710946019/3cd2f01b-5ff3-4069-a25d-328e97d42b8c.jpg",
      title: "Connect with Players",
      description: "Join our community, find teammates, and share experiences with fellow players."
    }
  ];

  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <img 
            src={feature.image} 
            alt={feature.title} 
            className="feature-image"
          />
          <div className="feature-content">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageFeatures;
