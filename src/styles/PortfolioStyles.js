// PortfolioStyles.js
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { animated } from '@react-spring/web';

// Keyframes
export const starTwinkle = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

// Global Styles
export const GlobalStyle = createGlobalStyle`
  *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 100%; height: 100%; font-family: 'Poppins', sans-serif;
    background-color: #0a0a12; color: #e0e0ff;
  }
  @media (max-width: 768px) {
    html, body {
      font-size: 14px;
    }
  }
`;

// Styled Components
export const StarryBackground = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1; overflow: hidden; pointer-events: none;
`;

export const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px; height: ${props => props.size}px;
  background-color: #fff; border-radius: 50%;
  box-shadow: 0 0 ${props => props.size / 2}px rgba(255, 255, 255, 0.5);
  left: ${props => props.left}; top: ${props => props.top};
  animation: ${starTwinkle} ${props => props.duration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

export const PageContainer = styled.div`
  padding: 20px; max-width: 1000px; margin: 0 auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const VideoPlayer = styled.video`
  width: 100%; max-height: 500px; background: #000; border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const VideoTitle = styled.h2`
  font-size: 2rem; margin-bottom: 12px; color: #ffcc00;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const VideoInfo = styled.div`
  display: flex; margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChannelAvatar = styled.img`
  width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 40px; height: 40px;
  }
`;

export const VideoText = styled.div`
  margin-left: 12px; flex-grow: 1;
  @media (max-width: 768px) {
    margin-left: 0; margin-top: 10px;
  }
`;

export const VideoTitleBig = styled.h3`
  font-size: 1.4rem; margin-bottom: 6px; color: #ffcc00;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const StatsRow = styled.div`
  display: flex; align-items: center; font-size: 0.9rem; color: #aaa;
`;

export const Views = styled.span``;
export const Dot = styled.span` margin: 0 6px; `;
export const Timestamp = styled.span``;

export const Description = styled.p`
  margin-top: 10px; font-size: 1rem; color: #ccc;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const GridSection = styled(animated.div)` 
  margin-top: 40px; 
`;

export const GridTitle = styled.h3`
  font-size: 1.5rem; margin-bottom: 16px; color: #ffcc00;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

export const PlayIcon = styled.div`
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; height: 50px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px;
  opacity: 0.7;
  transition: all 0.2s ease;
`;

export const Card = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    ${PlayIcon} {
      transform: scale(1.1);
      opacity: 0.9;
    }
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const ThumbnailWrapper = styled.div`
  width: 100%; padding-top: 56.25%; 
  background: #222; border-radius: 6px; overflow: hidden;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const Thumbnail = styled.img`
  position: absolute; top: 0; left: 0; 
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.3s ease;
`;

export const ThumbnailPlaceholder = styled.div`
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #333, #111);
`;

export const LoadingSpinner = styled.div`
  width: 30px; height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffcc00;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const DurationBadge = styled.div`
  position: absolute; bottom: 8px; right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white; padding: 3px 6px;
  border-radius: 4px; font-size: 0.8rem;
`;

export const InfoRow = styled.div` 
  display: flex; margin-top: 10px; 
`;

export const SmallAvatar = styled.img`
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 32px; height: 32px;
  }
`;

export const InfoText = styled.div`
  margin-left: 10px; flex-grow: 1;
`;

export const CardTitle = styled.h4`
  font-size: 1rem; margin: 0; color: #e0e0ff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ChannelNameSmall = styled.p`
  font-size: 0.85rem; color: #bbb; margin: 4px 0 0;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const StatsSmall = styled.p`
  font-size: 0.8rem; color: #999; margin: 2px 0 0;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;