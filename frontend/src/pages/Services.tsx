import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, ArrowUpRight, ArrowRight, X, PhoneCall, Mail, 
  CheckCircle2, Clock, ShieldCheck, Factory, Sparkles, 
  Sliders, Cpu, Layers, MessageSquare, Zap, Target, Box
} from 'lucide-react';

export default function Services() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState("");
  
  // Slider state for "What We Do" section
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = 360;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleSliderScroll = () => {
    if (sliderRef.current) {
      const scrollPos = sliderRef.current.scrollLeft;
      const cardWidth = 360;
      const index = Math.round(scrollPos / cardWidth);
      setCurrentSlide(Math.min(Math.max(index, 0), 4));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const openQuoteModal = (subject: string) => {
    setQuoteSubject(subject);
    setIsQuoteModalOpen(true);
  };


  // Engineering Solutions Table Data (Section 5)
  const capabilitiesSchedule = [
    {
      id: "01",
      title: "12kW High-Speed Fiber Laser",
      description: "Clean nitrogen cutting of mild steel, stainless, and aluminum up to 32mm with zero dross and sub-millimeter kerf accuracy.",
      turnaround: "Same-Day Dispatch",
      category: "Laser Processing"
    },
    {
      id: "02",
      title: "5-Axis Simultaneous CNC Milling",
      description: "Sub-micron continuous 5-axis turning and milling for complex aerospace housings, automotive dies, and turbine contours (Ra < 0.2µm).",
      turnaround: "2 - 4 Days",
      category: "Precision Machining"
    },
    {
      id: "03",
      title: "Turnkey SPM Automation Lines",
      description: "Custom-built special purpose machinery, conveyor feed assemblies, and automated line fixtures engineered from 3D digital twins.",
      turnaround: "Scheduled FAT",
      category: "SPM & Automation"
    },
    {
      id: "04",
      title: "Robotic MIG / TIG Structural Welding",
      description: "Heavy plate fabrication and load-bearing chassis assemblies up to 50 tons, verified with ultrasonic NDT and weld penetration tests.",
      turnaround: "Batch Delivery",
      category: "Heavy Fabrication"
    },
    {
      id: "05",
      title: "3D CMM Metrology & Quality Audit",
      description: "Climate-regulated coordinate inspection verifying 100% CAD compliance with certified digital MTR mill dossiers and heat traceability.",
      turnaround: "24-Hour Protocol",
      category: "Quality Assurance"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#fafafa] text-[#121212] font-sans pt-20 sm:pt-24 pb-20 selection:bg-[#121212] selection:text-white overflow-x-hidden">
      
      {/* Site-wide Container Matching All Sections */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 space-y-12 lg:space-y-16">

        {/* ========================================================================= */}
        {/* 01. HERO SECTION (Compact Height with Horizontal Video) */}
        {/* ========================================================================= */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden pt-1 pb-6 sm:pb-8 border-b border-gray-200/90"
        >
          
          {/* Subtle Background Geometric Wireframe Watermark (Matching Section 03) */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none opacity-15 -mr-16 -mt-16">
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-gray-900" fill="none">
              {Array.from({ length: 20 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="200"
                  cy="200"
                  rx={26 + i * 8}
                  ry={13 + i * 4.4}
                  strokeDasharray="2 4"
                  strokeWidth="0.85"
                  transform={`rotate(${i * 8} 200 200)`}
                />
              ))}
            </svg>
          </div>

          {/* Top Breadcrumb */}
          <div className="mb-4 sm:mb-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400"
            >
              <a href="/" className="hover:text-black transition-colors">Home</a>
              <span className="text-gray-300">/</span>
              <span className="text-[#121212]">Our Services</span>
            </motion.div>
          </div>

          {/* Hero Main Content Row with Widened Horizontal Video & Right-to-Left Fade */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left Column (5 cols): Display Typography, Sub-headline & Clean Pill CTAs */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-tight text-[#121212] leading-[1.06] font-heading"
              >
                Our Services
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-gray-500 font-light max-w-xl leading-relaxed"
              >
                Pioneering engineering excellence, 12kW fiber laser cutting, 5-axis CNC machining, and automated SPM production lines engineered for micron tolerances and industrial scale.
              </motion.p>

              {/* Signature Pill CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 pt-1"
              >
                <button 
                  onClick={() => openQuoteModal("Services Hero RFQ")}
                  className="px-7 py-3 rounded-full bg-[#121212] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 group cursor-pointer active:scale-95"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-7 py-3 rounded-full bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black text-gray-800 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs flex items-center gap-2 group cursor-pointer active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-gray-800 group-hover:text-white" />
                  </div>
                  <span>Watch Facility Reel</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column (7 cols): Horizontal Video widened by 3cm (~114px) and fading out from right to left */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative w-full max-w-[794px] xl:max-w-[854px] aspect-[16/9] sm:aspect-[18/10] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.3)_15%,rgba(0,0,0,0.85)_30%,black_45%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.3)_15%,rgba(0,0,0,0.85)_30%,black_45%,black_100%)]"
                title="Click to Watch Full Screen Reel"
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  poster="/industrial_monument.jpg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="/boomerang_laser.mp4" type="video/mp4" />
                  <source src="/boomerang_production.mp4" type="video/mp4" />
                  <source src="/hero_boomerang.mp4" type="video/mp4" />
                </video>

                {/* Soft gradient edge overlay for seamless left fade into page background */}
                <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-white via-white/30 to-transparent z-10" />

                {/* Subtle dark overlay and frosted play button on hover */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors flex items-center justify-center pl-8 sm:pl-14">
                  <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white group-hover:text-[#121212] transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </motion.section>


        {/* ========================================================================= */}
        {/* 03. "WHAT WE DO ↴" CAROUSEL SECTION (Swipeable with Scroll In-View Fade) */}
        {/* ========================================================================= */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden pt-4 pb-8 border-b border-gray-200/90"
        >
          
          {/* Subtle Background Wireframe Dot Vortex Watermark (Top Right) */}
          <div className="absolute top-0 right-0 w-[440px] h-[440px] pointer-events-none opacity-20 -mr-16 -mt-16">
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-gray-900" fill="none">
              {Array.from({ length: 20 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="200"
                  cy="200"
                  rx={25 + i * 8.5}
                  ry={12 + i * 4.8}
                  strokeDasharray="2 4"
                  strokeWidth="0.85"
                  transform={`rotate(${i * 9} 200 200)`}
                />
              ))}
            </svg>
          </div>

          {/* Section Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
            {/* Left: Title & About Us Pill Button */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#121212] leading-[1.08] font-heading">
                What We Do
              </h2>

              <div>
                <button
                  onClick={() => openQuoteModal("What We Do Inquiry")}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all shadow-2xs active:scale-95"
                >
                  <span>About Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Right: Subtitle Line */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex lg:justify-end items-end"
            >
              <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xs leading-relaxed">
                Design, Develop And Run Any Precision Engineering / Manufacturing Systems You Need.
              </p>
            </motion.div>
          </div>

          {/* Horizontal Scrollable Cards Carousel with Interactive Drag/Swipe Ability */}
          <div 
            ref={sliderRef}
            onScroll={handleSliderScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 snap-x snap-mandatory select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            
            {/* Card 1: Featured Card with Blue 3D Blocks Graphic */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: isDragging ? 0 : -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Top Custom Notched Graphic Card */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 shadow-inner p-4 flex flex-col justify-end">
                  <img 
                    src="/isometric_blue_blocks.jpg" 
                    alt="Building Your Hardware Your Way" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/30 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white leading-snug drop-shadow-sm">
                      Building Your Hardware Your Way
                    </h3>
                  </div>
                </div>

                <div className="w-8 h-0.5 bg-gray-300" />

                <p className="text-xs sm:text-[13px] text-gray-600 font-light leading-relaxed">
                  A comprehensive suite of capabilities that helps industrial leaders fabricate and scale by delivering sub-micron precision, 12kW fiber cutting, and seamless assembly integration.
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#121212] group-hover:text-white transition-colors">
                  <Box className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Optimize Production Throughput */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: isDragging ? 0 : -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#121212] leading-snug">
                  Optimize <br />
                  Manufacturing Lines
                </h3>

                <div className="w-8 h-0.5 bg-gray-300" />

                <p className="text-xs sm:text-[13px] text-gray-600 font-light leading-relaxed">
                  Streamline multi-axis CNC milling, eliminate cycle time bottlenecks, and improve structural component quality for high-volume automotive and aerospace runs.
                </p>
              </div>

              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#121212] group-hover:text-white transition-colors">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 3: Turn Complex CAD Into Hardware */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: isDragging ? 0 : -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.19, ease: "easeOut" }}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#121212] leading-snug">
                  Turn Complex CAD <br />
                  Into Hardware Visually
                </h3>

                <div className="w-8 h-0.5 bg-gray-300" />

                <p className="text-xs sm:text-[13px] text-gray-600 font-light leading-relaxed">
                  Directly import CAD models into our 5-axis CAM tooling pipelines with automated toolpath optimization and finite element load verification.
                </p>
              </div>

              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#121212] group-hover:text-white transition-colors">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 4: Turnkey SPM Machinery */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: isDragging ? 0 : -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.26, ease: "easeOut" }}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#121212] leading-snug">
                  Custom Turnkey <br />
                  SPM Machinery Cells
                </h3>

                <div className="w-8 h-0.5 bg-gray-300" />

                <p className="text-xs sm:text-[13px] text-gray-600 font-light leading-relaxed">
                  Custom-built automated SPM workstations, indexing conveyors, and robotic handling cells delivering 24/7 reliability with 100% FAT sign-off.
                </p>
              </div>

              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#121212] group-hover:text-white transition-colors">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

            {/* Card 5: Zero-Defect 3D Metrology */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: isDragging ? 0 : -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.33, ease: "easeOut" }}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#121212] leading-snug">
                  Zero-Defect 3D <br />
                  CMM Metrology Lab
                </h3>

                <div className="w-8 h-0.5 bg-gray-300" />

                <p className="text-xs sm:text-[13px] text-gray-600 font-light leading-relaxed">
                  Climate-regulated coordinate inspection verifying 100% CAD compliance with certified digital MTR mill dossiers and heat traceability.
                </p>
              </div>

              <div className="pt-8 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#121212] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Slider Navigation */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollSlider('left')}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-2xs active:scale-95"
                title="Previous Slide"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>

              <button
                onClick={() => scrollSlider('right')}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-2xs active:scale-95"
                title="Next Slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Progress Dash Indicators */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    currentSlide === i ? 'w-8 bg-gray-900' : 'w-4 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

        </motion.section>

        {/* ========================================================================= */}
        {/* 04. "ABOUT HITECH ECOSYSTEM" (Scroll Slide-in From Left & Right) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start overflow-hidden">
          
          {/* Left: Huge Editorial Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#121212] tracking-tight leading-[1.12] font-heading">
              About HiTech <br className="hidden sm:inline" />
              Ecosystem
            </h2>
          </motion.div>

          {/* Right: Descriptive Dual Paragraphs & Black Pill Button */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
              HiTech is an integrated precision engineering and contract manufacturing powerhouse engineered for industrial innovators. We unite high-precision mechanical fabrication, 12kW fiber laser cutting, and continuous 5-axis CNC machining under one single-roof plant.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
              Our infrastructure operates as a unified collaborative facility with zero defect tolerance, comprehensive 3D CMM metrology inspection, and dedicated technical leadership for every mission-critical project.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openQuoteModal("Ecosystem Capabilities")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95"
              >
                <span>More Details +</span>
              </button>
            </div>
          </motion.div>

        </section>

        {/* ========================================================================= */}
        {/* 05. ASYMMETRIC BENTO GRID (Modern Minimalist Showcase with Fluid In-View Reveal) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column (7 cols): Main Visual & "Modern Minimalist" Title */}
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6"
          >
            
            {/* Top Media Container - Balanced Height */}
            <div className="w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[28px] overflow-hidden bg-[#e5e5e5] border border-gray-200 shadow-2xs relative group">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1400&auto=format&fit=crop" 
                alt="Modern Industrial Laser & CNC"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>

            {/* Bottom Title with Pill Badge */}
            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700 shadow-2xs">
                <span>Stylized Engineering</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#121212] tracking-tight leading-[1.08] font-heading">
                Modern <br />
                Minimalist
              </h3>
            </div>

          </motion.div>

          {/* Right Column (5 cols): Stacked 2 Cards with Balanced Heights & Staggered In-View Animation */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Card: Light Card (Pristine Standards) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 rounded-[28px] bg-[#f2f2f2] border border-gray-200/80 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700">
                  <span>Comfort & Efficiency</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                  Pristine cleanliness, rigorous order, and micron-level accuracy engineered for demanding production schedules.
                </p>
              </div>

              <div className="pt-4">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#121212] font-heading tracking-tight">
                  Pristine Standards
                </h4>
              </div>

            </motion.div>

            {/* Bottom Card: Premium Dark/Charcoal Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 rounded-[28px] bg-[#1e1e1e] text-white p-6 sm:p-8 flex flex-col justify-between relative shadow-sm hover:shadow-xl transition-shadow"
            >
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90">
                  <span>Premium Fleet Infrastructure</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-sm">
                  Every mechanical component is verified through coordinate metrology to guarantee structural integrity, long service life, and effortless assembly fit.
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                  ISO 9001:2015 Traceability
                </span>

                <button
                  onClick={() => openQuoteModal("Premium Fleet Consultation")}
                  className="w-10 h-10 rounded-full bg-white text-[#121212] flex items-center justify-center hover:scale-110 transition-transform shadow-md shrink-0 active:scale-95"
                  title="Explore Specifications"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </motion.div>

          </div>

        </section>

      </div>

      {/* ========================================================================= */}
      {/* 05. EDITORIAL METRIC SHOWCASE (Full-Bleed Edge-to-Edge Grid Section) */}
      {/* ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full border-y border-gray-300 bg-white my-14 sm:my-20"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12">
          
          {/* Card 1: Left Main Box (3D Flip Card) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gray-300 flip-card-container group cursor-pointer relative min-h-[460px] sm:min-h-[520px] lg:min-h-[600px]">
            <div className="flip-card-inner">
              
              {/* Front Face: Minimalist Typography & Narrative */}
              <div className="flip-card-front relative w-full h-full p-8 sm:p-12 md:p-16 lg:p-20 bg-white flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-bold tracking-tight text-[#121212] leading-[1] uppercase font-sans">
                    From first<br />
                    idea to a<br />
                    place that<br />
                    breathes.
                  </h2>
                </div>

                <div className="pt-12 lg:pt-24 flex items-end justify-between gap-4">
                  <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed max-w-md">
                    We believe that precision engineering is measured not only in microns — but in meaning and reliability. These numbers reflect the care, consistency, and vision we bring into every project.
                  </p>
                  <span className="text-[11px] font-mono tracking-widest text-[#00A6FB] uppercase font-semibold hidden sm:inline-flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform">
                    Flip ↻
                  </span>
                </div>
              </div>

              {/* Back Face: Signature Blue Background & Detailed Architecture Scope */}
              <div className="flip-card-back bg-gradient-to-br from-[#00A6FB] via-[#0091e6] to-[#005f9e] text-white p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between shadow-2xl overflow-hidden">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-white border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                      Precision Philosophy
                    </span>
                    <span className="text-white/70 font-mono text-xs tracking-widest uppercase">
                      HITECH CORE
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mt-6 mb-3">
                    From First Concept to Industrial Reality
                  </h3>

                  <p className="text-xs sm:text-sm text-blue-50/95 leading-relaxed font-normal mb-6">
                    Every specification is engineered through advanced CAD analysis, 5-axis CNC machining, 12kW fiber laser cutting, and micro-tolerance verification. We engineer spaces, structural enclosures, and components built for uncompromising longevity.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-medium text-white border border-white/20">
                      ±0.005mm Tolerances
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-medium text-white border border-white/20">
                      ISO 9001:2015 Assured
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-medium text-white border border-white/20">
                      End-to-End Turnkey DFM
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20 flex items-center justify-between text-xs text-blue-100 font-medium">
                  <span>Engineered with Zero Compromise</span>
                  <div className="flex items-center gap-1 text-white font-semibold">
                    <span>Explore Fleet</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 4-Quadrant Metric Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2">
            
            {/* Quadrant 1: Top-Left (28 Projects - 3D Flip Card) */}
            <div className="flip-card-container group cursor-pointer relative border-b border-r-0 sm:border-r border-gray-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[300px]">
              <div className="flip-card-inner">
                
                {/* Front Face */}
                <div className="flip-card-front relative w-full h-full p-8 sm:p-10 md:p-12 lg:p-14 bg-white flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#00A6FB] uppercase font-semibold absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Turn ↻
                  </span>
                  <div className="flex items-end justify-between gap-4 w-full">
                    <span className="text-xs sm:text-sm text-[#475569] font-normal leading-snug max-w-[160px]">
                      Completed residential and commercial projects
                    </span>
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#121212] tracking-tighter leading-none">
                      28
                    </span>
                  </div>
                </div>

                {/* Back Face: Signature Blue */}
                <div className="flip-card-back bg-gradient-to-br from-[#00A6FB] to-[#005f9e] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/20">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-blue-100 font-semibold">
                      01 / Proven Track Record
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-200" />
                  </div>

                  <div className="my-auto py-2">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                      28+ Major Deployments
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-50/95 leading-relaxed">
                      Turnkey structural frameworks, facade assemblies, robotic enclosures, and industrial production lines delivered with 100% on-time completion.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-[11px] text-blue-100 font-semibold tracking-wider uppercase">
                    <span>100% Sign-Off</span>
                    <span>Industrial Scope</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quadrant 2: Top-Right (12 Years - 3D Flip Card) */}
            <div className="flip-card-container group cursor-pointer relative border-b border-gray-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[300px]">
              <div className="flip-card-inner">
                
                {/* Front Face */}
                <div className="flip-card-front relative w-full h-full p-8 sm:p-10 md:p-12 lg:p-14 bg-white flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#00A6FB] uppercase font-semibold absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Turn ↻
                  </span>
                  <div className="flex items-end justify-between gap-4 w-full">
                    <span className="text-xs sm:text-sm text-[#475569] font-normal leading-snug max-w-[160px]">
                      Years of architectural practice
                    </span>
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#121212] tracking-tighter leading-none">
                      12
                    </span>
                  </div>
                </div>

                {/* Back Face: Signature Blue */}
                <div className="flip-card-back bg-gradient-to-br from-[#00A6FB] to-[#005f9e] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/20">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-blue-100 font-semibold">
                      02 / Industry Mastery
                    </span>
                    <ShieldCheck className="w-4 h-4 text-cyan-200" />
                  </div>

                  <div className="my-auto py-2">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                      12+ Years Precision Legacy
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-50/95 leading-relaxed">
                      Over a decade mastering heavy-duty laser profiling, multi-axis milling, metallurgical treatment, and zero-defect quality management.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-[11px] text-blue-100 font-semibold tracking-wider uppercase">
                    <span>25,000+ Machine Hours</span>
                    <span>Expertise</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quadrant 3: Bottom-Left (6 Countries - 3D Flip Card) */}
            <div className="flip-card-container group cursor-pointer relative border-b sm:border-b-0 border-r-0 sm:border-r border-gray-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[300px]">
              <div className="flip-card-inner">
                
                {/* Front Face */}
                <div className="flip-card-front relative w-full h-full p-8 sm:p-10 md:p-12 lg:p-14 bg-white flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#00A6FB] uppercase font-semibold absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Turn ↻
                  </span>
                  <div className="flex items-end justify-between gap-4 w-full">
                    <span className="text-xs sm:text-sm text-[#475569] font-normal leading-snug max-w-[160px]">
                      Countries with built spaces
                    </span>
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#121212] tracking-tighter leading-none">
                      6
                    </span>
                  </div>
                </div>

                {/* Back Face: Signature Blue */}
                <div className="flip-card-back bg-gradient-to-br from-[#00A6FB] to-[#005f9e] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/20">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-blue-100 font-semibold">
                      03 / Global Supply Chain
                    </span>
                    <Zap className="w-4 h-4 text-cyan-200" />
                  </div>

                  <div className="my-auto py-2">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                      6 International Markets
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-50/95 leading-relaxed">
                      Exporting certified precision assemblies, specialized jigs, and architectural metalwork adhering to stringent international standards.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-[11px] text-blue-100 font-semibold tracking-wider uppercase">
                    <span>Export-Grade Certified</span>
                    <span>Global Reach</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quadrant 4: Bottom-Right (100 Concepts - 3D Flip Card) */}
            <div className="flip-card-container group cursor-pointer relative min-h-[240px] sm:min-h-[270px] lg:min-h-[300px]">
              <div className="flip-card-inner">
                
                {/* Front Face */}
                <div className="flip-card-front relative w-full h-full p-8 sm:p-10 md:p-12 lg:p-14 bg-white flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#00A6FB] uppercase font-semibold absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Turn ↻
                  </span>
                  <div className="flex items-end justify-between gap-4 w-full">
                    <span className="text-xs sm:text-sm text-[#475569] font-normal leading-snug max-w-[160px]">
                      Custom concepts for every client
                    </span>
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#121212] tracking-tighter leading-none">
                      100
                    </span>
                  </div>
                </div>

                {/* Back Face: Signature Blue */}
                <div className="flip-card-back bg-gradient-to-br from-[#00A6FB] to-[#005f9e] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/20">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-blue-100 font-semibold">
                      04 / Bespoke DFM
                    </span>
                    <Target className="w-4 h-4 text-cyan-200" />
                  </div>

                  <div className="my-auto py-2">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                      100% Tailored Engineering
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-50/95 leading-relaxed">
                      Zero generic compromises. Every fixture, frame, and architectural profile is custom modeled and validated specifically for client requirements.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-[11px] text-blue-100 font-semibold tracking-wider uppercase">
                    <span>Bespoke Prototyping</span>
                    <span>Tailored DFM</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* Re-open container for Capabilities & Fleet Schedule */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 space-y-16">

        {/* ========================================================================= */}
        {/* 06. ENGINEERING SOLUTIONS & CAPABILITIES TABLE (Staggered Row Reveals) */}
        {/* ========================================================================= */}
        <motion.section 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 pt-8 border-t border-gray-200"
        >
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#121212] tracking-tight leading-tight font-heading">
                Engineering Solutions <br />
                for 2026
              </h2>
            </div>

            <div className="max-w-md space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                Schedule of specialized machining capabilities, delivery turnaround times, and certified quality protocols across our industrial manufacturing plant.
              </p>

              <div>
                <button
                  onClick={() => openQuoteModal("All Engineering Solutions")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                >
                  <span>Explore All Capabilities →</span>
                </button>
              </div>
            </div>

          </div>

          {/* Minimalist Data Table (Row-by-Row Smooth Entrance) */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-300 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 pr-6">Service & Fleet</th>
                  <th className="py-4 px-6">Technical Capabilities & Scope</th>
                  <th className="py-4 px-6 text-center">Turnaround</th>
                  <th className="py-4 pl-6 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {capabilitiesSchedule.map((row, idx) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
                    onClick={() => openQuoteModal(row.title)}
                    className="hover:bg-gray-100/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-5 pr-6">
                      <div className="text-base sm:text-lg font-bold text-[#121212] font-heading group-hover:text-blue-900 transition-colors">
                        {row.title}
                      </div>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {row.category}
                      </span>
                    </td>

                    <td className="py-5 px-6 max-w-md">
                      <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                        {row.description}
                      </p>
                    </td>

                    <td className="py-5 px-6 text-center whitespace-nowrap">
                      <span className="px-3.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono font-medium text-gray-800">
                        {row.turnaround}
                      </span>
                    </td>

                    <td className="py-5 pl-6 text-right whitespace-nowrap">
                      <div className="inline-flex w-8 h-8 rounded-full bg-gray-200 group-hover:bg-[#121212] group-hover:text-white items-center justify-center transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

        </motion.section>

      </div>

      {/* ========================================================================= */}
      {/* VIDEO PREVIEW MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-video flex items-center justify-center"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <video 
                autoPlay 
                loop 
                controls 
                className="w-full h-full object-cover"
              >
                <source src="/hero_boomerang.mp4" type="video/mp4" />
                <source src="/boomerang_laser.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FAST RFQ / INQUIRY MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full text-gray-900 shadow-2xl relative border border-gray-200"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Direct Engineering RFQ
                </span>
                <h3 className="text-2xl font-bold font-heading text-[#121212]">
                  Request Project Consultation
                </h3>
                <p className="text-xs text-gray-500">
                  {quoteSubject ? `Subject: ${quoteSubject}` : "Fast-track technical response within 2 business hours"}
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your engineering request has been received. Our chief engineer will get in touch shortly.");
                  setIsQuoteModalOpen(false);
                }}
                className="mt-6 space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name / Company
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. John Doe - TechCorp Industries"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="engineer@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Service of Interest
                  </label>
                  <input
                    type="text"
                    defaultValue={quoteSubject || "General Precision Engineering"}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-gray-900 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    CAD Notes & Specifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details on materials, tolerances, quantities, and delivery schedules..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#121212] text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#121212] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                >
                  Submit Inquiry
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
