import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CropPrices from './Components/CropPrices';
import AddCropPage from './Pages/AddCropPage';
import PaymentTrackerPage from './Pages/PaymentTrackerPage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Modal from './Components/Modal';
import Header from './Components/Header/Header';
import HeroSection from './Components/HeroSection/HeroSection'; // Import HeroSection
import ForumPage from './Pages/ForumPage';

import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showCopyrightModal, setShowCopyrightModal] = useState(false);
    const [redirectPath, setRedirectPath] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        setShowLoginModal(false);
        if (redirectPath) {
            navigate(redirectPath);
            setRedirectPath(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate("/");
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
        setShowSignupModal(false);
    };

    const openSignupModal = () => {
        setShowSignupModal(true);
        setShowLoginModal(false);
    };

    const handleProtectedRoute = (path) => {
        if (isAuthenticated) {
            navigate(path);
        } else {
            setRedirectPath(path);
            setShowLoginModal(false);
            setShowSignupModal(false);
            setShowCopyrightModal(true);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="App">
            <Header
                isAuthenticated={isAuthenticated}
                openLoginModal={openLoginModal}
                openSignupModal={openSignupModal}
                handleProtectedRoute={handleProtectedRoute}
                onLogout={handleLogout}
            />
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/view-crops" element={isAuthenticated ? <CropPrices /> : <Navigate to="/" />} />
                    <Route path="/add-crop" element={isAuthenticated ? <AddCropPage /> : <Navigate to="/" />} />
                    <Route path="/payments" element={isAuthenticated ? <PaymentTrackerPage /> : <Navigate to="/" />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            {/* Login Modal */}
            <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
                <Login onLogin={handleLogin} />
            </Modal>
            {/* Signup Modal */}
            <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
                <Signup />
            </Modal>
            {/* Copyright Modal */}
            <Modal 
                show={showCopyrightModal} 
                onClose={() => {
                    setShowLoginModal(false);
                    setShowSignupModal(false);
                    setRedirectPath(null);
                    setShowCopyrightModal(false);
                }}
            >
                <div className="modal-content">
                    <h3>Farmer Utility App - © 2024 Farmer Utility Corp.</h3>
                    <p>Please log in or sign up to access this feature.</p>
                    <div className="modal-actions">
                        <button onClick={() => { 
                            setShowLoginModal(true); 
                            setShowSignupModal(false); 
                            setShowCopyrightModal(false); 
                        }}>Login</button>
                        <button onClick={() => { 
                            setShowSignupModal(true); 
                            setShowLoginModal(false); 
                            setShowCopyrightModal(false); 
                        }}>Signup</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default App;
