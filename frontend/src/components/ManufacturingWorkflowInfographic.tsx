import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

interface ManufacturingWorkflowInfographicProps {
  className?: string;
  openQuoteModal?: (source: string) => void;
}

interface WorkflowStageData {
  step: string;
  title: string;
  tagline: string;
  desc1: string;
  summary: string;
  image: string;
  specs: string;
}

const STAGES: WorkflowStageData[] = [
  {
    step: "01",
    title: "Brief",
    tagline: "Telemetry, RFQ review, and 3D digital geometry alignment.",
    desc1: "Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&T) alignment, and serialized volume targets.",
    summary: "Our engineering desk reviews native STEP, IGES, and Parasolid digital models to verify draft angles, material yield, and critical datum planes before issuing production validation.",
    image: "/workflow_brief.jpg",
    specs: "3D CAD Digital Twin • GD&T Alignment • < 24h Turnaround",
  },
  {
    step: "02",
    title: "Research",
    tagline: "Metallurgy selection, heat-treat scheduling, and CAM optimization.",
    desc1: "Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.",
    summary: "Comprehensive alloy grain structure analysis, heat-treatment scheduling, and 5-axis CNC toolpath simulations engineered for sub-micron surface finishes (Ra < 0.2µm) with zero scrap margin.",
    image: "/workflow_research.jpg",
    specs: "Certified MTR Traceability • 5-Axis Toolpath • Zero Scrap",
  },
  {
    step: "03",
    title: "Study",
    tagline: "DFM verification, custom fixture engineering, and robotic cell balancing.",
    desc1: "Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.",
    summary: "Digital twin feasibility, custom hydraulic fixture engineering, and robotic cell line-balancing to eliminate unforced engineering change orders (ECOs) once tooling cut commences.",
    image: "/workflow_study.jpg",
    specs: "Robotic Arc Cells • 100% ECO Prevention • Cycle Simulation",
  },
  {
    step: "04",
    title: "Proposals",
    tagline: "Turnkey quotations, serialized pricing, and SLA milestones.",
    desc1: "Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.",
    summary: "Turnkey commercial quotation, serialized batch pricing, transparent lead-time SLA milestones, and First-Article Inspection (FAI) protocols tailored to your delivery schedule.",
    image: "/workflow_proposals.jpg",
    specs: "FAI Verification • Transparent Milestones • Fixed Lot Pricing",
  },
  {
    step: "05",
    title: "Delivery",
    tagline: "Coordinate validation, ultrasonic cleaning, and JIT line dispatch.",
    desc1: "100% CMM coordinate validation, ultrasonic cleaning, and cleanroom protective vacuum packaging.",
    summary: "Climate-controlled 3D CMM coordinate inspection, ultrasonic cleaning, cleanroom vacuum sealing, and Just-In-Time (JIT) direct line-feed dispatch with full metallurgical test certification reports.",
    image: "/workflow_delivery.jpg",
    specs: "Sub-Micron CMM Audit • Cleanroom Packaged • JIT Dispatch",
  },
];

export const ManufacturingWorkflowInfographic: React.FC<ManufacturingWorkflowInfographicProps> = ({
  className = "",
  openQuoteModal,
}) => {
  // All sections start closed by default (null); opens only when hovered or tapped
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="workflow"
      className={`w-full py-10 sm:py-16 text-[#121212] ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. Header Block - MATCHING EXACT SITE EDITORIAL TYPOGRAPHY                */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div className="space-y-3 max-w-3xl">
          <span className="text-sm font-medium tracking-tight text-[#64748b]">
            ✦ Section 07 — Our Workflow
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.18]">
              Our Workflow.
            </h2>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#64748b] leading-[1.18] mt-1">
              Contract Manufacturing Process &amp; Lifecycle.
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed pt-1 max-w-2xl">
            Hover over any stage to inspect the technical engineering protocols, DFM audits, SLA verification metrics, and coordinate-validated milestones.
          </p>
        </div>

        {openQuoteModal && (
          <button
            onClick={() => openQuoteModal("Workflow Consultation")}
            className="self-start md:self-end px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-medium tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <span>Consult Engineering Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL ROWS (ALL CLOSED INITIALLY, BUTTER-SMOOTH HOVER EXPANSION)   */}
      {/* ========================================================================= */}
      <div 
        onMouseLeave={() => setActiveIndex(null)}
        className="w-full border-t border-gray-200"
      >
        {STAGES.map((stage, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={stage.step}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex((prev) => (prev === idx ? null : idx))}
              className={`group border-b border-gray-200 transition-colors duration-200 cursor-pointer py-6 sm:py-7 px-2 sm:px-4 rounded-2xl ${
                isActive
                  ? "bg-white shadow-2xs"
                  : "hover:bg-gray-50/70 opacity-80 hover:opacity-100"
              }`}
            >
              {/* Top Row Header: Always Visible */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                
                {/* Column 1: Step Number (01, 02, etc.) */}
                <div className="md:col-span-1 flex items-center pt-1">
                  <span
                    className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                      isActive
                        ? "text-[#121212]"
                        : "text-[#64748b] group-hover:text-[#121212]"
                    }`}
                  >
                    {stage.step}
                  </span>
                </div>

                {/* Column 2: Title & Tagline */}
                <div className="md:col-span-4 space-y-1">
                  <div className="flex items-center gap-3">
                    <h3
                      className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all leading-[1.18] ${
                        isActive
                          ? "text-[#121212] translate-x-1"
                          : "text-[#121212] group-hover:text-black"
                      }`}
                    >
                      {stage.title}
                    </h3>
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-[#121212] text-[11px] font-medium border border-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#121212] animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-normal tracking-tight text-[#64748b] leading-[1.18]">
                    {stage.tagline}
                  </div>
                </div>

                {/* Column 3: Primary Summary Text */}
                <div className="md:col-span-6">
                  <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
                    {stage.desc1}
                  </p>
                </div>

                {/* Column 4: Expansion Chevron */}
                <div className="md:col-span-1 flex md:justify-end items-start pt-1">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#121212] text-white rotate-90 scale-105 shadow-xs"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-700"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 transition-transform" />
                  </div>
                </div>

              </div>

              {/* Opened Section: Buttery Smooth Height Animation (Zero padding on outer motion container) */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="expanded-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.28, ease: "easeOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 pb-2">
                      {/* Elongated Horizontal Layout: Left Text (lg:col-span-5), Wide Image on Right (lg:col-span-7) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-gray-50/70 rounded-2xl p-5 sm:p-7 border border-gray-200/80">
                        
                        {/* Left Side (Col 5): Clean, Concise Summary of the Image & Stage */}
                        <div className="lg:col-span-5 space-y-4">
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-[#121212] uppercase tracking-wider block">
                              Stage {stage.step} Process &amp; Telemetry
                            </span>
                            <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
                              {stage.summary}
                            </p>
                          </div>

                          {/* Specs & Stage Consultation Button */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200/80">
                            <span className="text-xs font-normal text-[#64748b] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#64748b]" />
                              {stage.specs}
                            </span>

                            {openQuoteModal && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openQuoteModal(`Stage ${stage.step}: ${stage.title} Consultation`);
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-medium tracking-tight transition-all active:scale-95 shadow-xs cursor-pointer"
                              >
                                <span>Initiate Stage {stage.step}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Right Side (Col 7): WIDE ELONGATED HORIZONTAL IMAGE */}
                        <div className="lg:col-span-7 relative w-full h-[220px] sm:h-[270px] lg:h-[290px] rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm bg-black">
                          <img
                            src={stage.image}
                            alt={`Stage ${stage.step} - ${stage.title}`}
                            className="w-full h-full object-cover object-center block absolute inset-0"
                            loading="lazy"
                          />
                          {/* Gradient Vignette for Text Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Image Pill Badge */}
                          <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between text-white">
                            <span className="text-xs font-normal tracking-tight text-white/95 drop-shadow-sm">
                              {stage.title} • {stage.tagline}
                            </span>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 font-normal">
                              Stage {stage.step}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>
    </section>
  );
};
