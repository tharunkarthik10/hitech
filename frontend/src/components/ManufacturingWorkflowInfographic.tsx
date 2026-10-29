import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Pure GPU motion value: begins exactly at start (0.0)
  const rawProgress = useMotionValue<number>(0.0);

  // Butter-smooth spring physics: zero stutter, responsive tracking
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.14,
    restDelta: 0.0001,
  });

  // SVG Normalized Path Length = 1000
  // Traveled drawn line: Starts at 1000 (0% drawn at start circle) and reaches 0 (100% drawn at terminal arrow)
  const traveledDashoffset = useTransform(smoothProgress, [0, 1], [1000, 0]);

  // Glowing tracer bead: starts centered on start circle (offset: 20) and ends centered on terminal arrow (offset: -980)
  const tracerDashoffset = useTransform(smoothProgress, [0, 1], [20, -980]);

  // Proposals dashed feedback loop: shifts in direct harmony with cursor
  const feedbackDashoffset = useTransform(smoothProgress, [0, 1], [0, -160]);

  // Subtle focal guide beam intensity on the robotic machine
  const laserOpacity = useTransform(smoothProgress, [0.45, 0.62, 0.80], [0.25, 0.95, 0.25]);

  // Physical geometry mapping:
  // In the 1520px viewBox, the start circle is at x = 90 (5.92%) and the terminal arrow is at x = 1450 (95.39%)
  // When cursor is at or before the start circle -> progress is exactly 0.0
  // When cursor is at or past the terminal arrow -> progress is exactly 1.0
  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;

    const mouseRatio = (clientX - rect.left) / rect.width;
    const startRatio = 0.059; // 90 / 1520
    const endRatio = 0.954;   // 1450 / 1520

    const progress = Math.max(0, Math.min(1, (mouseRatio - startRatio) / (endRatio - startRatio)));
    rawProgress.set(progress);
  };

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
      <style>{`
        .wf-interactive-node {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease-out;
          cursor: pointer;
        }
        .wf-interactive-node:hover {
          transform: scale(1.08);
          filter: drop-shadow(0 6px 14px rgba(230, 57, 46, 0.45));
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
            Glide your cursor across the flow to trace the precision engineering lifecycle from initial RFQ telemetry to automated robotic assembly and coordinate-validated delivery.
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
      {/* 2. BUTTERY-SMOOTH GPU CURSOR-DRIVEN FLOWCHART (PROPER ENDPOINTS)          */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
        }}
        className="w-full hidden md:block select-none relative cursor-crosshair"
      >
        <svg
          viewBox="0 0 1520 740"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Terminal Arrowhead (Active solid color) */}
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

            {/* Terminal Arrowhead (Muted base track) */}
            <marker
              id="wf-terminal-arrow-base"
              viewBox="0 0 16 16"
              refX="11"
              refY="8"
              markerWidth="11"
              markerHeight="11"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 14 8 L 0 14 z" fill="#5F7D74" opacity="0.4" />
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

            {/* Dynamic Cursor Tracer Beam Glow */}
            <linearGradient id="cursorTracerGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5F7D74" stopOpacity="0.1" />
              <stop offset="40%" stopColor="#8EF3C5" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#8EF3C5" stopOpacity="0.2" />
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

          {/* 2. Base Idle Conduit Path (Subtle guide track with base arrow) */}
          <path
            d={conduitD}
            stroke="#5F7D74"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeOpacity="0.32"
            fill="none"
            markerEnd="url(#wf-terminal-arrow-base)"
          />

          {/* 3. GPU-ACCELERATED TRAVELED PATH (Starts precisely at node x=90, ends at arrow x=1450) */}
          <motion.path
            d={conduitD}
            pathLength={1000}
            stroke="#5F7D74"
            strokeWidth={3.8}
            strokeLinecap="round"
            strokeDasharray="1000"
            style={{ strokeDashoffset: traveledDashoffset }}
            fill="none"
            markerEnd="url(#wf-terminal-arrow)"
          />

          {/* 4. GPU-ACCELERATED ENERGY BEAM (Glides from exact start circle to terminal arrow tip) */}
          <motion.path
            d={conduitD}
            pathLength={1000}
            stroke="url(#cursorTracerGlow)"
            strokeWidth={5.2}
            strokeLinecap="round"
            strokeDasharray="40 1000"
            style={{ strokeDashoffset: tracerDashoffset }}
            fill="none"
            className="pointer-events-none"
          />

          {/* 5. Cursor-Synchronized Proposals Loop Dashed Route */}
          <motion.path
            d={feedbackLoopD}
            stroke="#718E85"
            strokeWidth="2.6"
            strokeDasharray="8 8"
            style={{ strokeDashoffset: feedbackDashoffset }}
            fill="none"
            markerEnd="url(#wf-loop-arrow)"
          />

          {/* ========================================================================= */}
          {/* 6. PRECISION INDUSTRIAL MACHINE ON APEX (REPLACES THE PERSON)            */}
          {/* Multi-Axis Robotic CNC Machining & Laser Center Vector Silhouette         */}
          {/* ========================================================================= */}
          <g transform="translate(805, 96)">
            {/* Ground Perspective Cast Shadow along Arch Curve */}
            <ellipse
              cx="72"
              cy="55"
              rx="64"
              ry="5.2"
              transform="rotate(4, 72, 55)"
              fill="#121212"
              opacity="0.85"
            />

            {/* Industrial CNC Robotic Machine Vector Silhouette */}
            <g fill="#121212">
              {/* Heavy Mounting Base Bed */}
              <rect x="24" y="47" width="50" height="7" rx="2" />
              <rect x="30" y="42" width="38" height="5" rx="1.5" />

              {/* Rotary Turret Housing */}
              <rect x="33" y="27" width="24" height="15" rx="3" />
              <circle cx="45" cy="25" r="7.5" />

              {/* Articulated Lower Arm (Heavy Structural Profile) */}
              <path d="M 45 25 L 65 -2 L 73 2 L 51 30 Z" />
              <circle cx="69" cy="0" r="6.5" />

              {/* Articulated Forearm */}
              <path d="M 69 0 L 89 18 L 85 23 L 65 5 Z" />
              <circle cx="87" cy="20.5" r="5.5" />

              {/* 5-Axis Spindle Toolhead */}
              <rect
                x="81"
                y="24"
                width="13"
                height="16"
                rx="2"
                transform="rotate(-18, 87, 32)"
              />

              {/* Precision Tool Bit / Laser Cutting Nozzle */}
              <polygon points="84,39 89,39 86.5,49" />

              {/* Laser Focal Alignment Guide Beam (Smoothly highlights as cursor sweeps arch) */}
              <motion.line
                x1="86.5"
                y1="49"
                x2="88"
                y2="56"
                stroke="#E6392E"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ opacity: laserOpacity }}
              />

              {/* HiTech Status LED Accent */}
              <circle cx="45" cy="33" r="2.2" fill="#E6392E" />
            </g>
          </g>

          {/* ========================================================================= */}
          {/* 7. ACCENT CORAL-RED CIRCULAR NODES (STABLE, CRISP, BUTTERY HOVER)        */}
          {/* ========================================================================= */}
          {/* Start Node (Click to set progress = 0.0) */}
          <g
            className="wf-interactive-node"
            style={{ transformOrigin: "90px 200px" }}
            onClick={() => rawProgress.set(0.0)}
          >
            <circle cx="90" cy="200" r="22" fill="#E6392E" />
          </g>

          {/* Node 1: Brief Upper Connector */}
          <g
            className="wf-interactive-node"
            style={{ transformOrigin: "340px 340px" }}
            onClick={() => rawProgress.set(0.12)}
          >
            <circle cx="340" cy="340" r="31" fill="#E6392E" />
          </g>

          {/* Node 2: Research Lower Node (Large) */}
          <g
            className="wf-interactive-node"
            style={{ transformOrigin: "340px 480px" }}
            onClick={() => rawProgress.set(0.24)}
          >
            <circle cx="340" cy="480" r="52" fill="#E6392E" />
          </g>

          {/* Node 3: Study Arch Base Node */}
          <g
            className="wf-interactive-node"
            style={{ transformOrigin: "680px 360px" }}
            onClick={() => rawProgress.set(0.44)}
          >
            <circle cx="680" cy="360" r="48" fill="#E6392E" />
          </g>

          {/* Node 4: Proposals Loop Node */}
          <g
            className="wf-interactive-node"
            style={{ transformOrigin: "1000px 450px" }}
            onClick={() => rawProgress.set(0.68)}
          >
            <circle cx="1000" cy="450" r="48" fill="#E6392E" />
          </g>

          {/* Node 5: Delivery Rising Node */}
          <g
            className="wf-interactive-node"
            style={{ transformOrigin: "1320px 380px" }}
            onClick={() => rawProgress.set(0.92)}
          >
            <circle cx="1320" cy="380" r="45" fill="#E6392E" />
          </g>

          {/* Terminal Arrow Click Target (Click to set progress = 1.0) */}
          <g
            className="cursor-pointer"
            onClick={() => rawProgress.set(1.0)}
          >
            <circle cx="1450" cy="200" r="20" fill="transparent" />
          </g>

          {/* ========================================================================= */}
          {/* 8. VECTOR TEXT BLOCKS (+20% LARGER, CRISP, GUARANTEED ZERO-OVERLAP)       */}
          {/* ========================================================================= */}

          {/* STAGE 1: BRIEF */}
          <g onClick={() => rawProgress.set(0.12)} className="cursor-pointer">
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
          <g onClick={() => rawProgress.set(0.24)} className="cursor-pointer">
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
          <g onClick={() => rawProgress.set(0.44)} className="cursor-pointer">
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
          <g onClick={() => rawProgress.set(0.68)} className="cursor-pointer">
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
          <g onClick={() => rawProgress.set(0.92)} className="cursor-pointer">
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
