import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ScrollFlyCardProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  smoothProgress: MotionValue<number>;
  order: number; // 0 to 13
  total?: number;
  fallbackX: number;
  fallbackY: number;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

function ScrollFlyCard({
  sectionRef,
  smoothProgress,
  order,
  total = 14,
  fallbackX,
  fallbackY,
  onClick,
  className = "",
  children,
}: ScrollFlyCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const deltaX = useMotionValue(fallbackX);
  const deltaY = useMotionValue(fallbackY);

  useEffect(() => {
    const calc = () => {
      if (!wrapperRef.current || !sectionRef.current) return;
      const cardRect = wrapperRef.current.getBoundingClientRect();
      const secRect = sectionRef.current.getBoundingClientRect();

      // Target is bottom-right corner of the entire section container
      const targetRight = secRect.right - 16;
      const targetBottom = secRect.bottom - 16;

      const dx = Math.max(targetRight - cardRect.right, 40);
      const dy = Math.max(targetBottom - cardRect.bottom, 40);

      deltaX.set(dx);
      deltaY.set(dy);
    };

    calc();
    const frameId = requestAnimationFrame(calc);

    window.addEventListener("resize", calc);
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => calc());
      if (sectionRef.current) observer.observe(sectionRef.current);
      if (wrapperRef.current) observer.observe(wrapperRef.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", calc);
      if (observer) observer.disconnect();
    };
  }, [sectionRef, deltaX, deltaY]);

  // Staggered launch intervals tied to scroll progress (0 to 1)
  const startP = (order / total) * 0.35;
  const endP = Math.min(1, startP + 0.48);

  const x = useTransform([smoothProgress, deltaX], (latest: number[]) => {
    const p = latest[0] ?? 0;
    const currentDx = latest[1] ?? fallbackX;
    if (p <= startP) return currentDx;
    if (p >= endP) return 0;
    const t = (p - startP) / (endP - startP);
    const ease = 1 - Math.pow(1 - t, 3);
    return currentDx * (1 - ease);
  });

  const y = useTransform([smoothProgress, deltaY], (latest: number[]) => {
    const p = latest[0] ?? 0;
    const currentDy = latest[1] ?? fallbackY;
    if (p <= startP) return currentDy;
    if (p >= endP) return 0;
    const t = (p - startP) / (endP - startP);
    const ease = 1 - Math.pow(1 - t, 3);
    return currentDy * (1 - ease);
  });

  const opacity = useTransform(smoothProgress, (p: number) => {
    if (p <= startP) return 0;
    if (p >= endP) return 1;
    const t = (p - startP) / (endP - startP);
    return Math.min(1, t * 1.6);
  });

  const scale = useTransform(smoothProgress, (p: number) => {
    if (p <= startP) return 0.85;
    if (p >= endP) return 1;
    const t = (p - startP) / (endP - startP);
    const ease = 1 - Math.pow(1 - t, 3);
    return 0.85 + 0.15 * ease;
  });

  return (
    <div ref={wrapperRef} className="w-full h-full relative">
      <motion.div
        style={{ x, y, opacity, scale }}
        onClick={onClick}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface FacilityArchiveGalleryProps {
  openQuoteModal: (title: string) => void;
}

export default function FacilityArchiveGallery({
  openQuoteModal,
}: FacilityArchiveGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Link scroll progress of this section directly to user's vertical swipe/scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.45"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="pt-6 sm:pt-10 border-t border-gray-200/80 overflow-hidden relative"
    >
      {/* Asymmetric 5-Column Collage Grid with Uneven Heights & Baseline Alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {/* COLUMN 1: Editorial Header Block + Uneven Bottom Landscape Card */}
        <div className="flex flex-col justify-between gap-6 sm:gap-8">
          <div className="space-y-4 pt-1">
            <span className="text-sm font-medium tracking-tight text-[#64748b]">
              Section 05 — Facility Archive
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#121212] leading-[1.08]">
              Beyond Limits.
              <br />
              <span className="font-normal text-[#64748b]">Pure Precision.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-sm">
              Vibrant factory snapshots capturing micron machining, robotic welding,
              and high-speed laser profiling in full color.
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  openQuoteModal("Gallery Program Inquiries & Facility Tours")
                }
                className="px-6 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>See the Stories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Card: Landscape (aspect-[4/3]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={0}
            fallbackX={1100}
            fallbackY={585}
            onClick={() =>
              openQuoteModal("Program Inquiry: Heavy Structural Gantry Milling")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800"
              alt="Heavy Structural Gantry Milling"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Structural Bed
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Heavy Machine Base Milling
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 2: 2 Uneven Cards (Tall Portrait on Top, Landscape on Bottom) */}
        <div className="flex flex-col justify-end gap-4 sm:gap-5">
          {/* Card 2: Tall Portrait (aspect-[3/4]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={1}
            fallbackX={840}
            fallbackY={935}
            onClick={() =>
              openQuoteModal("Program Inquiry: 5-Axis Aerospace Spindle Milling")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
              alt="5-Axis Aerospace Spindle Milling"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                5-Axis Machining
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Aerospace Impeller Spindle
              </div>
            </div>
          </ScrollFlyCard>

          {/* Card 3: Landscape (aspect-[4/3]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={2}
            fallbackX={840}
            fallbackY={585}
            onClick={() =>
              openQuoteModal("Program Inquiry: Precision CNC Lathe Turning")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
              alt="Precision CNC Lathe Turning"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Live Tooling Lathe
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Sub-Micron Shaft Turning
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 3: 2 Uneven Cards (Square on Top, Tall Portrait on Bottom) */}
        <div className="flex flex-col justify-end gap-4 sm:gap-5">
          {/* Card 4: Square (aspect-square) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={3}
            fallbackX={580}
            fallbackY={935}
            onClick={() =>
              openQuoteModal("Program Inquiry: High-Power Fiber Laser Cutting")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-square relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
              alt="High-Power Fiber Laser Cutting"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Fiber Laser Profiling
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                12kW Clean Kerf Cutting
              </div>
            </div>
          </ScrollFlyCard>

          {/* Card 5: Tall Portrait (aspect-[3/4]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={4}
            fallbackX={580}
            fallbackY={585}
            onClick={() =>
              openQuoteModal("Program Inquiry: 5-Axis Spiral Impeller Sculpting")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="/gear_flower_bloom.jpg"
              alt="5-Axis Spiral Impeller Sculpting"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Sculpted Geometry
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Continuous 5-Axis Impeller
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 4: Arrow Highlights List + 1 Tall Portrait Card at Bottom */}
        <div className="flex flex-col justify-between gap-6 sm:gap-8">
          {/* Arrow Feature Highlight List */}
          <div className="space-y-3.5 pt-6 lg:pt-14">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Silent precision.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Honest tolerances.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Pure metallurgy.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Zero-defect depth.</span>
            </div>
          </div>

          {/* Card 6: Tall Portrait (aspect-[3/4]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={5}
            fallbackX={320}
            fallbackY={585}
            onClick={() =>
              openQuoteModal("Program Inquiry: Zeiss Bridge CMM Metrology Lab")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
              alt="Zeiss Bridge CMM Metrology Lab"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Quality Metrology
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Zeiss Bridge CMM Probe
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 5: 3 Uneven Cards (Landscape on Top, Very Tall Portrait in Middle, Wide Landscape on Bottom) */}
        <div className="flex flex-col justify-end gap-4 sm:gap-5">
          {/* Card 7: Landscape (aspect-[4/3]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={6}
            fallbackX={60}
            fallbackY={935}
            onClick={() =>
              openQuoteModal("Program Inquiry: Hydraulic Press Brake Bending")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
              alt="Hydraulic Press Brake Bending"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                CNC Forming
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Hydraulic Press Brake
              </div>
            </div>
          </ScrollFlyCard>

          {/* Card 8: Tall Vertical (aspect-[2/3]) */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={7}
            fallbackX={60}
            fallbackY={585}
            onClick={() =>
              openQuoteModal("Program Inquiry: Automated Robotic Welding Cell")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[2/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
              alt="Automated Robotic Welding Cell"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Robotic Fabrication
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Automated TIG/MIG Cell
              </div>
            </div>
          </ScrollFlyCard>

          {/* Free-standing Arrow Highlights in the Gap (No box) */}
          <div className="space-y-3.5 py-3 px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Sub-micron concentricity.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Multi-axis live tooling.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Hardened alloy turning.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Certified shaft runout.</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY & FINAL TIERS: ROW 2 & ROW 3 WITH DIFFERENTIAL LENGTHS ENDING AT THE SAME LINE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 items-stretch">
        {/* COLUMN 1: Tall Portrait (aspect-[3/4]) + Medium Landscape (aspect-[4/3]) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={8}
            fallbackX={1100}
            fallbackY={235}
            onClick={() =>
              openQuoteModal(
                "Program Inquiry: Advanced Facility Infrastructure & Plant Bed"
              )
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="/industrial_monument.jpg"
              alt="Advanced Facility Infrastructure & Plant Bed"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Unit 01 Coimbatore
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                High-Bay Manufacturing Plant
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 2: Sleek Free-standing Arrow Highlights in the Gap */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          <div className="space-y-3.5 py-3 px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Silent precision.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Honest tolerances.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Pure metallurgy.</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
              <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
              <span>Zero-defect depth.</span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Classic Landscape (aspect-[4/3]) + Tall Portrait (aspect-[3/4]) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={9}
            fallbackX={580}
            fallbackY={235}
            onClick={() =>
              openQuoteModal("Program Inquiry: Automated Dual-Bed Pallet Shuttle")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
              alt="Automated Dual-Bed Pallet Shuttle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Continuous Infeed
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Dual-Bed Shuttle Automation
              </div>
            </div>
          </ScrollFlyCard>

          {/* Row 3 Final Card */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={10}
            fallbackX={580}
            fallbackY={60}
            onClick={() =>
              openQuoteModal(
                "Program Inquiry: Automated Robotic Pick & Place Cell"
              )
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden flex-1 min-h-[190px] aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
              alt="Automated Robotic Pick & Place Cell"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Robotics & Automation
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Automated Robotic Assembly Cell
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 4: Dramatic Tall Portrait (aspect-[2/3]) + Sleek Wide Landscape (aspect-[16/9]) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={11}
            fallbackX={320}
            fallbackY={235}
            onClick={() =>
              openQuoteModal("Program Inquiry: Heavy Structural Rig Weldments")
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[2/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
              alt="Heavy Structural Rig Weldments"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Heavy Fabrication
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Machine Rig Base Fabrication
              </div>
            </div>
          </ScrollFlyCard>

          {/* Row 3 Final Card */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={12}
            fallbackX={320}
            fallbackY={60}
            onClick={() =>
              openQuoteModal(
                "Program Inquiry: Modular Workstation Production Cells"
              )
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden flex-1 min-h-[160px] aspect-[16/9] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="/isometric_blue_blocks.jpg"
              alt="Modular Workstation Production Cells"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Plant Engineering
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Modular Lean Workstation Cells
              </div>
            </div>
          </ScrollFlyCard>
        </div>

        {/* COLUMN 5: Balanced Square (aspect-square) + Balanced Square (aspect-square) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <ScrollFlyCard
            sectionRef={sectionRef}
            smoothProgress={smoothProgress}
            order={13}
            fallbackX={60}
            fallbackY={235}
            onClick={() =>
              openQuoteModal(
                "Program Inquiry: Certified Global Packaging & Dispatch"
              )
            }
            className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-square relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
          >
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              alt="Certified Global Packaging & Dispatch"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
              <div className="text-[10px] font-normal tracking-tight text-white/70">
                Logistics Fulfillment
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                Certified Global Dispatch
              </div>
            </div>
          </ScrollFlyCard>

          {/* Row 3: Free-standing Engineering CTA in the Gap (No box) */}
          <div className="space-y-3.5 py-3 px-1">
            <span className="text-xs font-normal tracking-tight text-[#64748b] block">
              Engineering Desk
            </span>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                <span>Rapid tooling review.</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                <span>Design for manufacturability.</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                <span>Zero-defect SLA dispatch.</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() =>
                  openQuoteModal("Direct Engineering Consultation & Rapid RFQ")
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-[#121212] hover:text-black hover:underline cursor-pointer"
              >
                <span>Start Production</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
