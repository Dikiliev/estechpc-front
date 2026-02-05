import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Base: Sharp corners, tracking wide, geometric feel
  const baseStyles = "inline-flex items-center justify-center font-sans uppercase tracking-[0.1em] text-xs font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    // Primary: The brand accent. Used sparingly.
    primary: "bg-estech-accent text-white hover:bg-blue-600 border border-transparent",
    // White: High contrast, used for major CTAs on dark backgrounds
    white: "bg-white text-black hover:bg-gray-200 border border-transparent",
    // Secondary: Dark surface, subtle border
    secondary: "bg-estech-surface text-white border border-estech-border hover:border-gray-500",
    // Outline: Minimal border
    outline: "bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5",
    // Ghost: Text only
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-8 py-3.5",
    lg: "px-10 py-5 text-sm" // Slightly larger text for Hero buttons
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};