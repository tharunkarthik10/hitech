import React from "react";
import { motion } from "framer-motion";

interface ManufacturingWorkflowInfographicProps {
  className?: string;
  openQuoteModal?: (source: string) => void;
}

interface WorkflowStageData {
  step: string;
  title: string;
  desc1: string;
  desc2?: string;
}

const STAGES: WorkflowStageData[] = [
  {
    step: "01",
    title: "Brief",
    desc1: "Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&T) alignment, and serialized volume targets.",
  },
  {
    step: "02",
    title: "Research",
    desc1: "Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.",
  },
  {
    step: "03",
    title: "Study",
    desc1: "Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.",
    desc2: "Digital twin feasibility and FEA stress testing ensure zero unforced engineering change orders.",
  },
  {
    step: "04",
    title: "Proposals",
    desc1: "Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.",
    desc2: "First-article inspection (FAI) protocols and customized Kanban staging buffers tailored to client intake schedules.",
  },
  {
    step: "05",
    title: "Delivery",
    desc1: "100% CMM coordinate validation, ultrasonic cleaning, and cleanroom protective vacuum packaging.",
    desc2: "JIT serialized delivery directly to OEM assembly lines with full metallurgical test certification reports.",
  },
];

export const ManufacturingWorkflowInfographic: React.FC<ManufacturingWorkflowInfographicProps> = ({
  className = "",
  openQuoteModal,
}) => {
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
    C 1240, 660 1320, 600 1320, 490
    C 1320, 380 1370, 240 1450, 200
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
      {/* Precision CSS animations with exact mathematically seamless loop periods */}
      <style>{`
        @keyframes seamlessConduitPulse {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -400;
          }
        }
        @keyframes seamlessFeedbackFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -32;
          }
        }
        .wf-seamless-pulse {
          stroke-dasharray: 20 180;
          animation: seamlessConduitPulse 6s linear infinite;
        }
        .wf-seamless-feedback {
          stroke-dasharray: 8 8;
          animation: seamlessFeedbackFlow 2s linear infinite;
        }
        .wf-node-interactive {
          transition: transform 0.22s ease-out, filter 0.22s ease-out;
          cursor: pointer;
        }
        .wf-node-interactive:hover {
          transform: scale(1.08);
          filter: drop-shadow(0 4px 12px rgba(230, 57, 46, 0.45));
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. Header Block - MATCHING EXACT SECTION TITLE STYLE (SECTION 06 / 05)   */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div className="space-y-3 max-w-3xl">
          <span className="text-sm font-medium tracking-tight text-[#64748b]">
            ✦ Section 07 — Our Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
            Our Workflow.<br />
            <span className="font-normal text-[#64748b]">Contract Manufacturing Process &amp; Lifecycle.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed pt-1">
            A disciplined, five-stage serialized pipeline engineered for rapid prototype validation, zero-defect machining, and scheduled JIT delivery.
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
      {/* 2. DESKTOP / TABLET INFOGRAPHIC (+20% ENLARGED, PRECISE & GLITCH-FREE)    */}
      {/* ========================================================================= */}
      <div className="w-full hidden md:block select-none">
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
              <stop offset="0%" stopColor="#8EF3C5" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8EF3C5" stopOpacity="0" />
            </linearGradient>
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

          {/* 2. Main Continuous Fluid Conduit Base Path */}
          <motion.path
            initial={{ pathLength: 0.9 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d={conduitD}
            stroke="#5F7D74"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
            markerEnd="url(#wf-terminal-arrow)"
          />

          {/* 3. Smooth, Mathematically Seamless Traveling Energy Signal */}
          <path
            d={conduitD}
            stroke="url(#conduitGlow)"
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
            className="wf-seamless-pulse pointer-events-none"
          />

          {/* 4. Proposals Loop Dashed Feedback Route */}
          <path
            d={feedbackLoopD}
            stroke="#718E85"
            strokeWidth="2.6"
            fill="none"
            className="wf-seamless-feedback"
            markerEnd="url(#wf-loop-arrow)"
          />

          {/* 5. Walking Silhouette Figure on Apex (Stable, Crisp Vector Artwork) */}
          <g transform="translate(820, 148)">
            {/* Perspective Ground Shadow */}
            <ellipse
              cx="54"
              cy="3"
              rx="54"
              ry="4.5"
              transform="rotate(5, 54, 3)"
              fill="#121212"
              opacity="0.88"
            />

            {/* Silhouette Figure */}
            <g fill="#121212" transform="scale(1.2)">
              {/* Head */}
              <circle cx="16" cy="-44" r="4.8" />
              {/* Torso & Suit Coat */}
              <path d="M 11 -37 C 13 -39, 19 -39, 21 -37 L 22 -19 L 11 -19 Z" />
              {/* Arms */}
              <path d="M 12 -34 L 6 -20" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 20 -34 L 26 -21" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" />
              {/* Trailing Leg */}
              <path d="M 13 -19 L 9 -3 L 5 13" stroke="#121212" strokeWidth="2.8" strokeLinecap="round" />
              {/* Forward Stride Leg */}
              <path d="M 19 -19 L 24 -2 L 31 14" stroke="#121212" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          </g>

          {/* 6. Accent Coral-Red Circular Nodes (+20% Size with Smooth Hover State) */}
          {/* Start Node */}
          <circle cx="90" cy="200" r="22" fill="#E6392E" />

          {/* Node 1: Brief Upper Connector */}
          <g className="wf-node-interactive" style={{ transformOrigin: "340px 340px" }}>
            <circle cx="340" cy="340" r="31" fill="#E6392E" />
          </g>

          {/* Node 2: Research Lower Node (Large) */}
          <g className="wf-node-interactive" style={{ transformOrigin: "340px 480px" }}>
            <circle cx="340" cy="480" r="52" fill="#E6392E" />
          </g>

          {/* Node 3: Study Arch Base Node */}
          <g className="wf-node-interactive" style={{ transformOrigin: "680px 360px" }}>
            <circle cx="680" cy="360" r="48" fill="#E6392E" />
          </g>

          {/* Node 4: Proposals Loop Node */}
          <g className="wf-node-interactive" style={{ transformOrigin: "1000px 450px" }}>
            <circle cx="1000" cy="450" r="48" fill="#E6392E" />
          </g>

          {/* Node 5: Delivery Rising Node */}
          <g className="wf-node-interactive" style={{ transformOrigin: "1320px 380px" }}>
            <circle cx="1320" cy="380" r="45" fill="#E6392E" />
          </g>

          {/* ========================================================================= */}
          {/* 7. VECTOR TEXT BLOCKS (+20% LARGER, CRISP, GUARANTEED ZERO-OVERLAP)       */}
          {/* ========================================================================= */}

          {/* STAGE 1: BRIEF */}
          <g>
            <text
              x="70"
              y="280"
              fill="#121212"
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
          <g>
            <text
              x="70"
              y="445"
              fill="#121212"
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
          <g>
            <text
              x="410"
              y="265"
              fill="#121212"
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
          <g>
            <text
              x="745"
              y="275"
              fill="#121212"
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
          <g>
            <text
              x="1040"
              y="265"
              fill="#121212"
              fontSize="24"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Delivery
            </text>
            <text
              x="1040"
              y="294"
              fill="#475569"
              fontSize="14"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="1040" dy="0">100% CMM coordinate validation,</tspan>
              <tspan x="1040" dy="20.5">ultrasonic cleaning, and cleanroom</tspan>
              <tspan x="1040" dy="20.5">protective vacuum packaging.</tspan>
            </text>
            <text
              x="1040"
              y="380"
              fill="#64748b"
              fontSize="13"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="1040" dy="0">JIT serialized delivery directly to OEM</tspan>
              <tspan x="1040" dy="19">assembly lines with full metallurgical</tspan>
              <tspan x="1040" dy="19">test certification reports.</tspan>
            </text>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE RESPONSIVE TIMELINE (FOR VIEWPORTS < 768PX)                     */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-6 pt-4">
        {STAGES.map((s, idx) => (
          <div key={s.step} className="flex gap-4 items-start">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {s.step}
              </div>
              {idx < STAGES.length - 1 && (
                <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1.5" />
              )}
            </div>
            <div className="pt-0.5 flex-1">
              <h3 className="text-base font-bold text-[#121212]">{s.title}</h3>
              <p className="text-xs text-[#475569] leading-relaxed mt-1">
                {s.desc1}
              </p>
              {s.desc2 && (
                <p className="text-[11px] text-[#64748b] leading-relaxed mt-1">
                  {s.desc2}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
