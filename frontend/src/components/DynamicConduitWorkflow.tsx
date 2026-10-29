import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Wrench,
  ShieldCheck,
  PackageCheck,
  Activity,
  Sparkles,
} from "lucide-react";

interface StepItem {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  bullets: string[];
  metrics: { label: string; val: string };
  icon: React.ReactNode;
  image: string;
}

const workflowSteps: StepItem[] = [
  {
    id: "step-1",
    stepNumber: "01",
    badge: "STEP 1",
    title: "We analyze & balance your assembly line.",
    tagline: "Feasibility, Takt-Time Simulation & BOM Normalization",
    desc: "We ingest your Bill of Materials (BOM), 3D CAD assemblies, cycle times, and volume targets. Our engineers simulate reach envelopes, balance takt-time workflows, and eliminate handling bottlenecks before physical metal is cut.",
    bullets: [
      "Digital twin reach envelope simulation",
      "Ergonomic workstation load balancing",
      "DFM & zero-defect tolerance verification",
    ],
    metrics: { label: "Cycle Efficiency", val: "+34%" },
    icon: <Cpu className="w-5 h-5 text-[#006494]" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "step-2",
    stepNumber: "02",
    badge: "STEP 2",
    title: "We deploy custom tooling & poka-yoke proofing.",
    tagline: "Pneumatic Clamping, Error Proofing & Torque Logging",
    desc: "Custom ergonomic assembly jigs, automated pneumatic clamps, and optical sensor barriers are integrated into each cell. Digital torque drivers and automatic screw feeders store tightening data for every critical fastener.",
    bullets: [
      "Optical sensor barrier part detection",
      "Calibrated digital torque data logging",
      "Automated pneumatic holding fixtures",
    ],
    metrics: { label: "Defect Escape Rate", val: "0.00%" },
    icon: <Wrench className="w-5 h-5 text-[#006494]" />,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "step-3",
    stepNumber: "03",
    badge: "STEP 3",
    title: "We validate repeatability with pilot run & FAI.",
    tagline: "First Article Inspection & Full CMM Metrology",
    desc: "Initial pilot batches undergo full First Article Inspection (FAI). We conduct optical dimensional validation, electrical continuity checks, and mechanical stress verification to benchmark repeatability before serial production approval.",
    bullets: [
      "Sub-micron Zeiss bridge CMM probing",
      "Electrical continuity & isolation testing",
      "Mechanical fatigue and load benchmark",
    ],
    metrics: { label: "CPK Repeatability", val: "> 1.67" },
    icon: <ShieldCheck className="w-5 h-5 text-[#006494]" />,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "step-4",
    stepNumber: "04",
    badge: "STEP 4",
    title: "We scale continuous multi-shift serial dispatch.",
    tagline: "High-Throughput Robotic Assembly & Global Export",
    desc: "High-speed conveyor cells and articulated robotic arms run continuous shifts under lean Kanban parts replenishment. Finished products undergo 100% functional load testing, barcode labeling, protective packaging, and global export crating.",
    bullets: [
      "6-axis robotic pick, place & packaging",
      "Lean Kanban replenishment staging",
      "Barcoded serialized SLA tracking",
    ],
    metrics: { label: "On-Time Dispatch", val: "99.8%" },
    icon: <PackageCheck className="w-5 h-5 text-[#006494]" />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900",
  },
];

interface DynamicConduitWorkflowProps {
  openQuoteModal: (title: string) => void;
}

export default function DynamicConduitWorkflow({
  openQuoteModal,
}: DynamicConduitWorkflowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Scroll tracking across the workflow container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.85"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate current active step based on progress
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      if (latest < 0.28) {
        setActiveStepIndex(0);
      } else if (latest < 0.54) {
        setActiveStepIndex(1);
      } else if (latest < 0.80) {
        setActiveStepIndex(2);
      } else {
        setActiveStepIndex(3);
      }
    });
  }, [smoothProgress]);

  // Cable stroke pathLength
  const pathLength = useTransform(smoothProgress, [0, 0.98], [0.02, 1], {
    clamp: true,
  });

  // Traveling Capsule Y Position (in percentage of total cable height)
  const capsuleProgress = useTransform(smoothProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative rounded-[32px] sm:rounded-[44px] bg-[#f8fafc] border border-gray-200/90 p-6 sm:p-10 lg:p-16 overflow-hidden shadow-xs"
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#003554 1px, transparent 1px), radial-gradient(#003554 1px, #f8fafc 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />

      {/* ========================================================================= */}
      {/* SECTION HEADER (Conduit Commerce Style) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 mb-14 lg:mb-20">
        {/* Toggle Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold text-[#003554]">
          <span className="w-2 h-2 rounded-full bg-[#00A6FB] animate-pulse" />
          <span>Feasibility</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#64748b]">Takt-Time Sync</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#006494]">Serial Launch</span>
        </div>

        {/* Big Bold Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-[#121212] leading-[1.12]">
          From engineered concept to serial launch{" "}
          <span className="text-[#006494]">→ zero defect.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#475569] font-normal leading-relaxed max-w-2xl mx-auto">
          We integrate every workstation into a single continuous pipeline—eliminating
          handling bottlenecks with ergonomic fixtures, optical sensors, and verified repeatability.
        </p>

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() =>
              openQuoteModal(
                "Assembly Line Balancing & Production Process Architecture"
              )
            }
            className="px-6 py-3 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Initiate Line Balancing Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROGRESS TRACKER BAR (Top Sticky Anchor) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-2xs">
          {workflowSteps.map((s, idx) => {
            const isActive = activeStepIndex === idx;
            const isPassed = activeStepIndex > idx;
            return (
              <button
                key={s.id}
                onClick={() => {
                  const el = document.getElementById(s.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`py-2 px-2 sm:px-4 rounded-xl text-left transition-all duration-300 flex items-center gap-2 sm:gap-3 cursor-pointer ${
                  isActive
                    ? "bg-[#003554] text-white shadow-sm"
                    : isPassed
                    ? "text-[#003554] hover:bg-gray-100/80"
                    : "text-[#64748b] hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isPassed
                      ? "bg-[#003554]/10 text-[#003554]"
                      : "bg-gray-100 text-[#94a3b8]"
                  }`}
                >
                  {s.stepNumber}
                </span>
                <span className="text-xs sm:text-sm font-semibold truncate hidden md:inline-block">
                  {s.title.split(" ")[1] || s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONDUIT FLOW CONTAINER WITH SNAKE CABLE */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Dynamic Continuous Conduit Cable (SVG Canvas) */}
        {/* Desktop Snake Path: Alternates left and right around cards */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 2400"
            fill="none"
          >
            <defs>
              <linearGradient
                id="conduitActiveGlow"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00A6FB" />
                <stop offset="50%" stopColor="#006494" />
                <stop offset="100%" stopColor="#003554" />
              </linearGradient>
              <filter
                id="glowFilter"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inactive Conduit Track (Subtle Gray Circuit) */}
            <path
              d="
                M 500 0
                V 140
                Q 500 170 470 170
                H 70
                Q 40 170 40 200
                V 620
                Q 40 650 70 650
                H 930
                Q 960 650 960 680
                V 1180
                Q 960 1210 930 1210
                H 70
                Q 40 1210 40 1240
                V 1740
                Q 40 1770 70 1770
                H 930
                Q 960 1770 960 1800
                V 2300
                Q 960 2330 930 2330
                H 500
                V 2400
              "
              stroke="#e2e8f0"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active Glowing Conduit Tube (Linked to Scroll) */}
            <motion.path
              d="
                M 500 0
                V 140
                Q 500 170 470 170
                H 70
                Q 40 170 40 200
                V 620
                Q 40 650 70 650
                H 930
                Q 960 650 960 680
                V 1180
                Q 960 1210 930 1210
                H 70
                Q 40 1210 40 1240
                V 1740
                Q 40 1770 70 1770
                H 930
                Q 960 1770 960 1800
                V 2300
                Q 960 2330 930 2330
                H 500
                V 2400
              "
              stroke="url(#conduitActiveGlow)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          </svg>

          {/* Traveling Slider Capsule Node (Iconic Conduit Commerce Element) */}
          {/* Follows vertical motion down the sides */}
          <motion.div
            style={{
              top: useTransform(capsuleProgress, [0, 1], ["5%", "92%"]),
              left: useTransform(
                capsuleProgress,
                [0, 0.28, 0.32, 0.54, 0.58, 0.8, 0.84, 1],
                [
                  "calc(4% - 14px)",
                  "calc(4% - 14px)",
                  "calc(96% - 14px)",
                  "calc(96% - 14px)",
                  "calc(4% - 14px)",
                  "calc(4% - 14px)",
                  "calc(96% - 14px)",
                  "calc(50% - 14px)",
                ]
              ),
            }}
            className="absolute z-20 w-7 h-16 rounded-full bg-white border border-gray-300 shadow-lg flex flex-col items-center justify-between py-2 transition-all duration-200"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A6FB] shadow-[0_0_8px_#00A6FB] animate-pulse" />
            <div className="space-y-1">
              <span className="block w-2.5 h-0.5 bg-gray-300 rounded-full" />
              <span className="block w-2.5 h-0.5 bg-gray-300 rounded-full" />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          </motion.div>
        </div>

        {/* Mobile / Tablet Continuous Central/Left Cable */}
        <div className="lg:hidden absolute left-5 top-0 bottom-0 w-1 pointer-events-none z-0">
          <div className="w-1 h-full bg-gray-200 rounded-full" />
          <motion.div
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00A6FB] via-[#006494] to-[#003554] rounded-full shadow-[0_0_8px_#00A6FB]"
          />
        </div>

        {/* ========================================================================= */}
        {/* STEP CARDS (Alternating Left/Right with Isometric Visuals) */}
        {/* ========================================================================= */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32 relative z-10 pl-10 lg:pl-0">
          {workflowSteps.map((step, index) => {
            const isEven = index % 2 === 1; // 0=L, 1=R, 2=L, 3=R
            const isActive = activeStepIndex === index;

            return (
              <motion.div
                key={step.id}
                id={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl bg-white border transition-all duration-500 ${
                  isActive
                    ? "border-[#006494]/60 shadow-xl shadow-[#003554]/5 ring-1 ring-[#006494]/20"
                    : "border-gray-200/80 shadow-xs hover:border-gray-300"
                } p-6 sm:p-10 lg:p-12`}
              >
                {/* Clamp Connector Brackets (Conduit Hardware Detail) */}
                <div
                  className={`hidden lg:flex absolute top-10 ${
                    isEven ? "-right-4" : "-left-4"
                  } w-8 h-8 rounded-full bg-white border border-gray-300 shadow-sm items-center justify-center z-10`}
                >
                  <span
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-[#00A6FB]" : "bg-gray-300"
                    }`}
                  />
                </div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* TEXT CONTENT COLUMN */}
                  <div
                    className={`lg:col-span-6 space-y-5 ${
                      isEven ? "lg:col-start-7" : ""
                    }`}
                  >
                    {/* Badge Pill */}
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#121212] text-white text-xs font-bold tracking-wider uppercase shadow-xs">
                        {step.badge}
                      </span>
                      <span className="text-xs font-semibold text-[#006494] bg-[#006494]/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{step.tagline}</span>
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#121212] leading-[1.18]">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Key Technical Bullets */}
                    <div className="space-y-2.5 pt-1">
                      {step.bullets.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1e293b]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#006494] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action & Metric Bar */}
                    <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-gray-100">
                      <button
                        onClick={() =>
                          openQuoteModal(
                            `Production Inquiry: ${step.badge} - ${step.title}`
                          )
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs sm:text-sm font-medium tracking-tight transition-all active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <span>Initiate This Step</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2 text-xs text-[#64748b]">
                        <span className="text-sm sm:text-base font-bold text-[#003554]">
                          {step.metrics.val}
                        </span>
                        <span className="font-medium">
                          {step.metrics.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ISOMETRIC 3D / MACHINERY VISUAL COLUMN */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? "lg:col-start-1" : ""
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50/40 border border-gray-200/90 shadow-sm group">
                      {/* Image Preview with Hover Scale */}
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Glass Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                      {/* Floating Step Chip (Conduit Style Hardware Label) */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/80 shadow-sm flex items-center gap-2">
                        {step.icon}
                        <span className="text-xs font-bold text-[#121212] tracking-tight">
                          Cell {step.stepNumber}
                        </span>
                      </div>

                      {/* Metric Tag at Bottom */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                            Process Milestone
                          </div>
                          <div className="text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1">
                            {step.tagline}
                          </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-xs font-mono font-bold text-white">
                          {step.stepNumber} / 04
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION FOOTER CTA (Flow Ends in Success Story) */}
      {/* ========================================================================= */}
      <div className="relative z-10 mt-16 sm:mt-24 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#003554] via-[#051923] to-[#002022] text-white p-8 sm:p-10 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00A6FB] flex items-center gap-1.5 justify-center md:justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Turnkey Integration</span>
            </span>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Ready to architect your serial manufacturing line?
            </h4>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Get direct engineering access, takt-time analysis, and custom tooling
              quotation within 24 hours.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() =>
                openQuoteModal(
                  "Turnkey Assembly Line Proposal & Production Engineering Consultation"
                )
              }
              className="px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-[#003554] font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Engineering Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
