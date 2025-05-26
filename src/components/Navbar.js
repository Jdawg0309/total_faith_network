// components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define all style objects here
  const navStyles = {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '1rem',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const desktopMenuStyles = {
    display: 'flex',
    alignItems: 'center',
    '@media (maxWidth: 768px)': {
      display: 'none',
    },
  };

  const logoStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  };

  const linkStyles = {
    marginLeft: '2rem',
    textDecoration: 'none',
    color: 'white',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#fff', // Change to a different color (e.g., orange)
    },
  };

  const mobileButtonStyles = {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    '@media (maxWidth: 768px)': {
      display: 'block',
    },
  };

  const mobileMenuStyles = {
    display: 'none',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    '@media (maxWidth: 768px)': {
      display: isOpen ? 'flex' : 'none',
    },
  };

  const mobileLinkStyles = {
    padding: '1rem',
    textDecoration: 'none',
    color: 'white',
    ':hover': {
      backgroundColor: '#3a3a3a',
    },
  };

  // Modified NavLink component with props
  const NavLink = ({ to, children, mobile }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        style={{
          ...(mobile ? mobileLinkStyles : linkStyles),
          color: isActive ? '#4CAF50' : 'white'
        }}
        onClick={() => mobile && setIsOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <Link to="/" style={logoStyles}>
          Total Faith Network
        </Link>

        <div style={desktopMenuStyles}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <button
          style={mobileButtonStyles}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div style={mobileMenuStyles}>
          <NavLink to="/" mobile>Home</NavLink>
          <NavLink to="/about" mobile>About</NavLink>
          <NavLink to="/portfolio" mobile>Portfolio</NavLink>
          <NavLink to="/contact" mobile>Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;