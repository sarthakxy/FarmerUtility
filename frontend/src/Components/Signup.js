import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onSignupSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setSuggestions([]);

        if (!username || !password) {
            setError('Please fill in both username and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Signup successful! Redirecting to login...');
                setTimeout(() => {
                    onSignupSuccess(); // Trigger login modal open
                }, 2000);
            } else {
                setError(data.message || 'Signup failed. Please try again.');
                if (data.suggestions) {
                    setSuggestions(data.suggestions); // Set suggestions if they exist
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setUsername(suggestion); // Set the clicked suggestion as the username
        setSuggestions([]); // Clear suggestions to avoid confusion
    };

    const handleSignupRedirect = () => {
        window.dispatchEvent(new Event('openLoginModal'));
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>

            {/* Show suggestions if they are available */}
            {suggestions.length > 0 && (
                <div className="username-suggestions">
                    <p>Username already exists. Select one of these suggestions:</p>
                    <ul>
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
                </div>
            )}

            {/* Social logins */}
            <div className="social-login">
                <img src="/assets/facebook.png" alt="Facebook Login" />
                <img src="/assets/google.png" alt="Google Login" />
            </div>

            {/* Sign up link */}
            <p className="signup-link" onClick={handleSignupRedirect}>
                Already have an account? Login
            </p>
        </div>
    );
};

export default Signup;
