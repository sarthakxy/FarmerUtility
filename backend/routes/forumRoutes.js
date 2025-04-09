// routes/forum.js

const express = require('express');
const router = express.Router();
const { postQuery, getAllQueries } = require('../controllers/forumController');
const verifyToken = require('../middleware/authMiddleware.js');

// 🛡️ Protected POST route
router.post('/post-query', verifyToken, postQuery);


// ✅ Public GET route
router.get('/queries', getAllQueries);

module.exports = router;
