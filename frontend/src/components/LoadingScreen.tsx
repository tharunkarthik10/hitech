import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shineActive, setShineActive] = useState(false);

  useEffect(() => {
    // Lock scrolling while page resources are loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Start metallic shine
    const shineTimer = setTimeout(() => {
      setShineActive(true);
    }, 150);

    let isPageLoaded = document.readyState === 'complete';
    let minTimeElapsed = false;

    const checkAndDismiss = () => {
      if (isPageLoaded && minTimeElapsed) {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onFinish) onFinish();
        }, 600);
      }
    };

    const handleLoad = () => {
      isPageLoaded = true;
      checkAndDismiss();
    };

    if (!isPageLoaded) {
      window.addEventListener('load', handleLoad);
    }

    // Minimum display time (1.2s) to prevent jarring 5ms visual flashes on cached visits,
    // while ensuring the page never stays artificially blocked.
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkAndDismiss();
    }, 1200);

    // Maximum safety fallback (6s) in case external font/third-party script hangs
    const safetyTimer = setTimeout(() => {
      isPageLoaded = true;
      minTimeElapsed = true;
      checkAndDismiss();
    }, 6000);

    return () => {
      clearTimeout(shineTimer);
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener('load', handleLoad);
      document.body.style.overflow = originalOverflow;
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-600 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Hitech Engineering"
    >
      {/* Subtle radial ambient atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,251,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Ultra-compact minimalist size */}
      <div className="relative w-full max-w-[110px] sm:max-w-[130px] md:max-w-[145px] flex items-center justify-center">
        {/* Base Logo with Subtle Metallic Contrast */}
        <picture className="w-full h-auto block select-none">
          <source srcSet="/hitech-full-logo-optimized.webp" type="image/webp" />
          <img
            src="/hitech-full-logo-optimized.png"
            alt="Hitech Engineering"
            loading="eager"
            decoding="sync"
            className="w-full h-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.07)] filter contrast-[1.06]"
          />
        </picture>

        {/* Realistic Multi-Band Metallic Chrome Light Sweep Mask */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
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
          {/* Primary High-Intensity Chrome Specular Beam */}
          <div
            className={`absolute top-[-50%] bottom-[-50%] w-[130%] transform -skew-x-25 transition-transform duration-[2200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
              shineActive ? 'translate-x-[230%]' : '-translate-x-[180%]'
            }`}
            style={{
              background: `linear-gradient(
                115deg,
                transparent 15%,
                rgba(255, 255, 255, 0.05) 25%,
                rgba(180, 220, 255, 0.35) 35%,
                rgba(255, 255, 255, 0.9) 45%,
                rgba(255, 255, 255, 1) 48%,
                rgba(200, 245, 255, 0.95) 52%,
                rgba(0, 166, 251, 0.6) 58%,
                rgba(255, 255, 255, 0.25) 66%,
                transparent 80%
              )`,
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 18px rgba(0, 166, 251, 0.7))',
              mixBlendMode: 'screen',
            }}
          />

          {/* Secondary Specular Glint Line for Metallic Bevel Refraction */}
          <div
            className={`absolute top-[-50%] bottom-[-50%] w-[45%] transform -skew-x-30 transition-transform duration-[2400ms] ease-[cubic-bezier(0.2,0.8,0.4,1)] delay-75 ${
              shineActive ? 'translate-x-[420%]' : '-translate-x-[220%]'
            }`}
            style={{
              background: 'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.75) 50%, transparent 80%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
