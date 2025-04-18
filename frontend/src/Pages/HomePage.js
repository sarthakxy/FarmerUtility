import React from 'react';
import HeroSection from '../Components/HeroSection/HeroSection';
import Features from '../Components/Features/Features';
import Testimonials from '../Components/Testimonials/Testimonials';

const HomePage = () => {
  return (
    <div style={{ height: '2000px', background: '#f3f3f3' }}>
      <HeroSection />
      <Features />
      <Testimonials />
    </div>
  );
};

export default HomePage;
