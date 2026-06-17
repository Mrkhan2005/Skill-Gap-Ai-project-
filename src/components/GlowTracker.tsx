import { useEffect, useRef } from 'react';

/**
 * GlowTracker: A ultra-high-performance delegated cursor tracking component.
 * 
 * Exploding highlights:
 * 1. Global Background Bloom: Translates a soft, non-blocking radial glow layer.
 * 2. Delegated Element Localizer: Tracks elements marked with ".glow-card" or ".glow-button"
 *    and seamlessly injects `--mouse-x` and `--mouse-y` absolute offsets directly into their CSS scope.
 * 3. 120FPS Performance Optimization: Operates updates inside a `requestAnimationFrame` render loop,
 *    bypassing React component state refreshes to isolate CPU triggers.
 */
export default function GlowTracker() {
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const glowEl = glowRef.current;
    if (!glowEl) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isInside = false;

    // Track state variables to handle viewport boundaries
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isInside) {
        isInside = true;
        glowEl.style.opacity = '1';
      }

      // Optimize: Delegated localizer coordinates calculator
      // Look up target selectors up to elements with .glow-card or .glow-button
      const target = e.target as HTMLElement;
      if (target) {
        const glowItem = target.closest('.glow-card, .glow-button') as HTMLElement;
        if (glowItem) {
          const rect = glowItem.getBoundingClientRect();
          const localX = e.clientX - rect.left;
          const localY = e.clientY - rect.top;
          
          glowItem.style.setProperty('--mouse-x', `${localX}px`);
          glowItem.style.setProperty('--mouse-y', `${localY}px`);
        }
      }
    };

    const handleMouseLeaveViewport = () => {
      isInside = false;
      glowEl.style.opacity = '0';
    };

    const handleMouseEnterViewport = () => {
      isInside = true;
      glowEl.style.opacity = '1';
    };

    // Smooth lerp follow loop for high-end cinematic glide feel
    const updateGlowPosition = () => {
      // Linear interpolation to make the bloom glide gracefully instead of snap
      const ease = 0.12; 
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      if (glowEl) {
        glowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      requestAnimationFrame(updateGlowPosition);
    };

    // Bind viewport hooks
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveViewport);
    document.addEventListener('mouseenter', handleMouseEnterViewport);
    
    // Start animation step frame
    const animationFrameId = requestAnimationFrame(updateGlowPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveViewport);
      document.removeEventListener('mouseenter', handleMouseEnterViewport);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={glowRef} 
      className="cursor-glow-radial hidden sm:block" 
      style={{ opacity: 0 }}
    />
  );
}
