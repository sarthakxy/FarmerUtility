const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

// Initialize sample data
const users = [
    { username: 'testuser', password: '$2b$10$3qhl4.w0eP40gh3drkCFYesL7iEdVXikueIEssrGAWEB.pd/yVFJ.' },
];

const crops = [];
const payments = [];
const forumPosts = [];

// Export connection function and sample data
module.exports = {
    connectDB,  // This is the correct export for connectDB
    crops,
    users,
    payments,
    forumPosts,
};
