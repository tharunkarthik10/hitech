import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ManufacturingWorkflowInfographicProps {
  className?: string;
  openQuoteModal?: (source: string) => void;
}

interface WorkflowStageData {
  step: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  specs: string;
}

const STAGES: WorkflowStageData[] = [
  {
    step: "01",
    title: "Brief",
    tagline: "Telemetry & RFQ Alignment",
    desc: "Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&T) alignment, and serialized volume targets.",
    image: "/workflow_brief.jpg",
    specs: "3D CAD Digital Twin • GD&T Alignment • < 24h Turnaround",
  },
  {
    step: "02",
    title: "Research",
    tagline: "Metallurgy & CAM Optimization",
    desc: "Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.",
    image: "/workflow_research.jpg",
    specs: "Certified MTR Traceability • 5-Axis Toolpath • Zero Scrap",
  },
  {
    step: "03",
    title: "Study",
    tagline: "DFM & Robotic Automation",
    desc: "Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.",
    image: "/workflow_study.jpg",
    specs: "Robotic Arc Cells • 100% ECO Prevention • Cycle Simulation",
  },
  {
    step: "04",
    title: "Proposals",
    tagline: "Turnkey SLAs & Prototyping",
    desc: "Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.",
    image: "/workflow_proposals.jpg",
    specs: "FAI Verification • Transparent Milestones • Fixed Lot Pricing",
  },
  {
    step: "05",
    title: "Delivery",
    tagline: "Metrology & JIT Line-Feed",
    desc: "100% CMM coordinate validation, ultrasonic cleaning, and cleanroom protective vacuum packaging for direct OEM line assembly.",
    image: "/workflow_delivery.jpg",
    specs: "Sub-Micron CMM Audit • Cleanroom Packaged • JIT Dispatch",
  },
];

export const ManufacturingWorkflowInfographic: React.FC<ManufacturingWorkflowInfographicProps> = ({
  className = "",
  openQuoteModal,
}) => {
  // Currently active / hovered stage index
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeStage = STAGES[activeIndex];

  return (
    <section
      id="workflow"
      className={`w-full py-10 sm:py-16 text-[#121212] ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. Header Block - MATCHING PRODUCTION / INFRA SECTION STYLING             */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="space-y-3 max-w-3xl">
          <span className="text-sm font-medium tracking-tight text-[#64748b]">
            ✦ Section 07 — Our Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
            Our Workflow.<br />
            <span className="font-normal text-[#64748b]">Contract Manufacturing Process &amp; Lifecycle.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed pt-1">
            Hover over any stage to inspect the engineering methodology, digital twin telemetry, and coordinate inspection protocols.
          </p>
        </div>

        {openQuoteModal && (
          <button
            onClick={() => openQuoteModal("Workflow Consultation")}
            className="self-start md:self-end px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <span>Consult Engineering Team</span>
            <span>↗</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. FULL LEFT-SIDE IMAGE + EDITORIAL HOVER ROWS (MATCHING REFERENCE)       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: FULL-SIZE STAGE IMAGE (Sticky on Desktop)                  */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg bg-[#121212]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.step}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeStage.image}
                  alt={`Stage ${activeStage.step} - ${activeStage.title}`}
                  className="w-full h-full object-cover object-center block"
                  loading="eager"
                />

                {/* Subtle vignette for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge: Active Stage Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-medium border border-white/15 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] animate-pulse" />
                    Stage {activeStage.step} • {activeStage.title}
                  </span>
                </div>

                {/* Bottom Overlay: Stage Specs & Quick Action */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3 text-white">
                  <div className="space-y-0.5 max-w-xs">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                      {activeStage.tagline}
                    </p>
                    <p className="text-xs text-white/90 font-medium">
                      {activeStage.specs}
                    </p>
                  </div>

                  {openQuoteModal && (
                    <button
                      type="button"
                      onClick={() => openQuoteModal(`Stage ${activeStage.step}: ${activeStage.title}`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#121212] hover:bg-white/90 text-xs font-semibold tracking-tight transition-all active:scale-95 shadow-md shrink-0 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: CLEAN EDITORIAL ROWS (IMAGE 1 MINIMALIST STYLE)           */}
        {/* ======================================================================= */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-gray-200 border-t border-b border-gray-200">
          {STAGES.map((stage, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={stage.step}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group transition-all duration-300 cursor-pointer py-6 sm:py-7 px-3 sm:px-5 flex items-start gap-4 sm:gap-6 ${
                  isActive
                    ? "bg-white shadow-2xs"
                    : "hover:bg-gray-50/70 opacity-70 hover:opacity-100"
                }`}
              >
                {/* Step Number (01, 02, etc.) */}
                <span
                  className={`text-base sm:text-lg font-bold tracking-tight transition-colors pt-0.5 shrink-0 ${
                    isActive
                      ? "text-[#121212]"
                      : "text-gray-400 group-hover:text-gray-700"
                  }`}
                >
                  {stage.step}
                </span>

                {/* Title & Description */}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3
                      className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all ${
                        isActive
                          ? "text-[#121212] translate-x-1"
                          : "text-gray-800 group-hover:text-black"
                      }`}
                    >
                      {stage.title}
                    </h3>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#006494] text-[10px] font-medium border border-blue-200/80">
                        Active
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                      isActive
                        ? "text-gray-700 font-normal"
                        : "text-gray-500 font-normal"
                    }`}
                  >
                    {stage.desc}
                  </p>
                </div>

                {/* Action Indicator Icon */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-1 ${
                    isActive
                      ? "bg-[#121212] text-white rotate-45 scale-105 shadow-xs"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-700"
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
