// src/Pages/ForumPage.js
import React, { useState } from 'react';
import './ForumPage.css';

const ForumPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [queries, setQueries] = useState([]);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        clearForm();
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setTags('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuery = { title, description, tags, responses: 0 };
        setQueries([...queries, newQuery]);
        closeModal();
    };

    return (
        <div className="forum-page">
            <header>
                <h1>Community Forum</h1>
                <p>Share your queries, get answers, and discuss with the community.</p>
                <button onClick={openModal} className="post-query-button">Post a Query</button>
            </header>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Post a New Query</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Query Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                            <input
                                type="text"
                                placeholder="Tags (comma-separated)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <button type="submit">Submit Query</button>
                        </form>
                        <button onClick={closeModal} className="close-modal-button">Close</button>
                    </div>
                </div>
            )}

            <section className="query-list">
                {queries.map((query, index) => (
                    <div key={index} className="query-card">
                        <h3>{query.title}</h3>
                        <p>{query.description.slice(0, 100)}...</p>
                        <div className="query-info">
                            <span>Tags: {query.tags}</span>
                            <span>Responses: {query.responses}</span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ForumPage;
