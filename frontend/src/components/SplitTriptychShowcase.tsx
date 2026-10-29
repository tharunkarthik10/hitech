import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";

interface SplitTriptychShowcaseProps {
  className?: string;
}

export default function SplitTriptychShowcase({
  className = "",
}: SplitTriptychShowcaseProps) {
  // 0 = Precision Welding Bay (Image 1), 1 = Fiber Laser Profiling (Image 2)
  const [activeStage, setActiveStage] = useState<0 | 1>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCooldownRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  // Wheel event listener to roll between the two meaningful manufacturing images
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If user scrolls down on stage 0, roll to stage 1
      if (e.deltaY > 25 && activeStage === 0 && !isCooldownRef.current) {
        e.preventDefault();
        isCooldownRef.current = true;
        setActiveStage(1);
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 850);
      }
      // If user scrolls up on stage 1, roll back to stage 0
      else if (e.deltaY < -25 && activeStage === 1 && !isCooldownRef.current) {
        e.preventDefault();
        isCooldownRef.current = true;
        setActiveStage(0);
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 850);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || isCooldownRef.current) return;
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;

      if (delta > 35 && activeStage === 0) {
        e.preventDefault();
        isCooldownRef.current = true;
        setActiveStage(1);
        touchStartY.current = null;
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 850);
      } else if (delta < -35 && activeStage === 1) {
        e.preventDefault();
        isCooldownRef.current = true;
        setActiveStage(0);
        touchStartY.current = null;
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 850);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeStage]);

  const stages = [
    {
      id: 0,
      badge: "Cell 01 • Manual Welding",
      title: "Our Infrastructure.",
      subtitle: "Built For Heavy Precision & Serial Scale.",
      desc: "Multi-bay heavy manufacturing units equipped with certified manual TIG/MIG welding enclosures and high-tonnage gantry beds engineered for zero-defect metallurgical integrity.",
    },
    {
      id: 1,
      badge: "Cell 02 • Fiber Laser Profiling",
      title: "Advanced Machining.",
      subtitle: "High-Power Fiber Laser Profiling & Clean Kerf Cutting.",
      desc: "High-throughput 12kW fiber laser cutting cells profiling structural alloys with micron repeatability, oxygen assist gas purging, and synchronized nesting software.",
    },
  ];

  const currentInfo = stages[activeStage];

  return (
    <section
      ref={containerRef}
      id="infrastructure"
      className={`w-full pt-4 pb-12 sm:pb-16 ${className}`}
    >
      {/* Section Header: Our Infrastructure */}
      <div className="space-y-4 mb-6 sm:mb-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium tracking-tight text-[#64748b]">
              ✦ Section 06 — Our Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
              {currentInfo.title}<br />
              <span className="font-normal text-[#64748b]">{currentInfo.subtitle}</span>
            </h2>
          </div>

          {/* Interactive Cell Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-full border border-gray-200/90 shadow-2xs self-start sm:self-auto shrink-0">
            <button
              onClick={() => setActiveStage(0)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeStage === 0
                  ? "bg-[#003554] text-white shadow-xs"
                  : "text-[#64748b] hover:text-[#121212]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeStage === 0 ? "bg-[#00A6FB]" : "bg-gray-400"}`} />
              <span>01 Welding Bay</span>
            </button>
            <button
              onClick={() => setActiveStage(1)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeStage === 1
                  ? "bg-[#003554] text-white shadow-xs"
                  : "text-[#64748b] hover:text-[#121212]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeStage === 1 ? "bg-[#00A6FB]" : "bg-gray-400"}`} />
              <span>02 Laser Profiling</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
          {currentInfo.desc}
        </p>
      </div>

      {/* 3-Column Split Grid with 90% reduced gap & 20% decreased height */}
      <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc] aspect-[1024/454] relative">
        <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc] h-full">
          {[0, 1, 2].map((colIndex) => {
            // Staggered roll delay: column 0 first, column 1 second, column 2 third
            const forwardDelay = colIndex * 0.16;
            const reverseDelay = (2 - colIndex) * 0.16;
            const currentDelay = activeStage === 1 ? forwardDelay : reverseDelay;

            return (
              <div key={colIndex} className="overflow-hidden bg-black h-full relative">
                <motion.div
                  animate={{ y: activeStage === 0 ? "0%" : "-100%" }}
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

        {/* Bottom Interactive Helper Bar */}
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white/90 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-[#00A6FB]" />
          <span>Scroll over image or click cells to roll</span>
        </div>
      </div>
    </section>
  );
}
