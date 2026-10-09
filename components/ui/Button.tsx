import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 py-3 text-sm tracking-wide transition-colors',
        variant === 'primary' && 'bg-gray-900 text-white hover:bg-gray-800',
        variant === 'outline' && 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
