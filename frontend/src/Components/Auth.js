// Auth.js
import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
    const [tab, setTab] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        // Example token for testing purposes
        const token = 'sample_token';
        onLogin(token);
    };

    const handleSignup = () => {
        // Handle signup logic here
        alert('Signup successful!');
        onLogin('sample_token'); // Simulate login after signup
    };

    return (
        <div className="auth-container">
            <div className="auth-tabs">
                <button onClick={() => setTab('login')} className={tab === 'login' ? 'active' : ''}>Login</button>
                <button onClick={() => setTab('signup')} className={tab === 'signup' ? 'active' : ''}>Signup</button>
            </div>
            {tab === 'login' && (
                <div className="login-form">
                    <h2>Login</h2>
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
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            {tab === 'signup' && (
                <div className="signup-form">
                    <h2>Signup</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSignup}>Signup</button>
                </div>
            )}
        </div>
    );
};

export default Auth;
