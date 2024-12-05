// Features.js
import React from 'react';
import './Features.css';

const features = [
    { title: "Real-Time Crop Prices", description: "Stay updated with the latest crop prices.", icon: "📈" },
    { title: "Secure Payment Tracking", description: "Track payments with ease and security.", icon: "💰" },
    { title: "AI-Powered Crop Prediction", description: "Get insights with AI predictions.", icon: "🤖" },
    { title: "Farm Management", description: "Manage all farm-related records.", icon: "🌱" }
];

const Features = () => (
    <div className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
            {features.map((feature, index) => (
                <div className="feature-item" key={index}>
                    <span className="feature-icon">{feature.icon}</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </div>
    </div>
);

export default Features;
