import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Shield, Lightbulb, Users, Package, Settings, Globe, Play, ArrowUpRight } from 'lucide-react';

const timelineData = [
  { year: '1977', title: 'Establishment', description: 'Establishment of Hitech by our visionary founders, setting the foundation for excellence in engineering.', image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=800&auto=format&fit=crop' },
  { year: '1987', title: 'First Expansion', description: 'Moved to a larger facility and introduced our first automated production line, revolutionizing our output capacity.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop' },
  { year: '1995', title: 'Global Reach', description: 'Began exporting products internationally, establishing a global footprint and distribution network.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop' },
  { year: '2005', title: 'Innovation Award', description: 'Received national recognition for our innovative pneumatic solutions and commitment to quality.', image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop' },
  { year: '2015', title: 'Smart Factory', description: 'Integration of IoT and Industry 4.0 standards across all manufacturing processes.', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800&auto=format&fit=crop' },
  { year: '2023', title: 'Sustainable Future', description: 'Launched our green initiative, achieving carbon-neutral manufacturing operations.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
];

const stats = [
  { icon: Settings, count: 4000, suffix: '+', label: 'Basic Models' },
  { icon: Package, count: 38500, suffix: '+', label: 'Variants' },
  { icon: Globe, count: 300, suffix: '+', label: 'Distribution Partners' },
  { icon: Users, count: 100000, suffix: '+', label: 'Customers' },
];

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.0,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(value)) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
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

export default function AboutUs() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeInfraTab, setActiveInfraTab] = useState('production');

  const handlePrevTimeline = () => {
    setActiveTimeline((prev) => Math.max(0, prev - 1));
  };

  const handleNextTimeline = () => {
    setActiveTimeline((prev) => Math.min(timelineData.length - 1, prev + 1));
  };

  return (
    <div className="w-full bg-[#f4f7f9]">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Factory Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 px-8 md:px-16 max-w-4xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading tracking-tight"
          >
            About <span className="text-[#00A6FB]">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
          >
            Pioneering engineering excellence and innovative solutions for the modern industrial era.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-widest"
          >
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] mx-2"></span>
            <span className="text-white">About us</span>
          </motion.div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Stats Background" 
            className="w-full h-full object-cover grayscale"
          />
        <div className="absolute inset-0 bg-white/95"></div>
      </div>
      
      <div className="relative z-10 px-8 md:px-16 lg:px-32 max-w-[96%] 2xl:max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1} className="flex flex-col items-center text-center px-4 group">
              <div className="w-16 h-16 rounded-full bg-[#00A6FB]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-[#00A6FB]/20 shadow-sm">
                <stat.icon className="w-8 h-8 text-[#00A6FB]" strokeWidth={2} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#003554] mb-2 font-heading tracking-tight">
                <AnimatedCounter value={stat.count} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm md:text-base font-bold tracking-widest uppercase">
                {stat.label}
              </div>
            </FadeIn>
          ))}
          </div>
        </div>
      </div>

      {/* Premium Genesis & Who We Are Section */}
      <div className="w-full bg-white relative py-32 overflow-hidden">
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
                      <p className="text-white font-bold text-sm">Founder Name 1</p>
                      <p className="text-blue-300 text-xs">CEO & Visionary</p>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden shadow-lg h-[213px] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
                      alt="Founder 2" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-bold text-sm">Founder Name 2</p>
                      <p className="text-blue-300 text-xs">Co-Founder</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white z-20 flex flex-col items-center justify-center transform md:-translate-x-[20%]">
                <span className="text-[#00A6FB] font-black text-5xl mb-1">49+</span>
                <span className="text-gray-800 font-bold text-xs uppercase tracking-widest text-center">Years of<br/>Excellence</span>
              </div>
            </div>
            
            {/* Right Column: Content (7 columns / 60%) */}
            <div className="lg:col-span-7 relative z-10">
              <FadeIn className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-[#00A6FB]"></div>
                    <span className="text-[#00A6FB] font-bold uppercase tracking-widest text-sm">The Hitech Story</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#003554] mb-6 font-heading leading-tight">
                    Pioneering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#003554]">automation.</span>
                  </h2>
                </div>

                <div className="space-y-8">
                  <div className="border-l-4 border-[#00A6FB]/20 pl-6 hover:border-[#00A6FB] transition-colors duration-300">
                    <h3 className="text-xl font-bold text-[#003554] mb-3 font-heading">Who We Are</h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      Hitech stands today as one of the foremost names in engineering, trusted for quality, reliability, and innovation. We empower industries and simplify automation.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A6FB]/20 pl-6 hover:border-[#00A6FB] transition-colors duration-300">
                    <h3 className="text-xl font-bold text-[#003554] mb-3 font-heading">Our Journey</h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      What started as a humble workshop years ago has grown into a sophisticated organization serving global clients. Over decades, we have adapted to ever-changing technologies, always placing the customer at the heart of our journey.
                    </p>
                  </div>
                </div>


              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* MD Desk Section */}
      <div className="w-full bg-white relative py-32 overflow-hidden">
        {/* Background Accent removed for full white background */}
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Content (7 columns / 60%) */}
            <div className="lg:col-span-7 relative z-10 order-2 lg:order-1">
              <FadeIn className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-[#00A6FB]"></div>
                    <span className="text-[#00A6FB] font-bold uppercase tracking-widest text-sm">Leadership</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#003554] mb-6 font-heading leading-tight">
                    From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#003554]">MD's Desk.</span>
                  </h2>
                </div>

                <div className="space-y-8">
                  <div className="border-l-4 border-[#00A6FB]/20 pl-6 hover:border-[#00A6FB] transition-colors duration-300">
                    <h3 className="text-xl font-bold text-[#003554] mb-3 font-heading">Our Commitment</h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      At Hitech, we believe that innovation is a continuous journey. Our commitment to excellence drives us to constantly push boundaries and redefine what is possible in the engineering and automation sectors.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A6FB]/20 pl-6 hover:border-[#00A6FB] transition-colors duration-300">
                    <h3 className="text-xl font-bold text-[#003554] mb-3 font-heading">Looking Ahead</h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      As we look to the future, we remain dedicated to our core values. We will continue to invest in our people, our technologies, and our partnerships to ensure we deliver unmatched value to our clients worldwide.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Imagery (5 columns / 40%) */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              {/* Massive subtle background text */}
              <div className="absolute -top-16 -right-12 text-[120px] font-black text-gray-100/80 leading-none z-0 select-none hidden md:block">
                VISION
              </div>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                {/* Secondary Images Column (swapped position) */}
                <div className="col-span-2 md:col-span-1 flex flex-col gap-6 mt-0 md:mt-12">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-[213px] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop" 
                      alt="Office" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden shadow-lg h-[213px] relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop" 
                      alt="Meeting" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Main Image */}
                <div className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden shadow-2xl h-[450px]">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1200&auto=format&fit=crop" 
                    alt="Managing Director" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white z-20 flex flex-col items-center justify-center transform md:translate-x-[20%]">
                <span className="text-[#00A6FB] font-black text-3xl mb-1">Vision</span>
                <span className="text-gray-800 font-bold text-xs uppercase tracking-widest text-center">Driven</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Infrastructure Gallery Section */}
      <div className="bg-[#f4f7f9] py-24">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-4 md:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] font-heading mb-4">Our Infrastructure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our state-of-the-art facilities powering our engineering excellence.</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row border border-gray-300 w-full max-w-3xl mx-auto bg-white mb-8">
            <button 
              onClick={() => setActiveInfraTab('production')}
              className={`flex-1 py-3 text-center font-bold tracking-widest uppercase transition-colors text-xs md:text-sm ${
                activeInfraTab === 'production' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-50 border-b md:border-b-0 md:border-r border-gray-300'
              }`}
            >
              Production
            </button>
            <button 
              onClick={() => setActiveInfraTab('manufacturing')}
              className={`flex-1 py-3 text-center font-bold tracking-widest uppercase transition-colors text-xs md:text-sm ${
                activeInfraTab === 'manufacturing' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black hover:bg-gray-50 border-b md:border-b-0 md:border-r border-gray-300'
              }`}
            >
              Manufacturing
            </button>
            <button 
              onClick={() => setActiveInfraTab('lasercutting')}
              className={`flex-1 py-3 text-center font-bold tracking-widest uppercase transition-colors text-xs md:text-sm ${
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
              <p className="text-gray-700 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-4xl">
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
                className="group inline-flex items-center gap-1.5 text-[#003554] hover:text-[#00A6FB] font-bold text-[14px] uppercase tracking-wider transition-colors duration-300 shrink-0"
              >
                <span className="underline underline-offset-4 decoration-2">View More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Mission, Vision, Values */}
      {/* Premium Mission, Vision, Values - Light Theme */}
      <div className="relative py-24 bg-[#f4f7f9] overflow-hidden">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-8 lg:px-16 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Core Principles</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#003554] font-heading">
              What Drives <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#003554]">Us Forward.</span>
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="group h-full bg-white rounded-2xl p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,53,84,0.08)] relative overflow-hidden border border-gray-200/60">
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#0073A8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-[#f8fbfe] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-[#00A6FB]/10 group-hover:border-[#00A6FB]/20 group-hover:scale-110 transition-all duration-500">
                  <Lightbulb className="w-8 h-8 text-[#003554] group-hover:text-[#00A6FB] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#003554] mb-4 font-heading group-hover:text-[#00A6FB] transition-colors duration-300">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Our mission is simple but powerful: To deliver world-class pneumatic solutions that drive productivity, efficiency and reliability for our customers.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="group h-full bg-white rounded-2xl p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,53,84,0.08)] relative overflow-hidden border border-gray-200/60">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#0073A8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-[#f8fbfe] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-[#00A6FB]/10 group-hover:border-[#00A6FB]/20 group-hover:scale-110 transition-all duration-500">
                  <Shield className="w-8 h-8 text-[#003554] group-hover:text-[#00A6FB] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#003554] mb-4 font-heading group-hover:text-[#00A6FB] transition-colors duration-300">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We envision Hitech as the brand of choice for customers seeking dependable, innovative and sustainable pneumatic systems worldwide.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group h-full bg-white rounded-2xl p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,53,84,0.08)] relative overflow-hidden border border-gray-200/60">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#0073A8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-[#f8fbfe] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-[#00A6FB]/10 group-hover:border-[#00A6FB]/20 group-hover:scale-110 transition-all duration-500">
                  <Target className="w-8 h-8 text-[#003554] group-hover:text-[#00A6FB] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#003554] mb-4 font-heading group-hover:text-[#00A6FB] transition-colors duration-300">Our Values</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
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
            <h2 className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Our Heritage</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#003554] font-heading">
              A Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#003554]">Excellence.</span>
            </h3>
          </FadeIn>

          <div className="relative max-w-[96%] 2xl:max-w-[1920px] mx-auto">
            {/* Custom Timeline Track */}
            <div className="relative flex items-center justify-between mb-16 px-4 md:px-12">
              {/* Animated Gradient Line */}
              <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gray-200 -translate-y-1/2 hidden md:block rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00A6FB] to-[#003554] transition-all duration-500 rounded-full"
                  style={{ width: `${(activeTimeline / (timelineData.length - 1)) * 100}%` }}
                ></div>
              </div>
              
              <ChevronLeft 
                onClick={handlePrevTimeline}
                className={`hidden md:block w-8 h-8 z-10 bg-white rounded-full shadow-md p-1 transition-all cursor-pointer ${
                  activeTimeline === 0 ? 'text-gray-300 shadow-none cursor-not-allowed' : 'text-[#003554] hover:text-[#00A6FB] hover:scale-110'
                }`} 
                strokeWidth={2} 
              />
              
              {/* Timeline points */}
              <div className="flex flex-col md:flex-row justify-between w-full relative z-10 px-4 md:px-12 hide-scrollbar">
                {timelineData.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveTimeline(index)}
                    className="flex flex-col items-center cursor-pointer group relative"
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
                            ? 'bg-[#003554]'
                            : 'bg-gray-300 group-hover:bg-gray-400 group-hover:scale-125'
                      }`} />
                    </div>
                    
                    <span className={`absolute top-8 text-sm font-bold transition-all duration-300 ${
                      activeTimeline === index 
                        ? 'text-[#00A6FB] scale-110' 
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>

              <ChevronRight 
                onClick={handleNextTimeline}
                className={`hidden md:block w-8 h-8 z-10 bg-white rounded-full shadow-md p-1 transition-all cursor-pointer ${
                  activeTimeline === timelineData.length - 1 ? 'text-gray-300 shadow-none cursor-not-allowed' : 'text-[#003554] hover:text-[#00A6FB] hover:scale-110'
                }`} 
                strokeWidth={2} 
              />
            </div>

            {/* Timeline Content */}
            <div className="relative max-w-5xl mx-auto h-[450px]">
              {/* Massive Watermark Year */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[280px] font-black text-gray-50/60 leading-none z-0 select-none pointer-events-none transition-all duration-700">
                {timelineData[activeTimeline].year}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTimeline}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col md:flex-row items-center relative z-10 h-full"
                >
                  {/* Left: Image */}
                  <div className="w-full md:w-[60%] h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-[#003554]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={timelineData[activeTimeline].image} 
                      alt={timelineData[activeTimeline].year} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Right: Overlapping Content Card */}
                  <div className="w-[90%] md:w-[45%] -mt-16 md:mt-0 md:-ml-[10%] bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white relative z-20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[2px] w-8 bg-[#00A6FB]"></div>
                      <span className="text-[#00A6FB] font-bold text-2xl font-heading">{timelineData[activeTimeline].year}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#003554] mb-4 font-heading leading-tight">
                      {timelineData[activeTimeline].year === "1977" ? "The Foundation" : 
                       timelineData[activeTimeline].year === "1987" ? "Global Expansion" :
                       timelineData[activeTimeline].year === "1995" ? "Technological Leap" :
                       timelineData[activeTimeline].year === "2005" ? "Industry Leaders" :
                       timelineData[activeTimeline].year === "2015" ? "Sustainable Future" : "Next Generation"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[16px]">
                      {timelineData[activeTimeline].description}
                    </p>
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
