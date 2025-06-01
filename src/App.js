import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import GlobalStyles from './GlobalStyles';
import DraggableRemote from './components/DraggableRemote';

// Main App component with router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Component that uses router hooks
function AppContent() {
  const [remoteVisible, setRemoteVisible] = useState(true);
  const location = useLocation();

  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      
      <Footer />
      
      {/* Show remote only on homepage */}
      {location.pathname === '/' && remoteVisible && (
        <DraggableRemote 
          isVisible={remoteVisible} 
          onClose={() => setRemoteVisible(false)} 
        />
      )}
    </div>
  );
}

export default App;