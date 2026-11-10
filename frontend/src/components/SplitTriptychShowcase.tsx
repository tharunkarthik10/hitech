import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SplitTriptychShowcaseProps {
  className?: string;
}

const scenes = [
  {
    id: "01",
    tag: "01 • Plant Logistics",
    shortTitle: "Logistics",
    color: "bg-emerald-400",
    cols: [
      { src: "/infra_facility_slice_1.png", label: "Unit 01 • Plant Exterior" },
      { src: "/infra_facility_slice_2.png", label: "Unit 01 • Dispatch Fleet" },
      { src: "/infra_facility_slice_3.png", label: "Unit 01 • HiTech Facility" },
    ]
  },
  {
    id: "02",
    tag: "02 • Robotic Arc Cell",
    shortTitle: "Robotic Arc",
    color: "bg-orange-400",
    cols: [
      { src: "/infra_robot_slice_1.png", label: "Cell 01 • Arc Station" },
      { src: "/infra_robot_slice_2.png", label: "Cell 01 • Robotic Arm" },
      { src: "/infra_robot_slice_3.png", label: "Cell 01 • Precision Weld" },
    ]
  },
  {
    id: "03",
    tag: "03 • High-Bay Assembly",
    shortTitle: "High-Bay",
    color: "bg-blue-400",
    cols: [
      { src: "/infra_bay_slice_1.png", label: "Bay 01 • Parts Storage" },
      { src: "/infra_bay_slice_2.png", label: "Bay 01 • Gantry Bed" },
      { src: "/infra_bay_slice_3.png", label: "Bay 01 • Serial Assembly" },
    ]
  }
];

export default function SplitTriptychShowcase({
  className = "",
}: SplitTriptychShowcaseProps) {
  // Mobile active scene state
  const [mobileScene, setMobileScene] = useState(0);

  // Auto-cycle mobile scene every 4 seconds if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileScene((prev) => (prev + 1) % scenes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Desktop pinned track reference
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the pinned track on desktop
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

  // Strictly sequential column-by-column cascade for desktop:
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

  return (
    <div id="infrastructure" className={`w-full relative z-10 pt-4 sm:pt-6 ${className}`}>
      {/* ========================================================================= */}
      {/* 1. Header Title Block */}
      {/* ========================================================================= */}
      <div className="space-y-2 sm:space-y-3 mb-4 max-w-4xl">
        <span className="text-xs sm:text-sm font-medium tracking-tight text-[#64748b]">
          ✦ Section 06 — Our Infrastructure
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15]">
          Our Infrastructure.<br />
          <span className="font-normal text-[#64748b]">Built For Heavy Precision &amp; Serial Scale.</span>
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW (< lg): Zero empty space, compact height, interactive tabs */}
      {/* ========================================================================= */}
      <div className="lg:hidden w-full space-y-3 mb-8">
        <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed">
          Multi-bay manufacturing units equipped with heavy manual welding enclosures, high-tonnage gantry beds, and serialized robotic automation lines engineered for uninterrupted OEM output.
        </p>

        {/* Modern Mobile Segmented Tabs */}
        <div className="w-full p-1 bg-gray-100/90 rounded-xl border border-gray-200/90 flex items-center gap-1">
          {scenes.map((scene, idx) => {
            const isActive = mobileScene === idx;
            return (
              <button
                key={scene.id}
                onClick={() => setMobileScene(idx)}
                className={`flex-1 py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-white text-gray-950 font-bold shadow-xs border border-gray-200/70"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${scene.color} shrink-0`} />
                <span className="truncate text-xs">
                  {scene.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Split Grid with Smooth Cascade Transition */}
        <div className="rounded-2xl overflow-hidden border border-gray-200/90 shadow-md bg-[#f8fafc] aspect-[1024/454] relative">
          <div className="grid grid-cols-3 gap-[2px] bg-[#f8fafc] h-full">
            {[0, 1, 2].map((colIndex) => (
              <div key={colIndex} className="overflow-hidden bg-black h-full relative">
                <motion.div
                  animate={{ y: `-${mobileScene * 100}%` }}
                  transition={{ 
                    duration: 0.65, 
                    delay: colIndex * 0.08,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="w-full h-full flex flex-col will-change-transform"
                >
                  {scenes.map((scene) => (
                    <div key={scene.id} className="w-full h-full shrink-0 relative">
                      <img
                        src={scene.cols[colIndex].src}
                        alt={scene.cols[colIndex].label}
                        className="w-full h-full object-cover object-center block"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-65" />
                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-3 text-[8px] sm:text-[10px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                        {scene.cols[colIndex].label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Active Scene Info & Dot Indicators */}
        <div className="flex items-center justify-between text-xs px-1 pt-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${scenes[mobileScene].color}`} />
            <span className="font-semibold text-gray-900 text-xs tracking-tight">
              {scenes[mobileScene].tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {scenes.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileScene(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  mobileScene === i ? "w-6 bg-[#00A6FB]" : "w-1.5 bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DESKTOP VIEW (>= lg): Pinned Scroll Track with continuous cascade       */}
      {/* ========================================================================= */}
      <div ref={trackRef} className="hidden lg:block relative w-full h-[280vh]">
        {/* Pinned Viewport: Freezes exactly below the navbar */}
        <div className="sticky top-20 sm:top-24 w-full pt-1 pb-6 space-y-4">
          {/* Subtitle directly above the image, visible in pinned state */}
          <div>
            <p className="text-sm md:text-base text-[#475569] font-normal leading-relaxed max-w-3xl">
              Multi-bay manufacturing units equipped with heavy manual welding enclosures, high-tonnage gantry beds, and serialized robotic automation lines engineered for uninterrupted OEM output.
            </p>
          </div>

          {/* 3-Column Split Grid with Hardware-Accelerated Transforms */}
          <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc] aspect-[1024/454] relative">
            <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc] h-full">
              {/* Column 1 (Left Section) */}
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

              {/* Column 2 (Center Section) */}
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

              {/* Column 3 (Right Section) */}
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
