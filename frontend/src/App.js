import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ViewCropPage from './Components/ViewCropPage/ViewCropPage'; // Updated import
import ProfitSell from './Pages/ProfitSell';
import PaymentTrackerPage from './Pages/PaymentTrackerPage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Modal from './Components/Modal';
import Header from './Components/Header/Header';
import ForumPage from './Pages/ForumPage';
import WeatherPage from './Pages/WeatherPage'; // adjust the path if needed
import Footer from './Components/Footer/Footer';




import './App.css';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [redirectPath, setRedirectPath] = useState(null);

    const [scrollingDown, setScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setScrollingDown(true);
            } else {
                setScrollingDown(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    useEffect(() => {
        const handleOpenSignupModal = () => {
            setShowSignupModal(true);
            setShowLoginModal(false);
        };
    
        const handleOpenLoginModal = () => {
            setShowLoginModal(true);
            setShowSignupModal(false);
        };
    
        window.addEventListener('openSignupModal', handleOpenSignupModal);
        window.addEventListener('openLoginModal', handleOpenLoginModal);
    
        return () => {
            window.removeEventListener('openSignupModal', handleOpenSignupModal);
            window.removeEventListener('openLoginModal', handleOpenLoginModal);
        };
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
        navigate('/');
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
        setShowSignupModal(false);
    };

    const openSignupModal = () => {
        setShowSignupModal(true);
        setShowLoginModal(false);
    };

    const handleSignupSuccess = () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
    };

    const handleProtectedRoute = (path) => {
        if (isAuthenticated) {
            navigate(path);
        } else {
            setRedirectPath(path);
            setShowLoginModal(true);
            setShowSignupModal(false);
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
                scrollingDown={scrollingDown}
            />

            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/view-crops" element={isAuthenticated ? <ViewCropPage /> : <Navigate to="/" />} />
                    <Route path="/profit-sell" element={isAuthenticated ? <ProfitSell /> : <Navigate to="/" />} />
                    <Route path="/payments" element={isAuthenticated ? <PaymentTrackerPage /> : <Navigate to="/" />} />
                    <Route path="/weather" element={isAuthenticated ? <WeatherPage /> : <Navigate to="/" />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>

            
            <Footer /> {/* ✅ Add this just before the modals */}
            
            <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
                <Login onLoginSuccess={handleLogin} />
            </Modal>

            <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
                <Signup onSignupSuccess={handleSignupSuccess} />
            </Modal>
        </div>
    
);
}

export default App;
