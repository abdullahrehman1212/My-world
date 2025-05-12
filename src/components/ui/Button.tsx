import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon,
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-700/50',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-700/50',
    outline: 'border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white disabled:text-gray-500',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white disabled:text-gray-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-700/50',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;