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
      className={`w-full py-14 sm:py-20 border-t border-gray-200/90 bg-[#F6F4F0] text-[#121212] rounded-3xl sm:rounded-[36px] my-10 sm:my-16 overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Header / Infographic Meta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121212] leading-tight">
              Our Process
            </h2>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#64748b]">
              Contract Manufacturing Workflow
            </p>
          </div>
          {openQuoteModal && (
            <button
              onClick={() => openQuoteModal("Workflow Consultation")}
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold tracking-tight transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Consult Engineering Team</span>
              <span>↗</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / TABLET INFOGRAPHIC (CONTINUOUS FLUID SVG CONDUIT + NODES)       */}
        {/* ========================================================================= */}
        <div className="relative w-full aspect-[1200/620] hidden md:block select-none">
          {/* Background SVG Path Canvas */}
          <svg
            viewBox="0 0 1200 620"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Arrowhead marker for path exit */}
              <marker
                id="workflow-arrow"
                viewBox="0 0 14 14"
                refX="10"
                refY="7"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 12 7 L 0 13 z" fill="#5F7D74" />
              </marker>

              {/* Loop dashed return arrow */}
              <marker
                id="loop-arrow"
                viewBox="0 0 12 12"
                refX="9"
                refY="6"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 2 L 10 6 L 0 10 z" fill="#718E85" />
              </marker>

              {/* Drop Shadow Filter for Walker Silhouette */}
              <filter id="walker-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                <feOffset dx="14" dy="6" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.35" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Horizontal connecting branch between Brief & Research */}
            <line
              x1="90"
              y1="326"
              x2="280"
              y2="326"
              stroke="#5F7D74"
              strokeWidth="2.5"
            />

            {/* 2. Main Continuous Fluid Conduit Line */}
            <motion.path
              initial={{ pathLength: 0.9 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d="
                M 110, 210
                C 190, 210  250, 260  280, 290
                L 280, 360
                C 280, 450  340, 485  430, 485
                C 500, 485  525, 445  525, 360
                L 525, 270
                C 525, 175  735, 175  735, 270
                L 735, 370
                C 735, 455  775, 485  855, 485
                C 925, 485  955, 445  955, 350
                C 955, 270  1010, 205 1065, 205
              "
              stroke="#5F7D74"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              markerEnd="url(#workflow-arrow)"
            />

            {/* 3. Proposals Loop Dashed Iteration Route with Direction Arrow */}
            <path
              d="
                M 535, 350
                C 535, 440  555, 475  630, 475
                C 705, 475  725, 440  725, 360
              "
              stroke="#718E85"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              fill="none"
              markerEnd="url(#loop-arrow)"
            />

            {/* 4. Walker Silhouette & Cast Shadow on Loop Apex */}
            <g transform="translate(610, 160)">
              {/* Elliptical Cast Shadow stretching forward along the curve */}
              <ellipse
                cx="58"
                cy="19"
                rx="52"
                ry="5"
                transform="rotate(6, 58, 19)"
                fill="#121212"
                opacity="0.85"
              />

              {/* Minimalist Walking Silhouette Figure */}
              <g fill="#121212">
                {/* Head */}
                <circle cx="16" cy="-28" r="4.2" />
                {/* Torso & Jacket */}
                <path d="M 13 -22 C 14 -24, 18 -24, 19 -22 L 20 -8 L 13 -8 Z" />
                {/* Arms */}
                <path d="M 13 -20 L 9 -10" stroke="#121212" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 19 -20 L 23 -11" stroke="#121212" strokeWidth="2.2" strokeLinecap="round" />
                {/* Back Leg (Trailing) */}
                <path d="M 14 -8 L 10 3 L 8 16" stroke="#121212" strokeWidth="2.4" strokeLinecap="round" />
                {/* Front Leg (Stride Forward) */}
                <path d="M 18 -8 L 22 4 L 28 17" stroke="#121212" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            </g>

            {/* 5. Accent Red Circular Nodes of Varying Sizes */}
            {/* Start Node */}
            <circle cx="110" cy="210" r="19" fill="#E6392E" />

            {/* Node 1 (Brief upper connector) */}
            <circle cx="280" cy="295" r="27" fill="#E6392E" />

            {/* Node 2 (Research lower node - large) */}
            <circle cx="280" cy="370" r="48" fill="#E6392E" />

            {/* Node 3 (Study arch base node) */}
            <circle cx="525" cy="290" r="42" fill="#E6392E" />

            {/* Node 4 (Proposals loop node) */}
            <circle cx="735" cy="370" r="42" fill="#E6392E" />

            {/* Node 5 (Delivery final node) */}
            <circle cx="955" cy="305" r="36" fill="#E6392E" />
          </svg>

          {/* ========================================================================= */}
          {/* HTML TEXT BLOCKS PRECISELY POSITIONED OVER THE INFOGRAPHIC STAGES        */}
          {/* ========================================================================= */}

          {/* STAGE 1: BRIEF */}
          <div
            className="absolute"
            style={{ left: "7.5%", top: "41.5%", width: "14%" }}
          >
            <h3 className="text-lg font-bold tracking-tight text-[#121212] mb-1">
              Brief
            </h3>
            <p className="text-[11.5px] leading-relaxed text-[#4b5878] font-normal">
              Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&amp;T) alignment, and volume targets.
            </p>
          </div>

          {/* STAGE 2: RESEARCH */}
          <div
            className="absolute"
            style={{ left: "7.5%", top: "58.5%", width: "14%" }}
          >
            <h3 className="text-lg font-bold tracking-tight text-[#121212] mb-1">
              Research
            </h3>
            <p className="text-[11.5px] leading-relaxed text-[#4b5878] font-normal">
              Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.
            </p>
          </div>

          {/* STAGE 3: STUDY */}
          <div
            className="absolute"
            style={{ left: "30.5%", top: "27.5%", width: "15.5%" }}
          >
            <h3 className="text-lg font-bold tracking-tight text-[#121212] mb-1">
              Study
            </h3>
            <p className="text-[11.5px] leading-relaxed text-[#4b5878] font-normal mb-2">
              Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.
            </p>
            <p className="text-[11px] leading-relaxed text-[#64748b] font-normal">
              Digital twin feasibility and FEA stress testing ensure zero unforced engineering change orders.
            </p>
          </div>

          {/* STAGE 4: PROPOSALS */}
          <div
            className="absolute"
            style={{ left: "47.5%", top: "34.5%", width: "17%" }}
          >
            <h3 className="text-lg font-bold tracking-tight text-[#121212] mb-1">
              Proposals
            </h3>
            <p className="text-[11.5px] leading-relaxed text-[#4b5878] font-normal mb-2">
              Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.
            </p>
            <p className="text-[11px] leading-relaxed text-[#64748b] font-normal">
              First-article inspection (FAI) protocols and customized Kanban staging buffers tailored to client factory intake schedules.
            </p>
          </div>

          {/* STAGE 5: DELIVERY */}
          <div
            className="absolute"
            style={{ left: "67.5%", top: "27.5%", width: "16%" }}
          >
            <h3 className="text-lg font-bold tracking-tight text-[#121212] mb-1">
              Delivery
            </h3>
            <p className="text-[11.5px] leading-relaxed text-[#4b5878] font-normal mb-2">
              100% CMM coordinate validation, ultrasonic cleaning, and cleanroom protective vacuum packaging.
            </p>
            <p className="text-[11px] leading-relaxed text-[#64748b] font-normal">
              JIT serialized delivery directly to OEM assembly lines with full metallurgical test certification reports.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE RESPONSIVE TIMELINE (FOR VIEWPORTS < 768PX)                        */}
        {/* ========================================================================= */}
        <div className="md:hidden space-y-6 pt-2">
          {/* Mobile Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center">
                01
              </div>
              <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121212]">Brief</h3>
              <p className="text-xs text-[#4b5878] leading-relaxed mt-1">
                Initial customer RFQ review, 3D CAD analysis, geometric dimensioning and tolerance (GD&amp;T) alignment, and volume targets.
              </p>
            </div>
          </div>

          {/* Mobile Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center">
                02
              </div>
              <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121212]">Research</h3>
              <p className="text-xs text-[#4b5878] leading-relaxed mt-1">
                Certified metallurgy selection, heat-treat scheduling, tool path simulations, and raw stock supply chain mapping.
              </p>
            </div>
          </div>

          {/* Mobile Step 3 */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center">
                03
              </div>
              <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121212]">Study</h3>
              <p className="text-xs text-[#4b5878] leading-relaxed mt-1">
                Design for Manufacturability (DFM) audits, fixture engineering, robotic cell line-balancing, and cycle time reduction.
              </p>
            </div>
          </div>

          {/* Mobile Step 4 */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center">
                04
              </div>
              <div className="w-0.5 h-16 bg-[#5F7D74]/40 my-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121212]">Proposals</h3>
              <p className="text-xs text-[#4b5878] leading-relaxed mt-1">
                Comprehensive turnkey quotation, serialized batch pricing, transparent lead-time SLA milestones, and prototyping options.
              </p>
            </div>
          </div>

          {/* Mobile Step 5 */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#E6392E] text-white font-bold text-xs flex items-center justify-center">
                05
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121212]">Delivery</h3>
              <p className="text-xs text-[#4b5878] leading-relaxed mt-1">
                100% CMM coordinate validation, ultrasonic cleaning, cleanroom protective packaging, and serialized JIT delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
