const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware.js');
const {
    postQuery,
    getAllQueries,
    postReply,
    getReplies
  } = require('../controllers/forumController');

router.post('/post-query', verifyToken, postQuery);
router.post('/:queryId/reply', verifyToken, postReply); 
router.get('/:queryId/replies', getReplies);
router.get('/queries', getAllQueries);

module.exports = router;
