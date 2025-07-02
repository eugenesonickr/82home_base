import React, { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { keyboardHelpers } from '../../utils/accessibility';

interface AccessibleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  motionProps?: MotionProps;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  motionProps,
  ariaLabel,
  ariaDescribedBy,
  disabled,
  className = '',
  ...props
}, ref) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-300 shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-300 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-300',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-300'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3'
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    
    if (keyboardHelpers.isEnterOrSpace(event)) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const MotionButton = motion.button;

  return (
    <MotionButton
      ref={ref}
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      whileHover={{ scale: (loading || disabled) ? 1 : 1.02 }}
      whileTap={{ scale: (loading || disabled) ? 1 : 0.98 }}
      {...motionProps}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && leftIcon && leftIcon}
      {children}
      {!loading && rightIcon && rightIcon}
    </MotionButton>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;