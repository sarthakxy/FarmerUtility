// Header.js
import React from 'react';
import './Header.css';

const Header = ({ handleProtectedRoute, openLoginModal, openSignupModal, isAuthenticated, onLogout }) => {
    const handleLogout = () => {
        // Perform logout logic (e.g., clearing tokens or user data)
        localStorage.removeItem('authToken'); // Assuming you store authentication info in localStorage
        onLogout(); // Call the onLogout function passed as a prop to update authentication state
        handleProtectedRoute('/'); // Redirect to home after logout
    };

    return (
        <header className="App-header">
            <nav className="navbar">
                <div className="logo">🌾 Farmer Utility App</div>
                <ul className="nav-links">
                    <li><button onClick={() => handleProtectedRoute("/")}>Home</button></li>
                    <li><button onClick={() => handleProtectedRoute("/view-crops")}>View Crops</button></li>
                    <li><button onClick={() => handleProtectedRoute("/add-crop")}>Add Crop</button></li>
                    <li><button onClick={() => handleProtectedRoute("/payments")}>Payment Tracker</button></li>
                    <li><button onClick={() => handleProtectedRoute("/forum")}>Forum</button></li> {/* Added Forum Button */}
                </ul>
                <div className="auth-section">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    ) : (
                        <>
                            <button onClick={openLoginModal} className="auth-link">Login</button>
                            <button onClick={openSignupModal} className="auth-link">Signup</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
