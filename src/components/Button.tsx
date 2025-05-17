import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}) => {
  const baseStyle = 'px-6 py-2 rounded-md transition-colors';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-blue-600',
    secondary: 'bg-secondary text-white hover:bg-green-600',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 