// HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-section">
            <video className="background-video" autoPlay loop muted playsInline>
                <source src="/Assets/HomeVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-content">
                <h2>Welcome to the Farmer Utility App</h2>
                <p>Track your crops, payments, and more!</p>
                <button className="cta-button">Get Started</button>
            </div>
        </div>
    );
}

export default HeroSection;
