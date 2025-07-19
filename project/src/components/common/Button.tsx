import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-tunisian-red text-white hover:bg-red-700 focus:ring-tunisian-red',
    secondary: 'bg-tunisian-gold text-white hover:bg-yellow-600 focus:ring-tunisian-gold',
    outline: 'border-2 border-tunisian-red text-tunisian-red hover:bg-tunisian-red hover:text-white focus:ring-tunisian-red',
    ghost: 'text-tunisian-navy hover:bg-gray-100 focus:ring-gray-300'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={iconSize[size]} className="mr-2" />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon size={iconSize[size]} className="ml-2" />
      )}
    </button>
  );
};

export default Button;