import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import GlobalStyles from './GlobalStyles';
import ProtectedRoute from './components/admin/ProtectedRoute';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Portfolio from './pages/public/Portfolio';
import Services from './pages/public/Services';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

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
        <Route path="/services" element={<Services />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
