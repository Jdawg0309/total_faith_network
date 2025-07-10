// src/styles/BlogPostStyles.js
import styled from 'styled-components';

export const BlogPageContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem 1rem;
  color: #e0e0ff;
  background: linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0,0,0,0.4);
`;

export const BlogTitle = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  margin-bottom: 2.5rem;
  color: #ffcc00;
  text-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
`;

export const PostCard = styled.div`
  background: #1a1a2e;
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 204, 0, 0.1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
    border-color: rgba(255, 204, 0, 0.3);
  }
`;

export const PostTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 204, 0, 0.2);
  padding-bottom: 0.5rem;
`;

export const PostContent = styled.div`
  font-size: 1rem;
  color: #cfcfe0;
  line-height: 1.8;

  h1, h2, h3, h4, h5, h6 {
    color: #ffcc00;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #ffcc00;
    text-decoration: underline;

    &:hover {
      color: #ff9900;
    }
  }

  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  blockquote {
    border-left: 4px solid #ffcc00;
    padding-left: 1rem;
    color: #ccc;
    font-style: italic;
    margin: 1rem 0;
    background: rgba(255, 255, 255, 0.03);
  }

  pre {
    background: #2a2a3e;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }
`;

export const PostMeta = styled.div`
  font-size: 0.85rem;
  color: #999;
  margin-top: 1.5rem;
  text-align: right;
`;
