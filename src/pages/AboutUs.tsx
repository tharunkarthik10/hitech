import { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Shield, Lightbulb, Users, Package, Settings, Globe, Play } from 'lucide-react';

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
        duration: 2.5,
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

  const handlePrevTimeline = () => {
    setActiveTimeline((prev) => Math.max(0, prev - 1));
  };

  const handleNextTimeline = () => {
    setActiveTimeline((prev) => Math.min(timelineData.length - 1, prev + 1));
  };

  return (
    <div className="w-full bg-[#f4f7f9]">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Factory Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7f9] via-[#f4f7f9]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-[#003554] mb-6 font-heading"
          >
            <span className="text-[#0073A8]">About</span> Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600"
          >
            <a href="/" className="hover:text-[#0073A8] transition-colors">Home</a>
            <ChevronRight className="w-4 h-4 text-[#0073A8]" />
            <span className="text-[#0073A8]">About us</span>
          </motion.div>
        </div>
      </div>

      {/* Genesis & Who We Are Section */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row my-24 bg-white relative">
        {/* Left column */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          {/* Top: Founders */}
          <FadeIn className="relative p-12 lg:p-20 lg:pl-32 flex justify-center lg:justify-start">
            <div className="flex gap-12 items-end relative w-full justify-end lg:justify-center pr-8">
              <div className="absolute left-0 bottom-24 lg:left-[-2rem]">
                <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Genesis of</p>
                <p className="text-3xl font-bold text-[#00A6FB]">HITECH</p>
              </div>
              
              <div className="flex flex-col items-center z-10">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" 
                  alt="Founder" 
                  className="w-40 h-48 object-cover grayscale brightness-110 contrast-125"
                  style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
                />
                <p className="mt-4 font-bold text-sm text-gray-800">Founder Name 1</p>
              </div>
              <div className="flex flex-col items-center pt-16 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
                  alt="Co-Founder" 
                  className="w-40 h-48 object-cover grayscale brightness-110 contrast-125"
                  style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
                />
                <p className="mt-4 font-bold text-sm text-gray-800">Founder Name 2</p>
              </div>
            </div>
          </FadeIn>

          {/* Bottom: Experience Image */}
          <div className="relative flex h-[400px] w-full mt-12">
            <div className="w-[75%] h-full">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                alt="Industry" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="w-[25%] bg-[#fdfdfd] border-r border-y border-gray-100 flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
              {/* Play Button Overlapping Edge */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#222] transition-colors z-10">
                <Play className="w-6 h-6 text-white ml-1" strokeWidth={1.5} />
              </div>

              <div className="flex flex-col items-center z-10">
                <span className="text-[#00A6FB] font-bold text-lg mb-8">Experience</span>
                <div className="bg-[#00A6FB] w-12 h-20 flex items-center justify-center relative shadow-md mt-4">
                  <div className="absolute -top-6 left-0 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[24px] border-b-[#00A6FB]"></div>
                  <span className="text-white font-bold text-2xl -rotate-90 tracking-wider">49+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="lg:w-1/2 p-12 lg:p-20 xl:pr-32 flex flex-col justify-center">
          <FadeIn delay={0.2} className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-[#003554] mb-4 font-heading">About Us</h2>
              <p className="text-gray-600 leading-relaxed text-justify text-[15px]">
                Hitech stands today as one of the foremost names in engineering, trusted for quality, reliability, and innovation. Since our founding, we have dedicated ourselves to developing products and solutions that empower industries, simplify automation, and help our clients achieve more.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#003554] mb-4 font-heading">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed text-justify text-[15px]">
                What started as a humble workshop years ago has grown into a sophisticated organization, now serving clients both locally and internationally. Over the decades, we have introduced landmark products, upgraded our manufacturing capabilities, and adapted to ever-changing technologies—always placing the customer at the heart of our journey.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#003554] mb-4 font-heading">Our History</h3>
              <p className="text-gray-600 leading-relaxed text-justify mb-8 text-[15px]">
                What started as a humble workshop years ago has grown into a sophisticated organization, now serving clients both in India and internationally. Over the decades, we have introduced landmark products, upgraded our manufacturing capabilities and adapted to ever-changing technologies—always placing the customer at the heart of our journey. Through our progression from manual operations to advanced automation, we have maintained a clear focus: excellence in every step and integrity in every deal. Our ability to adapt and lead stems from a solid foundation of traditional values combined with forward-looking business strategies.
              </p>
              <div>
                <button className="bg-[#00A6FB] text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm">
                  Company Profile
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="group bg-[#fafbfc] border border-gray-100 shadow-sm p-12 lg:p-16 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#0073A8] hover:-translate-y-2 hover:shadow-xl hover:z-20 relative rounded-sm">
                <Lightbulb className="w-12 h-12 text-[#003554] group-hover:text-white mb-8 transition-colors duration-300" strokeWidth={1.2} />
                <h3 className="text-2xl font-bold text-[#003554] group-hover:text-white mb-6 font-heading transition-colors duration-300">Our Mission</h3>
                <p className="text-gray-500 group-hover:text-blue-50 leading-relaxed max-w-xs mx-auto text-[15px] transition-colors duration-300">
                  Our mission is simple but powerful: To deliver world-class pneumatic solutions that drive productivity, efficiency and reliability for our customers.
                </p>
              </div>
              
              <div className="group bg-white border border-gray-100 shadow-sm p-12 lg:p-16 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#0073A8] hover:-translate-y-2 hover:shadow-xl hover:z-20 relative rounded-sm">
                <Shield className="w-12 h-12 text-[#003554] group-hover:text-white mb-8 transition-colors duration-300" strokeWidth={1.2} />
                <h3 className="text-2xl font-bold text-[#003554] group-hover:text-white mb-6 font-heading transition-colors duration-300">Our Vision</h3>
                <p className="text-gray-500 group-hover:text-blue-50 leading-relaxed max-w-xs mx-auto text-[15px] transition-colors duration-300">
                  We envision Hitech as the brand of choice for customers seeking dependable, innovative and sustainable pneumatic systems worldwide.
                </p>
              </div>

              <div className="group bg-[#fafbfc] border border-gray-100 shadow-sm p-12 lg:p-16 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#0073A8] hover:-translate-y-2 hover:shadow-xl hover:z-20 relative rounded-sm">
                <Target className="w-12 h-12 text-[#003554] group-hover:text-white mb-8 transition-colors duration-300" strokeWidth={1.2} />
                <h3 className="text-2xl font-bold text-[#003554] group-hover:text-white mb-6 font-heading transition-colors duration-300">Our Values</h3>
                <p className="text-gray-500 group-hover:text-blue-50 leading-relaxed max-w-xs mx-auto text-[15px] transition-colors duration-300">
                  Innovation: We believe in nurturing creativity and translating ideas into practical industrial solutions.
                </p>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="py-24 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto text-center bg-white">
        <FadeIn>
          <h2 className="text-2xl font-bold text-[#003554] mb-2 font-heading">Our Journey</h2>
          <p className="text-gray-500 mb-16 text-[17px]">From Inception to Innovation, The Key Moments That Shaped Our Company's Story</p>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Wrapper */}
          <div className="relative flex items-center justify-between mb-24 px-2">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gray-600 -translate-y-1/2 hidden md:block"></div>
            
            <ChevronLeft 
              onClick={handlePrevTimeline}
              className={`hidden md:block w-6 h-6 z-10 bg-white transition-colors cursor-pointer ${
                activeTimeline === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900 hover:text-[#00A6FB]'
              }`} 
              strokeWidth={2.5} 
            />
            
            {/* Timeline points */}
            <div className="flex flex-col md:flex-row justify-between w-full relative z-10 px-8 md:px-16 hide-scrollbar">
              {timelineData.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveTimeline(index)}
                  className="flex flex-col items-center cursor-pointer group relative"
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTimeline === index 
                      ? 'bg-[#00A6FB] scale-125' 
                      : 'bg-gray-600 group-hover:bg-gray-800'
                  }`} />
                  <span className={`absolute top-6 text-[15px] transition-colors duration-300 ${
                    activeTimeline === index ? 'text-[#00A6FB] font-bold' : 'text-gray-600 group-hover:text-gray-900'
                  }`}>
                    {item.year}
                  </span>
                </div>
              ))}
            </div>

            <ChevronRight 
              onClick={handleNextTimeline}
              className={`hidden md:block w-6 h-6 z-10 bg-white transition-colors cursor-pointer ${
                activeTimeline === timelineData.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900 hover:text-[#00A6FB]'
              }`} 
              strokeWidth={2.5} 
            />
          </div>

          {/* Timeline Content */}
          <div className="max-w-4xl mx-auto pl-4 md:pl-16">
            <motion.div 
              key={activeTimeline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row gap-10 items-start text-left"
            >
              <div className="w-full md:w-[45%] shrink-0">
                <img 
                  src={timelineData[activeTimeline].image} 
                  alt={timelineData[activeTimeline].year} 
                  className="w-full h-[260px] object-cover rounded-md shadow-[0_10px_40px_rgb(0,0,0,0.12)]"
                />
              </div>
              <div className="w-full md:w-[55%] pt-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                  {timelineData[activeTimeline].year}
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg">
                  {timelineData[activeTimeline].description}
                </p>
              </div>
            </motion.div>
          </div>
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
          <div className="absolute inset-0 bg-[#003554]/90"></div>
        </div>
        
        <div className="relative z-10 px-8 md:px-16 lg:px-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-700/50">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1} className="flex flex-col items-center text-center px-4">
                <stat.icon className="w-12 h-12 text-[#0073A8] mb-6 drop-shadow-[0_0_15px_rgba(0,115,168,0.5)]" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading tracking-tight">
                  <AnimatedCounter value={stat.count} suffix={stat.suffix} />
                </div>
                <div className="text-gray-300 text-sm md:text-base font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
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
