// pages/Home.js
import React, { useEffect } from 'react';
import introVideo from '../videos/intro.mp4';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

// Blue color palette
const colors = {
  primary: '#1A237E',
  secondary: '#1976D2',
  accent: '#64B5F6',
  background: '#E3F2FD',
  text: '#0D47A1'
};

const Home = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  return (
    <Container style={fadeIn}>
      <VideoSection>
        <Video autoPlay muted loop playsInline>
          <source src={introVideo} type="video/mp4" />
        </Video>
        <VideoOverlay />
      </VideoSection>

      <ContentSection>
        <ContentWrapper>
          <AnimatedHeading>Welcome to Total Faith Network</AnimatedHeading>
          <AnimatedParagraph>
            Empowering communities through faith-driven initiatives and 
            innovative solutions for a better tomorrow.
          </AnimatedParagraph>
          <CTAButton>Explore Our Mission</CTAButton>
        </ContentWrapper>
      </ContentSection>
    </Container>
  );
};

// Styled components with animations
const Container = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const VideoSection = styled.div`
  position: relative;
  min-height: 50vh;
  overflow: hidden;

  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.5s ease;

  ${VideoSection}:hover & {
    transform: scale(1.05);
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${colors.primary}55, ${colors.secondary}55);
`;

const ContentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${colors.background};
  
  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  text-align: center;
`;

const AnimatedHeading = styled(animated.h1)`
  font-size: 2.5rem;
  color: ${colors.text};
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AnimatedParagraph = styled(animated.p)`
  font-size: 1.1rem;
  color: ${colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;

  &:hover {
    background: ${colors.primary};
    transform: scale(1.05);
    box-shadow: 0 8px 20px ${colors.accent}33;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.2rem;
  }
`;

export default Home;