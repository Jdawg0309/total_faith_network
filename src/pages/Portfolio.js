import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import evelynImg from '../images/evelyn.jpeg';
import winfieldImg from '../images/winfield.jpeg';
import cynthiaImg from '../images/cynthia.jpeg';
import { createGlobalStyle } from 'styled-components';

// Dummy data including video URLs and metadata
const dummyProjects = [
  {
    id: 1,
    title: 'Honorary Evelyn Laporte',
    description: 'A cutting-edge platform that revolutionizes connectivity.',
    thumbnail: evelynImg,
    avatar: evelynImg,
    channel: 'Evelyn Laporte',
    views: '1.2M views',
    timestamp: '2 days ago',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Innovative solution for modern challenges.',
    thumbnail: 'https://via.placeholder.com/400x225?text=Beta',
    avatar: winfieldImg,
    channel: 'Beta Channel',
    views: '850K views',
    timestamp: '1 week ago',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'An immersive experience blending art and technology.',
    thumbnail: 'https://via.placeholder.com/400x225?text=Gamma',
    avatar: cynthiaImg,
    channel: 'Gamma Studios',
    views: '500K views',
    timestamp: '3 weeks ago',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 4,
    title: 'Delta Innovations',
    description: 'Next-gen AI-driven ecosystem overview.',
    thumbnail: 'https://via.placeholder.com/400x225?text=Delta',
    avatar: evelynImg,
    channel: 'Delta Labs',
    views: '2M views',
    timestamp: '1 month ago',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: 5,
    title: 'Omega Project Reveal',
    description: 'Breaking new ground in VR technology.',
    thumbnail: 'https://via.placeholder.com/400x225?text=Omega',
    avatar: winfieldImg,
    channel: 'Omega Works',
    views: '3.5M views',
    timestamp: '2 months ago',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState(dummyProjects[0]);
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20, duration: 800 },
  });

  return (
    <PageContainer>
      <GlobalStyle />

      <Header>
        <SearchBar placeholder="Search" />
      </Header>

      <ContentWrapper>
        <Sidebar>
          <CategoryList>
            <CategoryItem>Trending</CategoryItem>
            <Divider />
            <CategoryItem>Library</CategoryItem>
            <CategoryItem>History</CategoryItem>
            <CategoryItem>Watch Later</CategoryItem>
            <Divider />
            <CategoryItem>Music</CategoryItem>
            <CategoryItem>Podcasts</CategoryItem>
            <CategoryItem>News</CategoryItem>
            <CategoryItem>Lives</CategoryItem>
          </CategoryList>
        </Sidebar>

        <MainContent>
          {/* Featured video player */}
          <PlayerSection style={fadeIn}>
            <VideoTitle>{selectedVideo.title}</VideoTitle>
            <VideoPlayer controls key={selectedVideo.id}>
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Your browser does not support video playback.
            </VideoPlayer>
            <VideoInfo>
              <ChannelAvatar src={selectedVideo.avatar} alt={selectedVideo.channel} />
              <VideoText>
                <VideoTitleBig>{selectedVideo.title}</VideoTitleBig>
                <StatsRow>
                  <Views>{selectedVideo.views}</Views>
                  <Dot>•</Dot>
                  <Timestamp>{selectedVideo.timestamp}</Timestamp>
                </StatsRow>
                <Description>
                  {selectedVideo.description}
                </Description>
              </VideoText>
            </VideoInfo>
          </PlayerSection>

          {/* Video grid */}
          <GridSection style={fadeIn}>
            <GridTitle>Recommended</GridTitle>
            <Grid>
              {dummyProjects.map((project) => (
                <Card
                  key={project.id}
                  onClick={() => setSelectedVideo(project)}
                >
                  <ThumbnailWrapper>
                    <Thumbnail src={project.thumbnail} alt={project.title} />
                  </ThumbnailWrapper>
                  <InfoRow>
                    <SmallAvatar src={project.avatar} alt={project.channel} />
                    <InfoText>
                      <CardTitle>{project.title}</CardTitle>
                      <ChannelNameSmall>{project.channel}</ChannelNameSmall>
                      <StatsSmall>
                        {project.views} • {project.timestamp}
                      </StatsSmall>
                    </InfoText>
                  </InfoRow>
                </Card>
              ))}
            </Grid>
          </GridSection>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Portfolio;

// ========================
// Styled Components
// ========================

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    background: #fff;
    color: #030303;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #ff0000;
  margin-right: 24px;
`;

const SearchBar = styled.input`
  flex-grow: 1;
  max-width: 600px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 0 8px;
  font-size: 14px;
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 24px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 8px;
`;

const Sidebar = styled.div`
  width: 240px;
  border-right: 1px solid #e0e0e0;
  padding: 16px 0;
  height: calc(100vh - 56px);
  position: sticky;
  top: 56px;
  background: #fafafa;
`;

const CategoryList = styled.ul`
  list-style: none;
`;

const CategoryItem = styled.li`
  padding: 12px 24px;
  font-size: 14px;
  color: #030303;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const Divider = styled.hr`
  margin: 8px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  height: calc(100vh - 56px);
`;

const PlayerSection = styled(animated.div)`
  margin-bottom: 32px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  max-height: 500px;
  background: #000;
  border-radius: 4px;
`;

const VideoTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
  color: #030303;
`;

const VideoInfo = styled.div`
  display: flex;
  margin-top: 16px;
`;

const ChannelAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const VideoText = styled.div`
  margin-left: 12px;
  flex-grow: 1;
`;

const VideoTitleBig = styled.h3`
  font-size: 16px;
  margin-bottom: 4px;
  color: #030303;
`;

const ChannelRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const ChannelName = styled.p`
  font-size: 14px;
  color: #606060;
  margin-right: 16px;
`;

const SubscribeButton = styled.button`
  background: #cc0000;
  color: #fff;
  border: none;
  border-radius: 2px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #606060;
`;

const Views = styled.span``;
const Dot = styled.span`
  margin: 0 4px;
`;
const Timestamp = styled.span``;

const Description = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #303030;
`;

const GridSection = styled(animated.div)``;

const GridTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
  color: #030303;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoRow = styled.div`
  display: flex;
  margin-top: 8px;
`;

const SmallAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  margin-left: 8px;
  flex-grow: 1;
`;

const CardTitle = styled.h4`
  font-size: 14px;
  margin: 0;
  color: #030303;
`;

const ChannelNameSmall = styled.p`
  font-size: 12px;
  color: #606060;
  margin: 4px 0 0;
`;

const StatsSmall = styled.p`
  font-size: 12px;
  color: #909090;
  margin: 2px 0 0;
`;
