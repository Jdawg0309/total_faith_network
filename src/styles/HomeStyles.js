// styles/HomeStyles.js
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Animations
export const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

export const shootingStar = keyframes`
  0% { transform: translateX(0) translateY(0); opacity: 1; }
  100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
`;

// Global Styles
export const GlobalStyle = createGlobalStyle`
  *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0;
  }
  
  html, body { 
    width: 100%; 
    height: 100%; 
    overflow-x: hidden; 
    font-family: 'Poppins', 'Segoe UI', sans-serif;
    scroll-behavior: smooth;
    background-color: #0a0a12;
    color: #e0e0ff;
  }
`;

// Starry Background
export const StarryBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(to bottom, #0a0a12 0%, #1a1a2e 100%);
`;

export const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 ${props => props.size / 2}px rgba(255, 255, 255, 0.5);
  left: ${props => props.left};
  top: ${props => props.top};
  animation: ${starTwinkle} ${props => props.duration}s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

export const ShootingStar = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
  left: ${props => props.left};
  top: ${props => props.top};
  animation: ${shootingStar} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    transform: rotate(-45deg);
    transform-origin: left;
  }
`;

export const PageContainer = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;
