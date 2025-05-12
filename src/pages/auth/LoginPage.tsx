import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">Sign in to ToolSuite</h1>
          <p className="text-gray-400">Access all your favorite tools in one place</p>
        </div>
        
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage