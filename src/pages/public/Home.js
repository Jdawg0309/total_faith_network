import React, { useState, useEffect } from 'react';
import { useSpring } from '@react-spring/web';
import introVideo from '../../backend/uploads/videos/intro.mp4';
import TheaterStage from '../../components/homepage/TheaterStage';

import {
  GlobalStyle,
  StarryBackground,
  Star,
  ShootingStar,
  PageContainer
} from '../../styles/HomeStyles';

import {
  FeaturedQuote,
  QuoteText,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  StatsSection,
  StatItem,
  StatNumber,
  StatLabel,
  TestimonialsSection,
  TestimonialCard,
  TestimonialQuote,
  TestimonialAuthor,
  UpcomingEvents,
  EventCard,
  EventDate,
  EventTitle,
  EventLocation,
  CTASection,
  CTAButton,
  Footer,
  FooterText,
  SocialLinks
} from '../../styles/HomeExtrasStyles';

export default function Home() {
  const [shootingStars, setShootingStars] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const starInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStar = {
          id: Date.now(),
          left: `${Math.random() * 20}%`,
          top: `${Math.random() * 20}%`,
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1
        };
        setShootingStars(prev => [...prev, newStar]);
        setTimeout(() => {
          setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
        }, (newStar.duration + newStar.delay) * 1000);
      }
    }, 3000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);

    return () => {
      clearInterval(starInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const curtainAnim = useSpring({
    from: { leftX: 0, rightX: 0 },
    to: { leftX: -100, rightX: 100 },
    config: { friction: 30 },
    delay: 500
  });

  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));

  const features = [
    { icon: '🎥', title: 'Original Films', description: 'Exclusive faith-based movies and documentaries produced in-house.' },
    { icon: '🌍', title: 'Global Reach', description: 'Content broadcast to over 50 countries and millions of viewers.' },
    { icon: '💖', title: 'Community Driven', description: 'Content created by and for our faithful community.' }
  ];

  const stats = [
    { number: '22M+', label: 'Potential Viewers' },
    { number: '150+', label: 'Original Programs' },
    { number: '50+', label: 'Countries Reached' }
  ];

  const testimonials = [
    { quote: "TFNTV's content brings hope and joy into our home.", author: "Sarah from NY" },
    { quote: "A platform that truly uplifts and empowers.", author: "James from Atlanta" },
    { quote: "Quality programming that aligns with our values.", author: "Maria from Texas" }
  ];

  const events = [
    { date: 'AUG 15', title: 'Faith & Media Summit', location: 'New York, NY' },
    { date: 'SEP 3', title: 'Global Prayer Conference', location: 'Online' },
    { date: 'OCT 22', title: 'Total Faith Awards', location: 'Atlanta, GA' }
  ];

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {stars.map(star => <Star key={star.id} {...star} />)}
        {shootingStars.map(star => <ShootingStar key={star.id} {...star} />)}
      </StarryBackground>

      <PageContainer>
        <TheaterStage curtainAnim={curtainAnim} introVideo={introVideo} />

        <FeaturedQuote>
          <QuoteText>"Inspiring Faith, Empowering Lives, Transforming Media."</QuoteText>
        </FeaturedQuote>

        <StatsSection>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsSection>

        <FeaturesSection>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesSection>

        <TestimonialsSection>
          <TestimonialCard>
            <TestimonialQuote>"{testimonials[currentTestimonial].quote}"</TestimonialQuote>
            <TestimonialAuthor>- {testimonials[currentTestimonial].author}</TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsSection>

        <UpcomingEvents>
          {events.map((event, index) => (
            <EventCard key={index}>
              <EventDate>{event.date}</EventDate>
              <EventTitle>{event.title}</EventTitle>
              <EventLocation>{event.location}</EventLocation>
            </EventCard>
          ))}
        </UpcomingEvents>

        <CTASection>
          <CTAButton onClick={() => window.location.href = '/portfolio'}>
            Explore Our Portfolio
          </CTAButton>
        </CTASection>
          
      </PageContainer>
    </>
  );
}
