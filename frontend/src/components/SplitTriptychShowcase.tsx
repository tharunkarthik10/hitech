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
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Staggered roll transitions: 0% (Image 1: Welder) -> -100% (Image 2: Robotic Line)
  // Each section rolls upward (from down to up) one after another
  const y1 = useTransform(smoothProgress, [0.12, 0.42], ["0%", "-100%"], { clamp: true });
  const y2 = useTransform(smoothProgress, [0.38, 0.68], ["0%", "-100%"], { clamp: true });
  const y3 = useTransform(smoothProgress, [0.64, 0.94], ["0%", "-100%"], { clamp: true });

  // Progress bar indicator
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={trackRef}
      id="infrastructure"
      className={`relative w-full h-[250vh] ${className}`}
    >
      {/* Pinned Sticky Section Viewport */}
      <div className="sticky top-20 sm:top-24 w-full pt-2 pb-8 sm:pb-12">
        {/* Section Header: Our Infrastructure */}
        <div className="space-y-3 mb-6 sm:mb-8 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-sm font-medium tracking-tight text-[#64748b]">
                ✦ Section 06 — Our Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
                Our Infrastructure.<br />
                <span className="font-normal text-[#64748b]">Built For Heavy Precision & Serial Scale.</span>
              </h2>
            </div>

            {/* Scroll Stage Tracker Badge */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/90 shadow-2xs self-start sm:self-auto shrink-0 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#003554] animate-pulse" />
              <span className="text-xs font-semibold text-[#121212] tracking-tight">
                Scroll to Roll Workflow
              </span>
            </div>
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
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Cell 01 • Welding
                  </div>
                </div>

                {/* Frame 2: Robot Slice 1 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_robot_slice_1.png"
                    alt="Our Infrastructure - Robotic Line Left"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Cell 02 • Robotics
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
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Cell 01 • Arc Station
                  </div>
                </div>

                {/* Frame 2: Robot Slice 2 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_robot_slice_2.png"
                    alt="Our Infrastructure - Robotic Line Center"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Cell 02 • 6-Axis Arms
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
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Cell 01 • Dispatch
                  </div>
                </div>

                {/* Frame 2: Robot Slice 3 */}
                <div className="w-full h-full shrink-0 relative">
                  <img
                    src="/production_robot_slice_3.png"
                    alt="Our Infrastructure - Robotic Line Right"
                    className="w-full h-full object-cover object-center block"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Cell 02 • Conveyor Feed
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Thin Roll Progress Line along bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-[#00A6FB]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
