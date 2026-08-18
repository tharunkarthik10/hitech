import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CalendarCheck, Settings2, ShieldCheck, Truck } from 'lucide-react';

const stages = [
  {
    id: "01",
    shortTitle: "REQUIREMENT",
    title: "Requirement Analysis",
    desc: "Understanding customer drawings, specifications, dimensions, tolerances, and production requirements before manufacturing begins.",
    status: "REQUIREMENT VERIFIED",
    icon: Target,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
  },
  {
    id: "02",
    shortTitle: "PLANNING",
    title: "Production Planning",
    desc: "Materials, machinery, resources, and production sequences are carefully planned to ensure efficient and consistent manufacturing.",
    status: "PRODUCTION PLAN READY",
    icon: CalendarCheck,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
  },
  {
    id: "03",
    shortTitle: "MANUFACTURING",
    title: "Precision Manufacturing",
    desc: "Advanced machinery and skilled engineering expertise transform raw materials into accurate, high-quality components built to meet demanding specifications.",
    status: "COMPONENT COMPLETE",
    icon: Settings2,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
  },
  {
    id: "04",
    shortTitle: "INSPECTION",
    title: "Quality Inspection",
    desc: "Every component undergoes dimensional measurement, surface inspection, and quality verification to ensure compliance with required specifications.",
    status: "QUALITY VERIFIED",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80"
  },
  {
    id: "05",
    shortTitle: "DELIVERY",
    title: "Final Delivery",
    desc: "Completed components are carefully handled, securely packaged, and prepared for reliable and timely delivery.",
    status: "READY FOR DELIVERY",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
  }
];

export default function InteractiveManufacturingProcess() {
  const [activeStage, setActiveStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-24 px-8 md:px-12 bg-[#051923] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A6FB]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto relative z-10">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-3">Our Process</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-headline-xl leading-[1.1] tracking-tight">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#00A6FB]">Manufacture</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
            A streamlined, five-step methodology ensuring precision, efficiency, and uncompromising quality from initial concept to final delivery.
          </p>
        </div>

        {/* Interactive Horizontal Accordion */}
        <div 
          className="flex flex-col lg:flex-row gap-4 h-[70vh] min-h-[600px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive ? 'flex-[4] lg:flex-[5] shadow-2xl shadow-[#00A6FB]/20' : 'flex-[1] lg:flex-[1] opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                {/* Background Image */}
                <img 
                  src={stage.image} 
                  alt={stage.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-110 grayscale-[50%]'}`}
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive 
                    ? 'bg-gradient-to-t from-[#051923] via-[#051923]/60 to-transparent' 
                    : 'bg-[#051923]/80'
                }`}></div>



                {/* Inactive State - Vertical Title */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-[#00A6FB] font-bold font-mono">{stage.id}</span>
                      </div>
                      <span className="text-white font-bold tracking-[0.2em] uppercase whitespace-nowrap transform -rotate-90 origin-center absolute top-1/2 -translate-y-1/2">
                        {stage.shortTitle}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active State - Full Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between"
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-end">
                        <div className="text-white/20 font-headline-xl text-6xl font-bold">
                          {stage.id}
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="relative z-10 max-w-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-[#00A6FB] flex items-center justify-center shadow-lg shadow-[#00A6FB]/30 mb-6">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-bold text-white font-headline-xl leading-[1.1] mb-4">
                          {stage.title}
                        </h3>
                        
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                          {stage.desc}
                        </p>

                        <div className="inline-flex items-center gap-3 border-l-2 border-[#00A6FB] pl-4">
                          <span className="text-[#00A6FB] font-mono text-sm tracking-wider font-bold">STATUS:</span>
                          <span className="text-white font-mono text-sm tracking-widest">{stage.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

