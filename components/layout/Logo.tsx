import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M3 6h18v12H3V6zm2 2v8h14V8H5z"
              fill="currentColor"
            />
            <path
              d="M7 10h2v4H7v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-display font-bold text-primary leading-tight">
            Curtains & Covers
          </span>
          <span className="text-xs text-gray-600 font-medium tracking-wide">
            PREMIUM SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo; 