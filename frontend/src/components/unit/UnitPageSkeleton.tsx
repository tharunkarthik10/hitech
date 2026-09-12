import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, CheckCircle2, ShieldCheck, 
  Sparkles, Layers, Cpu, Award, Zap, PhoneCall, Mail, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UnitData, GalleryItem } from '../../data/unitsData';
import AnimatedCounter from './AnimatedCounter';
import GalleryLightbox from './GalleryLightbox';

interface UnitPageSkeletonProps {
  data: UnitData;
}

export default function UnitPageSkeleton({ data }: UnitPageSkeletonProps) {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Parallax Scroll for Hero Background
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ['0%', '25%']);

  // Timeline Scroll Line Animation
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-100px' });

  const { theme, breadcrumb, unitName, tagline, heroImage, heroBadge, overview, capabilities, process, machinery, whyChooseUs, gallery, cta } = data;

  return (
    <main className="w-full bg-[#F8FAFC] text-[#051923] overflow-x-clip font-sans selection:bg-[#051923] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (HOME PAGE HERO SLIDER PALETTE & STYLING) */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden border-b border-gray-200">
        {/* Parallax Background Image with Home Page Dark Scrim Overlay */}
        <motion.div 
          style={{ y: heroImageY }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={heroImage}
            alt={unitName}
            className="w-full h-full object-cover scale-110 filter brightness-[0.45] contrast-125"
          />
          {/* Home Page Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#051923]/95 via-[#051923]/80 to-[#051923]/60" />
          
          {/* Subtle Home Page Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Dynamic Ambient Glow */}
          <div 
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#006494] rounded-full blur-[160px] pointer-events-none opacity-25`}
          />
        </motion.div>

        {/* Hero Main Content Container (2-Column Layout with Address on the Right) */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto mt-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Title, Tagline & Single CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Headline Unit Name */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-tight uppercase leading-[1.05] mb-6 max-w-4xl font-headline-xl"
            >
              {unitName}
              <span style={{ color: theme.accentHex }}>.</span>
            </motion.h1>

            {/* Decorative Accent Bar */}
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '120px' }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="h-1.5 rounded-full mb-8"
              style={{ backgroundColor: theme.accentHex }}
            />

            {/* One-Line Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="text-lg md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed mb-10 text-balance"
            >
              {tagline}
            </motion.p>

            {/* Single CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4 }}
            >
              <Link
                to="/contact"
                className={`px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase flex items-center gap-3 transition-all duration-300 shadow-xl ${theme.buttonBg} hover:scale-[1.03] active:scale-[0.98]`}
              >
                <span>Get a Quote for {unitName.replace(' Division', '')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Clean Unboxed Floating Facility Address Block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="lg:col-span-5 flex justify-start lg:justify-end items-center"
          >
            <div className="w-full max-w-sm sm:max-w-md border-l-2 border-[#00A6FB] pl-5 sm:pl-6 py-1 space-y-5 text-white">
              {/* Facility Title & Active Status */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00A6FB]">
                    Coimbatore Facility Hub
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-headline-xl">
                  Hitech Engineering Works
                </h3>
              </div>

              {/* Location Address */}
              <div className="space-y-1 text-sm text-gray-200 leading-relaxed">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Main Manufacturing & Plant Location
                </p>
                <p className="font-normal text-white/90">
                  SF No. 428/2, Industrial Estate Road, Peelamedu,
                </p>
                <p className="font-normal text-white/90">
                  Coimbatore, Tamil Nadu – 641004, India
                </p>
              </div>

              {/* Thin Divider Line & Contact Lines */}
              <div className="border-t border-white/15 pt-4 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <PhoneCall className="w-4 h-4 text-[#00A6FB] flex-shrink-0" />
                  <span className="font-medium text-white/90">+91 (422) 298-7654 / +91 98422 12345</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Mail className="w-4 h-4 text-[#00A6FB] flex-shrink-0" />
                  <span className="font-medium text-white/90">info@hitechengineering.com</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW / INTRO SECTION (HOME PAGE LIGHT & DEEP NAVY CONTRAST) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#F8FAFC] relative border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Intro */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: theme.accentHex }} />
              <span className="text-xs font-bold tracking-widest text-[#006494] uppercase font-label-caps">
                {overview.subtitle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#051923] tracking-tight leading-[1.1] font-headline-xl">
              {overview.title}
              <span style={{ color: theme.accentHex }}>.</span>
            </h2>

            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed font-light">
              {overview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Feature Cards matching Home Page WhyChooseUs card styling */}
            <div className="pt-4 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#006494]/30 transition-all duration-500">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.accentHex }} />
                <div>
                  <h4 className="text-sm font-bold text-[#051923]">ISO Quality Certified</h4>
                  <p className="text-xs text-gray-600">Strict compliance & full batch traceability.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#006494]/30 transition-all duration-500">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.accentHex }} />
                <div>
                  <h4 className="text-sm font-bold text-[#051923]">Turnkey Operations</h4>
                  <p className="text-xs text-gray-600">From raw material to finished distribution.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image with Floating Spec Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl group bg-white">
              <img
                src={overview.image}
                alt={overview.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051923]/70 via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 right-6 p-5 rounded-2xl bg-[#051923]/95 border border-white/10 backdrop-blur-xl shadow-2xl max-w-[220px]">
                <div className="text-3xl font-extrabold text-white mb-1" style={{ color: theme.accentHex }}>
                  {overview.floatingBadge.number}
                </div>
                <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  {overview.floatingBadge.label}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY CAPABILITIES / WHAT WE DO SECTION (WHITE BACKDROP & CRISP CARDS) */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-24 px-4 md:px-8 lg:px-12 bg-white relative border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accentHex }} />
              Key Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#051923] tracking-tight font-headline-xl">
              What We Do Best
              <span style={{ color: theme.accentHex }}>.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-light">
              State-of-the-art engineering capabilities tailored specifically to the operational requirements of our {unitName.toLowerCase()}.
            </p>
          </div>

          {/* 4 Cards Grid (Home Page FeaturedSolutions Style) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.0, delay: idx * 0.2 }}
                  className="group relative p-8 rounded-2xl bg-[#F8FAFC] border border-gray-200 hover:border-[#006494]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Hover Background Image at 9% Opacity */}
                  {cap.image && (
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.09] transition-opacity duration-700 overflow-hidden pointer-events-none">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                  )}

                  {/* Subtle top accent line on hover */}
                  <div 
                    className="absolute top-0 left-8 right-8 h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    style={{ backgroundColor: theme.accentHex }}
                  />

                  <div className="relative z-10">
                    {/* Icon Box */}
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white border border-gray-200 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-500`}
                    >
                      <IconComp className="w-7 h-7" style={{ color: theme.accentHex }} />
                    </div>

                    <h3 className="text-xl font-bold text-[#051923] mb-3 group-hover:text-[#006494] transition-colors duration-500">
                      {cap.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
                      {cap.desc}
                    </p>
                  </div>

                  {/* Spec Bullets */}
                  <div className="relative z-10 pt-4 border-t border-gray-200/80 space-y-2">
                    {cap.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PROCESS / WORKFLOW SECTION (DEEP NAVY WRAPPER LIKE HOME ABOUTSECTION) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#F8FAFC] relative border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto">
          
          {/* Home Page AboutSection Style Dark Navy Box Wrapper */}
          <div className="relative w-full bg-[#051923] rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-white/10 text-white overflow-hidden">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                {process.subtitle}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-headline-xl">
                {process.title}
                <span style={{ color: theme.accentHex }}>.</span>
              </h2>
              <p className="text-gray-300 text-base font-light">
                Streamlined, step-by-step workflow designed for rapid execution and flawless repeatability.
              </p>
            </div>

            {/* Timeline Container */}
            <div ref={timelineRef} className="relative">

              {/* 4 Steps Grid */}
              <div className="grid lg:grid-cols-4 gap-8 relative z-10">
                {process.steps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.9, delay: idx * 0.22 }}
                      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 group backdrop-blur-sm"
                    >
                      {/* Step Number Circle */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-lg text-white mb-6 border-4 border-[#051923] shadow-xl transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: theme.accentHex }}
                      >
                        {step.number}
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-2">
                        <StepIcon className="w-4 h-4 text-gray-300" />
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed font-light mb-4">
                        {step.desc}
                      </p>

                      <div className="mt-auto pt-3 border-t border-white/10 w-full text-xs text-gray-400 italic font-mono">
                        "{step.detail}"
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MACHINERY / EQUIPMENT HIGHLIGHT SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-white relative border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-widest">
              {machinery.subtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#051923] tracking-tight font-headline-xl">
              {machinery.title}
              <span style={{ color: theme.accentHex }}>.</span>
            </h2>
          </div>

          {/* Machine Items List (Alternating Side Slides) */}
          <div className="space-y-12">
            {machinery.machines.map((machine, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={machine.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.1 }}
                  className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 md:p-8 rounded-3xl bg-[#F8FAFC] border border-gray-200 hover:border-[#006494]/30 transition-all duration-500 shadow-md"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-white border border-gray-200 group shadow-sm">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#051923]/90 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                        {machine.tag}
                      </div>
                    </div>
                  </div>

                  {/* Specs & Info Column */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <span 
                        className="text-xs font-extrabold uppercase tracking-widest"
                        style={{ color: theme.accentHex }}
                      >
                        Equipment Unit 0{idx + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#051923] mt-1">
                        {machine.name}
                      </h3>
                      <p className="text-gray-600 text-base font-light mt-3 leading-relaxed">
                        {machine.desc}
                      </p>
                    </div>

                    {/* Spec Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {machine.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                          <div className="text-xs text-gray-500 font-medium">{spec.label}</div>
                          <div className="text-sm md:text-base font-bold text-[#051923] mt-0.5">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY CHOOSE THIS UNIT / STRENGTHS SECTION (HOME PAGE WHYCHOOSEUS ACCORDION LOOK) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#F8FAFC] relative border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-widest">
              {whyChooseUs.subtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#051923] tracking-tight font-headline-xl">
              {whyChooseUs.title}
              <span style={{ color: theme.accentHex }}>.</span>
            </h2>
          </div>

          {/* Stats Grid with Animated Counters */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-xl hover:border-[#006494]/30 transition-all duration-500"
              >
                <div 
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 font-headline-xl"
                  style={{ color: theme.accentHex }}
                >
                  <AnimatedCounter value={stat.number} />
                </div>

                <h4 className="text-lg font-bold text-[#051923] mb-2">{stat.label}</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GALLERY / SNAPSHOT SECTION (LIGHT BACKDROP WITH LIGHTBOX) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-white relative border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-widest">
              {gallery.subtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#051923] tracking-tight font-headline-xl">
              {gallery.title}
              <span style={{ color: theme.accentHex }}>.</span>
            </h2>
            <p className="text-gray-600 text-base font-light">
              Click any snapshot to inspect high-resolution details of our finished work.
            </p>
          </div>

          {/* 6 Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay: idx * 0.12 }}
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051923]/90 via-[#051923]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Info Text & Category */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span 
                    className="text-xs font-extrabold uppercase tracking-wider mb-1"
                    style={{ color: theme.accentHex }}
                  >
                    {item.category}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-500">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Click to expand image</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Pop-up Modal */}
      <GalleryLightbox
        selectedItem={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        accentHex={theme.accentHex}
      />

      {/* ========================================================================= */}
      {/* 8. CTA (CALL TO ACTION) SECTION (MATCHING HOME PAGE CTA BANNER) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#F8FAFC] relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto relative z-10">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#051923] text-white border border-white/10 shadow-2xl text-center space-y-8 backdrop-blur-xl relative overflow-hidden">
            
            {/* Background Map Effect matching Home Page CTA */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1.5px)',
                  backgroundSize: '16px 16px'
                }}
              />
            </div>

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight font-headline-xl">
                {cta.title}
                <span style={{ color: theme.accentHex }}>.</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
                {cta.desc}
              </p>
            </div>

            {/* CTA Button matching Home Page rounded-full Pill Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 relative z-10">
              <Link
                to="/contact"
                className={`px-10 py-4 rounded-full font-bold text-base tracking-wider uppercase flex items-center gap-3 transition-all duration-300 shadow-2xl ${theme.buttonBg} hover:scale-105 active:scale-95 group`}
              >
                <span>{cta.buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Contact Snippet */}
            <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-300 font-medium relative z-10">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-gray-400" />
                <span>24/7 Technical Inquiry Line</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>Instant Quote Dispatch Within 24h</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
