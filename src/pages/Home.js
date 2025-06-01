import React, { useState, useRef, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import introVideo from '../videos/intro.mp4';
import { useSpring, animated, config as springConfig } from 'react-spring';
import styled, { keyframes } from 'styled-components';
import Footer from '../components/Footer';
import RemoteControl from '../components/RemoteControl';
import FeaturedShows from '../components/FeaturedShows';
import ChannelGuide from '../components/ChannelGuide';
import TheaterStage from '../components/TheaterStage';
import ContentSection from '../components/ContentSection';
import FloatingRemoteToggle from '../components/FloatingRemoteToggle';

// Global reset to prevent horizontal overflow
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { 
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

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [remoteVisible, setRemoteVisible] = useState(true);
  
  // Curtain animation
  const curtainAnim = useSpring({
    from: { leftX: 0, rightX: 0 },
    to: { leftX: -100, rightX: 100 },
    config: { ...springConfig.wobbly, friction: 30 },
    delay: 500,
    onRest: () => setNavVisible(true)
  });

  // Fade in content after curtains open
  const contentAnim = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000, ...springConfig.easeOut },
    delay: 2000,
  });

  const handleRemote = (button) => {
    console.log(`${button} pressed`);
    if (button === 'menu') {
      setNavVisible(!navVisible);
    }
    if (button === 'close') {
      setRemoteVisible(false);
    }
  };
  
  // Create stars for background
  const stars = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));

  return (
    <>
      <GlobalStyle />
      
      {/* Starry background */}
      <StarryBackground>
        {stars.map(star => (
          <Star 
            key={star.id} 
            size={star.size} 
            left={star.left} 
            top={star.top} 
            delay={star.delay}
            duration={star.duration}
          />
        ))}
      </StarryBackground>
      
      <PageContainer>
        <FloatingRemoteToggle 
          isVisible={!remoteVisible} 
          onClick={() => setRemoteVisible(true)} 
        />
        
        <TheaterStage curtainAnim={curtainAnim} introVideo={introVideo} />
        
        <ContentSection anim={contentAnim} />

        <FeaturedSection>
          <SectionTitle>Featured Programs</SectionTitle>
          <FeaturedShows />
        </FeaturedSection>
        
        <ChannelGuideSection>
          <SectionTitle>Channel Guide</SectionTitle>
          <ChannelGuide />
        </ChannelGuideSection>
        
        <OnDemandSection>
          <SectionTitle>On Demand</SectionTitle>
          <OnDemandContent>
            <OnDemandCard>
              <CardIcon>🎬</CardIcon>
              <CardTitle>Original Series</CardTitle>
              <CardText>Exclusive content only on TFN</CardText>
            </OnDemandCard>
            <OnDemandCard>
              <CardIcon>🎙️</CardIcon>
              <CardTitle>Podcasts</CardTitle>
              <CardText>Faith and inspiration on the go</CardText>
            </OnDemandCard>
            <OnDemandCard>
              <CardIcon>📺</CardIcon>
              <CardTitle>Live Events</CardTitle>
              <CardText>Watch our special broadcasts</CardText>
            </OnDemandCard>
          </OnDemandContent>
        </OnDemandSection>
        
        <Footer />
      </PageContainer>
    </>
  );
}

// ========================
// Styled Components
// ========================

const StarryBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: #fff;
  border-radius: 50%;
  left: ${props => props.left};
  top: ${props => props.top};
  opacity: 0.3;
  animation: ${starTwinkle} ${props => props.duration}s infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
`;

const FeaturedSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(to bottom, #0a0a12, #1a1a2e);
  position: relative;
  z-index: 2;
`;

const ChannelGuideSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(to bottom, #1a1a2e, #0a0a12);
  position: relative;
  z-index: 2;
`;

const OnDemandSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(to bottom, #0a0a12, #1a1a2e);
  position: relative;
  z-index: 2;
`;

const OnDemandContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OnDemandCard = styled.div`
  background: rgba(25, 118, 210, 0.1);
  border: 1px solid rgba(25, 118, 210, 0.3);
  border-radius: 16px;
  padding: 2rem;
  width: 300px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(25, 118, 210, 0.2);
    box-shadow: 0 10px 30px rgba(25, 118, 210, 0.2);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4fc3f7;
`;

const CardText = styled.p`
  font-size: 1.1rem;
  color: #e0e0ff;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 3rem;
  background: linear-gradient(90deg, #ffcc00, #ff9800);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ffcc00, #ff9800);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;