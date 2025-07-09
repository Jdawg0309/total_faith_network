// AboutStyles.js
import styled, { keyframes } from 'styled-components';
import { animated } from '@react-spring/web';

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
export const PageContainer = styled(animated.div)`
  padding: 0;
  background: #0a0a12;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #e0e0ff;
`;

export const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjA0LDAsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=');
    opacity: 0.3;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: #ffcc00;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255,255,255,0.9);
  margin: 1rem 0 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 5rem;
  padding: 0 1.5rem;
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #ffcc00;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ffcc00, #ff9900);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const LeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LeaderCard = styled(animated.div)`
  background: #1e1e2f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

export const LeaderImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

export const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${LeaderCard}:hover & {
    transform: scale(1.05);
  }
`;

export const LeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${LeaderCard}:hover & {
    opacity: 1;
  }
`;

export const LeaderContent = styled.div`
  padding: 1.5rem;
`;

export const LeaderName = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 0.5rem;
  color: #ffcc00;
`;

export const LeaderDesc = styled.p`
  color: #bbb;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

export const ViewButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #ffcc00;
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 204, 0, 0.4);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
`;

export const ModalWindow = styled.div`
  background: #1e1e2f;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    flex-direction: row;
    max-height: 70vh;
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  
  @media (min-width: 768px) {
    width: 40%;
    height: auto;
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
`;

export const ModalHeader = styled.h2`
  font-size: 1.8rem;
  color: #ffcc00;
  margin-bottom: 0.5rem;
`;

export const ModalRole = styled.p`
  color: #bbb;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

export const ModalText = styled.p`
  color: #ddd;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const CloseButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #ff3333;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-top: 1rem;
  
  &:hover {
    background: #ff0000;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
  }
`;

export const SwiperContainer = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 1200px;
  
  .swiper-pagination-bullet {
    background: #bbb;
    opacity: 1;
    
    &-active {
      background: #ffcc00;
    }
  }
  
  .swiper-button-next, 
  .swiper-button-prev {
    color: #ffcc00;
    
    &:after {
      font-size: 1.5rem;
    }
  }
`;

export const AdvisoryImageContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const AdvisoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const TributeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const TributeCard = styled.div`
  background: #1e1e2f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const TributeImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

export const TributeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${TributeCard}:hover & {
    transform: scale(1.05);
  }
`;

export const TributeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${TributeCard}:hover & {
    opacity: 1;
  }
`;

export const TributeQuote = styled.p`
  color: white;
  font-size: 1rem;
  text-align: center;
  font-style: italic;
`;

export const TributeContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const TributeName = styled.h3`
  font-size: 1.3rem;
  color: #ffcc00;
  margin: 0 0 0.5rem;
`;

export const TributeDates = styled.p`
  color: #bbb;
  font-size: 1rem;
  margin: 0;
`;

export const AboutContent = styled.div`
  background: rgba(30, 30, 47, 0.5);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const AboutText = styled.p`
  color: #ddd;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const MissionStatement = styled.section`
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  padding: 4rem 1.5rem;
  text-align: center;
  margin-top: 3rem;
`;

export const MissionTitle = styled.h2`
  font-size: 2rem;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
`;

export const MissionText = styled.p`
  font-size: 1.3rem;
  color: #1a1a2e;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;