// src/pages/public/Blog.js
import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts', err));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#e0e0ff' }}>
      <h1>Blog</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #444' }}>
          <h2>{post.title}</h2>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
            By {post.author_email} on {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
