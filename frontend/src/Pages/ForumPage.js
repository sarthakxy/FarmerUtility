import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ForumPage.css';
import { FaChevronDown, FaTrash, FaChevronUp, FaTimes, FaHeart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';


const ITEMS_PER_PAGE = 5;
const INITIAL_QUERY_COUNT = 5;
const REACTION_EMOJIS = ['👍', '❤️', '😊', '🎉', '🤔', '😂'];

const ForumPage = () => {
  const [queries, setQueries] = useState([]);
  const [visibleQueriesCount, setVisibleQueriesCount] = useState(INITIAL_QUERY_COUNT);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repliesVisible, setRepliesVisible] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [replies, setReplies] = useState({});
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [descWordCount, setDescWordCount] = useState(0);
  const [reactionMenuVisible, setReactionMenuVisible] = useState({});
  const [reactions, setReactions] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const MIN_TITLE_WORDS = 3;
  const MIN_DESCRIPTION_WORDS = 5;

  const fetchQueries = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/forum/queries');
      setQueries(res.data);
    } catch (err) {
      console.error('❌ Error fetching queries:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded?.username || null);
      } catch (e) {
        console.error('Invalid token');
      }
    }
    fetchQueries();
  }, []);

  const handleDeleteQuery = async (queryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this query?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4000/api/forum/${queryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQueries((prev) => prev.filter((q) => q._id !== queryId));
    } catch (err) {
      console.error('❌ Failed to delete query:', err);
      alert('Error deleting query.');
    }
  };

  const handleDeleteReply = async (queryId, replyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this reply?');
    if (!confirmDelete) return;
  
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4000/api/forum/${queryId}/reply/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReplies((prev) => ({
        ...prev,
        [queryId]: prev[queryId].filter((r) => r._id !== replyId),
      }));
    } catch (err) {
      console.error('❌ Failed to delete reply:', err);
      alert('Error deleting reply.');
    }
  };
  

  const fetchReplies = async (queryId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/forum/${queryId}/replies`);
      setReplies((prev) => ({ ...prev, [queryId]: res.data }));
    } catch (err) {
      console.error(`❌ Failed to fetch replies for ${queryId}:`, err);
    }
  };

  const toggleReplies = (queryId) => {
    const isVisible = repliesVisible[queryId];
    setRepliesVisible({ ...repliesVisible, [queryId]: !isVisible });
    if (!isVisible && !replies[queryId]) {
      fetchReplies(queryId);
    }
    setReactionMenuVisible(prev => ({ ...prev, [queryId]: false }));
  };

  const handleReplyChange = (queryId, value) => {
    setReplyInputs({ ...replyInputs, [queryId]: value });
  };

  const submitReply = async (queryId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login required to reply.');
      return;
    }

    const content = replyInputs[queryId];
    if (!content || content.trim().length < 3) return;

    try {
      const res = await axios.post(
        `http://localhost:4000/api/forum/${queryId}/reply`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplies(prev => ({
        ...prev,
        [queryId]: [...(prev[queryId] || []), res.data],
      }));
      setReplyInputs({ ...replyInputs, [queryId]: '' });
    } catch (err) {
      alert('Failed to post reply.');
      console.error(err);
    }
  };

  const handlePostQuery = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Login required to post query.");
      return;
    }

    if (titleWordCount < MIN_TITLE_WORDS || descWordCount < MIN_DESCRIPTION_WORDS) {
      alert("Please meet the minimum word requirements.");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:4000/api/forum/post-query',
        { title: title.trim(), description: description.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQueries((prev) => [res.data, ...prev]);
      setVisibleQueriesCount(INITIAL_QUERY_COUNT);
      setTitle('');
      setDescription('');
      setTitleWordCount(0);
      setDescWordCount(0);
    } catch (err) {
      alert('Error posting query.');
      console.error(err);
      console.error('❌ Axios Error Response:', err.response);
    }
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    setTitleWordCount(val.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    setDescWordCount(val.trim().split(/\s+/).filter(Boolean).length);
  };

  const showMoreQueries = () => {
    setVisibleQueriesCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const closeQueries = () => {
    setVisibleQueriesCount(INITIAL_QUERY_COUNT);
  };

  const toggleReactionMenu = (itemId, isQuery) => {
    setReactionMenuVisible(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleAddReaction = (itemId, emoji, isQuery) => {
    const key = isQuery ? `query-${itemId}` : `reply-${itemId}`;
    setReactions(prev => ({
      ...prev,
      [key]: emoji,
    }));
    setReactionMenuVisible(prev => ({ ...prev, [itemId]: false }));
  };

  const renderReaction = (itemId, isQuery) => {
    const key = isQuery ? `query-${itemId}` : `reply-${itemId}`;
    return reactions[key] || null;
  };

  const visibleQueries = queries.slice(0, visibleQueriesCount);
  const allQueriesLoaded = visibleQueries.length >= queries.length;
  const showCloseButton = visibleQueriesCount > INITIAL_QUERY_COUNT;

  return (
    <div className="forum-page-container">
      <div className="post-query-section">
        <h2 className="forum-title">✍️ Post a Query</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
        <p className="validation-message">
          {titleWordCount < MIN_TITLE_WORDS
            ? `Title must be at least ${MIN_TITLE_WORDS} words. (${MIN_TITLE_WORDS - titleWordCount} more to go)`
            : '✅ Title length okay'}
        </p>
        <textarea
          className="textarea-field"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
          rows="4"
        />
        <p className="validation-message">
          {descWordCount < MIN_DESCRIPTION_WORDS
            ? `Description must be at least ${MIN_DESCRIPTION_WORDS} words. (${MIN_DESCRIPTION_WORDS - descWordCount} more to go)`
            : '✅ Description length okay'}
        </p>
        <button
          className="post-button"
          onClick={handlePostQuery}
          disabled={titleWordCount < MIN_TITLE_WORDS || descWordCount < MIN_DESCRIPTION_WORDS}
        >
          Post Query
        </button>
      </div>
      <div className="queries-section">
        <h2 className="forum-title">📢 Recent Queries</h2>
        {visibleQueries.map((query) => (
          <div key={query._id} className="query-card">
            <div className="query-header">
              <h4>{query.title}</h4>
              <p className="query-user">@{query.username || 'Anonymous'}</p>
              {currentUser === query.username && (
                <button
                  className="delete-button"
                  title="Delete query"
                  onClick={() => handleDeleteQuery(query._id)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
            <p className="query-description">{query.description}</p>

            <div className="post-actions">
              <button
                className="reaction-button"
                onClick={() => toggleReactionMenu(query._id, true)}
              >
                {renderReaction(query._id, true) || <FaHeart />}
              </button>
              {reactionMenuVisible[query._id] && (
                <div className="reaction-menu">
                  {REACTION_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      className="emoji-button"
                      onClick={() => handleAddReaction(query._id, emoji, true)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              <button className="view-replies-btn" onClick={() => toggleReplies(query._id)}>
                {repliesVisible[query._id] ? 'Hide Replies' : 'View Replies'}
              </button>
            </div>

            {repliesVisible[query._id] && (
              <div className="replies-section">
                {replies[query._id]?.map((reply) => (
  <div key={reply._id} className="reply-item">
    <strong>@{reply.username || 'Anonymous'}:</strong> {reply.content}
    {currentUser === reply.username && (
      <button
        className="delete-reply-button"
        title="Delete reply"
        onClick={() => handleDeleteReply(query._id, reply._id)}
      >
        🗑️
      </button>
    )}
  </div>
))}

                <textarea
                  className="reply-input"
                  placeholder="Write a reply..."
                  value={replyInputs[query._id] || ''}
                  onChange={(e) => handleReplyChange(query._id, e.target.value)}
                />
                <button className="submit-reply-btn" onClick={() => submitReply(query._id)}>
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        ))}
        {queries.length > visibleQueries.length && (
          <button className="show-more-button" onClick={showMoreQueries}>
            Show More Queries <FaChevronDown className="arrow-down" />
          </button>
        )}
        {showCloseButton && (
          <button className="close-queries-button" onClick={closeQueries}>
            Close Queries <FaTimes className="close-icon" />
          </button>
        )}
        {allQueriesLoaded && queries.length > 0 && (
          <div className="end-of-queries">
            <FaChevronUp className="arrow-up" /> You've reached the end of the queries. <FaChevronUp className="arrow-up" />
          </div>
        )}
        {queries.length === 0 && <p className="no-queries">No queries posted yet.</p>}
      </div>
    </div>
  );
};

export default ForumPage;
