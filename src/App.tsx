import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import UpcomingToolsPage from './pages/UpcomingToolsPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/auth/LoginPage';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';
import JSONFormatter from './pages/tools/JSONFormatter';
import AuthGuard from './components/auth/AuthGuard';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <div className="flex min-h-screen flex-col bg-gray-950 text-white">
              <Header />
              <AnimatePresence mode="wait">
                <motion.main 
                  className="flex-grow"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/tools/category/:category" element={<ToolsPage />} />
                    <Route path="/upcoming" element={<UpcomingToolsPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                      <AuthGuard>
                        <UserDashboard />
                      </AuthGuard>
                    } />
                    <Route path="/admin" element={
                      <AuthGuard>
                        <AdminDashboard />
                      </AuthGuard>
                    } />
                    
                    {/* Tool Pages */}
                    <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
                    <Route path="/tools/json-formatter" element={<JSONFormatter />} />
                    
                    {/* Fallback Route */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </motion.main>
              </AnimatePresence>
              <Footer />
            </div>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;