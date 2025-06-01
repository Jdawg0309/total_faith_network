import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, useTrail, animated } from '@react-spring/web';
import evelynImg from '../images/evelyn.jpeg';
import winfieldImg from '../images/winfield.jpeg';
import cynthiaImg from '../images/cynthia.jpeg';

const About = () => {
  // Fade-in animation for the entire page
  const pageFade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
  });

  // Trail animation for the leader cards (staggered appearance)
  const leaders = [
    {
      title: 'Honorary Evelyn Laporte',
      description: 'A leader and visionary in faith-based broadcasting and healing-centered advocacy.',
      bio: 'Evelyn Laporte has spent over 20 years building ministries and media projects dedicated to hope, healing, and faith. Her leadership bridges tradition and innovation.',
      image: evelynImg,
    },
    {
      title: 'Marshayne Winfield',
      description: 'A spiritual mentor whose impact continues to guide Total Faith Network’s values.',
      bio: 'A man of great wisdom and grace, Marshayne Winfield is recognized for his role in spiritual education and social outreach programs nationwide.',
      image: winfieldImg,
    },
    {
      title: 'Dr. Cynthia Ashley',
      description: 'CEO of TFNTV and an advocate for communities impacted by autoimmune disease.',
      bio: 'Dr. Ashley’s leadership blends media innovation with healthcare advocacy. She brings strategic vision to TFNTV’s growth and outreach missions.',
      image: cynthiaImg,
    },
  ];

  const [selectedLeader, setSelectedLeader] = useState(null);

  const trail = useTrail(leaders.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 200, friction: 20 },
    delay: 300,
  });

  return (
    <PageContainer style={pageFade}>
      {/* Section: Our Leaders */}
      <Section>
        <SectionTitle>About Our Leaders</SectionTitle>
        <LeaderGrid>
          {trail.map((animation, idx) => {
            const leader = leaders[idx];
            return (
              <LeaderCard key={idx} style={animation} bgcolor="#F9FAFB">
                <LeaderImage src={leader.image} alt={leader.title} />
                <LeaderContent>
                  <LeaderName>{leader.title}</LeaderName>
                  <LeaderDesc>{leader.description}</LeaderDesc>
                  <ViewButton onClick={() => setSelectedLeader(leader)}>
                    View Details
                  </ViewButton>
                </LeaderContent>
              </LeaderCard>
            );
          })}
        </LeaderGrid>

        {selectedLeader && (
          <ModalOverlay onClick={() => setSelectedLeader(null)}>
            <ModalWindow onClick={(e) => e.stopPropagation()}>
              <ModalImage src={selectedLeader.image} alt={selectedLeader.title} />
              <ModalBody>
                <ModalHeader>{selectedLeader.title}</ModalHeader>
                <ModalDesc>
                  <strong>{selectedLeader.description}</strong>
                </ModalDesc>
                <ModalText>{selectedLeader.bio}</ModalText>
                <CloseButton onClick={() => setSelectedLeader(null)}>
                  Close
                </CloseButton>
              </ModalBody>
            </ModalWindow>
          </ModalOverlay>
        )}
      </Section>

      {/* Section: About TFNTV */}
      <Section>
        <SectionTitle>About Total Faith Network (TFNTV)</SectionTitle>
        <AboutText>
          Total Faith Network (TFNTV) is more than a media platform — it’s a mission-driven movement that blends creativity, purpose, and impact. Founded on the belief that faith-based and values-driven content can uplift communities and change lives, TFNTV delivers powerful storytelling through diverse programming that speaks to the heart and spirit of our time.
        </AboutText>
        <AboutText>
          From inspirational films and groundbreaking documentaries to music, talk shows, and community-centered series, our content reflects real people, real purpose, and real transformation. At TFNTV, we don’t just broadcast — we build bridges across cultures, generations, and beliefs.
        </AboutText>
        <AboutText>
          Through our expansive network of partner channels and our growing e-commerce platform, we empower small businesses, ministries, and creators to share their message, grow their influence, and generate meaningful revenue. We’re redefining media as a tool for both expression and economic empowerment.
        </AboutText>
        <AboutText>
          At Total Faith Network, we believe our platform must also be a platform for healing. That’s why we’re deeply committed to Corporate Social Responsibility (CSR) — with a special focus on supporting individuals and families impacted by autoimmune diseases.
        </AboutText>
        <AboutText>
          Autoimmune conditions affect millions of people, often silently and without adequate support or awareness. For every donation we receive, a portion is dedicated directly to funding autoimmune disease research and advocacy. Your contribution doesn't just fuel our mission — it fuels hope, science, and the fight for better treatment and cures.
        </AboutText>
        <AboutText>
          We invite you to stand with us — not only in spreading light through media, but in bringing healing to those who need it most. Every dollar makes a difference. Every act of giving becomes proof that “Everyone wins @ TFN”.
        </AboutText>
      </Section>
    </PageContainer>
  );
};

// === Styled Components ===

const PageContainer = styled(animated.div)`
  padding: 3rem 2rem;
  background: #E3F2FD;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto 4rem;
`;

const SectionTitle = styled.h1`
  color: #0D47A1;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #0D47A1, #1976D2);
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const LeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const LeaderCard = styled(animated.div)`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.bgcolor};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const LeaderContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeaderName = styled.h3`
  margin: 0 0 0.75rem;
  color: #1976D2;
  font-size: 1.4rem;
`;

const LeaderDesc = styled.p`
  color: #1A237E;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ViewButton = styled.button`
  align-self: flex-start;
  padding: 0.7rem 1.4rem;
  background: #0D47A1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s ease;
  &:hover {
    background: #1976D2;
  }
`;

// Modal Styles

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow-y: auto;
  padding: 2rem;
`;

const ModalWindow = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
    max-height: 70vh;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  @media (min-width: 600px) {
    width: 40%;
    height: auto;
    max-height: 70vh;
  }
`;

const ModalBody = styled.div`
  padding: 1.8rem;
  flex: 1;
  overflow-y: auto;
`;

const ModalHeader = styled.h2`
  color: #0D47A1;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const ModalDesc = styled.p`
  color: #1A237E;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  line-height: 1.6;
`;

const ModalText = styled.p`
  color: #1A237E;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  background: #D32F2F;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #B71C1C;
  }
`;

// About TFNTV Text

const AboutText = styled.p`
  color: #1A237E;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: justify;
  line-height: 1.7;
`;

export default About;
