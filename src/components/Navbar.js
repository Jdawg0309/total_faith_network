// components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';

// Color variables
const NAV_BG       = '#1A1A1A';
const TEXT_PRIMARY = '#E0E0FF';
// changed active link color from green → accent blue
const TEXT_ACTIVE  = '#1976D2';
const ACCENT       = '#1976D2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Total Faith Network</Logo>

        <DesktopMenu>
          <NavItem to="/" $active={location.pathname === '/'}>
            Home
          </NavItem>
          <NavItem to="/about" $active={location.pathname === '/about'}>
            About
          </NavItem>
          <NavItem to="/portfolio" $active={location.pathname === '/portfolio'}>
            Portfolio
          </NavItem>
          <NavItem to="/contact" $active={location.pathname === '/contact'}>
            Contact
          </NavItem>
        </DesktopMenu>

        <MobileToggle onClick={handleToggle}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileToggle>
      </NavContainer>

      <MobileMenu $isOpen={isOpen}>
        <NavItem to="/" mobile $active={location.pathname === '/'} onClick={handleToggle}>
          Home
        </NavItem>
        <NavItem to="/about" mobile $active={location.pathname === '/about'} onClick={handleToggle}>
          About
        </NavItem>
        <NavItem to="/portfolio" mobile $active={location.pathname === '/portfolio'} onClick={handleToggle}>
          Portfolio
        </NavItem>
        <NavItem to="/contact" mobile $active={location.pathname === '/contact'} onClick={handleToggle}>
          Contact
        </NavItem>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;

// === Styled Components ===

const Nav = styled.nav`
  background-color: ${NAV_BG};
  color: ${TEXT_PRIMARY};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: ${TEXT_PRIMARY};

  &:hover {
    color: ${ACCENT};
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  margin-left: ${props => (props.mobile ? '0' : '2rem')};
  padding: ${props => (props.mobile ? '1rem 0' : '0')};
  text-decoration: none;
  color: ${props => (props.$active ? TEXT_ACTIVE : TEXT_PRIMARY)};
  font-weight: ${props => (props.$active ? '600' : '400')};
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: ${ACCENT};
    background-color: ${props => (props.mobile ? 'rgba(255,255,255,0.05)' : 'transparent')};
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${TEXT_PRIMARY};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  background-color: ${NAV_BG};
  border-top: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
  }
`;
