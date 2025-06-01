import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import RemoteControl from './RemoteControl';

const DraggableRemote = ({ isVisible, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSidebar, setIsSidebar] = useState(false); // New state for sidebar mode
  const remoteRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  
  // Set initial position
  useEffect(() => {
    if (isVisible && remoteRef.current && !isSidebar) {
      setPosition({
        x: window.innerWidth - remoteRef.current.offsetWidth - 30,
        y: window.innerHeight / 2 - remoteRef.current.offsetHeight / 2
      });
    }
  }, [isVisible, isSidebar]); // Added dependency

  const startDrag = (clientX, clientY) => {
    if (isSidebar) return; // Disable dragging in sidebar mode
    setIsDragging(true);
    dragStartPos.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
    document.body.style.cursor = 'grabbing';
  };

  const handleDrag = (clientX, clientY) => {
    if (!isDragging || isSidebar) return; // Disable dragging in sidebar mode
    
    const newX = clientX - dragStartPos.current.x;
    const newY = clientY - dragStartPos.current.y;
    
    // Get remote dimensions
    const remoteWidth = remoteRef.current?.offsetWidth || 0;
    const remoteHeight = remoteRef.current?.offsetHeight || 0;
    
    // Keep within viewport
    const maxX = window.innerWidth - remoteWidth;
    const maxY = window.innerHeight - remoteHeight;
    
    setPosition({
      x: Math.max(0, Math.min(maxX, newX)),
      y: Math.max(0, Math.min(maxY, newY))
    });
  };

  const endDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
  };

  // Toggle between draggable and sidebar modes
  const handleCloseButton = () => {
    if (isSidebar) {
      onClose(); // Hide completely if in sidebar mode
    } else {
      setIsSidebar(true); // Switch to sidebar mode
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1 || isSidebar) return;
    const touch = e.touches[0];
    handleDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging && !isSidebar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isSidebar]); // Added dependency

  if (!isVisible) return null;

  return (
    <RemoteWrapper
      ref={remoteRef}
      style={{
        // Position differently based on mode
        left: isSidebar ? 'auto' : `${position.x}px`,
        right: isSidebar ? '0' : 'auto',
        top: isSidebar ? '0' : `${position.y}px`,
        height: isSidebar ? '100vh' : 'auto',
        transform: isDragging && !isSidebar ? 'scale(0.95)' : 'scale(1)',
        boxShadow: isSidebar ? 'none' : 
                  (isDragging ? '0 10px 30px rgba(25, 118, 210, 0.5)' 
                             : '0 5px 15px rgba(0, 0, 0, 0.3)'),
        transition: isSidebar ? 'all 0.3s ease' : 
                   (isDragging ? 'none' : 'all 0.3s ease'),
        cursor: isSidebar ? 'default' : (isDragging ? 'grabbing' : 'move'),
        zIndex: 100,
        // Sidebar specific styles
        width: isSidebar ? '300px' : 'auto',
        borderLeft: isSidebar ? '1px solid #ddd' : 'none',
        borderRadius: isSidebar ? '0' : '10px',
        overflowY: isSidebar ? 'auto' : 'hidden',
      }}
      onMouseDown={isSidebar ? undefined : handleMouseDown}
      onTouchStart={isSidebar ? undefined : handleTouchStart}
      $isSidebar={isSidebar} // Pass prop for styled-components
    >
      <RemoteControl 
        onPress={(btn) => console.log(`${btn} pressed`)} 
        onClose={handleCloseButton} // Updated handler
        isSidebar={isSidebar} // Pass mode to remote
      />
    </RemoteWrapper>
  );
};

const RemoteWrapper = styled.div`
  position: fixed;
  user-select: none;
  touch-action: none;
  transition: 
    transform 0.2s ease, 
    box-shadow 0.3s ease,
    width 0.3s ease,
    height 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;
  
  ${props => props.$isSidebar && `
    box-shadow: -5px 0 15px rgba(0,0,0,0.1) !important;
    border-radius: 0 !important;
  `}
`;

export default DraggableRemote;