import React from "react";
import { motion } from "framer-motion";

interface ManufacturingWorkflowInfographicProps {
  className?: string;
  openQuoteModal?: (source: string) => void;
}

export const ManufacturingWorkflowInfographic: React.FC<ManufacturingWorkflowInfographicProps> = ({
  className = "",
  openQuoteModal,
}) => {
  return (
    <section
      id="workflow"
      className={`w-full py-6 sm:py-10 text-[#121212] overflow-hidden ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. Header Block - MATCHING EXACT SECTION TITLE STYLE (SECTION 06 / 05)   */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div className="space-y-3 max-w-3xl">
          <span className="text-sm font-medium tracking-tight text-[#64748b]">
            ✦ Section 07 — Our Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#121212] leading-[1.15] mt-1">
            Our Workflow.<br />
            <span className="font-normal text-[#64748b]">Contract Manufacturing Process &amp; Lifecycle.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#475569] font-normal leading-relaxed pt-1">
            From initial RFQ telemetry and metallurgical research to automated robotic assembly and coordinate-validated JIT delivery.
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
      {/* 2. DESKTOP / TABLET INFOGRAPHIC (FULL SIDE, ZERO-OVERLAP VECTOR GRAPHIC)  */}
      {/* ========================================================================= */}
      <div className="w-full hidden md:block select-none">
        <svg
          viewBox="0 0 1440 640"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Terminal Arrowhead */}
            <marker
              id="workflow-terminal-arrow"
              viewBox="0 0 16 16"
              refX="11"
              refY="8"
              markerWidth="10"
              markerHeight="10"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 14 8 L 0 14 z" fill="#5F7D74" />
            </marker>

            {/* Iterative loop feedback arrow */}
            <marker
              id="workflow-loop-arrow"
              viewBox="0 0 12 12"
              refX="9"
              refY="6"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 10 6 L 0 10 z" fill="#718E85" />
            </marker>
          </defs>

          {/* 1. Horizontal Branch Divider between Brief & Research */}
          <line
            x1="80"
            y1="370"
            x2="340"
            y2="370"
            stroke="#5F7D74"
            strokeWidth="2.5"
          />

          {/* 2. Main Continuous Fluid Conduit Path */}
          <motion.path
            initial={{ pathLength: 0.85 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            d="
              M 100, 180
              L 180, 180
              C 260, 180  330, 210  340, 270
              L 340, 480
              C 340, 560  430, 580  510, 580
              C 580, 580  650, 540  650, 460
              L 650, 280
              C 650, 150  940, 150  940, 280
              L 940, 470
              C 940, 560  1020, 580 1100, 580
              C 1170, 580 1240, 540 1240, 450
              C 1240, 350 1290, 230 1360, 200
            "
            stroke="#5F7D74"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            markerEnd="url(#workflow-terminal-arrow)"
          />

          {/* 3. Proposals Loop Dashed Feedback Route */}
          <path
            d="
              M 660, 430
              C 660, 510  720, 545  795, 545
              C 870, 545  930, 510  930, 440
            "
            stroke="#718E85"
            strokeWidth="2.2"
            strokeDasharray="6 6"
            fill="none"
            markerEnd="url(#workflow-loop-arrow)"
          />

          {/* 4. Walker Silhouette & Cast Shadow on Loop Apex */}
          <g transform="translate(775, 148)">
            {/* Extended Perspective Shadow Cast along the top curve */}
            <ellipse
              cx="54"
              cy="2"
              rx="48"
              ry="4.5"
              transform="rotate(6, 54, 2)"
              fill="#121212"
              opacity="0.88"
            />

            {/* Walking Silhouette Figure */}
            <g fill="#121212">
              {/* Head */}
              <circle cx="16" cy="-42" r="4.5" />
              {/* Torso & Suit Jacket */}
              <path d="M 12 -36 C 13 -38, 19 -38, 20 -36 L 21 -18 L 12 -18 Z" />
              {/* Arms */}
              <path d="M 12 -33 L 7 -20" stroke="#121212" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 20 -33 L 25 -21" stroke="#121212" strokeWidth="2.4" strokeLinecap="round" />
              {/* Trailing Leg */}
              <path d="M 13 -18 L 9 -3 L 6 12" stroke="#121212" strokeWidth="2.6" strokeLinecap="round" />
              {/* Forward Stride Leg */}
              <path d="M 19 -18 L 24 -2 L 30 13" stroke="#121212" strokeWidth="2.6" strokeLinecap="round" />
            </g>
          </g>

          {/* 5. Accent Coral-Red Circular Nodes of Distinct Dimensions */}
          {/* Start Node */}
          <circle cx="100" cy="180" r="18" fill="#E6392E" />

          {/* Node 1: Brief upper connector */}
          <circle cx="340" cy="310" r="26" fill="#E6392E" />

          {/* Node 2: Research lower node (large) */}
          <circle cx="340" cy="440" r="44" fill="#E6392E" />

          {/* Node 3: Study arch base node */}
          <circle cx="650" cy="340" r="40" fill="#E6392E" />

          {/* Node 4: Proposals loop node */}
          <circle cx="940" cy="430" r="40" fill="#E6392E" />

          {/* Node 5: Delivery rising node */}
          <circle cx="1240" cy="360" r="38" fill="#E6392E" />

          {/* ========================================================================= */}
          {/* 6. VECTOR TEXT BLOCKS LOCKED TO THE COORDINATE GRID (NO OVERLAPS)        */}
          {/* ========================================================================= */}

          {/* STAGE 1: BRIEF */}
          <g>
            <text
              x="80"
              y="270"
              fill="#121212"
              fontSize="20"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Brief
            </text>
            <text
              x="80"
              y="294"
              fill="#475569"
              fontSize="12"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="80" dy="0">Initial customer RFQ review, 3D CAD</tspan>
              <tspan x="80" dy="17">analysis, geometric dimensioning</tspan>
              <tspan x="80" dy="17">and tolerance (GD&amp;T) alignment,</tspan>
              <tspan x="80" dy="17">and serialized volume targets.</tspan>
            </text>
          </g>

          {/* STAGE 2: RESEARCH */}
          <g>
            <text
              x="80"
              y="410"
              fill="#121212"
              fontSize="20"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Research
            </text>
            <text
              x="80"
              y="434"
              fill="#475569"
              fontSize="12"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="80" dy="0">Certified metallurgy selection,</tspan>
              <tspan x="80" dy="17">heat-treat scheduling, tool path</tspan>
              <tspan x="80" dy="17">simulations, and raw stock supply</tspan>
              <tspan x="80" dy="17">chain mapping.</tspan>
            </text>
          </g>

          {/* STAGE 3: STUDY */}
          <g>
            <text
              x="420"
              y="250"
              fill="#121212"
              fontSize="20"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Study
            </text>
            <text
              x="420"
              y="274"
              fill="#475569"
              fontSize="12"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="420" dy="0">Design for Manufacturability (DFM)</tspan>
              <tspan x="420" dy="17">audits, fixture engineering, robotic</tspan>
              <tspan x="420" dy="17">cell line-balancing, and cycle time</tspan>
              <tspan x="420" dy="17">reduction.</tspan>
            </text>
            <text
              x="420"
              y="360"
              fill="#64748b"
              fontSize="11.5"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="420" dy="0">Digital twin feasibility and FEA</tspan>
              <tspan x="420" dy="16">stress testing ensure zero unforced</tspan>
              <tspan x="420" dy="16">engineering change orders.</tspan>
            </text>
          </g>

          {/* STAGE 4: PROPOSALS (CENTERED INSIDE ARCH) */}
          <g>
            <text
              x="710"
              y="260"
              fill="#121212"
              fontSize="20"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Proposals
            </text>
            <text
              x="710"
              y="284"
              fill="#475569"
              fontSize="12"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="710" dy="0">Comprehensive turnkey quotation,</tspan>
              <tspan x="710" dy="17">serialized batch pricing, transparent</tspan>
              <tspan x="710" dy="17">lead-time SLA milestones, and</tspan>
              <tspan x="710" dy="17">prototyping options.</tspan>
            </text>
            <text
              x="710"
              y="370"
              fill="#64748b"
              fontSize="11.5"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="710" dy="0">First-article inspection (FAI) protocols</tspan>
              <tspan x="710" dy="16">and customized Kanban staging buffers</tspan>
              <tspan x="710" dy="16">tailored to client intake schedules.</tspan>
            </text>
          </g>

          {/* STAGE 5: DELIVERY */}
          <g>
            <text
              x="1010"
              y="250"
              fill="#121212"
              fontSize="20"
              fontWeight="700"
              letterSpacing="-0.02em"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              Delivery
            </text>
            <text
              x="1010"
              y="274"
              fill="#475569"
              fontSize="12"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="1010" dy="0">100% CMM coordinate validation,</tspan>
              <tspan x="1010" dy="17">ultrasonic cleaning, and cleanroom</tspan>
              <tspan x="1010" dy="17">protective vacuum packaging.</tspan>
            </text>
            <text
              x="1010"
              y="346"
              fill="#64748b"
              fontSize="11.5"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              <tspan x="1010" dy="0">JIT serialized delivery directly to OEM</tspan>
              <tspan x="1010" dy="16">assembly lines with full metallurgical</tspan>
              <tspan x="1010" dy="16">test certification reports.</tspan>
            </text>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE RESPONSIVE TIMELINE (FOR VIEWPORTS < 768PX)                     */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-6 pt-4">
        {/* Step 1 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              01
            </div>
            <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1.5" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-base font-bold text-[#121212]">Brief</h3>
            <p className="text-xs text-[#475569] leading-relaxed mt-1">
              Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&amp;T) alignment, and volume targets.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              02
            </div>
            <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1.5" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-base font-bold text-[#121212]">Research</h3>
            <p className="text-xs text-[#475569] leading-relaxed mt-1">
              Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              03
            </div>
            <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1.5" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-base font-bold text-[#121212]">Study</h3>
            <p className="text-xs text-[#475569] leading-relaxed mt-1">
              Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              04
            </div>
            <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1.5" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-base font-bold text-[#121212]">Proposals</h3>
            <p className="text-xs text-[#475569] leading-relaxed mt-1">
              Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              05
            </div>
          </div>
          <div className="pt-0.5">
            <h3 className="text-base font-bold text-[#121212]">Delivery</h3>
            <p className="text-xs text-[#475569] leading-relaxed mt-1">
              100% CMM coordinate validation, ultrasonic cleaning, cleanroom protective packaging, and serialized JIT delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
