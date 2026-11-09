import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock scrolling while page resources are loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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

    // Minimum display time (1.0s) for a smooth, premium glance without artificial delay
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkAndDismiss();
    }, 1000);

    // Maximum safety fallback (6s) in case an external font/analytics script hangs
    const safetyTimer = setTimeout(() => {
      isPageLoaded = true;
      minTimeElapsed = true;
      checkAndDismiss();
    }, 6000);

    return () => {
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
      <style>{`
        @keyframes metallicSweepInfinite {
          0% {
            transform: translateX(-190%) skewX(-25deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(240%) skewX(-25deg);
            opacity: 0;
          }
        }

        @keyframes metallicGlintInfinite {
          0% {
            transform: translateX(-240%) skewX(-30deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(400%) skewX(-30deg);
            opacity: 0;
          }
        }

        @keyframes logoAmbientPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 14px rgba(0,0,0,0.06));
          }
          50% {
            transform: scale(1.02);
            filter: drop-shadow(0 6px 18px rgba(0,166,251,0.15));
          }
        }

        .animate-metallic-sweep {
          animation: metallicSweepInfinite 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-metallic-glint {
          animation: metallicGlintInfinite 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.15s;
        }

        .animate-logo-pulse {
          animation: logoAmbientPulse 3.0s ease-in-out infinite;
        }
      `}</style>

      {/* Subtle radial ambient atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,251,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Ultra-compact minimalist size with infinite breathing animation */}
      <div className="relative w-full max-w-[110px] sm:max-w-[130px] md:max-w-[145px] flex items-center justify-center animate-logo-pulse">
        {/* Base Crystal-Clear HD Logo */}
        <picture className="w-full h-auto block select-none">
          <source srcSet="/hitech-full-logo-optimized.webp" type="image/webp" />
          <img
            src="/hitech-full-logo-optimized.png"
            alt="Hitech Engineering"
            loading="eager"
            decoding="sync"
            className="w-full h-auto object-contain filter contrast-[1.06]"
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
            className="absolute top-[-50%] bottom-[-50%] w-[130%] animate-metallic-sweep"
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
            className="absolute top-[-50%] bottom-[-50%] w-[45%] animate-metallic-glint"
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

