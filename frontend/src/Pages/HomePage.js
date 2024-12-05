import React from 'react';
import HeroSection from '../Components/HeroSection/HeroSection';
import Features from '../Components/Features/Features'; // Ensure you have this component
import Testimonials from '../Components/Testimonials/Testimonials'; // Ensure you have this component
import Footer from '../Components/Footer/Footer'; // Ensure you have this component
import './HomePage.css'; // Ensure CSS is imported

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="header"> {/* Header Component */} </div>
            <HeroSection />
            <div className="content">
                <Features />
                <Testimonials />
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
