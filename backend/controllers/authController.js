const jwt = require('jsonwebtoken');
const { users } = require('../db');  // Assuming users are stored in-memory for now.

const secretKey = process.env.JWT_SECRET; 

const login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials!' });
    }

    // Generate JWT token after successful login
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Login successful!', token });
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from headers
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Attach decoded user info to the request
        next();
    });
};

module.exports = { login, authenticateToken };
