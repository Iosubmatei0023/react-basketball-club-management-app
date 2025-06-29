import React from "react";
import Navbar from "../components/HPcomponents/Navbar";
import HeroSection from "../components/HPcomponents/HeroSection";
import FeaturesGrid from "../components/HPcomponents/FeaturesGrid";
import BenefitsSection from "../components/HPcomponents/BenefitsSection";

function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#f8f9fa'
    }}>
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        maxWidth: '1200px',
        width: '100%',
        padding: '0 1rem'
      }}>
        <HeroSection />
        <FeaturesGrid />
        <BenefitsSection />
      </div>
    </div>
  );
}

export default HomePage;
