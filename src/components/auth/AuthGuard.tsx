import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center"
        >
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard