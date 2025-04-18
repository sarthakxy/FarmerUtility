import React, { useState } from 'react';
import './Header.css';

const Header = ({ isAuthenticated, openLoginModal, openSignupModal, onLogout, scrollingDown }) => {
    const [showPopup, setShowPopup] = useState(false); // For showing the login/signup popup

    // Function to show popup for non-authenticated users
    const handleLinkClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();  // Prevent navigation
            setShowPopup(true);  // Show login/signup pop-up
        }
    };

    // Function to close the popup
    const closePopup = () => setShowPopup(false);

    // New wrapper functions: show modal & close popup
    const handleLoginClick = () => {
        openLoginModal();       // Open login modal
        closePopup();           // Close popup
    };

    const handleSignupClick = () => {
        openSignupModal();      // Open signup modal
        closePopup();           // Close popup
    };

    return (
        <header className={`navbar ${scrollingDown ? 'navbar-hidden' : ''}`}>
            <div className="logo">
                <span role="img" aria-label="farmer emoji">👩‍🌾</span>
                Farmer Utility
            </div>
            <ul className="nav-links">
                <li><a href="/" onClick={handleLinkClick}>Home</a></li>
                <li><a href="/view-crops" onClick={handleLinkClick}>View Crops</a></li>
                <li><a href="/Weather" onClick={handleLinkClick}>WeatherPage</a></li>
                <li><a href="/Commodity" onClick={handleLinkClick}>Commodity</a></li>
                <li><a href="/forum" onClick={handleLinkClick}>Forum</a></li>
                <li><a href="/payments" onClick={handleLinkClick}>Payments</a></li>
                
            </ul>
            <div className="auth-section">
                {isAuthenticated ? (
                    <button onClick={onLogout} className="logout-button">Logout</button>
                ) : (
                    <>
                        <button onClick={openLoginModal}>Login</button>
                        <button onClick={openSignupModal}>Signup</button>
                    </>
                )}
            </div>

            {/* Popup for login/signup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Please log in or sign up to continue</h2>
                        <button onClick={handleLoginClick}>Login</button>
                        <button onClick={handleSignupClick}>Signup</button>
                        <button className="close-button" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
