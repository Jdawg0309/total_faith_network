// pages/Contact.js
import React, { useState } from 'react';
import { FaYoutube, FaInstagram, FaVimeoV, FaTwitter, FaTumblr, FaLinkedin, FaPaperPlane, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const Contact = () => {
  const socialLinks = [
    { platform: 'Total Faith Broadcast', url: 'https://www.youtube.com/@TFNBroadcast', icon: <FaYoutube />, color: '#FF0000' },
    { platform: 'Vimeo', url: 'https://vimeo.com/totalfaithnetwork', icon: <FaVimeoV />, color: '#1AB7EA' },
    { platform: 'Total Faith Podcast', url: 'https://www.youtube.com/@TFNpodcast', icon: <FaYoutube />, color: '#FF0000' },
    { platform: 'Total Live Show', url: 'https://www.youtube.com/@TotalFaithLive', icon: <FaYoutube />, color: '#FF0000' },
    { platform: 'Instagram', url: 'https://www.instagram.com/tfntv_media/', icon: <FaInstagram />, color: '#E1306C' },
    { platform: 'X (Twitter)', url: 'https://x.com/TFNBroadcast', icon: <FaTwitter />, color: '#000000' },
    { platform: 'Tumblr', url: 'https://www.tumblr.com/tfnbroadcast', icon: <FaTumblr />, color: '#35465C' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/drcynthiaoriyomiashley/', icon: <FaLinkedin />, color: '#0077B5' }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, title: 'Email Us', details: 'info@totalfaithnetwork.com', link: 'mailto:info@totalfaithnetwork.com' },
    { icon: <FaPhoneAlt />, title: 'Call Us', details: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: <FaMapMarkerAlt />, title: 'Visit Us', details: '123 Media Lane, Los Angeles, CA 90001', link: 'https://maps.google.com' }
  ];

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 20 }
  });

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'social'

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container style={fadeIn}>
      <HeaderSection>
        <HeaderTitle>Get In Touch</HeaderTitle>
        <HeaderSubtitle>We'd love to hear from you. Connect with us through any of these channels.</HeaderSubtitle>
      </HeaderSection>

      <ContentWrapper>
        <ContactInfoSection>
          {contactInfo.map((item, index) => (
            <ContactCard key={index} href={item.link} target="_blank" rel="noopener noreferrer">
              <ContactIcon>{item.icon}</ContactIcon>
              <ContactDetails>
                <ContactTitle>{item.title}</ContactTitle>
                <ContactText>{item.details}</ContactText>
              </ContactDetails>
            </ContactCard>
          ))}
        </ContactInfoSection>

        <MainContent>
          <TabContainer>
            <TabButton 
              active={activeTab === 'form'} 
              onClick={() => setActiveTab('form')}
            >
              Send Message
            </TabButton>
            <TabButton 
              active={activeTab === 'social'} 
              onClick={() => setActiveTab('social')}
            >
              Our Socials
            </TabButton>
          </TabContainer>

          {activeTab === 'form' ? (
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <InputGroup>
                  <Input 
                    type="text" 
                    name="name" 
                    placeholder=" " 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                  <Label>Your Name</Label>
                </InputGroup>
                
                <InputGroup>
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder=" " 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                  <Label>Your Email</Label>
                </InputGroup>
              </FormRow>
              
              <InputGroup>
                <Input 
                  type="text" 
                  name="subject" 
                  placeholder=" " 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
                <Label>Subject</Label>
              </InputGroup>
              
              <InputGroup>
                <TextArea 
                  name="message" 
                  placeholder=" " 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
                <Label>Your Message</Label>
              </InputGroup>
              
              <SubmitButton type="submit">
                <FaPaperPlane style={{ marginRight: '8px' }} />
                Send Message
              </SubmitButton>
              
              {submitted && <SuccessMsg>Thanks for reaching out! We'll get back to you soon.</SuccessMsg>}
            </Form>
          ) : (
            <SocialGrid>
              {socialLinks.map((link, idx) => (
                <SocialCard 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  bgcolor={link.color}
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(null)}
                  $ishovered={isHovered === idx}
                >
                  <Icon>{link.icon}</Icon>
                  <Platform>{link.platform}</Platform>
                </SocialCard>
              ))}
            </SocialGrid>
          )}
        </MainContent>
      </ContentWrapper>

      <CTASection>
        <CTAWrapper>
          <CTAHeading>Ready to take your brand to the next level?</CTAHeading>
          <CTAText>
            TFN has you covered—whether you need eye-catching commercials and logos, powerful PSAs and intros, seamless editing and post-production, dynamic video promos, strategic public relations and marketing, high-impact promotions, professional videography and photography, standout branding, full TV series production, engaging podcasts, crisp webcasts, live streaming & more.
          </CTAText>
          <CTAButton href="mailto:info@totalfaithnetwork.com">
            Email Us Today
          </CTAButton>
        </CTAWrapper>
      </CTASection>
    </Container>
  );
};

// === Styled Components ===

const Container = styled(animated.div)`
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const HeaderSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 0 1rem;
`;

const HeaderTitle = styled.h1`
  color: #0D47A1;
  font-size: 2.8rem;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #0D47A1, #1976D2);
    border-radius: 2px;
  }
`;

const HeaderSubtitle = styled.p`
  color: #444;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-top: 2.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto 4rem;
  align-items: flex-start;
`;

const ContactInfoSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactCard = styled.a`
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 16px;
  padding: 1.8rem;
  text-decoration: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ContactIcon = styled.div`
  font-size: 1.8rem;
  color: #1976D2;
  margin-right: 1.5rem;
  padding-top: 5px;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h3`
  color: #0D47A1;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const ContactText = styled.p`
  color: #555;
  font-size: 1.05rem;
  line-height: 1.5;
`;

const MainContent = styled.div`
  flex: 2;
  min-width: 300px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: ${props => props.active ? '#fff' : '#f9f9f9'};
  color: ${props => props.active ? '#0D47A1' : '#777'};
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#1976D2' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#fff' : '#f1f7ff'};
    color: ${props => props.active ? '#0D47A1' : '#1976D2'};
  }
`;

const Form = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const InputGroup = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #fafafa;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: #1976D2;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
  
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 12px;
    font-size: 0.8rem;
    background: #fff;
    padding: 0 6px;
    color: #1976D2;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  color: #757575;
  transition: all 0.3s ease;
  pointer-events: none;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  min-height: 160px;
  background: #fafafa;
  resize: vertical;
  transition: all 0.3s ease;
  outline: none;
  font-family: inherit;
  
  &:focus {
    border-color: #1976D2;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
  
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 12px;
    font-size: 0.8rem;
    background: #fff;
    padding: 0 6px;
    color: #1976D2;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 1.8rem;
  background: linear-gradient(135deg, #0D47A1, #1976D2);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(13, 71, 161, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(13, 71, 161, 0.3);
    background: linear-gradient(135deg, #1976D2, #0D47A1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SuccessMsg = styled.p`
  color: #2E7D32;
  text-align: center;
  margin-top: 1rem;
  padding: 0.8rem;
  background: #E8F5E9;
  border-radius: 8px;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.2rem;
  padding: 2rem;
`;

const SocialCard = styled.a`
  display: flex;
  align-items: center;
  background: ${props => props.bgcolor};
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.05));
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
  
  ${props => props.$ishovered && `
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  `}
`;

const Icon = styled.div`
  font-size: 1.8rem;
  color: white;
  margin-right: 1rem;
  z-index: 1;
  transition: transform 0.3s ease;
  
  ${SocialCard}:hover & {
    transform: scale(1.2);
  }
`;

const Platform = styled.span`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  z-index: 1;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

const CTASection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const CTAWrapper = styled.div`
  background: linear-gradient(135deg, #0D47A1, #1976D2);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(13, 71, 161, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #fff, rgba(255,255,255,0.5));
  }
`;

const CTAHeading = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.9);
  line-height: 1.7;
  margin-bottom: 2.2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: white;
  color: #0D47A1;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    background: #f0f8ff;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default Contact;