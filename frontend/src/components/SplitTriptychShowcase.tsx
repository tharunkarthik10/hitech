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

  // Responsive spring physics: tactile, responsive, zero rubber-band drag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.16,
    restDelta: 0.0005,
  });

  // Smoothstep S-curve easing: eliminates linear abruptness for buttery transitions
  const smoothStep = (t: number) => t * t * (3 - 2 * t);

  // Strictly sequential column-by-column cascade:
  // Wave 1 (Exterior -> Robotic Arc Cell):
  // Col 1: rolls [0.06 -> 0.19] to -100%. Completes completely.
  // Col 2: rolls [0.20 -> 0.33] to -100%. Starts ONLY after Col 1 is 100% finished.
  // Col 3: rolls [0.34 -> 0.47] to -100%. Starts ONLY after Col 2 is 100% finished.
  // Rest Zone 1: [0.47 -> 0.56] All 3 columns stationary on Scene 2 (Robotic Arc Cell).
  //
  // Wave 2 (Robotic Arc Cell -> Assembly Bay):
  // Col 1: rolls [0.56 -> 0.69] to -200%. Completes completely.
  // Col 2: rolls [0.70 -> 0.83] to -200%. Starts ONLY after Col 1 is 100% finished.
  // Col 3: rolls [0.84 -> 0.97] to -200%. Starts ONLY after Col 2 is 100% finished.
  // Rest Zone 2: [0.97 -> 1.00] All 3 columns stationary on Scene 3 (High-Bay Assembly).
  const y1 = useTransform(
    smoothProgress,
    [0.06, 0.19, 0.56, 0.69],
    ["0%", "-100%", "-100%", "-200%"],
    { ease: smoothStep, clamp: true }
  );

  const y2 = useTransform(
    smoothProgress,
    [0.20, 0.33, 0.70, 0.83],
    ["0%", "-100%", "-100%", "-200%"],
    { ease: smoothStep, clamp: true }
  );

  const y3 = useTransform(
    smoothProgress,
    [0.34, 0.47, 0.84, 0.97],
    ["0%", "-100%", "-100%", "-200%"],
    { ease: smoothStep, clamp: true }
  );

  // Dynamic scene tag indicator: strictly non-overlapping opacity cutovers (zero text collision)
  const scene1Opacity = useTransform(smoothProgress, [0.00, 0.25, 0.27], [1, 1, 0], { clamp: true });
  const scene2Opacity = useTransform(smoothProgress, [0.27, 0.29, 0.61, 0.63], [0, 1, 1, 0], { clamp: true });
  const scene3Opacity = useTransform(smoothProgress, [0.63, 0.65, 1.00], [0, 1, 1], { clamp: true });

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
      {/* 2. Pinned Scroll Track: Generous runway for buttery-smooth rolls */}
      {/* ========================================================================= */}
      <div ref={trackRef} className="relative w-full h-[280vh]">
        {/* Pinned Viewport: Freezes exactly below the navbar */}
        <div className="sticky top-20 sm:top-24 w-full pt-1 pb-6 space-y-4">
          {/* Subtitle directly above the image, visible in pinned state */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
              Multi-bay manufacturing units equipped with heavy manual welding enclosures, high-tonnage gantry beds, and serialized robotic automation lines engineered for uninterrupted OEM output.
            </p>

            {/* Dynamic Active Scene Pill */}
            <div className="relative h-7 min-w-[210px] shrink-0 hidden sm:block">
              <motion.div
                style={{ opacity: scene1Opacity }}
                className="absolute inset-0 flex items-center justify-end"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono backdrop-blur-md border border-white/10 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  01 • Plant Logistics
                </span>
              </motion.div>
              <motion.div
                style={{ opacity: scene2Opacity }}
                className="absolute inset-0 flex items-center justify-end"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono backdrop-blur-md border border-white/10 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  02 • Robotic Arc Cell
                </span>
              </motion.div>
              <motion.div
                style={{ opacity: scene3Opacity }}
                className="absolute inset-0 flex items-center justify-end"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-mono backdrop-blur-md border border-white/10 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  03 • High-Bay Assembly
                </span>
              </motion.div>
            </div>
          </div>

          {/* 3-Column Split Grid with Hardware-Accelerated Transforms */}
          <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc] aspect-[1024/454] relative">
            <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc] h-full">
              {/* ================================================================= */}
              {/* Column 1 (Left Section) */}
              {/* ================================================================= */}
              <div className="overflow-hidden bg-black h-full relative">
                <motion.div
                  style={{ y: y1 }}
                  className="w-full h-full flex flex-col will-change-transform"
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
                  className="w-full h-full flex flex-col will-change-transform"
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
                  className="w-full h-full flex flex-col will-change-transform"
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
