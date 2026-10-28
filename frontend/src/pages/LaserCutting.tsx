import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowUpRight, ShieldCheck, 
  Settings, X, Send, Zap, Cpu, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * THREE UNIFIED TYPOGRAPHIC STYLES (MATCHING USER'S EXACT REFERENCE):
 * 1. Bold Headline: font-bold tracking-tight text-[#121212] (or text-white on dark)
 * 2. Muted Sub-headline: font-normal tracking-tight text-[#64748b] (or text-white/70 on dark)
 * 3. Body / Paragraph: font-normal text-sm sm:text-base text-[#475569] leading-relaxed (or text-white/80 on dark)
 */

export default function LaserCutting() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState("");
  
  // Section 4 Step State with Swipe Support
  const [activeStep, setActiveStep] = useState(0);
  const [stepDirection, setStepDirection] = useState(0);

  const handleStepChange = (newStep: number) => {
    setStepDirection(newStep > activeStep ? 1 : -1);
    setActiveStep(newStep);
  };

  const handleSwipePrev = () => {
    if (activeStep > 0) {
      setStepDirection(-1);
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSwipeNext = () => {
    if (activeStep < steps.length - 1) {
      setStepDirection(1);
      setActiveStep(prev => prev + 1);
    }
  };

  // Section 3 Interactive Showcase Slider with Swipe Support
  const showcaseSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
      quote: "Micro-burr perfection and high nesting density engineered into every blank to accelerate your downstream assembly.",
      tag: "12kW High-Speed Cutting"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
      quote: "Dual automated shuttle beds swapping heavy plate in under 15 seconds for continuous 24/7 beam-on time.",
      tag: "Dual Pallet Automation"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1200",
      quote: "Dynamic nitrogen assist optics delivering mirror-clean cut faces across mild steel, stainless, and aluminum.",
      tag: "Mirror Edge Finish"
    }
  ];
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [showcaseDirection, setShowcaseDirection] = useState(0);

  const handleShowcaseSwipe = (dir: number) => {
    const next = activeShowcase + dir;
    if (next >= 0 && next < showcaseSlides.length) {
      setShowcaseDirection(dir);
      setActiveShowcase(next);
    }
  };

  const openQuoteModal = (subject: string) => {
    setQuoteSubject(subject);
    setIsQuoteModalOpen(true);
  };

  // Section 4 Step Data for Laser Cutting
  const steps = [
    {
      number: "01",
      title: "CAD/CAM Nesting & DFM Analysis",
      desc: "We analyze your 2D DXF/DWG files and 3D STEP models to evaluate geometry feasibility, pierce clearances, and thermal distortion risks. Our algorithmic nesting engine optimizes part orientation on raw sheets, significantly maximizing raw material yield and driving down per-part production cost.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
    },
    {
      number: "02",
      title: "Optics Calibration & Gas Selection",
      desc: "Our technicians calibrate the 12kW fiber laser focal position, dynamic beam zoom, and nozzle centering. High-purity nitrogen or oxygen assist gas is configured according to material grade to guarantee mirror-clean cut faces without dross or heat-affected oxidation.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
    },
    {
      number: "03",
      title: "High-Speed Automated Profiling",
      desc: "Dual automated shuttle tables load raw sheets into the enclosed cutting chamber while cut parts are cleared in parallel. Linear drive gantry motors execute tight radii, micro-joints, and complex contours at speeds up to 120m/min with sub-millimeter repeatable precision.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
    },
    {
      number: "04",
      title: "Metrology, Deburring & Dispatch",
      desc: "Every cut lot undergoes optical contour coordinate verification and surface edge inspection. Parts receive mechanical vibratory deburring or film protection before being stacked, banded, and prepared for immediate delivery to your assembly line.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-white text-[#121212] font-sans pt-20 sm:pt-24 pb-20 selection:bg-[#121212] selection:text-white overflow-x-hidden">
      
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
            {/* Background Looping Fiber Laser Video */}
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="/hero_precision_bloom.jpg"
                className="w-full h-full object-cover"
              >
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
                  <span className="text-sm font-medium tracking-tight text-white/80">12kW Fiber Laser Profiling</span>
                </div>

                <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-lg">
                  Ultra-high speed fiber optics deliver mirror-clean edge perfection, complex geometric contours, and zero-dross cuts across sheets and structural tubing.
                </p>

                <div className="flex items-center gap-3">
                  <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-tight">
                    Shaping Laser Precision
                  </h1>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Right Floating Metric Card: 12kW Fiber */}
              <div className="shrink-0 self-start lg:self-end">
                <div className="bg-white/95 text-gray-900 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md min-w-[170px] sm:min-w-[220px] max-w-[260px] space-y-1.5 border border-white">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] leading-none">
                    12kW Fiber
                  </div>
                  <p className="text-sm text-[#64748b] font-normal leading-relaxed">
                    High-power multi-axis laser processing up to 25mm thickness.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 02. "THE BENEFITS OF FIBER LASER CUTTING" (Value Statement & 2 Cards) */}
        {/* ========================================================================= */}
        <section id="benefits" className="space-y-8 sm:space-y-10">
          
          {/* Header Row: Left Kicker, Right Editorial Title, Subtitle & Button */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            {/* Left Kicker */}
            <div className="lg:col-span-4">
              <span className="text-sm font-medium tracking-tight text-[#64748b]">
                ✦ The Benefits of Fiber Laser Cutting
              </span>
            </div>

            {/* Right Editorial Block */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121212] leading-[1.18]">
                  Maximize raw sheet yield and accelerate your downstream fabrication.
                </h2>
                <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#64748b] leading-[1.18] mt-1">
                  Ultra-fast beam dynamics eliminate post-processing deburring and thermal deformation.
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
                Our 12kW high-power fiber laser systems process mild steel, stainless steel, aluminum, brass, and copper with mirror-finish cut faces. By combining high-speed dual shuttle tables with intelligent nesting algorithms, HiTech slashes cycle times and guarantees precision down to ±0.02mm.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => openQuoteModal("Laser Cutting Benefits Consultation")}
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

          {/* Bottom Row: 2 Asymmetrical Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            
            {/* Card 1: Optical Accuracy Metric Card */}
            <div className="lg:col-span-5 rounded-3xl bg-[#f0f2f5] border border-gray-200/80 p-5 sm:p-6 flex items-center gap-5 shadow-2xs">
              <div className="w-24 sm:w-28 h-28 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400" 
                  alt="Fiber Laser Cutting Head" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  ±0.02mm
                </div>
                <div className="text-sm font-medium tracking-tight text-[#64748b]">
                  Beam Positioning Tolerance
                </div>
                <p className="text-sm text-[#475569] font-normal leading-relaxed">
                  Optical linear encoder feedback ensures micro-tolerance edge alignment across continuous cuts.
                </p>
              </div>
            </div>

            {/* Card 2: 45% Sheet Yield Savings Card */}
            <div className="lg:col-span-7 rounded-3xl bg-[#f0f2f5] border border-gray-200/80 p-5 sm:p-6 flex items-center gap-6 shadow-2xs">
              <div className="w-36 sm:w-52 h-28 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=600" 
                  alt="Automated Laser Profiling" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  45%
                </div>
                <div className="text-sm font-medium tracking-tight text-[#64748b]">
                  Scrap Rate Reduction
                </div>
                <p className="text-sm text-[#475569] font-normal leading-relaxed">
                  Advanced algorithmic CAD/CAM nesting tightly packs parts, reducing material waste and per-part unit cost.
                </p>
              </div>
            </div>

          </div>

          {/* Thin Slider Pagination Line */}
          <div className="flex items-center justify-between text-sm text-[#64748b] font-medium pt-1">
            <span>02</span>
            <div className="w-full mx-4 h-[1px] bg-gray-200 relative">
              <div className="absolute left-0 top-0 h-full w-1/4 bg-gray-800" />
            </div>
            <span>08</span>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 03. "ENGINEERED FOR PERFORMANCE" (Feature Split & Large Media Card) */}
        {/* ========================================================================= */}
        <section id="performance" className="space-y-8 sm:space-y-10">
          
          {/* Header Row */}
          <div className="space-y-3">
            <span className="text-sm font-medium tracking-tight text-[#64748b]">
              ✦ Engineered for Performance
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121212] leading-[1.18] max-w-4xl">
                Ultra-fast optics engineered for high-duty industrial production.
              </h2>
              <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#64748b] leading-[1.18] max-w-4xl mt-1">
                From custom structural brackets to serial enclosure blanks, our cutting lines deliver zero distortion.
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openQuoteModal("Laser Performance Inquiry")}
                className="px-6 py-3 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <span>Get in touch</span>
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Grid: Left 2 Cards + Right Large Media Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            
            {/* Left Column (5 cols): Two Stacked Rounded Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
              
              {/* Card 1: Adaptive Optics */}
              <div className="rounded-3xl bg-[#f0f2f5] border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-900 mb-6">
                  <Zap className="w-5 h-5 text-gray-800" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#121212]">
                    Adaptive Beam Optics
                  </h3>
                  <p className="text-sm text-[#475569] font-normal leading-relaxed">
                    Auto-focus cutting heads dynamically adapt beam diameter and gas pressure in real time, delivering mirror-clean edges on thin and thick plate alike.
                  </p>
                </div>
              </div>

              {/* Card 2: 24/7 Dual Shuttle */}
              <div className="rounded-3xl bg-[#f0f2f5] border border-gray-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-900 mb-6">
                  <Cpu className="w-5 h-5 text-gray-800" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#121212]">
                    Dual Shuttle Automation
                  </h3>
                  <p className="text-sm text-[#475569] font-normal leading-relaxed">
                    Synchronized pallet changers swap raw sheets in under 15 seconds, maintaining continuous 24/7 beam-on time for tight turnaround programs.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (7 cols): Swipeable Showcase Media Visual with Cool Animations */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden relative shadow-md min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 bg-gray-900 group select-none [perspective:1000px]">
              <AnimatePresence mode="wait" custom={showcaseDirection}>
                <motion.div
                  key={activeShowcase}
                  custom={showcaseDirection}
                  initial={{ 
                    opacity: 0, 
                    x: showcaseDirection >= 0 ? 80 : -80, 
                    rotateY: showcaseDirection >= 0 ? 12 : -12,
                    scale: 0.94,
                    filter: 'blur(4px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0,
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: showcaseDirection >= 0 ? -80 : 80, 
                    rotateY: showcaseDirection >= 0 ? -12 : 12,
                    scale: 0.94,
                    filter: 'blur(4px)'
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 26,
                    mass: 0.8
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.28}
                  whileDrag={{ scale: 0.97, rotateZ: showcaseDirection >= 0 ? -1 : 1, cursor: "grabbing" }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -35 || info.velocity.x < -250) {
                      handleShowcaseSwipe(1);
                    } else if (info.offset.x > 35 || info.velocity.x > 250) {
                      handleShowcaseSwipe(-1);
                    }
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  <motion.img 
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    src={showcaseSlides[activeShowcase].image} 
                    alt={showcaseSlides[activeShowcase].tag} 
                    className="w-full h-full object-cover opacity-90 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  {/* Subtle dynamic sheen swipe feedback overlay */}
                  <motion.div 
                    key={`showcase-sheen-${activeShowcase}`}
                    initial={{ opacity: 0.35, x: showcaseDirection >= 0 ? '-100%' : '100%' }}
                    animate={{ opacity: 0, x: showcaseDirection >= 0 ? '100%' : '-100%' }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Tag & Swipe Cue */}
              <div className="relative z-10 flex items-center justify-between mb-auto pb-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90">
                  {showcaseSlides[activeShowcase].tag}
                </span>
                <span className="text-xs text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full hidden sm:inline-block">
                  Swipe or drag to explore
                </span>
              </div>

              {/* Bottom Content & Navigation */}
              <div className="relative z-10 space-y-3 pointer-events-auto">
                <p className="text-sm sm:text-base text-white/95 font-normal leading-relaxed max-w-lg min-h-[48px]">
                  "{showcaseSlides[activeShowcase].quote}"
                </p>

                {/* Slider Pagination Inside Card */}
                <div className="flex items-center justify-between text-sm text-white/70 font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <span>0{activeShowcase + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleShowcaseSwipe(-1)}
                        disabled={activeShowcase === 0}
                        aria-label="Previous slide"
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white hover:text-black flex items-center justify-center text-white disabled:opacity-25 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShowcaseSwipe(1)}
                        disabled={activeShowcase === showcaseSlides.length - 1}
                        aria-label="Next slide"
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white hover:text-black flex items-center justify-center text-white disabled:opacity-25 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full mx-4 h-[1px] bg-white/20 relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
                      style={{ width: `${((activeShowcase + 1) / showcaseSlides.length) * 100}%` }}
                    />
                  </div>
                  <span>0{showcaseSlides.length}</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 04. "HOW IT WORKS (STEP BY STEP)" (Large Process Card Container) */}
        {/* ========================================================================= */}
        <motion.section 
          id="process"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[32px] sm:rounded-[40px] bg-[#f0f2f5] border border-gray-200/80 p-6 sm:p-10 lg:p-12 space-y-8"
        >
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-sm font-medium tracking-tight text-[#64748b]">
                ✦ How it Works (Step by Step)
              </span>
            </div>

            <div className="lg:col-span-8 space-y-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#121212] leading-[1.18]">
                We deliver a complete laser process from CAD nesting to burr-free dispatch.
              </h2>
              <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#64748b] leading-[1.18]">
                Each production run is monitored for optical focus, gas purity, and dimensional accuracy.
              </div>
            </div>
          </div>

          {/* Process Step Card with Clean Simple Transition */}
          <div className="relative overflow-hidden select-none">
            <AnimatePresence mode="wait" custom={stepDirection}>
              <motion.div
                key={activeStep}
                custom={stepDirection}
                initial={{ 
                  opacity: 0, 
                  x: stepDirection >= 0 ? 35 : -35
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0
                }}
                exit={{ 
                  opacity: 0, 
                  x: stepDirection >= 0 ? -35 : 35
                }}
                transition={{ 
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1]
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35 || info.velocity.x < -200) {
                    handleSwipeNext();
                  } else if (info.offset.x > 35 || info.velocity.x > 200) {
                    handleSwipePrev();
                  }
                }}
                className="rounded-3xl bg-white border border-gray-200/70 p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center cursor-grab active:cursor-grabbing touch-pan-y relative overflow-hidden"
              >
                {/* Step Left: Photo & Badge */}
                <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-100 relative group">
                  <img 
                    src={steps[activeStep].image} 
                    alt={steps[activeStep].title} 
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight shadow-md">
                    Step {steps[activeStep].number} of 0{steps.length}
                  </div>
                </div>

                {/* Step Right: Number & Description */}
                <div className="md:col-span-6 space-y-3 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121212]">
                      {steps[activeStep].number}
                    </span>
                    <span className="text-xs font-medium text-[#64748b] bg-gray-100 px-3 py-1 rounded-full hidden sm:inline-block">
                      Swipe left / right to navigate
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#64748b]">
                    {steps[activeStep].title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
                    {steps[activeStep].desc}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openQuoteModal(`Laser Process Consultation: ${steps[activeStep].title}`)}
                      className="px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Initiate This Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Step Navigation Controls (Prev/Next Arrows + Dots) */}
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={handleSwipePrev}
                        disabled={activeStep === 0}
                        aria-label="Previous step"
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {steps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleStepChange(i)}
                          className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                            activeStep === i ? 'bg-black w-7' : 'bg-gray-300 hover:bg-gray-400 w-3'
                          }`}
                          title={`Step ${i + 1}`}
                        />
                      ))}

                      <button
                        onClick={handleSwipeNext}
                        disabled={activeStep === steps.length - 1}
                        aria-label="Next step"
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step Pagination Line */}
          <div className="flex items-center justify-between text-sm text-[#64748b] font-medium pt-2">
            <span>01</span>
            <div className="w-full mx-4 h-[1px] bg-gray-300 relative">
              <div 
                className="absolute left-0 top-0 h-full bg-gray-800 transition-all duration-300"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span>04</span>
          </div>

        </motion.section>

        {/* ========================================================================= */}
        {/* 05. EDITORIAL ASYMMETRIC GALLERY (NOIR ARCHIVE TEMPLATE) */}
        {/* ========================================================================= */}
        <motion.section 
          id="gallery"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 sm:pt-10 border-t border-gray-200/80 overflow-hidden"
        >
          {/* Asymmetric 5-Column Collage Grid with Uneven Heights & Baseline Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            
            {/* COLUMN 1: Editorial Header Block + Uneven Bottom Landscape Card */}
            <div className="flex flex-col justify-between gap-6 sm:gap-8">
              <div className="space-y-4 pt-1">
                <span className="text-sm font-medium tracking-tight text-[#64748b]">
                  Section 05 — Facility Archive
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#121212] leading-[1.08]">
                  Beyond Limits.<br />
                  <span className="font-normal text-[#64748b]">Pure Precision.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-sm">
                  Vibrant factory snapshots capturing micron machining, robotic welding, and high-speed laser profiling in full color.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal("Gallery Program Inquiries & Facility Tours")}
                    className="px-6 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>See the Stories</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Card: Landscape (aspect-[4/3]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Heavy Structural Gantry Milling")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800"
                  alt="Heavy Structural Gantry Milling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Structural Bed
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Heavy Machine Base Milling
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 2: 2 Uneven Cards (Tall Portrait on Top, Landscape on Bottom) */}
            <div className="flex flex-col justify-end gap-4 sm:gap-5">
              {/* Card 2: Tall Portrait (aspect-[3/4]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: 5-Axis Aerospace Spindle Milling")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
                  alt="5-Axis Aerospace Spindle Milling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    5-Axis Machining
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Aerospace Impeller Spindle
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Landscape (aspect-[4/3]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Precision CNC Lathe Turning")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
                  alt="Precision CNC Lathe Turning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Live Tooling Lathe
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Sub-Micron Shaft Turning
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 3: 2 Uneven Cards (Square on Top, Tall Portrait on Bottom) */}
            <div className="flex flex-col justify-end gap-4 sm:gap-5">
              {/* Card 4: Square (aspect-square) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: High-Power Fiber Laser Cutting")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-square relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
                  alt="High-Power Fiber Laser Cutting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Fiber Laser Profiling
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    12kW Clean Kerf Cutting
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Tall Portrait (aspect-[3/4]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: 5-Axis Spiral Impeller Sculpting")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="/gear_flower_bloom.jpg"
                  alt="5-Axis Spiral Impeller Sculpting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Sculpted Geometry
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Continuous 5-Axis Impeller
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 4: Arrow Highlights List + 1 Tall Portrait Card at Bottom */}
            <div className="flex flex-col justify-between gap-6 sm:gap-8">
              {/* Arrow Feature Highlight List */}
              <div className="space-y-3.5 pt-6 lg:pt-14">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Silent precision.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Honest tolerances.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Pure metallurgy.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Zero-defect depth.</span>
                </div>
              </div>

              {/* Card 6: Tall Portrait (aspect-[3/4]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Zeiss Bridge CMM Metrology Lab")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
                  alt="Zeiss Bridge CMM Metrology Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Quality Metrology
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Zeiss Bridge CMM Probe
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 5: 3 Uneven Cards (Landscape on Top, Very Tall Portrait in Middle, Wide Landscape on Bottom) */}
            <div className="flex flex-col justify-end gap-4 sm:gap-5">
              {/* Card 7: Landscape (aspect-[4/3]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Hydraulic Press Brake Bending")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
                  alt="Hydraulic Press Brake Bending"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    CNC Forming
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Hydraulic Press Brake
                  </div>
                </div>
              </motion.div>

              {/* Card 8: Tall Vertical (aspect-[2/3]) */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Automated Robotic Welding Cell")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[2/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                  alt="Automated Robotic Welding Cell"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Robotic Fabrication
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Automated TIG/MIG Cell
                  </div>
                </div>
              </motion.div>

              {/* Free-standing Arrow Highlights in the Gap (No box) */}
              <div className="space-y-3.5 py-3 px-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Sub-micron concentricity.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Multi-axis live tooling.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Hardened alloy turning.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Certified shaft runout.</span>
                </div>
              </div>
            </div>

          </div>

          {/* SECONDARY & FINAL TIERS: ROW 2 & ROW 3 WITH DIFFERENTIAL LENGTHS ENDING AT THE SAME LINE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 items-stretch">
            
            {/* COLUMN 1: Tall Portrait (aspect-[3/4]) + Medium Landscape (aspect-[4/3]) */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2 Card */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Advanced Facility Infrastructure & Plant Bed")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="/industrial_monument.jpg"
                  alt="Advanced Facility Infrastructure & Plant Bed"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Unit 01 Coimbatore
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    High-Bay Manufacturing Plant
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 2: Sleek Free-standing Arrow Highlights in the Gap */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2: Free-standing Arrow Highlights in the Gap (No box) */}
              <div className="space-y-3.5 py-3 px-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Silent precision.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Honest tolerances.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Pure metallurgy.</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                  <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                  <span>Zero-defect depth.</span>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Classic Landscape (aspect-[4/3]) + Tall Portrait (aspect-[3/4]) */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2 Card */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Automated Dual-Bed Pallet Shuttle")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
                  alt="Automated Dual-Bed Pallet Shuttle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Continuous Infeed
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Dual-Bed Shuttle Automation
                  </div>
                </div>
              </motion.div>

              {/* Row 3 Final Card */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Automated Robotic Pick & Place Cell")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden flex-1 min-h-[190px] aspect-[3/4] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Automated Robotic Pick & Place Cell"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Robotics & Automation
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Automated Robotic Assembly Cell
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 4: Dramatic Tall Portrait (aspect-[2/3]) + Sleek Wide Landscape (aspect-[16/9]) */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2 Card */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Heavy Structural Rig Weldments")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[2/3] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
                  alt="Heavy Structural Rig Weldments"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Heavy Fabrication
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Machine Rig Base Fabrication
                  </div>
                </div>
              </motion.div>

              {/* Row 3 Final Card */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Modular Workstation Production Cells")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden flex-1 min-h-[160px] aspect-[16/9] relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="/isometric_blue_blocks.jpg"
                  alt="Modular Workstation Production Cells"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Plant Engineering
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Modular Lean Workstation Cells
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 5: Balanced Square (aspect-square) + Balanced Square (aspect-square) */}
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-5">
              {/* Row 2 Card */}
              <motion.div
                initial={{ opacity: 0, x: 70, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openQuoteModal("Program Inquiry: Certified Global Packaging & Dispatch")}
                className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-square relative group cursor-pointer border border-gray-100 bg-gray-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
                  alt="Certified Global Packaging & Dispatch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5 text-white">
                  <div className="text-[10px] font-normal tracking-tight text-white/70">
                    Logistics Fulfillment
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                    Certified Global Dispatch
                  </div>
                </div>
              </motion.div>

              {/* Row 3: Free-standing Engineering CTA in the Gap (No box) */}
              <div className="space-y-3.5 py-3 px-1">
                <span className="text-xs font-normal tracking-tight text-[#64748b] block">
                  Engineering Desk
                </span>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                    <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                    <span>Rapid tooling review.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                    <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                    <span>Design for manufacturability.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-normal tracking-tight text-[#121212]">
                    <ArrowUpRight className="w-4 h-4 text-[#64748b] shrink-0" />
                    <span>Zero-defect SLA dispatch.</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal("Direct Engineering Consultation & Rapid RFQ")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-[#121212] hover:text-black hover:underline cursor-pointer"
                  >
                    <span>Start Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.section>

      </div>

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
                  Laser Cutting Division
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-[#121212]">
                  Request Laser Cutting Quote
                </h3>
                <p className="text-sm text-[#475569] font-normal leading-relaxed">
                  Submit DXF, DWG, or STEP files for instant nesting analysis and price quotation.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your laser cutting inquiry has been received. Our team will review your drawings and respond with a DFM quotation within 24 hours.");
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
                    Profile Cutting Scope
                  </label>
                  <input
                    type="text"
                    defaultValue={quoteSubject || "12kW High-Power Fiber Laser Program"}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium tracking-tight text-[#121212] mb-1">
                    Material Type, Thickness &amp; Batch Quantity
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 6mm SS304 plate, 500 pcs; or 50mm square tube, 200 pcs..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-sm text-[#121212] font-normal placeholder-gray-400 resize-none bg-gray-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#121212] hover:bg-black text-white font-medium text-sm tracking-tight transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Laser RFQ</span>
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
