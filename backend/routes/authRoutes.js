const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

// MongoDB User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            // Generate realistic username suggestions
            const timestamp = Date.now();
            const randomNumbers = Math.floor(Math.random() * 1000);
            const suggestions = [
                `${username}${timestamp.toString().slice(-4)}`,
                `${username}${randomNumbers}`,
                `${username}_official`,
                `${username}_user`,
                `${username}.${Math.floor(Math.random() * 100)}`,
            ];
            return res.status(400).json({
                message: 'Username already exists.',
                suggestions,
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Suggest Username Route
router.get('/suggest-username', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required.' });
    }

    try {
        // Filter usernames that start with the query string (case-insensitive)
        const users = await User.find({ username: { $regex: `^${query}`, $options: 'i' } }).select('username');
        const matchingUsernames = users.map((user) => user.username);

        res.status(200).json({ suggestions: matchingUsernames });
    } catch (error) {
        console.error('Error during username suggestion:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
