import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Add this import for styles

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

/* Styled Components — UI structure + styles */

const BlogContainer = styled.div`
  padding: 2rem;
  background: rgba(30, 30, 47, 0.7);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 204, 0, 0.2);
  max-width: 1200px;
  margin: 2rem auto;
`;

const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const BlogTitle = styled.h2`
  font-size: 2rem;
  color: #ffcc00;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const BlogControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  color: #1a1a2e;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.3);
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.8rem 1.2rem 0.8rem 2.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 204, 0, 0.3);
  background: rgba(26, 26, 46, 0.8);
  color: #e0e0ff;
  font-size: 0.95rem;
  width: 220px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  color: #aaa;
`;

const PostList = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
`;

const PostCard = styled.div`
  background: #1a1a2e;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 204, 0, 0.15);
  position: relative;
`;

const PostTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.4rem;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #aaa;
  margin: 0.5rem 0;
`;

const PostContent = styled.p`
  margin: 0 0 1rem;
  color: #bbb;
  font-size: 0.95rem;
`;

const PostActions = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ variant }) => (variant === 'delete' ? '#ff5555' : '#ffcc00')};
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #aaa;
`;

/* Modal for Create Post */

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #1a1a2e;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
`;

const ModalTitle = styled.h3`
  color: #ffcc00;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 204, 0, 0.2);
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 204, 0, 0.2);
  min-height: 100px;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  color: #1a1a2e;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
`;

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      if (!res.ok) throw new Error('Failed to create post');
      toast.success('Post created');
      setShowModal(false);
      setNewTitle('');
      setNewContent('');
      fetchPosts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Post deleted');
      fetchPosts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>Blog Manager</BlogTitle>
        <BlogControls>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <AddButton onClick={() => setShowModal(true)}>
            <FaPlus /> New Post
          </AddButton>
        </BlogControls>
      </BlogHeader>

      {loading ? (
        <EmptyState>Loading posts...</EmptyState>
      ) : filteredPosts.length === 0 ? (
        <EmptyState>No posts found</EmptyState>
      ) : (
        <PostList>
          {filteredPosts.map(post => (
            <PostCard key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                <div><FaCalendarAlt /> {post.created_at?.slice(0, 10)}</div>
                <div><FaUserAlt /> {post.author || 'Admin'}</div>
              </PostMeta>
              <PostContent>{post.content.slice(0, 150)}...</PostContent>
              <PostActions>
                <ActionButton variant="edit" onClick={() => toast.info('Edit coming soon')}>
                  <FaEdit /> Edit
                </ActionButton>
                <ActionButton variant="delete" onClick={() => deletePost(post.id)}>
                  <FaTrash /> Delete
                </ActionButton>
              </PostActions>
            </PostCard>
          ))}
        </PostList>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Create New Post</ModalTitle>
            <Input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <ReactQuill
              theme="snow"
              value={newContent}
              onChange={setNewContent}
              style={{ height: '200px', marginBottom: '1rem' }}
            />
            <SubmitButton onClick={createPost}>Publish</SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}

    </BlogContainer>
  );
}

export default BlogManager;
