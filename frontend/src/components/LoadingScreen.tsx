import React, { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedRef = useRef(false);

  const handleComplete = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setProgress(100);
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
        // Fallback if autoplay is blocked
      });
    }

    // Safety fallback timeout to ensure user never gets stuck (3.9s video duration + buffer)
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 4200);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const pct = Math.min(100, Math.round((current / total) * 100));
      setProgress(pct);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] transition-opacity duration-600 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Hitech Engineering"
    >
      {/* Background radial ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,251,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Video Animation Card */}
      <div className="relative z-10 w-[90%] max-w-[560px] sm:max-w-[640px] flex flex-col items-center">
        <div className="relative w-full aspect-[1508/1080] rounded-2xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] border border-gray-200/90">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/videos/loading-poster.webp"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleComplete}
            className="w-full h-full object-cover"
          >
            <source src="/videos/loading-intro.webm" type="video/webm" />
            <source src="/videos/loading-intro.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Progress bar & Industrial Status Indicator */}
        <div className="w-full max-w-[420px] mt-6 sm:mt-8 px-4 flex flex-col items-center">
          <div className="w-full h-1 bg-gray-300/70 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0080ff] to-[#00A6FB] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_#00A6FB]"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>

          <div className="w-full mt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-gray-500">
            <span className="flex items-center gap-1.5 font-semibold text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] animate-pulse" />
              HITECH SYSTEMS
            </span>
            <span className="font-semibold text-[#00A6FB]">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Subtle Skip button in corner */}
      <button
        type="button"
        onClick={handleComplete}
        className="absolute bottom-6 right-6 z-20 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:text-gray-900 bg-white/70 hover:bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm transition-all duration-200 hover:shadow"
      >
        Skip intro &rarr;
      </button>
    </div>
  );
};

export default LoadingScreen;
