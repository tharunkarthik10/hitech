import React, { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedRef = useRef(false);

  const handleComplete = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 600);
  };

  useEffect(() => {
    // Lock body scrolling during intro loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Start video playback
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Fallback if autoplay is restricted
      });
    }

    // Fallback timer matching video duration (3.9s)
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 4000);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-600 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Hitech Engineering"
    >
      {/* Pure Logo & Font - No boxes, no card borders, no shadows, no loading symbols */}
      <div className="w-full max-w-[440px] sm:max-w-[520px] md:max-w-[580px] px-6 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/videos/loading-poster.webp"
          onEnded={handleComplete}
          className="w-full h-auto object-contain pointer-events-none mix-blend-multiply"
        >
          <source src="/videos/loading-intro.webm" type="video/webm" />
          <source src="/videos/loading-intro.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LoadingScreen;
