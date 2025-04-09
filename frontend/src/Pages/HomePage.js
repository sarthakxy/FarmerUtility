import React from 'react';
import HeroSection from '../Components/HeroSection/HeroSection';
import Features from '../Components/Features/Features';
import Testimonials from '../Components/Testimonials/Testimonials';

const HomePage = () => {
  return (
    <div className="home-page" style={{ width: "100%", overflowX: "hidden" }}>
      <HeroSection />
      <Features />
      <Testimonials />
    </div>
  );
};

export default HomePage;
