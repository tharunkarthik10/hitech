import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedRef = useRef(false);

  const handleClose = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsClosing(true);

    // After the right-to-left slide transition completes, unmount completely
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 1000);
  };

  useEffect(() => {
    // Lock scrolling while intro is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Start video playback immediately on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser restricts
      });
    }

    // Safety fallback timeout slightly past video duration (6.2s)
    const fallbackTimer = setTimeout(() => {
      handleClose();
    }, 6400);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#07090e] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] select-none overflow-hidden ${
        isClosing ? '-translate-x-full pointer-events-none' : 'translate-x-0'
      }`}
      aria-label="Laser Cutting Intro"
    >
      {/* Laser edge trailing glow beam on the right edge as it sweeps away */}
      <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-[#00A6FB]/20 via-[#00A6FB] to-[#00A6FB]/20 shadow-[0_0_25px_#00A6FB,0_0_50px_#00A6FB] pointer-events-none z-30" />

      {/* Atmospheric dark background vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-10" />

      {/* Full-screen Cinematic Video Presentation */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          poster="/videos/laser-poster.webp"
          onEnded={handleClose}
          className="w-full h-full max-w-[1460px] object-contain pointer-events-none z-0"
        >
          <source src="/videos/laser-cutting-intro.webm" type="video/webm" />
          <source src="/videos/laser-cutting-intro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Interactive Controls Overlay */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
        {/* Sound toggle button */}
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/80 hover:text-white bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-200"
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#00A6FB]" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#00A6FB] animate-pulse" />
              <span>Sound On</span>
            </>
          )}
        </button>

        {/* Skip button that triggers right-to-left slide */}
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 hover:text-white bg-black/60 hover:bg-[#00A6FB]/20 backdrop-blur-md border border-white/15 hover:border-[#00A6FB]/60 shadow-lg transition-all duration-200 group"
        >
          <span>Skip</span>
          <FastForward className="w-3.5 h-3.5 text-[#00A6FB] transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
