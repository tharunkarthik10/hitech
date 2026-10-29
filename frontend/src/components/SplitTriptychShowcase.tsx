import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SplitTriptychShowcaseProps {
  className?: string;
}

export default function SplitTriptychShowcase({
  className = "",
}: SplitTriptychShowcaseProps) {
  // 0 = Precision Welding Bay (Image 1), 1 = Fiber Laser Profiling (Image 2)
  const [stage, setStage] = useState<0 | 1>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stageRef = useRef<0 | 1>(0);
  const isTransitioningRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize mutable refs for event listeners
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // Page scroll locking: locks page from moving/scrolling until the roll transition fully completes
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Check if section is currently active in the main reading view
      const isInFocus = rect.top <= 200 && rect.bottom >= windowH * 0.45;

      if (!isInFocus) return;

      // 1. While transition is currently animating, ALWAYS block scroll so page cannot move
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // 2. When at Stage 0 and user attempts to scroll DOWN:
      // Block page scroll and trigger the 3-section roll transition
      if (e.deltaY > 15 && stageRef.current === 0) {
        e.preventDefault();
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setStage(1);

        // Keep page locked until all 3 sections finish rolling (1.2s total duration)
        setTimeout(() => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }, 1200);
        return;
      }

      // 3. When at Stage 1 and user attempts to scroll back UP:
      // Block page scroll and trigger the reverse roll transition
      if (e.deltaY < -15 && stageRef.current === 1 && rect.top >= 20) {
        e.preventDefault();
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setStage(0);

        // Keep page locked until reverse roll finishes (1.2s)
        setTimeout(() => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }, 1200);
        return;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const isInFocus = rect.top <= 200 && rect.bottom >= windowH * 0.45;

      if (!isInFocus) return;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;

      // Swipe up (scroll down)
      if (deltaY > 25 && stageRef.current === 0) {
        e.preventDefault();
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setStage(1);
        setTimeout(() => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }, 1200);
      }
      // Swipe down (scroll up)
      else if (deltaY < -25 && stageRef.current === 1 && rect.top >= 20) {
        e.preventDefault();
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setStage(0);
        setTimeout(() => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }, 1200);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="infrastructure"
      className={`w-full pt-4 pb-12 sm:pb-16 ${className}`}
    >
      {/* Section Header: Our Infrastructure */}
      <div className="space-y-4 mb-6 sm:mb-8 max-w-4xl">
        <div>
          <span className="text-sm font-medium tracking-tight text-[#64748b]">
            ✦ Section 06 — Our Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
            Our Infrastructure.<br />
            <span className="font-normal text-[#64748b]">Built For Heavy Precision & Serial Scale.</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
          Multi-bay manufacturing units equipped with heavy manual welding enclosures, high-tonnage gantry beds, and serialized robotic automation lines engineered for uninterrupted OEM output.
        </p>
      </div>

      {/* 3-Column Split Grid with 90% reduced gap & 20% decreased height */}
      <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc] aspect-[1024/454] relative">
        <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc] h-full">
          {[0, 1, 2].map((colIndex) => {
            // Staggered roll delay: column 0 first, column 1 second, column 2 third
            const forwardDelay = colIndex * 0.18;
            const reverseDelay = (2 - colIndex) * 0.18;
            const currentDelay = stage === 1 ? forwardDelay : reverseDelay;

            return (
              <div key={colIndex} className="overflow-hidden bg-black h-full relative">
                <motion.div
                  animate={{ y: stage === 0 ? "0%" : "-100%" }}
                  transition={{
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                    delay: currentDelay,
                  }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Frame 1: Welding Bay Slice */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src={`/production_welder_slice_${colIndex + 1}.png`}
                      alt={`Welding Bay Slice ${colIndex + 1}`}
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Cell 01 • Welding
                    </div>
                  </div>

                  {/* Frame 2: Fiber Laser Cutting Slice */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src={`/production_robot_slice_${colIndex + 1}.png`}
                      alt={`Fiber Laser Cutting Slice ${colIndex + 1}`}
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Cell 02 • Laser Profiling
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
