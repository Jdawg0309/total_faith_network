import React from 'react';
import { 
  Sidebar, 
  SidebarSection, 
  SidebarTitle, 
  SidebarLink, 
  CountBadge 
} from '../shared/StyledComponents';

const AdminSidebar = ({ videosCount, currentView, setCurrentView }) => {
  return (
    <Sidebar>
      <SidebarSection>
        <SidebarTitle>Content</SidebarTitle>
        <SidebarLink 
          active={currentView === 'videos'} 
          onClick={() => setCurrentView('videos')}
        >
          <span>Videos</span> 
          <CountBadge>{videosCount}</CountBadge>
        </SidebarLink>
        <SidebarLink 
          active={currentView === 'blog'} 
          onClick={() => setCurrentView('blog')}
        >
          <span>Blog Manager</span>
        </SidebarLink>
      </SidebarSection>

      <SidebarSection>
        <SidebarTitle>Analytics</SidebarTitle>
        <SidebarLink>
          <span>Overview</span>
        </SidebarLink>
        <SidebarLink>
          <span>Audience</span>
        </SidebarLink>
      </SidebarSection>
    </Sidebar>
  );
};

export default AdminSidebar;
