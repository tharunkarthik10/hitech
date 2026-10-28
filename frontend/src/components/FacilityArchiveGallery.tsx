import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface FacilityArchiveGalleryProps {
  openQuoteModal: (title: string) => void;
}

export default function FacilityArchiveGallery({
  openQuoteModal,
}: FacilityArchiveGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionDimensions, setSectionDimensions] = useState({
    width: 1200,
    height: 1400,
  });

  useEffect(() => {
    const updateDims = () => {
      if (sectionRef.current) {
        setSectionDimensions({
          width: sectionRef.current.clientWidth || 1200,
          height: sectionRef.current.clientHeight || 1400,
        });
      }
    };

    updateDims();
    const frameId = requestAnimationFrame(updateDims);

    window.addEventListener("resize", updateDims);
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && sectionRef.current) {
      observer = new ResizeObserver(() => updateDims());
      observer.observe(sectionRef.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateDims);
      if (observer) observer.disconnect();
    };
  }, []);

  // Helper function to generate diagonal bottom-right entrance props
  // Starts each card from the bottom-right of the entire section container
  // and smoothly decelerates into exact grid coordinates (x: 0, y: 0) at a reduced, elegant speed
  const getDiagonalProps = (colRatio: number, rowRatio: number, order: number) => {
    const initialX = Math.max(colRatio * sectionDimensions.width, 50);
    const initialY = Math.max(rowRatio * sectionDimensions.height, 50);

    return {
      initial: {
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: 0.88,
      },
      whileInView: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      },
      viewport: { once: false, amount: 0.15 },
      transition: {
        duration: 1.35, // Reduced speed: calm, luxurious diagonal travel
        delay: order * 0.055, // Short interval staggered sequence
        ease: [0.16, 1, 0.3, 1] as const, // Smooth deceleration curve
      },
    };
  };

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
          <motion.div
            {...getDiagonalProps(0.82, 0.55, 0)}
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
          </motion.div>
        </div>

        {/* COLUMN 2: 2 Uneven Cards (Tall Portrait on Top, Landscape on Bottom) */}
        <div className="flex flex-col justify-end gap-4 sm:gap-5">
          {/* Card 2: Tall Portrait (aspect-[3/4]) */}
          <motion.div
            {...getDiagonalProps(0.62, 0.85, 1)}
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
          </motion.div>

          {/* Card 3: Landscape (aspect-[4/3]) */}
          <motion.div
            {...getDiagonalProps(0.62, 0.55, 2)}
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
          </motion.div>
        </div>

        {/* COLUMN 3: 2 Uneven Cards (Square on Top, Tall Portrait on Bottom) */}
        <div className="flex flex-col justify-end gap-4 sm:gap-5">
          {/* Card 4: Square (aspect-square) */}
          <motion.div
            {...getDiagonalProps(0.42, 0.85, 3)}
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
          </motion.div>

          {/* Card 5: Tall Portrait (aspect-[3/4]) */}
          <motion.div
            {...getDiagonalProps(0.42, 0.55, 4)}
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
          </motion.div>
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
          <motion.div
            {...getDiagonalProps(0.22, 0.55, 5)}
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
          </motion.div>
        </div>

        {/* COLUMN 5: 3 Uneven Cards (Landscape on Top, Very Tall Portrait in Middle, Wide Landscape on Bottom) */}
        <div className="flex flex-col justify-end gap-4 sm:gap-5">
          {/* Card 7: Landscape (aspect-[4/3]) */}
          <motion.div
            {...getDiagonalProps(0.05, 0.85, 6)}
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
          </motion.div>

          {/* Card 8: Tall Vertical (aspect-[2/3]) */}
          <motion.div
            {...getDiagonalProps(0.05, 0.55, 7)}
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
          </motion.div>

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
        {/* COLUMN 1: Tall Portrait (aspect-[3/4]) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <motion.div
            {...getDiagonalProps(0.82, 0.32, 8)}
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
          </motion.div>
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
          <motion.div
            {...getDiagonalProps(0.42, 0.32, 9)}
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
          </motion.div>

          {/* Row 3 Final Card */}
          <motion.div
            {...getDiagonalProps(0.42, 0.10, 10)}
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
          </motion.div>
        </div>

        {/* COLUMN 4: Dramatic Tall Portrait (aspect-[2/3]) + Sleek Wide Landscape (aspect-[16/9]) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <motion.div
            {...getDiagonalProps(0.22, 0.32, 11)}
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
          </motion.div>

          {/* Row 3 Final Card */}
          <motion.div
            {...getDiagonalProps(0.22, 0.10, 12)}
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
          </motion.div>
        </div>

        {/* COLUMN 5: Balanced Square (aspect-square) + Balanced Square (aspect-square) */}
        <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
          {/* Row 2 Card */}
          <motion.div
            {...getDiagonalProps(0.05, 0.30, 13)}
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
          </motion.div>

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
