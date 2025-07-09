import React, { useState } from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import styles from AboutStyles.js
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionTitle,
  LeaderGrid,
  LeaderCard,
  LeaderImageContainer,
  LeaderImage,
  LeaderOverlay,
  ViewButton,
  LeaderContent,
  LeaderName,
  LeaderDesc,
  ModalOverlay,
  ModalWindow,
  ModalImage,
  ModalBody,
  ModalHeader,
  ModalRole,
  ModalText,
  CloseButton,
  SwiperContainer,
  AdvisoryImageContainer,
  AdvisoryImage,
  TributeGrid,
  TributeCard,
  TributeImageContainer,
  TributeImage,
  TributeOverlay,
  TributeQuote,
  TributeContent,
  TributeName,
  TributeDates,
  AboutContent,
  AboutText,
  MissionStatement,
  MissionTitle,
  MissionText
} from '../../styles/AboutStyles';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const leaders = [
  {
    title: 'Honorable Evelyn Laporte',
    description: 'Newly appointed CEO of TFNTV, bringing a wealth of judicial and leadership experience.',
    bio: `Honorable Evelyn Laporte has been appointed as the new Chief Executive Officer of TFNTV, effective August 14, 2024. She succeeds Dr. Cynthia Ashley, who served over 15 years with distinction.

Prior to joining TFNTV, Hon. Laporte was elected for two terms as Supreme Court Justice in Kings County, New York, serving on the bench for over 18 years. She is renowned for her strategic vision, integrity, and leadership acumen.

"Hon. Laporte is the right leader for TFNTV as we embark on our next chapter of growth," said Marshayne Winfield, TFNTV COO & Executive Producer. "With her extensive experience and innovative mindset, we are confident she will propel our mission forward."

Expressing excitement about her role, Hon. Laporte stated, "As I enter the market as an entrepreneur, I’m deeply honored to lead Total Faith Network TV & Media Enterprises, Inc. I am committed to building on our legacy and achieving our ambitious goals."

TFNTV reaches over 22 million potential cable subscribers and more than 66 million online viewers via platforms like ROKU. The network produces award-winning content that inspires, empowers, educates, and informs.

She is also the creator of "Confidence with Attitude," a coaching program helping young attorneys boost confidence and fast-track their careers. Known for her excellent communication, leadership, and organizational skills, Hon. Laporte is a disciplined, passionate visionary with a deep love for community impact.`,
    image: `${BASE_URL}/uploads/images/evelyn.jpeg`
  },
  {
    title: 'Marshayne Winfield aka Sha-Vision',
    description: 'A multi-platinum published recording artist and influential leader in media and arts.',
    bio: `Marshayne L.H. Winfield, known professionally as Sha-Vision, is a multi-platinum published recording artist with over two decades in the music industry. His lyrical talent led to collaborations with icons like Mary J. Blige and Pharrell, including a performance on VH1 Live in Europe.

In 2002, he launched MLHW Publishing, and in 2004, he pioneered the "Battlegroundz" mixtape series—an underground hip-hop platform. His editorial career includes working as Managing Editor for F.E.D.S. Magazine.

Currently, Sha-Vision serves as Executive VP, COO, and Senior Director of Content Development for TFNTV Media Enterprises, Inc. He is also the Executive Director of the ROCMAN Foundation and co-executive producer of the Total Faith Awards & Tribute to the African Diaspora.

His latest creative work includes his book *The Realm of Reality*, which challenges readers to explore thought, existence, and perception. A father of five, Sha-Vision continues to inspire through music, media, literature, and speaking engagements.

For inquiries or bookings, contact: legacbuilders933@gmail.com`,
    image: `${BASE_URL}/uploads/images/winfield.jpeg`
  },
  {
    title: 'Dr. Cynthia O. Ashley',
    description: 'Founder of TFNTV and a global advocate for media literacy and community empowerment.',
    bio: `Dr. Cynthia O. Ashley is a pioneering media literacy educator, ordained minister, and award-winning television host with over 25 years of service in media, ministry, and public leadership. She holds a Doctorate in Media Literacy Pedagogy and Research, along with degrees in divinity, communication, and law.

As founder and President of Total Faith Network, a Minority Business Enterprise and a woman's minority enterprise, she is the executive producers of Total Faith Awards Gala Benefit, the African Diaspora Tribute Image Awards, and *SASSY Women Who Win*, Choosen Handmaiden Retreat, Prayer Meditation and Surrender Prophetic World Summit, Intl' Leadership empowerment and Prophetic Summit.

In 2018, she made history as the first Black woman to register with the NY State Board of Elections to run for Mayor of Yonkers, later transitioning her candidacy to County Legislator. She is also a survivor of traumatic brain injury and advocates for healing and transformation.

Internationally, Dr. Ashley serves as Executive Board Chair of ROCMAN Foundation (USA), Director of Diaspora Affairs for the Pan African Chambers of Commerce (South Africa), and advisor to Ambassadors for Africa (Nigeria).

She has received numerous honors, including from Senator Andrea Stewart-Cousins, Congressman Eliot Engel, and Mayor Mike Spano. Her events draw dignitaries such as Queen Mother Dr. Dòris Blakely and HRM Dr. Olori Temitope Enitan Ogunwusi.

Through her ministries—Cyndi Ashley Network International (CAN-I), PMS: Paradigm Mind Shift. Ashley continues to inspire transformation with a powerful blend of faith, media, and advocacy.`,
    image: `${BASE_URL}/uploads/images/cynthia.jpeg`
  }
];


const advisoryImages = [
  `${BASE_URL}/uploads/images/Advisory1.jpg`,
  `${BASE_URL}/uploads/images/Advisory2.jpg`,
  `${BASE_URL}/uploads/images/Advisory3.jpg`,
  `${BASE_URL}/uploads/images/Advisory4.jpg`,
  `${BASE_URL}/uploads/images/Advisory5.jpg`,
  `${BASE_URL}/uploads/images/Advisory6.jpg`,
  `${BASE_URL}/uploads/images/Advisory7.jpg`,
  `${BASE_URL}/uploads/images/Advisory8.jpg`,
  `${BASE_URL}/uploads/images/Advisory9.jpg`
];

const tribute1 = `${BASE_URL}/uploads/images/IMG_3361.jpeg`;
const tribute2 = `${BASE_URL}/uploads/images/IMG_3362.jpeg`;
const tribute3 = `${BASE_URL}/uploads/images/IMG_3363.jpeg`;




const About = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const pageFade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 800 } });
  const trail = useTrail(leaders.length, { 
    from: { opacity: 0, transform: 'translateY(20px)' }, 
    to: { opacity: 1, transform: 'translateY(0px)' }, 
    config: { mass: 1, tension: 200, friction: 20 }, 
    delay: 500 
  });

  return (
    <PageContainer style={pageFade}>
      <HeroSection>
        <HeroTitle>Our Leadership Team</HeroTitle>
        <HeroSubtitle>Guiding TFNTV with Vision and Purpose</HeroSubtitle>
      </HeroSection>

      <Section>
        <SectionTitle>Executive Leadership</SectionTitle>
        <LeaderGrid>
          {trail.map((animation, idx) => {
            const leader = leaders[idx];
            return (
              <LeaderCard key={idx} style={animation}>
                <LeaderImageContainer>
                  <LeaderImage src={leader.image} alt={leader.title} />
                  <LeaderOverlay>
                    <ViewButton onClick={() => setSelectedLeader(leader)}>View Profile</ViewButton>
                  </LeaderOverlay>
                </LeaderImageContainer>
                <LeaderContent>
                  <LeaderName>{leader.title}</LeaderName>
                  <LeaderDesc>{leader.description}</LeaderDesc>
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
                <ModalRole>{selectedLeader.description}</ModalRole>
                <ModalText>{selectedLeader.bio}</ModalText>
                <CloseButton onClick={() => setSelectedLeader(null)}>Close</CloseButton>
              </ModalBody>
            </ModalWindow>
          </ModalOverlay>
        )}
      </Section>

      <Section>
        <SectionTitle>Advisory Board</SectionTitle>
        <SwiperContainer>
          <Swiper 
            modules={[Navigation, Pagination, Autoplay]} 
            spaceBetween={30} 
            slidesPerView={1} 
            navigation 
            pagination={{ clickable: true }} 
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {advisoryImages.map((img, index) => (
              <SwiperSlide key={index}>
                <AdvisoryImageContainer>
                  <AdvisoryImage src={img} alt={`Advisory Member ${index + 1}`} />
                </AdvisoryImageContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
      </Section>

      <Section>
        <SectionTitle>In Loving Memory</SectionTitle>
        <TributeGrid>
          <TributeCard>
            <TributeImageContainer>
              <TributeImage src={tribute2} alt="Dr. Lane Rolling" />
              <TributeOverlay>
                <TributeQuote>"Their legacy continues to inspire us every day."</TributeQuote>
              </TributeOverlay>
            </TributeImageContainer>
            <TributeContent>
              <TributeName>Dr. Lane Rolling</TributeName>
              <TributeDates>1964 – 2023</TributeDates>
            </TributeContent>
          </TributeCard>
          <TributeCard>
            <TributeImageContainer>
              <TributeImage src={tribute1} alt="Vivian Ashley Smith" />
              <TributeOverlay>
                <TributeQuote>"A life of service and love remembered forever."</TributeQuote>
              </TributeOverlay>
            </TributeImageContainer>
            <TributeContent>
              <TributeName>Queen Mother Vivian Ashley Smith-Militano</TributeName>
              <TributeDates>1944 – 2017</TributeDates>
            </TributeContent>
          </TributeCard>
          <TributeCard>
            <TributeImageContainer>
              <TributeImage src={tribute3} alt="Gene 'Groove' Allen" />
              <TributeOverlay>
                <TributeQuote>"The music may have stopped, but the melody lingers on."</TributeQuote>
              </TributeOverlay>
            </TributeImageContainer>
            <TributeContent>
              <TributeName>Gene "Groove" Allen</TributeName>
              <TributeDates>1962 – 2025</TributeDates>
            </TributeContent>
          </TributeCard>
        </TributeGrid>
      </Section>

      <Section>
        <SectionTitle>About Total Faith Network (TFNTV)</SectionTitle>
        <AboutContent>
                    <AboutText>
            Total Faith Network (TFNTV) is more than a media platform — it's a mission-driven movement that blends creativity, purpose, and impact. Founded on the belief that faith-based and values-driven content can uplift communities and change lives, TFNTV delivers powerful storytelling through diverse programming that speaks to the heart and spirit of our time.
          </AboutText>
          <AboutText>
            From inspirational films and groundbreaking documentaries to music, talk shows, and community-centered series, our content reflects real people, real purpose, and real transformation. At TFNTV, we don't just broadcast — we build bridges across cultures, generations, and beliefs.
          </AboutText>
          <AboutText>
            Through our expansive network of partner channels and our growing e-commerce platform, we empower small businesses, ministries, and creators to share their message, grow their influence, and generate meaningful revenue. We're redefining media as a tool for both expression and economic empowerment.
          </AboutText>
          <AboutText>
            At Total Faith Network, we believe our platform must also be a platform for healing. That's why we're deeply committed to Corporate Social Responsibility (CSR) — with a special focus on supporting individuals and families impacted by autoimmune diseases.
          </AboutText>
          <AboutText>
            Autoimmune conditions affect millions of people, often silently and without adequate support or awareness. For every donation we receive, a portion is dedicated directly to funding autoimmune disease research and advocacy. Your contribution doesn't just fuel our mission — it fuels hope, science, and the fight for better treatment and cures.
          </AboutText>
          <AboutText>
            We invite you to stand with us — not only in spreading light through media, but in bringing healing to those who need it most. Every dollar makes a difference. Every act of giving becomes proof that "Everyone wins @ TFN".
          </AboutText>
        </AboutContent>
      </Section>

      <MissionStatement>
        <MissionTitle>Our Mission</MissionTitle>
        <MissionText>
          To empower, educate, and inspire through faith-based media that transforms lives and communities worldwide.
        </MissionText>
      </MissionStatement>
    </PageContainer>
  );
};

export default About;
