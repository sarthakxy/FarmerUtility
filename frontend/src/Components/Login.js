import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ add this
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate(); // ⬅️ initialize navigate

    useEffect(() => {
        if (username.length > 0) {
            fetchSuggestions(username);
        } else {
            setSuggestions([]);
        }
    }, [username]);

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(`http://localhost:4000/api/auth/suggest-username?query=${query}`);
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || []);
            }
        } catch (error) {
            console.error('Error fetching username suggestions:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setUsername(suggestion);
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !password) {
            setError('Please fill in both username and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setSuccess('Login successful! Redirecting...');

                setTimeout(() => {
                    if (typeof onLoginSuccess === 'function') {
                        onLoginSuccess(data.token);
                    } else {
                        console.warn('onLoginSuccess is not provided or is not a function');
                    }
                }, 2000);
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleSignupRedirect = () => {
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('openSignupModal');
            window.dispatchEvent(event);
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-with-suggestions">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                        <ul className="username-suggestions">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            {/* Social logins */}
            <div className="social-login">
                <img src="/assets/facebook.png" alt="Facebook Login" />
                <img src="/assets/google.png" alt="Google Login" />
            </div>

            {/* Sign up link */}
            <p className="signup-link" onClick={handleSignupRedirect}>
                Sign Up
            </p>
        </div>
    );
};

export default Login;
