require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Import routes
const forumRoutes = require('./routes/forumRoutes');
const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet()); // Security headers
app.use(express.json());
app.use(
    cors({
        origin: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

// MongoDB Connection (Keep it for auth-related tasks)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(`Error connecting to MongoDB: ${error.message}`));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/crops', cropRoutes);  // Crop routes for external API-based data fetching

// Health check
app.get('/', (req, res) => res.send('Node.js Backend is running!'));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
