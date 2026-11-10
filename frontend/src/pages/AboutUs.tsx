import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import IndustriesWeServe from '../components/IndustriesWeServe';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Shield, 
  Lightbulb, 
  Users, 
  Package, 
  Settings, 
  Globe, 
  Play, 
  ArrowUpRight,
  Briefcase,
  ArrowRight
} from 'lucide-react';

const timelineData = [
  { year: '1977', title: 'Establishment', description: 'Establishment of Hitech by our visionary founders, setting the foundation for excellence in engineering.', image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=800&auto=format&fit=crop' },
  { year: '1987', title: 'First Expansion', description: 'Moved to a larger facility and introduced our first automated production line, revolutionizing our output capacity.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop' },
  { year: '1995', title: 'Global Reach', description: 'Began exporting products internationally, establishing a global footprint and distribution network.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop' },
  { year: '2005', title: 'Innovation Award', description: 'Received national recognition for our innovative pneumatic solutions and commitment to quality.', image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop' },
  { year: '2015', title: 'Smart Factory', description: 'Integration of IoT and Industry 4.0 standards across all manufacturing processes.', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800&auto=format&fit=crop' },
  { year: '2023', title: 'Sustainable Future', description: 'Launched our green initiative, achieving carbon-neutral manufacturing operations.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
];


const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = prefix + Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix, prefix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const impactImageSets = {
  slot1: [
    { src: '/impact_inspection.jpg', alt: 'Precision Metrology Inspection' },
    { src: '/impact_inspection_2.jpg', alt: 'Quality Assurance Metrology Engineering' },
    { src: '/impact_inspection_3.jpg', alt: 'Advanced Coordinate Optical Metrology' },
  ],
  slot2: [
    { src: '/impact_machining_line.jpg', alt: 'Automated 5-Axis CNC Machining Line' },
    { src: '/impact_machining_line_2.jpg', alt: 'High-Precision Automated Turning and Milling' },
    { src: '/impact_machining_line_3.jpg', alt: 'Robotic High-Speed Production Cell' },
  ],
  slot3: [
    { src: '/impact_offshore.jpg', alt: 'Offshore Marine and Energy Infrastructure' },
    { src: '/impact_sector_aerospace.jpg', alt: 'Global Aerospace and Aviation Manufacturing' },
    { src: '/impact_sector_energy.jpg', alt: 'Renewable Power and Industrial Energy Grid' },
  ],
};

const DynamicImageSlot = ({
  images,
  activeIndex,
  className = '',
}: {
  images: { src: string; alt: string }[];
  activeIndex: number;
  className?: string;
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((item, idx) => (
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        />
      ))}
    </div>
  );
};

export default function AboutUs() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeInfraTab, setActiveInfraTab] = useState('production');
  const [impactImageIndex, setImpactImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImpactImageIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevTimeline = () => {
    setActiveTimeline((prev) => Math.max(0, prev - 1));
  };

  const handleNextTimeline = () => {
    setActiveTimeline((prev) => Math.min(timelineData.length - 1, prev + 1));
  };

  return (
    <div className="w-full bg-[#f4f7f9] pt-20 sm:pt-24">
      {/* 01. HERO SECTION: MATCHING MANUFACTURING & CONTACT PAGES */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-8 sm:mb-12">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl sm:rounded-[22px] overflow-hidden relative shadow-xl min-h-[608px] sm:min-h-[684px] lg:min-h-[722px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-white bg-black border border-gray-900"
          >
            {/* Background High-Tech Facility Media / Looping Video */}
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-75"
              >
                <source src="/boomerang.mp4" type="video/mp4" />
                <source src="/boomerang_production.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/60 pointer-events-none" />
            </div>

            {/* Bottom Hero Content: Title, Narrative & CTA */}
            <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-10 sm:pt-14">
              
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-2 text-white/90">
                  <span className="text-sm font-medium tracking-tight text-white/80">49+ Years of Engineering Excellence</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  About Us
                </h1>

                <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-lg">
                  Pioneering engineering excellence, micron-level machining precision, and integrated automation across 3 specialized manufacturing units.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link 
                    to="/career"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-[#121212] font-medium text-xs sm:text-sm tracking-tight transition-all shadow-lg group"
                  >
                    <Briefcase className="w-4 h-4 text-[#00A6FB]" />
                    <span>Explore Careers at Hitech</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm tracking-tight transition-all"
                  >
                    <span>Contact Our Engineering Team</span>
                  </Link>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* OUR IMPACT - Interlocking Bento Grid Section */}
      <section className="w-full bg-white py-10 lg:py-14 overflow-hidden">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Mobile & Tablet Layout (< lg) */}
          <div className="block lg:hidden">
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight uppercase mb-8">
              OUR IMPACT
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f1f1f1] p-8 flex flex-col justify-center">
                <div className="text-5xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                  <AnimatedCounter value={45} suffix="+" />
                </div>
                <p className="text-base text-neutral-600 font-normal leading-snug">
                  Specialised Manufacturing Processes
                </p>
              </div>

              <DynamicImageSlot 
                images={impactImageSets.slot1} 
                activeIndex={impactImageIndex} 
                className="h-56 sm:h-64 w-full"
              />

              <div className="bg-[#f1f1f1] p-8 flex flex-col justify-center">
                <div className="text-5xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                  <AnimatedCounter value={17} suffix="+" />
                </div>
                <p className="text-base text-neutral-600 font-normal leading-snug">
                  Years of Operations
                </p>
              </div>

              <DynamicImageSlot 
                images={impactImageSets.slot2} 
                activeIndex={impactImageIndex} 
                className="h-56 sm:h-64 w-full"
              />

              <div className="bg-[#f8f9fa] border border-gray-100 p-8 flex flex-col justify-center">
                <div className="text-5xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                  <AnimatedCounter value={1700} suffix="+" />
                </div>
                <p className="text-base text-neutral-600 font-normal leading-snug">
                  Qualified Parts
                </p>
              </div>

              <div className="bg-[#00A6FB] p-8 flex flex-col justify-center text-white">
                <div className="text-5xl font-bold tracking-tight text-white mb-2 leading-none">
                  <AnimatedCounter value={3} prefix="0" />
                </div>
                <p className="text-base text-white font-normal leading-snug">
                  Sectors
                </p>
              </div>

              <div className="bg-[#f1f1f1] p-8 flex flex-col justify-center">
                <div className="text-5xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                  <AnimatedCounter value={90} suffix="%" />
                </div>
                <p className="text-base text-neutral-600 font-normal leading-snug">
                  Exports
                </p>
              </div>

              <DynamicImageSlot 
                images={impactImageSets.slot3} 
                activeIndex={impactImageIndex} 
                className="h-56 sm:h-64 w-full"
              />
            </div>
          </div>

          {/* Desktop Interlocking Bento Grid (lg+) */}
          <div className="hidden lg:grid grid-cols-[1fr_2.8fr_1.25fr] gap-0">
            {/* Row 1 */}
            <div className="flex items-start pt-2 pr-6">
              <h2 className="text-4xl xl:text-5xl font-black text-neutral-900 tracking-tight uppercase leading-[1.08] whitespace-normal">
                OUR<br />IMPACT
              </h2>
            </div>
            <div className="flex justify-start items-end h-[240px] xl:h-[260px]">
              <div className="w-[80%] bg-[#f1f1f1] p-8 xl:p-10 flex flex-col justify-center h-[180px] xl:h-[190px]">
                <div className="text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                  <AnimatedCounter value={45} suffix="+" />
                </div>
                <p className="text-base xl:text-lg text-neutral-600 font-normal leading-snug">
                  Specialised Manufacturing<br />Processes
                </p>
              </div>
            </div>
            <DynamicImageSlot 
              images={impactImageSets.slot1} 
              activeIndex={impactImageIndex} 
              className="h-[240px] xl:h-[260px] w-full"
            />

            {/* Row 2 */}
            <div className="h-[160px] xl:h-[170px] bg-[#f1f1f1] p-8 xl:p-10 flex flex-col justify-center">
              <div className="text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                <AnimatedCounter value={17} suffix="+" />
              </div>
              <p className="text-base xl:text-lg text-neutral-600 font-normal leading-snug">
                Years of<br />Operations
              </p>
            </div>
            <DynamicImageSlot 
              images={impactImageSets.slot2} 
              activeIndex={impactImageIndex} 
              className="h-[160px] xl:h-[170px] w-full"
            />
            <div className="h-[160px] xl:h-[170px] bg-white p-8 xl:p-10 flex flex-col justify-center">
              <div className="text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                <AnimatedCounter value={1700} suffix="+" />
              </div>
              <p className="text-base xl:text-lg text-neutral-600 font-normal leading-snug">
                Qualified Parts
              </p>
            </div>

            {/* Row 3 */}
            <div className="h-[160px] xl:h-[170px]">
              {/* Spacer matching reference layout */}
            </div>
            <div className="h-[160px] xl:h-[170px] flex">
              <div className="w-[32%] bg-[#00A6FB] text-white p-6 xl:p-8 flex flex-col justify-center">
                <div className="text-5xl xl:text-6xl font-bold tracking-tight text-white mb-2 leading-none">
                  <AnimatedCounter value={3} prefix="0" />
                </div>
                <p className="text-base xl:text-lg text-white font-normal leading-snug">
                  Sectors
                </p>
              </div>
              <div className="w-[68%] bg-[#f1f1f1] p-6 xl:p-8 flex flex-col justify-center">
                <div className="text-5xl xl:text-6xl font-bold tracking-tight text-neutral-900 mb-2 leading-none">
                  <AnimatedCounter value={90} suffix="%" />
                </div>
                <p className="text-base xl:text-lg text-neutral-600 font-normal leading-snug">
                  Exports
                </p>
              </div>
            </div>
            <DynamicImageSlot 
              images={impactImageSets.slot3} 
              activeIndex={impactImageIndex} 
              className="h-[160px] xl:h-[170px] w-full"
            />
          </div>

        </div>
      </section>

      {/* Premium Genesis & Who We Are Section */}
      <div className="w-full bg-white relative py-16 overflow-hidden">
        {/* Background Accent removed for full white background */}
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Imagery & Founders (5 columns / 40%) */}
            <div className="lg:col-span-5 relative">
              {/* Massive subtle background text */}
              <div className="absolute -top-16 -left-12 text-[120px] font-black text-gray-50/80 leading-none z-0 select-none hidden md:block">
                GENESIS
              </div>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                {/* Main Image */}
                <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-2xl h-[450px]">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                    alt="Industry" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                
                {/* Secondary Images Column */}
                <div className="col-span-2 md:col-span-1 flex flex-col gap-6 mt-0 md:mt-12">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-[213px] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" 
                      alt="Founder 1" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-bold text-sm tracking-tight">Founder Name 1</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium tracking-tight">CEO & Visionary</p>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden shadow-lg h-[213px] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
                      alt="Founder 2" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-bold text-sm tracking-tight">Founder Name 2</p>
                      <p className="text-white/80 text-xs sm:text-sm font-medium tracking-tight">Co-Founder</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white z-20 flex flex-col items-center justify-center transform md:-translate-x-[20%]">
                <span className="text-[#00A6FB] font-bold text-5xl mb-1 tracking-tight">49+</span>
                <span className="text-xs font-semibold tracking-tight text-[#64748b] text-center">Years of<br/>Excellence</span>
              </div>
            </div>
            
            {/* Right Column: Content (7 columns / 60%) */}
            <div className="lg:col-span-7 relative z-10">
              <FadeIn className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-[2px] w-8 bg-[#00A6FB]"></div>
                    <span className="text-sm font-medium tracking-tight text-[#64748b]">The Hitech Story</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121212] mb-6 tracking-tight leading-tight">
                    Pioneering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">automation.</span>
                  </h2>
                </div>

                <div className="space-y-8">
                  <div className="border-l-4 border-[#00A6FB]/20 pl-6 hover:border-[#00A6FB] transition-colors duration-300">
                    <h3 className="text-xl font-bold text-[#121212] mb-2 tracking-tight">Who We Are</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      Hitech stands today as one of the foremost names in engineering, trusted for quality, reliability, and innovation. We empower industries and simplify automation.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A6FB]/20 pl-6 hover:border-[#00A6FB] transition-colors duration-300">
                    <h3 className="text-xl font-bold text-[#121212] mb-2 tracking-tight">Our Journey</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      What started as a humble workshop years ago has grown into a sophisticated organization serving global clients. Over decades, we have adapted to ever-changing technologies, always placing the customer at the heart of our journey.
                    </p>
                  </div>
                </div>


              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* 3 MD Desk Sections for Leadership */}
      <div className="w-full bg-white relative py-8 space-y-8 divide-y divide-gray-100 overflow-hidden">
        
        {/* ==================== MD 1: Strategic Vision & Leadership ==================== */}
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-[2px] w-8 bg-[#00A6FB]" />
                    <span className="text-sm font-medium tracking-tight text-[#64748b]">Leadership — Strategic Vision</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121212] tracking-tight leading-tight">
                    From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">MD's Desk.</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#00A6FB] pl-5 py-1">
                    <h3 className="text-lg font-bold text-[#121212] mb-1.5 tracking-tight">Our Commitment</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      At Hitech, we believe that innovation is a continuous journey. Our commitment to excellence drives us to constantly push boundaries and redefine what is possible in the engineering and automation sectors.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A6FB]/30 pl-5 py-1">
                    <h3 className="text-lg font-bold text-[#121212] mb-1.5 tracking-tight">Looking Ahead</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      As we look to the future, we remain dedicated to our core values. We will continue to invest in our people, our technologies, and our partnerships to ensure we deliver unmatched value to our clients worldwide.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Single Portrait Image (5 columns) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[340px] border border-gray-100 relative group max-w-md mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                  alt="Managing Director - Strategic Vision" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-lg text-center">
                  <span className="block text-sm font-bold tracking-tight text-[#121212]">Strategic Vision</span>
                  <span className="text-xs sm:text-sm font-medium tracking-tight text-[#64748b]">Managing Director</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ==================== MD 2: Technology & R&D ==================== */}
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Single Portrait Image (5 columns - Alternating Layout) */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[340px] border border-gray-100 relative group max-w-md mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                  alt="Managing Director - Technology & R&D" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-lg text-center">
                  <span className="block text-sm font-bold tracking-tight text-[#121212]">Technology &amp; R&amp;D</span>
                  <span className="text-xs sm:text-sm font-medium tracking-tight text-[#64748b]">Managing Director</span>
                </div>
              </div>
            </div>

            {/* Right Column: Content (7 columns) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <FadeIn className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-[2px] w-8 bg-[#00A6FB]" />
                    <span className="text-sm font-medium tracking-tight text-[#64748b]">Leadership — Technology &amp; Innovation</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121212] tracking-tight leading-tight">
                    From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">MD's Desk.</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#00A6FB] pl-5 py-1">
                    <h3 className="text-lg font-bold text-[#121212] mb-1.5 tracking-tight">Technological Innovation</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      Integrating 12kW fiber laser technology, continuous 5-axis CNC machining, and automated robotic MIG/TIG cells enables us to offer micron-level accuracy and rapid prototype-to-production turnaround times.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A6FB]/30 pl-5 py-1">
                    <h3 className="text-lg font-bold text-[#121212] mb-1.5 tracking-tight">Engineering Precision</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      Our dedicated R&amp;D team works closely with OEMs to optimize Design for Manufacturability (DFM), reducing material waste, extending part lifespans, and guaranteeing exact CAD compliance.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

        {/* ==================== MD 3: Operations & Quality ==================== */}
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-[2px] w-8 bg-[#00A6FB]" />
                    <span className="text-sm font-medium tracking-tight text-[#64748b]">Leadership — Operations &amp; Quality Control</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121212] tracking-tight leading-tight">
                    From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">MD's Desk.</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#00A6FB] pl-5 py-1">
                    <h3 className="text-lg font-bold text-[#121212] mb-1.5 tracking-tight">Operational Excellence</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      Streamlined production scheduling, real-time shop floor telemetry, and robust supply chain logistics ensure that our manufacturing lines operate at peak efficiency with zero delays.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A6FB]/30 pl-5 py-1">
                    <h3 className="text-lg font-bold text-[#121212] mb-1.5 tracking-tight">Quality Assurance &amp; Metrology</h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      With ISO 9001:2015 certification, 3D CMM metrology coordinate inspection, and comprehensive Mill Test Reports (MTRs), we ensure 100% defect-free delivery for every batch.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Single Portrait Image (5 columns) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[340px] border border-gray-100 relative group max-w-md mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
                  alt="Managing Director - Operations & Quality" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-lg text-center">
                  <span className="block text-sm font-bold tracking-tight text-[#121212]">Operations &amp; Quality</span>
                  <span className="text-xs sm:text-sm font-medium tracking-tight text-[#64748b]">Managing Director</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Cross-Sector Capabilities: Industries We Serve */}
      <IndustriesWeServe variant="scroll" />

      {/* Infrastructure Gallery Section */}
      <div className="bg-[#f4f7f9] py-12">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-4 md:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight mb-4">Our Infrastructure</h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">Explore our state-of-the-art facilities powering our engineering excellence.</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row border border-gray-300 w-full max-w-3xl mx-auto bg-white mb-8">
            <button 
              onClick={() => setActiveInfraTab('production')}
              className={`flex-1 py-3 text-center font-medium tracking-tight uppercase transition-colors text-sm ${
                activeInfraTab === 'production' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-50 border-b md:border-b-0 md:border-r border-gray-300'
              }`}
            >
              Production
            </button>
            <button 
              onClick={() => setActiveInfraTab('manufacturing')}
              className={`flex-1 py-3 text-center font-medium tracking-tight uppercase transition-colors text-sm ${
                activeInfraTab === 'manufacturing' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-50 border-b md:border-b-0 md:border-r border-gray-300'
              }`}
            >
              Manufacturing
            </button>
            <button 
              onClick={() => setActiveInfraTab('lasercutting')}
              className={`flex-1 py-3 text-center font-medium tracking-tight uppercase transition-colors text-sm ${
                activeInfraTab === 'lasercutting' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              Laser Cutting
            </button>
          </div>
          
          {/* Gallery Content */}
          <div className="min-h-[400px] flex flex-col gap-6">
            <FadeIn key={activeInfraTab}>
              {activeInfraTab === 'production' && (
                <div className="w-full">
                  <video autoPlay loop muted playsInline className="w-full h-[600px] object-cover rounded-sm shadow-md">
                    <source src="/boomerang_production.mp4" type="video/mp4" />
                  </video>
                </div>
              )}
              {activeInfraTab === 'manufacturing' && (
                <div className="w-full">
                  <video autoPlay loop muted playsInline className="w-full h-[600px] object-cover rounded-sm shadow-md">
                    <source src="/boomerang.mp4" type="video/mp4" />
                  </video>
                </div>
              )}
              {activeInfraTab === 'lasercutting' && (
                <div className="w-full">
                  <video autoPlay loop muted playsInline className="w-full h-[600px] object-cover rounded-sm shadow-md">
                    <source src="/boomerang_laser.mp4" type="video/mp4" />
                  </video>
                </div>
              )}
            </FadeIn>

            {/* Description & View More CTA */}
            <div className="flex flex-row justify-between items-center gap-4 w-full mt-6 px-1">
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-4xl">
                {activeInfraTab === 'production' && 'High-volume, state-of-the-art assembly lines optimized for zero-defect output.'}
                {activeInfraTab === 'manufacturing' && 'Advanced CNC machining and fabrication capabilities delivering tight tolerances.'}
                {activeInfraTab === 'lasercutting' && 'High-speed fiber laser profiling for intricate, high-precision metal sheet fabrication.'}
              </p>
              <Link 
                to={
                  activeInfraTab === 'production' 
                    ? '/' 
                    : activeInfraTab === 'manufacturing' 
                    ? '/manufacturing' 
                    : '/services'
                }
                className="group inline-flex items-center gap-1.5 text-[#121212] hover:text-[#00A6FB] text-sm font-medium tracking-tight transition-colors duration-300 shrink-0"
              >
                <span className="underline underline-offset-4 decoration-2">View More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Mission, Vision, Values */}
      <div className="relative py-12 bg-[#f4f7f9] overflow-hidden">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-sm font-medium tracking-tight text-[#64748b] mb-4">Core Principles</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">
              What Drives <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">Us Forward.</span>
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="group h-full bg-white rounded-2xl p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,53,84,0.08)] relative overflow-hidden border border-gray-200/60">
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#0073A8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-[#f8fbfe] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-[#00A6FB]/10 group-hover:border-[#00A6FB]/20 group-hover:scale-110 transition-all duration-500">
                  <Lightbulb className="w-8 h-8 text-[#051923] group-hover:text-[#00A6FB] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#121212] mb-3 tracking-tight group-hover:text-[#00A6FB] transition-colors duration-300">Our Mission</h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Our mission is simple but powerful: To deliver world-class pneumatic solutions that drive productivity, efficiency and reliability for our customers.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="group h-full bg-white rounded-2xl p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,53,84,0.08)] relative overflow-hidden border border-gray-200/60">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#0073A8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-[#f8fbfe] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-[#00A6FB]/10 group-hover:border-[#00A6FB]/20 group-hover:scale-110 transition-all duration-500">
                  <Shield className="w-8 h-8 text-[#051923] group-hover:text-[#00A6FB] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#121212] mb-3 tracking-tight group-hover:text-[#00A6FB] transition-colors duration-300">Our Vision</h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  We envision Hitech as the brand of choice for customers seeking dependable, innovative and sustainable pneumatic systems worldwide.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group h-full bg-white rounded-2xl p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,53,84,0.08)] relative overflow-hidden border border-gray-200/60">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#0073A8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-[#f8fbfe] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-[#00A6FB]/10 group-hover:border-[#00A6FB]/20 group-hover:scale-110 transition-all duration-500">
                  <Target className="w-8 h-8 text-[#051923] group-hover:text-[#00A6FB] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#121212] mb-3 tracking-tight group-hover:text-[#00A6FB] transition-colors duration-300">Our Values</h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Innovation: We believe in nurturing creativity and translating ideas into practical industrial solutions.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Premium Interactive Timeline */}
      <div className="w-full bg-white relative py-16 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#003554 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-sm font-medium tracking-tight text-[#64748b] mb-4">Our Heritage</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">
              A Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">Excellence.</span>
            </h3>
          </FadeIn>

          <div className="relative max-w-[96%] 2xl:max-w-[1920px] mx-auto">
            {/* Custom Timeline Track */}
            <div className="relative flex items-center justify-between mb-10 md:mb-16 px-1 sm:px-4 md:px-12">
              {/* Animated Gradient Line */}
              <div className="absolute top-4 md:top-1/2 left-8 right-8 md:left-14 md:right-14 h-[2px] bg-gray-200 -translate-y-1/2 rounded-full z-0">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00A6FB] to-[#051923] transition-all duration-500 rounded-full"
                  style={{ width: `${(activeTimeline / (timelineData.length - 1)) * 100}%` }}
                ></div>
              </div>
              
              <button
                type="button"
                onClick={handlePrevTimeline}
                disabled={activeTimeline === 0}
                className={`w-7 h-7 sm:w-8 sm:h-8 z-20 bg-white rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  activeTimeline === 0 ? 'text-gray-300 opacity-40 cursor-not-allowed' : 'text-[#051923] hover:text-[#00A6FB] hover:scale-110 active:scale-95'
                }`}
                aria-label="Previous milestone"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </button>
              
              {/* Timeline points (Horizontal row on both mobile and desktop) */}
              <div className="flex flex-row justify-between w-full relative z-10 px-2 sm:px-4 md:px-8">
                {timelineData.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveTimeline(index)}
                    className="flex flex-col items-center cursor-pointer group relative py-1 text-center"
                  >
                    <div className="relative flex items-center justify-center w-6 h-6">
                      {/* Glow effect for active */}
                      {activeTimeline === index && (
                        <div className="absolute inset-0 bg-[#00A6FB]/30 rounded-full animate-ping"></div>
                      )}
                      {/* Node */}
                      <div className={`w-3 h-3 rounded-full transition-all duration-500 z-10 ${
                        activeTimeline === index 
                          ? 'bg-[#00A6FB] scale-150 shadow-[0_0_10px_rgba(0,166,251,0.5)]' 
                          : activeTimeline > index 
                            ? 'bg-[#051923]'
                            : 'bg-gray-300 group-hover:bg-gray-400 group-hover:scale-125'
                      }`} />
                    </div>
                    
                    <span className={`text-[10px] sm:text-xs md:text-sm font-semibold tracking-tight mt-1.5 transition-all duration-300 select-none ${
                      activeTimeline === index 
                        ? 'text-[#00A6FB] scale-110 font-bold' 
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextTimeline}
                disabled={activeTimeline === timelineData.length - 1}
                className={`w-7 h-7 sm:w-8 sm:h-8 z-20 bg-white rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  activeTimeline === timelineData.length - 1 ? 'text-gray-300 opacity-40 cursor-not-allowed' : 'text-[#051923] hover:text-[#00A6FB] hover:scale-110 active:scale-95'
                }`}
                aria-label="Next milestone"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Timeline Content */}
            <div className="relative max-w-5xl mx-auto min-h-[500px] md:h-[450px]">
              {/* Massive Watermark Year */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] sm:text-[180px] md:text-[280px] font-black text-gray-50/60 leading-none z-0 select-none pointer-events-none transition-all duration-700">
                {timelineData[activeTimeline].year}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTimeline}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col md:flex-row items-center relative z-10 h-full pb-6 md:pb-0"
                >
                  {/* Left: Image */}
                  <div className="w-full md:w-[60%] h-[240px] sm:h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-[#051923]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={timelineData[activeTimeline].image} 
                      alt={timelineData[activeTimeline].year} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Right: Overlapping Content Card */}
                  <div className="w-[94%] sm:w-[90%] md:w-[45%] -mt-10 sm:-mt-16 md:mt-0 md:-ml-[10%] bg-white/95 backdrop-blur-xl p-5 sm:p-8 md:p-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white relative z-20">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <div className="h-[2px] w-8 bg-[#00A6FB]"></div>
                      <span className="text-[#00A6FB] font-bold text-xl sm:text-2xl tracking-tight">{timelineData[activeTimeline].year}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#121212] mb-3 md:mb-4 tracking-tight leading-tight">
                      {timelineData[activeTimeline].year === "1977" ? "The Foundation" : 
                       timelineData[activeTimeline].year === "1987" ? "Global Expansion" :
                       timelineData[activeTimeline].year === "1995" ? "Technological Leap" :
                       timelineData[activeTimeline].year === "2005" ? "Industry Leaders" :
                       timelineData[activeTimeline].year === "2015" ? "Sustainable Future" : "Next Generation"}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#475569] leading-relaxed">
                      {timelineData[activeTimeline].description}
                    </p>

                    {/* Mobile Navigation Controls */}
                    <div className="flex md:hidden items-center justify-between pt-4 mt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handlePrevTimeline}
                        disabled={activeTimeline === 0}
                        className={`text-xs font-semibold flex items-center gap-1 ${
                          activeTimeline === 0 ? 'text-gray-300' : 'text-[#051923] hover:text-[#00A6FB]'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Prev
                      </button>
                      <span className="text-[11px] font-mono text-gray-400 font-semibold">
                        {activeTimeline + 1} / {timelineData.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextTimeline}
                        disabled={activeTimeline === timelineData.length - 1}
                        className={`text-xs font-semibold flex items-center gap-1 ${
                          activeTimeline === timelineData.length - 1 ? 'text-gray-300' : 'text-[#051923] hover:text-[#00A6FB]'
                        }`}
                      >
                        Next <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>


      
      {/* Hide scrollbar for timeline on small devices */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
