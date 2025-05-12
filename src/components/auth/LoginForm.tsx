import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { signIn, error } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-bold text-white">Welcome Back</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-400">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-400">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-red-900/20 p-3 text-sm text-red-500"
          >
            {error}
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <Link
            to="/reset-password"
            className="text-sm text-purple-500 hover:text-purple-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          icon={<LogIn size={18} />}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-500 hover:text-purple-400">
            Sign up
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm