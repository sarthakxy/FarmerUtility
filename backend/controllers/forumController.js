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

const deleteQuery = async (req, res) => {
    const { queryId } = req.params;

    try {
        const query = await ForumQuery.findById(queryId);

        if (!query) {
            return res.status(404).json({ message: 'Query not found.' });
        }

        if (query.username !== req.user.username) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own queries.' });
        }

        await ForumQuery.findByIdAndDelete(queryId);
        res.status(200).json({ message: 'Query deleted successfully.' });
    } catch (err) {
        console.error('Error deleting query:', err);
        res.status(500).json({ message: 'Error deleting query.', error: err.message });
    }
};

// DELETE /api/forum/:queryId/reply/:replyId
const deleteReply = async (req, res) => {
    const { queryId, replyId } = req.params;
  
    try {
      const query = await ForumQuery.findById(queryId);
      if (!query) {
        return res.status(404).json({ message: 'Query not found.' });
      }
  
      const replyIndex = query.replies.findIndex(
        (reply) => reply._id && reply._id.equals(mongoose.Types.ObjectId(replyId))
      );
      console.log("Searching for replyId:", replyId);
console.log("Replies:", query.replies.map(r => r._id?.toString()));

      
      if (replyIndex === -1) {
        return res.status(404).json({ message: 'Reply not found.' });
      }
  
      if (query.replies[replyIndex].username !== req.user.username) {
        return res.status(403).json({ message: 'Unauthorized to delete this reply.' });
      }
  
      query.replies.splice(replyIndex, 1);
      await query.save();
  
      res.status(200).json({ message: 'Reply deleted successfully.' });
    } catch (err) {
      console.error('Error deleting reply:', err);
      res.status(500).json({ message: 'Error deleting reply.', error: err.message });
    }
  };
  


module.exports = {
    postQuery,
    getAllQueries,
    postReply,
    getReplies,
    deleteQuery,
    deleteReply,
};
