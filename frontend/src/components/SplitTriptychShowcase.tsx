import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SplitTriptychShowcaseProps {
  className?: string;
}

export default function SplitTriptychShowcase({
  className = "",
}: SplitTriptychShowcaseProps) {
  // Reference for the scroll track
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the pinned track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 96px", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Multi-scene staggered roll across 3 real infrastructure frames:
  // Wave 1 (0% -> -100%): Facility Exterior -> Robotic Welding Cell
  // Wave 2 (-100% -> -200%): Robotic Welding Cell -> Warehouse & Assembly Bay
  const y1 = useTransform(
    smoothProgress,
    [0.06, 0.24, 0.52, 0.70],
    ["0%", "-100%", "-100%", "-200%"],
    { clamp: true }
  );

  const y2 = useTransform(
    smoothProgress,
    [0.16, 0.34, 0.62, 0.80],
    ["0%", "-100%", "-100%", "-200%"],
    { clamp: true }
  );

  const y3 = useTransform(
    smoothProgress,
    [0.26, 0.44, 0.72, 0.90],
    ["0%", "-100%", "-100%", "-200%"],
    { clamp: true }
  );

  return (
    <div id="infrastructure" className={`w-full ${className}`}>
      {/* ========================================================================= */}
      {/* 1. Header Title Block - SCROLLS NORMALLY UP BEHIND THE NAVBAR */}
      {/* ========================================================================= */}
      <div className="space-y-3 mb-4 max-w-4xl pt-2">
        <span className="text-sm font-medium tracking-tight text-[#64748b]">
          ✦ Section 06 — Our Infrastructure
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
          Our Infrastructure.<br />
          <span className="font-normal text-[#64748b]">Built For Heavy Precision &amp; Serial Scale.</span>
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 2. Pinned Scroll Track: Sticks after the title moves behind the header */}
      {/* ========================================================================= */}
      <div ref={trackRef} className="relative w-full h-[220vh]">
        {/* Pinned Viewport: Freezes exactly below the navbar */}
        <div className="sticky top-20 sm:top-24 w-full pt-1 pb-6 space-y-4">
          {/* Subtitle directly above the image, visible in pinned state */}
          <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
            Multi-bay manufacturing units equipped with heavy manual welding enclosures, high-tonnage gantry beds, and serialized robotic automation lines engineered for uninterrupted OEM output.
          </p>

          {/* 3-Column Split Grid with 90% reduced gap & 20% decreased height */}
          <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc] aspect-[1024/454] relative">
            <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc] h-full">
              {/* ================================================================= */}
              {/* Column 1 (Left Section) */}
              {/* ================================================================= */}
              <div className="overflow-hidden bg-black h-full relative">
                <motion.div
                  style={{ y: y1 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Frame 1: Facility Exterior Slice 1 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_facility_slice_1.png"
                      alt="Our Infrastructure - Plant Facility Left"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Unit 01 • Plant Exterior
                    </div>
                  </div>

                  {/* Frame 2: Robotic Welding Slice 1 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_robot_slice_1.png"
                      alt="Our Infrastructure - Robotic Welding Left"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Cell 01 • Arc Station
                    </div>
                  </div>

                  {/* Frame 3: Warehouse & Assembly Bay Slice 1 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_bay_slice_1.png"
                      alt="Our Infrastructure - Assembly Bay Left"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Bay 01 • Parts Storage
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ================================================================= */}
              {/* Column 2 (Center Section) */}
              {/* ================================================================= */}
              <div className="overflow-hidden bg-black h-full relative">
                <motion.div
                  style={{ y: y2 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Frame 1: Facility Exterior Slice 2 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_facility_slice_2.png"
                      alt="Our Infrastructure - Plant Facility Center"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Unit 01 • Dispatch Fleet
                    </div>
                  </div>

                  {/* Frame 2: Robotic Welding Slice 2 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_robot_slice_2.png"
                      alt="Our Infrastructure - Robotic Welding Center"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Cell 01 • Robotic Arm
                    </div>
                  </div>

                  {/* Frame 3: Warehouse & Assembly Bay Slice 2 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_bay_slice_2.png"
                      alt="Our Infrastructure - Assembly Bay Center"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Bay 01 • Gantry Bed
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ================================================================= */}
              {/* Column 3 (Right Section) */}
              {/* ================================================================= */}
              <div className="overflow-hidden bg-black h-full relative">
                <motion.div
                  style={{ y: y3 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Frame 1: Facility Exterior Slice 3 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_facility_slice_3.png"
                      alt="Our Infrastructure - Plant Facility Right"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Unit 01 • HiTech Facility
                    </div>
                  </div>

                  {/* Frame 2: Robotic Welding Slice 3 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_robot_slice_3.png"
                      alt="Our Infrastructure - Robotic Welding Right"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Cell 01 • Precision Weld
                    </div>
                  </div>

                  {/* Frame 3: Warehouse & Assembly Bay Slice 3 */}
                  <div className="w-full h-full shrink-0 relative">
                    <img
                      src="/infra_bay_slice_3.png"
                      alt="Our Infrastructure - Assembly Bay Right"
                      className="w-full h-full object-cover object-center block"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Bay 01 • Serial Assembly
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
