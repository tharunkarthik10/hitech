import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SplitTriptychShowcaseProps {
  className?: string;
}

export default function SplitTriptychShowcase({
  className = "",
}: SplitTriptychShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll through the sticky container
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Staggered roll: Column 1 rolls first, Column 2 rolls second, Column 3 rolls third
  // Each section rolls from down-to-up (0% -> -100%)
  const y1 = useTransform(smoothProgress, [0.08, 0.38], ["0%", "-100%"], { clamp: true });
  const y2 = useTransform(smoothProgress, [0.32, 0.62], ["0%", "-100%"], { clamp: true });
  const y3 = useTransform(smoothProgress, [0.56, 0.86], ["0%", "-100%"], { clamp: true });

  return (
    <div
      ref={trackRef}
      id="infrastructure"
      className={`relative w-full h-[160vh] ${className}`}
    >
      {/* Pinned Sticky Section Viewport - Stays firmly locked in place while scrolling */}
      <div className="sticky top-20 sm:top-24 w-full pt-1 pb-6">
        {/* Section Header: Our Infrastructure */}
        <div className="space-y-3 mb-5 sm:mb-7 max-w-4xl">
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
            {/* Column 1 (Left Section) */}
            <div className="overflow-hidden bg-black h-full relative">
              <motion.div
                style={{ y: y1 }}
                className="w-full h-full flex flex-col"
              >
                {/* Frame 1: Welder Slice 1 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_welder_slice_1.png"
                    alt="Our Infrastructure - Welding Bay Left"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Cell 01 • Welding
                  </div>
                </div>

                {/* Frame 2: Laser Profiling Slice 1 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_robot_slice_1.png"
                    alt="Our Infrastructure - Laser Profiling Left"
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

            {/* Column 2 (Center Section) */}
            <div className="overflow-hidden bg-black h-full relative">
              <motion.div
                style={{ y: y2 }}
                className="w-full h-full flex flex-col"
              >
                {/* Frame 1: Welder Slice 2 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_welder_slice_2.png"
                    alt="Our Infrastructure - Welding Bay Center"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Cell 01 • Arc Station
                  </div>
                </div>

                {/* Frame 2: Laser Profiling Slice 2 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_robot_slice_2.png"
                    alt="Our Infrastructure - Laser Profiling Center"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Cell 02 • Fiber Laser Cut
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Column 3 (Right Section) */}
            <div className="overflow-hidden bg-black h-full relative">
              <motion.div
                style={{ y: y3 }}
                className="w-full h-full flex flex-col"
              >
                {/* Frame 1: Welder Slice 3 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_welder_slice_3.png"
                    alt="Our Infrastructure - Welding Bay Right"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Cell 01 • Dispatch
                  </div>
                </div>

                {/* Frame 2: Laser Profiling Slice 3 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_robot_slice_3.png"
                    alt="Our Infrastructure - Laser Profiling Right"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Cell 02 • Plasma Bed
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
