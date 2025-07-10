import React from 'react';
import { 
  Sidebar, 
  SidebarSection, 
  SidebarTitle, 
  SidebarLink, 
  CountBadge 
} from '../shared/StyledComponents';
import styled from 'styled-components';

const Icon = styled.span`
  margin-right: 8px;
  font-size: 1.2rem;
  opacity: 0.8;
`;

const AdminSidebar = ({ videosCount, currentView, setCurrentView }) => {
  return (
    <Sidebar>
      <SidebarSection>
        <SidebarTitle>Content</SidebarTitle>
        <SidebarLink 
          active={currentView === 'videos'} 
          onClick={() => setCurrentView('videos')}
        >
          <Icon>🎬</Icon>
          <span>Videos</span> 
          <CountBadge>{videosCount}</CountBadge>
        </SidebarLink>
        <SidebarLink 
          active={currentView === 'blog'} 
          onClick={() => setCurrentView('blog')}
        >
          <Icon>📝</Icon>
          <span>Blog Manager</span>
        </SidebarLink>
      </SidebarSection>

      <SidebarSection>
        <SidebarTitle>Analytics</SidebarTitle>
        <SidebarLink>
          <Icon>📊</Icon>
          <span>Overview</span>
        </SidebarLink>
        <SidebarLink>
          <Icon>👥</Icon>
          <span>Audience</span>
        </SidebarLink>
      </SidebarSection>
    </Sidebar>
  );
};

export default AdminSidebar;
