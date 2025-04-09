import React, { useEffect, useState } from 'react';
import PostQueryForm from './PostQueryForm';
import axios from 'axios';
import './ForumPage.css';

const ForumPage = () => {
    const [queries, setQueries] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleWordCount, setTitleWordCount] = useState(0);
    const [descriptionWordCount, setDescriptionWordCount] = useState(0);

    const MIN_TITLE_WORDS = 5;
    const MIN_DESCRIPTION_WORDS = 10;

    const fetchQueries = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/forum/queries');
            const data = await response.json();
            setQueries(data);
        } catch (err) {
            console.error('❌ Error fetching queries:', err);
        }
    };

    const handlePostQuery = async () => {
        const token = localStorage.getItem('token');
        console.log('📦 Token:', token);

        if (!token) {
            alert("You must be logged in to post a query.");
            return;
        }

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        const titleWords = trimmedTitle.split(/\s+/).filter(Boolean).length;
        const descWords = trimmedDescription.split(/\s+/).filter(Boolean).length;

        if (titleWords < MIN_TITLE_WORDS || descWords < MIN_DESCRIPTION_WORDS) {
            alert("Please meet the minimum word requirements.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:4000/api/forum/post-query',
                { title: trimmedTitle, description: trimmedDescription },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newQuery = response.data;
            setQueries((prev) => [newQuery, ...prev]);

            setTitle('');
            setDescription('');
            setTitleWordCount(0);
            setDescriptionWordCount(0);

        } catch (err) {
            console.error('🔥 Error posting query:', err);
            if (err.response && err.response.data && err.response.data.message) {
                const errorMessage = err.response.data.message;
                if (errorMessage === "Invalid token" || errorMessage.includes("expired")) {
                    alert("Session expired. Please log in again.");
                } else {
                    alert(errorMessage || "Failed to post query.");
                }
            } else {
                alert("Something went wrong. Try again.");
            }
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setTitleWordCount(value.trim().split(/\s+/).filter(Boolean).length);
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        setDescriptionWordCount(value.trim().split(/\s+/).filter(Boolean).length);
    };

    return (
        <div className="forum-container">
          <div className="forum-card">
            <h2 className="forum-title">💬 Forum</h2>
      
            <input
              className="input-field"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
            {titleWordCount < MIN_TITLE_WORDS && (
              <p className="validation-message">
                Title must be at least {MIN_TITLE_WORDS} words. ({MIN_TITLE_WORDS - titleWordCount} more to go)
              </p>
            )}
      
            <textarea
              className="textarea-field"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
              rows="4"
            />
            {descriptionWordCount < MIN_DESCRIPTION_WORDS && (
              <p className="validation-message">
                Description must be at least {MIN_DESCRIPTION_WORDS} words. ({MIN_DESCRIPTION_WORDS - descriptionWordCount} more to go)
              </p>
            )}
      
            <button
              className="post-button"
              onClick={handlePostQuery}
              disabled={
                titleWordCount < MIN_TITLE_WORDS || descriptionWordCount < MIN_DESCRIPTION_WORDS
              }
            >
              Post Query
            </button>
      
            <div className="queries-section">
              {queries.map((query, index) => (
                <div key={index} className="query-card">
                  <div className="query-title">{query.title}</div>
                  <div className="query-description">{query.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
};

export default ForumPage;
