// forumController.js
const ForumQuery = require('../models/ForumQuery');

// POST /api/forum/post-query (Protected Route)
const postQuery = async (req, res) => {
    const { title, description } = req.body;

    console.log('🧾 Incoming request body:', req.body);
    console.log('👤 User from token:', req.user);

    // Validate input
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        const forumQuery = new ForumQuery({
            username: req.user.username,
            title: title.trim(),
            description: description.trim(),
            
        });

        const savedQuery = await forumQuery.save();

        res.status(201).json({
            message: 'Forum query posted successfully!',
            query: savedQuery,
        });
    } catch (err) {
        console.error('❌ Error saving forum query:', err);
        res.status(500).json({
            message: 'Error posting forum query.',
            error: err.message,
        });
    }
};

// GET /api/forum/queries
const getAllQueries = async (req, res) => {
    try {
        const queries = await ForumQuery.find().sort({ createdAt: -1 });
        res.status(200).json(queries);
    } catch (err) {
        console.error('Error fetching forum queries:', err);
        res.status(500).json({ message: 'Error fetching queries.', error: err.message });
    }
};

// POST reply to a query
const postReply = async (req, res) => {
    const { content } = req.body;
    const { queryId } = req.params;

    if (!content || content.trim().length < 3) {
        return res.status(400).json({ message: 'Reply must be at least 3 characters long.' });
    }

    try {
        const query = await ForumQuery.findById(queryId);
        if (!query) {
            return res.status(404).json({ message: 'Query not found.' });
        }

        const reply = {
            username: req.user.username,
            content: content.trim(),
        };

        query.replies.push(reply);
        await query.save();

        res.status(201).json({ message: 'Reply posted successfully.', reply });
    } catch (err) {
        console.error('Error posting reply:', err);
        res.status(500).json({ message: 'Error posting reply.', error: err.message });
    }
};

// GET replies for a query
const getReplies = async (req, res) => {
    const { queryId } = req.params;

    try {
        const query = await ForumQuery.findById(queryId);
        if (!query) {
            return res.status(404).json({ message: 'Query not found.' });
        }

        res.status(200).json(query.replies || []);
    } catch (err) {
        console.error('Error fetching replies:', err);
        res.status(500).json({ message: 'Error fetching replies.', error: err.message });
    }
};

module.exports = {
    postQuery,
    getAllQueries,
    postReply,
    getReplies,
};
