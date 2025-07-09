import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('authToken');

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `${API_BASE_URL}/api/posts/${editingId}`
      : `${API_BASE_URL}/api/posts`;

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    setFormData({ title: '', content: '' });
    setEditingId(null);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({ title: post.title, content: post.content });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;

    await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchPosts();
  };

  return (
    <div style={{ marginTop: '2rem', color: '#e0e0ff' }}>
      <h2>Manage Blog Posts</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
          required
          style={{ marginRight: '0.5rem' }}
        />
        <textarea
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          placeholder="Content"
          required
          style={{ marginRight: '0.5rem', width: '100%', height: '100px' }}
        />
        <button type="submit">
          {editingId ? 'Update' : 'Create'} Post
        </button>
      </form>

      {posts.length === 0 && <p>No blog posts yet.</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <strong>{post.title}</strong>
            <button onClick={() => handleEdit(post)} style={{ marginLeft: '1rem' }}>Edit</button>
            <button onClick={() => handleDelete(post.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
