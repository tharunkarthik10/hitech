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

    // Start slow metallic shine after 250ms
    const shineTimer = setTimeout(() => {
      setShineActive(true);
    }, 250);

    // Allow slow, majestic metallic glide (3.0s duration) then fade out gracefully
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 700);
    }, 3600);

    return () => {
      clearTimeout(shineTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Hitech Engineering"
    >
      {/* Subtle radial ambient atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,251,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Reduced compact size: 170px - 220px max width */}
      <div className="relative w-full max-w-[170px] sm:max-w-[200px] md:max-w-[220px] px-4 flex items-center justify-center">
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
          className="absolute inset-0 px-4 pointer-events-none overflow-hidden"
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
            className={`absolute top-[-50%] bottom-[-50%] w-[130%] transform -skew-x-25 transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
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
            className={`absolute top-[-50%] bottom-[-50%] w-[45%] transform -skew-x-30 transition-transform duration-[3200ms] ease-[cubic-bezier(0.2,0.8,0.4,1)] delay-100 ${
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
