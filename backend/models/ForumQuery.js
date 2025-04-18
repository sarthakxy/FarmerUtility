// backend/models/ForumQuery.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: [3, 'Reply must be at least 3 characters long.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const forumQuerySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: [5, 'Title must be at least 5 characters long.'],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, 'Description must be at least 10 characters long.'],
    },
    replies: [replySchema], // ✅ Embedded replies
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ForumQuery = mongoose.model('ForumQuery', forumQuerySchema);
module.exports = ForumQuery;
