import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, CheckCircle2, ShieldCheck, 
  Sparkles, Layers, Award, Zap, Phone, Mail, MapPin, Factory
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

  const { theme, breadcrumb, unitName, tagline, heroImage, heroBadge, overview, process, machinery, whyChooseUs, gallery, cta } = data;

  return (
    <main className="w-full bg-[#F8FAFC] text-[#051923] overflow-x-clip font-sans selection:bg-[#051923] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (HOME PAGE HERO SLIDER PALETTE & DOCKED FACILITY BAR) */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-gray-200">
        {/* Parallax Background Image with Home Page Overlay */}
        <motion.div 
          style={{ y: heroImageY }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={heroImage}
            alt={unitName}
            className="w-full h-full object-cover scale-110 filter brightness-[0.80] contrast-105 saturate-[1.05]"
          />
          {/* Overlay - Darker on the left for crisp text contrast, brighter on the right to let machinery shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 z-10" />
        </motion.div>

        {/* Hero Content - Clean, spacious left-aligned layout matching Home Page HeroSlider */}
        <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-16 my-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl text-left text-white space-y-6"
          >
            <h1 className="font-heading text-[38px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-tight text-white uppercase tracking-wide">
              {unitName}
            </h1>
            
            {/* 3-dash accent divider matching Home Page HeroSlider */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 rounded-full" style={{ backgroundColor: theme.accentHex }} />
              <div className="w-4 h-1 rounded-full opacity-75" style={{ backgroundColor: theme.accentHex }} />
              <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: theme.accentHex }} />
            </div>

            <p className="font-body-lg text-lg md:text-[20px] leading-relaxed text-gray-200 font-light">
              {tagline}
            </p>

            <div className="pt-6 md:pt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-[1.5px] border-white/80 text-white font-body-md font-medium text-[17px] hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <span>Get a Quote for {unitName.replace(' Division', '')}</span>
                <span className="material-symbols-outlined text-[20px] font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ fontVariationSettings: "'wght' 600" }}>north_east</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Docked Facility Bar - Grounded along the bottom edge of the hero banner */}
        <div className="relative z-20 w-full border-t border-white/10 bg-black/75 backdrop-blur-xl py-2.5 lg:py-3 px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Left End: Facility Hub & Name */}
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#00A6FB]/15 border border-[#00A6FB]/30 text-[#00A6FB] shadow-sm transition-colors hover:bg-[#00A6FB]/25"
              >
                <Factory className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#00A6FB] font-sans leading-tight">
                  Coimbatore Facility Hub
                </span>
                <div className="font-sans font-bold text-sm sm:text-[15px] text-white leading-tight">
                  Hitech Engineering Works
                </div>
              </div>
            </div>

            {/* Right End: Main Plant Address */}
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#00A6FB]/15 border border-[#00A6FB]/30 text-[#00A6FB] shadow-sm transition-colors hover:bg-[#00A6FB]/25"
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#00A6FB] font-sans leading-tight">
                  Main Manufacturing & Plant Location
                </span>
                <div className="text-xs text-gray-200 leading-snug font-sans">
                  <span className="text-white font-normal block sm:inline">
                    SF No. 428/2, Industrial Estate Road, Peelamedu,
                  </span>{' '}
                  <span className="text-gray-300 block sm:inline">
                    Coimbatore, Tamil Nadu – 641004, India
                  </span>
                </div>
              </div>
            </div>

          </div>
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
      {/* 3. GALLERY / SNAPSHOT SECTION (LIGHT BACKDROP WITH LIGHTBOX) */}
      {/* ========================================================================= */}
      <section id="gallery" className="py-24 px-4 md:px-8 lg:px-12 bg-white relative border-b border-gray-200">
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

                      <div className="mt-auto pt-3 border-t border-white/10 w-full text-xs text-gray-400 italic font-sans">
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
      {/* 7. CTA (CALL TO ACTION) SECTION (MATCHING HOME PAGE CTA BANNER) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-white relative overflow-hidden">
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
                <Phone className="w-4 h-4 text-gray-400" />
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
