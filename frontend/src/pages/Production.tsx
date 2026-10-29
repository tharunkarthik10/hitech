import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowUpRight, ShieldCheck, 
  Settings, X, Send, Sparkles,
} from 'lucide-react';
import SplitTriptychShowcase from '../components/SplitTriptychShowcase';

/**
 * THREE UNIFIED TYPOGRAPHIC STYLES (MATCHING USER'S EXACT REFERENCE):
 * 1. Bold Headline: font-bold tracking-tight text-[#121212] (or text-white on dark)
 * 2. Muted Sub-headline: font-normal tracking-tight text-[#64748b] (or text-white/70 on dark)
 * 3. Body / Paragraph: font-normal text-sm sm:text-base text-[#475569] leading-relaxed (or text-white/80 on dark)
 */

export default function Production() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openQuoteModal = (subject: string) => {
    setQuoteSubject(subject);
    setIsQuoteModalOpen(true);
  };


  return (
    <main className="w-full min-h-screen bg-white text-[#121212] font-sans pt-20 sm:pt-24 pb-20 selection:bg-[#121212] selection:text-white overflow-x-hidden">
      
      {/* Site-wide Container Matching Manufacturing and Home Page */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 space-y-12 lg:space-y-16">

        {/* ========================================================================= */}
        {/* 01. HERO SECTION (Giant Soltera-Style Watermark & Floating Metric Dock) */}
        {/* ========================================================================= */}
        <section className="relative -mx-[0.5cm]" style={{ marginLeft: '-0.5cm', marginRight: '-0.5cm' }}>
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl sm:rounded-[22px] overflow-hidden relative shadow-xl min-h-[608px] sm:min-h-[684px] lg:min-h-[722px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-white bg-black border border-gray-900"
          >
            {/* Background Looping Production Video */}
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="/hero_precision_bloom.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/boomerang_production.mp4" type="video/mp4" />
                <source src="/boomerang_laser.mp4" type="video/mp4" />
                <source src="/hero_boomerang.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />
            </div>

            {/* Bottom Hero Area: Left Headline + Right Floating Metric Card */}
            <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-10 sm:pt-14">
              
              {/* Left Headline & Intro Statement */}
              <div className="max-w-xl space-y-3">
                <div className="flex items-center gap-2 text-white/90">
                  <Sparkles className="w-4 h-4 text-[#00A6FB]" />
                  <span className="text-sm font-medium tracking-tight text-white/80">Turnkey Contract Manufacturing</span>
                </div>

                <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-lg">
                  Conveyor-driven assembly lines, articulated robotic fastening cells, and synchronized Kanban supply staging engineered for zero-defect OEM reliability.
                </p>

                <div className="flex items-center gap-3">
                  <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-tight">
                    Scale Your Production
                  </h1>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Right Floating Metric Card: 100k+ Units */}
              <div className="shrink-0 self-start lg:self-end">
                <div className="bg-white/95 text-gray-900 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md min-w-[170px] sm:min-w-[220px] max-w-[260px] space-y-1.5 border border-white">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] leading-none">
                    100k+ Units
                  </div>
                  <p className="text-sm text-[#64748b] font-normal leading-relaxed">
                    Monthly turnkey contract manufacturing throughput across 3 certified units.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 02. "THE BENEFITS OF TURNKEY ASSEMBLY" (Value Statement & 2 Cards) */}
        {/* ========================================================================= */}
        <section id="benefits" className="space-y-8 sm:space-y-10">
          
          {/* Header Row: Left Kicker, Right Editorial Title, Subtitle & Button */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            {/* Left Kicker */}
            <div className="lg:col-span-4">
              <span className="text-sm font-medium tracking-tight text-[#64748b]">
                ✦ The Benefits of Turnkey Assembly
              </span>
            </div>

            {/* Right Editorial Block */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121212] leading-[1.18]">
                  Eliminate production bottlenecks and secure stable assembly throughput.
                </h2>
                <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#64748b] leading-[1.18] mt-1">
                  Trust an integrated partner to deliver zero-defect sub-assemblies and complete boxed units.
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
                Turnkey contract manufacturing eliminates capital expenditure risks, operator line balancing hurdles, and staging overhead. HiTech provides dedicated workstations, automated torque logging, and continuous Kanban replenishment backed by 100% FAT verification.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => openQuoteModal("Turnkey Assembly Consultation")}
                  className="px-6 py-3 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2.5 cursor-pointer active:scale-95"
                >
                  <span>Get in touch</span>
                  <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05. EDITORIAL ASYMMETRIC GALLERY (NOIR ARCHIVE TEMPLATE) */}
        {/* ========================================================================= */}
        <motion.section 
          id="gallery"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 sm:pt-10 border-t border-gray-200/80"
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
                  Beyond Limits.<br />
                  <span className="font-normal text-[#64748b]">Pure Precision.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-sm">
                  Vibrant factory snapshots capturing micron machining, robotic welding, and high-speed laser profiling in full color.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal("Gallery Program Inquiries & Facility Tours")}
                    className="px-6 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>See the Stories</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Card: Landscape (aspect-[4/3]) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Heavy Structural Gantry Milling")}
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
              </div>
            </div>

            {/* COLUMN 2: 2 Uneven Cards (Tall Portrait on Top, Landscape on Bottom) */}
            <div className="flex flex-col justify-end gap-4 sm:gap-5">
              {/* Card 2: Tall Portrait (aspect-[3/4]) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: 5-Axis Aerospace Spindle Milling")}
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
              </div>

              {/* Card 3: Landscape (aspect-[4/3]) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Precision CNC Lathe Turning")}
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
              </div>
            </div>

            {/* COLUMN 3: 2 Uneven Cards (Square on Top, Tall Portrait on Bottom) */}
            <div className="flex flex-col justify-end gap-4 sm:gap-5">
              {/* Card 4: Square (aspect-square) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: High-Power Fiber Laser Cutting")}
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
              </div>

              {/* Card 5: Tall Portrait (aspect-[3/4]) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: 5-Axis Spiral Impeller Sculpting")}
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
              </div>
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
              <div
                onClick={() => openQuoteModal("Program Inquiry: Zeiss Bridge CMM Metrology Lab")}
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
              </div>
            </div>

            {/* COLUMN 5: 3 Uneven Cards (Landscape on Top, Very Tall Portrait in Middle, Wide Landscape on Bottom) */}
            <div className="flex flex-col justify-end gap-4 sm:gap-5">
              {/* Card 7: Landscape (aspect-[4/3]) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Hydraulic Press Brake Bending")}
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
              </div>

              {/* Card 8: Tall Vertical (aspect-[2/3]) */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Automated Robotic Welding Cell")}
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
              </div>

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
              <div
                onClick={() => openQuoteModal("Program Inquiry: Advanced Facility Infrastructure & Plant Bed")}
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
              </div>
            </div>

            {/* COLUMN 2: Sleek Free-standing Arrow Highlights in the Gap */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2: Free-standing Arrow Highlights in the Gap (No box) */}
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
              <div
                onClick={() => openQuoteModal("Program Inquiry: Automated Dual-Bed Pallet Shuttle")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
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
              </div>

              {/* Row 3 Final Card */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Automated Robotic Pick & Place Cell")}
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
              </div>
            </div>

            {/* COLUMN 4: Dramatic Tall Portrait (aspect-[2/3]) + Sleek Wide Landscape (aspect-[16/9]) */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2 Card */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Heavy Structural Rig Weldments")}
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
              </div>

              {/* Row 3 Final Card */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Modular Workstation Production Cells")}
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
              </div>
            </div>

            {/* COLUMN 5: Balanced Square (aspect-square) + Balanced Square (aspect-square) */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2 Card */}
              <div
                onClick={() => openQuoteModal("Program Inquiry: Certified Global Packaging & Dispatch")}
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
              </div>

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
                    onClick={() => openQuoteModal("Direct Engineering Consultation & Rapid RFQ")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-[#121212] hover:text-black hover:underline cursor-pointer"
                  >
                    <span>Start Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 06. SPLIT TRIPTYCH SHOWCASE (3-SECTION PARALLAX SCROLL REVEAL) */}
        {/* ========================================================================= */}
        <SplitTriptychShowcase />

      </div>

      {/* ========================================================================= */}
      {/* VIDEO PREVIEW MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-video flex items-center justify-center"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                title="Close Video"
              >
                <X className="w-5 h-5" />
              </button>

              <video 
                autoPlay 
                loop 
                controls 
                className="w-full h-full object-cover"
              >
                <source src="/boomerang_production.mp4" type="video/mp4" />
                <source src="/boomerang_laser.mp4" type="video/mp4" />
                <source src="/hero_boomerang.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* RFQ / QUOTE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors text-gray-500 cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 mb-6">
                <span className="text-sm font-medium tracking-tight text-[#64748b]">
                  Production Inquiries
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-[#121212]">
                  Request Production Quote
                </h3>
                <p className="text-sm text-[#475569] font-normal leading-relaxed">
                  Submit CAD specifications and production volume targets for prompt feasibility review.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your production inquiry has been received. Our team will contact you within 24 hours.");
                  setIsQuoteModalOpen(false);
                }}
                className="space-y-4 text-left"
              >
                <div>
                  <label className="block text-sm font-medium tracking-tight text-[#121212] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium tracking-tight text-[#121212] mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium tracking-tight text-[#121212] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium tracking-tight text-[#121212] mb-1">
                    Project / Line Subject
                  </label>
                  <input
                    type="text"
                    defaultValue={quoteSubject || "High-Volume Production Program"}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium tracking-tight text-[#121212] mb-1">
                    Target Volume &amp; Specifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details on monthly unit volume, tolerances, assembly steps, and timelines..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal placeholder-gray-400 resize-none bg-gray-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Production Inquiry</span>
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
