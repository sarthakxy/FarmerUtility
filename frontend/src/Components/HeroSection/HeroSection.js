import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="video-container">
                <video className="background-video" autoPlay loop muted playsInline>
                    <source src="/Assets/HomeVideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-content">
                    <h2>Welcome to the Farmer Utility App</h2>
                    <p>Track your crops, payments, and more!</p>
                </div>
            </div>
            {/* Button placed OUTSIDE the video-container */}
            <div className="cta-wrapper">
                <button className="cta-button">Get Started</button>
            </div>
        </div>
    );
};

export default HeroSection;
