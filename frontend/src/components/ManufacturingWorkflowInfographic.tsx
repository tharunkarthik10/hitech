import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ManufacturingWorkflowInfographicProps {
  className?: string;
  openQuoteModal?: (source: string) => void;
}

interface WorkflowStageData {
  id: string;
  step: string;
  title: string;
  tagline: string;
  kpi: string;
  desc1: string;
  desc2?: string;
  nodeX: number;
  nodeY: number;
  nodeR: number;
}

const STAGES: WorkflowStageData[] = [
  {
    id: "brief",
    step: "01",
    title: "Brief",
    tagline: "RFQ & Geometry Feasibility",
    kpi: "24h RFQ Assessment",
    desc1: "Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&T) alignment, and serialized volume targets.",
    nodeX: 340,
    nodeY: 340,
    nodeR: 31,
  },
  {
    id: "research",
    step: "02",
    title: "Research",
    tagline: "Metallurgy & Tooling Map",
    kpi: "Certified Alloy Mapping",
    desc1: "Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.",
    nodeX: 340,
    nodeY: 480,
    nodeR: 52,
  },
  {
    id: "study",
    step: "03",
    title: "Study",
    tagline: "DFM & Cell Line Balancing",
    kpi: "Zero-Tolerance FEA Simulation",
    desc1: "Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.",
    desc2: "Digital twin feasibility and FEA stress testing ensure zero unforced engineering change orders.",
    nodeX: 680,
    nodeY: 360,
    nodeR: 48,
  },
  {
    id: "proposals",
    step: "04",
    title: "Proposals",
    tagline: "Turnkey Quotation & Milestones",
    kpi: "Fixed Serial Turnkey SLA",
    desc1: "Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.",
    desc2: "First-article inspection (FAI) protocols and customized Kanban staging buffers tailored to client intake schedules.",
    nodeX: 1000,
    nodeY: 450,
    nodeR: 48,
  },
  {
    id: "delivery",
    step: "05",
    title: "Delivery",
    tagline: "Zero-Defect FAT & Serial JIT",
    kpi: "100% CMM Validation & JIT",
    desc1: "100% CMM coordinate validation, ultrasonic cleaning, and cleanroom protective vacuum packaging.",
    desc2: "JIT serialized delivery directly to OEM assembly lines with full metallurgical test certification reports.",
    nodeX: 1310,
    nodeY: 380,
    nodeR: 45,
  },
];

export const ManufacturingWorkflowInfographic: React.FC<ManufacturingWorkflowInfographicProps> = ({
  className = "",
  openQuoteModal,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through the 5 stages sequentially to make the diagram feel continuous & dynamic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeStage = STAGES[activeStageIndex];

  // Continuous fluid conduit path coordinates (20% enlarged canvas)
  const conduitD = `
    M 90, 200
    L 170, 200
    C 260, 200  330, 230  340, 290
    L 340, 520
    C 340, 630  440, 660  530, 660
    C 610, 660  680, 610  680, 500
    L 680, 300
    C 680, 150  1000, 150 1000, 300
    L 1000, 520
    C 1000, 630 1090, 660 1170, 660
    C 1240, 660 1310, 600 1310, 490
    C 1310, 380 1370, 240 1450, 200
  `;

  // Iterative feedback dashed loop path at bottom of proposals arch
  const feedbackLoopD = `
    M 690, 460
    C 690, 550  760, 595  840, 595
    C 920, 595  990, 550  990, 470
  `;

  return (
    <section
      id="workflow"
      className={`w-full py-8 sm:py-14 text-[#121212] overflow-hidden ${className}`}
    >
      {/* Inline styles for fluid SVG animations */}
      <style>{`
        @keyframes pulseConduitSignal {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes flowLoopFeedback {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -32; }
        }
        @keyframes radarExpand {
          0% { r: 30px; opacity: 0.85; stroke-width: 3px; }
          100% { r: 72px; opacity: 0; stroke-width: 1px; }
        }
        @keyframes walkerPacing {
          0%, 100% { transform: translate(825px, 146px) translateY(0px); }
          50% { transform: translate(829px, 146px) translateY(-2px); }
        }
        @keyframes shadowStretch {
          0%, 100% { transform: scaleX(1); opacity: 0.85; }
          50% { transform: scaleX(1.1); opacity: 0.72; }
        }
        .animate-conduit-signal {
          stroke-dasharray: 24 220;
          animation: pulseConduitSignal 5.5s linear infinite;
        }
        .animate-feedback-loop {
          stroke-dasharray: 8 8;
          animation: flowLoopFeedback 2.2s linear infinite;
        }
        .animate-walker {
          animation: walkerPacing 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. Header Block - MATCHING EXACT SECTION TITLE STYLE (SECTION 06 / 05)   */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-tight text-[#64748b]">
              ✦ Section 07 — Our Workflow
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Interactive Sequence
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
            Our Workflow.<br />
            <span className="font-normal text-[#64748b]">Contract Manufacturing Process &amp; Lifecycle.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed pt-1">
            A disciplined, five-stage serialized pipeline engineered for rapid prototype validation, zero-defect machining, and scheduled JIT delivery.
          </p>
        </div>

        {/* Dynamic Controls: Stage Tabs & RFQ CTA */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Stage Quick Switcher Pills */}
          <div className="hidden lg:flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200 text-xs">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStageIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  activeStageIndex === idx
                    ? "bg-[#121212] text-white shadow-xs"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {s.step} {s.title}
              </button>
            ))}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? "Pause Auto Tour" : "Resume Auto Tour"}
              className="px-2 py-1.5 text-gray-500 hover:text-black transition-colors"
            >
              {isAutoPlaying ? "❚❚" : "▶"}
            </button>
          </div>

          {openQuoteModal && (
            <button
              onClick={() => openQuoteModal("Workflow Consultation")}
              className="px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
            >
              <span>Consult Engineering Team</span>
              <span>↗</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP / TABLET INFOGRAPHIC (+20% ENLARGED, DYNAMIC, ZERO OVERLAPS)   */}
      {/* ========================================================================= */}
      <div className="w-full hidden md:block select-none relative">
        {/* Active Stage Floating Banner Pill */}
        <div className="absolute top-0 right-4 z-10 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-200 shadow-md">
          <div className="w-3 h-3 rounded-full bg-[#E6392E] animate-ping" />
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#E6392E] uppercase tracking-wider block leading-none">
              Active Stage {activeStage.step}: {activeStage.title}
            </span>
            <span className="text-xs font-medium text-[#121212]">
              {activeStage.kpi}
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 1520 740"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Terminal Arrowhead */}
            <marker
              id="wf-terminal-arrow"
              viewBox="0 0 16 16"
              refX="11"
              refY="8"
              markerWidth="11"
              markerHeight="11"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 14 8 L 0 14 z" fill="#5F7D74" />
            </marker>

            {/* Loop Feedback Arrow */}
            <marker
              id="wf-loop-arrow"
              viewBox="0 0 12 12"
              refX="9"
              refY="6"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 10 6 L 0 10 z" fill="#718E85" />
            </marker>

            {/* Linear Glow for dynamic pulse tracer */}
            <linearGradient id="conduitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>

            {/* Radar Pulse Animation for Active Node */}
            <circle
              id="radar-ring"
              cx="0"
              cy="0"
              r="30"
              fill="none"
              stroke="#E6392E"
              strokeWidth="2"
              style={{ animation: "radarExpand 2.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite" }}
            />
          </defs>

          {/* 1. Horizontal Branch Divider between Brief & Research */}
          <line
            x1="70"
            y1="400"
            x2="340"
            y2="400"
            stroke="#5F7D74"
            strokeWidth="2.8"
          />

          {/* 2. Main Continuous Fluid Conduit Base Path (+20% stroke & geometry) */}
          <motion.path
            initial={{ pathLength: 0.88 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            d={conduitD}
            stroke="#5F7D74"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
            markerEnd="url(#wf-terminal-arrow)"
          />

          {/* 3. DYNAMIC TRAVELING SIGNAL (Glowing Pulse moving along the pipeline) */}
          <path
            d={conduitD}
            stroke="url(#conduitGlow)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
            className="animate-conduit-signal pointer-events-none"
          />

          {/* 4. Proposals Loop Dashed Feedback Route (DYNAMIC FLOWING) */}
          <path
            d={feedbackLoopD}
            stroke="#718E85"
            strokeWidth="2.6"
            fill="none"
            className="animate-feedback-loop"
            markerEnd="url(#wf-loop-arrow)"
          />

          {/* 5. Walking Silhouette Figure on Apex (+20% scaled with dynamic pacing) */}
          <g className="animate-walker">
            {/* Perspective Ground Shadow */}
            <g style={{ transformOrigin: "54px 4px" }} className="shadow-stretch">
              <ellipse
                cx="60"
                cy="4"
                rx="58"
                ry="5"
                transform="rotate(6, 60, 4)"
                fill="#121212"
                opacity="0.85"
              />
            </g>

            {/* Silhouette Body (+20% enlarged vector) */}
            <g fill="#121212" transform="scale(1.2)">
              {/* Head */}
              <circle cx="16" cy="-44" r="4.8" />
              {/* Torso & Suit Coat */}
              <path d="M 11 -37 C 13 -39, 19 -39, 21 -37 L 22 -19 L 11 -19 Z" />
              {/* Arms Swinging */}
              <path d="M 12 -34 L 6 -20" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 20 -34 L 26 -21" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" />
              {/* Trailing Leg */}
              <path d="M 13 -19 L 9 -3 L 5 13" stroke="#121212" strokeWidth="2.8" strokeLinecap="round" />
              {/* Forward Stride Leg */}
              <path d="M 19 -19 L 24 -2 L 31 14" stroke="#121212" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          </g>

          {/* 6. Coral-Red Circular Nodes of Distinct Dimensions (+20% Size with Radar Pings) */}
          {/* Start Node */}
          <circle cx="90" cy="200" r="22" fill="#E6392E" />

          {/* Dynamic Radar Ping on Active Stage Node */}
          <g transform={`translate(${activeStage.nodeX}, ${activeStage.nodeY})`}>
            <use href="#radar-ring" />
          </g>

          {/* Node 1: Brief Upper Connector */}
          <g
            onClick={() => {
              setActiveStageIndex(0);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ transformOrigin: "340px 340px" }}
          >
            <circle
              cx="340"
              cy="340"
              r="31"
              fill="#E6392E"
              stroke={activeStageIndex === 0 ? "#121212" : "none"}
              strokeWidth={activeStageIndex === 0 ? "3" : "0"}
            />
          </g>

          {/* Node 2: Research Lower Node (Large) */}
          <g
            onClick={() => {
              setActiveStageIndex(1);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ transformOrigin: "340px 480px" }}
          >
            <circle
              cx="340"
              cy="480"
              r="52"
              fill="#E6392E"
              stroke={activeStageIndex === 1 ? "#121212" : "none"}
              strokeWidth={activeStageIndex === 1 ? "3" : "0"}
            />
          </g>

          {/* Node 3: Study Arch Base Node */}
          <g
            onClick={() => {
              setActiveStageIndex(2);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ transformOrigin: "680px 360px" }}
          >
            <circle
              cx="680"
              cy="360"
              r="48"
              fill="#E6392E"
              stroke={activeStageIndex === 2 ? "#121212" : "none"}
              strokeWidth={activeStageIndex === 2 ? "3" : "0"}
            />
          </g>

          {/* Node 4: Proposals Loop Node */}
          <g
            onClick={() => {
              setActiveStageIndex(3);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ transformOrigin: "1000px 450px" }}
          >
            <circle
              cx="1000"
              cy="450"
              r="48"
              fill="#E6392E"
              stroke={activeStageIndex === 3 ? "#121212" : "none"}
              strokeWidth={activeStageIndex === 3 ? "3" : "0"}
            />
          </g>

          {/* Node 5: Delivery Rising Node */}
          <g
            onClick={() => {
              setActiveStageIndex(4);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ transformOrigin: "1310px 380px" }}
          >
            <circle
              cx="1310"
              cy="380"
              r="45"
              fill="#E6392E"
              stroke={activeStageIndex === 4 ? "#121212" : "none"}
              strokeWidth={activeStageIndex === 4 ? "3" : "0"}
            />
          </g>

          {/* ========================================================================= */}
          {/* 7. VECTOR TEXT BLOCKS (+20% LARGER TYPOGRAPHY, MATHEMATICALLY VERIFIED)   */}
          {/* ========================================================================= */}

          {/* STAGE 1: BRIEF */}
          <g
            onClick={() => {
              setActiveStageIndex(0);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer"
          >
            <text
              x="70"
              y="280"
              fill={activeStageIndex === 0 ? "#E6392E" : "#121212"}
              fontSize="24"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Brief
            </text>
            <text
              x="70"
              y="308"
              fill="#475569"
              fontSize="14"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="70" dy="0">Initial customer RFQ review, 3D CAD</tspan>
              <tspan x="70" dy="20.5">analysis, geometric dimensioning</tspan>
              <tspan x="70" dy="20.5">and tolerance (GD&amp;T) alignment,</tspan>
              <tspan x="70" dy="20.5">and serialized volume targets.</tspan>
            </text>
          </g>

          {/* STAGE 2: RESEARCH */}
          <g
            onClick={() => {
              setActiveStageIndex(1);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer"
          >
            <text
              x="70"
              y="445"
              fill={activeStageIndex === 1 ? "#E6392E" : "#121212"}
              fontSize="24"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Research
            </text>
            <text
              x="70"
              y="473"
              fill="#475569"
              fontSize="14"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="70" dy="0">Certified metallurgy selection,</tspan>
              <tspan x="70" dy="20.5">heat-treat scheduling, tool path</tspan>
              <tspan x="70" dy="20.5">simulations, and raw stock supply</tspan>
              <tspan x="70" dy="20.5">chain mapping.</tspan>
            </text>
          </g>

          {/* STAGE 3: STUDY */}
          <g
            onClick={() => {
              setActiveStageIndex(2);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer"
          >
            <text
              x="410"
              y="265"
              fill={activeStageIndex === 2 ? "#E6392E" : "#121212"}
              fontSize="24"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Study
            </text>
            <text
              x="410"
              y="294"
              fill="#475569"
              fontSize="14"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="410" dy="0">Design for Manufacturability (DFM)</tspan>
              <tspan x="410" dy="20.5">audits, fixture engineering, robotic</tspan>
              <tspan x="410" dy="20.5">cell line-balancing, and cycle time</tspan>
              <tspan x="410" dy="20.5">reduction.</tspan>
            </text>
            <text
              x="410"
              y="395"
              fill="#64748b"
              fontSize="13"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="410" dy="0">Digital twin feasibility and FEA</tspan>
              <tspan x="410" dy="19">stress testing ensure zero unforced</tspan>
              <tspan x="410" dy="19">engineering change orders.</tspan>
            </text>
          </g>

          {/* STAGE 4: PROPOSALS (CENTERED INSIDE ARCH) */}
          <g
            onClick={() => {
              setActiveStageIndex(3);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer"
          >
            <text
              x="745"
              y="275"
              fill={activeStageIndex === 3 ? "#E6392E" : "#121212"}
              fontSize="24"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Proposals
            </text>
            <text
              x="745"
              y="304"
              fill="#475569"
              fontSize="14"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="745" dy="0">Comprehensive turnkey quotation,</tspan>
              <tspan x="745" dy="20.5">serialized batch pricing, transparent</tspan>
              <tspan x="745" dy="20.5">lead-time SLA milestones, and</tspan>
              <tspan x="745" dy="20.5">prototyping options.</tspan>
            </text>
            <text
              x="745"
              y="405"
              fill="#64748b"
              fontSize="13"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="745" dy="0">First-article inspection (FAI) protocols</tspan>
              <tspan x="745" dy="19">and customized Kanban staging buffers</tspan>
              <tspan x="745" dy="19">tailored to client intake schedules.</tspan>
            </text>
          </g>

          {/* STAGE 5: DELIVERY */}
          <g
            onClick={() => {
              setActiveStageIndex(4);
              setIsAutoPlaying(false);
            }}
            className="cursor-pointer"
          >
            <text
              x="1070"
              y="265"
              fill={activeStageIndex === 4 ? "#E6392E" : "#121212"}
              fontSize="24"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Delivery
            </text>
            <text
              x="1070"
              y="294"
              fill="#475569"
              fontSize="14"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="1070" dy="0">100% CMM coordinate validation,</tspan>
              <tspan x="1070" dy="20.5">ultrasonic cleaning, and cleanroom</tspan>
              <tspan x="1070" dy="20.5">protective vacuum packaging.</tspan>
            </text>
            <text
              x="1070"
              y="380"
              fill="#64748b"
              fontSize="13"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="1070" dy="0">JIT serialized delivery directly to OEM</tspan>
              <tspan x="1070" dy="19">assembly lines with full metallurgical</tspan>
              <tspan x="1070" dy="19">test certification reports.</tspan>
            </text>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE RESPONSIVE TIMELINE (FOR VIEWPORTS < 768PX, DYNAMIC TABS)       */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-6 pt-4">
        {STAGES.map((s, idx) => {
          const isActive = activeStageIndex === idx;
          return (
            <div
              key={s.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`flex gap-4 items-start p-4 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? "bg-gray-50 border border-gray-300 shadow-xs"
                  : "hover:bg-gray-50/50"
              }`}
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs transition-transform ${
                    isActive ? "bg-[#E6392E] scale-110 ring-4 ring-red-100" : "bg-[#121212]"
                  }`}
                >
                  {s.step}
                </div>
                {idx < STAGES.length - 1 && (
                  <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1.5" />
                )}
              </div>
              <div className="pt-0.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-base font-bold ${isActive ? "text-[#E6392E]" : "text-[#121212]"}`}>
                    {s.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {s.kpi}
                  </span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed mt-1.5">
                  {s.desc1}
                </p>
                {s.desc2 && (
                  <p className="text-[11px] text-[#64748b] leading-relaxed mt-1">
                    {s.desc2}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
