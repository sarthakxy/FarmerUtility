const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware.js');
const {
  postQuery,
  getAllQueries,
  postReply,
  getReplies,
  deleteQuery, 
  deleteReply,
} = require('../controllers/forumController');


router.post('/post-query', verifyToken, postQuery);
router.post('/:queryId/reply', verifyToken, postReply); 
router.get('/:queryId/replies', getReplies);
router.get('/queries', getAllQueries);
router.delete('/:queryId', verifyToken, deleteQuery);
router.delete('/:queryId/reply/:replyId', verifyToken, deleteReply);



module.exports = router;
