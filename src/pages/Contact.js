// pages/Contact.js
import React, { useState } from 'react';
import { FaYoutube, FaInstagram, FaVimeoV, FaTwitter, FaTumblr, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const Contact = () => {
  const socialLinks = [
    {
      platform: 'Total Faith Broadcast',
      url: 'https://www.youtube.com/@TotalBroadcast',
      icon: <FaYoutube />,
      color: '#FF0000'
    },
    {
      platform: 'Vimeo',
      url: 'https://vimeo.com/totalfaithnetwork',
      icon: <FaVimeoV />,
      color: '#1AB7EA'
    },
    {
      platform: 'Total Faith Podcast',
      url: 'https://www.instagram.com/TFNpodcast/',
      icon: <FaInstagram />,
      color: '#E1306C'
    },
    {
      platform: 'Total Faith Network',
      url: 'https://vimeo.com/totalfaithnetwork',
      icon: <FaYoutube />,
      color: '#FF0000'
    },
    { 
      platform: 'YouTube Total Faith Network Live',
      url: 'https://www.youtube.com/@TotalFaithLive',
      icon: <FaYoutube />,
      color: '#FF0000'
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/tfntv_media/',
      icon: <FaInstagram />,
      color: '#E1306C'
    },
    {
      platform: 'X (Twitter)',
      url: 'https://x.com/TFNBroadcast',
      icon: <FaTwitter />,
      color: '#000000'
    },
    {
      platform: 'Tumblr',
      url: 'https://www.tumblr.com/tfnbroadcast',
      icon: <FaTumblr />,
      color: '#35465C'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/drcynthiaoriyomiashley/',
      icon: <FaLinkedin />,
      color: '#0077B5'
    }
  ];

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 20 }
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container style={fadeIn}>
            <Title>Send Us a Message</Title>
            
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <Input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <TextArea 
          name="message" 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
        <SubmitButton type="submit">Send Message</SubmitButton>
        {submitted && <SuccessMsg>Thanks for reaching out! We'll get back to you soon.</SuccessMsg>}
      </Form>
      <Title>Connect With Us</Title>
      <Grid>
        {socialLinks.map((link, index) => (
          <SocialCard 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            bgcolor={link.color}
          >
            <Icon>{link.icon}</Icon>
            <Platform>{link.platform}</Platform>
          </SocialCard>
        ))}
      </Grid>
    </Container>
  );
};

// === Styled Components ===

const Container = styled(animated.div)`
  padding: 4rem 2rem;
  background: #E3F2FD;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #0D47A1;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto 4rem;
`;

const SocialCard = styled.a`
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgcolor};
  border-radius: 16px;
  padding: 2rem;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
`;

const Platform = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #0D47A1;
  margin: 1.5rem;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 4rem;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #90CAF9;
  border-radius: 8px;
  background: white;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #90CAF9;
  border-radius: 8px;
  min-height: 150px;
  background: white;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #0D47A1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1976D2;
  }
`;

const SuccessMsg = styled.p`
  color: green;
  text-align: center;
  margin-top: 1rem;
`;

export default Contact;
