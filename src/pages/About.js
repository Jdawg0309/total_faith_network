
      import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import evelynImg from '../images/evelyn.jpeg';
import winfieldImg from '../images/winfield.jpeg';
import cynthiaImg from '../images/cynthia.jpeg';

const About = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  const [selectedLeader, setSelectedLeader] = useState(null);

  const leaders = [
  {
    title: 'Honorary Evelyn Laporte',
    description: 'A leader and visionary in faith-based broadcasting and healing-centered advocacy.',
    bio: 'Evelyn Laporte has spent over 20 years building ministries and media projects dedicated to hope, healing, and faith. Her leadership bridges tradition and innovation.',
    image: evelynImg
  },
  {
    title: 'Marshayne Winfield',
    description: 'A spiritual mentor whose impact continues to guide Total Faith Network’s values.',
    bio: 'A man of great wisdom and grace, Marshayne Winfield is recognized for his role in spiritual education and social outreach programs nationwide.',
    image: winfieldImg
  },
  {
    title: 'Dr. Cynthia Ashley',
    description: 'CEO of TFNTV and an advocate for communities impacted by autoimmune disease.',
    bio: 'Dr. Ashley’s leadership blends media innovation with healthcare advocacy. She brings strategic vision to TFNTV’s growth and outreach missions.',
    image: cynthiaImg
  }
];

  return (
    <Container style={fadeIn}>
      <Title>About Our Leaders</Title>
      <Grid>
        {leaders.map((leader, idx) => (
          <Card key={idx} bgcolor="#F9FAFB">
            <CardImage src={leader.image} alt={leader.title} />
            <CardContent>
              <CardTitle>{leader.title}</CardTitle>
              <CardDesc>{leader.description}</CardDesc>
              <Button onClick={() => setSelectedLeader(leader)}>View Details</Button>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {selectedLeader && (
      <ModalOverlay onClick={() => setSelectedLeader(null)}>
        <Modal onClick={e => e.stopPropagation()}>
          <ModalImage src={selectedLeader.image} alt={selectedLeader.title} />
          <ModalContent>
            <h2>{selectedLeader.title}</h2>
            <p><strong>{selectedLeader.description}</strong></p>
            <p>{selectedLeader.bio}</p>
            <CloseButton onClick={() => setSelectedLeader(null)}>Close</CloseButton>
          </ModalContent>
        </Modal>
      </ModalOverlay>
    )}


            <Content>
        <Title>About Total Faith Network (TFNTV)</Title>
        <Paragraph>
          Total Faith Network (TFNTV) is more than a media platform — it’s a mission-driven movement that blends creativity, purpose, and impact. Founded on the belief that faith-based and values-driven content can uplift communities and change lives, TFNTV delivers powerful storytelling through diverse programming that speaks to the heart and spirit of our time.
        </Paragraph>
        <Paragraph>
          From inspirational films and groundbreaking documentaries to music, talk shows, and community-centered series, our content reflects real people, real purpose, and real transformation. At TFNTV, we don’t just broadcast — we build bridges across cultures, generations, and beliefs.
        </Paragraph>
        <Paragraph>
          Through our expansive network of partner channels and our growing e-commerce platform, we empower small businesses, ministries, and creators to share their message, grow their influence, and generate meaningful revenue. We’re redefining media as a tool for both expression and economic empowerment.
        </Paragraph>
        <Paragraph>
          At Total Faith Network, we believe our platform must also be a platform for healing. That’s why we’re deeply committed to Corporate Social Responsibility (CSR) — with a special focus on supporting individuals and families impacted by autoimmune diseases.
        </Paragraph>
        <Paragraph>
          Autoimmune conditions affect millions of people, often silently and without adequate support or awareness. For every donation we receive, a portion is dedicated directly to funding autoimmune disease research and advocacy. Your contribution doesn't just fuel our mission — it fuels hope, science, and the fight for better treatment and cures.
        </Paragraph>
        <Paragraph>
          We invite you to stand with us — not only in spreading light through media, but in bringing healing to those who need it most. Every dollar makes a difference. Every act of giving becomes proof that “Everyone wins @ TFN”.
        </Paragraph>
      </Content>

    </Container>
  );
};

// === Styled Components ===

const Container = styled(animated.div)`
  padding: 4rem 2rem;
  background: #E3F2FD;
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
`;

const Title = styled.h1`
  color: #0D47A1;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  color: #0D47A1;
  text-align: center;
  font-size: 2rem;
  margin: 4rem 0 2rem;
`;

const Paragraph = styled.p`
  color: #1A237E;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: justify;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 961px) and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(animated.div)`
  display: flex;
  flex-direction: column;
  background: ${props => props.bgcolor};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.75rem;
  color: #1976D2;
  font-size: 1.25rem;
`;

const CardDesc = styled.p`
  color: #1A237E;
  font-size: 1rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #0D47A1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #1976D2;
  }
`;

// === Modal Styles ===
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow-y: auto;  // Add scrolling for tall content
  padding: 2rem;     // Add breathing room around modal
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;  // Prevent modal from exceeding viewport height
  overflow: hidden;   // Keep border-radius clipping
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    max-height: 70vh; // Adjust for desktop
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 250px;      // Fixed height for mobile
  object-fit: cover;  // Ensure images fill space without distortion

  @media (min-width: 600px) {
    width: 40%;
    height: auto;     // Reset height for desktop
    max-height: 70vh; // Match modal height
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  flex: 1;
  overflow-y: auto;  // Enable scrolling for long content

  h2 {
    color: #0D47A1;
    margin-bottom: 1rem;
  }

  p {
    color: #1A237E;
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const CloseButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1.2rem;
  background: #D32F2F;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #B71C1C;
  }
`;

export default About;
