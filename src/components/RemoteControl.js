import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaPowerOff, FaVolumeMute, FaVolumeUp, FaVolumeDown, FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaCircle, FaBars, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

export default function RemoteControl({ onPress, onClose }) {
  const renderNumericPad = () => (
    <NumericPad>
      {[1,2,3,4,5,6,7,8,9].map(num => (
        <PadButton key={num} onClick={() => onPress(String(num))}>
          {num}
        </PadButton>
      ))}
      <PadButton onClick={() => onPress('0')}>0</PadButton>
      <PadButton onClick={() => onPress('*')}>*</PadButton>
      <PadButton onClick={() => onPress('#')}>#</PadButton>
    </NumericPad>
  );

  return (
    <RemoteContainer>
      <TopRow>
        <CloseButton onClick={onClose} aria-label="Close">
          <FaTimes />
        </CloseButton>
      </TopRow>
      
      <ControlRow>
        <IconButton onClick={() => onPress('power')} aria-label="Power">
          <FaPowerOff />
        </IconButton>
        <IconButton onClick={() => onPress('mute')} aria-label="Mute">
          <FaVolumeMute />
        </IconButton>
      </ControlRow>
      
      {renderNumericPad()}
      
      <NavSection>
        <NavButton onClick={() => onPress('up')} aria-label="Up">
          <FaChevronUp />
        </NavButton>
        <MiddleNav>
          <NavButton onClick={() => onPress('left')} aria-label="Left">
            <FaChevronLeft />
          </NavButton>
          <SelectButton onClick={() => onPress('select')} aria-label="Select">
            <FaCircle />
          </SelectButton>
          <NavButton onClick={() => onPress('right')} aria-label="Right">
            <FaChevronRight />
          </NavButton>
        </MiddleNav>
        <NavButton onClick={() => onPress('down')} aria-label="Down">
          <FaChevronDown />
        </NavButton>
      </NavSection>
      
      <VolumeSection>
        <VolumeLabel>VOL</VolumeLabel>
        <VolumeControls>
          <VolumeButton onClick={() => onPress('vol_up')} aria-label="Volume Up">
            <FaVolumeUp />
          </VolumeButton>
          <VolumeButton onClick={() => onPress('vol_down')} aria-label="Volume Down">
            <FaVolumeDown />
          </VolumeButton>
        </VolumeControls>
      </VolumeSection>
      
      <ChannelSection>
        <ChannelLabel>CH</ChannelLabel>
        <ChannelControls>
          <ChannelButton onClick={() => onPress('ch_up')} aria-label="Channel Up">
            <FaChevronUp />
          </ChannelButton>
          <ChannelButton onClick={() => onPress('ch_down')} aria-label="Channel Down">
            <FaChevronDown />
          </ChannelButton>
        </ChannelControls>
      </ChannelSection>
      
      <BottomRow>
        <TextButton onClick={() => onPress('menu')}>
          <FaBars /> Menu
        </TextButton>
        <TextButton onClick={() => onPress('back')}>
          <FaArrowLeft /> Back
        </TextButton>
        <TextButton onClick={() => onPress('info')}>
          <FaInfoCircle /> Info
        </TextButton>
      </BottomRow>
    </RemoteContainer>
  );
}

// Styled-components
const RemoteContainer = styled.div`
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 220px;
  background: rgba(30, 30, 40, 0.95);
  border-radius: 16px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
  user-select: none;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: transparent;
  color: #e0e0ff;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: #ff6b6b;
  }
`;

const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #e0e0ff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(25, 118, 210, 0.5);
    transform: scale(1.1);
  }
`;

const NumericPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  margin-bottom: 15px;
  width: 100%;
`;

const PadButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  color: #e0e0ff;
  border: none;
  border-radius: 8px;
  height: 40px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(25, 118, 210, 0.3);
    transform: translateY(-2px);
  }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

const NavButton = styled(IconButton)`
  width: 45px;
  height: 45px;
  margin: 5px 0;
`;

const MiddleNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
`;

const SelectButton = styled(IconButton)`
  width: 50px;
  height: 50px;
  font-size: 1.3rem;
  background: rgba(25, 118, 210, 0.3);
`;

const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const VolumeLabel = styled.span`
  color: #e0e0ff;
  font-size: 0.9rem;
  font-weight: 600;
`;

const VolumeControls = styled.div`
  display: flex;
  gap: 10px;
`;

const VolumeButton = styled(IconButton)`
  width: 35px;
  height: 35px;
`;

const ChannelSection = styled(VolumeSection)`
  margin-bottom: 15px;
`;

const ChannelLabel = styled(VolumeLabel)``;

const ChannelControls = styled(VolumeControls)``;

const ChannelButton = styled(VolumeButton)``;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
`;

const TextButton = styled.button`
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  color: #e0e0ff;
  border: none;
  border-radius: 6px;
  padding: 8px 5px;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(25, 118, 210, 0.3);
  }
  
  svg {
    margin-bottom: 3px;
    font-size: 0.9rem;
  }
`;