import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";

interface ManufacturingWorkflowInfographicProps {
  className?: string;
  openQuoteModal?: (source: string) => void;
}

interface WorkflowStageData {
  step: string;
  title: string;
  tagline: string;
  desc1: string;
  desc2: string;
  deliverables: string[];
  metrics: string;
}

const STAGES: WorkflowStageData[] = [
  {
    step: "01",
    title: "Brief",
    tagline: "Telemetry, RFQ & Digital Geometry Alignment",
    desc1: "Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&T) alignment, and serialized volume targets.",
    desc2: "Our engineering desk reviews native STEP, IGES, and Parasolid models to verify draft angles, material yield, and critical datum planes before issuing production validation.",
    deliverables: [
      "3D CAD model audit (STEP/IGES)",
      "GD&T datum & tolerance verification",
      "Material specification & hardness check",
      "Serialized annual volume targets",
    ],
    metrics: "Turnaround: < 24 Hours • Feasibility Scorecard",
  },
  {
    step: "02",
    title: "Research",
    tagline: "Metallurgy, Heat-Treat & CAM Optimization",
    desc1: "Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.",
    desc2: "Comprehensive analysis of alloy grain structures, thermal expansion characteristics, and multi-axis CNC toolpath optimization for minimal machine cycle times.",
    deliverables: [
      "Certified raw material sourcing (MTR)",
      "FEA stress & thermal load modeling",
      "5-axis CNC toolpath simulation",
      "Secondary finishing & coating roadmap",
    ],
    metrics: "Zero Scrap Margin • Certified Mill Traceability",
  },
  {
    step: "03",
    title: "Study",
    tagline: "DFM Audits & Robotic Cell Line-Balancing",
    desc1: "Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.",
    desc2: "Digital twin feasibility and FEA stress testing ensure zero unforced engineering change orders (ECOs) once tooling cut commences.",
    deliverables: [
      "Design for Manufacturability (DFM) Dossier",
      "Robotic weld cell cycle simulation",
      "Custom hydraulic fixture blueprints",
      "Kinematic interference clearance",
    ],
    metrics: "100% ECO Prevention • Optimized Cycle Times",
  },
  {
    step: "04",
    title: "Proposals",
    tagline: "Commercial Engineering, SLA & Prototype Protocols",
    desc1: "Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.",
    desc2: "First-article inspection (FAI) protocols and customized Kanban staging buffers tailored to client intake schedules.",
    deliverables: [
      "Turnkey tiered batch quotation",
      "First-Article Inspection (FAI) protocol",
      "Kanban buffer scheduling agreements",
      "Guaranteed lead-time SLA milestones",
    ],
    metrics: "Transparent SLA Milestones • Fixed Lot Pricing",
  },
  {
    step: "05",
    title: "Delivery",
    tagline: "Coordinate Validation, Packing & JIT Dispatch",
    desc1: "100% CMM coordinate validation, ultrasonic cleaning, and cleanroom protective vacuum packaging.",
    desc2: "JIT serialized delivery directly to OEM assembly lines with full metallurgical test certification reports.",
    deliverables: [
      "100% CMM coordinate inspection certificate",
      "Ultrasonic degreasing & cleanroom packaging",
      "Barcode-serialized box & pallet labelling",
      "Just-In-Time (JIT) direct line-feed dispatch",
    ],
    metrics: "Zero-Defect Guarantee • Full Mill Test Reports",
  },
];

export const ManufacturingWorkflowInfographic: React.FC<ManufacturingWorkflowInfographicProps> = ({
  className = "",
  openQuoteModal,
}) => {
  // Currently active / hovered stage index (defaults to stage 0: Brief)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      id="workflow"
      className={`w-full py-10 sm:py-16 text-[#121212] ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. Header Block - MATCHING PRODUCTION / INFRA SECTION STYLING             */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div className="space-y-3 max-w-3xl">
          <span className="text-sm font-medium tracking-tight text-[#64748b]">
            ✦ Section 07 — Our Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
            Our Workflow.<br />
            <span className="font-normal text-[#64748b]">Contract Manufacturing Process &amp; Lifecycle.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed pt-1">
            Hover over any stage to inspect the technical engineering protocols, DFM audits, SLA verification metrics, and coordinate-validated milestones.
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
      {/* 2. MINIMALIST EDITORIAL EXPANDING ACCORDION ROWS (REFERENCE IMAGE STYLE) */}
      {/* ========================================================================= */}
      <div className="w-full border-t border-gray-200">
        {STAGES.map((stage, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={stage.step}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`group border-b border-gray-200 transition-all duration-300 cursor-pointer py-6 sm:py-8 px-2 sm:px-4 rounded-xl ${
                isActive
                  ? "bg-white shadow-xs"
                  : "hover:bg-gray-50/60 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                
                {/* Column 1: Step Number (01, 02, etc.) */}
                <div className="md:col-span-1 flex items-center pt-1">
                  <span
                    className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                      isActive
                        ? "text-[#121212]"
                        : "text-gray-400 group-hover:text-gray-700"
                    }`}
                  >
                    {stage.step}
                  </span>
                </div>

                {/* Column 2: Title & Tagline */}
                <div className="md:col-span-4 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all ${
                        isActive
                          ? "text-[#121212] translate-x-1"
                          : "text-gray-800 group-hover:text-black"
                      }`}
                    >
                      {stage.title}
                    </h3>
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Stage
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? "text-[#00A6FB]" : "text-gray-400"
                    }`}
                  >
                    {stage.tagline}
                  </p>
                </div>

                {/* Column 3: Description & Expandable Scope */}
                <div className="md:col-span-6 space-y-3">
                  {/* Primary Summary Text */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed transition-colors ${
                      isActive
                        ? "text-gray-800 font-normal"
                        : "text-gray-500 font-normal"
                    }`}
                  >
                    {stage.desc1}
                  </p>

                  {/* Expandable Technical Scope (Smooth Height Animation on Hover / Tap) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="expanded-scope"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-2 space-y-4"
                      >
                        {/* Secondary Engineering Deep Dive */}
                        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                          {stage.desc2}
                        </p>

                        {/* Deliverables Grid */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                            Stage Deliverables &amp; Verification Protocols
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {stage.deliverables.map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/80 text-xs text-gray-700 font-medium"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SLA Metrics & Direct Modal Trigger */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                            {stage.metrics}
                          </span>

                          {openQuoteModal && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openQuoteModal(`Stage ${stage.step}: ${stage.title} Consultation`);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-medium tracking-tight transition-all active:scale-95 shadow-xs cursor-pointer"
                            >
                              <span>Initiate Stage {stage.step}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Column 4: Action / Expansion Indicator Icon */}
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
            </div>
          );
        })}
      </div>
    </section>
  );
};
