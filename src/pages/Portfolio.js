import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import evelynImg from '../images/evelyn.jpeg';
import winfield from '../images/winfield.jpeg';
import cynthia from '../images/cynthia.jpeg';


const dummyProjects = [
  {
    title: 'Honorary Evelyn Laporte',
    description: 'A cutting-edge platform that revolutionizes connectivity.',
    image: evelynImg
  },
  {
    title: 'Project Beta',
    description: 'Innovative solution for modern challenges.',
    image: 'https://via.placeholder.com/400x250?text=Beta'
  },
  {
    title: 'Project Gamma',
    description: 'An immersive experience blending art and technology.',
    image: 'https://via.placeholder.com/400x250?text=Gamma'
  },

];

const Portfolio = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20, duration: 800 }
  });

  return (
    <Container style={fadeIn}>
      <Title>Our Portfolio</Title>
      <Grid>
        {dummyProjects.map((project, idx) => (
          <Card key={idx} style={fadeIn} bgcolor="#F9FAFB">
            <CardImage src={project.image} alt={project.title} />
            <CardContent>
              <CardTitle>{project.title}</CardTitle>
              <CardDesc>{project.description}</CardDesc>
              <Button>View Details</Button>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled(animated.div)`
  padding: 4rem 2rem;
  background: #E3F2FD;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #0D47A1;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Card = styled(animated.div)`
  aspect-ratio: 1/1;
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
  flex-shrink: 0;
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

export default Portfolio;
