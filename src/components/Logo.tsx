import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  withSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LogoIcon({ className = 'h-8 w-8', glow = true }: { className?: string; glow?: boolean }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} transition-all duration-300`}
    >
      <defs>
        {/* Brand Gradient for clean, modern visual representation */}
        <linearGradient id="logo-grad-left" x1="20" y1="75" x2="50" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
        </linearGradient>
        <linearGradient id="logo-grad-right" x1="80" y1="75" x2="50" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" /> {/* Violet */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
        </linearGradient>
        
        {/* Subtle glowing shadow filters for high-tech premium aesthetics */}
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Render stylized vector paths based perfectly on the reference upload */}
      <g filter={glow ? "url(#logo-glow)" : undefined}>
        {/* Left Wing Polygon */}
        <path 
          d="M 22 74 L 22 38 L 50 14 L 50 48 Z" 
          stroke="url(#logo-grad-left)" 
          strokeWidth="6" 
          strokeLinejoin="round" 
          strokeLinecap="round" 
          fill="rgba(79, 70, 229, 0.08)"
          className="hover:fill-[rgba(79,70,229,0.18)] transition-all duration-300"
        />
        {/* Right Wing Polygon */}
        <path 
          d="M 50 14 L 78 38 L 78 74 L 50 48 Z" 
          stroke="url(#logo-grad-right)" 
          strokeWidth="6" 
          strokeLinejoin="round" 
          strokeLinecap="round" 
          fill="rgba(6, 182, 212, 0.08)"
          className="hover:fill-[rgba(6,182,212,0.18)] transition-all duration-300"
        />
        {/* Central vertical divider seam */}
        <path 
          d="M 50 14 L 50 48" 
          stroke="#06B6D4" 
          strokeWidth="6.5" 
          strokeLinecap="round"
          className="opacity-90"
        />
      </g>
    </svg>
  );
}

export default function Logo({ className = '', iconOnly = false, withSubtitle = false, size = 'md' }: LogoProps) {
  // Sizing matrix for responsive application sections
  const iconSizeClass = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-24 w-24'
  }[size];

  const textSizeClass = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  }[size];

  const subtextSizeClass = {
    sm: 'text-[7px] tracking-[0.14em]',
    md: 'text-[9px] tracking-[0.18em]',
    lg: 'text-[11px] tracking-[0.22em]',
    xl: 'text-[14px] tracking-[0.25em]'
  }[size];

  if (iconOnly) {
    return <LogoIcon className={iconSizeClass} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon className={iconSizeClass} />
      
      <div className="flex flex-col justify-center select-none">
        <span className={`heading-font font-bold tracking-tight ${textSizeClass} leading-none flex items-baseline gap-0.5`}>
          <span className="text-white">NextMove</span>
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
        </span>
        
        {withSubtitle && (
          <span className={`uppercase font-mono font-bold text-slate-400 block mt-1.5 ${subtextSizeClass} select-none leading-none opacity-80 whitespace-nowrap`}>
            DECIDE WHAT NEXT. ACTION OVER MERE STUDY.
          </span>
        )}
      </div>
    </div>
  );
}
