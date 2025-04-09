// forumController.js
const ForumQuery = require('../models/ForumQuery');

// POST /api/forum/post-query (Protected Route)
const postQuery = async (req, res) => {
    const { title, description, tags } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        const forumQuery = new ForumQuery({
            username: req.user.username,  // ✅ Username from JWT token
            title,
            description,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        });

        const savedQuery = await forumQuery.save();

        res.status(201).json({
            message: 'Forum query posted successfully!',
            query: savedQuery,
        });
    } catch (err) {
        console.error('Error saving forum query:', err);
        res.status(500).json({
            message: 'Error posting forum query.',
            error: err.message,
        });
    }
};

// GET /api/forum/queries (Public or Protected — your call)
const getAllQueries = async (req, res) => {
    try {
        const queries = await ForumQuery.find().sort({ createdAt: -1 });
        res.status(200).json(queries);
    } catch (err) {
        console.error('Error fetching forum queries:', err);
        res.status(500).json({ message: 'Error fetching queries.', error: err.message });
    }
};

module.exports = {
    postQuery,
    getAllQueries,
};
