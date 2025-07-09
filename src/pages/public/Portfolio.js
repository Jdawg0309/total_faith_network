// Portfolio.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

// Import styled components
import {
  GlobalStyle,
  StarryBackground,
  Star,
  PageContainer,
  VideoPlayer,
  VideoTitle,
  VideoInfo,
  ChannelAvatar,
  VideoText,
  VideoTitleBig,
  StatsRow,
  Views,
  Dot,
  Timestamp,
  Description,
  GridSection,
  GridTitle,
  Grid,
  PlayIcon,
  Card,
  ThumbnailWrapper,
  Thumbnail,
  ThumbnailPlaceholder,
  LoadingSpinner,
  DurationBadge,
  InfoRow,
  SmallAvatar,
  InfoText,
  CardTitle,
  ChannelNameSmall,
  StatsSmall
} from '../../styles/PortfolioStyles';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState({});
  const fadeIn = useSpring({ 
    from: { opacity: 0, transform: 'translateY(20px)' }, 
    to: { opacity: 1, transform: 'translateY(0)' }, 
    config: { tension: 200, friction: 20, duration: 800 } 
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/videos?page=1&limit=100`);
        const data = await res.json();
        setProjects(data.videos);
        if (data.videos.length > 0) {
          setSelectedVideo(data.videos[0]);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbnails = {};
      for (const project of projects) {
        try {
          const thumbnail = await getVideoThumbnail(`${API_BASE_URL}${project.video_url}`);
          newThumbnails[project.id] = thumbnail;
        } catch (error) {
          newThumbnails[project.id] = `${API_BASE_URL}${project.avatar_url}`;
        }
      }
      setThumbnails(newThumbnails);
    };
    if (projects.length > 0) generateThumbnails();
  }, [projects]);

  const getVideoThumbnail = (videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 2;
      });
      video.addEventListener('seeked', () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg'));
      });
      video.addEventListener('error', reject);
    });
  };

  if (!selectedVideo) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  const grouped = projects.reduce((acc, video) => {
    const cat = video.category_name || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(video);
    return acc;
  }, {});

  return (
    <>
      <GlobalStyle />
      <StarryBackground>
        {Array.from({ length: 150 }).map((_, i) => (
          <Star 
            key={i} 
            size={Math.random() * 3 + 1} 
            left={`${Math.random() * 100}%`} 
            top={`${Math.random() * 100}%`} 
            delay={Math.random() * 5} 
            duration={Math.random() * 3 + 2} 
          />
        ))}
      </StarryBackground>
      <PageContainer>
        <VideoTitle>{selectedVideo.title}</VideoTitle>
        <VideoPlayer controls key={selectedVideo.id}>
          <source src={`${API_BASE_URL}${selectedVideo.video_url}`} type="video/mp4" />
          Your browser does not support video playback.
        </VideoPlayer>
        <VideoInfo>
          <ChannelAvatar src={`${API_BASE_URL}${selectedVideo.avatar_url}`} alt={selectedVideo.channel} />
          <VideoText>
            <VideoTitleBig>{selectedVideo.title}</VideoTitleBig>
            <StatsRow>
              <Views>{selectedVideo.views || '0 views'}</Views>
              <Dot>•</Dot>
              <Timestamp>{selectedVideo.created_at || 'Recently uploaded'}</Timestamp>
            </StatsRow>
            <Description>{selectedVideo.description}</Description>
          </VideoText>
        </VideoInfo>

        {Object.entries(grouped).map(([category, items]) => (
          <GridSection key={category} style={fadeIn}>
            <GridTitle>{category}</GridTitle>
            <Grid>
              {items.map((project) => (
                <Card key={project.id} onClick={() => setSelectedVideo(project)}>
                  <ThumbnailWrapper>
                    {thumbnails[project.id] ? (
                      <Thumbnail src={thumbnails[project.id]} alt={project.title} />
                    ) : (
                      <ThumbnailPlaceholder><LoadingSpinner /></ThumbnailPlaceholder>
                    )}
                    <PlayIcon>▶</PlayIcon>
                    <DurationBadge>{project.duration || '0:00'}</DurationBadge>
                  </ThumbnailWrapper>
                  <InfoRow>
                    <SmallAvatar src={`${API_BASE_URL}${project.avatar_url}`} alt={project.channel} />
                    <InfoText>
                      <CardTitle>{project.title}</CardTitle>
                      <ChannelNameSmall>{project.channel}</ChannelNameSmall>
                      <StatsSmall>{project.views || '0 views'} • {project.created_at || 'New'}</StatsSmall>
                    </InfoText>
                  </InfoRow>
                </Card>
              ))}
            </Grid>
          </GridSection>
        ))}
      </PageContainer>
    </>
  );
};

export default Portfolio;