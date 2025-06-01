import React from 'react';
import styled from 'styled-components';
import { FaTv } from 'react-icons/fa';

const FloatingRemoteToggle = ({ isVisible, onClick }) => {
  if (!isVisible) return null;
  
  return (
    <ToggleButton onClick={onClick}>
      <FaTv />
      <Tooltip>Show Remote</Tooltip>
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(25, 118, 210, 0.5);
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: -40px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  
  ${ToggleButton}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default FloatingRemoteToggle;