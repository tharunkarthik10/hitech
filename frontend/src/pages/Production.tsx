import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowUpRight, ShieldCheck, 
  Settings, X, Send, Sparkles,
} from 'lucide-react';
import SplitTriptychShowcase from '../components/SplitTriptychShowcase';
import { FacilityArchiveDiagonalGallery } from '../components/FacilityArchiveDiagonalGallery';
import { ManufacturingWorkflowInfographic } from '../components/ManufacturingWorkflowInfographic';

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
    <main className="w-full min-h-screen bg-white text-[#121212] font-sans pt-20 sm:pt-24 pb-20 selection:bg-[#121212] selection:text-white overflow-x-clip">
      
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
        {/* 05. FACILITY ARCHIVE DIAGONAL REVEAL GALLERY */}
        {/* ========================================================================= */}
        <FacilityArchiveDiagonalGallery openQuoteModal={openQuoteModal} />

        {/* ========================================================================= */}
        {/* 06. SPLIT TRIPTYCH SHOWCASE (3-SECTION PARALLAX SCROLL REVEAL) */}
        {/* ========================================================================= */}
        <SplitTriptychShowcase />

        {/* ========================================================================= */}
        {/* 07. WORKFLOW / OUR PROCESS INFOGRAPHIC */}
        {/* ========================================================================= */}
        <ManufacturingWorkflowInfographic openQuoteModal={openQuoteModal} />

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
