import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BlogPageContainer,
  BlogTitle,
  PostsGrid,
  PostCard,
  PostTitle,
  PostContent,
  PostMeta
} from '../../styles/BlogPostStyles';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <BlogPageContainer>
      <BlogTitle>Latest Blog Posts</BlogTitle>
      <PostsGrid>
        {posts.map(post => (
          <PostCard key={post.id}>
            <Link to={`/blogs/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>
                {post.content.length > 200
                  ? post.content.slice(0, 200) + '...'
                  : post.content}
              </PostContent>
            </Link>
            <PostMeta>Published: {formatDate(post.created_at)}</PostMeta>
          </PostCard>
        ))}
      </PostsGrid>
    </BlogPageContainer>
  );
}
