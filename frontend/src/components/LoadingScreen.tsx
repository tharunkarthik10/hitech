import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shineActive, setShineActive] = useState(false);

  useEffect(() => {
    // Lock scrolling during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Trigger metallic shine sweep shortly after mount
    const shineTimer = setTimeout(() => {
      setShineActive(true);
    }, 200);

    // Complete loading after 1.8 seconds of smooth showcase
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 500);
    }, 1800);

    return () => {
      clearTimeout(shineTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-all duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading Hitech Engineering"
    >
      {/* Subtle radial ambient atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,251,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Pure Logo & Typography Presentation */}
      <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] px-6 flex items-center justify-center">
        {/* Base Crystal-Clear HD Logo */}
        <picture className="w-full h-auto block select-none">
          <source srcSet="/hitech-full-logo-optimized.webp" type="image/webp" />
          <img
            src="/hitech-full-logo-optimized.png"
            alt="Hitech Engineering"
            loading="eager"
            decoding="sync"
            className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
          />
        </picture>

        {/* Precision Metallic Light-Sweep Mask Layer */}
        <div
          className="absolute inset-0 px-6 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'url(/hitech-full-logo-optimized.webp)',
            WebkitMaskImage: 'url(/hitech-full-logo-optimized.webp)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        >
          <div
            className={`absolute top-0 bottom-0 w-[80%] bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-25 transition-transform duration-1000 ease-in-out ${
              shineActive ? 'translate-x-[250%]' : '-translate-x-[150%]'
            }`}
            style={{
              filter: 'drop-shadow(0 0 12px rgba(0, 166, 251, 0.6))',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
