import { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
  delay = 200,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  // Position class mapping
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  // Arrow style mapping
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#0e1726]/95 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#0e1726]/95 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#0e1726]/95 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#0e1726]/95 border-y-transparent border-l-transparent',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {/* Tooltip Content Floating Layer */}
      <div
        className={`absolute z-50 pointer-events-none transition-all duration-200 w-52 p-2.5 text-slate-200 text-[11px] leading-relaxed font-semibold rounded-xl bg-slate-950/95 border border-white/10 shadow-xl backdrop-blur-md ${
          positionClasses[position]
        } ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-1 pointer-events-none'
        }`}
      >
        <span>{content}</span>
        
        {/* Tiny clean indicator arrow */}
        <div
          className={`absolute border-[5px] w-0 h-0 ${arrowClasses[position]}`}
        />
      </div>
    </div>
  );
}
